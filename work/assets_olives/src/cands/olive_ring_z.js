  // B: lathe. A rounded-rectangle section swept around the hub axis (one closed profile: skin, cut faces, hole), spiral eyes.
  const skin = M(0x221c22, { r: 0.25 }), cut = M(0x3a2f36, { r: 0.35 });
  const Ro = 0.16, Ri = 0.056, T = 0.12, w = grp(g, [0, Ro, 0], 'wheel'); g.userData.wheel = w; g.userData.rollAxis = 'z';
  // section in (radius, axial) traced counter-clockwise so the sweep faces out; corners rounded on the skin side
  const sec = []; const rc = 0.035, ri = 0.012;
  const corner = (cx, cy, r0, a0, a1, n) => { for (let i = 0; i <= n; i++) { const a = a0 + (a1 - a0) * i / n; sec.push([cx + Math.cos(a) * r0, cy + Math.sin(a) * r0]); } };
  corner(Ri + ri, -T / 2 + ri, ri, PI, PI * 1.5, 3);
  corner(Ro - rc, -T / 2 + rc, rc, -PI / 2, 0, 5);
  corner(Ro - rc, T / 2 - rc, rc, 0, PI / 2, 5);
  corner(Ri + ri, T / 2 - ri, ri, PI / 2, PI, 3);
  sec.push(sec[0].slice());
  const geo = lathe(sec, 30); geo.rotateX(PI / 2);
  add(geo, skin, [0, 0, 0], w);
  for (const sd of [-1, 1]) add(new THREE.RingGeometry(Ri + 0.014, Ro - 0.03, 30, 1), cut, [0, 0, sd * (T / 2 + 0.0008)], w, [0, sd > 0 ? 0 : PI, 0]);
  for (const sd of [-1, 1]) {
    const c = [sd * 0.064, 0.064, T / 2];
    add(new THREE.CylinderGeometry(0.037, 0.039, 0.01, 18), M(0xffffff, { r: 0.18 }), [c[0], c[1], c[2] + 0.004], w, [PI / 2, 0, 0]);
    const pts = []; for (let i = 0; i <= 40; i++) { const t = i / 40, a = -t * PI * 4.2 * sd; pts.push(V(c[0] + Math.cos(a) * 0.032 * (0.12 + 0.88 * t), c[1] + Math.sin(a) * 0.032 * (0.12 + 0.88 * t), c[2] + 0.011)); }
    add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, 0.0045, 4, false), M(0x161616, { r: 0.3 }), [0, 0, 0], w);
    add(new THREE.SphereGeometry(0.007, 6, 4), M(0xffffff, { e: 0xffffff, ei: 0.6 }), [c[0] - 0.02, c[1] + 0.022, c[2] + 0.013], w);
  }
  arc(w, { p: V(0, -0.1, T / 2 + 0.002), n: V(0, 0, 1) }, 0.03, 0.0065, 1.6, PI, 0x0e0a0c);
