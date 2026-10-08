  // PRIMITIVES: cylinder bottle with sphere shoulders, red cone cap and nozzle, tipped forward on a swivel ring, a drip at the nozzle
  const body = grp(g);
  const must = M(C.mustard, { r: 0.3 }), band = M(0xd99c05, { r: 0.35 }), red = M(C.red, { r: 0.3 }), steel = metal(), drip = M(C.mustard, { r: 0.15 });
  add(new THREE.CylinderGeometry(0.3, 0.32, 0.06, 28), steel, [0, 0.03, 0], body);
  add(new THREE.TorusGeometry(0.26, 0.035, 8, 28), steel, [0, 0.08, 0], body, [PI / 2, 0, 0]);
  add(new THREE.CylinderGeometry(0.06, 0.08, 0.2, 12), steel, [0, 0.16, 0], body);
  const B = grp(body, [0, 0.26, 0], null, [0.95, 0, 0]);    // positive x rotation tips the top toward +Z
  for (const s of [-1, 1]) add(new THREE.BoxGeometry(0.04, 0.2, 0.08), steel, [s * 0.22, 0.12, 0], B);
  add(new THREE.SphereGeometry(0.2, 18, 8), must, [0, 0.2, 0], B, null, [1, 0.5, 1]);
  add(new THREE.CylinderGeometry(0.2, 0.2, 0.46, 20), must, [0, 0.43, 0], B);
  add(new THREE.CylinderGeometry(0.205, 0.205, 0.08, 20), band, [0, 0.42, 0], B);
  add(new THREE.SphereGeometry(0.2, 18, 8, 0, TAU, 0, PI / 2), must, [0, 0.66, 0], B, null, [1, 0.45, 1]);
  add(new THREE.CylinderGeometry(0.11, 0.13, 0.08, 16), red, [0, 0.76, 0], B);
  add(new THREE.ConeGeometry(0.11, 0.26, 16), red, [0, 0.93, 0], B);
  add(new THREE.CylinderGeometry(0.015, 0.02, 0.05, 8), red, [0, 1.07, 0], B);
  add(new THREE.SphereGeometry(0.035, 10, 6), drip, [0, 1.11, 0.0], B, null, [1, 1.3, 1]);
  add(new THREE.ConeGeometry(0.03, 0.06, 8), drip, [0, 1.15, 0.0], B, [PI, 0, 0]);
  fitAll(body, 1.0);
