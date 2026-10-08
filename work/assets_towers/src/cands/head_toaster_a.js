  // PRIMITIVES: a box body with cylinder-rounded edges, chrome base and top plate, two dark slot boxes, toast slices as thin boxes with crust, a lever and knob
  const body = grp(g);
  const red = M(C.red, { r: 0.3 }), chrome = metal(0xd9dde0, 0.15), dark = M(0x232323, { r: 0.6 }), toast = M(C.toast, { r: 0.75 }), crust = M(C.crust, { r: 0.65 });
  const T = grp(body, [0, 0, 0], null, [0.14, 0, 0]);
  const W = 0.8, D = 0.5, H = 0.55, r = 0.1;
  add(new THREE.BoxGeometry(W - 2 * r, H, D), red, [0, 0.06 + H / 2, 0], T);
  add(new THREE.BoxGeometry(W, H, D - 2 * r), red, [0, 0.06 + H / 2, 0], T);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) add(new THREE.CylinderGeometry(r, r, H, 12), red, [sx * (W / 2 - r), 0.06 + H / 2, sz * (D / 2 - r)], T);
  add(new THREE.BoxGeometry(W + 0.04, 0.07, D + 0.04), chrome, [0, 0.035, 0], T);
  add(new THREE.BoxGeometry(W - 0.06, 0.025, D - 0.06), chrome, [0, 0.06 + H + 0.01, 0], T);
  for (const z of [-0.1, 0.1]) {
    add(new THREE.BoxGeometry(0.58, 0.03, 0.08), dark, [0, 0.06 + H + 0.012, z], T);
    add(new THREE.BoxGeometry(0.5, 0.36, 0.05), toast, [0, 0.06 + H - 0.04, z], T);
    add(new THREE.CylinderGeometry(0.25, 0.25, 0.055, 16, 1, false, -PI / 2, PI), crust, [0, 0.06 + H + 0.12, z], T, [PI / 2, 0, 0], [1, 1, 0.5]);
  }
  add(new THREE.BoxGeometry(0.06, 0.05, 0.14), chrome, [W / 2 + 0.03, 0.06 + H * 0.6, 0], T);
  add(new THREE.CylinderGeometry(0.05, 0.05, 0.04, 14), chrome, [0.22, 0.2, D / 2 + 0.02], T, [PI / 2, 0, 0]);
  add(new THREE.BoxGeometry(W - 0.1, 0.02, 0.02), chrome, [0, 0.4, D / 2 + 0.003], T);
  fitAll(body, 0.95);
