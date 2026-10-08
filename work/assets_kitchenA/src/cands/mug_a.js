  // a: primitives. Open cylinder wall, base, rim torus, sage band, torus handle on +x.
  const cream = M(C.cream, 0.45), creamD = M(C.cream, 0.45, 0, undefined, { side: DS }), sage = M(C.sage, 0.45);
  add(cyl(0.45, 0.43, 0.96, 22, true), creamD, 0, 0.48, 0);
  add(cyl(0.43, 0.43, 0.06, 22), cream, 0, 0.03, 0);
  add(cyl(0.39, 0.39, 0.02, 22), cream, 0, 0.12, 0);
  add(new THREE.TorusGeometry(0.43, 0.035, 6, 22), cream, 0, 0.96, 0, Math.PI / 2);
  add(cyl(0.458, 0.452, 0.24, 22, true), M(C.sage, 0.45, 0, undefined, { side: DS }), 0, 0.74, 0);
  add(new THREE.TorusGeometry(0.24, 0.07, 8, 14, Math.PI * 1.15), cream, 0.45, 0.52, 0, 0, 0, -Math.PI * 0.575);
  finish(HEIGHT);
