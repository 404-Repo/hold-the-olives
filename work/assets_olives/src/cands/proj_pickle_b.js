  // B: extrude. A wavy outline extruded with a bevel (bevel subtracted), skin colour; a smaller flesh disc set into
  // each face, seed pockets as a ring of tiny ellipses.
  const skin = M(0x4f6b1e, { r: 0.3 }), flesh = M(0x7c9c2c, { r: 0.3 }), seed = M(0xc9d27a, { r: 0.3 });
  const R = 0.165, T = 0.055, bv = 0.012, sh = new THREE.Shape();
  for (let i = 0; i <= 84; i++) { const a = i / 84 * TAU, r = (R - bv) * (1 + 0.065 * Math.cos(a * 14)); i ? sh.lineTo(Math.cos(a) * r, Math.sin(a) * r) : sh.moveTo(Math.cos(a) * r, Math.sin(a) * r); }
  const geo = new THREE.ExtrudeGeometry(sh, { depth: T - bv * 2, bevelEnabled: true, bevelThickness: bv, bevelSize: bv, bevelSegments: 2, curveSegments: 2 });
  geo.rotateX(-PI / 2); add(geo, skin, [0, bv, 0]);
  for (const sd of [-1, 1]) {
    add(new THREE.CylinderGeometry(R * 0.82, R * 0.82, 0.006, 36), flesh, [0, sd > 0 ? T - 0.001 : 0.001, 0]);
    for (let i = 0; i < 10; i++) { const a = i / 10 * TAU; add(new THREE.SphereGeometry(0.015, 6, 4), seed, [Math.sin(a) * R * 0.4, sd > 0 ? T + 0.002 : -0.002, Math.cos(a) * R * 0.4], g, [0, a, 0], [0.6, 0.3, 1]); }
  }
