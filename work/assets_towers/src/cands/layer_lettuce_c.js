  // DIFFERENT READING: a rosette of six separate ruffled leaves overlapping, alternating two greens, each with its rib
  const body = grp(g);
  const mats = [M(C.lettuce, { r: 0.33, ds: true }), M(C.lettuce2, { r: 0.35, ds: true })], rib = M(C.lettuceL, { r: 0.4 });
  const leaf = (k, ph) => discSheet(0.3, 6, 40, (t, th) => 0.04 * t * t * Math.max(0, Math.cos(th)) + 0.028 * Math.pow(t, 2) * Math.sin(k * th + ph),
    (th) => (0.75 + 0.25 * Math.cos(th)) * (1 + 0.06 * Math.sin(9 * th + ph)));
  for (let i = 0; i < 6; i++) {
    const a = i / 6 * TAU + 0.3, o = grp(body, [Math.cos(a) * 0.2, 0.01 * (i % 3), Math.sin(a) * 0.2], null, [0, -a, 0]);
    add(leaf(12 + (i % 3), i), mats[i % 2], [0, 0, 0], o, null, [1.25, 1, 1]);
    add(new THREE.CapsuleGeometry(0.018, 0.28, 2, 5), rib, [0.16, 0.012, 0], o, [0, 0, PI / 2], [1, 0.5, 1]);
  }
  add(discSheet(0.26, 4, 32, (t, th) => 0.05 + 0.02 * t * Math.sin(8 * th)), mats[0], [0, 0, 0], body);
  fitH(body, 0.12);
