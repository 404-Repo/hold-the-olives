  // DIFFERENT READING: a chunky pull-down gooseneck: a thick column and arch (tube), the arch ending in a separate, fatter spray head that docks in it,
  // a stepped round base, and the lever as a joystick handle standing on a side boss
  const body = grp(g);
  const st = metal(C.steel, 0.25), dk = M(0x2a2a2a, { r: 0.6 });
  add(lathe([[0, 0], [0.78, 0], [0.8, 0.06], [0.74, 0.14], [0.52, 0.2], [0.5, 0.4], [0.4, 0.46], [0, 0.46]], 28), st, [0, 0, 0], body);
  tube([[0, 0.4, 0], [0, 3.0, 0], [0, 4.7, 0.1], [0, 5.62, 0.65], [0, 5.65, 1.5], [0, 5.1, 2.3], [0, 4.75, 2.42]], 0.3, st, body, 40, 14);
  add(lathe([[0, 3.9], [0.3, 3.9], [0.37, 3.95], [0.4, 4.1], [0.38, 4.7], [0.32, 4.78], [0, 4.78]], 18), st, [0, 0, 2.45], body);
  add(new THREE.CylinderGeometry(0.405, 0.405, 0.06, 18), dk, [0, 4.6, 2.45], body);
  add(new THREE.CylinderGeometry(0.26, 0.26, 0.02, 14), dk, [0, 3.89, 2.45], body);
  add(new THREE.CylinderGeometry(0.3, 0.34, 0.4, 18), st, [0.4, 1.9, 0], body, [0, 0, PI / 2]);
  rod([0.6, 1.9, 0], [0.72, 2.75, 0.18], 0.08, st, body, 10, 0.06);
  add(new THREE.CapsuleGeometry(0.11, 0.12, 4, 10), st, [0.74, 2.85, 0.2], body);
  fitAll(body, 6.0);
