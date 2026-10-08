  // B: primitives. Open inverted cone bowl, cylinder stem, cylinder foot, torus rims, a cone of gin; the olive (sphere
  // body, sphere eyes) skewered on a pick laid ACROSS the bowl, resting on the rim at the right: the named group pivots
  // at that rim contact.
  const glass = M(0xd8eef0, { t: 0.38, r: 0.05, ds: true }), rimM = M(0xd8eef0, { t: 0.6, r: 0.05 }), gin = M(0xd6ecf0, { t: 0.18, r: 0.05 });
  const pickM = M(0xe8cfa0, { r: 0.55 }), red = M(0xe03a2a, { r: 0.25 });
  const yB = 1.62, yR = 3.42, Rr = 1.36;
  add(new THREE.ConeGeometry(Rr, yR - yB, 32, 1, true), glass, [0, (yB + yR) / 2, 0], g, [PI, 0, 0]);
  add(new THREE.TorusGeometry(Rr, 0.05, 6, 40), rimM, [0, yR, 0], g, [PI / 2, 0, 0]);
  add(new THREE.CylinderGeometry(0.07, 0.07, yB - 0.08, 10), glass, [0, yB / 2, 0]);
  add(new THREE.SphereGeometry(0.16, 12, 8), rimM, [0, yB, 0], g, null, [1, 0.8, 1]);
  add(new THREE.CylinderGeometry(0.78, 0.8, 0.06, 32), glass, [0, 0.03, 0]);
  add(new THREE.TorusGeometry(0.79, 0.03, 5, 32), rimM, [0, 0.06, 0], g, [PI / 2, 0, 0]);
  add(new THREE.CylinderGeometry(0.2, 0.78, 0.1, 24), rimM, [0, 0.1, 0]);
  add(new THREE.ConeGeometry(Rr * 0.83, (yR - yB) * 0.83, 28), gin, [0, yB + (yR - yB) * 0.83 / 2 + 0.02, 0], g, [PI, 0, 0]);
  const rimP = V(Rr * 0.97, yR + 0.04, 0);
  const og = grp(g, [rimP.x, rimP.y, rimP.z], 'olive'); g.userData.olive = og; g.userData.joints = { olive: og };
  const pk = grp(og); pk.rotation.z = 0.32;
  add(new THREE.CylinderGeometry(0.035, 0.035, 2.0, 8), pickM, [-0.75, 0, 0], pk, [0, 0, PI / 2]);
  add(new THREE.ConeGeometry(0.035, 0.16, 8), pickM, [-1.83, 0, 0], pk, [0, 0, PI / 2]);
  const fr = [0xe23a3a, 0x3a7fe2, 0xf2c12e];
  for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; const m = add(new THREE.BoxGeometry(0.008, 0.1, 0.08), M(fr[i % 3], { r: 0.15 }), [0.2, Math.cos(a) * 0.05, Math.sin(a) * 0.05], pk); m.rotation.set(a, 0, 0.6); }
  const ob = grp(pk, [-1.0, 0, 0]); ob.rotation.z = -0.32;
  olive({ H: 1.2, col: 0x8aa52e, expr: 'angry', legH: 0.001, wr: 0.82, eyeY: 0.62, scar: false, feet: false }, 'prim', ob);
  ob.position.y -= 0.55;
  ob.children.forEach((c) => {});
  add(new THREE.SphereGeometry(0.2, 12, 8), red, [0, 1.18, 0], ob, null, [1, 0.5, 1]);
