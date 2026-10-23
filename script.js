/**
 * See you again Nursing
 * Edit the sisters array below to update names, photos, colors, and messages.
 */

const sisters = [
  {
    id: "mod",
    name: "Mod",
    image: "images/mod.jpg",
    color: "#F8DDE8",
    subtitle: "My little flower",
    message: "Your personal message will be written here.",
    tilt: -4,
  },
  {
    id: "nok",
    name: "Nok",
    image: "images/nok.jpg",
    color: "#E9E1F7",
    subtitle: "My little star",
    message: "Your personal message will be written here.",
    tilt: 2.5,
  },
  {
    id: "tukta",
    name: "Tukta",
    image: "images/tukta.jpg",
    color: "#F9EBCB",
    subtitle: "My little sunshine",
    message: "Your personal message will be written here.",
    tilt: -2,
  },
];

const FOOTER_TEXT = "Made with love by your big brother ♡";
const HOME_TITLE = "See you again Nursing";
const HOME_TAGLINE = "A little scrapbook for three precious sisters in faith";

const app = document.getElementById("app");
const floaters = document.getElementById("floaters");

let currentView = "home";
let isTransitioning = false;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function createPhotoMarkup(sister, className = "") {
  const name = escapeHtml(sister.name);
  const color = escapeHtml(sister.color);
  const image = escapeHtml(sister.image);

  return `
    <div class="polaroid-photo ${className}" style="--accent: ${color}">
      <img
        src="${image}"
        alt="Photograph of ${name}"
        loading="lazy"
        onerror="this.classList.add('is-broken'); const fb = this.nextElementSibling; if (fb) { fb.classList.add('is-visible'); fb.removeAttribute('hidden'); }"
      />
      <div class="photo-fallback" hidden aria-hidden="true">
        ${name}
        <span>photo coming soon</span>
      </div>
    </div>
  `;
}

function renderHome() {
  const cards = sisters
    .map(
      (sister) => `
      <article class="sister-card" style="--accent: ${escapeHtml(sister.color)}">
        <div class="polaroid" style="--tilt: ${sister.tilt}deg; --accent: ${escapeHtml(sister.color)}">
          ${createPhotoMarkup(sister)}
          <p class="polaroid-caption">${escapeHtml(sister.name)}</p>
        </div>
        <button
          type="button"
          class="sister-btn"
          data-open-sister="${escapeHtml(sister.id)}"
          aria-label="Open ${escapeHtml(sister.name)}'s page"
        >
          ${escapeHtml(sister.name)}
        </button>
      </article>
    `
    )
    .join("");

  return `
    <section class="view home-view" aria-label="Homepage">
      <header class="home-header">
        <h1 class="brand">${escapeHtml(HOME_TITLE).replace("Nursing", "<em>Nursing</em>")}</h1>
        <p class="home-tagline">${escapeHtml(HOME_TAGLINE)}</p>
      </header>

      <div class="sisters-row">
        ${cards}
      </div>

      <div class="home-decor" aria-hidden="true">
        <div class="decor-row">✿ &nbsp; ♡ &nbsp; ✿</div>
        <p>three hearts · one little universe</p>
      </div>

      <p class="home-footer">${escapeHtml(FOOTER_TEXT)}</p>
    </section>
  `;
}

function renderProfile(sister) {
  const name = escapeHtml(sister.name);
  const subtitle = escapeHtml(sister.subtitle);
  const message = escapeHtml(sister.message);
  const color = escapeHtml(sister.color);

  return `
    <section class="view profile" aria-label="${name}'s page" style="--accent: ${color}">
      <button type="button" class="back-btn" data-back-home>
        ← back home
      </button>

      <div class="profile-polaroid" style="--accent: ${color}">
        ${createPhotoMarkup(sister)}
      </div>

      <div class="profile-decor" aria-hidden="true">♡ &nbsp; ✿ &nbsp; ♡</div>
      <h1 class="profile-name">${name}</h1>
      <p class="profile-subtitle">${subtitle}</p>

      <article class="message-card">
        <p class="message-label">A note for you</p>
        <p class="message-text">${message}</p>
      </article>

      <p class="profile-footer">${escapeHtml(FOOTER_TEXT)}</p>
    </section>
  `;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function showView(html, viewId) {
  if (isTransitioning) return;
  currentView = viewId;

  if (!app.firstElementChild || prefersReducedMotion()) {
    app.innerHTML = html;
    bindViewEvents();
    return;
  }

  isTransitioning = true;
  const current = app.firstElementChild;
  current.classList.add("is-leaving");

  window.setTimeout(() => {
    app.innerHTML = html;
    const next = app.firstElementChild;
    if (next) next.classList.add("is-entering");
    bindViewEvents();
    isTransitioning = false;
  }, 260);
}

function bindViewEvents() {
  app.querySelectorAll("[data-open-sister]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-open-sister");
      openSister(id);
    });
  });

  const back = app.querySelector("[data-back-home]");
  if (back) {
    back.addEventListener("click", () => openHome());
  }
}

function openHome() {
  history.pushState({ view: "home" }, "", "#home");
  document.title = HOME_TITLE;
  document.documentElement.style.setProperty("--accent", "#F8DDE8");
  showView(renderHome(), "home");
}

function openSister(id) {
  const sister = sisters.find((item) => item.id === id);
  if (!sister) return;

  history.pushState({ view: "sister", id: sister.id }, "", `#${sister.id}`);
  document.title = `${sister.name} · ${HOME_TITLE}`;
  document.documentElement.style.setProperty("--accent", sister.color);
  showView(renderProfile(sister), sister.id);
}

function routeFromHash() {
  const hash = (location.hash || "#home").replace("#", "").toLowerCase();
  if (hash === "home" || hash === "") {
    document.title = HOME_TITLE;
    document.documentElement.style.setProperty("--accent", "#F8DDE8");
    showView(renderHome(), "home");
    return;
  }

  const sister = sisters.find((item) => item.id === hash);
  if (sister) {
    document.title = `${sister.name} · ${HOME_TITLE}`;
    document.documentElement.style.setProperty("--accent", sister.color);
    showView(renderProfile(sister), sister.id);
    return;
  }

  openHome();
}

function createFloaters() {
  if (!floaters) return;
  const symbols = [
    { char: "♡", type: "heart" },
    { char: "✿", type: "flower" },
    { char: "❀", type: "flower" },
    { char: "♡", type: "heart" },
    { char: "☘", type: "leaf" },
    { char: "✿", type: "flower" },
  ];

  floaters.innerHTML = symbols
    .map((item, index) => {
      const left = 8 + ((index * 17) % 84);
      const top = 10 + ((index * 23) % 75);
      const delay = index * 1.1;
      const duration = 12 + (index % 4) * 2;
      const size = 0.85 + (index % 3) * 0.2;

      return `<span class="floater ${item.type}" style="left:${left}%;top:${top}%;animation-delay:${delay}s;animation-duration:${duration}s;font-size:${size}rem">${item.char}</span>`;
    })
    .join("");
}

window.addEventListener("popstate", () => {
  routeFromHash();
});

createFloaters();
routeFromHash();
