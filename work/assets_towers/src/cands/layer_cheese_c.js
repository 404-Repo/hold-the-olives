  // DIFFERENT READING: a melting slice, sagging between corners, with soft drips hanging from each corner tip
  const body = grp(g);
  const ch = M(C.cheese, { r: 0.25 });
  const geo = new THREE.BoxGeometry(1.15, 0.04, 1.15, 14, 1, 14);
  deform(geo, (v) => {
    const r = 0.16, e = 0.575 - r, ax = Math.abs(v.x), az = Math.abs(v.z);
    if (ax > e && az > e) { const dx = ax - e, dz = az - e, L = Math.hypot(dx, dz), k = Math.min(1, r / L); v.x = Math.sign(v.x) * (e + dx * k); v.z = Math.sign(v.z) * (e + dz * k); }
    const wx = (v.x - v.z) / Math.SQRT2, wz = (v.x + v.z) / Math.SQRT2, d = Math.max(Math.abs(wx), Math.abs(wz)) - 0.48;
    v.y += 0.008 * Math.sin(v.x * 9) * Math.sin(v.z * 7);
    if (d > 0) v.y -= 0.14 * Math.pow(Math.min(1, d / 0.34), 1.2);
  });
  geo.rotateY(PI / 4);
  add(geo, ch, [0, 0, 0], body);
  for (let i = 0; i < 4; i++) { const a = i * PI / 2; add(new THREE.SphereGeometry(0.035, 8, 6), ch, [Math.cos(a) * 0.78, -0.13, Math.sin(a) * 0.78], body, null, [1, 1.5, 1]); }
  fitH(body, 0.07);
