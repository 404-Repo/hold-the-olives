  // c: different reading: a folded square with the top corner folded back diagonally (a triangle flap) and the free
  // corner hanging over the front edge; stripes run along the flap.
  const lin = M(C.linen, 0.9, 0, 'fabric'), blu = M(C.stripe, 0.85, 0, 'fabric'), linD = M(C.linen, 0.9, 0, 'fabric', { side: DS });
  add(rbox(1.5, 0.08, 1.5, 0.035), lin, 0, 0.04, 0);
  for (const z of [-0.5, -0.38, 0.38, 0.5]) add(rbox(1.46, 0.082, 0.06, 0.03), blu, 0, 0.04, z);
  const tri = [[-0.75, -0.75], [0.75, -0.75], [-0.75, 0.75]];
  add(ext(tri, 0.03, 0), lin, 0, 0.095, 0, Math.PI / 2, 0, 0);
  add(ext([[-0.2, -0.75], [-0.1, -0.75], [-0.75, -0.1], [-0.75, -0.2]], 0.032, 0), blu, 0, 0.097, 0, Math.PI / 2, 0, 0);
  // free corner drooping over the front edge
  add(ext([[-0.4, 0], [0.4, 0], [0, 0.35]], 0.025, 0), lin, 0.3, 0.05, 0.78, -1.2, 0.0, 0);
  finish(HEIGHT);
