  // B: lathe. One swept profile: fat in the middle, long tapered points, lying along Z.
  const wood = M(0xe8cfa0, { r: 0.6, name: 'timber' }), L = 0.6;
  const pts = []; for (let i = 0; i <= 16; i++) { const t = i / 16, y = -L / 2 + L * t, u = Math.abs(2 * t - 1); pts.push([u > 0.999 ? 0 : 0.018 * (u < 0.62 ? 1 - 0.12 * u : Math.pow((1 - u) / 0.38, 0.85) * 0.93), y]); }
  const geo = lathe(pts, 10); geo.rotateX(PI / 2);
  add(geo, wood, [0, 0.018, 0]);
