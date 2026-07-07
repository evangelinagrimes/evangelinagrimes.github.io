/* ─────────────────────────────────────────────────────────────
   script.js — Portfolio interactivity

   Sections (Ctrl+F to jump):
     A. PROJECT DATA       — edit here to add/change your work
     B. GALLERY & LIGHTBOX — multi-image preview + expanded viewer
     C. EXPLORER RENDERER  — coding split-pane (sidebar + detail panel)
     D. CARD RENDERER      — artistic card grid
     E. MIRROR PANEL       — reactive canvas in the About section
     F. SCROLL LOGIC       — nav reveal + section tracking
     G. REVEAL             — fade-in-on-scroll for cards and headers
     H. INIT               — wires everything together on page load
   ───────────────────────────────────────────────────────────── */


/* ═══════════════════════════════════════════════════════════════
   A. PROJECT DATA
   ─────────────────────────────────────────────────────────────
   This is the only part you'll edit regularly.

   Coding projects (appear in the split-pane explorer):
     title    — shown in the sidebar and as the panel heading
     category — short label in the accent color
     desc     — 1–2 sentences shown in the detail panel
     images   — array of image paths for the preview gallery.
                Each coding project has a matching folder under
                assets/coding/<project-slug>/ — drop numbered files
                (1.jpg, 2.jpg, …) in there and they show up here
                automatically. Until a file exists at that path, the
                gallery falls back to a placeholder slide, so it's
                safe to list paths before the images exist. Multiple
                entries render arrows and dots so the gallery can be
                scrolled through, and every image opens the expanded
                lightbox view.
     tags     — array of tech/skill chips shown below the description
     link     — primary call-to-action URL, or null
     linkLabel — button text (defaults to "View project →" if omitted)
     status   — optional badge text, or null

   Artistic projects (appear in the card grid):
     title, category, desc, img, link, status  (same as before)
   ═══════════════════════════════════════════════════════════════ */
const PROJECTS = {

  coding: [
    {
      title:     'LG Merch Site',
      category:  'Web Development',
      desc:      'End-to-end merch site for Light Garden — a Valorant beer league franchise. Built with plain HTML/CSS/JS and Shopify Buy Button integration, featuring a live ticker, product cards with variant selection, and a countdown to the next drop.',
      images:    [
        'assets/coding/lg-merch-site/Merch_Landing_Page.png',
        'assets/coding/lg-merch-site/Merch_Product_Page.png',
        'assets/coding/lg-merch-site/Merch_Order_Page.png',
      ],
      tags:      ['HTML', 'CSS', 'JavaScript', 'Shopify'],
      link:      'https://bobert-merch.github.io/',
      linkLabel: 'Live site →',
      status:    null,
    },
    {
      title:     'Cafe Canna',
      category:  'Web Development',
      desc:      'Website for Cafe Canna, an in-the-works dispensary × cafe concept. Designed and built end-to-end with Claude Code.',
      images:    [
        'assets/coding/cafe-canna/Cafe_Landing_Page.png',
        'assets/coding/cafe-canna/Cafe_About_Page.png',
        'assets/coding/cafe-canna/Cafe_Product_Page.png',
      ],
      tags:      ['HTML', 'CSS', 'JavaScript', 'Claude Code'],
      link:      'https://cafe-canna.github.io/cafecannallc/',
      linkLabel: 'Live site →',
      status:    null,
    },
    {
      title:     'Drone Research Platform',
      category:  'Research / Hardware',
      desc:      'Custom multi-rotor platform for academic drone research. Sensor fusion, flight logging, and ROS2 integration across onboard and ground-station nodes.',
      images:    [
        'assets/coding/drone-research-platform/1.jpg',
        'assets/coding/drone-research-platform/2.jpg',
        'assets/coding/drone-research-platform/3.jpg',
      ],
      tags:      ['ROS2', 'Python', 'Hardware', 'Sensor Fusion'],
      link:      null,
      linkLabel: null,
      status:    'Ongoing',
    },
    {
      title:     'ROS2 Node Architecture',
      category:  'ROS2 / Python',
      desc:      'Modular ROS2 node graph for autonomous flight tasks. Custom message types, service interfaces, and a ground-truth data logger that writes to bag files for post-flight analysis.',
      images:    [
        'assets/coding/ros2-node-architecture/1.jpg',
        'assets/coding/ros2-node-architecture/2.jpg',
      ],
      tags:      ['ROS2', 'Python', 'Pub/Sub', 'Data Logging'],
      link:      null,
      linkLabel: null,
      status:    null,
    },
    {
      title:     'Drone Network Protocol',
      category:  'Networking / Raspberry Pi',
      desc:      'Low-latency communication protocol for drone swarm coordination over a Raspberry Pi mesh network. Targets sub-20 ms round-trip for telemetry and command channels.',
      images:    [
        'assets/coding/drone-network-protocol/1.jpg',
        'assets/coding/drone-network-protocol/2.jpg',
      ],
      tags:      ['Networking', 'Raspberry Pi', 'Python', 'UDP'],
      link:      null,
      linkLabel: null,
      status:    'Research pending',
    },
    {
      title:     'Broadcast Production',
      category:  'Live Graphics / OBS',
      desc:      'Lower thirds, scorebug, transition animations, and post-match graphics for Light Garden\'s VDC match broadcasts. Produced in OBS with custom scene collections and CSS overlays.',
      images:    [
        'assets/coding/broadcast-production/1.jpg',
        'assets/coding/broadcast-production/2.jpg',
        'assets/coding/broadcast-production/3.jpg',
      ],
      tags:      ['OBS', 'CSS', 'Motion Design', 'Broadcast'],
      link:      null,
      linkLabel: null,
      status:    null,
    },
  ],

  artistic: [
    {
      title:    'Startup Brand Identity',
      category: 'Logo Design',
      desc:     'Full identity system — wordmark, icon mark, color palette, and usage guidelines for an early-stage startup.',
      img:      null,    // ▶ e.g. 'assets/brand-startup.jpg'
      link:     null,
      status:   'Case study coming',
    },
    {
      title:    'Twitch Stream Package',
      category: 'Stream Design',
      desc:     'Overlay, scene panels, alerts, and transition screens. Designed for legibility at 1080p and 1440p.',
      img:      null,
      link:     null,
      status:   'In progress',
    },
    {
      title:    'LG Sticker Pack',
      category: 'Sticker Design',
      desc:     'Holographic die-cut stickers for Light Garden — LG-branded merch for a Valorant beer league franchise.',
      img:      null,
      link:     null,
      status:   null,
    },
    {
      title:    'LG Team Branding',
      category: 'Brand Identity',
      desc:     'Full visual identity for Light Garden — primary mark, secondary lockup, jersey numbers, and Discord server assets.',
      img:      null,
      link:     null,
      status:   null,
    },
  ],

};


/* ═══════════════════════════════════════════════════════════════
   B. GALLERY & LIGHTBOX
   ─────────────────────────────────────────────────────────────
   Reusable multi-image preview + expanded viewer, used by the
   coding section's explorer panel (and available to any other
   section that wants the same "gallery of images that expand
   into a full-screen viewer with arrow navigation" behavior).

     buildGallery() — one image at a time, with prev/next arrows
                      and dot indicators once there's more than
                      one image. Clicking the image opens Lightbox.
     Lightbox       — full-screen overlay with its own prev/next
                       arrows, keyboard support, and click-outside
                       or Escape to close.
   ═══════════════════════════════════════════════════════════════ */

const Lightbox = (() => {
  let overlayEl, imageEl, placeholderEl, placeholderLabelEl, counterEl;
  let prevBtn, nextBtn, closeBtn;
  let images = [];
  let index = 0;
  let titleText = '';
  let loadToken = 0;

  // Falls back to the placeholder slide — used both for projects with
  // no image yet and for images whose file doesn't exist at that path.
  function showPlaceholder() {
    imageEl.hidden = true;
    placeholderEl.hidden = false;
    placeholderLabelEl.textContent = `Image ${index + 1} of ${images.length}`;
  }

  function render() {
    loadToken++;
    const token = loadToken;
    const src = images[index];

    if (src) {
      imageEl.hidden = false;
      placeholderEl.hidden = true;
      imageEl.alt = `${titleText} — image ${index + 1} of ${images.length}`;
      imageEl.dataset.loadToken = String(token);
      imageEl.src = src;
    } else {
      showPlaceholder();
    }

    counterEl.textContent = `${index + 1} / ${images.length}`;

    const multiple = images.length > 1;
    prevBtn.hidden = !multiple;
    nextBtn.hidden = !multiple;
  }

  function go(delta) {
    index = (index + delta + images.length) % images.length;
    render();
  }

  function open(imageList, startIndex, title) {
    images    = imageList;
    index     = startIndex || 0;
    titleText = title || '';

    render();
    overlayEl.hidden = false;
    overlayEl.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    closeBtn.focus();
  }

  function close() {
    overlayEl.hidden = true;
    overlayEl.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
  }

  function handleKeydown(e) {
    if (overlayEl.hidden) return;
    if (e.key === 'Escape')    close();
    if (e.key === 'ArrowLeft')  go(-1);
    if (e.key === 'ArrowRight') go(1);
  }

  function setup() {
    overlayEl          = document.getElementById('lightbox');
    imageEl            = document.getElementById('lightbox-img');
    placeholderEl       = document.getElementById('lightbox-placeholder');
    placeholderLabelEl = document.getElementById('lightbox-placeholder-label');
    counterEl          = document.getElementById('lightbox-counter');
    prevBtn            = overlayEl.querySelector('.lightbox-arrow--prev');
    nextBtn            = overlayEl.querySelector('.lightbox-arrow--next');
    closeBtn           = overlayEl.querySelector('.lightbox-close');

    prevBtn.addEventListener('click', () => go(-1));
    nextBtn.addEventListener('click', () => go(1));
    closeBtn.addEventListener('click', close);

    // If the file at this path doesn't exist yet, fall back to the
    // placeholder instead of showing a broken-image icon. Guarded by
    // loadToken so a stale request can't clobber a slide navigated to since.
    imageEl.addEventListener('error', () => {
      if (imageEl.dataset.loadToken === String(loadToken)) showPlaceholder();
    });

    // Click on the dimmed backdrop (not the image/controls) closes the viewer
    overlayEl.addEventListener('click', e => {
      if (e.target === overlayEl) close();
    });

    document.addEventListener('keydown', handleKeydown);
  }

  return { setup, open, close };
})(); // end Lightbox IIFE

/**
 * Build the preview gallery for a project: one image (or placeholder)
 * at a time, with prev/next arrows and dot indicators once there's
 * more than one image. Clicking the current image opens it in Lightbox.
 * Returns a DOM element ready to insert into .explorer-preview.
 */
function buildGallery(images, title) {
  const wrap = document.createElement('div');
  wrap.className = 'gallery';

  let index = 0;

  const slide = document.createElement('div');
  slide.className = 'gallery-slide';
  slide.setAttribute('role', 'button');
  slide.setAttribute('tabindex', '0');
  slide.setAttribute('aria-label', `Expand image — ${title}`);

  const dotsWrap = document.createElement('div');
  dotsWrap.className = 'gallery-dots';

  function renderPlaceholder() {
    slide.innerHTML = `
      <div class="gallery-placeholder">
        <div class="gallery-placeholder-icon">◻</div>
        <div class="gallery-placeholder-label">Image ${index + 1} of ${images.length}</div>
      </div>`;
  }

  function renderSlide() {
    const src = images[index];

    if (!src) {
      renderPlaceholder();
    } else {
      const img = document.createElement('img');
      img.alt     = `${title} — image ${index + 1} of ${images.length}`;
      img.loading = 'lazy';
      // If the file at this path doesn't exist yet, fall back to the
      // placeholder instead of showing a broken-image icon. The `contains`
      // check guards against a stale load finishing after the user has
      // already navigated to a different slide.
      img.addEventListener('error', () => {
        if (slide.contains(img)) renderPlaceholder();
      });
      img.src = src;
      slide.replaceChildren(img);
    }

    dotsWrap.querySelectorAll('.gallery-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function go(delta) {
    index = (index + delta + images.length) % images.length;
    renderSlide();
  }

  slide.addEventListener('click', () => Lightbox.open(images, index, title));
  slide.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      Lightbox.open(images, index, title);
    }
  });

  wrap.appendChild(slide);

  if (images.length > 1) {
    const prevBtn = document.createElement('button');
    prevBtn.className = 'gallery-arrow gallery-arrow--prev';
    prevBtn.setAttribute('aria-label', 'Previous image');
    prevBtn.innerHTML = '‹';
    prevBtn.addEventListener('click', e => { e.stopPropagation(); go(-1); });

    const nextBtn = document.createElement('button');
    nextBtn.className = 'gallery-arrow gallery-arrow--next';
    nextBtn.setAttribute('aria-label', 'Next image');
    nextBtn.innerHTML = '›';
    nextBtn.addEventListener('click', e => { e.stopPropagation(); go(1); });

    wrap.append(prevBtn, nextBtn);

    images.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = `gallery-dot${i === 0 ? ' active' : ''}`;
      dot.setAttribute('role', 'button');
      dot.setAttribute('aria-label', `Go to image ${i + 1}`);
      dot.addEventListener('click', e => {
        e.stopPropagation();
        index = i;
        renderSlide();
      });
      dotsWrap.appendChild(dot);
    });

    wrap.appendChild(dotsWrap);
  }

  renderSlide();
  return wrap;
}


/* ═══════════════════════════════════════════════════════════════
   C. EXPLORER RENDERER
   ─────────────────────────────────────────────────────────────
   Builds the split-pane explorer for the Coding section:
   left = sidebar list of project tabs
   right = detail panel (image gallery + info)

   You shouldn't need to edit this — add/change entries in PROJECTS.
   ═══════════════════════════════════════════════════════════════ */

/**
 * Build the DOM for the right-hand detail panel of a project.
 * Returns a fragment ready to drop into .explorer-panel.
 */
function buildExplorerPanel(project) {
  const panel = document.createDocumentFragment();

  // ── Preview zone (top): image gallery ──
  const previewWrap = document.createElement('div');
  previewWrap.className = 'explorer-preview';
  previewWrap.appendChild(buildGallery(project.images, project.title));
  panel.appendChild(previewWrap);

  // ── Tag chips ──
  const tagsHTML = project.tags && project.tags.length
    ? `<div class="explorer-tags">
         ${project.tags.map(t => `<span class="explorer-tag">${t}</span>`).join('')}
       </div>`
    : '';

  // ── Links ──
  let linksHTML = '';
  if (project.link) {
    const label = project.linkLabel || 'View project →';
    linksHTML = `
      <div class="explorer-links">
        <a
          href="${project.link}"
          class="explorer-link"
          target="_blank"
          rel="noopener noreferrer"
        >${label}</a>
      </div>`;
  }

  // ── Status badge ──
  const statusHTML = project.status
    ? `<div class="card-status">${project.status}</div>`
    : '';

  const info = document.createElement('div');
  info.className = 'explorer-info';
  info.innerHTML = `
    <div class="explorer-info-category">${project.category}</div>
    <h3>${project.title}</h3>
    <p class="explorer-info-desc">${project.desc}</p>
    ${tagsHTML}
    ${linksHTML}
    ${statusHTML}
  `;
  panel.appendChild(info);

  return panel;
}

/**
 * Populate the coding section's split-pane explorer.
 * Renders sidebar tabs and the initial detail panel for the first project.
 */
function buildExplorer(projects, sidebarEl, panelEl) {
  if (!projects.length || !sidebarEl || !panelEl) return;

  // Build sidebar tabs
  projects.forEach((project, i) => {
    const btn = document.createElement('button');
    btn.className = `explorer-tab${i === 0 ? ' active' : ''}`;
    btn.dataset.idx = String(i);
    btn.setAttribute('aria-label', project.title);
    btn.innerHTML = `${project.title}<span class="explorer-tab-category">${project.category}</span>`;

    btn.addEventListener('click', () => {
      // Deactivate all tabs
      sidebarEl.querySelectorAll('.explorer-tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');

      // Fade out, swap content, fade in
      panelEl.classList.add('swapping');
      setTimeout(() => {
        panelEl.replaceChildren(buildExplorerPanel(project));
        panelEl.classList.remove('swapping');
        panelEl.classList.add('swapping-in');
        setTimeout(() => panelEl.classList.remove('swapping-in'), 220);
      }, 150);
    });

    sidebarEl.appendChild(btn);
  });

  // Render first project's detail panel immediately
  panelEl.replaceChildren(buildExplorerPanel(projects[0]));
}


/* ═══════════════════════════════════════════════════════════════
   D. CARD RENDERER
   ─────────────────────────────────────────────────────────────
   Builds the card grid for the Artistic section.
   You shouldn't need to edit this.
   ═══════════════════════════════════════════════════════════════ */

/** Build one card <article> element from a single project object. */
function buildCard(project) {
  const card = document.createElement('article');
  card.className = 'project-card reveal';

  // ── Image zone ──
  const imgWrap = document.createElement('div');
  imgWrap.className = 'card-img';

  if (project.img) {
    const img = document.createElement('img');
    img.src     = project.img;
    img.alt     = project.title;
    img.loading = 'lazy';
    imgWrap.appendChild(img);
  } else {
    const ph = document.createElement('div');
    ph.className = 'card-img-placeholder';
    ph.innerHTML = `
      <div class="card-img-placeholder-icon">◻</div>
      <div class="card-img-placeholder-label">Image placeholder</div>
    `;
    imgWrap.appendChild(ph);
  }

  // ── Card body ──
  const body = document.createElement('div');
  body.className = 'card-body';

  const cat = document.createElement('div');
  cat.className   = 'card-category';
  cat.textContent = project.category;

  const title = document.createElement('h3');
  title.className   = 'card-title';
  title.textContent = project.title;

  const desc = document.createElement('p');
  desc.className   = 'card-desc';
  desc.textContent = project.desc;

  body.append(cat, title, desc);

  if (project.link) {
    const link = document.createElement('a');
    link.className   = 'card-link';
    link.href        = project.link;
    link.target      = '_blank';
    link.rel         = 'noopener noreferrer';
    link.textContent = 'View project →';
    body.appendChild(link);
  }

  if (project.status) {
    const badge = document.createElement('div');
    badge.className   = 'card-status';
    badge.textContent = project.status;
    body.appendChild(badge);
  }

  card.append(imgWrap, body);
  return card;
}

/** Inject all project cards into the artistic grid. */
function buildGrid(projects, gridEl) {
  if (!gridEl) return;
  projects.forEach(p => gridEl.appendChild(buildCard(p)));
}

/** Wire up both sections from PROJECTS data. */
function renderProjects() {
  // Coding → split-pane explorer
  buildExplorer(
    PROJECTS.coding,
    document.getElementById('coding-sidebar'),
    document.getElementById('coding-panel')
  );

  // Artistic → card grid
  buildGrid(
    PROJECTS.artistic,
    document.getElementById('artistic-grid')
  );
}


/* ═══════════════════════════════════════════════════════════════
   E. MIRROR PANEL
   ─────────────────────────────────────────────────────────────
   A 2D canvas in the About section. Simulates a fluid surface
   using a height-field wave algorithm — each pixel's displacement
   propagates to its neighbors each frame, like ripples on water.
   Moving your cursor over the panel disturbs the surface.
   ═══════════════════════════════════════════════════════════════ */
const MirrorPanel = (() => {

  let ctx, w, h, rafId;

  /* Two height-field buffers — ping-pong to avoid allocating each frame */
  let buf0, buf1;

  let mouseX = -1, mouseY = -1;
  let isHovering = false;

  function allocBuffers() {
    buf0 = new Float32Array(w * h);
    buf1 = new Float32Array(w * h);
  }

  function idx(x, y) { return y * w + x; }

  function disturb(px, py, amount) {
    const cx = Math.round(px);
    const cy = Math.round(py);
    const r  = 4;
    for (let dy = -r; dy <= r; dy++) {
      for (let dx = -r; dx <= r; dx++) {
        if (dx*dx + dy*dy > r*r) continue;
        const nx = cx + dx, ny = cy + dy;
        if (nx > 0 && nx < w - 1 && ny > 0 && ny < h - 1) {
          buf0[idx(nx, ny)] = amount;
        }
      }
    }
  }

  /* Discrete wave equation: new = (neighbors_sum / 2) − old, damped */
  function simulate() {
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        buf1[idx(x, y)] =
          (buf0[idx(x-1, y)] +
           buf0[idx(x+1, y)] +
           buf0[idx(x, y-1)] +
           buf0[idx(x, y+1)]) * 0.5
          - buf1[idx(x, y)];

        buf1[idx(x, y)] *= 0.97;
      }
    }
    [buf0, buf1] = [buf1, buf0];
  }

  function draw() {
    const imgData = ctx.createImageData(w, h);
    const px      = imgData.data;

    const bR = 12, bG = 16, bB = 30;

    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const gx = buf0[idx(x+1, y)] - buf0[idx(x-1, y)];
        const gy = buf0[idx(x, y+1)] - buf0[idx(x, y-1)];

        const sx = Math.max(0, Math.min(w-1, Math.round(x + gx)));
        const sy = Math.max(0, Math.min(h-1, Math.round(y + gy)));

        const spec  = Math.max(0, -buf0[idx(sx, sy)]) * 1.8;
        const light = Math.min(255, spec * 3.5);

        const i = (y * w + x) * 4;
        px[i]   = Math.min(255, bR + light);
        px[i+1] = Math.min(255, bG + light);
        px[i+2] = Math.min(255, bB + Math.floor(light * 1.15));
        px[i+3] = 255;
      }
    }

    ctx.putImageData(imgData, 0, 0);
  }

  function loop() {
    rafId = requestAnimationFrame(loop);
    if (isHovering && mouseX >= 0) disturb(mouseX, mouseY, 35);
    simulate();
    draw();
  }

  function setup(canvas) {
    ctx = canvas.getContext('2d');

    const scale = 0.5;
    w = Math.max(1, Math.floor(canvas.offsetWidth  * scale)) || 200;
    h = Math.max(1, Math.floor(canvas.offsetHeight * scale)) || 200;
    canvas.width  = w;
    canvas.height = h;

    allocBuffers();
    disturb(w * 0.5, h * 0.5, 80);

    const wrap = document.getElementById('mirror-wrap');
    if (wrap) {
      wrap.addEventListener('mousemove', e => {
        const r  = canvas.getBoundingClientRect();
        mouseX = (e.clientX - r.left)  / r.width  * w;
        mouseY = (e.clientY - r.top)   / r.height * h;
        disturb(mouseX, mouseY, 110);
        isHovering = true;
      });

      wrap.addEventListener('mouseleave', () => { isHovering = false; });

      wrap.addEventListener('touchmove', e => {
        e.preventDefault();
        const r     = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        disturb(
          (touch.clientX - r.left) / r.width  * w,
          (touch.clientY - r.top)  / r.height * h,
          110
        );
      }, { passive: false });
    }

    loop();
  }

  return { setup };

})();  // end MirrorPanel IIFE


/* ═══════════════════════════════════════════════════════════════
   F. SCROLL LOGIC
   ─────────────────────────────────────────────────────────────
   Shows/hides the nav after the hero scrolls out of view.
   ═══════════════════════════════════════════════════════════════ */
function setupScrollLogic() {
  const nav  = document.getElementById('site-nav');
  const hero = document.getElementById('hero');
  if (!nav || !hero) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > hero.offsetHeight * 0.6) {
      nav.classList.add('nav--visible');
    } else {
      nav.classList.remove('nav--visible');
    }
  }, { passive: true });
}


/* ═══════════════════════════════════════════════════════════════
   G. SCROLL REVEAL
   ─────────────────────────────────────────────────────────────
   IntersectionObserver adds .revealed to .reveal elements when
   they enter the viewport. CSS handles the fade-in animation.
   ═══════════════════════════════════════════════════════════════ */
function setupReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.08,
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}


/* ═══════════════════════════════════════════════════════════════
   H. INIT
   ─────────────────────────────────────────────────────────────
   Runs once the HTML is fully parsed.
   Cards/tabs must be in the DOM before setupReveal() observes them.
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  // 1. Wire up the lightbox overlay (used by galleries built in step 2)
  Lightbox.setup();

  // 2. Build the coding explorer and artistic card grid
  renderProjects();

  // 3. Check for reduced-motion preference once, up front
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 4. Scroll-driven nav reveal
  setupScrollLogic();

  // 5. Scroll reveal for headers and cards
  setupReveal();

  // 6. Mirror panel (skip for reduced-motion users)
  if (!reduceMotion) {
    requestAnimationFrame(() => {
      const mc = document.getElementById('mirror-canvas');
      if (mc) MirrorPanel.setup(mc);
    });
  }

  // 7. Footer year — fills in automatically
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
