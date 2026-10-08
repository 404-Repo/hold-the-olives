  // PROFILES: thick-wall lathe belly; the rim is deformed into a pouring lip at +X; water = lathe fill; handle = tube on the -X side; lemon slices = discs with a pale pith ring
  const body = grp(g);
  const W = [[0.8, 0], [0.92, 0.06], [1.12, 0.45], [1.2, 0.95], [1.12, 1.5], [0.92, 1.95], [0.86, 2.3], [0.92, 2.7], [0.98, 2.9]];
  const lip = (v) => { const r = Math.hypot(v.x, v.z); if (r < 0.2) return; const th = Math.atan2(v.z, v.x), k = Math.max(0, Math.cos(th)) ** 6, s = Math.max(0, (v.y - 2.3) / 0.6);
    v.x += k * s * s * 0.4 * Math.cos(th); v.y += k * s * s * 0.12; };
  add(deform(vessel(W, 0.07, 0.1, 32), lip), glass(0.4), [0, 0, 0], body);
  add(fill(W, 0.07, 0.1, 2.05, 32, 8), liquid(0xbfe3ec, 0.45, 0.05), [0, 0, 0], body);
  tube([[-0.95, 2.55, 0], [-1.45, 2.5, 0], [-1.6, 1.95, 0], [-1.4, 1.2, 0], [-1.08, 0.9, 0]], 0.11, glass(0.5), body, 20, 8);
  const lem = M(0xf2d23a, { r: 0.35 }), pith = M(0xfbf1c2, { r: 0.5 });
  for (const [x, y, z, rx, rz] of [[0.25, 1.95, 0.35, 0.5, 0.2], [-0.35, 1.6, -0.2, -0.3, 0.7], [0.15, 1.05, -0.35, 1.2, -0.3]]) {
    const L = grp(body, [x, y, z], null, [rx, 0, rz]);
    add(new THREE.CylinderGeometry(0.42, 0.42, 0.07, 16), lem, [0, 0, 0], L);
    add(new THREE.CylinderGeometry(0.33, 0.33, 0.075, 16), pith, [0, 0, 0], L);
    for (let i = 0; i < 8; i++) add(new THREE.BoxGeometry(0.02, 0.08, 0.3), lem, [0, 0, 0], L, [0, i * PI / 8, 0]);
  }
  fitAll(body, 3.0);
