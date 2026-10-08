  // B: lathe. Swept body with a wide pit hole, the pimento a swept red cup that wells up out of it.
  const o = olive({ H: 0.33, col: 0x8aa52e, expr: 'surprised', legH: 0.035, holeR: 0.2, egg: 0.06 }, 'lathe');
  const top = o.y0 + o.Hb, W = o.W, red = M(0xe03a2a, { r: 0.25 });
  const pr = [[0, top - W * 0.05], [W * 0.15, top - W * 0.05], [W * 0.19, top + W * 0.02], [W * 0.18, top + W * 0.08], [W * 0.13, top + W * 0.115], [W * 0.07, top + W * 0.1], [W * 0.05, top + W * 0.06], [0, top + W * 0.055]];
  add(lathe(pr, 14), red, [0, 0, 0], g, null, [1, 1, o.zk]);
