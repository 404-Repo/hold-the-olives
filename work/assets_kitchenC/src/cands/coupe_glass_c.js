  // DIFFERENT READING: art-deco faceted coupe (8 sides), trumpet bowl, a fat knop in the stem, a stepped foot; twist = a flat peel strip swept along a spiral (Extrude with extrudePath)
  const body = grp(g);
  const W = [[0.58, 0], [0.6, 0.08], [0.46, 0.12], [0.44, 0.18], [0.12, 0.24], [0.08, 0.5], [0.17, 0.62], [0.08, 0.74], [0.07, 1.12], [0.2, 1.24], [0.62, 1.42], [0.86, 1.64], [0.9, 1.76]];
  add(vessel(W, 0.06, 1.26, 8), glass(0.42), [0, 0, 0], body);
  add(fill(W, 0.06, 1.26, 1.58, 8), liquid(0xf3e6a2, 0.78, 0.06), [0, 0, 0], body);
  const pts = []; for (let i = 0; i <= 20; i++) { const t = i / 20, a = t * TAU * 1.7; pts.push(V(0.8 + 0.09 * Math.cos(a), 1.98 - 0.6 * t, 0.09 * Math.sin(a))); }
  const strip = new THREE.Shape(); strip.moveTo(-0.012, -0.05); strip.lineTo(0.012, -0.05); strip.lineTo(0.012, 0.05); strip.lineTo(-0.012, 0.05); strip.closePath();
  add(new THREE.ExtrudeGeometry(strip, { steps: 40, bevelEnabled: false, extrudePath: new THREE.CatmullRomCurve3(pts) }), M(0xf2c12e, { r: 0.35, ds: true }), [0, 0, 0], body);
  fitAll(body, 1.8);
