  // PRIMITIVES: saucer = squashed open hemisphere (double-sided), rim torus, stem cylinder, foot = cone + disc; drink = squashed sphere cap + disc; lemon twist = a curled torus arc hanging over the rim
  const body = grp(g);
  const gl = glassDS(0.38);
  add(new THREE.CylinderGeometry(0.55, 0.56, 0.06, 28), gl, [0, 0.03, 0], body);
  add(new THREE.CylinderGeometry(0.08, 0.5, 0.12, 20), gl, [0, 0.12, 0], body);
  add(new THREE.CylinderGeometry(0.065, 0.075, 1.1, 10), gl, [0, 0.72, 0], body);
  const R = 0.88, sy = 0.5;
  add(new THREE.SphereGeometry(R, 32, 10, 0, TAU, PI / 2, PI / 2), gl, [0, 1.76, 0], body, null, [1, sy, 1]);
  add(new THREE.TorusGeometry(R, 0.03, 6, 32), glass(0.5), [0, 1.76, 0], body, [PI / 2, 0, 0]);
  const wl = 0.2, a = PI / 2 + Math.asin(wl / R);
  add(new THREE.SphereGeometry(R - 0.04, 32, 8, 0, TAU, a, PI - a), liquid(0xf3e6a2, 0.75, 0.06), [0, 1.76, 0], body, null, [1, sy, 1]);
  add(new THREE.CircleGeometry(Math.sqrt((R - 0.04) ** 2 - wl * wl), 32), liquid(0xf6ecb4, 0.75, 0.04), [0, 1.76 - wl * sy, 0], body, [-PI / 2, 0, 0]);
  const tw = grp(body, [R - 0.02, 1.7, 0.15], null, [0, 0.3, 0]);
  add(new THREE.TorusGeometry(0.13, 0.04, 6, 14, PI * 1.6), M(0xf2c12e, { r: 0.35 }), [0, 0.05, 0], tw, [0, PI / 2, 0]);
  add(new THREE.TorusGeometry(0.1, 0.035, 6, 12, PI * 1.5), M(0xf2c12e, { r: 0.35 }), [0.05, -0.15, 0], tw, [0, PI / 2, 1]);
  fitAll(body, 1.8);
