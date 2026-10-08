  // PROFILES (profile order reversed from dinner_plate.js, whose faces point inward and render see-through): the dinner_plate cross-section (foot ring, well, rising rim, rolled lip, underside) turned once and reused five times with tiny offsets,
  // the sage line a lathe band on each rim (matches dinner_plate.js)
  const body = grp(g);
  const cer = M(C.cream, { r: 0.2 }), sage = M(C.sage, { r: 0.3 });
  const prof = [[0, 0.12], [0.85, 0.12], [0.95, 0.13], [1.0, 0.16], [1.12, 0.205], [1.3, 0.235], [1.345, 0.245], [1.35, 0.23], [1.32, 0.205], [1.1, 0.16], [0.95, 0.07], [0.82, 0.045], [0.8, 0], [0.7, 0], [0.68, 0.04], [0, 0.04]].reverse();
  const pg = lathe(prof, 28), sg = lathe([[1.2, 0.2245], [1.235, 0.2305], [1.235, 0.2325], [1.2, 0.2265]].reverse(), 28);
  const off = [[0, 0], [0.04, -0.02], [-0.03, 0.03], [0.02, 0.04], [-0.04, -0.01]];
  for (let i = 0; i < 5; i++) {
    const p = grp(body, [off[i][0], i * 0.185, off[i][1]], null, [0, i * 0.9, 0]);
    add(pg, cer, [0, 0, 0], p); add(sg, sage, [0, 0.002, 0], p);
  }
  fitAll(body, 1.0);
