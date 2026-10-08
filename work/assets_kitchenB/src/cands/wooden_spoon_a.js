  // PRIMITIVES: bowl = open hemisphere shell scaled to an oval + a rim torus, neck = tapered cylinder, handle = cylinder with a sphere end, all lying flat along z (bowl at +z)
  const body = grp(g);
  const wd = timber(C.wood, 0.6); const wdd = M(C.wood, { r: 0.6, name: 'timber', ds: true });
  add(new THREE.SphereGeometry(0.42, 18, 6, 0, TAU, PI / 2, PI / 2), wdd, [0, 0.2, 1.05], body, null, [0.85, 0.4, 1.2]);
  add(new THREE.TorusGeometry(0.42, 0.035, 6, 24), wd, [0, 0.2, 1.05], body, [PI / 2, 0, 0], [0.85, 1.2, 1]);
  rod([0, 0.11, 0.6], [0, 0.09, 0.15], 0.08, wd, body, 10, 0.1);
  rod([0, 0.09, 0.15], [0, 0.08, -1.45], 0.085, wd, body, 10, 0.08);
  add(new THREE.SphereGeometry(0.09, 10, 8), wd, [0, 0.08, -1.45], body);
  fitWHD(body, 0.72, 0.2, 3.0);
