  // DIFFERENT READING: an open étagère: two side panels extruded from an arched outline (round-topped with a cut-out handhold), a scalloped crown board, shelves on brass brackets, a mirrored back (pale glossy panel) that glows warm; same bottles and glasses. Mounts on a wall.
  const body = grp(g);
  const wn = timber(C.walnut, 0.55), wn2 = timber(0x5a3c28, 0.6), br = brass();

  // shelf contents: three bottle silhouettes (lathe, opaque tinted glass) with colour bands and corks/caps, tumblers and wine glasses (transparent with a little liquid)
  const tints = [M(0xa04c0c, { r: 0.12 }), M(0x2f6b34, { r: 0.12 }), M(0x7a2a1e, { r: 0.12 }), M(0xc9a44a, { r: 0.12 }), M(0x9cc0c4, { r: 0.1, t: 0.6 })];
  const bands = [M(C.red, { r: 0.5 }), M(0x3a7fe2, { r: 0.5 }), M(0xf2c12e, { r: 0.5 }), M(0x6cc23a, { r: 0.5 }), M(0xf2ead8, { r: 0.5 })];
  const corkM = M(0xc89a62, { r: 0.85 }), capM = M(0x2a2a2a, { r: 0.4 });
  const BP = [
    [[0, 0], [0.42, 0], [0.45, 0.06], [0.45, 2.0], [0.3, 2.45], [0.15, 2.65], [0.14, 3.2], [0, 3.2]],
    [[0, 0], [0.5, 0], [0.52, 0.06], [0.52, 1.5], [0.4, 1.75], [0.16, 1.95], [0.14, 2.7], [0, 2.7]],
    [[0, 0], [0.38, 0], [0.4, 0.05], [0.4, 2.4], [0.2, 2.9], [0.13, 3.5], [0, 3.5]],
  ].map((p) => lathe(p, 12));
  const BH = [3.2, 2.7, 3.5], BR = [0.45, 0.52, 0.4], BY = [[0.6, 1.4], [0.5, 1.1], [0.8, 1.6]];
  const bandG = BP.map((_, k) => new THREE.CylinderGeometry(BR[k] + 0.03, BR[k] + 0.03, BY[k][1] - BY[k][0], 12, 1, true));
  const corkG = new THREE.CylinderGeometry(0.15, 0.13, 0.35, 8), tumG = vessel([[0.36, 0], [0.4, 0.05], [0.42, 1.0]], 0.05, 0.18, 14), tumL = fill([[0.36, 0], [0.4, 0.05], [0.42, 1.0]], 0.05, 0.18, 0.5, 14, 2);
  const wgW = [[0.3, 0], [0.31, 0.04], [0.06, 0.1], [0.05, 0.75], [0.28, 0.95], [0.34, 1.25], [0.28, 1.6]], wgG = vessel(wgW, 0.04, 0.82, 14);
  let seed = 7; const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  function bottle(parent, x, y, z, k, t, b) { const o = grp(parent, [x, y, z]); add(BP[k], tints[t], [0, 0, 0], o); add(bandG[k], bands[b], [0, (BY[k][0] + BY[k][1]) / 2, 0], o); add(corkG, b % 2 ? capM : corkM, [0, BH[k] + 0.1, 0], o); }
  function tumbler(parent, x, y, z) { add(tumG, glass(0.4), [x, y, z], parent); add(tumL, M(0xa04c0c, { r: 0.1 }), [x, y, z], parent); }
  function wineglass(parent, x, y, z) { add(wgG, glass(0.4), [x, y, z], parent); }
  function fillShelf(parent, y, x0, x1, z, pattern) { let x = x0; for (const c of pattern) { if (c === "b") { const k = Math.floor(rnd() * 3); x += BR[k] + 0.12; bottle(parent, x, y, z + (rnd() - 0.5) * 0.5, k, Math.floor(rnd() * 5), Math.floor(rnd() * 5)); x += BR[k] + 0.12; } else if (c === "t") { x += 0.55; tumbler(parent, x, y, z + 0.3); x += 0.55; } else if (c === "w") { x += 0.45; wineglass(parent, x, y, z + 0.2); x += 0.45; } else x += 0.5; if (x > x1) break; } }

  const W = 12, H = 16, D = 3;
  const sp = new THREE.Shape(); sp.moveTo(-D / 2, 0); sp.lineTo(D / 2, 0); sp.lineTo(D / 2, H - 2.2); sp.quadraticCurveTo(D / 2, H - 0.6, 0, H - 0.4); sp.quadraticCurveTo(-D / 2, H - 0.6, -D / 2, H - 2.2); sp.closePath();
  const hh = new THREE.Path(); hh.absellipse(0, H - 2.0, 0.45, 0.6, 0, TAU, true); sp.holes.push(hh);
  for (const s of [-1, 1]) add(sideSlab(sp, 0.45, 0.08, 0.08, 6), wn, [s * (W / 2 - 0.3), 0, 0], body);
  // raised fielded panels on the outer side faces, two per side, with a brass escutcheon-style roundel between
  for (const s of [-1, 1]) { const x = s * (W / 2 - 0.3 + 0.225 + 0.05);
    for (const [y0, h] of [[1.2, 5.6], [7.4, 5.2]]) { add(rbox(0.1, h, D - 0.9, 0.04), wn2, [x, y0, 0], body); add(rbox(0.14, h - 0.7, D - 1.6, 0.05), wn, [x + s * 0.02, y0 + 0.35, 0], body); }
    add(new THREE.CylinderGeometry(0.22, 0.22, 0.08, 14), br, [x + s * 0.06, 7.0, 0], body, [0, 0, PI / 2]); }
  add(new THREE.BoxGeometry(W - 0.8, H - 1.6, 0.15), M(0xd9cbb0, { r: 0.08, m: 0.4, e: 0xffb060, ei: 0.08 }), [0, (H - 1.6) / 2, -D / 2 + 0.15], body);
  const cr = new THREE.Shape(); cr.moveTo(-(W - 0.6) / 2, 0); cr.lineTo((W - 0.6) / 2, 0); cr.lineTo((W - 0.6) / 2, 0.8);
  for (let i = 0; i < 9; i++) { const x0 = (W - 0.6) / 2 - i * (W - 0.6) / 9, x1 = x0 - (W - 0.6) / 9; cr.quadraticCurveTo((x0 + x1) / 2, 1.5 + (i === 4 ? 0.6 : 0), x1, 0.8); }
  cr.closePath();
  const cg = new THREE.ExtrudeGeometry(cr, { depth: 0.25, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 2, curveSegments: 4 }); cg.translate(0, 0, -0.12);
  add(cg, wn, [0, H - 2.3, -D / 2 + 0.4], body);
  const sy = [0.8, 5.6, 10.4];
  add(rbox(W - 0.6, 0.8, D, 0.1), wn, [0, 0, 0], body);
  for (const y of sy.slice(1)) { add(rbox(W - 0.6, 0.35, D - 0.3, 0.08), wn, [0, y - 0.35, 0.05], body); for (const x of [-3.5, 3.5]) add(new THREE.BoxGeometry(0.15, 0.6, 0.6), br, [x, y - 0.65, -D / 2 + 0.55], body); }
  for (const y of sy) rod([-5.4, y + 0.6, D / 2 - 0.25], [5.4, y + 0.6, D / 2 - 0.25], 0.06, br, body, 6);
  fillShelf(body, sy[0], -5.3, 5.2, -0.2, "bbbwtbbbb");
  fillShelf(body, sy[1], -5.3, 5.2, -0.2, "wtbwbtbw");
  fillShelf(body, sy[2], -5.3, 5.2, -0.2, "bbbbbbbbb");
  g.userData.mounts = "back";
  fitWHD(body, W, H, D);
