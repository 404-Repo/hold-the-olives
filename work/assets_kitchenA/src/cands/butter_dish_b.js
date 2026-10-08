  // b: extrude. Plate from a rounded-rect outline with a lip; lid from an arched side profile extruded long-ways;
  // butter block extruded from a profile that already has the knife scoop cut into its end.
  const cream = M(C.cream, 0.4), butter = M(0xf6dc6a, 0.35), curl = M(0xf9e68e, 0.3);
  add(ext(rrect(1.7, 1.05, 0.25), 0.1, 0.03), cream, 0, 0.05, 0, Math.PI / 2);
  add(ext(rrect(1.45, 0.82, 0.2), 0.04, 0.01), M(0xeae0c8, 0.4), 0, 0.11, 0, Math.PI / 2);
  // butter section in (x,y): block with a scooped curve at the -x top corner
  const sec = [[-0.45, 0], [0.45, 0], [0.45, 0.36], [-0.12, 0.36]];
  for (let i = 0; i <= 6; i++) { const a = Math.PI / 2 + i / 6 * Math.PI / 2; sec.push([-0.45 + 0.33 + Math.cos(a) * 0.33, 0.36 - 0.33 + Math.sin(a) * 0.33 * 0.8 - 0.0]); }
  add(ext(sec, 0.5, 0.04), butter, 0.1, 0.13, 0);
  add(new THREE.TorusGeometry(0.07, 0.04, 6, 10, Math.PI * 1.5), curl, -0.25, 0.26, 0.1, 0, 0.3, 0);
  // lid: arch profile (x,y) extruded along z, set beside the plate
  const lid = []; for (let i = 0; i <= 10; i++) { const a = Math.PI * i / 10; lid.push([Math.cos(a) * 0.62, Math.pow(Math.sin(a), 0.6) * 0.55]); }
  add(ext(lid, 0.8, 0.08), cream, 0.25, 0, -1.05, 0, 0.15, 0);
  finish(HEIGHT);
