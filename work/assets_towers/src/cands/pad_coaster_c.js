  // DIFFERENT READING: a dished cork coaster with a raised pale rim ROLL around the edge (like a saucer lip) and a recessed cork centre
  const body = grp(g);
  const cork = M(C.cork, { r: 0.92 }), pale = M(0xe9d6b0, { r: 0.75 });
  add(new THREE.CylinderGeometry(0.6, 0.62, 0.06, 40), cork, [0, 0.03, 0], body);
  add(new THREE.TorusGeometry(0.6, 0.042, 8, 40), pale, [0, 0.048, 0], body, [PI / 2, 0, 0]);
  add(new THREE.TorusGeometry(0.45, 0.01, 4, 40), M(0xa57a4c, { r: 0.9 }), [0, 0.06, 0], body, [PI / 2, 0, 0]);
  fitH(body, 0.09);
