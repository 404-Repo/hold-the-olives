  // b: lathe-profiled jar (round shoulders, short neck, screw thread, rolled lip) lying with mouth +z,
  // olives inside plus an organic extruded brine puddle spreading from the mouth; lid lathe with knurled rim.
  const glass = M(0xd8eef0, 0.05, 0, undefined, { transparent: true, opacity: 0.42, depthWrite: false, side: DS });
  const ol = M(C.olive, 0.25), pim = M(C.pimento, 0.35), lidM = M(C.red, 0.3);
  const brine = M(C.oil, 0.06, 0, undefined, { transparent: true, opacity: 0.62 });
  const olive = (x, y, z, ry = 0, rz = 0) => { const o = grp(x, y, z, 0, ry, rz); add(sph(0.15, 10, 8), ol, 0, 0, 0, 0, 0, 0, o).scale.set(1, 1, 1.22);
    add(cyl(0.065, 0.065, 0.03, 8), pim, 0, 0, 0.18, Math.PI / 2, 0, 0, o); return o; };
  const R = 0.75;
  // profile along jar axis (local y), base at -0.95, mouth at +1.1
  const jar = sLathe([[0, -0.95], [0.6, -0.95], [0.74, -0.85], [0.75, -0.2], [0.75, 0.55], [0.68, 0.78], [0.56, 0.86], [0.56, 1.05], [0.59, 1.1]], 22, 3);
  add(jar, glass, 0, R, 0, Math.PI / 2);
  for (const t of [0.92, 1.0]) add(new THREE.TorusGeometry(0.575, 0.022, 5, 20), glass, 0, R, t);
  add(lathe([[0.76, -0.25], [0.77, -0.2], [0.77, 0.35], [0.76, 0.4]], 22), M(C.sage, 0.45, 0, undefined, { side: DS }), 0, R, 0, Math.PI / 2);
  for (let i = 0; i < 6; i++) for (let j = -1; j <= 1; j++) olive(j * 0.32 + (i % 2) * 0.12, 0.2 + Math.abs(j) * 0.12, -0.72 + i * 0.3, i * 1.3 + j, j * 0.4);
  for (let i = 0; i < 5; i++) for (const j of [-0.17, 0.17]) olive(j, 0.47, -0.6 + i * 0.3, i, 0.3);
  // lid: lathe cap lying face down beside the mouth
  add(lathe([[0, 0.17], [0.55, 0.17], [0.64, 0.14], [0.66, 0.02], [0.62, 0], [0, 0]], 22), lidM, 1.1, 0, 1.15);
  add(new THREE.TorusGeometry(0.64, 0.04, 5, 22), lidM, 1.1, 0.1, 1.15, Math.PI / 2);
  // puddle: blobby outline extruded thin
  const blob = []; for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2; const r = 0.85 + 0.18 * Math.sin(a * 3) + 0.1 * Math.cos(a * 5);
    blob.push([Math.cos(a) * r * 1.25, Math.sin(a) * r]); }
  add(ext(blob, 0.03, 0, 2), brine, -0.1, 0.015, 1.85, Math.PI / 2);
  olive(-0.35, 0.15, 1.5, 0.4); olive(0.15, 0.15, 1.72, 1.2); olive(-0.65, 0.15, 1.95, 2.1); olive(0.45, 0.15, 2.15, 0.8); olive(-0.15, 0.15, 2.3, 2.6);
  finish(HEIGHT);
