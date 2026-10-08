  // PROFILES: a faceted lathe (8 radial segments) glass body with a thick base and a slight waist, a lathe pepper fill with a mounded top,
  // a turned steel cap with a screw band and a dome; holes as dark dots
  const body = grp(g);
  const gl = M(0xd8eef0, { r: 0.05, t: 0.4, ds: true }), pep = M(0x2e2824, { r: 0.95 }), st = metal(C.steel, 0.3), hole = M(0x1a1a1a, { r: 0.8 });
  add(lathe([[0, 0], [0.31, 0], [0.31, 0.08], [0.285, 0.3], [0.29, 0.6], [0.26, 0.62]], 8), gl, [0, 0, 0], body);
  add(new THREE.CylinderGeometry(0.29, 0.31, 0.08, 8), M(0xd8eef0, { r: 0.05, t: 0.6 }), [0, 0.04, 0], body);
  add(lathe([[0, 0.08], [0.27, 0.08], [0.255, 0.3], [0.26, 0.42], [0.2, 0.46], [0, 0.48]], 8), pep, [0, 0, 0], body);
  add(lathe([[0, 0.6], [0.29, 0.6], [0.3, 0.63], [0.29, 0.66], [0.3, 0.69], [0.29, 0.72], [0.27, 0.74], [0.24, 0.82], [0.14, 0.88], [0, 0.9]], 20), st, [0, 0, 0], body);
  for (let i = 0; i < 9; i++) { const a = i / 8 * TAU, r = i === 8 ? 0 : 0.12; add(new THREE.SphereGeometry(0.022, 6, 4), hole, [Math.cos(a) * r, 0.885 - (r ? 0.03 : 0), Math.sin(a) * r], body, null, [1, 0.4, 1]); }
  fitAll(body, 0.9);
