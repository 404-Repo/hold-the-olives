  // LATHE: one plate cross-section (foot ring, well, rising rim, rolled lip, underside) turned once; the sage line a thin lathe band laid on the rim
  const body = grp(g);
  const cer = M(C.cream, { r: 0.2 }), sage = M(C.sage, { r: 0.3 });
  const prof = [[0, 0.12], [0.85, 0.12], [0.95, 0.13], [1.0, 0.16], [1.12, 0.205], [1.3, 0.235], [1.345, 0.245], [1.35, 0.23], [1.32, 0.205], [1.1, 0.16], [0.95, 0.07], [0.82, 0.045], [0.8, 0], [0.7, 0], [0.68, 0.04], [0, 0.04]];
  add(lathe(prof, 56), cer, [0, 0, 0], body);
  add(lathe([[1.2, 0.2245], [1.235, 0.2305], [1.235, 0.2325], [1.2, 0.2265]], 56), sage, [0, 0.002, 0], body);
  fitH(body, 0.25);
