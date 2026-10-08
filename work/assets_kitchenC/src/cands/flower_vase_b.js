  // PRIMITIVES: vase = scaled sphere belly + neck cylinder + torus lip; flowers = cup blooms (open cones and spheres) and pom-pom spheres on cylinder stems; leaves = flattened spheres
  const body = grp(g);
  const cer = ceramic(0xf2ead8, 0.35);
  add(new THREE.SphereGeometry(1.05, 24, 16), cer, [0, 0.95, 0], body, null, [1, 0.95, 1]);
  add(new THREE.CylinderGeometry(0.62, 0.5, 0.55, 20), cer, [0, 1.95, 0], body);
  add(new THREE.TorusGeometry(0.6, 0.08, 8, 24), cer, [0, 2.22, 0], body, [PI / 2, 0, 0]);
  add(new THREE.CylinderGeometry(0.55, 0.55, 0.05, 20), M(0x3f6a2a, { r: 0.8 }), [0, 2.18, 0], body);
  const stemM = M(0x4f8a34, { r: 0.6, name: 'foliage' }), leafM = M(0x5aa03a, { r: 0.55, name: 'foliage' });
  const cols = [0xf07aa8, 0xf08a3a, 0xf6d23a, 0xffffff, 0xe35d9a, 0xf6a23c, 0xb57ae0];
  for (let i = 0; i < 12; i++) {
    const a = i * 2.39996, k = Math.sqrt((i + 0.5) / 12), x = Math.cos(a) * 1.2 * k, z = Math.sin(a) * 1.2 * k, y = 3.55 + 0.4 * (1 - k * k);
    rod([x * 0.15, 2.0, z * 0.15], [x, y, z], 0.045, stemM, body, 5);
    const c = M(cols[i % cols.length], { r: 0.5 });
    if (i % 2) { add(new THREE.SphereGeometry(0.34, 10, 8), c, [x, y + 0.12, z], body, null, [1, 0.8, 1]); }
    else { add(new THREE.CylinderGeometry(0.4, 0.15, 0.4, 10, 1, true), M(cols[i % cols.length], { r: 0.5, ds: true }), [x, y + 0.15, z], body); add(new THREE.SphereGeometry(0.14, 8, 6), M(0xf6c12e, { r: 0.4 }), [x, y + 0.12, z], body); }
  }
  for (let i = 0; i < 9; i++) { const a = i * 0.7; add(new THREE.SphereGeometry(0.4, 8, 6), leafM, [Math.cos(a) * 0.8, 2.6 + 0.3 * (i % 3), Math.sin(a) * 0.8], body, [0.4, -a, 0.9], [1, 0.18, 0.45]); }
  fitAll(body, 4.2);
