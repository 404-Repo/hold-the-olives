  // A: lathe. The whole glass as one swept closed profile (foot, stem, cone bowl with real wall thickness and a
  // rolled rim), the liquid a swept cone, the olive + pick a named group pivoting where the pick crosses the rim.
  const glass = M(0xd8eef0, { t: 0.38, r: 0.05 }), rimM = M(0xd8eef0, { t: 0.6, r: 0.05 }), gin = M(0xd6ecf0, { t: 0.18, r: 0.05 });
  const pickM = M(0xe8cfa0, { r: 0.55 }), red = M(0xe03a2a, { r: 0.25 }), oliveM = M(0x8aa52e, { r: 0.25 });
  const yB = 1.62, yR = 3.42, Rr = 1.36, rc = (y) => Rr * (y - yB + 0.05) / (yR - yB + 0.05);
  const prof = [[0, 0], [0.78, 0], [0.8, 0.03], [0.76, 0.07], [0.3, 0.11], [0.09, 0.2], [0.07, 0.4], [0.07, yB - 0.25], [0.1, yB - 0.1], [0.22, yB], [rc(yR) + 0.02, yR], [rc(yR) + 0.02, yR + 0.03], [rc(yR) - 0.03, yR + 0.03], [rc(yR) - 0.05, yR], [0.12, yB + 0.08], [0, yB + 0.06]];
  add(lathe(prof, 32), glass);
  add(new THREE.TorusGeometry(rc(yR) - 0.0, 0.045, 6, 40), rimM, [0, yR + 0.02, 0], g, [PI / 2, 0, 0]);
  add(lathe([[0, yB + 0.08], [0.1, yB + 0.08], [rc(3.15) - 0.07, 3.15], [0, 3.15]], 28), gin);
  buildOlive(g, rc(yR), yR);
  function buildOlive(par, rimR, rimY) {
    // pick crosses the rim at the back-right and runs down to the olive in the middle of the bowl
    const rimP = V(Math.sin(2.4) * rimR, rimY + 0.02, Math.cos(2.4) * rimR);
    const og = grp(par, [rimP.x, rimP.y, rimP.z], 'olive'); g.userData.olive = og; g.userData.joints = { olive: og };
    const oc = V(0, 3.18, 0.1).sub(rimP), dir = oc.clone().normalize();
    const pick = grp(og); orient(pick, dir);
    add(new THREE.CylinderGeometry(0.035, 0.035, 1.9, 8), pickM, [0, 0, 0.65], pick, [PI / 2, 0, 0]);
    add(new THREE.ConeGeometry(0.035, 0.16, 8), pickM, [0, 0, 1.68], pick, [PI / 2, 0, 0]);
    const fr = [0xe23a3a, 0x3a7fe2, 0xf2c12e];
    for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; const m = add(new THREE.BoxGeometry(0.1, 0.08, 0.008), M(fr[i % 3], { r: 0.15 }), [Math.cos(a) * 0.05, Math.sin(a) * 0.05, -0.3], pick); m.rotation.set(0, 0, a); m.rotation.y = 0.6; }
    const ob = grp(og, [oc.x, oc.y, oc.z]);
    const s = olive({ H: 1.2, col: 0x8aa52e, expr: 'angry', legH: 0.001, wr: 0.82, eyeY: 0.62, scar: false, hole: false, feet: false }, 'prim', ob);
    ob.position.y -= 0.6;
    add(new THREE.SphereGeometry(0.2, 12, 8), red, [0, 1.18, 0], ob, null, [1, 0.5, 1]);
  }
