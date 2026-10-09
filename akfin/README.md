# Swipey.ai — create-sex-friend (site replica)

Faithful replica of `https://swipey.ai/create-sex-friend/` — the
"Swipey.ai · Bring Your Fantasy to Life with AI" AI-companion quiz landing page.

## Quick start — pure HTML (no server, fully offline)

**`index.html`** (in this folder) is a fully self-contained single-file version.
Just double-click it — it opens in any browser via `file://`, no server, no
React, no build step, and **no internet needed**. All CSS + JS are inline, and
the quiz photos + voice audio are downloaded locally into `media/` and referenced
by relative path.

To publish it on a website, upload **`index.html` and the whole `media/` folder**
together (keeping the folder structure) to any path — e.g.
`https://your-site/ansc/` — the relative paths make it work at any URL.

It reproduces the complete funnel:

style → ethnicity + age → body → breast → booty → hair style → hair color →
eye color → voice → personality → kinks → "Your Fantasy Babe is ready!" →
"Bring my AI to life" → Create-Your-Account paywall.

```
index.html                        # standalone single-file app (the one to deploy)
media/
├── Realistic/                    # style + ethnicity + body + breast + booty + hair + eye images
├── Anime/                        # anime style card image
├── Porn/                         # 12 porn kink option images (.webp)
├── Hentai/                       # 12 hentai kink option images (.webp)
├── personality/                  # 4 result personality icons (playful/nympho/submissive/dominant)
└── sounds/                       # 3 voice preview clips (.mp3)
```

The only external request left is the Google Fonts stylesheet (Anton + Poppins);
if offline the page falls back to system sans-serif fonts automatically.

## What else is here

```
create-sex-friend/
├── index.html                    # React app shell (the original build)
├── manifest.json
├── static/
│   ├── js/main.25f5b61a.js       # 1.8 MB compiled React bundle (quiz logic + i18n)
│   ├── css/main.178ff79b.css     # compiled CSS (theme tokens, gradients, fonts)
│   └── media/*                   # 33 hashed SVG/PNG assets (logos, tapes, hearts, bg)
└── assets/
    ├── favicon.ico
    └── personality/*.png         # 4 personality-type icons
```

## Running the original React build

The React app hard-codes the base path `/create-sex-friend/` (webpack
`publicPath` and React `PUBLIC_URL`), so it must be served under that path —
opening its `index.html` directly (`file://`) will **not** work (that's a blank
page). The standalone `index.html` above exists precisely to avoid that.

From this directory (`10-8gu`):

```powershell
.\serve.ps1            # http://localhost:8080/create-sex-friend/
```

or, without the helper:

```powershell
python -m http.server 8080 --directory .
```

## What stays external (not downloaded)

The quiz's photos and videos — the `Anime/`, `Realistic/`, `Hentai/` and
`Porn/` media plus the step-option images (`assets/1.webp`, `assets/step2-*.png`,
etc.) — are **not** on swipey.ai's origin. The JS maps those paths to a media
CDN at runtime:

```
https://cdnsm.swipey.ai/prelander/createsexfriend/...
```

so the replica hot-links them exactly as the original does (needs internet).

- **Backend APIs** — `swipey.ai/api/v1/...` (country-code, subscription-plans,
  payments/currency, public-configs, gtm/events) are server-side and not
  reproducible. The quiz steps through client-side without them; the
  paywall/pricing/geo calls will fail.
- **Tracking** — Mixpanel, GrowthBook, Google Tag Manager, and the inline UTM
  capture script all still fire (baked into the bundle/HTML).

## Note on locale

The app auto-detects language (browser locale / geo). With a Chinese system it
renders in Chinese ("创建你自己的 AI 女友…"); an English/other locale renders
English. This is original behaviour, not something the replica changed.
