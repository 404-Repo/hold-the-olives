  // DIFFERENT READING: a faceted (8 side) decanter-style bottle with a long neck, amber fill, a sage band and a narrow gold band, a red screw cap with a wax drip collar
  const body = grp(g);
  const W = [[0.85, 0], [0.95, 0.08], [1.0, 0.25], [1.0, 2.1], [0.75, 2.6], [0.35, 2.9], [0.28, 3.2], [0.28, 3.8], [0.33, 3.85]];
  add(vessel(W, 0.07, 0.15, 8), glass(0.42), [0, 0, 0], body);
  add(fill(W, 0.07, 0.15, 2.45, 8, 8), M(0xc0661a, { r: 0.1 }), [0, 0, 0], body);
  add(lathe([[1.02, 0.7], [1.04, 0.72], [1.04, 1.5], [1.02, 1.52]], 8), M(C.sage, { r: 0.5 }), [0, 0, 0], body);
  add(lathe([[1.02, 1.62], [1.04, 1.63], [1.04, 1.72], [1.02, 1.73]], 8), M(0xd9b23a, { r: 0.35, m: 0.5, name: 'metal' }), [0, 0, 0], body);
  add(lathe([[0, 3.75], [0.36, 3.75], [0.36, 4.35], [0.3, 4.4], [0, 4.4]], 16), M(C.red, { r: 0.35 }), [0, 0, 0], body);
  add(deform(lathe([[0.3, 3.55], [0.37, 3.6], [0.37, 3.78], [0.3, 3.8]], 16), (v) => { const th = Math.atan2(v.z, v.x); if (v.y < 3.62) v.y -= 0.1 * Math.max(0, Math.sin(th * 3)); }), M(0xb02a24, { r: 0.3 }), [0, 0, 0], body);
  fitAll(body, 4.4);
