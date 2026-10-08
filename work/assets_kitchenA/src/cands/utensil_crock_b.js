  // b: lathe crock with a bellied wall, thick rolled rim and foot; lathe spoon bowl and ladle cup; whisk wires as tubes.
  const sage = M(C.sage, 0.45, 0, undefined, { side: DS }), wood = M(C.block, 0.55, 0, 'timber'), steel = M(C.steel, 0.3, 0.55, 'metal');
  const steelD = M(C.steel, 0.3, 0.55, 'metal', { side: DS });
  add(sLathe([[0, 0.02], [0.5, 0.0], [0.6, 0.08], [0.64, 0.5], [0.62, 1.1], [0.6, 1.25], [0.66, 1.32], [0.62, 1.38], [0.54, 1.33], [0.52, 1.1], [0.52, 1.0], [0, 1.0]], 20, 2), sage);
  // spoon: handle + lathe bowl (shallow cup) tilted to face out
  const sp = grp(-0.28, 0.95, 0.12, 0.18, 0, 0.3);
  add(cyl(0.05, 0.06, 1.25, 8), wood, 0, 0.62, 0, 0, 0, 0, sp);
  const bowl = add(lathe([[0, 0], [0.12, 0.02], [0.2, 0.08], [0.22, 0.12], [0.18, 0.1], [0, 0.06]], 12), M(C.block, 0.55, 0, 'timber', { side: DS }), 0, 1.45, 0.02, Math.PI / 2, 0, 0, sp);
  bowl.scale.set(1, 1, 1.5);
  // whisk: handle and 5 wire loops (tubes)
  const wh = grp(-0.02, 0.95, -0.22, -0.12, 0, 0.08);
  add(cyl(0.065, 0.06, 0.75, 10), steel, 0, 0.38, 0, 0, 0, 0, wh);
  for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI; const c = Math.cos(a), s = Math.sin(a);
    add(tube([[0, 0.72, 0], [0.18 * c, 0.95, 0.18 * s], [0.22 * c, 1.25, 0.22 * s], [0, 1.45, 0], [-0.22 * c, 1.25, -0.22 * s], [-0.18 * c, 0.95, -0.18 * s], [0, 0.72, 0]], 0.014, 20, 4), steel, 0, 0, 0, 0, 0, 0, wh); }
  // ladle
  const la = grp(0.22, 0.95, -0.08, -0.12, 0, -0.22);
  add(tube([[0, 0, 0], [0, 1.2, 0], [0, 1.42, 0.05], [0, 1.45, 0.15]], 0.035, 10, 6), steel, 0, 0, 0, 0, 0, 0, la);
  add(lathe([[0, 0], [0.16, 0.03], [0.24, 0.12], [0.26, 0.2]], 14), steelD, 0, 1.3, 0.38, -0.3, 0, 0, la);
  // spatula: handle + extruded slotted blade
  const st = grp(0.32, 0.95, 0.25, 0.18, 0, -0.38);
  add(cyl(0.05, 0.055, 0.85, 8), wood, 0, 0.42, 0, 0, 0, 0, st);
  const blade = new THREE.Shape(rrect(0.38, 0.6, 0.12).map(([x, y]) => new THREE.Vector2(x, y)));
  for (const x of [-0.08, 0.08]) { const h = new THREE.Path(rrect(0.05, 0.32, 0.024, 2).map(([a, b]) => new THREE.Vector2(a + x, b))); blade.holes.push(h); }
  add(new THREE.ExtrudeGeometry(blade, { depth: 0.05, bevelEnabled: false, curveSegments: 3 }), wood, 0, 1.15, -0.025, 0, 0, 0, st);
  finish(HEIGHT);
