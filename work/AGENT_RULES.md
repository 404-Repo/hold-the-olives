# Rules for every sub-agent on HOLD THE OLIVES (~/astrocade-game6)

- You are a sub-agent. Do NOT spawn sub-agents of your own (no Agent/Task tool), do not run `claude -p`,
  do not message anyone (no Telegram/Discord tools), do not create GitHub repos, do not push.
- Touch only the paths your brief names. Never edit other repos (~/404-game-recipe is read-only for you;
  run its tools from there). Your scratch directory is yours alone; nobody else writes there.
- Never pass `--use-angle=swiftshader` to any browser you launch yourself. For puppeteer, import it from
  `/Users/atlas/404-game-recipe/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js` or via
  `createRequire('/Users/atlas/404-game-recipe/package.json')('puppeteer')`, launch with
  `headless: 'new', args: ['--use-angle=metal','--enable-gpu','--no-sandbox']`, and close every browser
  you open (kill orphaned Chrome you started before finishing).
- Do not run `node harness/jam.mjs` (the lead runs it, one at a time).
- Do not git commit; the lead commits. Write a short NOTES.md in your scratch dir with what you did,
  what failed and what is unverified, and end with a concise report.
- No text, glyphs, labels or logos in any generated image or asset.
- Atlas image calls: `python3 ~/astrocade-game6/tools/atlas_img.py fast|std <out.png> <label> "<prompt>"`
  (fast = 46 credits, 16:9 1K; std = 77 credits, 16:9 2K). Every call is logged; keep to your budget.
