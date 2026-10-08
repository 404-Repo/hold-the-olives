  // c: different reading: a round butter dish (French style): a round plate, a round butter pat with a knife groove, and a
  // bell-shaped lathe lid with a knob set beside it.
  const cream = M(C.cream, 0.4), butter = M(0xf6dc6a, 0.35), groove = M(0xe9c44e, 0.4);
  add(sLathe([[0, 0], [0.62, 0], [0.7, 0.06], [0.75, 0.12], [0.7, 0.13], [0.6, 0.08], [0, 0.08]], 22, 2), cream);
  add(cyl(0.42, 0.44, 0.28, 18), butter, 0, 0.22, 0);
  add(rbox(0.6, 0.04, 0.06, 0.02), groove, 0.05, 0.36, 0.05, 0, 0.4, 0);
  add(rbox(0.5, 0.04, 0.06, 0.02), groove, 0.05, 0.36, -0.12, 0, 0.4, 0);
  add(sLathe([[0.58, 0], [0.6, 0.05], [0.56, 0.3], [0.4, 0.45], [0.15, 0.5], [0.08, 0.55], [0.1, 0.62], [0, 0.64]], 18, 2), M(C.cream, 0.4, 0, undefined, { side: DS }), 0.8, 0, -0.75);
  finish(HEIGHT);
