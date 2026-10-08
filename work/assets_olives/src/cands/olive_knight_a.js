  // A: primitives. Sphere olive, crimped bottle-cap helmet from a vertex-waved cylinder, the pick a cylinder + cones
  // through its right side like a couched lance, a cellophane starburst of thin boxes at the back end, pimento on the chest.
  const o = olive({ H: 0.35, col: 0x8aa52e, expr: 'pompous', legH: 0.03, arms: true, mouthY: 0.42 }, 'prim');
  const top = o.y0 + o.Hb, W = o.W, steel = M(0xbcc3c9, { r: 0.3, m: 0.6, name: 'metal' }), pickM = M(0xe8cfa0, { r: 0.55 }), red = M(0xe03a2a, { r: 0.25 });
  const cap = new THREE.CylinderGeometry(W * 0.4, W * 0.46, W * 0.2, 42, 1, false), pa = cap.attributes.position;
  for (let i = 0; i < pa.count; i++) { const x = pa.getX(i), z = pa.getZ(i), y = pa.getY(i); const r = Math.hypot(x, z); if (r < 1e-5) continue; const th = Math.atan2(x, z), k = y < 0 ? 1 + 0.07 * Math.cos(th * 21) : 1; pa.setX(i, x * k); pa.setZ(i, z * k); }
  cap.computeVertexNormals();
  const hg = grp(g, [0, top - W * 0.06, -W * 0.02]); hg.rotation.set(-0.18, 0, 0.12);
  add(cap, steel, [0, 0, 0], hg);
  add(new THREE.TorusGeometry(W * 0.4, W * 0.025, 5, 24), steel, [0, W * 0.1, 0], hg, [PI / 2, 0, 0]);
  add(new THREE.SphereGeometry(W * 0.14, 12, 8), red, [0, o.y0 + o.Hb * 0.2, o.D * 0.5 * 0.86], g, null, [1, 1, 0.45]);
  const pg = grp(g, [W * 0.56, o.y0 + o.Hb * 0.36, 0.14]); pg.rotation.x = PI / 2 - 0.17;
  add(new THREE.CylinderGeometry(0.014, 0.014, 0.78, 8), pickM, [0, 0, 0], pg);
  add(new THREE.ConeGeometry(0.014, 0.08, 8), pickM, [0, 0.43, 0], pg);
  add(new THREE.ConeGeometry(0.014, 0.04, 8), pickM, [0, -0.41, 0], pg, [PI, 0, 0]);
  const frill = [0xe23a3a, 0xe23a3a, 0x3a7fe2, 0xf2c12e];
  for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; add(new THREE.BoxGeometry(0.006, 0.05, 0.014), M(frill[i % 4], { r: 0.15 }), [Math.cos(a) * 0.026, -0.3, Math.sin(a) * 0.026], pg, [0, -a, 0], null).rotation.set(Math.sin(a) * 0.9, 0, -Math.cos(a) * 0.9); }
