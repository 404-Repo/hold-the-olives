  // PRIMITIVES: overlapping flattened spheres as leaves, two greens, a pale rib on top
  const body = grp(g);
  const dark = M(C.lettuce2, { r: 0.35 }), mid = M(C.lettuce, { r: 0.35 }), rib = M(C.lettuceL, { r: 0.4 });
  for (let i = 0; i < 9; i++) {
    const a = i / 9 * TAU, r = 0.36;
    add(new THREE.SphereGeometry(0.28, 14, 6), i % 2 ? dark : mid, [Math.cos(a) * r, 0.03 + (i % 3) * 0.012, Math.sin(a) * r], body, [0.15 * Math.sin(a * 3), -a, 0.12 * Math.cos(a * 2)], [1.15, 0.12, 0.8]);
  }
  add(new THREE.SphereGeometry(0.42, 16, 6), mid, [0, 0.06, 0], body, null, [1, 0.14, 1]);
  add(new THREE.CapsuleGeometry(0.035, 0.5, 3, 6), rib, [0.02, 0.105, 0.02], body, [PI / 2, 0, 0.6], [1, 1, 0.45]);
  fitH(body, 0.12);
