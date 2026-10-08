  // PROFILES: one turned steel lathe for the tin (base bead, taper, rolled shoulder), a second for the strainer top (step, dome, spout), a third for the cap; darker steel seam bands
  const body = grp(g);
  const st = metal(C.steel, 0.25), dk = metal(0x9aa3ab, 0.3);
  add(lathe([[0, 0], [0.6, 0], [0.66, 0.04], [0.66, 0.1], [0.62, 0.14], [0.78, 1.55], [0.8, 1.62], [0.8, 1.7], [0, 1.7]], 32), st, [0, 0, 0], body);
  add(lathe([[0.79, 1.66], [0.83, 1.68], [0.83, 1.8], [0.79, 1.82]], 32), dk, [0, 0, 0], body);
  add(lathe([[0, 1.78], [0.8, 1.78], [0.78, 1.95], [0.7, 2.15], [0.5, 2.38], [0.3, 2.48], [0.26, 2.52], [0, 2.52]], 32), st, [0, 0, 0], body);
  add(lathe([[0.25, 2.48], [0.29, 2.5], [0.29, 2.56], [0.25, 2.58]], 20), dk, [0, 0, 0], body);
  add(lathe([[0, 2.52], [0.3, 2.52], [0.32, 2.56], [0.32, 2.88], [0.28, 2.97], [0.15, 3.0], [0, 3.0]], 24), st, [0, 0, 0], body);
  fitAll(body, 3.0);
