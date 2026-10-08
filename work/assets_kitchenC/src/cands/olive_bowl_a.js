  // PROFILES: sage ceramic bowl lathe (foot ring, rounded wall, thick rim), nine glossy green olives (stretched spheres with a pimento-red pitted end), a toothpick through one olive with a red crimped frill
  const body = grp(g);
  add(vessel([[0.32, 0], [0.36, 0.04], [0.38, 0.08], [0.55, 0.16], [0.66, 0.3], [0.68, 0.42]], 0.07, 0.12, 24), ceramic(C.sage, 0.3), [0, 0, 0], body);
  const ol = M(0x8aa52e, { r: 0.25 }), pim = M(C.frill, { r: 0.3 });
  const og = new THREE.SphereGeometry(0.15, 12, 8);
  const spots = [[0, 0.42, 0], [0.24, 0.36, 0.1], [-0.22, 0.36, 0.14], [0.08, 0.36, -0.26], [-0.18, 0.35, -0.2], [0.26, 0.34, -0.14], [0.02, 0.33, 0.28], [-0.32, 0.3, -0.02], [0.15, 0.52, 0.02]];
  spots.forEach(([x, y, z], i) => { const O = grp(body, [x, y, z], null, [0.5 * Math.sin(i * 2), i * 1.3, 0.6 * Math.cos(i)]); add(og, ol, [0, 0, 0], O, null, [1, 1, 1.3]); add(new THREE.CircleGeometry(0.055, 8), pim, [0, 0, 0.196], O); });
  const pick = grp(body, [0.15, 0.52, 0.02], null, [0.25, 0, -0.35]);
  rod([0, -0.12, 0], [0, 0.42, 0], 0.014, M(C.pick, { r: 0.6 }), pick, 6);
  add(deform(new THREE.ConeGeometry(0.07, 0.12, 10, 2, true), (v) => { if (v.y < 0) { const k = 1 + 0.3 * Math.cos(Math.atan2(v.z, v.x) * 5); v.x *= k; v.z *= k; } }), M(C.frill, { r: 0.4, ds: true }), [0, 0.38, 0], pick, [PI, 0, 0]);
  fitAll(body, 0.7);
