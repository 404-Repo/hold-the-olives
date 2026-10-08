  // PRIMITIVES: open tapered cylinder wall + base disc + rim torus, handle = rod with an end ring, rivets; egg = squashed sphere white + yolk dome
  const body = grp(g);
  const cu = M(C.copper, { r: 0.3, m: 0.85, name: 'metal', ds: true });
  const R1 = 1.05, R2 = 1.3, H = 0.42;
  add(new THREE.CylinderGeometry(R2, R1, H, 40, 1, true), cu, [0, H / 2, 0], body);
  add(new THREE.CylinderGeometry(R1, R1 - 0.03, 0.05, 40), cu, [0, 0.025, 0], body);
  add(new THREE.TorusGeometry(R2, 0.045, 6, 40), cu, [0, H, 0], body, [PI / 2, 0, 0]);
  const hd = grp(body, [R2 - 0.05, 0.3, 0], null, [0, 0, 0.12]);
  add(rbox(2.0, 0.1, 0.24, 0.045), cu, [1.0, 0, 0], hd);
  add(new THREE.TorusGeometry(0.1, 0.045, 6, 14), cu, [2.05, 0.05, 0], hd, [PI / 2, 0, 0]);
  for (const z of [-0.07, 0.07]) add(new THREE.SphereGeometry(0.04, 8, 6), cu, [R2 - 0.04, 0.33, z], body);
  const ew = M(0xfbf7ee, { r: 0.3 });
  add(new THREE.SphereGeometry(0.6, 20, 8), ew, [-0.05, 0.05, 0.05], body, null, [1.1, 0.12, 0.95]);
  add(new THREE.SphereGeometry(0.36, 14, 6), ew, [0.35, 0.06, -0.3], body, null, [1, 0.12, 0.9]);
  add(new THREE.SphereGeometry(0.24, 18, 10, 0, TAU, 0, PI / 2), M(0xf7b51a, { r: 0.18 }), [0.0, 0.1, 0.05], body, null, [1, 0.75, 1]);
  fitAll(body, 0.6);
