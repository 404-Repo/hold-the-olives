  // a: primitives. Chunky rounded-box loaf (length along x), pale opened slashes across the top, cut crumb face at +x,
  // two slices lying flat beside the cut end.
  const crust = M(C.crust, 0.65), crustD = M(0xb0702e, 0.7), crumb = M(C.crumb, 0.85);
  add(rbox(2.0, 0.88, 1.15, 0.38, 3), crust, -0.2, 0.44, 0);
  for (let i = 0; i < 4; i++) add(rbox(0.12, 0.08, 0.95, 0.04), M(0xe8c27a, 0.7), -0.85 + i * 0.42, 0.87, 0, 0, 0.5, 0);
  add(rbox(0.04, 0.72, 1.0, 0.3), crumb, 0.81, 0.44, 0);
  // two slices: crust-ringed flat slabs
  const slice = (x, y, z, rz, ry) => { const s = grp(x, y, z, 0, ry, rz);
    add(rbox(0.86, 0.12, 1.1, 0.3), crust, 0, 0, 0, 0, 0, 0, s); add(rbox(0.74, 0.125, 0.98, 0.26), crumb, 0, 0.005, 0, 0, 0, 0, s); };
  slice(1.25, 0.08, 0.2, 0, 0.25); slice(1.55, 0.2, 0.35, 0.12, 0.45);
  finish(HEIGHT);
