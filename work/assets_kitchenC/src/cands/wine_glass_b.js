  // PRIMITIVES: foot = squashed cylinder + sphere cap, stem = cylinder with a knop sphere, bowl = open sphere segment (double-sided), wine = sphere bottom cap + flat top disc
  const body = grp(g);
  const gl = glassDS(0.38);
  add(new THREE.CylinderGeometry(0.58, 0.62, 0.07, 28), gl, [0, 0.035, 0], body);
  add(new THREE.CylinderGeometry(0.1, 0.48, 0.14, 24), gl, [0, 0.14, 0], body);
  add(new THREE.CylinderGeometry(0.075, 0.09, 0.78, 10), gl, [0, 0.6, 0], body);
  add(new THREE.SphereGeometry(0.12, 12, 8), gl, [0, 0.62, 0], body, null, [1, 0.6, 1]);
  const R = 0.62, cy = 1.5;
  add(new THREE.SphereGeometry(R, 28, 14, 0, TAU, 0.5, PI - 0.5), gl, [0, cy, 0], body);
  add(new THREE.TorusGeometry(R * Math.sin(0.5), 0.025, 6, 28), glass(0.5), [0, cy + R * Math.cos(0.5), 0], body, [PI / 2, 0, 0]);
  const wl = -0.22, a = Math.acos(wl / R);
  add(new THREE.SphereGeometry(R - 0.035, 28, 8, 0, TAU, a, PI - a - 0.02), liquid(0x7a1426, 0.9, 0.12), [0, cy, 0], body);
  add(new THREE.CircleGeometry(Math.sqrt((R - 0.035) ** 2 - wl * wl), 28), liquid(0x8e1a2e, 0.9, 0.05), [0, cy + wl, 0], body, [-PI / 2, 0, 0]);
  add(new THREE.CylinderGeometry(0.09, 0.1, 0.2, 10), gl, [0, 0.98, 0], body);
  fitAll(body, 2.2);
