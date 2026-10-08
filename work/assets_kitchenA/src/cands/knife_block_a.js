  // a: primitives. A thick rounded walnut slab tilted back on a plinth; five black handles with steel rivets and bolsters.
  const wood = M(C.walnut, 0.55, 0, 'timber'), blk = M(C.black, 0.45), steel = M(C.steel, 0.3, 0.55, 'metal');
  const body = grp(0, 0, 0, -0.32, 0, 0);
  add(rbox(1.5, 1.95, 1.1, 0.14), wood, 0, 0.98, 0, 0, 0, 0, body);
  add(rbox(1.6, 0.2, 1.7, 0.08), wood, 0, 0.1, -0.15);
  const hs = [[-0.5, -0.25, 0.75], [-0.25, 0.15, 0.85], [0.0, -0.2, 0.95], [0.25, 0.18, 0.85], [0.5, -0.25, 0.75]];
  for (const [x, z, h] of hs) {
    const k = grp(x, 1.95, z, 0, 0, 0, body);
    add(cyl(0.11, 0.1, 0.12, 10), steel, 0, 0.06, 0, 0, 0, 0, k);
    add(rbox(0.16, h, 0.28, 0.07), blk, 0, 0.12 + h / 2, 0, 0, 0, 0, k);
    for (const t of [0.3, 0.6]) for (const sx of [-1, 1]) add(cyl(0.035, 0.035, 0.02, 8), steel, sx * 0.085, 0.12 + h * t, 0, 0, 0, Math.PI / 2, k);
  }
  finish(HEIGHT);
