# See you again Nursing

A soft pastel scrapbook website — a personal gift from a big brother to his three younger sisters in faith: **Mod**, **Nok**, and **Tukta**.

Built with plain HTML, CSS, and vanilla JavaScript. No frameworks, no backend, no login.

Works locally and on **GitHub Pages**.

## Run locally

```bash
python3 -m http.server 3847
```

Open [http://127.0.0.1:3847](http://127.0.0.1:3847).

On first visit, tap the soft card to open the scrapbook and start the cute background music. Use the ♪ button (bottom-right) to mute/unmute.

## Deploy to GitHub Pages

This project is already GitHub Pages–ready:

- Static files only (`index.html`, CSS, JS, images, audio)
- Relative asset paths (no leading `/`)
- Hash routing (`#mod`, `#nok`, `#tukta`) — no server rewrite needed
- `.nojekyll` included so GitHub won’t process the site with Jekyll

### Steps

1. Push this repo to GitHub.
2. Open the repo → **Settings** → **Pages**.
3. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: `main` (or your default branch)
   - Folder: `/ (root)`
4. Save, wait a minute, then open the Pages URL, for example:
   - `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

If the site is in a project repo (not `username.github.io`), the relative paths still work because CSS, JS, images, and audio are loaded next to `index.html`.

## Project structure

```text
├── index.html
├── style.css
├── script.js
├── README.md
├── .nojekyll
├── audio/
│   └── bgm.mp3
└── images/
    ├── mod.jpg
    ├── nok.jpg
    └── tukta.jpg
```

## Replace the photographs

1. Prepare three photos (portrait works best).
2. Save them as:
   - `images/mod.jpg`
   - `images/nok.jpg`
   - `images/tukta.jpg`
3. Refresh the page (or push again if using GitHub Pages).

If a photo file is missing or broken, a gentle pastel placeholder appears instead of a broken image icon.

## Edit personal messages

Open `script.js` and edit the `sisters` array at the top:

```javascript
const sisters = [
  {
    id: "mod",
    name: "Mod",
    image: "images/mod.jpg",
    color: "#F8DDE8",
    subtitle: "My little flower",
    message: "Your personal message will be written here.",
  },
  // ...
];
```

## Change the background music

Replace `audio/bgm.mp3` with your own cute track (MP3 recommended).

Optional volume / path settings in `script.js`:

```javascript
const musicConfig = {
  src: "audio/bgm.mp3",
  volume: 0.38,
  storageKey: "see-you-again-music-muted",
};
```

## Customize more

| What | Where |
| --- | --- |
| Site title / tagline / footer | `HOME_TITLE`, `HOME_TAGLINE`, `FOOTER_TEXT` in `script.js` |
| Accent colors | `color` on each sister in `script.js` |
| Layout & pastel styling | `style.css` |

## Design notes

- Cream scrapbook frame with Polaroid-style photos
- Soft pink primary accent; Mod pink, Nok lavender, Tukta butter yellow
- Gentle fade transitions, floating hearts/flowers, and soft music-box BGM
- Respects `prefers-reduced-motion`
- Responsive: three cards in a row on desktop, stacked on mobile
