  // DIFFERENT READING: a deep skillet with a flared lip, a tube handle that rises in a curve and ends in a teardrop loop,
  // a little helper lug opposite, and the egg as two lumpy white blobs around a high yolk
  const body = grp(g);
  const cu = M(C.copper, { r: 0.3, m: 0.85, name: 'metal', ds: true });
  add(lathe([[0, 0], [0.95, 0], [1.05, 0.04], [1.15, 0.22], [1.2, 0.38], [1.3, 0.48], [1.34, 0.5]], 36), cu, [0, 0, 0], body);
  add(new THREE.CylinderGeometry(0.97, 0.97, 0.03, 36), M(0xb8693a, { r: 0.35, m: 0.8, name: 'metal' }), [0, 0.04, 0], body);
  tube([[1.15, 0.32, 0], [1.6, 0.4, 0], [2.4, 0.5, 0], [3.1, 0.58, 0]], 0.08, cu, body, 12, 8);
  tube([[3.05, 0.58, 0], [3.3, 0.6, 0.12], [3.42, 0.6, 0], [3.3, 0.6, -0.12], [3.05, 0.58, 0]], 0.04, cu, body, 16, 6);
  add(rbox(0.3, 0.08, 0.3, 0.035), cu, [-1.35, 0.36, 0], body);
  const ew = M(0xfbf7ee, { r: 0.3 });
  add(new THREE.SphereGeometry(0.5, 16, 8), ew, [0.0, 0.07, 0], body, null, [1.2, 0.16, 1]);
  add(new THREE.SphereGeometry(0.3, 12, 6), ew, [-0.45, 0.07, 0.35], body, null, [1, 0.18, 1.1]);
  add(new THREE.SphereGeometry(0.22, 16, 10), M(0xf7b51a, { r: 0.18 }), [0.05, 0.13, 0.0], body, null, [1, 0.6, 1]);
  add(new THREE.SphereGeometry(0.05, 8, 6), M(0xffffff, { r: 0.1 }), [0.0, 0.25, 0.09], body);
  fitAll(body, 0.6);
