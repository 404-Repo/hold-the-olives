  // b: lathe. One profile from the foot, up the outer wall, over a rolled lip and down the inside; band as its own lathe
  // ring; handle a fat D-shaped tube.
  const cream = M(C.cream, 0.45, 0, undefined, { side: DS }), sage = M(C.sage, 0.45);
  add(sLathe([[0, 0.0], [0.38, 0.0], [0.42, 0.03], [0.44, 0.3], [0.45, 0.94], [0.43, 0.99], [0.39, 0.96], [0.39, 0.12], [0, 0.12]], 22, 2), cream);
  add(lathe([[0.446, 0.62], [0.458, 0.64], [0.462, 0.84], [0.45, 0.86]], 22), sage);
  add(tube([[0.4, 0.82, 0], [0.68, 0.82, 0], [0.76, 0.6, 0], [0.66, 0.32, 0], [0.4, 0.28, 0]], 0.075, 16, 8), M(C.cream, 0.45));
  finish(HEIGHT);
