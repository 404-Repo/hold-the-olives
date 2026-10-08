  // DIFFERENT READING: a tall faceted (8 side) jug-vase with a sage band, bouquet as a dome: blooms on a hemisphere, each daisy = 8 capsule petals around a centre dome; filler sprigs of small white spheres; leaves fanned under the dome
  const body = grp(g);
  add(vessel([[0.5, 0], [0.58, 0.05], [0.8, 0.5], [0.85, 1.2], [0.62, 1.75], [0.55, 1.95], [0.7, 2.1]], 0.08, 1.4, 8), ceramic(0xf2ead8, 0.35), [0, 0, 0], body);
  add(lathe([[0.82, 0.9], [0.875, 0.92], [0.885, 1.12], [0.85, 1.14]], 8), ceramic(C.sage, 0.35), [0, 0, 0], body);
  const stemM = M(0x4f8a34, { r: 0.6, name: 'foliage' }), leafM = M(0x5aa03a, { r: 0.55, name: 'foliage' });
  const cols = [[0xf07aa8, 0xf6c12e], [0xf08a3a, 0xc8602a], [0xffffff, 0xf2c12e], [0xf6d23a, 0xd88a1e]];
  const pg = new THREE.CapsuleGeometry(0.07, 0.2, 2, 6);
  for (let i = 0; i < 11; i++) {
    const a = i * 2.39996, el = 0.25 + 1.1 * Math.sqrt((i + 0.5) / 11), R = 1.25, x = R * Math.sin(el) * Math.cos(a) * 0.95, z = R * Math.sin(el) * Math.sin(a) * 0.95, y = 3.0 + R * Math.cos(el) * 0.85;
    rod([0, 2.0, 0], [x * 0.8, y - 0.2, z * 0.8], 0.04, stemM, body, 5);
    const [pc, cc] = cols[i % 4], F = grp(body, [x, y, z]); F.lookAt(x * 4, 3.0 + (y - 3.0) * 4, z * 4);
    for (let p = 0; p < 8; p++) { const pa = p / 8 * TAU; add(pg, M(pc, { r: 0.5 }), [Math.cos(pa) * 0.2, Math.sin(pa) * 0.2, 0], F, [0, 0, pa - PI / 2], [1, 1, 0.5]); }
    add(new THREE.SphereGeometry(0.13, 10, 6), M(cc, { r: 0.45 }), [0, 0, 0.03], F, null, [1, 1, 0.6]);
  }
  for (let i = 0; i < 10; i++) { const a = i * 1.9 + 0.5; add(new THREE.SphereGeometry(0.07, 6, 4), M(0xfaf6ee, { r: 0.6 }), [Math.cos(a) * 1.0, 3.3 + 0.4 * Math.sin(i * 2.1), Math.sin(a) * 1.0], body); }
  for (let i = 0; i < 7; i++) { const a = i / 7 * TAU; const Lf = grp(body, [Math.cos(a) * 0.5, 2.25, Math.sin(a) * 0.5], null, [0, -a + PI / 2, 0]);
    add(new THREE.ExtrudeGeometry(leafShape(0.9, 0.3), { depth: 0.03, bevelEnabled: false, curveSegments: 4 }), leafM, [0, 0, 0], Lf, [-1.1, 0, 0]); }
  fitAll(body, 4.2);
