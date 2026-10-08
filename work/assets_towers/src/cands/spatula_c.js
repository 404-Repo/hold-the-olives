  // DIFFERENT READING: a turner: the blade lies flat on the counter, an offset neck bends UP so the handle rises off the counter at an angle
  const body = grp(g);
  const w = timber(C.wood, 0.5), w2 = timber(0xa97a48, 0.55);
  const sh = rrect(0.86, 1.15, 0.16);
  for (const x of [-0.17, 0.17]) sh.holes.push((() => { const p = new THREE.Path(); const y0 = -0.3, y1 = 0.3; p.absarc(x, y0, 0.05, PI, 0, false); p.lineTo(x + 0.05, y1); p.absarc(x, y1, 0.05, 0, PI, false); p.closePath(); return p; })());
  add(slab(sh, 0.06, 0.018, 0.015, 8, 2), w, [0, 0, 1.0], body);
  rod([0, 0.05, 0.42], [0, 0.22, -0.1], 0.07, w2, body, 12, 0.09);
  const H = grp(body, [0, 0.22, -0.1], null, [0, 0, 0]);
  rod([0, 0, 0], [0, 0.38, -1.5], 0.11, w, H, 14, 0.12);
  add(new THREE.SphereGeometry(0.15, 14, 10), w, [0, 0.4, -1.58], H);
  fitD(body, 3.5);
