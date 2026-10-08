  // EXTRUDE + LATHE: the blade outline (flared, rounded tip corners) with two real slot holes, extruded with a soft bevel; a lathed handle with a round knob end
  const body = grp(g);
  const w = timber(C.wood, 0.5);
  const sh = new THREE.Shape();   // shape x = world x, shape y = world -z ... we orient so blade tip is +Z below
  sh.moveTo(-0.13, 0); sh.lineTo(-0.36, 0.35); sh.lineTo(-0.44, 1.05); sh.quadraticCurveTo(-0.44, 1.17, -0.32, 1.18); sh.lineTo(0.32, 1.18); sh.quadraticCurveTo(0.44, 1.17, 0.44, 1.05); sh.lineTo(0.36, 0.35); sh.lineTo(0.13, 0); sh.closePath();
  for (const x of [-0.16, 0.16]) sh.holes.push(rrectPath(0.11, 0.55, 0.05).getPoints ? (() => { const p = new THREE.Path(); p.absarc(x, 0.55, 0.055, PI, 0, true); p.lineTo(x + 0.055, 0.95); p.absarc(x, 0.95, 0.055, 0, PI, true); p.closePath(); return p; })() : null);
  const blade = slab(sh, 0.07, 0.02, 0.015, 8, 2); blade.scale(1, 1, -1);   // flip so shape +y runs to world +z
  add(blade, w, [0, 0, 0.32], body);
  add(lathe([[0, 0], [0.09, 0.0], [0.1, 0.2], [0.11, 1.1], [0.1, 1.42], [0.08, 1.5], [0.13, 1.58], [0.15, 1.68], [0.13, 1.78], [0.07, 1.83], [0, 1.84]], 16), w, [0, 0.12, 0.38], body, [-PI / 2, 0, 0]);
  add(new THREE.BoxGeometry(0.2, 0.09, 0.3), w, [0, 0.07, 0.38], body);
  fitD(body, 3.5);
