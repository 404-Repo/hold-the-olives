  // c: extrude. A domed bloomer cross-section (flat base, round crown) swept along x; slashes as raised darker ears;
  // slices are the same section extruded thin, one standing leaning against the loaf, one lying flat.
  const crust = M(C.crust, 0.65), crumb = M(C.crumb, 0.85), ear = M(0xa9672a, 0.6);
  const sec = []; for (let i = 0; i <= 14; i++) { const a = Math.PI * i / 14; sec.push([Math.cos(a) * 0.6, 0.08 + Math.pow(Math.sin(a), 0.75) * 0.8]); }
  sec.push([-0.56, 0.0], [0.56, 0.0]);
  add(ext(sec, 1.9, 0.14), crust, -0.2, 0, 0, 0, Math.PI / 2, 0);
  for (let i = 0; i < 4; i++) add(rbox(0.1, 0.1, 0.9, 0.05), ear, -0.85 + i * 0.4, 0.86, 0, 0, 0.45, 0);
  const inner = sec.map(([x, y]) => [x * 0.86, 0.06 + y * 0.86]);
  add(ext(inner, 0.04, 0), crumb, 0.76, 0, 0, 0, Math.PI / 2, 0);
  const sl = grp(1.35, 0, 0.25, 0, 0.3, 0); add(ext(sec, 0.14, 0.04), crust, 0, 0.0, 0, -Math.PI / 2, 0, 0, sl).position.y = 0.07;
  add(ext(inner, 0.15, 0), crumb, 0, 0.075, 0, -Math.PI / 2, 0, 0, sl);
  finish(HEIGHT);
