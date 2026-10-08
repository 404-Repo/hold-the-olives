  // PRIMITIVES: a cork cylinder, a pale ring inlaid in the top, darker cork flecks as tiny discs
  const body = grp(g);
  const cork = M(C.cork, { r: 0.92 }), pale = M(0xe9d6b0, { r: 0.8 }), fleck = M(0x8a6038, { r: 0.95 });
  add(new THREE.CylinderGeometry(0.65, 0.65, 0.085, 40), cork, [0, 0.0425, 0], body);
  add(new THREE.TorusGeometry(0.62, 0.012, 4, 40), cork, [0, 0.08, 0], body, [PI / 2, 0, 0]);
  add(new THREE.RingGeometry(0.5, 0.56, 40), pale, [0, 0.0855, 0], body, [-PI / 2, 0, 0]);
  for (let i = 0; i < 40; i++) { const r = Math.sqrt((i * 0.618) % 1) * 0.6, a = i * 2.39996; add(new THREE.CircleGeometry(0.012 + (i % 3) * 0.006, 5), fleck, [Math.cos(a) * r, 0.0858, Math.sin(a) * r], body, [-PI / 2, 0, a]); }
  fitH(body, 0.09);
