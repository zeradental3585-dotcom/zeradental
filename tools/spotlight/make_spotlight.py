#!/usr/bin/env python3
"""
Zera Dental — "Spotlight" Feature Page Generator
=================================================
Turns a write-up about a dentist (plus their public Instagram posts) into a real,
published, SEO-indexable feature page on zeradental.in:

    zeradental.in/spotlight/<slug>.html

This is DIFFERENT from the lead-preview tool (tools/preview/make_preview.py in the
zeratech-io-app repo): that one makes disclaimed, noindex MOCKUPS for cold outreach.
This one makes a REAL, permanent, indexed page — genuine editorial content, meant to
be shared by the dentist themselves and to rank on Google over time.

Usage
    python3 make_spotlight.py spotlight.json

Output: writes public/spotlight/<slug>.html (relative to the zeradental repo root,
auto-detected by walking up from this script — same convention as the preview tool),
then prints the finished URL, a WhatsApp message to send the dentist, and a share link.

Spotlight JSON fields:
{
  "name": "Dr. Aisha Khan",                  # required — the dentist's own name
  "clinic_name": "Khan Dental Studio",       # required
  "city": "Chennai", "area": "Adyar",        # optional, for the subtitle
  "tagline": "Chennai's Rising Name in Smile Makeovers",   # required — the flattering headline
  "instagram_handle": "draishadental",       # without the @
  "instagram_posts": [                       # 2-6 PUBLIC post/reel URLs to embed
    "https://www.instagram.com/p/XXXXXXXXXXX/",
    "https://www.instagram.com/reel/XXXXXXXXXXX/"
  ],
  "rating": 4.9, "reviews": 210,             # optional, exactly as shown on their GBP — never invented
  "years": "6",                              # optional — years in practice, only if stated/known
  "sections": [                              # free-form — write as many as you like, in order
    {"heading": "Why patients love Dr. Khan", "body": "..."},
    {"heading": "A gentle touch with big results", "body": "..."}
  ],
  "quote": "Best dental experience I've had — painless and so friendly!",  # optional, a real review line
  "quote_from": "Google review",             # optional attribution for the quote
  "slug": "dr-aisha-khan"                    # optional; derived from name+city if omitted
}

Rules baked in (do not remove):
  * Instagram content is embedded via Instagram's own official embed widget
    (instagram.com/embed.js) — never downloaded or re-hosted. If the dentist deletes
    the original post, the embed disappears on its own. Only public post/reel URLs work.
  * Only facts given in the JSON are shown — rating/reviews/years are never invented.
    No unknowns are glossed over; if a field is missing, that part just doesn't render.
  * Every page carries the Zera Technologies design credit + ownership line (required
    on every Zera Technologies property) and zeradental.in's own contact details.
  * No noindex — these pages are meant to be found and shared.
"""
import html, json, re, sys, pathlib, datetime

def find_repo_root():
    p = pathlib.Path(__file__).resolve()
    for parent in [p.parent, *p.parents]:
        if (parent / "package.json").exists() and (parent / "public").exists():
            return parent
    sys.exit("Could not find the zeradental repo root (looked for a parent folder with package.json + public/). "
              "Run this from inside (or under) the zeradental repo.")

ROOT = find_repo_root()
OUT_DIR = ROOT / "public" / "spotlight"
SITE_URL = "https://zeradental.in"
WA_NUMBER = "919835102324"
CONTACT_EMAIL = "hello@zeradental.in"

def E(s):
    return html.escape(str(s or ""), quote=True)

def slugify(s):
    s = re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")
    return s[:60] or "dentist"

def ig_embed_block(url):
    url = url.strip()
    if not url:
        return ""
    if not url.rstrip("/").endswith("/"):
        url = url.rstrip("/") + "/"
    return f'''<blockquote class="instagram-media" data-instgrm-permalink="{E(url)}" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:16px; box-shadow:0 1px 2px rgba(11,31,51,.05),0 8px 24px -12px rgba(11,31,51,.15); margin:0; max-width:100%; min-width:280px; padding:0; width:100%;"></blockquote>'''

def build(lead):
    name = lead["name"].strip()
    clinic = lead.get("clinic_name", "").strip()
    city = lead.get("city", "").strip()
    area = lead.get("area", "").strip()
    place = ", ".join(x for x in [area, city] if x)
    tagline = lead.get("tagline", "").strip()
    handle = lead.get("instagram_handle", "").strip().lstrip("@")
    posts = lead.get("instagram_posts") or []
    rating = lead.get("rating")
    reviews = lead.get("reviews")
    years = lead.get("years")
    sections = lead.get("sections") or []
    quote = lead.get("quote", "").strip()
    quote_from = lead.get("quote_from", "").strip()
    slug = lead.get("slug") or slugify(f"{name}-{city}")
    url = f"{SITE_URL}/spotlight/{slug}.html"
    today = datetime.date.today()

    stats = []
    if rating: stats.append(f'<div class="stat"><strong>★ {E(rating)}</strong><span>Google rating</span></div>')
    if reviews: stats.append(f'<div class="stat"><strong>{E(reviews)}</strong><span>reviews</span></div>')
    if years: stats.append(f'<div class="stat"><strong>{E(years)}</strong><span>years in practice</span></div>')
    stats_html = "".join(stats)

    ig_html = "".join(f'<div class="ig-card">{ig_embed_block(u)}</div>' for u in posts)

    sections_html = "".join(
        f'<section class="feature-section"><h2>{E(s.get("heading",""))}</h2>'
        f'<div class="prose">{"".join(f"<p>{E(p)}</p>" for p in str(s.get("body","")).split(chr(10)+chr(10)) if p.strip())}</div></section>'
        for s in sections
    )

    quote_html = ""
    if quote:
        quote_html = f'''<section class="quote-section"><blockquote>&ldquo;{E(quote)}&rdquo;</blockquote>
{f'<cite>— {E(quote_from)}</cite>' if quote_from else ''}</section>'''

    ig_link = f'https://www.instagram.com/{E(handle)}/' if handle else ""
    share_text = f"I was featured by Zera Dental! Check it out: {url}"
    wa_share = f"https://wa.me/?text={html.escape(share_text, quote=True).replace(chr(32),'%20')}"

    page = f"""<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{E(name)} — Featured by Zera Dental</title>
<meta name="description" content="{E(tagline)} — {E(name)}{', ' + E(clinic) if clinic else ''}{', ' + E(place) if place else ''}. Featured by Zera Dental.">
<link rel="canonical" href="{E(url)}">
<meta property="og:title" content="{E(name)} — {E(tagline)}">
<meta property="og:description" content="Featured by Zera Dental{', ' + E(place) if place else ''}.">
<meta property="og:type" content="profile">
<meta property="og:url" content="{E(url)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&display=swap" rel="stylesheet">
<style>
  :root {{ --ink:#0B1F33; --ink-500:#3d5a75; --ink-300:#4e6c89; --mint-50:#eefbf7; --mint-100:#d3f5ec; --mint-200:#a7ebda; --mint-500:#12b48d; --mint-600:#0d9273; --mint-700:#0b7359; --sand-50:#fbfaf7; --sand-100:#f4f1ea; }}
  * {{ box-sizing:border-box; }}
  body {{ margin:0; font-family:'Plus Jakarta Sans', system-ui, sans-serif; color:var(--ink); background:var(--sand-50); line-height:1.6; }}
  h1,h2,.display {{ font-family:'Fraunces', Georgia, serif; }}
  .wrap {{ max-width:860px; margin:0 auto; padding:0 20px; }}
  a {{ color:inherit; }}
  header.site {{ padding:16px 0; border-bottom:1px solid rgba(11,31,51,.07); background:#fff; }}
  header.site .wrap {{ display:flex; align-items:center; justify-content:space-between; }}
  .brand {{ display:flex; align-items:center; gap:10px; text-decoration:none; }}
  .brand .box {{ display:grid; place-items:center; width:36px; height:36px; border-radius:10px; background:var(--ink); color:var(--mint-200); font-size:18px; }}
  .brand .word {{ font-weight:800; font-size:17px; letter-spacing:-.01em; color:var(--ink); }}
  .brand .word span {{ color:var(--mint-700); }}
  .back-link {{ font-size:14px; font-weight:600; color:var(--ink-500); text-decoration:none; }}
  .badge {{ display:inline-flex; align-items:center; gap:6px; background:var(--mint-100); color:var(--mint-700); font-weight:700; font-size:13px; padding:6px 14px; border-radius:999px; margin-bottom:18px; }}
  .hero {{ padding:56px 0 36px; text-align:center; background:linear-gradient(180deg, var(--mint-50), var(--sand-50)); }}
  .hero h1.display {{ font-size:clamp(28px,5vw,42px); font-weight:600; margin:6px 0 10px; }}
  .hero .name {{ font-size:19px; font-weight:700; margin:0; }}
  .hero .meta {{ color:var(--ink-500); font-size:15px; margin:4px 0 22px; }}
  .hero .meta a {{ color:var(--mint-700); font-weight:600; text-decoration:none; }}
  .stats {{ display:flex; justify-content:center; gap:28px; flex-wrap:wrap; margin-top:8px; }}
  .stat {{ display:flex; flex-direction:column; align-items:center; }}
  .stat strong {{ font-size:20px; font-family:'Fraunces',serif; }}
  .stat span {{ font-size:12.5px; color:var(--ink-300); }}
  .ig-grid {{ display:grid; grid-template-columns:repeat(auto-fit, minmax(280px,1fr)); gap:24px; padding:40px 0; }}
  .ig-card {{ display:flex; justify-content:center; }}
  .feature-section {{ padding:28px 0; border-top:1px solid rgba(11,31,51,.08); }}
  .feature-section h2 {{ font-size:22px; font-weight:600; margin:0 0 12px; }}
  .prose p {{ margin:0 0 12px; color:var(--ink-500); font-size:15.5px; }}
  .quote-section {{ background:var(--ink); color:#fff; border-radius:20px; padding:34px 30px; margin:32px 0; text-align:center; }}
  .quote-section blockquote {{ margin:0 0 10px; font-family:'Fraunces',serif; font-size:21px; font-weight:500; font-style:italic; }}
  .quote-section cite {{ font-size:13px; color:var(--mint-200); font-style:normal; }}
  .cta {{ text-align:center; background:var(--mint-100); border-radius:20px; padding:40px 24px; margin:36px 0; }}
  .cta h2 {{ font-size:22px; margin:0 0 10px; }}
  .cta p {{ color:var(--ink-500); margin:0 0 20px; font-size:15px; }}
  .btn {{ display:inline-flex; align-items:center; gap:8px; background:var(--ink); color:#fff !important; font-weight:700; font-size:15px; padding:13px 26px; border-radius:12px; text-decoration:none; }}
  .btn.secondary {{ background:#fff; color:var(--ink) !important; border:1px solid rgba(11,31,51,.15); margin-left:10px; }}
  .share-row {{ text-align:center; padding:10px 0 40px; }}
  footer {{ background:var(--ink); color:rgba(255,255,255,.75); padding:34px 0; font-size:13px; }}
  footer .wrap {{ display:flex; flex-direction:column; gap:10px; align-items:center; text-align:center; }}
  footer a {{ color:var(--mint-200); text-decoration:none; }}
  .editorial-note {{ font-size:12.5px; color:var(--ink-300); text-align:center; padding:4px 0 24px; }}
</style>
</head>
<body>
<header class="site"><div class="wrap">
  <a class="brand" href="{SITE_URL}"><span class="box">🦷</span><span class="word">Zera<span>Dental</span></span></a>
  <a class="back-link" href="{SITE_URL}">← zeradental.in</a>
</div></header>

<section class="hero"><div class="wrap">
  <div class="badge">✨ Featured by Zera Dental</div>
  <h1 class="display">{E(tagline)}</h1>
  <p class="name">{E(name)}{f' · {E(clinic)}' if clinic else ''}</p>
  <p class="meta">{E(place)}{' · ' if place and handle else ''}{f'<a href="{E(ig_link)}" target="_blank" rel="noopener noreferrer">@{E(handle)}</a>' if handle else ''}</p>
  <div class="stats">{stats_html}</div>
</div></section>

{f'<section class="wrap"><div class="ig-grid">{ig_html}</div></section>' if ig_html else ''}

<div class="wrap">
{sections_html}
{quote_html}

<div class="cta">
  <h2>Love what you see?</h2>
  <p>This feature is completely free — our way of recognising dentists doing great work. If you're a dentist and want a feature like this, or a real clinic website that brings patients (not just followers), we'd love to talk.</p>
  <a class="btn" href="https://wa.me/{WA_NUMBER}?text={html.escape(f'Hi, I saw the Zera Dental Spotlight feature on {name} and I would like to know more.', quote=True).replace(chr(32),'%20')}" target="_blank" rel="noopener noreferrer">WhatsApp Zera Dental</a>
  <a class="btn secondary" href="{SITE_URL}" target="_blank" rel="noopener noreferrer">Visit zeradental.in</a>
</div>
</div>

<div class="share-row">
  <a class="btn" href="{wa_share}" target="_blank" rel="noopener noreferrer">Share this feature on WhatsApp</a>
</div>

<p class="editorial-note">This is an independent editorial feature by the Zera Dental team — not a paid advertisement, and not {E(name)}'s official website.</p>

<footer><div class="wrap">
  <div>© {today.year} Zera Dental, a property of <a href="https://zeratech.io/" target="_blank" rel="noopener noreferrer">Zera Technologies</a>. All rights reserved.</div>
  <div>Designed and developed by <a href="https://zeratech.io/" target="_blank" rel="noopener noreferrer">Zera Technologies</a></div>
  <div>{CONTACT_EMAIL} · <a href="https://wa.me/{WA_NUMBER}" target="_blank" rel="noopener noreferrer">WhatsApp</a></div>
</div></footer>

<script async src="//www.instagram.com/embed.js"></script>
</body>
</html>"""
    return slug, url, page

def lead_message(lead, url):
    who = lead.get("name", "there")
    return (f"Hi! I'm Satish from Zera Dental. I really liked what I've seen of your work, "
            f"so I put together a free feature page for you — no strings attached:\n"
            f"{url}\n"
            f"Feel free to share it anywhere — Instagram bio, story, wherever. If you'd like a feature "
            f"like this made permanent for your own Instagram bio link, or a real clinic website, just ask.")

def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    lead = json.loads(pathlib.Path(sys.argv[1]).read_text(encoding="utf-8"))
    for req in ("name", "clinic_name", "tagline"):
        if not lead.get(req):
            sys.exit(f"Missing required field: {req}")
    slug, url, page = build(lead)
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out = OUT_DIR / f"{slug}.html"
    out.write_text(page, encoding="utf-8")
    print(f"FILE   public/spotlight/{slug}.html\nURL    {url}\n")
    print("----- Message to send the dentist -----\n" + lead_message(lead, url))

if __name__ == "__main__":
    main()
