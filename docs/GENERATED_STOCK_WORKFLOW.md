# Generated stock workflow

`app/lib/flowers.json` and `app/lib/items.json` are tracked fallback snapshots. The authoritative production refresh remains the GDC01 Apps Script feed built from SET B and the latest ONHAND email extraction.

To keep normal developer and SEO worktrees clean, `npm run build` does not overwrite those tracked snapshots locally, even when `APPS_SCRIPT_URL` is present. Vercel production builds set `VERCEL=1`, so the existing prebuild refresh still runs automatically in the ephemeral deployment workspace.

An isolated inventory-maintenance worktree may deliberately opt in by setting `GDC_ALLOW_TRACKED_STOCK_WRITE=1` before running the prebuild or build. Any resulting product, price, or availability diff must be reviewed as authoritative inventory work and must not be mixed into an SEO repair.

Run `npm run test:seo-stabilization` to verify that local safe mode leaves both tracked stock snapshots byte-for-byte unchanged.
