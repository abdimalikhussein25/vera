# VERA Nutrition — Landing Page

Static one-page site (`index.html` + `/assets`). No build step required.

## 1. Push to your GitHub repo

```bash
cd path/to/extracted/vera-site
git init
git remote add origin https://github.com/abdimalikhussein25/vera.git
git add .
git commit -m "Add VERA Nutrition landing page"
git branch -M main
git push -u origin main
```

If the remote already has commits (unlikely, the repo is currently empty), use
`git pull origin main --allow-unrelated-histories` first.

## 2. Deploy to Vercel

**Option A — one click (after pushing to GitHub):**
Go to:
`https://vercel.com/new/clone?repository-url=https://github.com/abdimalikhussein25/vera`
Vercel will detect it as a static site automatically — no framework, no build command needed.

**Option B — Vercel dashboard:**
1. vercel.com → **Add New → Project**
2. Import `abdimalikhussein25/vera`
3. Framework preset: **Other** (static)
4. Deploy

**Option C — Vercel CLI:**
```bash
npm i -g vercel
cd path/to/extracted/vera-site
vercel --prod
```

## Notes
- All product photography and the logo are the real VERA/HalaVit assets, resized and compressed for web.
- Fonts: Bodoni Moda (display), Manrope (body/UI), IBM Plex Mono (spec/data labels) — loaded from Google Fonts.
- The waitlist form is front-end only (no backend yet) — it shows a confirmation message but does not send data anywhere.
