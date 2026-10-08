  // a: primitives. Jar lying along z (mouth +z): open glass cylinder, base disc, neck, thread ring, sage band;
  // olives heaped inside; red lid flat beside the mouth; a brine puddle (flattened disc) with olives on it.
  const R = 0.75, L = 1.7;
  const glass = M(0xd8eef0, 0.05, 0, undefined, { transparent: true, opacity: 0.4, depthWrite: false, side: DS });
  const ol = M(C.olive, 0.25), pim = M(C.pimento, 0.35), sage = M(C.sage, 0.45), lidM = M(C.red, 0.3);
  const brine = M(C.oil, 0.08, 0, undefined, { transparent: true, opacity: 0.6 });
  const olive = (x, y, z, ry = 0) => { const o = grp(x, y, z, 0, ry, 0); add(sph(0.15, 10, 8), ol, 0, 0, 0, 0, 0, 0, o).scale.set(1, 1, 1.2);
    add(cyl(0.06, 0.06, 0.03, 8), pim, 0, 0, 0.175, Math.PI / 2, 0, 0, o); return o; };
  add(cyl(R, R, L, 20, true), glass, 0, R, 0, Math.PI / 2);
  add(cyl(R, R, 0.04, 20), glass, 0, R, -L / 2, Math.PI / 2);
  add(cyl(R * 0.8, R * 0.92, 0.25, 20, true), glass, 0, R, L / 2 + 0.12, -Math.PI / 2);
  add(new THREE.TorusGeometry(R * 0.82, 0.03, 6, 20), glass, 0, R, L / 2 + 0.18);
  add(cyl(R + 0.02, R + 0.02, 0.7, 20, true), M(C.sage, 0.45, 0, undefined, { side: DS }), 0, R, -0.1, Math.PI / 2);
  // olives inside: three layers along the bottom of the jar
  for (let i = 0; i < 5; i++) for (let j = -1; j <= 1; j++) olive(j * 0.3 + (i % 2) * 0.1, 0.2 + Math.abs(j) * 0.1, -0.65 + i * 0.32, i + j);
  for (let i = 0; i < 4; i++) for (const j of [-0.15, 0.15]) olive(j, 0.45, -0.5 + i * 0.32, i * 2);
  // lid flat beside the mouth
  add(cyl(0.68, 0.68, 0.16, 20), lidM, 1.15, 0.08, 0.95);
  add(new THREE.TorusGeometry(0.66, 0.05, 6, 20), lidM, 1.15, 0.12, 0.95, Math.PI / 2);
  // brine puddle and spilled olives
  add(cyl(0.9, 0.9, 0.03, 18), brine, -0.1, 0.015, L / 2 + 0.7).scale.set(1.2, 1, 0.8);
  add(cyl(0.45, 0.45, 0.03, 14), brine, 0.6, 0.015, L / 2 + 1.25);
  olive(-0.3, 0.15, L / 2 + 0.5, 0.4); olive(0.15, 0.15, L / 2 + 0.75, 1.2); olive(-0.55, 0.15, L / 2 + 0.95, 2);
  olive(0.5, 0.15, L / 2 + 1.25, 0.8); olive(0.0, 0.15, L / 2 + 1.25, 2.6);
  finish(HEIGHT);
