  // LATHE: one turned profile with a soft rounded edge and a slight raised lip, the pale ring as its own lathe band
  const body = grp(g);
  const cork = M(C.cork, { r: 0.92 }), pale = M(0xe9d6b0, { r: 0.8 }), fleck = M(0x8a6038, { r: 0.95 });
  add(lathe([[0, 0.078], [0.48, 0.078], [0.6, 0.08], [0.63, 0.085], [0.65, 0.075], [0.655, 0.045], [0.65, 0.01], [0.63, 0], [0, 0]], 40), cork, [0, 0, 0], body);
  add(lathe([[0.5, 0.079], [0.5, 0.083], [0.565, 0.083], [0.565, 0.079]], 40), pale, [0, 0, 0], body);
  const f = new THREE.InstancedMesh(new THREE.CircleGeometry(0.014, 5).rotateX(-PI / 2), fleck, 46), mt = new THREE.Matrix4();
  for (let i = 0; i < 46; i++) { const r = Math.sqrt((i * 0.618) % 1) * 0.47, a = i * 2.39996, s = 0.6 + (i % 4) * 0.35; mt.makeScale(s, 1, s); mt.setPosition(Math.cos(a) * r, 0.0795, Math.sin(a) * r); f.setMatrixAt(i, mt); }
  body.add(f);
  fitH(body, 0.09);
