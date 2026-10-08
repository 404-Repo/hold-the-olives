  // PRIMITIVES: a foot cylinder, a flat well disc, an open cone for the rim slope, a torus lip, a thin sage torus near the rim
  const body = grp(g);
  const cer = M(C.cream, { r: 0.22 }), sage = M(C.sage, { r: 0.3 });
  add(new THREE.CylinderGeometry(0.8, 0.78, 0.06, 48), cer, [0, 0.03, 0], body);
  add(new THREE.CylinderGeometry(0.95, 0.95, 0.07, 48), cer, [0, 0.095, 0], body);
  add(new THREE.CylinderGeometry(1.3, 0.95, 0.12, 48, 1, true), M(C.cream, { r: 0.22, ds: true }), [0, 0.17, 0], body);
  add(new THREE.TorusGeometry(1.3, 0.04, 8, 48), cer, [0, 0.21, 0], body, [PI / 2, 0, 0]);
  add(new THREE.TorusGeometry(1.14, 0.012, 4, 48), sage, [0, 0.195, 0], body, [PI / 2, 0, 0]);
  fitH(body, 0.25);
