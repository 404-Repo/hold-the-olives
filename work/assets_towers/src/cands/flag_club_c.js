  // DIFFERENT READING: curly cellophane ribbons: helix tubes springing up and out of the top like a firework, with a cuff
  const body = grp(g);
  const pick = M(C.pick, { r: 0.55 }), fr = M(C.frill, { r: 0.1 });
  add(new THREE.CylinderGeometry(0.022, 0.022, 0.66, 8), pick, [0, 0.38, 0], body);
  add(new THREE.ConeGeometry(0.022, 0.06, 8), pick, [0, 0.02, 0], body, [PI, 0, 0]);
  add(new THREE.CylinderGeometry(0.04, 0.03, 0.08, 10), fr, [0, 0.7, 0], body);
  for (let i = 0; i < 9; i++) {
    const a = i / 9 * TAU, pts = [];
    for (let k = 0; k <= 14; k++) { const t = k / 14, R = 0.02 + 0.13 * t, h = 0.72 + 0.2 * Math.sin(PI * 0.75 * t) - 0.05 * t, c = 0.025 * t;
      pts.push([Math.cos(a) * R + c * Math.cos(t * 18), h + c * Math.sin(t * 18), Math.sin(a) * R + c * Math.sin(t * 18)]); }
    tube(pts, 0.01, fr, body, 22, 4);
  }
  fitAll(body, 0.9);
