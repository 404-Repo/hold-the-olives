  // a: primitives. Tapered terracotta cylinder + rim band, soil disc, basil dome of flattened-sphere leaves facing outward.
  const terra = M(C.terracotta, 0.75), soil = M(0x3b2a1e, 0.95), leafM = M(C.basil, 0.4, 0, 'foliage'), leafL = M(0x58a648, 0.4, 0, 'foliage');
  add(cyl(0.56, 0.42, 0.7, 18), terra, 0, 0.35, 0);
  add(cyl(0.64, 0.6, 0.2, 18), terra, 0, 0.78, 0);
  add(cyl(0.56, 0.56, 0.04, 18), soil, 0, 0.86, 0);
  add(sph(0.55, 12, 8), M(0x2f6e2c, 0.6, 0, 'foliage'), 0, 1.2, 0).scale.set(1, 0.85, 1);
  let k = 0;
  for (let ring = 0; ring < 4; ring++) {
    const el = 0.15 + ring * 0.38, n = [14, 12, 9, 5][ring];
    for (let i = 0; i < n; i++) {
      const a = i / n * Math.PI * 2 + ring * 0.4, R = 0.72;
      const nrm = new THREE.Vector3(Math.cos(a) * Math.cos(el), Math.sin(el), Math.sin(a) * Math.cos(el));
      const p = nrm.clone().multiplyScalar(R).add(new THREE.Vector3(0, 1.08, 0)); p.y *= 1; p.y = 1.08 + (p.y - 1.08) * 0.95;
      const l = add(sph(0.2, 8, 6), (k++ % 3) ? leafM : leafL, p.x, p.y, p.z); l.scale.set(0.75, 1.2, 0.22);
      l.lookAt(p.clone().add(nrm)); l.rotateZ((i % 2 ? 0.4 : -0.4));
    }
  }
  add(sph(0.18, 8, 6), leafL, 0, 1.75, 0).scale.set(1.2, 0.3, 0.8);
  finish(HEIGHT);
