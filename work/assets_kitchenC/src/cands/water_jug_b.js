  // PRIMITIVES: belly = scaled sphere (double-sided glass), neck = open cylinder, spout = a half cone wedge, handle = half torus; water = smaller scaled sphere cut flat by a disc; lemons = cylinders
  const body = grp(g);
  const gl = glassDS(0.36);
  add(new THREE.SphereGeometry(1.15, 24, 14, 0, TAU, 0.75, PI - 0.75), gl, [0, 1.1, 0], body, null, [1, 0.95, 1]);
  add(new THREE.CylinderGeometry(0.98, 0.78, 1.0, 24, 1, true), gl, [0, 2.4, 0], body);
  add(new THREE.CylinderGeometry(0.8, 0.8, 0.08, 24), gl, [0, 0.04, 0], body);
  add(new THREE.TorusGeometry(0.98, 0.05, 6, 28), glass(0.5), [0, 2.9, 0], body, [PI / 2, 0, 0]);
  add(new THREE.ConeGeometry(0.32, 0.6, 12, 1, true, -PI / 2, PI), gl, [1.05, 2.82, 0], body, [0, 0, -PI / 2 - 0.25]);
  add(new THREE.TorusGeometry(0.62, 0.12, 8, 18, PI * 1.05), glass(0.5), [-1.05, 1.95, 0], body, [0, 0, PI / 2 + 0.05]);
  const wl = 0.85, R = 1.08;
  add(new THREE.SphereGeometry(R, 24, 10, 0, TAU, Math.acos(wl / R), PI - Math.acos(wl / R)), liquid(0xbfe3ec, 0.45, 0.05), [0, 1.1, 0], body, null, [1, 0.95, 1]);
  add(new THREE.CircleGeometry(Math.sqrt(R * R - wl * wl), 24), liquid(0xcdeaf0, 0.5, 0.05), [0, 1.1 + wl * 0.95, 0], body, [-PI / 2, 0, 0]);
  const lem = M(0xf2d23a, { r: 0.35 }), pith = M(0xfbf1c2, { r: 0.5 });
  for (const [x, y, z, rx] of [[0.3, 1.92, 0.3, 0.3], [-0.3, 1.88, -0.3, -0.2], [0.2, 1.2, -0.3, 1.3]]) {
    add(new THREE.CylinderGeometry(0.4, 0.4, 0.08, 14), lem, [x, y, z], body, [rx, 0, 0.2]);
    add(new THREE.CylinderGeometry(0.3, 0.3, 0.085, 14), pith, [x, y, z], body, [rx, 0, 0.2]);
  }
  fitAll(body, 3.0);
