  // PROFILES: a lathe-turned turntable and yoke, the stock as an extruded side silhouette, a tube bow with frilled tips
  const body = grp(g);
  const wood = timber(C.wood), dark = timber(0xa8784a), pick = M(C.pick, { r: 0.55 }), str = M(0xf4efe4, { r: 0.8 }), frill = M(C.frill, { r: 0.2 });
  add(lathe([[0, 0], [0.42, 0], [0.44, 0.03], [0.43, 0.08], [0.36, 0.1], [0.3, 0.12], [0.3, 0.16], [0.12, 0.18], [0.09, 0.24], [0.09, 0.34], [0.14, 0.37], [0, 0.38]], 28), wood, [0, 0, 0], body, null, [0.72, 1, 0.72]);
  for (const s of [-1, 1]) add(new THREE.BoxGeometry(0.05, 0.16, 0.16), dark, [s * 0.1, 0.43, 0], body);
  add(new THREE.CylinderGeometry(0.03, 0.03, 0.26, 8), dark, [0, 0.46, 0], body, [0, 0, PI / 2]);
  const aim = grp(body, [0, 0.47, 0], null, [-0.14, 0, 0]);
  const pr = new THREE.Shape();   // side silhouette (x = world z, y = world y)
  pr.moveTo(-0.45, -0.12); pr.lineTo(-0.3, -0.12); pr.quadraticCurveTo(-0.2, -0.02, -0.05, -0.04); pr.lineTo(0.38, -0.04);
  pr.lineTo(0.46, -0.06); pr.lineTo(0.48, 0.05); pr.lineTo(0.0, 0.05); pr.lineTo(-0.3, 0.06); pr.quadraticCurveTo(-0.45, 0.08, -0.47, 0.0); pr.closePath();
  add(sideSlab(pr, 0.15, 0.015, 0.012), wood, [0, 0, 0], aim);
  add(new THREE.BoxGeometry(0.05, 0.012, 0.66), M(0x8a5e36, { r: 0.6 }), [0, 0.056, 0.08], aim);     // groove for the bolt
  const by = 0.0, bz = 0.43;
  tube([[-0.44, by, bz - 0.22], [-0.3, by, bz - 0.04], [0, by, bz + 0.06], [0.3, by, bz - 0.04], [0.44, by, bz - 0.22]], 0.03, pick, aim, 28, 8);
  // cellophane frill tufts at the pick's ends
  for (const s of [-1, 1]) for (let i = 0; i < 5; i++) { const a = i / 5 * TAU; add(new THREE.ConeGeometry(0.018, 0.12, 4), frill, [s * 0.47 + 0.03 * Math.cos(a), by + 0.03 * Math.sin(a), bz - 0.25], aim, [Math.sin(a) * 0.6, 0, -s * PI / 2 + Math.cos(a) * 0.6]); }
  for (const s of [-1, 1]) rod([s * 0.44, by, bz - 0.22], [0, 0.06, -0.12], 0.009, str, aim, 5);
  add(new THREE.CylinderGeometry(0.024, 0.024, 0.66, 8), pick, [0, 0.08, 0.14], aim, [PI / 2, 0, 0]);
  add(new THREE.ConeGeometry(0.024, 0.12, 8), pick, [0, 0.08, 0.53], aim, [PI / 2, 0, 0]);
  add(new THREE.ConeGeometry(0.024, 0.08, 8), pick, [0, 0.08, -0.23], aim, [-PI / 2, 0, 0]);
  fitAll(body, 0.75);
