  // EXTRUDE: like the reference: one rounded-rectangle walnut frame extruded from an outline with a rounded hole (a deep picture-frame box), a recessed back panel, shelves as rounded slabs, a brass gallery rail (rods on posts) across each shelf front; same bottles and glasses. Mounts on a wall.
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
  const fr = new THREE.Shape(); rrect(W - 0.4, H - 0.4, 1.0, fr); fr.holes.push(rrectPath(W - 1.6, H - 1.6, 0.6));
  const fg = new THREE.ExtrudeGeometry(fr, { depth: D - 0.4, bevelEnabled: true, bevelThickness: 0.2, bevelSize: 0.2, bevelSegments: 3, curveSegments: 8 }); fg.translate(0, H / 2, -(D - 0.4) / 2);
  add(fg, wn, [0, 0, 0], body);
  add(new THREE.BoxGeometry(W - 1.4, H - 1.4, 0.2), wn2, [0, H / 2, -D / 2 + 0.25], body);
  const sy = [0.8, 5.6, 10.4];
  for (const y of sy.slice(1)) add(rbox(W - 1.5, 0.35, D - 0.4, 0.08), wn, [0, y - 0.35, 0.1], body);
  for (const y of sy) { rod([-5.2, y + 0.75, D / 2 - 0.35], [5.2, y + 0.75, D / 2 - 0.35], 0.06, br, body, 6); for (const x of [-5.2, -1.7, 1.7, 5.2]) rod([x, y, D / 2 - 0.35], [x, y + 0.8, D / 2 - 0.35], 0.05, br, body, 6); }
  fillShelf(body, sy[0], -5.2, 5.1, -0.3, "bbtbbwbbb");
  fillShelf(body, sy[1], -5.2, 5.1, -0.3, "twbtwbbw");
  fillShelf(body, sy[2], -5.2, 5.1, -0.3, "bbbbbbbbb");
  g.userData.mounts = "back";
  fitWHD(body, W, H, D);
