  // B: extrude, a different part breakdown. The crust is a band (the outline with the crumb cut out as a hole),
  // the crumb a separate slab set inside it, standing upright, faces +Z.
  const crust = M(0xc88a3e, { r: 0.6 }), toast = M(0xdca55a, { r: 0.7 });
  const slice = (s, dx = 0, dy = 0, hole = false) => { const sh = hole ? new THREE.Path() : new THREE.Shape(); const P = (x, y) => [x * s + dx, y * s + dy];
    sh.moveTo(...P(-0.36, 0)); sh.lineTo(...P(0.36, 0)); sh.lineTo(...P(0.36, 0.5)); sh.bezierCurveTo(...P(0.47, 0.56), ...P(0.47, 0.82), ...P(0.24, 0.85)); sh.bezierCurveTo(...P(0.1, 0.9), ...P(-0.1, 0.9), ...P(-0.24, 0.85)); sh.bezierCurveTo(...P(-0.47, 0.82), ...P(-0.47, 0.56), ...P(-0.36, 0.5)); sh.lineTo(...P(-0.36, 0)); return sh; };
  const T = 0.14, bv = 0.02, outer = slice(0.95, 0, 0.0); outer.holes.push(slice(0.82, 0, 0.06, true));
  const band = new THREE.ExtrudeGeometry(outer, { depth: T - bv * 2, bevelEnabled: true, bevelThickness: bv, bevelSize: bv * 0.6, bevelSegments: 2, curveSegments: 8 });
  band.translate(0, bv, -(T - bv * 2) / 2); add(band, crust);
  const crumb = new THREE.ExtrudeGeometry(slice(0.83, 0, 0.055), { depth: T - 0.03, bevelEnabled: false, curveSegments: 8 });
  crumb.translate(0, bv, -(T - 0.03) / 2); add(crumb, toast);
  for (const sd of [-1, 1]) add(new THREE.SphereGeometry(0.16, 12, 8), M(0xc58f45, { r: 0.75 }), [0.04, 0.42, sd * (T / 2 - 0.012)], g, null, [1.4, 1.1, 0.12]);
