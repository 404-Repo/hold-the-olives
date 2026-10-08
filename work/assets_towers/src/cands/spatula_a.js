  // PRIMITIVES: a blade of three tines and crossbars leaving two slots, a tapering neck box, a cylinder handle with a sphere end, lying flat
  const body = grp(g);
  const w = timber(C.wood, 0.55), w2 = timber(0xb88a56, 0.55);
  const T = 0.07;
  add(new THREE.BoxGeometry(0.9, T, 0.22), w, [0, T / 2, 1.18], body);
  add(new THREE.BoxGeometry(0.8, T, 0.14), w, [0, T / 2, 0.42], body);
  for (const x of [-0.37, 0, 0.37]) add(new THREE.BoxGeometry(x === 0 ? 0.22 : 0.16, T, 0.64), w, [x * 1.03 * (x === 0 ? 1 : 1), T / 2, 0.8], body);
  add(new THREE.CylinderGeometry(0.45, 0.45, T, 24, 1, false, -PI / 2, PI), w, [0, T / 2, 1.29], body, null, [1, 1, 0.3]);
  add(new THREE.BoxGeometry(0.3, T + 0.02, 0.5), w2, [0, (T + 0.02) / 2, 0.1], body);
  add(new THREE.CylinderGeometry(0.11, 0.1, 1.45, 14), w, [0, 0.11, -0.85], body, [PI / 2, 0, 0]);
  add(new THREE.SphereGeometry(0.14, 14, 10), w, [0, 0.13, -1.62], body);
  fitD(body, 3.5);
