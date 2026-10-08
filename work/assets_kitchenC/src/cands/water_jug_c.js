  // EXTRUDE: a straight-sided carafe extruded up from a plan shape with a pointed spout (wall = shape with an inset hole), heavy base slab, handle = extruded side ring (shape with hole); water = extruded plan prism; lemon wheels with segments
  const body = grp(g);
  const plan = (r, sp) => { const s = new THREE.Shape(); const n = 36; for (let i = 0; i <= n; i++) { const th = i / n * TAU, k = Math.max(0, Math.cos(th)) ** 8, rr = r + sp * k; const x = rr * Math.cos(th), y = rr * Math.sin(th); i ? s.lineTo(x, y) : s.moveTo(x, y); } return s; };
  const outer = plan(0.95, 0.35); outer.holes.push(plan(0.86, 0.3));
  add(slab(outer, 2.75, 0, 0, 12), glass(0.42), [0, 0.15, 0], body);
  add(slab(plan(0.95, 0.0), 0.16, 0.03, 0.0, 12), glass(0.5), [0, 0, 0], body);
  add(slab(plan(0.85, 0.0), 1.8, 0, 0, 12), liquid(0xbfe3ec, 0.45, 0.05), [0, 0.16, 0], body);
  const hs = new THREE.Shape(); hs.moveTo(0, 0); hs.bezierCurveTo(0.9, 0.1, 0.9, 1.9, 0, 2.0); hs.lineTo(0, 1.75); hs.bezierCurveTo(0.6, 1.65, 0.6, 0.35, 0, 0.25); hs.closePath();
  const hg = new THREE.ExtrudeGeometry(hs, { depth: 0.16, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 2, curveSegments: 10 }); hg.translate(0, 0, -0.08);
  add(hg, glass(0.5), [-0.9, 0.7, 0], body, [0, PI, 0]);
  const lem = M(0xf2d23a, { r: 0.35 }), pith = M(0xfbf1c2, { r: 0.5 });
  for (const [x, y, z, rx] of [[0.2, 1.9, 0.25, 0.2], [-0.3, 1.86, -0.25, -0.25], [0.15, 1.1, -0.2, 1.4]]) {
    const L = grp(body, [x, y, z], null, [rx, 0.4, 0.15]);
    add(new THREE.CylinderGeometry(0.38, 0.38, 0.08, 16), lem, [0, 0, 0], L);
    add(new THREE.CylinderGeometry(0.3, 0.3, 0.085, 16), pith, [0, 0, 0], L);
    for (let i = 0; i < 4; i++) add(new THREE.BoxGeometry(0.03, 0.09, 0.56), lem, [0, 0, 0], L, [0, i * PI / 4, 0]);
  }
  fitAll(body, 3.0);
