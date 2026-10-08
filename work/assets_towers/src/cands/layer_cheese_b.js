  // SEGMENTED SLAB DEFORMED: one subdivided box with rounded corners, draped down wherever it passes the bread's edge
  const body = grp(g);
  const geo = new THREE.BoxGeometry(1.15, 0.035, 1.15, 16, 1, 16);
  deform(geo, (v) => {
    // round the square's corners in its own frame
    const r = 0.1, e = 0.575 - r, ax = Math.abs(v.x), az = Math.abs(v.z);
    if (ax > e && az > e) { const dx = ax - e, dz = az - e, L = Math.hypot(dx, dz), k = Math.min(1, r / L); v.x = Math.sign(v.x) * (e + dx * k); v.z = Math.sign(v.z) * (e + dz * k); }
    // the bread edge in world frame after the 45 degree turn
    const wx = (v.x - v.z) / Math.SQRT2, wz = (v.x + v.z) / Math.SQRT2, d = Math.max(Math.abs(wx), Math.abs(wz)) - 0.5;
    if (d > 0) v.y -= 0.12 * Math.pow(Math.min(1, d / 0.3), 1.4);
  });
  geo.rotateY(PI / 4);
  add(geo, M(C.cheese, { r: 0.32 }), [0, 0, 0], body);
  fitH(body, 0.07);
