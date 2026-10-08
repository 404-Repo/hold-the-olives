  // a: primitives. Whole lemon = stretched sphere with cone nubs; half lemon = hemisphere dome down with a pith disc and
  // eight juicy wedges on its cut face.
  const rind = M(C.lemon, 0.35), pith = M(0xfdf3c8, 0.6), flesh = M(0xf7dc4a, 0.15);
  const w = grp(-0.35, 0.3, 0, 0, 0.3, 0);
  add(sph(0.3, 14, 10), rind, 0, 0, 0, 0, 0, 0, w).scale.set(1.35, 1, 1);
  for (const s of [-1, 1]) add(cyl(0.03, 0.09, 0.1, 8), rind, s * 0.42, 0, 0, 0, 0, s * Math.PI / 2, w);
  const h = grp(0.4, 0.3, 0.15, 0, 0, 0);
  add(new THREE.SphereGeometry(0.3, 14, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), rind, 0, 0, 0, 0, 0, 0, h).scale.set(1, 1, 1.25);
  add(cyl(0.295, 0.295, 0.02, 16), pith, 0, 0.0, 0, 0, 0, 0, h).scale.set(1, 1, 1.25);
  for (let i = 0; i < 8; i++) add(new THREE.CircleGeometry(0.24, 3, i * Math.PI / 4 + 0.05, Math.PI / 4 - 0.1), flesh, 0, 0.012, 0, -Math.PI / 2, 0, 0, h).scale.set(1, 1.25, 1);
  finish(HEIGHT);
