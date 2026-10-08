  // PRIMITIVES: bowl = outer and inner hemispheres (inner flipped to face in) + rim torus + foot cylinder; salad = one ruffled mound (sphere cap deformed with leafy bumps) plus a few upright leaf cards; tomato halves = hemisphere + disc
  const body = grp(g);
  const wood = timber(0xc8894a, 0.5);
  add(new THREE.SphereGeometry(1.75, 32, 12, 0, TAU, PI / 2, PI / 2), wood, [0, 1.0, 0], body, null, [1, 0.55, 1]);
  const inner = new THREE.SphereGeometry(1.63, 32, 12, 0, TAU, PI / 2, PI / 2); inner.scale(-1, 1, 1);
  add(inner, wood, [0, 1.0, 0], body, null, [1, 0.5, 1]);
  add(new THREE.TorusGeometry(1.69, 0.065, 6, 40), wood, [0, 1.0, 0], body, [PI / 2, 0, 0]);
  add(new THREE.CylinderGeometry(0.75, 0.8, 0.12, 24), wood, [0, 0.06, 0], body);
  const mound = deform(new THREE.SphereGeometry(1.5, 32, 10, 0, TAU, 0, PI / 2), (v) => { const th = Math.atan2(v.z, v.x), ph = Math.atan2(Math.hypot(v.x, v.z), v.y); const k = 1 + 0.09 * Math.sin(th * 9 + ph * 6) * Math.sin(ph * 8); v.x *= k; v.z *= k; v.y = v.y * 0.32 * k; });
  add(mound, M(C.lettuce, { r: 0.4 }), [0, 0.92, 0], body);
  const card = discSheet(0.45, 2, 12, (r, th) => 0.18 * r * r, (th) => 1 + 0.15 * Math.sin(th * 6));
  for (let i = 0; i < 9; i++) { const a = i / 9 * TAU; add(card, M(i % 2 ? 0x8fd04e : C.lettuce2, { r: 0.4, ds: true }), [Math.cos(a) * 0.85, 1.25, Math.sin(a) * 0.85], body, [1.0, -a + PI / 2, 0]); }
  const tom = M(C.tomato, { r: 0.25 }), cut = M(0xf0715a, { r: 0.3 });
  for (let i = 0; i < 7; i++) { const a = i * 0.9 + 0.2, k = 0.3 + 0.55 * ((i * 37) % 10) / 10, x = Math.cos(a) * 1.3 * k, z = Math.sin(a) * 1.3 * k, y = 0.92 + 0.48 * Math.sqrt(1 - k * k) + 0.05;
    add(new THREE.SphereGeometry(0.22, 12, 6, 0, TAU, PI / 2, PI / 2), tom, [x, y, z], body, [-0.3, a, 0]);
    add(new THREE.CircleGeometry(0.22, 12), cut, [x, y + 0.004, z], body, [-PI / 2 - 0.3, 0, 0]); }
  fitAll(body, 1.2);
