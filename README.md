# Eva Grimes — Portfolio

[evangelinagrimes.github.io](https://evangelinagrimes.github.io/)

## Why this exists

I built this site after graduating from Christopher Newport University with a
B.S. in Computer Science, as a visual aid for employers throughout my job search. 
It's a place for me to showcase relevant project work as well as expand on various hobbies I dabble in. 

It's also an excuse to get hands-on with AI-assisted development; not just using it, but learning how to be productive with it.

## How it's built

For now, there is no framework and no build step. It's just plain HTML, CSS, and JavaScript, hosted for
free on GitHub Pages. 

- **`index.html`** — structure only. Nearly everything list-like (projects,
  skill chips) is rendered by JS rather than hand-written, so adding a new
  project doesn't mean copy-pasting markup.
- **`style.css`** — one design-token block at the top (colors, fonts,
  spacing) that the rest of the sheet builds on.
- **`script.js`** — a single `PROJECTS` object is the source of truth for
  every project card, gallery, and skill tag; everything else (the split-pane
  explorer, the lightbox, the color-coded skill filter, the cursor-reactive
  icon ring in the hero) is generated from it.
- Fonts are self-hosted-adjacent via Google Fonts (Space Grotesk, Inter, IBM
  Plex Mono), loaded non-render-blocking so they don't hold up first paint.

## Built with AI-assisted development

This site was built in collaboration with Claude Code — I drove the design
decisions, content, and direction throughout, and used it as a hands-on way
to learn what productive AI-assisted development actually looks like:
where it's a genuine accelerant (scaffolding, refactors, cross-browser CSS
quirks) and where it still needs a human calling the shots (visual taste,
what the site is actually trying to say about me).
