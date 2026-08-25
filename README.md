# VERA Nutrition — Landing Page + Waitlist Admin

Static site (`index.html`, `admin.html`, `/assets`). No build step. Deployed on Vercel from
`github.com/abdimalikhussein25/vera`.

## Waitlist backend setup (one-time, ~5 minutes)

The waitlist form and the admin dashboard need a place to store signups. This project uses a
free Google Sheet + Google Apps Script as the backend — no database or paid service required.

1. Go to [sheets.google.com](https://sheets.google.com) and create a new blank spreadsheet.
   Name it something like **"VERA Waitlist"**.
2. In the sheet, go to **Extensions → Apps Script**.
3. Delete any starter code, and paste in the full contents of
   [`apps-script/Code.gs`](apps-script/Code.gs) from this repo.
4. In that code, change this line to a secret only you know:
   ```js
   const ADMIN_KEY = 'CHANGE-THIS-TO-YOUR-OWN-SECRET';
   ```
5. Click **Deploy → New deployment**.
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**, then authorize the permissions it asks for.
6. Copy the **Web app URL** (it ends in `/exec`).
7. Open both `index.html` and `admin.html` in this project, find the line:
   ```js
   const WAITLIST_ENDPOINT = "PASTE_YOUR_APPS_SCRIPT_URL_HERE";
   ```
   and replace the placeholder with your Web app URL in **both files**.
8. Commit and push. Vercel will redeploy automatically.

That's it — every waitlist signup now becomes a row in your Google Sheet (with timestamp, name,
email, phone), and `yoursite.com/admin.html` gives you a branded dashboard on top of it: total
signups, signups today/this week, search, sortable columns, and CSV export.

The admin key from step 4 is what you'll type into `admin.html` to unlock the dashboard —
keep it private, and change it any time by editing the Apps Script and redeploying.

## Deploying updates

```bash
git add .
git commit -m "your change"
git push
```

Vercel auto-deploys on every push to `main`.
