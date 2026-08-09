# Lead capture setup — 5 minutes, one time

Every form on zeradental.in (contact form, service-page forms, city-page forms, and the free website
audit) posts into a single Google Sheet. Here is how to switch it on.

## 1. Create the sheet

1. Go to <https://sheets.new>
2. Name it **Zera Dental Leads**

## 2. Add the script

1. In that sheet: **Extensions → Apps Script**
2. Delete whatever is in `Code.gs`
3. Paste the entire contents of `google-apps-script/Code.gs` from this repo
4. *(Optional)* set `NOTIFY_EMAIL = 'ubsatishsingh@gmail.com';` near the top if you want an email
   alert on every lead
5. Click the **save** icon

## 3. Deploy it as a web app

1. **Deploy → New deployment**
2. Click the gear next to "Select type" → choose **Web app**
3. Fill in:
   - Description: `Zera Dental leads`
   - Execute as: **Me**
   - Who has access: **Anyone**  ← this must be "Anyone", not "Anyone with Google account"
4. **Deploy** → **Authorize access** → pick your Google account → *Advanced* → *Go to (project name)*
   → **Allow**
5. Copy the **Web app URL**. It looks like:
   `https://script.google.com/macros/s/AKfycb..../exec`

## 4. Put the URL into the site

**On Vercel (recommended — no redeploy of code needed):**

Project → **Settings → Environment Variables** → add:

| Name | Value |
|---|---|
| `NEXT_PUBLIC_LEAD_ENDPOINT` | your `/exec` URL |

Apply to Production, Preview and Development, then **Redeploy**.

**Or in code:** edit `lib/site.ts` and replace the `REPLACE_ME` fallback URL.

## 5. Test it

1. Open the live site → `/free-website-audit`
2. Complete the 9 questions and submit your own name and number
3. The row should appear in the **Leads** tab within a couple of seconds

## What each column means

| Column | Notes |
|---|---|
| Timestamp (IST) | Auto, Asia/Kolkata |
| WhatsApp | Auto-normalised to `91XXXXXXXXXX` so you can paste into `wa.me/` |
| Source | Which form/page produced the lead |
| Audit Score / Band | Only present for audit submissions. Rows are colour-coded: red = critical, green = strong |
| Top Gaps | The weakest areas the audit identified — use this to open the WhatsApp conversation |
| Audit Answers | The full question-by-question record |
| Status / Notes | Yours to fill in — New / Contacted / Quoted / Won / Lost |

## Redeploying after a script change

**Deploy → Manage deployments → edit (pencil) → Version: New version → Deploy.**
The URL stays the same, so you do not need to change anything on Vercel.

## Troubleshooting

- **No rows appearing:** "Who has access" is almost certainly not set to **Anyone**. Re-check step 3.
- **Rows appear blank:** you deployed an old version. Use *New version* when redeploying.
- **Lead arrives but no email:** `NOTIFY_EMAIL` is empty, or Gmail's daily quota is exhausted.

---

## ✅ LIVE CONFIGURATION (as deployed, 9 Aug 2026)

This is already set up. Recorded here so you know where everything lives.

| Item | Value |
|---|---|
| Google account | `ubsatishsingh@gmail.com` (the default account) |
| Spreadsheet | **Zera Dental Leads** — ID `19ONSwVHEqaByU31M-jywXSzkEETzkT_ugS0Dnop1Yt0` |
| Tab written to | `Leads` (auto-created; `Sheet1` is unused) |
| Apps Script project | **Untitled project** → standalone, writes by sheet ID |
| Web app access | Execute as *me*, Who has access: **Anyone** |
| Email alerts | `ubsatishsingh@gmail.com` + `zeradental3585@gmail.com` |
| Vercel variable | `NEXT_PUBLIC_LEAD_ENDPOINT` (Production + Preview, not sensitive) |

### Why standalone and not sheet-bound

The `zeradental3585@gmail.com` session had a broken `authuser=1` redirect on
`script.google.com`, which killed the bound-script route, the project list and the OAuth
popup alike. A standalone script writing by `SHEET_ID` sidesteps all of it — and has the
bonus that renaming or moving the sheet won't break anything.

### Verified end-to-end

1. `GET /exec` returns `{"result":"ok"}` without a login prompt → "Anyone" access confirmed
2. Cross-origin `POST` from zeradental.in → row written
3. Real submission through the live audit form → row written with correct source, score and band

### Two test rows to delete

Rows 2 and 3 are named `TEST — please delete` and `TEST 2 — live form, please delete`.
Safe to remove whenever.

### If leads ever stop arriving

Check in this order:
1. Apps Script → **Executions** — are `doPost` runs appearing, and are they failing?
2. Deploy → Manage deployments → is access still **Anyone**?
3. Vercel → is `NEXT_PUBLIC_LEAD_ENDPOINT` still set, and has the site been redeployed since?

**Important:** after editing `Code.gs`, you must redeploy with
**Deploy → Manage deployments → pencil → Version: New version → Deploy**.
Saving alone does nothing to the live endpoint. The URL stays the same, so Vercel needs no change.
