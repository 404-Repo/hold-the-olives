  // PROFILES: one lathe cross-section with real wall thickness: rounded mouth rim at the bottom, flared wall, a thick heavy base on top
  // (outside up, inside back down); drops of water on the inside and a pooled drop at the rim
  const body = grp(g);
  const gl = M(0xd8eef0, { r: 0.05, t: 0.4, ds: true }), wat = M(0xbfe3ef, { r: 0.05, t: 0.7 });
  add(lathe([[0.43, 0.0], [0.5, 0.0], [0.52, 0.04], [0.47, 0.7], [0.41, 1.45], [0.38, 1.58], [0.3, 1.6], [0, 1.6]], 24), gl, [0, 0, 0], body);
  add(lathe([[0, 1.36], [0.33, 1.36], [0.36, 1.32], [0.43, 0.7], [0.47, 0.04], [0.43, 0.0]], 24), gl, [0, 0, 0], body);
  for (let i = 0; i < 6; i++) { const a = i * 2.4 + 0.3, y = 0.3 + ((i * 0.618) % 1) * 0.8, r = 0.47 - y * 0.05 - 0.03; add(new THREE.SphereGeometry(0.05, 8, 6), wat, [Math.cos(a) * r, y, Math.sin(a) * r], body, null, [1, 1.5, 0.7]); }
  add(new THREE.SphereGeometry(0.09, 10, 6), wat, [0.47, 0.03, 0.12], body, null, [1, 0.35, 1.4]);
  fitAll(body, 1.6);
