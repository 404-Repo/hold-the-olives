  // a: primitives. Thick soft folded slab, blue stripe bands across it, and a thinner top layer slid forward so its end
  // drapes over the front edge onto the counter.
  const lin = M(C.linen, 0.9, 0, 'fabric'), blu = M(C.stripe, 0.85, 0, 'fabric');
  add(rbox(1.9, 0.08, 1.25, 0.035), lin, 0, 0.04, 0);
  const top = grp(0, 0.085, 0.15);
  add(rbox(1.9, 0.035, 1.1, 0.015), lin, 0, 0, 0, 0, 0, 0, top);
  for (const x of [-0.55, -0.42, 0.42, 0.55]) add(rbox(0.07, 0.04, 1.1, 0.015), blu, x, 0.002, 0, 0, 0, 0, top);
  // draped end: bends down over the front edge
  add(rbox(1.9, 0.03, 0.18, 0.012), lin, 0, -0.05, 0.6, 1.1, 0, 0, top);
  add(rbox(1.9, 0.025, 0.35, 0.01), lin, 0, -0.07, 0.82, 0.04, 0, 0, top);
  for (const x of [-0.55, -0.42, 0.42, 0.55]) add(rbox(0.07, 0.03, 0.35, 0.01), blu, x, -0.066, 0.82, 0.04, 0, 0, top);
  finish(HEIGHT);
