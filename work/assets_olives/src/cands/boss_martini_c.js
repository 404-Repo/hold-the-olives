  // C: a different reading. A chunky toy martini (thick rolled rim, shallower wider bowl, thick stem with a knop), a
  // huge olive sitting high like a head in a tub with little arms resting on the rim; pick through it diagonally. The
  // named olive group (olive, pick, arms) pivots where the pick meets the rim.
  const glass = M(0xd8eef0, { t: 0.4, r: 0.05 }), rimM = M(0xd8eef0, { t: 0.62, r: 0.05 }), gin = M(0xd6ecf0, { t: 0.18, r: 0.05 });
  const pickM = M(0xe8cfa0, { r: 0.55 }), red = M(0xe03a2a, { r: 0.25 }), om = M(0x8aa52e, { r: 0.25 });
  const yB = 1.9, yR = 3.3, Rr = 1.55, rc = (y) => 0.15 + (Rr - 0.15) * (y - yB) / (yR - yB);
  add(lathe([[0, 0], [0.85, 0], [0.88, 0.05], [0.82, 0.12], [0.3, 0.18], [0.14, 0.3], [0.12, 0.8], [0.2, 0.95], [0.12, 1.1], [0.13, yB - 0.1], [0.2, yB], [rc(yR), yR], [rc(yR) - 0.08, yR], [0.12, yB + 0.1], [0, yB + 0.1]], 32), glass);
  add(new THREE.TorusGeometry(Rr - 0.03, 0.08, 8, 40), rimM, [0, yR, 0], g, [PI / 2, 0, 0]);
  add(lathe([[0, yB + 0.1], [0.12, yB + 0.1], [rc(3.05) - 0.08, 3.05], [0, 3.05]], 28), gin);
  const rimP = V(Math.sin(-2.3) * (Rr - 0.03), yR + 0.06, Math.cos(-2.3) * (Rr - 0.03));
  const og = grp(g, [rimP.x, rimP.y, rimP.z], 'olive'); g.userData.olive = og; g.userData.joints = { olive: og };
  const oc = V(0, 3.05, 0.15).sub(rimP), dir = oc.clone().normalize();
  const pick = grp(og); orient(pick, dir);
  add(new THREE.CylinderGeometry(0.04, 0.04, 2.3, 8), pickM, [0, 0, 0.85], pick, [PI / 2, 0, 0]);
  add(new THREE.ConeGeometry(0.04, 0.18, 8), pickM, [0, 0, 2.09], pick, [PI / 2, 0, 0]);
  const fr = [0xe23a3a, 0x3a7fe2, 0xf2c12e];
  for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; const m = add(new THREE.BoxGeometry(0.12, 0.09, 0.008), M(fr[i % 3], { r: 0.15 }), [Math.cos(a) * 0.06, Math.sin(a) * 0.06, -0.25], pick); m.rotation.set(0, 0.6, a); }
  const ob = grp(og, [oc.x, oc.y - 0.62, oc.z]);
  olive({ H: 1.25, col: 0x8aa52e, expr: 'angry', legH: 0.001, wr: 0.85, eyeY: 0.62, scar: false, feet: false, arms: false }, 'bean', ob);
  add(new THREE.SphereGeometry(0.2, 12, 8), red, [0, 1.25, 0], ob, null, [1, 0.45, 1]);
  for (const sd of [-1, 1]) {
    const sh = V(sd * 0.5, 0.75, 0.05), hand = V(sd * 1.1, 3.3 - 3.05 + 0.62 + 0.08, 0.55);
    add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([sh, sh.clone().lerp(hand, 0.5).add(V(0, 0.15, 0)), hand]), 10, 0.08, 8, false), om, [0, 0, 0], ob);
    add(new THREE.SphereGeometry(0.12, 10, 8), om, [hand.x, hand.y, hand.z], ob);
  }
