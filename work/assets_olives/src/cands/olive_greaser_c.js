  // C: a different reading. Bean body with arms, a golden oil slick pouring down one shoulder in a single thick tube.
  const o = olive({ H: 0.36, col: 0xa8a838, expr: 'smug', legH: 0.04, wr: 0.76 }, 'bean');
  const oil = M(0xd9b23a, { t: 0.75, r: 0.06 }), W = o.W, cy = o.cy, top = o.y0 + o.Hb;
  add(new THREE.SphereGeometry(1, 14, 5, 0, TAU, 0, PI * 0.28), oil, [0, top - W / 2 * 1.04, 0], g, null, [W / 2 * 1.05, W / 2 * 1.05, o.D / 2 * 1.05]);
  const pts = []; for (let i = 0; i <= 8; i++) { const t = i / 8, y = top - W * 0.12 - t * (top - W * 0.25 - 0.0), th = -0.9 - t * 0.9; const s = o.S(Math.max(o.y0 + 0.01, y), th); pts.push(s.p.clone().addScaledVector(s.n, W * 0.025)); }
  pts.push(V(pts[8].x * 1.4, 0.012, pts[8].z * 1.4));
  add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 24, W * 0.04, 6, false), oil);
  add(new THREE.CylinderGeometry(W * 0.65, W * 0.65, 0.006, 22), oil, [-W * 0.18, 0.003, W * 0.0], g, null, [1, 1, 0.75]);
  for (const th of [0.9, 2.4]) { const s = o.S(cy + o.Hb * 0.28, th); add(new THREE.CapsuleGeometry(W * 0.03, 0.05, 3, 6), oil, [s.p.x * 1.02, s.p.y - 0.03, s.p.z * 1.02], g); }
  for (const [x, z, r] of [[W * 0.7, W * 0.5, 0.015], [W * 0.9, W * 0.2, 0.01]]) add(new THREE.SphereGeometry(r, 8, 5), oil, [x, r * 0.35, z], g, null, [1, 0.45, 1]);
