  // c: different reading: the half leans against the whole with its cut face turned up toward the camera, and the
  // whole lemon keeps a little stem and a leaf (more silhouette from above).
  const rind = M(C.lemon, 0.35), pith = M(0xfdf3c8, 0.6), flesh = M(0xf7dc4a, 0.15), leaf = M(C.basil, 0.4, 0, 'foliage', { side: DS }), stem = M(0x6b5a2a, 0.7);
  const w = grp(-0.2, 0.3, -0.1, 0, 0.5, 0);
  add(sph(0.3, 14, 10), rind, 0, 0, 0, 0, 0, 0, w).scale.set(1.4, 1, 1);
  add(cyl(0.03, 0.09, 0.1, 8), rind, 0.44, 0, 0, 0, 0, -Math.PI / 2, w);
  add(cyl(0.02, 0.02, 0.1, 5), stem, -0.44, 0.03, 0, 0, 0, Math.PI / 2, w);
  add(sph(0.16, 8, 6), leaf, -0.55, 0.12, 0.08, 0.3, 0.4, 0.3, w).scale.set(1.3, 0.15, 0.55);
  const h = grp(0.35, 0.27, 0.35, -0.6, 0, -0.3);
  add(new THREE.SphereGeometry(0.29, 14, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), rind, 0, 0, 0, 0, 0, 0, h);
  add(cyl(0.285, 0.285, 0.02, 16), pith, 0, 0, 0, 0, 0, 0, h);
  for (let i = 0; i < 8; i++) add(new THREE.CircleGeometry(0.23, 3, i * Math.PI / 4 + 0.05, Math.PI / 4 - 0.1), flesh, 0, 0.012, 0, -Math.PI / 2, 0, 0, h);
  finish(HEIGHT);
