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
