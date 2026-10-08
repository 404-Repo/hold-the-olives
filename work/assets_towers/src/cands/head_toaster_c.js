  // DIFFERENT READING: a rounder 1950s loaf toaster: domed stadium side profile, chrome wrap stripes, toast slanted in its slots
  const body = grp(g);
  const red = M(C.red, { r: 0.25 }), chrome = metal(0xd9dde0, 0.15), dark = M(0x1e1e1e, { r: 0.7 }), toast = M(C.toast, { r: 0.75 }), crust = M(C.crust, { r: 0.65 });
  const T = grp(body, [0, 0, 0], null, [0.14, 0, 0]);
  const pr = new THREE.Shape(); pr.moveTo(-0.26, 0); pr.lineTo(0.26, 0); pr.lineTo(0.27, 0.32); pr.quadraticCurveTo(0.27, 0.56, 0, 0.58); pr.quadraticCurveTo(-0.27, 0.56, -0.27, 0.32); pr.closePath();
  add(sideSlab(pr, 0.8, 0.06, 0.03, 10), red, [0, 0.06, 0], T);
  for (const x of [-0.25, 0.25]) add(sideSlab(pr, 0.04, 0, 0, 10), chrome, [x, 0.06, 0], T, null, [1, 1.025, 1.04]);
  add(new THREE.BoxGeometry(0.86, 0.06, 0.56), chrome, [0, 0.03, 0], T);
  for (const s of [-1, 1]) {
    const z = s * 0.09;
    add(new THREE.BoxGeometry(0.56, 0.05, 0.08), dark, [0, 0.66, z], T);
    const t = grp(T, [0, 0.62, z], null, [s * 0.12, 0, 0]);
    add(new THREE.BoxGeometry(0.46, 0.3, 0.05), toast, [0, 0.05, 0], t);
    add(new THREE.CylinderGeometry(0.23, 0.23, 0.052, 16, 1, false, -PI / 2, PI), crust, [0, 0.2, 0], t, [PI / 2, 0, 0], [1, 1, 0.45]);
  }
  add(new THREE.BoxGeometry(0.08, 0.06, 0.14), chrome, [0.44, 0.4, 0], T);
  add(new THREE.CylinderGeometry(0.05, 0.05, 0.05, 14), chrome, [0, 0.22, 0.3], T, [PI / 2, 0, 0]);
  fitAll(body, 0.95);
