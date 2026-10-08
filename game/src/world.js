// The room around the field. Surfaces are textured slabs (the counter, the
// walls, the floor 9 m below); every object on them is a 404 asset. The
// olives' route is a trail of spilled flour (or a table runner, or a wet
// streak) so it reads at a glance.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { model, hasAsset } from './models.js';
import { bakeStatic } from '../assetlib.js';
import { TEX } from './assets_list.js';
import { FIELD } from './data.js';

const texHave = new Set(TEX || []);
const loader = new THREE.TextureLoader();
const texCache = new Map();
export function tex(name, repeat = 1, aniso = 8) {
  const key = name + ':' + repeat;
  if (texCache.has(key)) return texCache.get(key);
  let t = null;
  if (texHave.has(name)) {
    t = loader.load(`./tex/${name}.jpg`);
    t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(repeat, repeat);
    t.anisotropy = aniso;
  }
  texCache.set(key, t);
  return t;
}

// The palette a surface falls back to when its texture is not there yet.
const SURF = {
  butcher_block: 0xc99a64, cutting_board: 0xe0b98a, sage_tile: 0x86b8a8, marble: 0xeeeae3,
  stove_enamel: 0xf2ead8, table_linen: 0xdfe6f0, walnut: 0x6b4a32, tile_floor: 0xc98a64, cream: 0xf2ead8,
};
function surfMat(name, repeat, opts = {}) {
  const t = tex(name, repeat);
  return new THREE.MeshStandardMaterial({ color: t ? 0xffffff : (SURF[name] ?? 0xcccccc), map: t, roughness: opts.roughness ?? 0.7, metalness: opts.metalness ?? 0 });
}

// Light and colour for each time of day.
export const LOOKS = {
  morning:   { bg: 0xf3e2c4, sky: 0xfff2dc, gnd: 0xa77b52, hemi: 1.15, sun: 0xffd9a0, sunI: 3.4, sunDir: [-0.9, 1.25, -0.55], exp: 1.05, fog: 0xf0dcc0, window: 0xfff3d6 },
  stove:     { bg: 0xf1dcc0, sky: 0xfff0d8, gnd: 0xa8805a, hemi: 1.1, sun: 0xffe0b0, sunI: 3.2, sunDir: [-0.8, 1.4, 0.2], exp: 1.05, fog: 0xeed9bd, window: 0xfff6e0 },
  noon:      { bg: 0xeef0ea, sky: 0xffffff, gnd: 0x9a8a72, hemi: 1.25, sun: 0xfff3dc, sunI: 3.0, sunDir: [-0.4, 1.8, -0.3], exp: 1.0, fog: 0xe8ece6, window: 0xffffff },
  afternoon: { bg: 0xf0d2a8, sky: 0xffe6c0, gnd: 0x8f6a4a, hemi: 1.05, sun: 0xffc887, sunI: 3.6, sunDir: [1.0, 1.05, -0.7], exp: 1.05, fog: 0xeac8a0, window: 0xffe2b0 },
  evening:   { bg: 0x2a1c22, sky: 0x8a6a90, gnd: 0x3a2418, hemi: 0.55, sun: 0xffb070, sunI: 1.3, sunDir: [0.8, 1.2, 0.6], exp: 1.15, fog: 0x2a1c22, window: 0x5a4a8a, lamps: true },
  night:     { bg: 0x141a2a, sky: 0x8aa6d8, gnd: 0x2a2018, hemi: 0.5, sun: 0xbcd4ff, sunI: 1.6, sunDir: [1.0, 0.9, 0.9], exp: 1.15, fog: 0x141a2a, window: 0x1d2a4a, fridge: true },
};

// Dressing per stage: [asset, x, z, rotY, height, y?]. Heights are world metres (10x).
const DRESS = {
  board: [
    ['olive_jar_spill', -3.4, -22.4, 0.3, 1.5],
    ['bread_bin', -5.6, -22.8, 0.0, 2.2],
    ['knife_block', 4.8, -22.6, -0.4, 2.6],
    ['coffee_maker', 1.4, -23.2, 0.0, 3.4],
    ['kettle', -6.2, -2.4, 0.6, 2.4],
    ['toaster', -6.0, -15.8, 1.5708, 2.0],
    ['utensil_crock', -6.4, 0.6, 0.0, 2.6],
    ['herb_pot', -6.6, -12.4, 0.2, 1.8],
    ['herb_pot', -6.6, -7.2, 1.4, 1.5],
    ['fruit_bowl', 5.4, -18.6, 0.0, 1.2],
    ['bread_loaf', -1.6, -6.4, 0.4, 0.9, 0.32],
    ['lemon', 1.6, -10.4, 0.0, 0.55, 0.32],
    ['mug', 5.6, -8.6, 2.0, 1.0],
    ['salt_shaker', 5.8, -1.6, 0.0, 0.9],
    ['butter_dish', -2.4, -18.6, 0.3, 0.6],
    ['tea_towel', 4.6, 1.4, 0.3, 0.12],
    ['paper_towel', 4.8, -15.0, 0.0, 2.8],
  ],
  stove: [
    ['olive_jar_spill', 4.4, -22.6, -0.2, 1.5],
    ['stove_burner', 0.2, -16.4, 0, 0.3], ['stove_burner', 3.9, -8.4, 0.3, 0.3], ['stove_burner', -3.7, -3.2, 0.6, 0.3],
    ['frying_pan', -4.6, -19.6, 0.8, 0.6],
    ['saucepan', -1.2, -7.6, 0.2, 1.4],
    ['kettle', 5.8, -2.0, -0.6, 2.4],
    ['wooden_spoon', 2.4, -3.2, 1.2, 0.2],
    ['oven_mitt', 1.0, -19.6, 0.4, 0.3],
    ['salt_shaker', -6.2, -10.6, 0, 0.9], ['pepper_shaker', -6.2, -9.4, 0, 0.9],
    ['range_hood', 0, -24.2, 0, 7.0, 9.0],
    ['stove_knob', -4.0, 3.0, 0, 0.35], ['stove_knob', -1.4, 3.0, 0, 0.35], ['stove_knob', 1.4, 3.0, 0, 0.35], ['stove_knob', 4.0, 3.0, 0, 0.35],
  ],
  sink: [
    ['olive_jar_spill', -4.6, -22.4, 0.2, 1.5],
    ['faucet', 1.0, -23.0, 0, 6.0],
    ['dish_rack', -4.4, -17.6, 0.0, 2.4, 0.45],
    ['sponge', 4.2, -15.4, 0.5, 0.45],
    ['dish_soap', 5.8, -17.6, 0.0, 2.2],
    ['plate_stack', 5.6, -6.6, 0, 1.0],
    ['mug', -0.8, -4.6, 1.0, 1.0],
    ['drying_glass', -6.2, -2.4, 0, 1.6],
    ['tea_towel', 1.2, -12.6, 0.8, 0.12],
    ['herb_pot', -6.6, -11.0, 0.2, 1.8],
  ],
  lunch: [
    ['olive_jar_spill', 0.0, -22.6, 0, 1.5],
    ['dinner_plate', 0.0, -8.8, 0, 0.25], ['dinner_plate', 6.6, -16.2, 0, 0.25], ['dinner_plate', -6.4, -9.0, 0, 0.25],
    ['wine_glass', 2.2, -16.4, 0, 2.2], ['wine_glass', -6.0, -12.0, 0, 2.2], ['water_jug', 6.2, -0.6, 0, 3.0],
    ['candle_holder', -2.0, -11.6, 0, 3.4], ['bread_basket', 2.0, -4.6, 0.4, 1.2],
    ['fork', -2.0, -0.8, 1.5708, 0.12], ['table_knife', 2.0, -20.0, 1.2, 0.12],
    ['salad_bowl', -6.0, -18.2, 0, 1.2], ['napkin_folded', -1.8, -6.6, 0.3, 0.5],
    ['roast_chicken', 0.0, -24.0, 0, 2.6],
  ],
  bar: [
    ['olive_jar_spill', -4.2, -22.6, 0.2, 1.5],
    ['table_lamp', 5.6, -22.6, 0, 9.0], ['table_lamp', -6.4, -8.6, 0, 8.0],
    ['cocktail_shaker', 1.8, -22.8, 0, 3.0], ['ice_bucket', -1.6, -22.8, 0, 2.6],
    ['liquor_bottle', 3.4, -23.4, 0, 4.4], ['liquor_bottle', -2.8, -24.0, 0.5, 4.0],
    ['coupe_glass', 1.4, -16.8, 0, 1.8], ['coupe_glass', 6.2, -12.0, 0, 1.8],
    ['lemon', -1.6, -16.4, 0.4, 0.55], ['olive_bowl', 2.0, -2.8, 0, 0.7],
    ['cocktail_napkin', -2.0, -6.0, 0.3, 0.05],
  ],
};

export function heightAt(stage, x, z) {
  let h = 0;
  for (const [x0, z0, x1, z1, hh] of stage.plat || []) {
    const r = 0.45;
    const dx = Math.max(x0 - x, x - x1, 0), dz = Math.max(z0 - z, z - z1, 0);
    const d = Math.hypot(dx, dz);
    const t = d <= 0 ? 1 : Math.max(0, 1 - d / r);
    h = Math.max(h, hh * t * t * (3 - 2 * t));
  }
  return h;
}

function flourTexture(style) {
  const W = 256, H = 512;
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const c = cv.getContext('2d');
  const col = { flour: [250, 244, 230], runner: [242, 236, 222], wet: [190, 214, 222], sugar: [252, 250, 246] }[style] || [250, 244, 230];
  const img = c.createImageData(W, H);
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const n1 = new Float32Array(H); for (let y = 0; y < H; y++) n1[y] = Math.sin(y * 0.05) * 0.06 + Math.sin(y * 0.13 + 1) * 0.04;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const u = x / W;
    let edge = Math.min(u, 1 - u) * 2;          // 0 at edges, 1 centre
    edge += n1[y] + (rnd() - 0.5) * 0.22;
    let a = Math.max(0, Math.min(1, (edge - 0.12) / 0.35));
    if (style === 'runner') a = edge > 0.1 ? 1 : 0;
    const g = (rnd() - 0.5) * 18;
    const i = (y * W + x) * 4;
    img.data[i] = col[0] + g; img.data[i + 1] = col[1] + g; img.data[i + 2] = col[2] + g; img.data[i + 3] = a * (style === 'wet' ? 120 : 235);
  }
  c.putImageData(img, 0, 0);
  if (style === 'runner') {
    // a woven linen runner: two sage stripes near each edge
    c.fillStyle = 'rgba(80,140,120,0.85)'; c.fillRect(W * 0.12, 0, W * 0.05, H); c.fillRect(W * 0.83, 0, W * 0.05, H);
    c.fillStyle = 'rgba(200,80,60,0.6)'; c.fillRect(W * 0.2, 0, W * 0.02, H); c.fillRect(W * 0.78, 0, W * 0.02, H);
  } else {
    // olive footprints: little paired dots down the middle, the trail's tell
    c.fillStyle = style === 'wet' ? 'rgba(120,150,160,0.35)' : 'rgba(150,120,80,0.28)';
    for (let y = 10; y < H; y += 46) for (const s of [-1, 1]) { c.beginPath(); c.ellipse(W / 2 + s * 22 + (rnd() - 0.5) * 30, y + (s > 0 ? 23 : 0), 7, 10, 0, 0, Math.PI * 2); c.fill(); }
  }
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace; t.wrapS = THREE.ClampToEdgeWrapping; t.wrapT = THREE.RepeatWrapping; t.anisotropy = 8;
  return t;
}

/** A ribbon along the path, following the counter's height. */
function pathRibbon(stage, curve, length, width, style) {
  const n = Math.ceil(length / 0.2);
  const pos = [], uv = [], idx = [];
  const p = new THREE.Vector3(), tng = new THREE.Vector3();
  for (let i = 0; i <= n; i++) {
    const u = i / n;
    curve.getPointAt(u, p); curve.getTangentAt(u, tng);
    const nx = -tng.z, nz = tng.x, l = Math.hypot(nx, nz) || 1;
    for (const s of [-1, 1]) {
      const x = p.x + (nx / l) * s * width / 2, z = p.z + (nz / l) * s * width / 2;
      pos.push(x, heightAt(stage, x, z) + 0.015, z);
      uv.push(s < 0 ? 0 : 1, (u * length) / (width * 2));
    }
    if (i < n) { const a = i * 2; idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx); g.computeVertexNormals();
  const m = new THREE.MeshStandardMaterial({ map: flourTexture(style), transparent: true, side: THREE.DoubleSide, roughness: style === 'wet' ? 0.15 : 0.95, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 });
  const mesh = new THREE.Mesh(g, m); mesh.receiveShadow = true; mesh.renderOrder = 1;
  return mesh;
}

export async function buildWorld(scene, stage, renderer) {
  const root = new THREE.Group(); root.name = 'world';
  const look = LOOKS[stage.look] || LOOKS.morning;
  scene.background = new THREE.Color(look.bg);
  scene.fog = new THREE.Fog(look.fog, 60, 140);
  renderer.toneMappingExposure = look.exp;

  // --- light
  const hemi = new THREE.HemisphereLight(look.sky, look.gnd, look.hemi); root.add(hemi);
  const sun = new THREE.DirectionalLight(look.sun, look.sunI);
  const sd = new THREE.Vector3(...look.sunDir).normalize();
  sun.position.set(sd.x * 40, sd.y * 40, sd.z * 40 - 8); sun.target.position.set(0, 0, -8);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  const sc = sun.shadow.camera; sc.left = -16; sc.right = 16; sc.top = 20; sc.bottom = -20; sc.near = 1; sc.far = 110;
  sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.03; sun.shadow.radius = 3;
  root.add(sun, sun.target);
  const fill = new THREE.DirectionalLight(0xfff0e0, look.hemi * 0.35); fill.position.set(10, 12, 20); root.add(fill);

  // --- surfaces
  const isTable = stage.id === 'lunch', isBar = stage.id === 'bar', isStove = stage.id === 'stove', isSink = stage.id === 'sink';
  const topName = isTable ? 'table_linen' : isBar ? 'walnut' : isStove ? 'stove_enamel' : isSink ? 'marble' : 'butcher_block';
  const top = new THREE.Mesh(new THREE.BoxGeometry(15, 0.5, 34), surfMat(topName, isTable ? 5 : 3, { roughness: isStove ? 0.35 : isSink ? 0.25 : 0.65 }));
  top.position.set(-0.4, -0.25, -8.5); top.receiveShadow = true; root.add(top);
  const topMap = top.material.map; if (topMap) topMap.repeat.set(isTable ? 4 : 2.2, isTable ? 9 : 5);
  // the drop: cabinet fronts below the counter edge, the floor far below
  if (!isTable && !isBar) {
    const front = new THREE.Mesh(new THREE.BoxGeometry(0.4, 9, 34), new THREE.MeshStandardMaterial({ color: 0xf2ead8, roughness: 0.5 }));
    front.position.set(6.6, -4.75, -8.5); root.add(front);
    // door gaps as dark grooves every 5 m
    for (let z = -24; z <= 6; z += 5) { const gp = new THREE.Mesh(new THREE.BoxGeometry(0.05, 8.4, 0.12), new THREE.MeshStandardMaterial({ color: 0x7a6a58 })); gp.position.set(6.82, -4.9, z); root.add(gp); }
  } else {
    // the table edge and its apron, then the floor
    const apron = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.2, 34), surfMat('walnut', 2)); apron.position.set(6.8, -0.9, -8.5); root.add(apron);
    const apron2 = apron.clone(); apron2.position.x = -7.6; root.add(apron2);
  }
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(120, 120), surfMat('tile_floor', 1));
  floor.rotation.x = -Math.PI / 2; floor.position.set(20, -9.4, -8); root.add(floor);
  if (floor.material.map) floor.material.map.repeat.set(10, 10);
  floor.receiveShadow = true;

  // the back wall (left) and the far wall
  if (!isTable && !isBar) {
    const wallT = surfMat('sage_tile', 1, { roughness: 0.25 });
    if (wallT.map) wallT.map.repeat.set(34 / 3, 6 / 3);
    const wall = new THREE.Mesh(new THREE.PlaneGeometry(34, 6), wallT);
    wall.rotation.y = Math.PI / 2; wall.position.set(-7.4, 3, -8.5); wall.receiveShadow = true; root.add(wall);
    const far = new THREE.Mesh(new THREE.PlaneGeometry(15, 6), wallT.clone());
    if (far.material.map) { far.material.map = far.material.map.clone(); far.material.map.repeat.set(5, 2); far.material.map.needsUpdate = true; }
    far.position.set(-0.4, 3, -25.4); far.receiveShadow = true; root.add(far);
    // plaster above the tiles
    const plaster = new THREE.MeshStandardMaterial({ color: 0xf4ecdc, roughness: 0.9 });
    const w2 = new THREE.Mesh(new THREE.PlaneGeometry(34, 30), plaster); w2.rotation.y = Math.PI / 2; w2.position.set(-7.4, 21, -8.5); root.add(w2);
    const f2 = new THREE.Mesh(new THREE.PlaneGeometry(40, 30), plaster); f2.position.set(10, 21, -25.4); root.add(f2);
    const f3 = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), plaster); f3.position.set(10, 10, -25.5); root.add(f3);
    // the window: a bright opening with the morning outside
    const win = new THREE.Mesh(new THREE.PlaneGeometry(9, 4.2), new THREE.MeshBasicMaterial({ color: look.window }));
    win.rotation.y = Math.PI / 2; win.position.set(-7.36, 3.3, -9.6); root.add(win);
    // upper cabinets: cream boxes on the wall, 5 m up
    const cab = new THREE.MeshStandardMaterial({ color: 0xf2ead8, roughness: 0.55 });
    for (const [z0, z1] of [[-25.4, -15.0], [-4.2, 8]]) {
      const b = new THREE.Mesh(new RoundedBoxGeometry(3.2, 7, z1 - z0, 2, 0.12), cab);
      b.position.set(-5.8, 9.5, (z0 + z1) / 2); root.add(b);
      for (let z = z0 + 2.6; z < z1 - 1; z += 2.6) { const hnd = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.9, 8), new THREE.MeshStandardMaterial({ color: 0xc8773e, metalness: 0.7, roughness: 0.35 })); hnd.position.set(-4.15, 6.6, z); root.add(hnd); }
    }
  } else {
    // a dining room: dark beyond the table, chair backs at the far end
    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(80, 40), new THREE.MeshStandardMaterial({ color: isBar ? 0x3a2630 : 0xe6d3b2, roughness: 0.9 }));
    backWall.position.set(0, 10, -34); root.add(backWall);
  }

  // platforms (a cutting board, a drainboard): rounded slabs
  for (const [x0, z0, x1, z1, h] of stage.plat || []) {
    const m = surfMat(stage.id === 'sink' ? 'marble' : 'cutting_board', 1, { roughness: 0.6 });
    if (m.map) m.map.repeat.set((x1 - x0) / 5, (z1 - z0) / 5);
    const b = new THREE.Mesh(new RoundedBoxGeometry(x1 - x0, h, z1 - z0, 3, Math.min(0.12, h / 2.2)), m);
    b.position.set((x0 + x1) / 2, h / 2, (z0 + z1) / 2); b.receiveShadow = true; b.castShadow = true; root.add(b);
  }

  // lamps for the evening; fridge light for the night
  if (look.lamps) {
    for (const [x, z] of [[5.6, -22], [-6, -8.6], [3, 1]]) { const l = new THREE.PointLight(0xffb062, 60, 26, 1.6); l.position.set(x, 7, z); root.add(l); }
  }
  if (look.fridge) {
    const f = new THREE.SpotLight(0xcfe2ff, 260, 60, 0.7, 0.5, 1.2); f.position.set(14, 10, -6); f.target.position.set(0, 0, -9); root.add(f, f.target);
    const strip = new THREE.PointLight(0xffc27a, 40, 18, 1.5); strip.position.set(-5.5, 5.2, -10); root.add(strip);
  }

  scene.add(root);

  // the olives' road
  const pts = stage.path.map(([x, z]) => new THREE.Vector3(x, heightAt(stage, x, z), z));
  const curve = new THREE.CatmullRomCurve3(pts, false, 'centripetal', 0.5);
  const length = curve.getLength();
  const style = isTable ? 'runner' : isSink ? 'wet' : isBar ? 'sugar' : 'flour';
  root.add(pathRibbon(stage, curve, length, isTable ? 1.7 : 1.5, style));

  // dressing: every object is a 404 asset; anything not made yet is skipped
  const dressing = new THREE.Group();
  const list = DRESS[stage.id] || DRESS.board;
  const jobs = list.filter(([n]) => hasAsset(n)).map(async ([n, x0, z0, ry, h, y]) => {
    const k = Math.abs(x0) > 6 || z0 < -21.5 ? 1 : FIELD;   // wall and far-end props stay put
    const x = x0 * k, z = z0 * k;
    const o = await model(n, { height: h });
    o.position.set(x, y ?? heightAt(stage, x, z), z); o.rotation.y = ry;
    o.traverse((m) => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } });
    dressing.add(o);
  });
  await Promise.all(jobs);
  const baked = bakeStatic(dressing);
  baked.traverse((m) => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } });
  root.add(baked);

  return { root, curve, length, sun, look };
}
