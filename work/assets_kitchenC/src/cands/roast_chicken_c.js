  // DIFFERENT BREAKDOWN, the toy showpiece: two plump breast lobes + a back mass (overlapping squashed spheres), big drumsticks rising like the reference with bone knobs and paper frills, tucked wing tips, a glossy glaze highlight band; platter lathe; potatoes; lemon halves; herb sprigs
  const body = grp(g), P = grp(body); P.scale.set(1.08, 1, 1.5);
  add(lathe([[0, 0], [1.45, 0], [1.52, 0.08], [1.55, 0.16], [2.05, 0.3], [2.12, 0.38], [2.0, 0.36], [1.5, 0.24], [0, 0.22]], 36), ceramic(0xf6f1e4, 0.25), [0, 0, 0], P);
  const skin = M(0xc8742c, { r: 0.3 }), skinL = M(0xdc8c3c, { r: 0.28 }), skin2 = M(0xa8561c, { r: 0.35 }), bone = M(0xf2e6cc, { r: 0.5 });
  const ch = grp(body, [0, 0.22, 0]); ch.scale.setScalar(1.4);
  add(new THREE.SphereGeometry(1.0, 24, 14), skin2, [0, 0.62, -0.25], ch, null, [1.05, 0.62, 1.25]);
  for (const s of [-1, 1]) add(new THREE.SphereGeometry(0.72, 20, 14), s < 0 ? skin : skinL, [s * 0.36, 0.8, 0.15], ch, [0, 0, s * 0.15], [0.85, 0.85, 1.35]);
  add(new THREE.SphereGeometry(0.35, 12, 8), skin, [0, 0.72, 1.05], ch, null, [1.2, 0.8, 0.8]);
  for (const s of [-1, 1]) {
    const D = grp(ch, [s * 0.62, 0.75, 0.75], null, [-0.85, 0, -s * 0.45]);
    add(new THREE.SphereGeometry(0.38, 14, 10), skin, [0, 0.15, 0], D, null, [1, 1.35, 1]);
    rod([0, 0.6, 0], [0, 0.95, 0], 0.08, bone, D, 8); add(new THREE.SphereGeometry(0.13, 8, 6), bone, [0, 1.0, 0], D, null, [1.3, 0.8, 1]);
    add(deform(new THREE.CylinderGeometry(0.17, 0.11, 0.2, 14, 1, true), (v) => { if (v.y > 0) { const k = 1 + 0.25 * Math.cos(Math.atan2(v.z, v.x) * 7); v.x *= k; v.z *= k; } }), M(0xffffff, { r: 0.7, ds: true }), [0, 0.75, 0], D);
    add(new THREE.SphereGeometry(0.4, 12, 8), skin2, [s * 0.95, 0.55, -0.35], ch, [0.3, 0, s * 0.6], [0.45, 0.55, 1.0]);
  }
  const pot = M(0xd8a845, { r: 0.4 }), pg = deform(new THREE.IcosahedronGeometry(0.3, 1), (v) => { v.y *= 0.75; });
  for (let i = 0; i < 10; i++) { const a = i / 10 * TAU + 0.3; add(pg, pot, [Math.cos(a) * 1.9, 0.42, Math.sin(a) * 2.75], body, [i, i, 0]); }
  const lem = M(0xf2d23a, { r: 0.35 }), pith = M(0xfbf1c2, { r: 0.5 });
  for (const [x, z] of [[-1.6, 2.4], [1.6, -2.4]]) { add(new THREE.SphereGeometry(0.3, 12, 6, 0, TAU, 0, PI / 2), lem, [x, 0.3, z], body); add(new THREE.CircleGeometry(0.27, 12), pith, [x, 0.31, z], body, [-PI / 2, 0, 0]); }
  const herb = M(0x3f8a3a, { r: 0.55, name: 'foliage' }), ng = new THREE.ConeGeometry(0.045, 0.22, 4);
  for (let i = 0; i < 5; i++) { const a = i / 5 * TAU + 1.0, H = grp(body, [Math.cos(a) * 1.95, 0.42, Math.sin(a) * 2.95], null, [0, -a, 0]);
    rod([-0.35, 0, 0], [0.35, 0.05, 0], 0.025, herb, H, 4); for (let k = 0; k < 6; k++) for (const s of [-1, 1]) add(ng, herb, [-0.28 + k * 0.11, 0.02, s * 0.07], H, [s * 1.1, 0, 0]); }
  fitAll(body, 2.6);
