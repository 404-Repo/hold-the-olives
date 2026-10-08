  // c: different reading: a round walnut drum block (lathe), knives splayed radially like a bouquet.
  const wood = M(C.walnut, 0.55, 0, 'timber'), blk = M(C.black, 0.45), steel = M(C.steel, 0.3, 0.55, 'metal');
  add(sLathe([[0, 0], [0.82, 0], [0.86, 0.1], [0.84, 1.2], [0.78, 1.55], [0.7, 1.62], [0, 1.62]], 20), wood);
  add(new THREE.TorusGeometry(0.85, 0.04, 6, 20), steel, 0, 0.3, 0, Math.PI / 2);
  for (let i = 0; i < 5; i++) {
    const a = i / 5 * Math.PI * 2 + 0.3, r = 0.35, h = 0.8 + (i % 2) * 0.15;
    const k = grp(Math.cos(a) * r, 1.6, Math.sin(a) * r, 0, -a, 0);
    const kk = grp(0, 0, 0, 0, 0, 0.3, k); // splay outward (in the k local frame +x is outward)
    kk.rotation.set(0, 0, -0.32);
    add(cyl(0.1, 0.1, 0.12, 10), steel, 0, 0.06, 0, 0, 0, 0, kk);
    add(rbox(0.26, h, 0.15, 0.07), blk, 0, 0.12 + h / 2, 0, 0, 0, 0, kk);
    for (const t of [0.3, 0.6]) add(sph(0.035, 6, 4), steel, 0, 0.12 + h * t, 0.08, 0, 0, 0, kk);
  }
  finish(HEIGHT);
