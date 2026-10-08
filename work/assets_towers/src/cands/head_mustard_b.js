  // LATHE: one turned squeeze-bottle profile, a ridged lathe cap and nozzle, a darker colour band instead of a label, a lathe swivel ring
  const body = grp(g);
  const must = M(C.mustard, { r: 0.28 }), band = M(0xe3a003, { r: 0.35 }), red = M(C.red, { r: 0.28 }), steel = metal(), drip = M(C.mustard, { r: 0.12 });
  add(lathe([[0, 0], [0.32, 0], [0.33, 0.04], [0.26, 0.07], [0.22, 0.08], [0.2, 0.1], [0.12, 0.12], [0.08, 0.2], [0.07, 0.26], [0, 0.27]], 28), steel, [0, 0, 0], body);
  add(new THREE.TorusGeometry(0.2, 0.03, 8, 28), steel, [0, 0.27, 0], body, [PI / 2, 0, 0]);
  const B = grp(body, [0, 0.27, 0], null, [0.95, 0, 0]);
  add(lathe([[0, 0], [0.16, 0], [0.2, 0.03], [0.215, 0.1], [0.21, 0.3], [0.215, 0.5], [0.2, 0.58], [0.15, 0.64], [0.11, 0.66], [0, 0.66]], 22), must, [0, 0, 0], B);
  add(new THREE.CylinderGeometry(0.218, 0.218, 0.1, 22, 1, true), band, [0, 0.33, 0], B);
  add(lathe([[0, 0], [0.125, 0], [0.13, 0.04], [0.125, 0.08], [0.1, 0.1], [0.06, 0.24], [0.03, 0.32], [0.022, 0.38], [0, 0.385]], 16), red, [0, 0.64, 0], B);
  for (const y of [0.02, 0.05]) add(new THREE.TorusGeometry(0.13, 0.008, 4, 16), red, [0, 0.64 + y, 0], B, [PI / 2, 0, 0]);
  add(new THREE.SphereGeometry(0.04, 10, 6), drip, [0, 1.06, 0.0], B, null, [1, 1.3, 1]);
  add(new THREE.ConeGeometry(0.034, 0.07, 8), drip, [0, 1.1, 0], B, [PI, 0, 0]);
  for (const s of [-1, 1]) add(new THREE.CylinderGeometry(0.03, 0.03, 0.12, 8), steel, [s * 0.2, 0.06, 0], B);
  fitAll(body, 1.0);
