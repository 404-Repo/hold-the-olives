  // PROFILES: cream ceramic vase lathe (round belly, short neck, flared lip, wound outward), stems as tubes fanning from the neck, daisies = a flat petal ring (one extruded star shape per bloom) + domed centre, leaves = extruded leaf shapes
  const body = grp(g);
  add(vessel([[0.55, 0], [0.62, 0.04], [0.95, 0.4], [1.08, 0.85], [0.98, 1.3], [0.6, 1.6], [0.48, 1.75], [0.55, 1.9], [0.66, 2.0]], 0.08, 1.5, 24), ceramic(0xf2ead8, 0.35), [0, 0, 0], body);
  const stemM = M(0x4f8a34, { r: 0.6, name: 'foliage' }), leafM = M(0x5aa03a, { r: 0.55, name: 'foliage' });
  const cols = [[0xf07aa8, 0xf6c12e], [0xf08a3a, 0xe8962a], [0xf6d23a, 0xd88a1e], [0xffffff, 0xf2c12e], [0xe35d9a, 0xf6c12e], [0xf6a23c, 0xc8602a]];
  const star = (R, n) => { const s = new THREE.Shape(); for (let i = 0; i <= n * 2; i++) { const a = i / (n * 2) * TAU, r = i % 2 ? R * 0.5 : R; const x = r * Math.cos(a), y = r * Math.sin(a); i ? s.lineTo(x, y) : s.moveTo(x, y); } return s; };
  const blooms = [];
  for (let i = 0; i < 13; i++) { const a = i * 2.39996, k = Math.sqrt((i + 0.5) / 13); blooms.push([Math.cos(a) * 1.25 * k, 3.6 + 0.45 * (1 - k * k) - 0.1 * (i % 3), Math.sin(a) * 1.25 * k]); }
  blooms.forEach(([x, y, z], i) => {
    tube([[x * 0.1, 1.7, z * 0.1], [x * 0.5, 2.6, z * 0.5], [x, y, z]], 0.045, stemM, body, 6, 5);
    const [pc, cc] = cols[i % cols.length], R = 0.36 + 0.06 * (i % 3);
    const F = grp(body, [x, y, z]); F.lookAt(x * 3, y + 3.5, z * 3);
    add(new THREE.ExtrudeGeometry(star(R, 8), { depth: 0.04, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.04, bevelSegments: 1, curveSegments: 1 }), M(pc, { r: 0.5 }), [0, 0, 0], F);
    add(new THREE.SphereGeometry(R * 0.38, 10, 6, 0, TAU, 0, PI / 2), M(cc, { r: 0.45 }), [0, 0, 0.06], F, [PI / 2, 0, 0]);
  });
  for (let i = 0; i < 8; i++) { const a = i * 0.79 + 0.3; const Lf = grp(body, [Math.cos(a) * 0.55, 2.3 + 0.2 * (i % 2), Math.sin(a) * 0.55], null, [0, -a + PI / 2, 0]);
    add(new THREE.ExtrudeGeometry(leafShape(1.0, 0.32), { depth: 0.03, bevelEnabled: false, curveSegments: 4 }), leafM, [0, 0, 0], Lf, [-0.9, 0, 0]); }
  fitAll(body, 4.2);
