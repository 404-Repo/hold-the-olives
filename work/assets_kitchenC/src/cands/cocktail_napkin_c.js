  // DIFFERENT READING: a scalloped-edge paper cocktail napkin: square outline with scalloped sides extruded thin, an embossed inner square ring in sage
  const body = grp(g);
  const s = new THREE.Shape(), H = 0.65, n = 8; s.moveTo(-H, -H);
  const side = (ax, ay, bx, by, nx, ny) => { for (let i = 0; i < n; i++) { const t0 = i / n, t1 = (i + 1) / n, mx = ax + (bx - ax) * (t0 + t1) / 2 + nx * 0.05, my = ay + (by - ay) * (t0 + t1) / 2 + ny * 0.05; s.quadraticCurveTo(mx, my, ax + (bx - ax) * t1, ay + (by - ay) * t1); } };
  side(-H, -H, H, -H, 0, -1); side(H, -H, H, H, 1, 0); side(H, H, -H, H, 0, 1); side(-H, H, -H, -H, -1, 0);
  add(slab(s, 0.035, 0.01, 0.0, 3), linen(0xf4efe2), [0, 0, 0], body);
  const ring = new THREE.Shape(); rrect(1.0, 1.0, 0.02, ring); ring.holes.push(rrectPath(0.9, 0.9, 0.02));
  add(slab(ring, 0.01), M(C.sage, { r: 0.8, name: 'fabric' }), [0, 0.035, 0], body);
  fitAll(body, 0.05);
