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
     media    — array of image/video paths for the preview gallery.
                Video files (.mp4/.webm/.mov/.m4v/.ogv) render as a
                native <video controls> player instead of an image.
                Each coding project has a matching folder under
                assets/coding/<project-slug>/ — drop numbered files
                (1.jpg, 2.jpg, …) in there and they show up here
                automatically. Until a file exists at that path, the
                gallery falls back to a placeholder slide, so it's
                safe to list paths before the files exist. Multiple
                entries render arrows and dots so the gallery can be
                scrolled through; images (not videos — see below)
                open the expanded lightbox view.
     tags     — array of tech/skill chips shown below the description
     links    — array of call-to-action buttons: { url, label }.
                Renders one button per entry, in order. Omit or use
                an empty array for a project with no links.
     status   — optional badge text, or null

   Artistic projects (appear in the card grid):
     title, category, desc, img, link, status  (same as before)
   ═══════════════════════════════════════════════════════════════ */
const PROJECTS = {

  coding: [
    {
      title:     'Flexible Drones Research',
      category:  'Research / Hardware',
      desc:      'I conducted hands-on research on autonomous drone control using the Crazyflie and Pihawk systems. On my team of four, I implemented heterogeneous drone control with ROS2 (Kilted) action-based feedback for the Pihawks (Pixhawk 2.4.8 flight controller mounted on a raspberry pi) communicating commands via a telemetry module using the MAVLink protocol. The drones are flown in a netted drone cage using an Optitrack sensor system to track postition data. I configured the raspberry pi\'s on the Pihawks to take in the position data and fuse it with the flight controller via a direct UART connection.',
      media:     [
        'assets/coding/drone-research-platform/capwic_poster.jpg',
        'assets/coding/drone-research-platform/drones-2.jpg',
        'assets/coding/drone-research-platform/Drone_Flying_Web.mp4',
        'assets/coding/drone-research-platform/First3Sails_Web.mp4',
        'assets/coding/drone-research-platform/DSC_5330.JPG',
      ],
      tags:      ['ROS2', 'Python', 'Pihawk', 'Crazyflie', 'Optitrack'],
      links:     [
        { url: 'https://github.com/CNURobotics/flexible_drones', label: '-> Official GitHub Release <-' },
        { url: 'https://ieeexplore.ieee.org/document/11476332', label: '-> IEEE paper <-' },
      ],
      status:    'Ongoing',
    },
    {
      title:     'Franchise Merch Webpage',
      category:  'Web Development',
      desc:      'I created this webpage as a platform to sell stickers and various other franchise related merchandise. Valorant Draft Circuit (VDC) is a For-Fun Valorant League and Light Garden (LG) is the franchise I am representing. It is a static website built with HTML, CSS, and JavaScript. I used Shopify to handle the e-commerce functionality. This is an ongoing project and I will be adding more merchandise to the site in the future.  ',
      media:     [
        'assets/coding/lg-merch-site/Merch_Landing_Page.png',
        'assets/coding/lg-merch-site/Merch_Product_Page.png',
        'assets/coding/lg-merch-site/Merch_Order_Page.png',
      ],
      tags:      ['HTML', 'CSS', 'JavaScript', 'Shopify', 'Claude Code'],
      links:     [
        { url: 'https://bobert-merch.github.io/', label: '-> Visit Live site <-' },
      ],
      status:    null,
    },
    {
      title:     'Cafe Canna Webpage',
      category:  'Web Development',
      desc:      'Website for Cafe Canna, an in-the-works dispensary × cafe concept. Designed and built end-to-end with Claude Code.',
      media:     [
        'assets/coding/cafe-canna/Cafe_Landing_Page.png',
        'assets/coding/cafe-canna/Cafe_About_Page.png',
        'assets/coding/cafe-canna/Cafe_Product_Page.png',
      ],
      tags:      ['HTML', 'CSS', 'JavaScript', 'Claude Code'],
      links:     [
        { url: 'https://cafe-canna.github.io/cafecannallc/', label: '-> Visit Live site <-' },
      ],
      status:    null,
    },
    {
      title:     'Team Scouting Spreadsheet',
      category:  'Spreadsheet / Automation',
      desc:      'To automate aspects of scouting for a Valorant Esport franchise, I created a spreadsheet that took in raw CSV data and auto-sorted players by tier and MMR. Any notes set to a specific player will follow them. Additionally, there is a team planner aspect that uses pivot tables and a lookup feature.',
      media:     [
        'assets/coding/team-scouting-spreadsheet/VDC_Raw.png',
        'assets/coding/team-scouting-spreadsheet/VDC_Master.png',
        'assets/coding/team-scouting-spreadsheet/VDC_Details.png',
        'assets/coding/team-scouting-spreadsheet/VDC_Pivot.png',
        'assets/coding/team-scouting-spreadsheet/VDC_Teams.png',
      ],
      tags:      ['Google Sheets', 'Pivot Tables', 'Data Automation'],
      links:     [
        { url: 'https://docs.google.com/spreadsheets/d/1DYBbGsZIkx_Ndu5gCp6SY9YLeocEbdeAOWur2p733J8/edit?usp=sharing', label: '-> View Template <-' },
      ],
      status:    null,
    },
    {
      title:     'Senior Resident Assistant Duty Schedule',
      category:  'Spreadsheet / Automation',
      desc:      'As a Senior Resident Assistant (SRA) I was responsible for scheduling duty for my staff of Resident Assistants (RAs). I created this spreadsheet to act as a landing page for them so they had a visual reference of when they worked. This page also served as a swapping hub, where RAs could note what shifts they wanted to swap, wanted to keep, etc. The Master_Duty_Schedule tab serves as the primary data tab which both visual sheets refer to. In addition to the spreadsheet, I created an appscript that automatically created calendar events detailing who was working, the shift type, and the length of the shift.',
      media:     [
        'assets/coding/sra-duty-schedule/SRA_Main.png',
        'assets/coding/sra-duty-schedule/SRA_Swap.png',
        'assets/coding/sra-duty-schedule/SRA_Master.png',
        'assets/coding/sra-duty-schedule/SRA_Calendar.png',
      ],
      tags:      ['Google Sheets', 'Scheduling', 'Data Automation'],
      links:     [
        { url: 'https://docs.google.com/spreadsheets/d/1bC61uJsBbzzgJt6sBgBHMXJ60ZfcMeZZpcyo5NiNbQU/edit?usp=sharing', label: '-> View Spreadsheet <-' },
      ],
      status:    null,
    },
    {
      title:     'Day Out Generator',
      category:  'Application Development',
      desc:      'With the use of the Google Places API, this application generates a day out with various activities — a restaurant, an activity, then dessert.',
      media:     [
        'assets/coding/day-out-generator/Egrimes_Demo_Web.mp4',
      ],
      tags:      ['Python', 'Google Places API'],
      links:     [
        { url: 'https://github.com/evangelinagrimes/Day_Out_Generator_V1', label: '-> GitHub repo <-' },
      ],
      status:    null,
    },
    {
      title:     'UAS Competition Webpage',
      category:  'Web Development',
      desc:      'I initiated and led the development of the Unmanned Aerial System (UAS) Club\'s website to help the team meet the qualification requirements for the international SUAS competition. This was the first website the four of us had ever created, so while it is far from perfect, it was an excellent learning opportunity. We held weekly meetings during the semester to review our progress, discuss challenges, and set goals for the upcoming week.',
      media:     [
        'assets/coding/uas-competition-webpage/UAS_About.png',
        'assets/coding/uas-competition-webpage/UAS_Team.png',
      ],
      tags:      ['HTML', 'CSS', 'JavaScript'],
      links:     [
        { url: 'https://cnuuas.github.io/', label: '-> Visit Live site <-' },
        { url: 'https://github.com/CNUUAS/CNUUAS.github.io', label: '-> GitHub repo <-' },
      ],
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

const VIDEO_EXTENSIONS = ['mp4', 'webm', 'mov', 'm4v', 'ogv'];

/** True if the path's extension is a video format the gallery/lightbox play natively. */
function isVideoPath(path) {
  const ext = (path.split('.').pop() || '').toLowerCase();
  return VIDEO_EXTENSIONS.includes(ext);
}

/**
 * Adds left/right swipe detection to an element for touch devices.
 * Calls onSwipeLeft() when the user drags left past the threshold
 * (next), onSwipeRight() when they drag right (prev).
 *
 * Once a drag reads as clearly more horizontal than vertical, it
 * calls preventDefault() on the rest of that gesture so the page
 * doesn't scroll/rubber-band underneath the swipe — without that,
 * the browser's native scroll runs concurrently and the swipe reads
 * as janky. A gesture that stays more vertical than horizontal is
 * left alone so normal page scrolling still works.
 */
function attachSwipe(el, { onSwipeLeft, onSwipeRight }) {
  const THRESHOLD = 40;
  const INTENT_DEADZONE = 10;
  let startX = 0, startY = 0, tracking = false, horizontalIntent = false;

  function reset() { tracking = false; horizontalIntent = false; }

  el.addEventListener('touchstart', e => {
    // Let native video controls (scrubbing, tapping play) handle their
    // own touches instead of being hijacked as a slide-change gesture.
    if (e.touches.length > 1 || e.target.closest('video')) { reset(); return; }
    const t = e.touches[0];
    startX = t.clientX;
    startY = t.clientY;
    tracking = true;
    horizontalIntent = false;
  }, { passive: true });

  el.addEventListener('touchmove', e => {
    if (!tracking || e.touches.length > 1) return;
    const t  = e.touches[0];
    const dx = t.clientX - startX;
    const dy = t.clientY - startY;

    if (!horizontalIntent && Math.abs(dx) > INTENT_DEADZONE && Math.abs(dx) > Math.abs(dy)) {
      horizontalIntent = true;
    }
    // Claim the gesture once it's clearly a horizontal swipe, so the
    // page can't scroll out from under it for the rest of the drag.
    if (horizontalIntent) e.preventDefault();
  }, { passive: false });

  el.addEventListener('touchend', e => {
    if (!tracking) return;
    const wasHorizontal = horizontalIntent;
    reset();
    if (!wasHorizontal) return;

    const t  = e.changedTouches[0];
    const dx = t.clientX - startX;
    if (Math.abs(dx) < THRESHOLD) return;
    if (dx < 0) onSwipeLeft  && onSwipeLeft();
    else        onSwipeRight && onSwipeRight();
  }, { passive: true });

  el.addEventListener('touchcancel', reset, { passive: true });
}

const Lightbox = (() => {
  let overlayEl, imageEl, videoEl, placeholderEl, placeholderLabelEl, counterEl;
  let prevBtn, nextBtn, closeBtn;
  let media = [];
  let index = 0;
  let titleText = '';
  let loadToken = 0;

  // Falls back to the placeholder slide — used both for projects with
  // no image/video yet and for files that don't exist at that path.
  function showPlaceholder() {
    imageEl.hidden = true;
    videoEl.hidden = true;
    placeholderEl.hidden = false;
    placeholderLabelEl.textContent = `Item ${index + 1} of ${media.length}`;
  }

  function render() {
    loadToken++;
    const token = loadToken;
    const src = media[index];

    // Stop any playback before swapping slides.
    videoEl.pause();

    if (src && isVideoPath(src)) {
      imageEl.hidden = true;
      videoEl.hidden = false;
      placeholderEl.hidden = true;
      videoEl.setAttribute('aria-label', `${titleText} — video ${index + 1} of ${media.length}`);
      videoEl.dataset.loadToken = String(token);
      videoEl.src = src;
    } else if (src) {
      imageEl.hidden = false;
      videoEl.hidden = true;
      placeholderEl.hidden = true;
      imageEl.alt = `${titleText} — image ${index + 1} of ${media.length}`;
      imageEl.dataset.loadToken = String(token);
      imageEl.src = src;
    } else {
      showPlaceholder();
    }

    counterEl.textContent = `${index + 1} / ${media.length}`;

    const multiple = media.length > 1;
    prevBtn.hidden = !multiple;
    nextBtn.hidden = !multiple;
  }

  function go(delta) {
    index = (index + delta + media.length) % media.length;
    render();
  }

  function open(mediaList, startIndex, title) {
    media     = mediaList;
    index     = startIndex || 0;
    titleText = title || '';

    render();
    overlayEl.hidden = false;
    overlayEl.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    closeBtn.focus();
  }

  function close() {
    videoEl.pause();
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
    videoEl            = document.getElementById('lightbox-video');
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
    // placeholder instead of a broken image/player. Guarded by loadToken
    // so a stale request can't clobber a slide navigated to since.
    imageEl.addEventListener('error', () => {
      if (imageEl.dataset.loadToken === String(loadToken)) showPlaceholder();
    });
    videoEl.addEventListener('error', () => {
      if (videoEl.dataset.loadToken === String(loadToken)) showPlaceholder();
    });

    // Click on the dimmed backdrop (not the image/controls) closes the viewer
    overlayEl.addEventListener('click', e => {
      if (e.target === overlayEl) close();
    });

    document.addEventListener('keydown', handleKeydown);

    // Touch devices can swipe left/right instead of tapping the arrows
    attachSwipe(overlayEl, {
      onSwipeLeft:  () => go(1),
      onSwipeRight: () => go(-1),
    });
  }

  return { setup, open, close };
})(); // end Lightbox IIFE

/**
 * Build the preview gallery for a project: one image/video (or
 * placeholder) at a time, with prev/next arrows and dot indicators
 * once there's more than one item. Clicking the current image opens
 * it in Lightbox; videos play inline via their own native controls
 * instead (so a tap on the play button doesn't also pop the lightbox).
 * Returns a DOM element ready to insert into .explorer-preview.
 */
function buildGallery(media, title) {
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
        <div class="gallery-placeholder-label">Item ${index + 1} of ${media.length}</div>
      </div>`;
  }

  function renderSlide() {
    const src = media[index];

    if (!src) {
      renderPlaceholder();
    } else if (isVideoPath(src)) {
      const video = document.createElement('video');
      video.controls    = true;
      video.playsInline = true;
      video.preload     = 'metadata';
      video.setAttribute('aria-label', `${title} — video ${index + 1} of ${media.length}`);
      // If the file at this path doesn't exist yet, fall back to the
      // placeholder instead of a broken player. The `contains` check
      // guards against a stale load finishing after the user has
      // already navigated to a different slide.
      video.addEventListener('error', () => {
        if (slide.contains(video)) renderPlaceholder();
      });
      video.src = src;
      slide.replaceChildren(video);
    } else {
      const img = document.createElement('img');
      img.alt     = `${title} — image ${index + 1} of ${media.length}`;
      img.loading = 'lazy';
      // Same fallback as above, for images.
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
    index = (index + delta + media.length) % media.length;
    renderSlide();
  }

  // Videos have their own native play/seek/fullscreen controls, so
  // tapping one shouldn't also pop the lightbox open.
  function openLightboxIfImage() {
    const src = media[index];
    if (src && isVideoPath(src)) return;
    Lightbox.open(media, index, title);
  }

  slide.addEventListener('click', openLightboxIfImage);
  slide.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightboxIfImage();
    }
  });

  wrap.appendChild(slide);

  if (media.length > 1) {
    const prevBtn = document.createElement('button');
    prevBtn.className = 'gallery-arrow gallery-arrow--prev';
    prevBtn.setAttribute('aria-label', 'Previous item');
    prevBtn.innerHTML = '‹';
    prevBtn.addEventListener('click', e => { e.stopPropagation(); go(-1); });

    const nextBtn = document.createElement('button');
    nextBtn.className = 'gallery-arrow gallery-arrow--next';
    nextBtn.setAttribute('aria-label', 'Next item');
    nextBtn.innerHTML = '›';
    nextBtn.addEventListener('click', e => { e.stopPropagation(); go(1); });

    wrap.append(prevBtn, nextBtn);

    media.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = `gallery-dot${i === 0 ? ' active' : ''}`;
      dot.setAttribute('role', 'button');
      dot.setAttribute('aria-label', `Go to item ${i + 1}`);
      dot.addEventListener('click', e => {
        e.stopPropagation();
        index = i;
        renderSlide();
      });
      dotsWrap.appendChild(dot);
    });

    wrap.appendChild(dotsWrap);

    // Touch devices can swipe left/right instead of tapping the arrows
    attachSwipe(wrap, {
      onSwipeLeft:  () => go(1),
      onSwipeRight: () => go(-1),
    });
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

  // ── Preview zone (top): image/video gallery ──
  const previewWrap = document.createElement('div');
  previewWrap.className = 'explorer-preview';
  previewWrap.appendChild(buildGallery(project.media, project.title));
  panel.appendChild(previewWrap);

  // ── Tag chips ──
  const tagsHTML = project.tags && project.tags.length
    ? `<div class="explorer-tags">
         ${project.tags.map(t => `<span class="explorer-tag">${t}</span>`).join('')}
       </div>`
    : '';

  // ── Links ──
  const linksHTML = project.links && project.links.length
    ? `<div class="explorer-links">
         ${project.links.map(({ url, label }) => `
           <a
             href="${url}"
             class="explorer-link"
             target="_blank"
             rel="noopener noreferrer"
           >${label}</a>`).join('')}
       </div>`
    : '';

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
 * Renders sidebar tabs (desktop/tablet), a select dropdown covering
 * the same projects (mobile — see Responsive in style.css), and the
 * initial detail panel for the first project.
 */
function buildExplorer(projects, sidebarEl, panelEl) {
  if (!projects.length || !sidebarEl || !panelEl) return;

  const tabs = [];

  function showProject(i) {
    tabs.forEach((t, ti) => t.classList.toggle('active', ti === i));
    select.value = String(i);

    // Fade out, swap content, fade in
    panelEl.classList.add('swapping');
    setTimeout(() => {
      panelEl.replaceChildren(buildExplorerPanel(projects[i]));
      panelEl.classList.remove('swapping');
      panelEl.classList.add('swapping-in');
      setTimeout(() => panelEl.classList.remove('swapping-in'), 220);
    }, 150);
  }

  // Mobile dropdown — same projects as the tab list, shown instead of
  // it below the Responsive breakpoint in style.css
  const select = document.createElement('select');
  select.className = 'explorer-mobile-nav';
  select.setAttribute('aria-label', 'Select a project');
  projects.forEach((project, i) => {
    const opt = document.createElement('option');
    opt.value = String(i);
    opt.textContent = project.title;
    select.appendChild(opt);
  });
  select.addEventListener('change', () => showProject(Number(select.value)));
  sidebarEl.appendChild(select);

  // Desktop/tablet tab buttons
  projects.forEach((project, i) => {
    const btn = document.createElement('button');
    btn.className = `explorer-tab${i === 0 ? ' active' : ''}`;
    btn.dataset.idx = String(i);
    btn.setAttribute('aria-label', project.title);
    btn.innerHTML = `${project.title}<span class="explorer-tab-category">${project.category}</span>`;
    btn.addEventListener('click', () => showProject(i));

    tabs.push(btn);
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
