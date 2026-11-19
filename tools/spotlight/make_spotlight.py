#!/usr/bin/env python3
"""
Zera Dental — "Spotlight" Feature Page Generator (v2 — editorial redesign)
============================================================================
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
It also prints the exact command to render the matching og:image card (see below) —
run that separately with Playwright since this script itself stays dependency-free.

Spotlight JSON fields:
{
  "name": "Dr. Aisha Khan",                  # required — the dentist's own name
  "clinic_name": "Khan Dental Studio",       # required
  "city": "Chennai", "area": "Adyar",        # optional, for the subtitle
  "tagline": "Chennai's Rising Name in Smile Makeovers",   # required — the flattering headline
  "credential": "BDS Gold Medalist",         # optional — one short credential line for the medallion ribbon
  "instagram_handle": "draishadental",       # without the @
  "instagram_posts": [                       # 2-6 PUBLIC post/reel URLs to embed
    "https://www.instagram.com/p/XXXXXXXXXXX/",
    "https://www.instagram.com/reel/XXXXXXXXXXX/"
  ],
  "rating": 4.9, "reviews": 210,             # optional, exactly as shown on their GBP — never invented
  "years": "6",                              # optional — years in practice, only if stated/known
  "sections": [                              # free-form — write as many as you like, in order
    {"heading": "Why patients love Dr. Khan", "eyebrow": "THE INTERVIEW", "body": "..."}
  ],
  "quote": "Best dental experience I've had — painless and so friendly!",  # optional, a real review line
  "quote_from": "Google review",             # optional attribution for the quote
  "issue_no": "001",                         # optional — cosmetic "issue number" for the masthead kicker
  "slug": "dr-aisha-khan"                    # optional; derived from name+city if omitted
}

Rules baked in (do not remove):
  * Instagram content is embedded via Instagram's own official embed widget
    (instagram.com/embed.js) — never downloaded or re-hosted. If the dentist deletes
    the original post, the embed disappears on its own. Only public post/reel URLs work.
  * Every embed carries a real, always-visible fallback (a styled "View on Instagram"
    card with the post link) baked directly into the blockquote markup — so the page
    never looks broken if the viewer's browser/extension blocks embed.js, or if someone
    opens the file directly over file:// (where Instagram's script often can't run at
    all). The page's first impression never depends on a third-party script loading.
  * The hero section is a fully self-contained "cover" treatment (pure CSS — a monogram
    medallion, masthead kicker, display headline) that always renders, with zero
    external dependency, so the page looks complete and premium even before any
    embed/script loads.
  * Only facts given in the JSON are shown — rating/reviews/years/credential are never
    invented. No unknowns are glossed over; if a field is missing, that part just
    doesn't render.
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

def initials(name):
    words = [w for w in re.sub(r"[^A-Za-z\s]", " ", name).split() if w and w.lower() not in ("dr", "dr.")]
    letters = [w[0].upper() for w in words[:2]]
    return "".join(letters) or "ZD"

def ig_embed_block(url, handle, featured=False):
    """Official Instagram embed, with a real always-visible, fully-clickable fallback
    card baked into the blockquote itself — shown until/unless embed.js successfully
    replaces it with the live post. The whole card (not just a text link) opens the
    real post on Instagram in a new tab, on mobile and desktop alike."""
    url = url.strip()
    if not url:
        return ""
    if not url.rstrip("/").endswith("/"):
        url = url.rstrip("/") + "/"
    glyph_size = 30 if featured else 24
    lede = "See the post that started it — " if featured else ""
    cta_label = "Tap to view on Instagram" if featured else "View on Instagram"
    handle_html = f'<strong>@{E(handle)}</strong>' if handle else ""
    fallback = f'''<a class="ig-fallback{" ig-fallback-featured" if featured else ""}" href="{E(url)}" target="_blank" rel="noopener noreferrer">
      <div class="ig-fallback-glyph">
        <svg viewBox="0 0 24 24" width="{glyph_size}" height="{glyph_size}" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2" y="2" width="20" height="20" rx="6"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/></svg>
      </div>
      <p class="ig-fallback-text">{lede}{handle_html}</p>
      <span class="ig-fallback-cta">{cta_label} <span class="arrow">→</span></span>
    </a>'''
    return (f'<blockquote class="instagram-media" data-instgrm-permalink="{E(url)}" data-instgrm-version="14" '
            f'style="background:#FFF; border:0; border-radius:16px; box-shadow:0 1px 2px rgba(11,31,51,.05),'
            f'0 8px 24px -12px rgba(11,31,51,.15); margin:0; max-width:100%; min-width:280px; padding:0; width:100%;">'
            f'{fallback}</blockquote>')

def build(lead):
    name = lead["name"].strip()
    clinic = lead.get("clinic_name", "").strip()
    city = lead.get("city", "").strip()
    area = lead.get("area", "").strip()
    place = ", ".join(x for x in [area, city] if x)
    tagline = lead.get("tagline", "").strip()
    credential = lead.get("credential", "").strip()
    handle = lead.get("instagram_handle", "").strip().lstrip("@")
    posts = lead.get("instagram_posts") or []
    rating = lead.get("rating")
    reviews = lead.get("reviews")
    years = lead.get("years")
    sections = lead.get("sections") or []
    quote = lead.get("quote", "").strip()
    quote_from = lead.get("quote_from", "").strip()
    issue_no = lead.get("issue_no", "001")
    slug = lead.get("slug") or slugify(f"{name}-{city}")
    url = f"{SITE_URL}/spotlight/{slug}.html"
    og_image = f"{SITE_URL}/spotlight/{slug}-og.png"
    today = datetime.date.today()
    mono = initials(name)

    stats = []
    if rating: stats.append(f'<div class="stat"><strong>★ {E(rating)}</strong><span>Google rating</span></div>')
    if reviews: stats.append(f'<div class="stat"><strong>{E(reviews)}</strong><span>reviews</span></div>')
    if years: stats.append(f'<div class="stat"><strong>{E(years)}</strong><span>years in practice</span></div>')
    stats_html = "".join(stats)

    featured_html = ""
    rest_html = ""
    if posts:
        featured_html = f'<div class="ig-card ig-card-featured">{ig_embed_block(posts[0], handle, featured=True)}</div>'
        rest_html = "".join(f'<div class="ig-card">{ig_embed_block(u, handle)}</div>' for u in posts[1:])

    def _one_section(s):
        eyebrow = s.get("eyebrow", "").strip() if s.get("eyebrow") else ""
        eyebrow_html = f'<p class="eyebrow">{E(eyebrow)}</p>' if eyebrow else ""
        heading_html = f'<h2>{E(s.get("heading",""))}</h2>'
        body_paras = "".join(f"<p>{E(p)}</p>" for p in str(s.get("body", "")).split("\n\n") if p.strip())
        return f'<section class="feature-section">{eyebrow_html}{heading_html}<div class="prose">{body_paras}</div></section>'

    sections_html = "".join(_one_section(s) for s in sections)

    quote_html = ""
    if quote:
        quote_html = f'''<section class="quote-section"><span class="quote-mark">&ldquo;</span><blockquote>{E(quote)}</blockquote>
{f'<cite>— {E(quote_from)}</cite>' if quote_from else ''}</section>'''

    ig_link = f'https://www.instagram.com/{E(handle)}/' if handle else ""
    share_text = f"I was featured by Zera Dental! Check it out: {url}"
    wa_share = f"https://wa.me/?text={html.escape(share_text, quote=True).replace(chr(32),'%20')}"
    meta_desc = f"{tagline} — {name}{', ' + clinic if clinic else ''}{', ' + place if place else ''}. Featured by Zera Dental."

    page = f"""<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{E(name)} — Featured by Zera Dental</title>
<meta name="description" content="{E(meta_desc)}">
<link rel="canonical" href="{E(url)}">
<meta property="og:title" content="{E(name)} — {E(tagline)}">
<meta property="og:description" content="{E(meta_desc)}">
<meta property="og:type" content="profile">
<meta property="og:url" content="{E(url)}">
<meta property="og:image" content="{E(og_image)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{E(name)} — {E(tagline)}">
<meta name="twitter:description" content="{E(meta_desc)}">
<meta name="twitter:image" content="{E(og_image)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700,9..144,900&display=swap" rel="stylesheet">
<style>
  :root {{
    --ink:#0B1F33; --ink-700:#12314d; --ink-500:#3d5a75; --ink-300:#4e6c89;
    --mint-50:#eefbf7; --mint-100:#d3f5ec; --mint-200:#a7ebda; --mint-400:#38c9a6; --mint-500:#12b48d; --mint-600:#0d9273; --mint-700:#0b7359; --mint-800:#095b45;
    --sand-50:#fbfaf7; --sand-100:#f4f1ea;
    --gold:#d8b45e; --gold-dim:#a9854a;
  }}
  * {{ box-sizing:border-box; }}
  html {{ -webkit-text-size-adjust:100%; }}
  body {{ margin:0; font-family:'Plus Jakarta Sans', system-ui, sans-serif; color:var(--ink); background:var(--sand-50); line-height:1.6; }}
  h1,h2,.display {{ font-family:'Fraunces', Georgia, serif; }}
  .wrap {{ max-width:860px; margin:0 auto; padding:0 20px; }}
  a {{ color:inherit; }}
  img {{ max-width:100%; }}

  /* ---- Masthead ---- */
  header.site {{ padding:16px 0; border-bottom:1px solid rgba(11,31,51,.07); background:#fff; }}
  header.site .wrap {{ display:flex; align-items:center; justify-content:space-between; }}
  .brand {{ display:flex; align-items:center; gap:10px; text-decoration:none; }}
  .brand .box {{ display:grid; place-items:center; width:36px; height:36px; border-radius:10px; background:var(--ink); color:var(--mint-200); font-size:18px; }}
  .brand .word {{ font-weight:800; font-size:17px; letter-spacing:-.01em; color:var(--ink); }}
  .brand .word span {{ color:var(--mint-700); }}
  .back-link {{ font-size:13px; font-weight:700; color:var(--ink-500); text-decoration:none; letter-spacing:.02em; }}

  /* ---- Cover / hero ---- */
  .cover {{
    position:relative; overflow:hidden; background:radial-gradient(120% 140% at 50% -10%, #173a5c 0%, var(--ink) 55%, #081525 100%);
    color:#fff; padding:52px 0 60px; text-align:center;
  }}
  .cover::before {{
    content:""; position:absolute; inset:0; opacity:.5;
    background-image:
      radial-gradient(circle at 15% 20%, rgba(56,201,166,.18), transparent 40%),
      radial-gradient(circle at 85% 75%, rgba(216,180,94,.14), transparent 45%);
    pointer-events:none;
  }}
  .cover-inner {{ position:relative; z-index:1; }}
  .masthead {{
    display:flex; align-items:center; justify-content:center; gap:10px;
    font-size:11.5px; font-weight:700; letter-spacing:.22em; text-transform:uppercase;
    color:var(--mint-200); margin:0 0 26px;
  }}
  .masthead .rule {{ width:28px; height:1px; background:rgba(167,235,218,.45); }}
  .masthead .issue {{ color:var(--gold); }}

  .medallion {{
    width:112px; height:112px; margin:0 auto 22px; border-radius:50%;
    display:grid; place-items:center; position:relative;
    background:linear-gradient(145deg, var(--mint-700), var(--ink-700));
    box-shadow: 0 0 0 1px rgba(216,180,94,.55), 0 0 0 7px rgba(216,180,94,.12), 0 18px 40px -12px rgba(0,0,0,.55);
  }}
  .medallion::before {{
    content:""; position:absolute; inset:7px; border-radius:50%; border:1px dashed rgba(216,180,94,.6);
  }}
  .medallion span {{ font-family:'Fraunces',serif; font-weight:600; font-size:34px; color:var(--gold); letter-spacing:.02em; }}

  .credential-ribbon {{
    display:inline-flex; align-items:center; gap:6px; font-size:12px; font-weight:700; letter-spacing:.06em;
    color:var(--ink); background:linear-gradient(135deg,#f3dfa0,var(--gold)); padding:5px 14px 5px 12px;
    border-radius:999px; margin:0 0 16px; text-transform:uppercase;
  }}

  .cover h1.display {{
    font-size:clamp(30px,5.4vw,46px); font-weight:600; line-height:1.14; margin:0 0 14px; max-width:680px;
    margin-left:auto; margin-right:auto; letter-spacing:-.01em;
  }}
  .cover .name {{ font-size:19px; font-weight:700; margin:0; color:#fff; }}
  .cover .clinic-name {{ color:var(--mint-200); font-weight:500; }}
  .cover .meta {{ color:rgba(255,255,255,.65); font-size:14.5px; margin:5px 0 26px; }}
  .cover .meta a {{ color:var(--mint-200); font-weight:700; text-decoration:none; }}

  .stats {{ display:flex; justify-content:center; gap:34px; flex-wrap:wrap; }}
  .stat {{ display:flex; flex-direction:column; align-items:center; }}
  .stat strong {{ font-size:21px; font-family:'Fraunces',serif; color:#fff; }}
  .stat span {{ font-size:11.5px; color:rgba(255,255,255,.55); text-transform:uppercase; letter-spacing:.06em; margin-top:2px; }}

  /* ---- Instagram grid ---- */
  .ig-section-head {{ text-align:center; padding:44px 0 6px; }}
  .ig-section-head .eyebrow {{ justify-content:center; }}
  .ig-section-head h2 {{ font-size:21px; font-weight:600; margin:4px 0 0; }}
  .ig-card-featured {{ margin-bottom:22px; }}
  .ig-grid {{ display:grid; grid-template-columns:repeat(auto-fit, minmax(220px,300px)); gap:18px; padding:0 0 44px; justify-content:center; }}
  .ig-card {{ display:flex; justify-content:center; }}
  .ig-fallback {{
    width:100%; min-height:200px; display:flex; flex-direction:column; align-items:center; justify-content:center;
    gap:10px; padding:26px 18px; border-radius:18px; text-decoration:none; color:var(--ink);
    background:
      linear-gradient(#fff,#fff) padding-box,
      linear-gradient(135deg, var(--mint-400), var(--gold), var(--mint-600)) border-box;
    border:2px solid transparent; text-align:center; transition:transform .15s ease, box-shadow .15s ease;
    box-shadow:0 10px 24px -16px rgba(11,31,51,.25);
  }}
  .ig-fallback:hover, .ig-fallback:active {{ transform:translateY(-2px); box-shadow:0 16px 30px -14px rgba(11,31,51,.35); }}
  .ig-fallback-featured {{
    min-height:280px; gap:14px; padding:40px 26px;
    background:
      linear-gradient(160deg,#fff,var(--mint-50)) padding-box,
      linear-gradient(135deg, var(--gold), var(--mint-500), var(--ink-700)) border-box;
  }}
  .ig-fallback-glyph {{
    width:56px; height:56px; border-radius:50%; display:grid; place-items:center;
    background:linear-gradient(145deg,var(--mint-600),var(--ink-700)); color:#fff;
  }}
  .ig-fallback-featured .ig-fallback-glyph {{ width:68px; height:68px; }}
  .ig-fallback-text {{ margin:0; font-size:14px; color:var(--ink-500); }}
  .ig-fallback-featured .ig-fallback-text {{ font-size:15.5px; font-weight:600; color:var(--ink); max-width:340px; }}
  .ig-fallback-cta {{ display:inline-flex; align-items:center; gap:6px; font-size:13.5px; font-weight:800; color:var(--mint-700); text-transform:uppercase; letter-spacing:.04em; }}
  .ig-fallback .arrow {{ transition:transform .15s ease; }}
  .ig-fallback:hover .arrow {{ transform:translateX(3px); }}

  /* ---- Editorial body ---- */
  .eyebrow {{
    display:flex; align-items:center; gap:8px; font-size:11.5px; font-weight:800; letter-spacing:.16em;
    color:var(--mint-700); text-transform:uppercase; margin:0 0 8px;
  }}
  .eyebrow::before {{ content:""; width:18px; height:2px; background:var(--mint-500); border-radius:2px; }}
  .feature-section {{ padding:34px 0; border-top:1px solid rgba(11,31,51,.08); }}
  .feature-section h2 {{ font-size:25px; font-weight:600; margin:0 0 14px; letter-spacing:-.01em; }}
  .prose p {{ margin:0 0 14px; color:var(--ink-500); font-size:16px; }}

  .quote-section {{
    position:relative; background:var(--ink); color:#fff; border-radius:22px; padding:44px 36px 36px; margin:40px 0; text-align:center;
    background-image:radial-gradient(circle at 85% 10%, rgba(216,180,94,.14), transparent 50%);
  }}
  .quote-mark {{ font-family:'Fraunces',serif; font-size:52px; line-height:1; color:var(--gold); display:block; margin-bottom:4px; }}
  .quote-section blockquote {{ margin:0 0 12px; font-family:'Fraunces',serif; font-size:22px; font-weight:500; font-style:italic; max-width:560px; margin-left:auto; margin-right:auto; }}
  .quote-section cite {{ font-size:12.5px; color:var(--mint-200); font-style:normal; text-transform:uppercase; letter-spacing:.08em; }}

  .cta {{ text-align:center; background:linear-gradient(160deg,var(--mint-100),var(--sand-100)); border-radius:22px; padding:44px 24px; margin:40px 0; }}
  .cta h2 {{ font-size:23px; margin:0 0 10px; }}
  .cta p {{ color:var(--ink-500); margin:0 0 22px; font-size:15px; max-width:480px; margin-left:auto; margin-right:auto; }}
  .btn {{ display:inline-flex; align-items:center; gap:8px; background:var(--ink); color:#fff !important; font-weight:700; font-size:15px; padding:13px 26px; border-radius:12px; text-decoration:none; }}
  .btn.secondary {{ background:#fff; color:var(--ink) !important; border:1px solid rgba(11,31,51,.15); margin-left:10px; }}
  .share-row {{ text-align:center; padding:8px 0 44px; }}

  footer {{ background:var(--ink); color:rgba(255,255,255,.75); padding:34px 0; font-size:13px; }}
  footer .wrap {{ display:flex; flex-direction:column; gap:10px; align-items:center; text-align:center; }}
  footer a {{ color:var(--mint-200); text-decoration:none; }}
  .editorial-note {{ font-size:12.5px; color:var(--ink-300); text-align:center; padding:6px 20px 26px; }}

  @media (max-width:480px) {{
    .cover {{ padding:40px 0 48px; }}
    .stats {{ gap:22px; }}
    .btn.secondary {{ margin-left:0; margin-top:10px; display:block; }}
  }}
</style>
</head>
<body>
<header class="site"><div class="wrap">
  <a class="brand" href="{SITE_URL}"><span class="box">🦷</span><span class="word">Zera<span>Dental</span></span></a>
  <a class="back-link" href="{SITE_URL}">← zeradental.in</a>
</div></header>

<section class="cover"><div class="wrap cover-inner">
  <div class="masthead"><span class="rule"></span>ZERA DENTAL SPOTLIGHT <span class="issue">· ISSUE {E(issue_no)}</span><span class="rule"></span></div>
  <div class="medallion"><span>{E(mono)}</span></div>
  {f'<div class="credential-ribbon">✦ {E(credential)}</div>' if credential else ''}
  <h1 class="display">{E(tagline)}</h1>
  <p class="name">{E(name)}{f' <span class="clinic-name">· {E(clinic)}</span>' if clinic else ''}</p>
  <p class="meta">{E(place)}{' · ' if place and handle else ''}{f'<a href="{E(ig_link)}" target="_blank" rel="noopener noreferrer">@{E(handle)}</a>' if handle else ''}</p>
  <div class="stats">{stats_html}</div>
</div></section>

{f'''<div class="ig-section-head wrap"><p class="eyebrow">As seen on Instagram</p><h2>Straight from @{E(handle)}</h2></div>
<section class="wrap">{featured_html}<div class="ig-grid">{rest_html}</div></section>''' if (featured_html or rest_html) else ''}

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
    return slug, url, og_image, page

def og_card_html(lead, slug):
    """A standalone 1200x630 card matching the cover's visual language, for rendering
    to PNG separately (e.g. via Playwright) and saving as public/spotlight/<slug>-og.png.
    Kept mobile-safe: all essential text sits within the ~150-1050px horizontal zone
    that survives WhatsApp's center-crop on a 1200-wide canvas."""
    name = lead["name"].strip()
    tagline = lead.get("tagline", "").strip()
    credential = lead.get("credential", "").strip()
    mono = initials(name)
    return f"""<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Fraunces:opsz,wght@9..144,600;9..144,700&display=swap" rel="stylesheet">
<style>
  *{{box-sizing:border-box;margin:0;padding:0;}}
  body{{width:1200px;height:630px;font-family:'Plus Jakarta Sans',sans-serif;
    background:radial-gradient(120% 160% at 50% -20%, #1a4166 0%, #0B1F33 55%, #071320 100%);
    position:relative;overflow:hidden;color:#fff;display:flex;align-items:center;justify-content:center;}}
  body::before{{content:"";position:absolute;inset:0;
    background-image:radial-gradient(circle at 12% 15%, rgba(56,201,166,.22), transparent 42%),
      radial-gradient(circle at 88% 85%, rgba(216,180,94,.16), transparent 48%);}}
  .card{{position:relative;z-index:1;text-align:center;width:900px;}}
  .masthead{{font-size:19px;font-weight:800;letter-spacing:.3em;color:#a7ebda;margin-bottom:28px;text-transform:uppercase;}}
  .masthead span{{color:#d8b45e;}}
  .medallion{{width:160px;height:160px;border-radius:50%;margin:0 auto 26px;display:flex;align-items:center;justify-content:center;
    background:linear-gradient(145deg,#0b7359,#12314d);box-shadow:0 0 0 2px rgba(216,180,94,.6),0 0 0 11px rgba(216,180,94,.12);position:relative;}}
  .medallion::before{{content:"";position:absolute;inset:10px;border-radius:50%;border:2px dashed rgba(216,180,94,.6);}}
  .medallion span{{font-family:'Fraunces',serif;font-weight:700;font-size:56px;color:#d8b45e;}}
  .ribbon{{display:inline-block;font-size:19px;font-weight:800;letter-spacing:.05em;color:#0B1F33;
    background:linear-gradient(135deg,#f3dfa0,#d8b45e);padding:8px 24px;border-radius:999px;margin-bottom:22px;text-transform:uppercase;}}
  h1{{font-family:'Fraunces',serif;font-weight:700;font-size:52px;line-height:1.15;margin:0 0 16px;}}
  .name{{font-size:26px;font-weight:700;color:#fff;}}
  .brand{{position:absolute;bottom:40px;left:0;right:0;text-align:center;font-size:18px;font-weight:800;color:rgba(255,255,255,.55);letter-spacing:.04em;}}
</style></head><body>
<div class="card">
  <div class="masthead">ZERA DENTAL <span>SPOTLIGHT</span></div>
  <div class="medallion"><span>{E(mono)}</span></div>
  {f'<div class="ribbon">✦ {E(credential)}</div>' if credential else ''}
  <h1>{E(tagline)}</h1>
  <div class="name">{E(name)}</div>
</div>
<div class="brand">zeradental.in</div>
</body></html>"""

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
    lead_path = pathlib.Path(sys.argv[1])
    lead = json.loads(lead_path.read_text(encoding="utf-8"))
    for req in ("name", "clinic_name", "tagline"):
        if not lead.get(req):
            sys.exit(f"Missing required field: {req}")
    slug, url, og_image, page = build(lead)
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out = OUT_DIR / f"{slug}.html"
    out.write_text(page, encoding="utf-8")

    og_html_path = lead_path.parent / f"{slug}-og.html"
    og_html_path.write_text(og_card_html(lead, slug), encoding="utf-8")

    print(f"FILE     public/spotlight/{slug}.html\nURL      {url}\n")
    print(f"OG CARD  {og_html_path}  (render this to a 1200x630 PNG with Playwright,")
    print(f"         save it as public/spotlight/{slug}-og.png — referenced at {og_image})\n")
    print("----- Message to send the dentist -----\n" + lead_message(lead, url))

if __name__ == "__main__":
    main()
