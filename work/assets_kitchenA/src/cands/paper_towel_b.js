  // b: lathe base with a chamfered edge and boss, lathe roll with soft rounded ends and quilted rings,
  // and a draped sheet built as a bent plane following the roll then falling toward the counter.
  const wood = M(C.block, 0.55, 0, 'timber'), paper = M(0xfbfaf4, 0.85, 0, 'fabric'), core = M(0xb8956a, 0.8), paperD = M(0xfbfaf4, 0.85, 0, 'fabric', { side: DS });
  add(sLathe([[0, 0], [0.82, 0], [0.86, 0.06], [0.8, 0.16], [0.25, 0.18], [0.14, 0.26], [0, 0.26]], 22, 2), wood);
  add(lathe([[0, 0.2], [0.08, 0.2], [0.08, 2.62], [0.14, 2.64], [0.16, 2.72], [0.12, 2.8], [0, 2.8]], 10), wood);
  const rp = [[0.2, 0.2]]; for (let i = 0; i <= 8; i++) { const y = 0.22 + i * 2.25 / 8; rp.push([0.6, y - 0.04], [0.62, y]); }
  rp.splice(1, 0, [0.58, 0.2]); rp.push([0.58, 2.49], [0.2, 2.49]);
  add(lathe(rp, 22), paper);
  add(cyl(0.2, 0.2, 2.31, 14, true), M(0xb8956a, 0.8, 0, undefined, { side: DS }), 0, 1.35, 0);
  // drape: plane whose columns wrap the roll's front then fall away
  const W = 2.1, geo = new THREE.PlaneGeometry(1, W, 8, 1), p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) { const u = p.getX(i) + 0.5, y = p.getY(i);
    let x, z; if (u < 0.45) { const a = -0.2 + u / 0.45 * 1.0; x = Math.sin(a) * 0.64; z = Math.cos(a) * 0.64; }
    else { const t = (u - 0.45) / 0.55; const a = 0.8; x = Math.sin(a) * 0.64 + t * 0.55; z = Math.cos(a) * 0.64 + t * 0.25; }
    const droop = u > 0.45 ? -((u - 0.45) / 0.55) * 0.35 * (1 - (y + W / 2) / W) : 0;
    p.setXYZ(i, x, y + 1.36 + droop, z); }
  geo.computeVertexNormals(); add(geo, paperD);
  finish(HEIGHT);
