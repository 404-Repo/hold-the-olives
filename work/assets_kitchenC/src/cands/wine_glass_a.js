  // PROFILES: one closed thick-wall lathe for foot, stem and bowl (wound outward), wine as a lathe solid filling the bowl to a third
  const body = grp(g);
  const W = [[0.62, 0], [0.64, 0.05], [0.56, 0.11], [0.14, 0.17], [0.12, 0.32], [0.12, 0.82], [0.15, 0.94], [0.4, 1.06], [0.6, 1.3], [0.64, 1.52], [0.59, 1.82], [0.5, 2.12]];
  add(vessel(W, 0.05, 1.02, 28), glass(0.4), [0, 0, 0], body);
  add(fill(W, 0.05, 1.02, 1.36, 28), liquid(0x7a1426, 0.9, 0.12), [0, 0, 0], body);
  fitAll(body, 2.2);
