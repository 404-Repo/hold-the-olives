  // PROFILES: one closed thick-wall lathe (foot, stem, wide shallow saucer), pale drink lathe fill, lemon twist = a flattened helix tube hooked over the rim
  const body = grp(g);
  const W = [[0.55, 0], [0.57, 0.05], [0.5, 0.1], [0.12, 0.16], [0.07, 0.3], [0.07, 1.1], [0.14, 1.24], [0.5, 1.36], [0.78, 1.5], [0.88, 1.68], [0.88, 1.76]];
  add(vessel(W, 0.05, 1.27, 32), glass(0.4), [0, 0, 0], body);
  add(fill(W, 0.05, 1.27, 1.6, 32), liquid(0xf3e6a2, 0.75, 0.06), [0, 0, 0], body);
  const pts = []; for (let i = 0; i <= 18; i++) { const t = i / 18, a = t * TAU * 1.6; pts.push([0.78 + 0.1 * Math.cos(a), 1.95 - 0.55 * t, 0.1 * Math.sin(a)]); }
  tube(pts, 0.035, M(0xf2c12e, { r: 0.35 }), body, 40, 6);
  fitAll(body, 1.8);
