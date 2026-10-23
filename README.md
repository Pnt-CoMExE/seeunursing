# See you again Nursing

A soft pastel scrapbook website — a personal gift from a big brother to his three younger sisters in faith: **Mod**, **Nok**, and **Tukta**.

Built with plain HTML, CSS, and vanilla JavaScript. No frameworks, no backend, no login.

## Run locally

Open a terminal in this folder and start a simple static server:

```bash
python3 -m http.server 3847
```

Then open [http://127.0.0.1:3847](http://127.0.0.1:3847).

You can also open `index.html` directly in a browser, but a local server is recommended so images and routing behave consistently.

## Project structure

```text
├── index.html
├── style.css
├── script.js
├── README.md
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
3. Refresh the page.

If a photo file is missing or broken, a gentle pastel placeholder appears instead of a broken image icon.

You can also change the path in `script.js` inside the `sisters` config if you prefer different filenames.

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

Change `message`, `subtitle`, `name`, `image`, or `color` there — the homepage and profile pages update automatically.

## Customize more

| What | Where |
| --- | --- |
| Site title / tagline / footer | `HOME_TITLE`, `HOME_TAGLINE`, `FOOTER_TEXT` in `script.js` |
| Accent colors | `color` on each sister in `script.js` |
| Layout & pastel styling | `style.css` |

## Design notes

- Cream scrapbook frame with Polaroid-style photos
- Soft pink primary accent; Mod pink, Nok lavender, Tukta butter yellow
- Gentle fade transitions and floating hearts/flowers
- Respects `prefers-reduced-motion`
- Responsive: three cards in a row on desktop, stacked on mobile
