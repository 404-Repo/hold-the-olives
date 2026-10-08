  // C: a different reading. A squeezed-out squiggle: stacked tori of shrinking radius (a soft-serve coil) ending in a
  // little pointed tip, as it leaves the squeezer.
  const mus = M(0xf2b705, { r: 0.25 });
  const pts = []; for (let i = 0; i <= 60; i++) { const t = i / 60, a = t * TAU * 2.6, r = 0.075 * (1 - t * 0.85); pts.push(V(Math.cos(a) * r, 0.035 + t * 0.15, Math.sin(a) * r)); }
  add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 70, 0.036, 8, false), mus);
  add(new THREE.SphereGeometry(0.075, 14, 8), mus, [0, 0.04, 0], g, null, [1, 0.6, 1]);
  add(new THREE.ConeGeometry(0.03, 0.07, 10), mus, [pts[60].x, 0.215, pts[60].z]);
