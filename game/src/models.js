// Every 3D object comes from a 404 asset module in ./assets/, loaded through the
// canonical assetlib. While an asset is still being made, a crude placeholder
// stands in (dev only; the shipped game has every asset, see AVAILABLE).
import * as THREE from 'three';
import { ASSET } from '../assetlib.js';
import { AVAILABLE } from './assets_list.js';

const have = new Set(AVAILABLE);
export const hasAsset = (n) => have.has(n);

const mat = (c, o = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.6, ...o });

function placeholder(name) {
  const g = new THREE.Group();
  const add = (geo, m, y = 0) => { const me = new THREE.Mesh(geo, m); me.position.y = y; g.add(me); return me; };
  if (name.startsWith('olive') || name.startsWith('pimento')) {
    const c = name.includes('kalamata') ? 0x5a2a4e : name.includes('ring') ? 0x221c22 : name.includes('brute') ? 0xa6c93a : name.startsWith('pimento') ? 0xe03a2a : 0x8aa52e;
    const b = add(new THREE.SphereGeometry(0.5, 16, 12), mat(c, { roughness: 0.25 }), 0.5); b.scale.set(0.8, 1, 0.8);
    for (const s of [-1, 1]) { const e = add(new THREE.SphereGeometry(0.16, 10, 8), mat(0xffffff), 0.62); e.position.x = s * 0.17; e.position.z = 0.33; const p = add(new THREE.SphereGeometry(0.08, 8, 6), mat(0x161616), 0.62); p.position.set(s * 0.17, 0.62, 0.46); }
  } else if (name.startsWith('boss')) {
    add(new THREE.CylinderGeometry(0.4, 0.4, 1, 20), mat(0xd8eef0, { transparent: true, opacity: 0.6 }), 0.5);
  } else if (name.startsWith('layer')) {
    const c = { layer_lettuce: 0x6cc23a, layer_tomato: 0xe2432f, layer_cheese: 0xf7c534, layer_bacon: 0xb4432c, layer_bread: 0xf3ddb0 }[name] || 0xffffff;
    add(new THREE.BoxGeometry(1, 0.1, 1), mat(c), 0.05);
  } else if (name.startsWith('head')) {
    add(new THREE.CylinderGeometry(0.25, 0.3, 0.7, 12), mat(0xd5473a), 0.35);
  } else if (name.startsWith('proj')) {
    add(new THREE.SphereGeometry(0.5, 8, 6), mat(0xe8cfa0), 0.5);
  } else if (name === 'pad_coaster') {
    add(new THREE.CylinderGeometry(0.65, 0.65, 0.08, 28), mat(0xb98a5a), 0.04);
  } else if (name === 'club_sandwich') {
    const cols = [0xf3ddb0, 0xedcaa6, 0x6cc23a, 0xe2432f, 0xf3ddb0, 0xb4432c, 0xf7c534, 0x6cc23a, 0xf3ddb0];
    const layers = {};
    cols.forEach((c, i) => { const m = add(new THREE.BoxGeometry(1.4, 0.3, 1.4), mat(c), 0.15 + i * 0.3); layers['l' + (cols.length - i)] = m; });
    g.userData.layers = layers;
  } else {
    add(new THREE.BoxGeometry(1, 1, 1), mat(0xccbbaa), 0.5);
  }
  return g;
}

/** Load a model by asset name. Returns a fresh Object3D sitting on y = 0. */
export async function model(name, opts = {}) {
  if (have.has(name)) return ASSET(`./assets/${name}.js`, opts);
  const g = placeholder(name);
  if (opts.height) {
    const b = new THREE.Box3().setFromObject(g);
    const h = b.max.y - b.min.y || 1;
    g.scale.setScalar(opts.height / h);
  }
  return g;
}

/**
 * An instanced pool: one InstancedMesh per material of a merged model, so a
 * hundred olives of one kind cost a handful of draw calls.
 */
export class Pool {
  constructor(proto, cap, parent) {
    this.cap = cap; this.meshes = []; this.n = 0;
    proto.position.set(0, 0, 0); proto.rotation.set(0, 0, 0);
    proto.updateMatrixWorld(true);
    const white = new THREE.Color(1, 1, 1);
    proto.traverse((o) => {
      if (!o.isMesh || o.isInstancedMesh) return;
      const g = o.geometry.clone();
      g.applyMatrix4(o.matrixWorld);
      const m = new THREE.InstancedMesh(g, o.material, cap);
      m.count = 0; m.castShadow = true; m.receiveShadow = false; m.frustumCulled = false;
      for (let i = 0; i < cap; i++) m.setColorAt(i, white);
      m.instanceColor.needsUpdate = true;
      parent.add(m); this.meshes.push(m);
    });
  }
  begin() { this.n = 0; }
  push(matrix, color) {
    if (this.n >= this.cap) return;
    for (const m of this.meshes) { m.setMatrixAt(this.n, matrix); if (color) m.setColorAt(this.n, color); }
    this.n++;
  }
  end() {
    for (const m of this.meshes) { m.count = this.n; m.instanceMatrix.needsUpdate = true; if (m.instanceColor) m.instanceColor.needsUpdate = true; }
  }
  dispose(parent) { for (const m of this.meshes) parent.remove(m); }
}

/** Render a model to a small transparent PNG data URL, for menus. */
export function snapshot(renderer, obj, size = 128, opts = {}) {
  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xfff4e0, 0x6b5a48, 2.2));
  const d = new THREE.DirectionalLight(0xffffff, 2.4); d.position.set(3, 6, 5); scene.add(d);
  const holder = new THREE.Group(); holder.add(obj); scene.add(holder);
  holder.rotation.y = opts.yaw ?? -0.6;
  holder.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(holder);
  const c = box.getCenter(new THREE.Vector3()), s = box.getSize(new THREE.Vector3());
  const r = Math.max(s.x, s.y, s.z) * 0.62;
  const cam = new THREE.PerspectiveCamera(30, 1, 0.01, 100);
  const dir = new THREE.Vector3(0, 0.55, 1).normalize();
  cam.position.copy(c).addScaledVector(dir, r / Math.tan(THREE.MathUtils.degToRad(15)) * 1.05);
  cam.lookAt(c);
  const rt = new THREE.WebGLRenderTarget(size, size, { samples: 0 });
  rt.texture.colorSpace = THREE.SRGBColorSpace;
  const prevT = renderer.getRenderTarget(), prevC = renderer.getClearAlpha();
  const prevCol = renderer.getClearColor(new THREE.Color());
  renderer.setRenderTarget(rt); renderer.setClearColor(0x000000, 0); renderer.clear();
  renderer.render(scene, cam);
  const px = new Uint8Array(size * size * 4);
  renderer.readRenderTargetPixels(rt, 0, 0, size, size, px);
  renderer.setRenderTarget(prevT); renderer.setClearColor(prevCol, prevC);
  rt.dispose();
  const cv = document.createElement('canvas'); cv.width = cv.height = size;
  const ctx = cv.getContext('2d'); const img = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++) img.data.set(px.subarray((size - 1 - y) * size * 4, (size - y) * size * 4), y * size * 4);
  ctx.putImageData(img, 0, 0);
  holder.remove(obj);
  return cv.toDataURL('image/png');
}
