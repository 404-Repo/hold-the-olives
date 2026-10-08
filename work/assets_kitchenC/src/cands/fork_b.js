  // PRIMITIVES: chunky flattened capsule handle, a short neck box, a rounded-box palm tipped up, four flattened capsule tines and a cross bridge; lying flat, long axis z
  const body = grp(g);
  const st = metal(C.steel, 0.25);
  add(new THREE.CapsuleGeometry(0.13, 0.75, 4, 12), st, [0, 0.06, 0.45], body, [PI / 2, 0, 0], [1, 1, 0.45]);
  add(new THREE.BoxGeometry(0.1, 0.04, 0.35), st, [0, 0.03, -0.12], body);
  const H = grp(body, [0, 0.03, -0.3], null, [0.06, 0, 0]);
  add(rbox(0.34, 0.045, 0.32, 0.02), st, [0, -0.02, -0.12], H);
  for (let i = 0; i < 4; i++) add(new THREE.CapsuleGeometry(0.03, 0.42, 3, 8), st, [-0.135 + i * 0.09, 0.005, -0.5], H, [PI / 2, 0, 0], [1, 1, 0.6]);
  fitD(body, 2.0);
