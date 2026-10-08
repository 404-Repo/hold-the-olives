  // EXTRUDE: the body as a rounded-rectangle side profile swept across, a top plate with two real slot holes, bread-shaped toast slices peeking out
  const body = grp(g);
  const red = M(C.red, { r: 0.28 }), chrome = metal(0xd9dde0, 0.15), dark = M(0x1e1e1e, { r: 0.7 }), toast = M(C.toast, { r: 0.75 }), crumb = M(0xf0cf8e, { r: 0.85 });
  const T = grp(body, [0, 0, 0], null, [0.14, 0, 0]);
  const W = 0.82, D = 0.52, H = 0.56;
  add(sideSlab(rrect(D - 0.04, H - 0.04, 0.12), W, 0.03, 0.02, 8), red, [0, 0.07 + H / 2, 0], T);
  add(sideSlab(rrect(D + 0.02, 0.06, 0.02), W + 0.04, 0.01, 0.01, 4), chrome, [0, 0.04, 0], T);       // chrome base band
  const top = rrect(W - 0.1, D - 0.1, 0.06);
  for (const z of [-0.1, 0.1]) { const p = new THREE.Path(); p.moveTo(-0.28, z - 0.035); p.lineTo(0.28, z - 0.035); p.lineTo(0.28, z + 0.035); p.lineTo(-0.28, z + 0.035); p.closePath(); top.holes.push(p); }
  add(slab(top, 0.022, 0.006, 0.006, 4), chrome, [0, 0.07 + H - 0.01, 0], T);
  for (const z of [-0.1, 0.1]) {
    add(new THREE.BoxGeometry(0.56, 0.2, 0.07), dark, [0, 0.07 + H - 0.1, -z], T);
    const ts = grp(T, [0, 0.07 + H - 0.2, -z], null, [-PI / 2, 0, 0]);
    add(slab(breadShape(0.44, 0.44), 0.05, 0.012, 0.01, 6), toast, [0, -0.025, -0.22], ts, [PI / 2, 0, 0]);
  }
  add(new THREE.BoxGeometry(0.04, 0.3, 0.02), dark, [W / 2 + 0.005, 0.07 + H * 0.5, 0], T);
  add(new THREE.BoxGeometry(0.08, 0.05, 0.12), chrome, [W / 2 + 0.04, 0.07 + H * 0.62, 0], T);
  for (const x of [0.12, 0.26]) add(new THREE.CylinderGeometry(0.045, 0.05, 0.05, 14), chrome, [x, 0.2, D / 2 + 0.02], T, [PI / 2, 0, 0]);
  add(new THREE.BoxGeometry(W * 0.9, 0.025, 0.012), chrome, [0, 0.36, D / 2 + 0.004], T);
  add(new THREE.BoxGeometry(W * 0.9, 0.025, 0.012), chrome, [0, 0.36, -D / 2 - 0.004], T);
  fitAll(body, 0.95);
