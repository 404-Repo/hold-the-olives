  // PROFILES: lathe spill dish with a rolled lip, lathe burner crown and domed cap; grate ring extruded from an annulus,
  // five arms each a side profile (low over the cap, rising to the ring, a foot dropping outside) extruded across
  const body = grp(g);
  const iron = M(0x2b2a2c, { r: 0.55, m: 0.35, name: 'metal' }), steel = metal(C.steel, 0.3), cap = M(0x1d1c1e, { r: 0.4, m: 0.3, name: 'metal' });
  add(lathe([[0, 0.012], [0.6, 0.012], [0.9, 0.0], [1.0, 0.0], [1.03, 0.03], [1.0, 0.055], [0.96, 0.04], [0.62, 0.05], [0.58, 0.06], [0, 0.06]], 36), steel, [0, 0, 0], body);
  add(lathe([[0, 0.05], [0.56, 0.05], [0.58, 0.07], [0.52, 0.13], [0.0, 0.13]], 24), M(0x55585c, { r: 0.4, m: 0.7, name: 'metal' }), [0, 0, 0], body);
  add(lathe([[0, 0.12], [0.44, 0.12], [0.46, 0.15], [0.4, 0.19], [0.18, 0.21], [0.0, 0.215]], 24), cap, [0, 0, 0], body);
  for (let i = 0; i < 18; i++) { const a = i / 18 * TAU; add(new THREE.BoxGeometry(0.05, 0.035, 0.05), M(0x111111, { r: 0.8 }), [Math.cos(a) * 0.51, 0.115, Math.sin(a) * 0.51], body, [0, -a, 0]); }
  const R = 1.12, ann = new THREE.Shape(); ann.absarc(0, 0, R + 0.06, 0, TAU, false); const hole = new THREE.Path(); hole.absarc(0, 0, R - 0.06, 0, TAU, true); ann.holes.push(hole);
  add(slab(ann, 0.1, 0.03, 0.025, 24), iron, [0, 0.19, 0], body);
  const ap = new THREE.Shape(); // x = radial, y = up
  ap.moveTo(0.5, 0.24); ap.lineTo(0.56, 0.28); ap.lineTo(R + 0.05, 0.3); ap.lineTo(R + 0.13, 0.27); ap.lineTo(R + 0.12, 0.0); ap.lineTo(R + 0.0, 0.0); ap.lineTo(R - 0.02, 0.19); ap.lineTo(0.6, 0.2); ap.closePath();
  for (let i = 0; i < 5; i++) {
    const a = i / 5 * TAU + PI / 2, ag = grp(body, [0, 0, 0], null, [0, -a, 0]);
    const ge = new THREE.ExtrudeGeometry(ap, { depth: 0.08, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.025, bevelSegments: 2 }); ge.translate(0, 0, -0.04);
    add(ge, iron, [0, 0, 0], ag);
  }
  fitWHD(body, 2.4, 0.3, 2.4);
