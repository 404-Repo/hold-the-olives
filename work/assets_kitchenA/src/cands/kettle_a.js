  // a: primitives. Hemisphere-dome body on a short wall, lid disc + cream knob, cone spout, cream torus-arc handle.
  const red = M(C.red, 0.3), cream = M(C.cream, 0.45), steel = M(C.steel, 0.3, 0.55, 'metal');
  add(cyl(1.0, 1.02, 0.35, 24), red, 0, 0.2, 0);
  add(new THREE.SphereGeometry(1.0, 24, 10, 0, Math.PI * 2, 0, Math.PI / 2), red, 0, 0.37, 0).scale.set(1, 0.95, 1);
  add(new THREE.TorusGeometry(1.0, 0.04, 6, 24), steel, 0, 0.04, 0, Math.PI / 2);
  add(cyl(0.48, 0.52, 0.14, 20), red, 0, 1.3, 0);
  add(new THREE.TorusGeometry(0.5, 0.025, 6, 24), steel, 0, 1.25, 0, Math.PI / 2);
  add(sph(0.13, 12, 8), cream, 0, 1.45, 0).scale.set(1, 0.8, 1);
  add(cyl(0.06, 0.07, 0.08, 10), cream, 0, 1.38, 0);
  const sp = add(cyl(0.08, 0.2, 0.85, 12, true), red, 0, 0.75, 1.05, 0.95, 0, 0); sp.material = M(C.red, 0.3, 0, undefined, { side: DS });
  // handle: arc in the y-z plane from front shoulder to back shoulder
  add(new THREE.TorusGeometry(0.68, 0.09, 8, 20, Math.PI), cream, 0, 1.38, 0, 0, Math.PI / 2, 0);
  for (const z of [-0.68, 0.68]) add(cyl(0.035, 0.035, 0.32, 8), steel, 0, 1.24, z * 0.92, z > 0 ? 0.35 : -0.35);
  finish(HEIGHT);
