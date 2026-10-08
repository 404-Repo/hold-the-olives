  // PROFILES: one plan outline (oval bowl, waisted neck, long paddle handle with a rounded end) extruded as a thick bevelled slab,
  // then the bowl scooped by pushing the top vertices down inside an ellipse
  const body = grp(g);
  const wd = timber(C.wood, 0.6);
  const s = new THREE.Shape(); // shape x = world x, shape y = world -z after slab
  s.moveTo(0, -1.38); s.bezierCurveTo(0.4, -1.38, 0.42, -0.6, 0.12, -0.38); s.lineTo(0.07, -0.1); s.lineTo(0.09, 1.4);
  s.quadraticCurveTo(0.09, 1.5, 0, 1.5); s.quadraticCurveTo(-0.09, 1.5, -0.09, 1.4); s.lineTo(-0.07, -0.1); s.lineTo(-0.12, -0.38); s.bezierCurveTo(-0.42, -0.6, -0.4, -1.38, 0, -1.38);
  const geo = slab(s, 0.16, 0.04, 0.03, 10, 2);
  // the slab maps shape y to world -z, so the bowl (shape y < -0.38) sits at world +z
  deform(geo, (v) => { const dz = (v.z - 0.95) / 0.38, dx = v.x / 0.28, e = dx * dx + dz * dz; if (v.y > 0.1 && e < 1) v.y -= 0.1 * (1 - e); });
  add(geo, wd, [0, 0, 0], body);
  // the handle end curls up a touch, the bowl tip lifts: one gentle lift
  body.rotation.x = 0.0;
  fitWHD(body, 0.72, 0.2, 3.0);
