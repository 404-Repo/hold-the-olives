  // DIFFERENT READING: a tall squeeze-style bottle with a waisted grip (lathe with a pinch), a sage band at the shoulder as the "label" colour block,
  // a few bubbles suspended in the soap, a chunky pump with a long angled spout
  const body = grp(g);
  const bot = M(0x86b8a8, { r: 0.25, t: 0.45 }), soap = M(0x5f9a5a, { r: 0.15 }), band = M(0x5f8f80, { r: 0.4 }), wh = M(0xf7f5f0, { r: 0.35 }), bub = M(0xeaf6ee, { r: 0.1, t: 0.6 });
  const B = grp(body); B.scale.set(1, 1, 0.75);
  add(lathe([[0, 0], [0.4, 0], [0.47, 0.06], [0.48, 0.4], [0.42, 0.7], [0.48, 1.0], [0.48, 1.2], [0.36, 1.4], [0.18, 1.48], [0.18, 1.56], [0, 1.56]], 22), bot, [0, 0, 0], B);
  add(lathe([[0, 0.05], [0.41, 0.05], [0.43, 0.4], [0.37, 0.7], [0.43, 0.95], [0.0, 0.97]], 18), soap, [0, 0, 0], B);
  add(lathe([[0.485, 1.02], [0.495, 1.04], [0.495, 1.18], [0.485, 1.2]], 22), band, [0, 0, 0], B);
  for (const p of [[0.15, 0.3, 0.2], [-0.2, 0.5, 0.15], [0.05, 0.75, -0.2], [0.22, 0.85, 0.1]]) add(new THREE.SphereGeometry(0.06, 8, 6), bub, p, B);
  add(new THREE.CylinderGeometry(0.22, 0.22, 0.2, 16), wh, [0, 1.6, 0], body);
  add(new THREE.CylinderGeometry(0.08, 0.08, 0.2, 10), wh, [0, 1.78, 0], body);
  add(rbox(0.32, 0.22, 0.36, 0.09), wh, [0, 1.86, 0], body);
  const sp = rod([0, 2.0, 0.12], [0, 1.9, 0.62], 0.055, wh, body, 8);
  fitAll(body, 2.2);
