# VERA Nutrition — Landing Page + Waitlist Admin

Static site (`index.html`, `admin.html`, `/assets`) with one small serverless function
(`/api/waitlist.js`) for storing and reading waitlist signups. Deployed on Vercel from
`github.com/abdimalikhussein25/vera`.

## One-time setup: connect storage (~2 minutes)

The waitlist form and the admin dashboard both talk to `/api/waitlist`. That function needs a
database to write to (Vercel KV — free, built into Vercel, no external account) and a password
for the admin login.

1. Open your project at [vercel.com/dashboard](https://vercel.com/dashboard).
2. Go to the **Storage** tab → **Create Database** → choose **KV**.
3. Click **Connect Project** and select this project. Vercel automatically adds the required
   environment variables (`KV_REST_API_URL`, `KV_REST_API_TOKEN`, etc.) — nothing to copy by hand.
4. Go to **Settings → Environment Variables** and add one more:
   - Key: `ADMIN_KEY`
   - Value: a password only you know
5. Go to **Deployments**, open the latest one, and click **Redeploy** (or just push any small
   change to GitHub) so the new environment variables take effect.

That's it. From then on:
- Every waitlist signup on the site is stored automatically.
- `yoursite.com/admin.html` — sign in with **username:** `admin` and **password:** whatever you
  set as `ADMIN_KEY` — shows total signups, signups today/this week, a searchable + sortable
  table, and CSV export.

You can change the admin username in `admin.html` (`ADMIN_USERNAME` near the top of the script),
and change the password any time by updating `ADMIN_KEY` in Vercel and redeploying.

## Deploying updates

```bash
git add .
git commit -m "your change"
git push
```

Vercel auto-deploys on every push to `main`.
