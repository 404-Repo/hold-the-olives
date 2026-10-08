  // DIFFERENT READING: a round, bottom-heavy glass shaker (smooth lathe, bulbous base), the pepper fill speckled with grey grains,
  // and a tall flat-topped steel cap with a raised ring of holes
  const body = grp(g);
  const gl = M(0xd8eef0, { r: 0.05, t: 0.38, ds: true }), pep = M(0x2e2824, { r: 0.95 }), pepL = M(0x7a6a58, { r: 0.95 }), st = metal(C.steel, 0.3), hole = M(0x1a1a1a, { r: 0.8 });
  add(lathe([[0, 0], [0.3, 0], [0.34, 0.06], [0.35, 0.2], [0.3, 0.42], [0.24, 0.56], [0.235, 0.6]], 20), gl, [0, 0, 0], body);
  add(lathe([[0, 0.05], [0.3, 0.05], [0.315, 0.2], [0.28, 0.36], [0.2, 0.4], [0, 0.41]], 16), pep, [0, 0, 0], body);
  for (let i = 0; i < 18; i++) { const t = (i + 0.5) / 18, a = i * 2.39996, y = 0.08 + 0.26 * t, r = y < 0.2 ? 0.31 : 0.31 - (y - 0.2) * 0.2; add(new THREE.SphereGeometry(0.018, 4, 3), pepL, [Math.cos(a) * r, y, Math.sin(a) * r], body); }
  add(lathe([[0.25, 0.58], [0.26, 0.58], [0.265, 0.8], [0.25, 0.83], [0.0, 0.84]], 20), st, [0, 0, 0], body);
  add(new THREE.TorusGeometry(0.11, 0.025, 6, 16), st, [0, 0.845, 0], body, [PI / 2, 0, 0]);
  for (let i = 0; i < 6; i++) { const a = i / 6 * TAU; add(new THREE.SphereGeometry(0.02, 6, 4), hole, [Math.cos(a) * 0.11, 0.87, Math.sin(a) * 0.11], body, null, [1, 0.4, 1]); }
  fitAll(body, 0.9);
