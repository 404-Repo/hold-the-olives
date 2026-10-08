  // c: different reading: the jar has rolled to a slight angle and olives pour out in a trail; the lid stands on
  // its rim leaning against the jar's shoulder. Faceted (10-sided) glass reads as a moulded jar from above.
  const glass = M(0xd8eef0, 0.05, 0, undefined, { transparent: true, opacity: 0.4, depthWrite: false, side: DS });
  const ol = M(C.olive, 0.25), pim = M(C.pimento, 0.35), lidM = M(C.red, 0.3);
  const brine = M(C.oil, 0.06, 0, undefined, { transparent: true, opacity: 0.6 });
  const olive = (x, y, z, ry = 0, par = root) => { const o = grp(x, y, z, 0, ry, 0, par); add(sph(0.15, 10, 8), ol, 0, 0, 0, 0, 0, 0, o).scale.set(1, 1, 1.22);
    add(cyl(0.065, 0.065, 0.03, 8), pim, 0, 0, 0.18, Math.PI / 2, 0, 0, o); return o; };
  const jar = grp(0, 0, 0, 0, -0.35, 0);
  const R = 0.75;
  add(cyl(R, R, 1.6, 10, true), glass, 0, R, 0, Math.PI / 2, 0, 0, jar);
  add(cyl(R, R, 0.04, 10), glass, 0, R, -0.8, Math.PI / 2, 0, 0, jar);
  add(cyl(0.58, R, 0.25, 10, true), glass, 0, R, 0.92, Math.PI / 2, 0, 0, jar);
  add(cyl(0.58, 0.58, 0.25, 16, true), glass, 0, R, 1.15, Math.PI / 2, 0, 0, jar);
  add(cyl(R + 0.02, R + 0.02, 0.5, 10, true), M(C.sage, 0.45, 0, undefined, { side: DS }), 0, R, -0.2, Math.PI / 2, 0, 0, jar);
  for (let i = 0; i < 5; i++) for (let j = -1; j <= 1; j++) olive(j * 0.3, 0.2 + Math.abs(j) * 0.12, -0.6 + i * 0.3, i + j, jar);
  for (let i = 0; i < 3; i++) for (const j of [-0.16, 0.16]) olive(j, 0.48, -0.45 + i * 0.32, i, jar);
  const lid = grp(1.0, 0.68, -0.35, 0, -0.35, -0.3);
  add(cyl(0.66, 0.66, 0.16, 20), lidM, 0, 0, 0, 0, 0, Math.PI / 2, lid);
  // trail of brine and olives curving out of the mouth
  const trail = [[0.45, 1.5], [0.55, 2.0], [0.4, 2.5], [0.1, 2.85]];
  for (const [x, z] of trail) add(cyl(0.42, 0.42, 0.03, 14), brine, x, 0.015, z).scale.set(1.2, 1, 1);
  [[0.35, 1.45], [0.7, 1.75], [0.4, 2.05], [0.75, 2.35], [0.3, 2.6], [0.0, 2.95]].forEach(([x, z], i) => olive(x, 0.15, z, i));
  finish(HEIGHT);
