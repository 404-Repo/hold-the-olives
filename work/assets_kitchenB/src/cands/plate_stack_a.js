  // PRIMITIVES: each plate = a flat cylinder foot+well + an open cone rim (DoubleSide) + a rim torus + a sage torus line; five stacked
  const body = grp(g);
  const cer = M(C.cream, { r: 0.2, ds: true }), sage = M(C.sage, { r: 0.3 });
  for (let i = 0; i < 5; i++) {
    const p = grp(body, [(i % 2 ? 0.03 : -0.02), i * 0.19, (i % 3 - 1) * 0.025], null, [0, i * 0.7, 0]);
    add(new THREE.CylinderGeometry(0.85, 0.75, 0.08, 32), cer, [0, 0.04, 0], p);
    add(new THREE.CylinderGeometry(1.34, 0.9, 0.17, 32, 1, true), cer, [0, 0.165, 0], p);
    add(new THREE.TorusGeometry(1.33, 0.04, 6, 36), cer, [0, 0.245, 0], p, [PI / 2, 0, 0]);
    add(new THREE.TorusGeometry(1.2, 0.018, 4, 36), sage, [0, 0.235, 0], p, [PI / 2, 0, 0]);
  }
  fitAll(body, 1.0);
