  // C: a different reading. Bean olive truly impaled: the pick goes in at its back and out through the pimento on its
  // chest, angled forward; both little arms grip it; crimped bottle-cap helmet; frill tuft as a ring of fins at the back.
  const o = olive({ H: 0.35, col: 0x8aa52e, expr: 'pompous', legH: 0.04, wr: 0.76, arms: false, mouthY: 0.45 }, 'bean');
  const top = o.y0 + o.Hb, W = o.W, steel = M(0xbcc3c9, { r: 0.3, m: 0.6, name: 'metal' }), pickM = M(0xe8cfa0, { r: 0.55 }), red = M(0xe03a2a, { r: 0.25 });
  const cap = new THREE.CylinderGeometry(W * 0.38, W * 0.44, W * 0.18, 42, 1, false), pa = cap.attributes.position;
  for (let i = 0; i < pa.count; i++) { const x = pa.getX(i), z = pa.getZ(i), y = pa.getY(i); if (Math.hypot(x, z) < 1e-5) continue; const k = y < 0 ? 1 + 0.07 * Math.cos(Math.atan2(x, z) * 21) : 1; pa.setX(i, x * k); pa.setZ(i, z * k); }
  cap.computeVertexNormals();
  const hg = grp(g, [0, top - W * 0.05, -W * 0.03]); hg.rotation.set(-0.2, 0, -0.12); add(cap, steel, [0, 0, 0], hg);
  const py = o.y0 + o.Hb * 0.24, ang = 0.17;
  const s = o.S(py, 0);
  add(new THREE.TorusGeometry(W * 0.1, W * 0.05, 8, 14), red, [0, py, s.p.z - 0.004], g);
  const pg = grp(g, [0, py, 0.2]); pg.rotation.x = PI / 2 - ang;
  add(new THREE.CylinderGeometry(0.014, 0.014, 0.8, 8), pickM, [0, 0.0, 0], pg);
  add(new THREE.ConeGeometry(0.014, 0.08, 8), pickM, [0, 0.44, 0], pg);
  add(new THREE.ConeGeometry(0.014, 0.03, 8), pickM, [0, -0.415, 0], pg, [PI, 0, 0]);
  const frill = [0xe23a3a, 0x3a7fe2, 0xf2c12e];
  for (let i = 0; i < 10; i++) { const a = i / 10 * TAU; const m = add(new THREE.BoxGeometry(0.05, 0.035, 0.004), M(frill[i % 3], { r: 0.15 }), [Math.cos(a) * 0.024, -0.33, Math.sin(a) * 0.024], pg); m.rotation.set(0, -a, 0.5); }
  for (const sd of [-1, 1]) {
    const sh = o.S(o.y0 + o.Hb * 0.45, sd * 1.35), hand = V(sd * 0.03, py + 0.02 + 0.06 * Math.tan(ang), 0.2 - 0.0);
    const a = sh.p.clone().addScaledVector(sh.n, 0.005), mid = a.clone().lerp(hand, 0.5).add(V(sd * 0.04, -0.03, 0));
    add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([a, mid, hand]), 8, W * 0.055, 6, false), o.body);
    add(new THREE.SphereGeometry(W * 0.075, 8, 6), o.body, [hand.x, hand.y, hand.z]);
  }
