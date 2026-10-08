  // DIFFERENT READING: a U-shaped gimbal fork on a turntable holds the bottle by side pins; squeezed dents in the body; a longer drip strand
  const body = grp(g);
  const must = M(C.mustard, { r: 0.28 }), red = M(C.red, { r: 0.28 }), steel = metal(), drip = M(C.mustard, { r: 0.12 });
  add(new THREE.CylinderGeometry(0.3, 0.33, 0.07, 28), steel, [0, 0.035, 0], body);
  add(new THREE.CylinderGeometry(0.08, 0.1, 0.12, 12), steel, [0, 0.12, 0], body);
  tube([[-0.28, 0.5, 0], [-0.28, 0.25, 0], [-0.2, 0.17, 0], [0, 0.15, 0], [0.2, 0.17, 0], [0.28, 0.25, 0], [0.28, 0.5, 0]], 0.03, steel, body, 24, 8);
  const B = grp(body, [0, 0.47, 0], null, [0.8, 0, 0]);
  const bg = deform(lathe([[0, -0.3], [0.17, -0.3], [0.21, -0.26], [0.22, -0.1], [0.22, 0.15], [0.2, 0.26], [0.13, 0.33], [0, 0.34]], 22), (v) => {
    const th = Math.atan2(v.z, v.x); const d = 1 - 0.1 * Math.exp(-((v.y - 0.0) ** 2) / 0.006) * Math.max(0, Math.cos(2 * th)); v.x *= d; v.z *= d; });
  add(bg, must, [0, 0, 0], B);
  for (const s of [-1, 1]) add(new THREE.CylinderGeometry(0.035, 0.035, 0.08, 8), steel, [s * 0.245, 0, 0], B, [0, 0, PI / 2]);
  add(new THREE.CylinderGeometry(0.13, 0.135, 0.07, 16), red, [0, 0.35, 0], B);
  add(new THREE.ConeGeometry(0.13, 0.3, 16), red, [0, 0.53, 0], B);
  add(new THREE.SphereGeometry(0.035, 10, 6), drip, [0, 0.7, 0.0], B);
  add(new THREE.CapsuleGeometry(0.018, 0.12, 3, 6), drip, [0, 0.77, -0.02], B, [-0.5, 0, 0]);
  fitAll(body, 1.0);
