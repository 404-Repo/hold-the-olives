  // c: different reading: rounder retro drip machine. Cylindrical glass water tank at the back with water inside,
  // a half-drum hood on top, a round red plinth, carafe as a faceted jug.
  const red = M(C.red, 0.3), steel = M(C.steel, 0.35, 0.55, 'metal'), dark = M(0x2a2624, 0.6), coffee = M(0x4a2a18, 0.15);
  const glass = M(0xd8eef0, 0.05, 0, undefined, { transparent: true, opacity: 0.4, depthWrite: false, side: DS });
  add(rbox(2.2, 0.4, 2.4, 0.18, 3), red, 0, 0.2, 0);
  add(rbox(1.9, 2.3, 0.7, 0.3, 3), red, 0, 1.5, -0.8);
  add(cyl(0.55, 0.55, 1.4, 20, true), glass, 0, 1.4, -0.75);         // water tank peeking through
  add(cyl(0.5, 0.5, 0.9, 20), M(0x9fd6e8, 0.05, 0, undefined, { transparent: true, opacity: 0.55 }), 0, 1.15, -0.75);
  const hood = add(new THREE.CylinderGeometry(1.1, 1.1, 2.1, 20, 1, false, 0, Math.PI), red, 0, 2.7, 0.0, 0, 0, Math.PI / 2);
  hood.rotation.set(0, 0, Math.PI / 2); hood.geometry.rotateY(Math.PI / 2);
  add(rbox(2.1, 0.12, 2.25, 0.06), steel, 0, 2.66, 0);
  add(cyl(0.4, 0.15, 0.4, 16), steel, 0, 2.38, 0.4);
  add(cyl(0.6, 0.6, 0.05, 20), steel, 0, 0.42, 0.42);
  add(cyl(0.48, 0.56, 1.0, 8, true), glass, 0, 0.95, 0.42);
  add(cyl(0.5, 0.54, 0.5, 8), coffee, 0, 0.7, 0.42).scale.set(0.96, 1, 0.96);
  add(cyl(0.5, 0.5, 0.12, 8), dark, 0, 1.5, 0.42);
  add(rbox(0.16, 0.8, 0.3, 0.07), dark, 0.75, 0.98, 0.42);
  finish(HEIGHT);
