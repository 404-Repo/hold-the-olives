/**
 * Runtime asset library for Arm B games.
 *
 * One function: ASSET(slug, opts) -> THREE.Object3D, ready to position.
 *
 * Everything in here is a lesson that cost us something on an earlier build:
 *
 *  - Scale by HEIGHT, never by fitting a bounding box. Fitting the smallest of
 *    three ratios silently halves anything whose proportions differ from what
 *    the caller imagined, and height is what actually reads in a game frame.
 *  - Recentre x/z and drop the base to y=0, so a placement coordinate means
 *    "put it here on the ground" rather than "put its arbitrary origin here".
 *  - Merge sub-meshes by material VALUES, not material identity. Coded assets
 *    build a fresh material object per part, so identity-merging merges nothing
 *    and a single torii arrives as forty draw calls.
 *  - Coded (js) assets export a function of THREE; glb assets load through
 *    GLTFLoader. The caller should not have to care which pack a slug came from.
 */
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

// The GLB packs went through gltf-transform optimize, so they are meshopt
// compressed and will not load at all without this decoder attached.
const loader = new GLTFLoader();
loader.setMeshoptDecoder(MeshoptDecoder);
const cache = new Map();      // slug -> Promise<THREE.Object3D> (the prototype)
let MANIFEST = null;

// Absolute by default: games are served from /games/<id>/, so a relative path
// would look for the manifest inside the game's own directory and 404.
export async function initAssets(manifestUrl = '/manifest.json') {
  if (!MANIFEST) MANIFEST = await (await fetch(manifestUrl)).json();
  return MANIFEST;
}

function materialKey(m) {
  if (!m) return 'none';
  return [
    m.type, m.color?.getHexString?.(), m.roughness, m.metalness, m.flatShading,
    m.transparent, m.opacity, m.side, m.emissive?.getHexString?.(),
    m.map?.uuid || 'nomap', m.vertexColors,
  ].join('|');
}

/**
 * mergeGeometries refuses to combine geometries whose attribute sets differ
 * (some indexed and some not, some carrying uv). Coded assets build each part
 * independently, so a single asset routinely mixes both. Normalise every
 * geometry to the same shape before merging: de-index, keep only the attributes
 * they all share, and drop morph targets.
 */
function normaliseForMerge(geos) {
  const plain = geos.map((g) => (g.index ? g.toNonIndexed() : g));
  let common = null;
  for (const g of plain) {
    const names = new Set(Object.keys(g.attributes));
    common = common ? new Set([...common].filter((n) => names.has(n))) : names;
  }
  if (!common || !common.has('position')) return null;
  for (const g of plain) {
    for (const name of Object.keys(g.attributes)) {
      if (!common.has(name)) g.deleteAttribute(name);
    }
    g.morphAttributes = {};
    g.clearGroups();
  }
  return plain;
}

/** Collapse a loaded asset to one mesh per distinct material VALUE. */
function mergeByMaterialValues(root) {
  const buckets = new Map();
  const skip = [];
  root.updateMatrixWorld(true);
  const _m = new THREE.Matrix4();
  const _col = new THREE.Color();
  root.traverse((o) => {
    if (o.isMesh && o.geometry) {
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      if (mats.length > 1) { skip.push(o); return; }   // multi-material: leave alone
      // Bucket by material value AND by the geometry's attribute signature.
      // Without the signature, a bucket can mix geometry that carries a colour
      // attribute with geometry that does not; the merge then drops colour to
      // the common set, and a material with vertexColors:true renders the whole
      // thing black. That is how the barrel's staves went dark.
      const sig = Object.keys(o.geometry.attributes).sort().join(',') +
        (o.isInstancedMesh && o.instanceColor ? ',color' : '');
      const k = materialKey(mats[0]) + '#' + sig;
      if (!buckets.has(k)) buckets.set(k, { mat: mats[0], geos: [] });
      const bucket = buckets.get(k);

      // An InstancedMesh is ALSO isMesh, but its geometry is a single prototype
      // and the copies live in instanceMatrix. Treating it as a plain mesh keeps
      // exactly one copy and silently deletes the rest — which is how a barrel
      // built from instanced staves and hoops arrives as a smooth egg. Expand
      // every instance, one matrix at a time.
      if (o.isInstancedMesh) {
        const n = o.count;
        // Instances can also carry a per-instance colour (setColorAt). Merging
        // without it paints every copy the material's base colour, which is why
        // the barrel's varied staves came out one flat tone even after the
        // geometry was correct. Bake instanceColor into a vertex colour.
        const ic = o.instanceColor;
        for (let i = 0; i < n; i++) {
          o.getMatrixAt(i, _m);
          const g = o.geometry.clone();
          g.applyMatrix4(_m);              // instance-local
          g.applyMatrix4(o.matrixWorld);   // then the mesh's own world transform
          if (ic) {
            _col.fromArray(ic.array, i * 3);
            const count = g.attributes.position.count;
            const arr = new Float32Array(count * 3);
            for (let v = 0; v < count; v++) {
              arr[v * 3] = _col.r; arr[v * 3 + 1] = _col.g; arr[v * 3 + 2] = _col.b;
            }
            g.setAttribute('color', new THREE.BufferAttribute(arr, 3));
          }
          bucket.geos.push(g);
        }
        // A bucket fed instance colours must render them, or the bake is wasted.
        if (ic && !bucket.mat.vertexColors) {
          bucket.mat = bucket.mat.clone();
          bucket.mat.vertexColors = true;
        }
        return;
      }

      const g = o.geometry.clone();
      g.applyMatrix4(o.matrixWorld);
      bucket.geos.push(g);
    } else if (o.isLight || o.isSprite || o.isPoints) {
      skip.push(o);
    }
  });
  const out = new THREE.Group();
  for (const { mat, geos } of buckets.values()) {
    if (!geos.length) continue;
    let geo = null;
    if (geos.length === 1) {
      geo = geos[0];
    } else {
      const ready = normaliseForMerge(geos);
      if (ready) {
        try { geo = BufferGeometryUtils.mergeGeometries(ready, false); } catch { geo = null; }
      }
      if (!geo) {
        // Merging is an optimisation, never a correctness requirement: if it
        // still will not combine, draw the parts separately rather than lose them.
        for (const g of geos) out.add(new THREE.Mesh(g, mat));
        continue;
      }
    }
    out.add(new THREE.Mesh(geo, mat));
  }
  // Anything we refused to merge still has to appear.
  for (const o of skip) {
    const c = o.clone();
    c.matrix.copy(o.matrixWorld); c.matrix.decompose(c.position, c.quaternion, c.scale);
    out.add(c);
  }
  return out;
}

async function loadPrototype(slug) {
  if (cache.has(slug)) return cache.get(slug);
  const entry = MANIFEST?.bySlug?.[slug];
  if (!entry) {
    console.warn('[assets] unknown slug:', slug);
    return null;
  }
  const p = (async () => {
    let root;
    if (entry.format === 'glb') {
      const gltf = await loader.loadAsync(entry.url);
      root = gltf.scene;
    } else {
      const mod = await import(/* @vite-ignore */ new URL(entry.url, location.href).href);
      const fn = mod.default || mod.build || mod.create;
      if (typeof fn !== 'function') throw new Error('coded asset has no default export: ' + slug);
      root = fn(THREE);
    }
    const merged = mergeByMaterialValues(root);
    // Normalise: base at y=0, centred on x/z, so callers place by ground point.
    const box = new THREE.Box3().setFromObject(merged);
    const c = box.getCenter(new THREE.Vector3());
    merged.position.set(-c.x, -box.min.y, -c.z);
    const wrapper = new THREE.Group();
    wrapper.add(merged);
    wrapper.userData.nativeSize = box.getSize(new THREE.Vector3());
    return wrapper;
  })();
  cache.set(slug, p);
  return p;
}

/**
 * ASSET(slug, {height}) -> Object3D (a fresh instance you can position/rotate).
 * `height` is the finished height in metres. Omit it to keep native scale.
 */
export async function ASSET(slug, opts = {}) {
  const proto = await loadPrototype(slug);
  if (!proto) return new THREE.Group();               // never throw into a game loop
  const inst = proto.clone(true);
  const native = proto.userData.nativeSize;
  if (opts.height && native && native.y > 1e-6) {
    const s = opts.height / native.y;
    inst.scale.setScalar(s);
  }
  inst.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  return inst;
}

/** Preload in parallel so the first frame is not a slideshow. */
export async function preloadAssets(slugs) {
  await Promise.all(slugs.map((s) => loadPrototype(s).catch((e) => console.warn('[assets]', s, e.message))));
}

export function assetNativeSize(slug) {
  return MANIFEST?.bySlug?.[slug]?.size || null;
}
