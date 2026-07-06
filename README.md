# Personal Portfolio

A single-page portfolio site built with plain HTML, CSS, and JavaScript — no build step, no frameworks, no dependencies.

---

## Local preview

Open `index.html` directly in your browser for most things. To test the merch site iframe (it requires same-origin), serve over a local HTTP server:

```bash
# Python 3 (built-in)
python -m http.server 8080
```

Then visit `http://localhost:8080`.

---

## GitHub Pages deployment

1. Push this folder to your GitHub repo (e.g. `yourusername.github.io`).
2. Go to **Settings → Pages** in the repo.
3. Set Source to **Deploy from a branch**, select `main`, folder `/ (root)`.
4. Your site appears at `https://yourusername.github.io` within a minute or two.

---

## Editing content

### Add or change coding projects

Coding projects live in `PROJECTS.coding` near the top of `script.js`. Each is an object:

```js
{
  title:     'Project Name',
  category:  'Category Label',      // shown in accent color
  desc:      'One or two sentences.',
  iframe:    'merch/index.html',    // live preview embed URL, or null
  img:       null,                  // fallback image if no iframe, or null
  tags:      ['HTML', 'CSS', 'JS'], // chips shown in the detail panel
  link:      'https://...',         // primary link button, or null
  linkLabel: 'Live site →',         // button text (optional, defaults to "View project →")
  status:    'In progress',         // optional badge, or null
}
```

### Add or change artistic projects

Artistic projects live in `PROJECTS.artistic` in `script.js`. Each is an object:

```js
{
  title:    'Project Name',
  category: 'Category Label',
  desc:     'One or two sentences.',
  img:      'assets/filename.jpg',  // or null for a placeholder
  link:     'https://...',          // or null
  status:   'In progress',          // or null
}
```

### Change your name, tagline, bio, contact

Edit `index.html`. Spots marked with `<!-- ▶ ... -->` comments show exactly what to swap out.

### Change section descriptions

Edit the `<p class="region-sub">` paragraphs in `index.html` under each section.

### Adjust colors or fonts

Design tokens are CSS custom properties at the top of `style.css` inside `:root { ... }`:

| Token | What it controls |
|-------|-----------------|
| `--accent-coding` | Cyan — used in the Coding section and explorer |
| `--accent-artistic` | Gold — used in the Artistic section and cards |
| `--accent-hero-a` | Teal — hero name gradient start |
| `--accent-hero-b` | Violet — hero name gradient end |
| `--bg-coding` | Deep navy background for the Coding section |
| `--bg-artistic` | Dark warm slate background for the Artistic section |

---

## Files

| File | What it does |
|------|-------------|
| `index.html` | Structure — sections, nav, footer. Edit copy and `▶` placeholders here. |
| `style.css` | All visual design — tokens, layout, per-section animations, explorer styles. |
| `script.js` | Project data (Section A) + all interactivity (explorer, mirror, scroll logic). |
| `assets/` | Put your project images here. |
| `merch/` | The LG merch site — embedded as a live iframe in the Coding section. |

---

## How the backgrounds work

Each section has its own CSS animation running on a `::before` pseudo-element.

**Hero** — a slow-breathing radial glow (`@keyframes hero-breathe`). Teal and violet radial gradients pulse in opacity over 7 seconds.

**Coding section** — a drifting fine grid (`@keyframes grid-drift`). Two sets of `repeating-linear-gradient` lines at 40 px intervals slide diagonally across the deep navy background, giving a technical/systematic feel.

**Artistic section** — a warm radial pulse (`@keyframes art-pulse`). A single radial gradient scales and rotates gently over 10 seconds on the dark slate background, creating an organic/creative atmosphere.

All animations pause automatically when the user has **Reduce Motion** enabled in their OS.

---

## How the explorer works

The Coding section uses a split-pane UI: a sidebar on the left lists project names; the right panel shows a live iframe (or image/placeholder) plus the project description, tags, and link.

Clicking a sidebar tab calls `buildExplorerPanel(project)` in `script.js`, which generates the panel HTML and swaps it in with a short fade transition. To add a new coding project, add an entry to `PROJECTS.coding` in `script.js` — the tab and panel are generated automatically.
