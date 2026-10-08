  // PROFILE SHEET: a radial grid swept round the centre, ruffle amplitude growing toward an irregular wavy rim; two sheets, two greens
  const body = grp(g);
  const ruff = (amp, k, ph) => (t, th) => 0.012 + 0.03 * t * t + amp * Math.pow(t, 2.2) * Math.sin(k * th + ph + 2.2 * Math.sin(3 * th));
  const outline = (s) => (th) => 1 + 0.07 * Math.sin(5 * th + s) + 0.035 * Math.sin(13 * th + 2 * s);
  add(discSheet(0.71, 9, 72, (t, th) => ruff(0.055, 14, 0)(t, th) - 0.05 * Math.max(0, t - 0.75) / 0.25, outline(0)), M(C.lettuce2, { r: 0.35, ds: true }), [0, 0, 0], body);
  add(discSheet(0.56, 8, 64, (t, th) => 0.035 + ruff(0.042, 11, 1.3)(t, th), outline(2)), M(C.lettuce, { r: 0.32, ds: true }), [0.02, 0.012, -0.01], body, [0, 0.4, 0]);
  // pale midrib and a few veins on top
  const rib = M(C.lettuceL, { r: 0.4 });
  add(new THREE.CapsuleGeometry(0.03, 0.55, 3, 6), rib, [0.02, 0.085, 0], body, [PI / 2, 0, 0.5], [1, 1, 0.4]);
  for (const s of [-1, 1]) for (const u of [-0.12, 0.1]) add(new THREE.CapsuleGeometry(0.014, 0.2, 2, 4), rib, [0.02 + u * 0.48 + s * 0.08, 0.072, u * 0.88 - s * 0.05], body, [PI / 2, 0, 0.5 + s * 0.9], [1, 1, 0.4]);
  fitH(body, 0.12);
