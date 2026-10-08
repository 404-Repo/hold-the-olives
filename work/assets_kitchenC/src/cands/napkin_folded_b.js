  // EXTRUDE: the side profile of a Z-folded cloth (three layers joined by round bends) extruded across the width in five slices: linen, blue stripe, linen, thin blue stripe, linen
  const body = grp(g);
  const p = new THREE.Shape(), T = 0.1, D = 2.0;
  p.moveTo(-D / 2, 0); p.lineTo(D / 2, 0); p.absarc(D / 2, 0.15, 0.15, -PI / 2, PI / 2, false); p.lineTo(-D / 2 + 0.1, 0.3); p.absarc(-D / 2 + 0.1, 0.45, 0.15, -PI / 2, -PI * 1.5, true);
  p.lineTo(D / 2 - 0.05, 0.6); p.quadraticCurveTo(D / 2 + 0.02, 0.6, D / 2 - 0.02, 0.5); p.lineTo(-D / 2 + 0.1, 0.5); p.absarc(-D / 2 + 0.1, 0.45, 0.05, PI / 2, PI * 1.5, false);
  p.lineTo(D / 2, 0.4); p.absarc(D / 2, 0.15, 0.25, PI / 2, -PI / 2, true); p.closePath();
  const sl = [[-0.75, -0.2, 0], [-0.2, -0.08, 1], [-0.08, 0.3, 0], [0.3, 0.36, 1], [0.36, 0.75, 0]];
  for (const [x0, x1, s] of sl) add(sideSlab(p, x1 - x0, 0.0, 0.0, 8), s ? stripe() : linen(), [(x0 + x1) / 2, 0, 0], body);
  fitAll(body, 0.5);
