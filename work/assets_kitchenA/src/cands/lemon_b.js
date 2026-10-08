  // b: lathe. Lemon profile with pointed ends revolved and laid on its side; half = the same profile cut at the equator,
  // standing cut-face up, with a raised pith ring and segment wedges extruded slightly proud.
  const rind = M(C.lemon, 0.35), pith = M(0xfdf3c8, 0.6), flesh = M(0xf7dc4a, 0.15);
  const P = [[0, -0.42], [0.04, -0.39], [0.1, -0.35], [0.22, -0.25], [0.29, -0.1], [0.3, 0], [0.29, 0.1], [0.22, 0.25], [0.1, 0.35], [0.04, 0.39], [0, 0.42]];
  add(sLathe(P, 16, 2), rind, -0.35, 0.3, 0, 0, 0.4, Math.PI / 2);
  const h = grp(0.42, 0, 0.18);
  add(sLathe(P.slice(0, 6).map(([r, y]) => [r * 1.05, y + 0.42]), 16, 2), rind, 0, 0, 0, 0, 0, 0, h);
  add(cyl(0.3, 0.3, 0.03, 18), pith, 0, 0.42, 0, 0, 0, 0, h);
  for (let i = 0; i < 8; i++) { const a0 = i * Math.PI / 4 + 0.06, a1 = (i + 1) * Math.PI / 4 - 0.06;
    add(ext([[0.02 * Math.cos((a0 + a1) / 2), 0.02 * Math.sin((a0 + a1) / 2)], [0.25 * Math.cos(a0), 0.25 * Math.sin(a0)], [0.26 * Math.cos((a0 + a1) / 2), 0.26 * Math.sin((a0 + a1) / 2)], [0.25 * Math.cos(a1), 0.25 * Math.sin(a1)]], 0.03, 0), flesh, 0, 0.45, 0, -Math.PI / 2, 0, 0, h); }
  finish(HEIGHT);
