  // DIFFERENT READING: chunky toy tulip glass, low-segment faceted (10 sides) bowl, a fat knop on a short stem, wine filled higher, a thick rolled rim bead
  const body = grp(g);
  const W = [[0.66, 0], [0.68, 0.08], [0.6, 0.16], [0.16, 0.22], [0.11, 0.36], [0.2, 0.5], [0.11, 0.64], [0.12, 0.78], [0.3, 0.9], [0.56, 1.1], [0.66, 1.4], [0.6, 1.75], [0.5, 2.1]];
  add(vessel(W, 0.07, 0.96, 10), glass(0.42), [0, 0, 0], body);
  add(fill(W, 0.07, 0.96, 1.42, 10), liquid(0x7a1426, 0.92, 0.1), [0, 0, 0], body);
  add(new THREE.TorusGeometry(0.47, 0.045, 6, 20), glass(0.5), [0, 2.12, 0], body, [PI / 2, 0, 0]);
  fitAll(body, 2.2);
