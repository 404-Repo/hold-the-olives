  // DIFFERENT READING: a hammered faceted (10 side) bucket with a double band and two extruded tab handles with grip holes; ice = chunky low-poly icosahedrons; tongs = an extruded U-shaped strip leaning out
  const body = grp(g);
  const st = metal(C.steel, 0.25), dk = metal(0x9aa3ab, 0.3);
  add(vessel([[0.85, 0], [0.9, 0.06], [1.08, 1.75], [1.12, 1.82]], 0.07, 0.15, 10), st, [0, 0, 0], body);
  for (const y of [0.4, 1.45]) add(lathe([[0.9 + y * 0.1, y - 0.05], [0.96 + y * 0.1, y - 0.04], [0.96 + y * 0.1, y + 0.04], [0.9 + y * 0.1, y + 0.05]], 10), dk, [0, 0, 0], body);
  const tab = new THREE.Shape(); rrect(0.5, 0.36, 0.12, tab); const hole = new THREE.Path(); hole.absellipse(0, 0, 0.14, 0.07, 0, TAU, true); tab.holes.push(hole);
  for (const s of [-1, 1]) add(new THREE.ExtrudeGeometry(tab, { depth: 0.06, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 2, curveSegments: 6 }), st, [s * 1.18, 1.6, 0], body, [PI / 2, 0, 0]);
  const ice = M(0xe6f6fa, { r: 0.08, t: 0.7 }), ig = new THREE.IcosahedronGeometry(0.26, 0);
  for (let i = 0; i < 16; i++) { const a = i * 2.39996, k = Math.sqrt((i + 0.5) / 16); add(ig, ice, [Math.cos(a) * 0.75 * k, 1.55 + 0.3 * (1 - k * k), Math.sin(a) * 0.75 * k], body, [i, i * 2, 0]); }
  const u = new THREE.Shape(); u.moveTo(-0.2, 1.6); u.lineTo(-0.12, 0.15); u.quadraticCurveTo(0, -0.05, 0.12, 0.15); u.lineTo(0.2, 1.6); u.lineTo(0.13, 1.6); u.lineTo(0.06, 0.18); u.quadraticCurveTo(0, 0.08, -0.06, 0.18); u.lineTo(-0.13, 1.6); u.closePath();
  add(new THREE.ExtrudeGeometry(u, { depth: 0.08, bevelEnabled: false, curveSegments: 6 }), st, [0.5, 1.4, 0.2], body, [0, 0.6, -0.7]);
  fitAll(body, 2.6);
