  // DIFFERENT READING: a fluted ramekin (lathe with 12 deformed flutes, straight wall) in sage, olives stacked as a little pyramid (ring of six, ring of three, one on top), a pick with a blue frill
  const body = grp(g);
  const wall = [[0.5, 0], [0.55, 0.03], [0.58, 0.08], [0.6, 0.34], [0.62, 0.38]];
  add(deform(vessel(wall, 0.06, 0.08, 36), (v) => { const r = Math.hypot(v.x, v.z); if (r > 0.57 && v.y > 0.06 && v.y < 0.36) { const k = 1 + 0.035 * Math.cos(Math.atan2(v.z, v.x) * 12); v.x *= k; v.z *= k; } }), ceramic(C.sage, 0.3), [0, 0, 0], body);
  const ol = M(0x8aa52e, { r: 0.25 }), og = new THREE.SphereGeometry(0.15, 12, 8), pim = M(C.frill, { r: 0.3 });
  const put = (x, y, z, i) => { const O = grp(body, [x, y, z], null, [0.3, i, 0.2]); add(og, ol, [0, 0, 0], O, null, [1, 1, 1.25]); add(new THREE.CircleGeometry(0.05, 8), pim, [0, 0, 0.188], O); };
  for (let i = 0; i < 6; i++) { const a = i / 6 * TAU; put(Math.cos(a) * 0.32, 0.3, Math.sin(a) * 0.32, a); }
  for (let i = 0; i < 3; i++) { const a = i / 3 * TAU + 0.5; put(Math.cos(a) * 0.15, 0.48, Math.sin(a) * 0.15, a + 1); }
  put(0, 0.27, 0, 0);
  const pick = grp(body, [0.15 * Math.cos(0.5), 0.48, 0.15 * Math.sin(0.5)], null, [0.2, 0, -0.25]);
  rod([0, -0.1, 0], [0, 0.4, 0], 0.014, M(C.pick, { r: 0.6 }), pick, 6);
  add(deform(new THREE.ConeGeometry(0.07, 0.12, 10, 2, true), (v) => { if (v.y < 0) { const k = 1 + 0.3 * Math.cos(Math.atan2(v.z, v.x) * 5); v.x *= k; v.z *= k; } }), M(0x3a7fe2, { r: 0.4, ds: true }), [0, 0.38, 0], pick, [PI, 0, 0]);
  fitAll(body, 0.7);
