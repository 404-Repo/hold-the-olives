  // a: primitives. Cream plate with a raised rim, butter block with a scooped end and a curl, domed rounded-box lid
  // set down beside it.
  const cream = M(C.cream, 0.4), butter = M(0xf6dc6a, 0.35), scoop = M(0xf9e68e, 0.3);
  add(rbox(1.6, 0.08, 1.0, 0.04), cream, 0, 0.04, 0);
  add(rbox(1.7, 0.06, 1.1, 0.03), cream, 0, 0.11, 0).scale.set(1, 1, 1);
  add(rbox(1.5, 0.07, 0.9, 0.03), cream, 0, 0.12, 0);
  add(rbox(0.85, 0.36, 0.48, 0.06), butter, 0.1, 0.32, 0);
  add(rbox(0.3, 0.25, 0.48, 0.1), butter, -0.42, 0.27, 0, 0, 0, 0.35);
  add(cyl(0.08, 0.08, 0.3, 10), scoop, -0.33, 0.48, 0, Math.PI / 2, 0, 0);
  add(rbox(0.02, 0.3, 0.42, 0.01), scoop, -0.33, 0.33, 0);
  add(rbox(1.25, 0.55, 0.75, 0.25, 3), cream, 0.25, 0.28, -1.0, 0, 0.2, 0);
  finish(HEIGHT);
