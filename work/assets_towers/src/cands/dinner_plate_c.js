  // DIFFERENT READING: a chunky toy plate: a thick flat disc with a fat rolled rim (big torus) and a recessed well, the sage line on the rim's top
  const body = grp(g);
  const cer = M(C.cream, { r: 0.2 }), sage = M(C.sage, { r: 0.3 });
  add(new THREE.CylinderGeometry(1.25, 1.2, 0.13, 56), cer, [0, 0.065, 0], body);
  add(new THREE.TorusGeometry(1.24, 0.1, 10, 56), cer, [0, 0.15, 0], body, [PI / 2, 0, 0], [1, 1, 1]);
  add(new THREE.TorusGeometry(1.2, 0.012, 4, 56), sage, [0, 0.248, 0], body, [PI / 2, 0, 0]);
  fitH(body, 0.25);
