  // b: extruded wedge (trapezoid side profile, sloped front, angled top), bevelled; handles as capsules with a
  // steel butt cap and bolster; slot slits on the top face.
  const wood = M(C.walnut, 0.55, 0, 'timber'), blk = M(C.black, 0.45), steel = M(C.steel, 0.3, 0.55, 'metal'), slot = M(0x2a1c12, 0.8);
  // section (z, y): back vertical, front sloped, top angled down to the front
  const sec = [[-0.7, 0], [0.95, 0], [0.15, 1.85], [-0.7, 1.95]];
  add(ext(sec, 1.5, 0.1), wood, 0, 0, 0, 0, -Math.PI / 2, 0);
  const tilt = Math.atan2(0.85, 0.1) - Math.PI / 2; // top face angle
  const hs = [[-0.52, 0.85], [-0.26, 1.0], [0.0, 1.1], [0.26, 1.0], [0.52, 0.85]];
  hs.forEach(([x, h], i) => {
    const z = -0.5 + (i % 2) * 0.35, y = 1.95 - (z + 0.7) * 0.1 / 0.85;
    const k = grp(x, y, z, -0.35, 0, 0);
    add(rbox(0.12, 0.05, 0.36, 0.02), slot, 0, 0.0, 0, 0, 0, 0, k);
    add(cyl(0.09, 0.11, 0.14, 10), steel, 0, 0.08, 0, 0, 0, 0, k);
    const cap = add(new THREE.CapsuleGeometry(0.11, h - 0.22, 4, 10), blk, 0, 0.15 + h / 2, 0, 0, 0, 0, k); cap.scale.set(0.75, 1, 1.25);
    add(cyl(0.1, 0.1, 0.06, 10), steel, 0, 0.15 + h, 0, 0, 0, 0, k);
    for (const t of [0.35, 0.65]) add(sph(0.035, 6, 4), steel, 0.085, 0.15 + h * t, 0, 0, 0, 0, k);
    for (const t of [0.35, 0.65]) add(sph(0.035, 6, 4), steel, -0.085, 0.15 + h * t, 0, 0, 0, 0, k);
  });
  finish(HEIGHT);
