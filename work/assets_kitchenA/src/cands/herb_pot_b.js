  // b: lathe pot with a thick rolled rim and foot; basil from cupped bent-plane leaves (a pointed oval with a midrib
  // fold) set over a dark inner mass; a few stems.
  const terra = M(C.terracotta, 0.75, 0, undefined, { side: DS }), soil = M(0x3b2a1e, 0.95);
  const leafA = M(C.basil, 0.35, 0, 'foliage', { side: DS }), leafB = M(0x55a444, 0.35, 0, 'foliage', { side: DS });
  add(sLathe([[0, 0], [0.4, 0], [0.43, 0.04], [0.55, 0.66], [0.64, 0.68], [0.66, 0.88], [0.58, 0.9], [0.54, 0.8], [0, 0.8]], 18, 2), terra);
  add(cyl(0.54, 0.54, 0.03, 18), soil, 0, 0.81, 0);
  const leafGeo = (() => { const geo = new THREE.PlaneGeometry(1, 1, 2, 4), p = geo.attributes.position;
    for (let i = 0; i < p.count; i++) { const x = p.getX(i), y = p.getY(i) + 0.5; const w = Math.pow(Math.sin(Math.PI * Math.min(1, y * 0.95 + 0.03)), 0.7);
      p.setXYZ(i, x * w * 0.62, y, 0.28 * Math.abs(x * w) - 0.15 * Math.sin(Math.PI * y)); }
    geo.computeVertexNormals(); return geo; })();
  add(sph(0.6, 10, 8), M(0x2c6629, 0.6, 0, 'foliage'), 0, 1.2, 0).scale.set(1, 0.8, 1);
  for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; add(cyl(0.03, 0.04, 0.5, 5), M(0x5c8a3a, 0.6, 0, 'foliage'), Math.cos(a) * 0.2, 1.0, Math.sin(a) * 0.2, Math.sin(a) * 0.3, 0, -Math.cos(a) * 0.3); }
  let k = 0;
  for (let ring = 0; ring < 5; ring++) {
    const el = 0.05 + ring * 0.33, n = [14, 13, 11, 8, 4][ring];
    for (let i = 0; i < n; i++) {
      const a = i / n * Math.PI * 2 + ring * 0.5 + (k % 3) * 0.1;
      const nrm = new THREE.Vector3(Math.cos(a) * Math.cos(el), Math.sin(el), Math.sin(a) * Math.cos(el));
      const p = nrm.clone().multiplyScalar(0.62).add(new THREE.Vector3(0, 1.12, 0));
      const s = 0.42 + ((k * 37) % 10) / 60;
      const l = add(leafGeo, (k++ % 3) ? leafA : leafB, p.x, p.y, p.z); l.scale.setScalar(s);
      // leaf base sits at p; point the leaf outward and up along the dome, face outward
      const up = nrm.clone().add(new THREE.Vector3(0, 0.6, 0)).normalize();
      l.up.copy(up); l.lookAt(p.clone().add(nrm)); l.rotateX(-0.5);
    }
  }
  finish(HEIGHT);
