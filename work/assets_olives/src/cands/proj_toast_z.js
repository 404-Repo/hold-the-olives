  // A: extrude. The classic slice outline extruded and bevelled (bevel subtracted) in crust colour, with an inset
  // toasted face on front and back; stands upright as the toaster pops it, faces +Z.
  const crust = M(0xc88a3e, { r: 0.6 }), toast = M(0xdca55a, { r: 0.7 }), dark = M(0xb9772f, { r: 0.7 });
  const slice = (s) => { const sh = new THREE.Shape(); sh.moveTo(-0.36 * s, 0); sh.lineTo(0.36 * s, 0); sh.lineTo(0.36 * s, 0.5 * s); sh.bezierCurveTo(0.47 * s, 0.56 * s, 0.47 * s, 0.82 * s, 0.24 * s, 0.85 * s); sh.bezierCurveTo(0.1 * s, 0.9 * s, -0.1 * s, 0.9 * s, -0.24 * s, 0.85 * s); sh.bezierCurveTo(-0.47 * s, 0.82 * s, -0.47 * s, 0.56 * s, -0.36 * s, 0.5 * s); sh.lineTo(-0.36 * s, 0); return sh; };
  const T = 0.14, bv = 0.03;
  const geo = new THREE.ExtrudeGeometry(slice(0.93), { depth: T - bv * 2, bevelEnabled: true, bevelThickness: bv, bevelSize: bv, bevelSegments: 3, curveSegments: 8 });
  geo.translate(0, bv, -(T - bv * 2) / 2); add(geo, crust);
  for (const sd of [-1, 1]) {
    const f = new THREE.ShapeGeometry(slice(0.8), 8); f.translate(0, 0.075, 0);
    add(f, toast, [0, 0, sd * (T / 2 + 0.002)], g, [0, sd > 0 ? 0 : PI, 0]);
    for (let i = 0; i < 7; i++) add(new THREE.CircleGeometry(0.035 + (i % 3) * 0.012, 8), dark, [((i * 37) % 9 - 4) * 0.06, 0.2 + ((i * 53) % 7) * 0.08, sd * (T / 2 + 0.004)], g, [0, sd > 0 ? 0 : PI, 0], [1.4, 1, 1]);
  }
