  // PROFILES: round whisky bottle as a thick-wall glass lathe (shoulder, neck, lip), amber liquid lathe fill to the shoulder, a wide coloured band (open lathe ring, slightly proud), a wooden cork with a cap disc
  const body = grp(g);
  const W = [[1.0, 0], [1.08, 0.06], [1.12, 0.2], [1.12, 2.3], [1.0, 2.7], [0.5, 3.1], [0.32, 3.3], [0.3, 3.75], [0.36, 3.82]];
  add(vessel(W, 0.07, 0.15, 28), glass(0.35), [0, 0, 0], body);
  add(fill(W, 0.07, 0.15, 2.75, 28, 8), M(0xd8700e, { r: 0.1 }), [0, 0, 0], body);
  add(lathe([[1.14, 0.8], [1.16, 0.82], [1.16, 1.78], [1.14, 1.8]], 28), M(0xb4432c, { r: 0.5 }), [0, 0, 0], body);
  add(lathe([[0, 3.6], [0.27, 3.6], [0.29, 4.0], [0.36, 4.05], [0.38, 4.2], [0.33, 4.4], [0, 4.4]], 16), M(0xc89a62, { r: 0.85 }), [0, 0, 0], body);
  fitAll(body, 4.4);
