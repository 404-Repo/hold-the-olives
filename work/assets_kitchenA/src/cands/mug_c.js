  // c: different reading: a squat wide latte mug, coffee inside (reads from above), a chunky ear handle built from boxes,
  // sage band at the top edge.
  const cream = M(C.cream, 0.45), creamD = M(C.cream, 0.45, 0, undefined, { side: DS }), coffee = M(0x6a3e22, 0.2), foam = M(0xe9d2b0, 0.6);
  add(sLathe([[0, 0], [0.42, 0], [0.5, 0.08], [0.56, 0.5], [0.58, 0.82], [0.54, 0.84], [0.5, 0.5], [0.44, 0.12], [0, 0.12]], 22, 2), creamD);
  add(lathe([[0.565, 0.62], [0.585, 0.64], [0.59, 0.82], [0.575, 0.84]], 22), M(C.sage, 0.45));
  add(cyl(0.53, 0.5, 0.02, 22), coffee, 0, 0.72, 0);
  add(cyl(0.2, 0.2, 0.02, 12), foam, 0.04, 0.73, 0.02).scale.set(1.2, 1, 1);
  add(rbox(0.32, 0.12, 0.16, 0.05), cream, 0.66, 0.68, 0); add(rbox(0.32, 0.12, 0.16, 0.05), cream, 0.66, 0.26, 0);
  add(rbox(0.12, 0.54, 0.16, 0.05), cream, 0.8, 0.47, 0);
  finish(HEIGHT);
