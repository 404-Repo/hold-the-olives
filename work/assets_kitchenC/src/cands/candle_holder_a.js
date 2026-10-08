  // PROFILES: turned brass lathe (stepped base, baluster stem, drip cup), candle lathe with a soft melted top, wax drips as capsules, wick, teardrop flame lathe (emissive) with a pale core
  const body = grp(g);
  add(lathe([[0, 0], [0.95, 0], [1.0, 0.06], [1.0, 0.16], [0.9, 0.22], [0.78, 0.26], [0.72, 0.34], [0.4, 0.4], [0.24, 0.5], [0.2, 0.62], [0.3, 0.75], [0.36, 0.88], [0.3, 1.0], [0.2, 1.08], [0.24, 1.15], [0.18, 1.25], [0.16, 1.4], [0.24, 1.48], [0.5, 1.56], [0.56, 1.62], [0.52, 1.68], [0.36, 1.66], [0.34, 1.62], [0, 1.62]], 28), brass(), [0, 0, 0], body);
  const wax = M(0xf4ead0, { r: 0.55 });
  add(lathe([[0, 1.6], [0.33, 1.6], [0.33, 2.85], [0.3, 2.92], [0.22, 2.9], [0, 2.86]], 20), wax, [0, 0, 0], body);
  for (const [a, l] of [[0.6, 0.45], [2.4, 0.3], [4.1, 0.6]]) add(new THREE.CapsuleGeometry(0.06, l, 3, 6), wax, [0.32 * Math.cos(a), 2.86 - l / 2, 0.32 * Math.sin(a)], body);
  add(new THREE.CylinderGeometry(0.02, 0.025, 0.12, 5), M(0x2a2420, { r: 0.8 }), [0, 2.92, 0], body);
  const fl = [[0, 2.94], [0.08, 2.98], [0.13, 3.06], [0.12, 3.16], [0.06, 3.28], [0, 3.4]];
  add(lathe(fl, 12), glow(0xffb347, 1.8), [0, 0, 0], body);
  add(lathe(fl.map(([r, y]) => [r * 0.5, 2.94 + (y - 2.94) * 0.6]), 10), glow(0xfff2c0, 2.0), [0, 0.01, 0], body, null, [1, 1, 1]);
  fitAll(body, 3.4);
