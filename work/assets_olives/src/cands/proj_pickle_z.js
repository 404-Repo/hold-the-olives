  // A: primitives. A crinkle-cut chip: a short cylinder whose rim is waved by moving vertices, lying flat, dark skin
  // edge, pickle-green faces and a pale ring of seed pockets on each face.
  const skin = M(0x4f6b1e, { r: 0.3 }), flesh = M(0x7c9c2c, { r: 0.3 }), seed = M(0xc9d27a, { r: 0.3 });
  const R = 0.165, T = 0.055, wav = (th) => 1 + 0.06 * Math.cos(th * 14);
  const geo = new THREE.CylinderGeometry(R, R, T, 56, 1, false), pa = geo.attributes.position;
  for (let i = 0; i < pa.count; i++) { const x = pa.getX(i), z = pa.getZ(i), r = Math.hypot(x, z); if (r < 1e-5) continue; const k = wav(Math.atan2(x, z)); pa.setX(i, x * k); pa.setZ(i, z * k); }
  geo.computeVertexNormals(); add(geo, skin, [0, T / 2, 0]);
  for (const sd of [-1, 1]) {
    add(new THREE.CircleGeometry(R * 0.88, 40), flesh, [0, T / 2 + sd * (T / 2 + 0.001), 0], g, [-sd * PI / 2, 0, 0]);
    for (let i = 0; i < 9; i++) { const a = i / 9 * TAU; add(new THREE.SphereGeometry(0.016, 6, 4), seed, [Math.sin(a) * R * 0.42, T / 2 + sd * (T / 2), Math.cos(a) * R * 0.42], g, [0, a, 0], [0.6, 0.25, 1]); }
  }
