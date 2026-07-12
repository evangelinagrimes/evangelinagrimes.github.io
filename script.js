/* ─────────────────────────────────────────────────────────────
   script.js — Portfolio interactivity

   Sections (Ctrl+F to jump):
     A. PROJECT DATA       — edit here to add/change your work
     B. GALLERY & LIGHTBOX — multi-image preview + expanded viewer
     C. EXPLORER RENDERER  — split-pane shared by Coding + Creative
     D. SCROLL LOGIC       — nav reveal + section tracking
     E. REVEAL             — fade-in-on-scroll for cards and headers
     F. INIT               — wires everything together on page load
   ───────────────────────────────────────────────────────────── */


/* ═══════════════════════════════════════════════════════════════
   A. PROJECT DATA
   ─────────────────────────────────────────────────────────────
   This is the only part you'll edit regularly.

   Both PROJECTS.coding and PROJECTS.creative feed the same
   split-pane explorer (sidebar tabs + mobile dropdown + detail
   panel with gallery/lightbox) — see buildExplorer() in Section C.

   PROJECTS.coding — a flat array of projects:
     title    — shown in the sidebar and as the panel heading
     category — short label in the accent color
     desc     — 1–2 sentences shown in the detail panel
     outcome  — one line of result/proof shown near the title
     learned  — array of 2–4 short strings shown as a "What I
                learned" block in the detail panel
     media    — array of image/video paths for the preview gallery.
                Video files (.mp4/.webm/.mov/.m4v/.ogv) render as a
                native <video controls> player instead of an image.
                Each project has a matching folder under
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

   PROJECTS.creative — an array of organizations (who the work was
   made for), flattened by flattenByOrganization() into the same flat
   tab list buildExplorer() expects — organization isn't shown in the
   UI, it's just how entries are grouped in this file for your own
   editing sanity:
     organization — label for your own reference, e.g. 'Pickleball Business'
     pieces       — array of pieces, same shape as a coding project
                    above (title/category/desc/media/links/status;
                    tags are optional and rarely needed here). Each
                    piece has its own folder under
                    assets/creative/<org-slug>/<piece-slug>/.
   ═══════════════════════════════════════════════════════════════ */
const PROJECTS = {

  coding: [
    {
      title:     'Flexible Drones Research',
      category:  'Research / Hardware',
      desc:      'Hands-on research on autonomous drone control with Crazyflie and Pixhawk systems, leading to a co-authored IEEE publication on multi-drone coordination with ROS 2.',
      outcome:   'Co-authored IEEE paper: "Flexible Drones: ROS 2 Action-Based Coordination of Multiple Heterogeneous Drones"',
      learned:   [
        'Fusing OptiTrack motion capture data with a Pixhawk flight controller over a direct UART connection',
        'Designing ROS 2 action interfaces (arm, takeoff, land) for heterogeneous drone fleets',
        'Configuring Raspberry Pi / Pixhawk (Pihawk) pairs for real-time MAVLink telemetry',
        'Contributing Pihawk integration, action command implementation, and sensor fusion on a four-person research team',
      ],
      media:     [
        'assets/coding/drone-research-platform/capwic_poster.jpg',
        'assets/coding/drone-research-platform/drones-2.jpg',
        'assets/coding/drone-research-platform/Drone_Flying_Web.mp4',
        'assets/coding/drone-research-platform/First3Sails_Web.mp4',
        'assets/coding/drone-research-platform/DSC_5330.JPG',
      ],
      tags:      ['ROS2', 'Python', 'Pihawk', 'Crazyflie', 'Optitrack'],
      links:     [
        { url: 'https://ieeexplore.ieee.org/document/11476332', label: 'IEEE Paper ↗' },
        { url: 'https://github.com/CNURobotics/flexible_drones', label: 'GitHub ↗' },
      ],
      status:    'Ongoing',
    },
    {
      title:     'Valorant Aim Trainer',
      category:  'AI Development',
      desc:      'A video analysis tool that identifies opposing players with a custom-trained YOLO model, measures crosshair-to-head distance frame by frame, then generates a plain-text performance report and improvement plan.',
      outcome:   'Custom annotated dataset published on Roboflow',
      learned:   [
        'Building and annotating a training dataset from game screenshots using Roboflow',
        'Training a custom YOLO model for object detection in a specific visual domain',
        'Computing per-frame distance metrics from detected bounding boxes',
        'Generating structured, actionable text reports from video analysis output',
      ],
      media:     [
        'assets/coding/valorant-aim-trainer/Crosshair_Trainer_Demo_Web.mp4',
      ],
      tags:      ['Python', 'YOLO', 'Computer Vision'],
      links:     [
        { url: 'https://universe.roboflow.com/aipresentation-5zkno/valorant_enemy_detection-yrmqo/browse?queryText=&pageSize=50&startingIndex=0&browseQuery=true', label: 'Roboflow Dataset ↗' },
      ],
      status:    null,
    },
    {
      title:     'Franchise Merch Webpage',
      category:  'Web Development',
      desc:      'A static storefront for selling stickers and merchandise for Light Garden, a Valorant for-fun franchise (VDC league). Built with HTML, CSS, and JavaScript; Shopify handles e-commerce checkout.',
      outcome:   'Live site selling Light Garden franchise merchandise',
      learned:   [
        'Integrating Shopify e-commerce into a hand-built static HTML/CSS/JS site',
        'Designing a product-focused storefront with a browse-to-checkout flow',
      ],
      media:     [
        'assets/coding/lg-merch-site/Merch_Landing_Page.png',
        'assets/coding/lg-merch-site/Merch_Product_Page.png',
        'assets/coding/lg-merch-site/Merch_Order_Page.png',
      ],
      tags:      ['HTML', 'CSS', 'JavaScript', 'Shopify', 'Claude Code'],
      links:     [
        { url: 'https://bobert-merch.github.io/', label: 'Live Site ↗' },
      ],
      status:    'Ongoing',
    },
    {
      title:     'Day Out Generator',
      category:  'Application Development',
      desc:      'A Python app that uses the Google Places API to generate a curated day out — restaurant, activity, then dessert — based on your location.',
      outcome:   'Published on GitHub',
      learned:   [
        'Querying the Google Places API to retrieve and filter location-based results',
        'Chaining multiple API calls to build a multi-stop day itinerary',
      ],
      media:     [
        'assets/coding/day-out-generator/Egrimes_Demo_Web.mp4',
      ],
      tags:      ['Python', 'Google Places API'],
      links:     [
        { url: 'https://github.com/evangelinagrimes/Day_Out_Generator_V1', label: 'GitHub ↗' },
      ],
      status:    null,
    },
    {
      title:     'UAS Competition Webpage',
      category:  'Web Development',
      desc:      'Initiated and led development of the CNU UAS Club website to meet SUAS international competition qualification requirements — the first website any of the four team members had ever built.',
      outcome:   'Helped the CNU UAS Club meet SUAS competition qualification requirements',
      learned:   [
        'Leading a first-time web dev team through weekly sprint meetings and goal-setting',
        'Structuring a multi-page static site to satisfy external technical requirements',
        'Iterating publicly as a team under a real competition deadline',
      ],
      media:     [
        'assets/coding/uas-competition-webpage/UAS_About.png',
        'assets/coding/uas-competition-webpage/UAS_Team.png',
      ],
      tags:      ['HTML', 'CSS', 'JavaScript'],
      links:     [
        { url: 'https://cnuuas.github.io/', label: 'Live Site ↗' },
        { url: 'https://github.com/CNUUAS/CNUUAS.github.io', label: 'GitHub ↗' },
      ],
      status:    null,
    },
    {
      title:     'Cafe Canna Webpage',
      category:  'Web Development',
      desc:      'A static site design exercise for Cafe Canna, a prospective cannabis café concept. Built with HTML, CSS, and JavaScript using Claude Code for initial scaffolding, then customized to a specific design vision.',
      outcome:   'Live site prototype at cafe-canna.github.io',
      learned:   [
        'Using Claude Code to scaffold a site quickly, then customizing the output to match a specific design vision',
        'Designing distinct pages for different business needs (landing, about, products)',
      ],
      media:     [
        'assets/coding/cafe-canna/Cafe_Landing_Page.png',
        'assets/coding/cafe-canna/Cafe_About_Page.png',
        'assets/coding/cafe-canna/Cafe_Product_Page.png',
      ],
      tags:      ['HTML', 'CSS', 'JavaScript', 'Claude Code'],
      links:     [
        { url: 'https://cafe-canna.github.io/cafecannallc/', label: 'Live Site ↗' },
      ],
      status:    'Template',
    },
    {
      title:     'Team Scouting Spreadsheet',
      category:  'Spreadsheet / Automation',
      desc:      'A Google Sheets system that ingests raw CSV data and auto-sorts players by tier and MMR for a Valorant esports franchise. Player notes follow individuals through MMR updates, and a pivot-based team planner suggests optimal rosters from the filtered pool.',
      outcome:   'Used for player scouting in a Valorant for-fun league franchise',
      learned:   [
        'Building a multi-tab data pipeline in Google Sheets driven by a single master data source',
        'Preserving relational data (player notes) through automated sort and re-rank operations',
        'Designing a pivot table and team planner to surface actionable scouting recommendations',
      ],
      media:     [
        'assets/coding/team-scouting-spreadsheet/VDC_Raw.png',
        'assets/coding/team-scouting-spreadsheet/VDC_Master.png',
        'assets/coding/team-scouting-spreadsheet/VDC_Details.png',
        'assets/coding/team-scouting-spreadsheet/VDC_Pivot.png',
        'assets/coding/team-scouting-spreadsheet/VDC_Teams.png',
      ],
      tags:      ['Google Sheets', 'Pivot Tables', 'Data Automation'],
      links:     [
        { url: 'https://docs.google.com/spreadsheets/d/1DYBbGsZIkx_Ndu5gCp6SY9YLeocEbdeAOWur2p733J8/edit?usp=sharing', label: 'View Template ↗' },
      ],
      status:    null,
    },
    {
      title:     'Senior RA Duty Schedule',
      category:  'Spreadsheet / Automation',
      desc:      'A Google Sheets scheduling hub and swap board built for Eva\'s Resident Assistant staff. A master schedule tab feeds two visual views; a companion Apps Script automatically creates calendar events with shift type and length for each RA.',
      outcome:   'Used by Eva\'s RA staff for scheduling throughout the academic year',
      learned:   [
        'Writing Google Apps Script to automate calendar event creation from spreadsheet data',
        'Linking multiple visual views to a single master data tab for consistent updates',
        'Designing a swap board so staff could flag and negotiate shift changes without a separate tool',
      ],
      media:     [
        'assets/coding/sra-duty-schedule/SRA_Main.png',
        'assets/coding/sra-duty-schedule/SRA_Swap.png',
        'assets/coding/sra-duty-schedule/SRA_Master.png',
        'assets/coding/sra-duty-schedule/SRA_Calendar.png',
      ],
      tags:      ['Google Sheets', 'Scheduling', 'Data Automation'],
      links:     [
        { url: 'https://docs.google.com/spreadsheets/d/1bC61uJsBbzzgJt6sBgBHMXJ60ZfcMeZZpcyo5NiNbQU/edit?usp=sharing', label: 'View Spreadsheet ↗' },
      ],
      status:    null,
    },
  ],

  creative: [
    {
      organization: 'University',
      pieces: [
        {
          title:    'University Media',
          category: 'Poster Design',
          desc:     'Design work from coursework and clubs at Christopher Newport University, including event promo art and logo work for a campus gaming club. ',
          media:    [
            'assets/creative/university/university-media/schoolar_work.jpg',
            'assets/creative/university/university-media/Horror_Game_Night.jpg',
            'assets/creative/university/university-media/CNU-logo.png',
          ],
          links:    [],
          status:   null,
        },
      ],
    },
    {
      organization: 'Valorant Franchise Content',
      pieces: [
        {
          title:    'Franchise Logo Design',
          category: 'Brand Identity',
          desc:     'Logo design and color/style variants for Light Garden, a Valorant for-fun franchise. I created these designs as stickers to sell to fans of the franchise. It is the beginning of my small business.',
          media:    [
            'assets/creative/valorant-franchise-content/franchise-logo-design/swirly_logo.png',
            'assets/creative/valorant-franchise-content/franchise-logo-design/swirly_dark_logo.png',
            'assets/creative/valorant-franchise-content/franchise-logo-design/swirly_green_logo.png',
            'assets/creative/valorant-franchise-content/franchise-logo-design/swirly_simple_green_logo.png',
            'assets/creative/valorant-franchise-content/franchise-logo-design/swirly_white.png',
            'assets/creative/valorant-franchise-content/franchise-logo-design/clover_logo.png',
          ],
          links:    [],
          status:   null,
        },
        {
          title:    'Sticker Designs',
          category: 'Sticker Design',
          desc:     'Player-nickname sticker designs for players in Valorant league.',
          media:    [
            'assets/creative/valorant-franchise-content/sticker-designs/Poster_1.png',
            'assets/creative/valorant-franchise-content/sticker-designs/Poster_2.png',
            'assets/creative/valorant-franchise-content/sticker-designs/Poster_3.png',
            'assets/creative/valorant-franchise-content/sticker-designs/Poster_4.png',
            'assets/creative/valorant-franchise-content/sticker-designs/Poster_5.png',
          ],
          links:    [],
          status:   null,
        },
      ],
    },
    {
      organization: 'Video Game Content',
      pieces: [
        {
          title:    'Player Banner Art',
          category: 'Character Art',
          desc:     'Player character illustrations and broadcast banner art for the Light Garden roster, a Valorant for-fun league franchise.',
          media:    [
            'assets/creative/video-game-content/player-banner-art/CheeseBanner.jpg',
            'assets/creative/video-game-content/player-banner-art/GhostBanner4.jpg',
            'assets/creative/video-game-content/player-banner-art/UcklarBanner.jpg',
            'assets/creative/video-game-content/player-banner-art/ZuuBanner3.jpg',
          ],
          links:    [],
          status:   null,
        },
        {
          title:    'Fan Art',
          category: 'Illustration',
          desc:     'Digital illustrations of characters from games I love — including Wheatley from Portal 2, scenes from Life is Strange, and original character concepts.',
          media:    [
            'assets/creative/video-game-content/fan-art/Wheatley.jpg',
            'assets/creative/video-game-content/fan-art/LifeIsStrangeArt.jpg',
            'assets/creative/video-game-content/fan-art/KayowBird.jpg',
          ],
          links:    [],
          status:   null,
        },
      ],
    },
    {
      organization: 'Pickleball Business',
      pieces: [
        {
          title:    'Brand Identity',
          category: 'Brand Identity',
          desc:     'Logo and brand identity work for a pickleball business — logo design, color palette, and print-ready brand assets.',
          media:    [
            'assets/creative/pickleball-business/brand-identity/Pickle_and_Brew_Logo.jpg',
            'assets/creative/pickleball-business/brand-identity/PicklePeakArtboard_2.jpg',
            'assets/creative/pickleball-business/brand-identity/PicklePeakArtboard_21.jpg',
            'assets/creative/pickleball-business/brand-identity/PicklePeakArtboard_3.png',
          ],
          links:    [],
          status:   null,
        },
      ],
    },
  ],

};


/* ═══════════════════════════════════════════════════════════════
   B. GALLERY & LIGHTBOX
   ─────────────────────────────────────────────────────────────
   Two preview layouts, both handed off to the same Lightbox for the
   expanded view — see galleryStyle in buildExplorerPanel() (Section C).

     buildGallerySlide() — Coding: one image/video at a time, with
                           prev/next arrows and dot indicators once
                           there's more than one item. Clicking the
                           image opens Lightbox.
     buildGalleryGrid()  — Creative: every item shown as a thumbnail
                           at once. Clicking an image thumbnail opens
                           Lightbox.
     Lightbox            — full-screen overlay with its own prev/next
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
  let overlayEl, stageEl, imageEl, videoEl, placeholderEl, placeholderLabelEl, counterEl;
  let titleEl, descEl, prevBtn, nextBtn, closeBtn;
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

  // Arrows/counter sit in the gutter beside .lightbox-content (see
  // style.css) so they never overlap the image itself, but that means
  // their vertical position can't be a static CSS percentage of the
  // overlay — the caption below the stage has a dynamic height, which
  // shifts the stage (and the image inside it) up by a variable amount.
  // This measures the stage's actual rendered box and pins the controls
  // to its center/bottom instead.
  function positionControls() {
    if (overlayEl.hidden) return;
    const rect = stageEl.getBoundingClientRect();
    const centerY = `${rect.top + rect.height / 2}px`;
    prevBtn.style.top = centerY;
    nextBtn.style.top = centerY;
    counterEl.style.top = `${rect.bottom - 20}px`;

    // Also override the CSS clamp()'d left/right (a fallback for before
    // this runs): that static offset assumes a minimum gutter width
    // that isn't always there — on narrower viewports .lightbox-content
    // can grow wide enough that the static offset still lands back on
    // top of the image. This instead measures the actual gutter and
    // guarantees the arrow sits just outside the stage's edge.
    const size = prevBtn.offsetWidth;
    const gap = 12;
    prevBtn.style.left  = `${Math.max(4, rect.left - size - gap)}px`;
    nextBtn.style.right = `${Math.max(4, window.innerWidth - rect.right - size - gap)}px`;
  }

  function open(mediaList, startIndex, title, desc) {
    media     = mediaList;
    index     = startIndex || 0;
    titleText = title || '';

    // Title/description are the same for every image in this set, so
    // they're only set here — render() just handles the per-image bits.
    titleEl.textContent = titleText;
    descEl.textContent  = desc || '';
    descEl.hidden       = !desc;

    render();
    overlayEl.hidden = false;
    overlayEl.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    positionControls();
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
    stageEl            = document.querySelector('.lightbox-stage');
    imageEl            = document.getElementById('lightbox-img');
    videoEl            = document.getElementById('lightbox-video');
    placeholderEl       = document.getElementById('lightbox-placeholder');
    placeholderLabelEl = document.getElementById('lightbox-placeholder-label');
    counterEl          = document.getElementById('lightbox-counter');
    titleEl            = document.getElementById('lightbox-title');
    descEl             = document.getElementById('lightbox-desc');
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

    // Keep the controls pinned to the stage if the viewport is resized
    // (or rotated) while the lightbox is open.
    window.addEventListener('resize', positionControls);

    // Touch devices can swipe left/right instead of tapping the arrows
    attachSwipe(overlayEl, {
      onSwipeLeft:  () => go(1),
      onSwipeRight: () => go(-1),
    });
  }

  return { setup, open, close };
})(); // end Lightbox IIFE

/**
 * Build the preview gallery for a project (Creative section): a grid
 * of thumbnails, one per image/video (or placeholder). Clicking an
 * image thumbnail opens it in the full-screen Lightbox, which has its
 * own left/right arrows to navigate the rest of the set. Videos play
 * inline via their own native controls instead of opening the
 * lightbox (so a tap on the play button doesn't also pop it open).
 * Returns a DOM element ready to insert into .explorer-preview.
 */
function buildGalleryGrid(media, title, desc) {
  const grid = document.createElement('div');
  grid.className = 'gallery-grid';

  function renderPlaceholderCell(cell, i) {
    cell.classList.remove('gallery-cell--clickable');
    cell.innerHTML = `
      <div class="gallery-placeholder">
        <div class="gallery-placeholder-icon">◻</div>
        <div class="gallery-placeholder-label">Item ${i + 1} of ${media.length}</div>
      </div>`;
  }

  media.forEach((src, i) => {
    const cell = document.createElement('div');
    cell.className = 'gallery-cell';

    if (!src) {
      renderPlaceholderCell(cell, i);
    } else if (isVideoPath(src)) {
      const video = document.createElement('video');
      video.controls    = true;
      video.playsInline = true;
      video.preload     = 'metadata';
      video.setAttribute('aria-label', `${title} — video ${i + 1} of ${media.length}`);
      // If the file at this path doesn't exist yet, fall back to the
      // placeholder instead of a broken player.
      video.addEventListener('error', () => {
        if (cell.contains(video)) renderPlaceholderCell(cell, i);
      });
      video.src = src;
      cell.appendChild(video);
    } else {
      const img = document.createElement('img');
      img.alt     = `${title} — image ${i + 1} of ${media.length}`;
      img.loading = 'lazy';
      img.decoding = 'async';
      // Same fallback as above, for images.
      img.addEventListener('error', () => {
        if (cell.contains(img)) renderPlaceholderCell(cell, i);
      });
      // Only make the cell clickable once the image actually loads —
      // otherwise a broken path would stay clickable into an empty
      // lightbox even after falling back to the placeholder above.
      img.addEventListener('load', () => {
        cell.classList.add('gallery-cell--clickable');
        cell.setAttribute('role', 'button');
        cell.setAttribute('tabindex', '0');
        cell.setAttribute('aria-label', `Expand image ${i + 1} of ${media.length} — ${title}`);
        cell.addEventListener('click', () => Lightbox.open(media, i, title, desc));
        cell.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            Lightbox.open(media, i, title, desc);
          }
        });
      }, { once: true });
      img.src = src;
      cell.appendChild(img);
    }

    grid.appendChild(cell);
  });

  return grid;
}

/**
 * Build the preview gallery for a project (Coding section): one
 * image/video (or placeholder) at a time, with prev/next arrows and
 * dot indicators once there's more than one item. Clicking the
 * current image opens it in Lightbox; videos play inline via their
 * own native controls instead (so a tap on the play button doesn't
 * also pop the lightbox open).
 * Returns a DOM element ready to insert into .explorer-preview.
 */
function buildGallerySlide(media, title, desc) {
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
      img.alt      = `${title} — image ${index + 1} of ${media.length}`;
      img.loading  = 'lazy';
      img.decoding = 'async';
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
    Lightbox.open(media, index, title, desc);
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
   Builds the split-pane explorer shared by the Coding and Creative
   sections: left = sidebar list of project tabs, right = detail
   panel (image/video gallery + info).

   You shouldn't need to edit this — add/change entries in PROJECTS.
   ═══════════════════════════════════════════════════════════════ */

/**
 * Flattens PROJECTS.creative's [{ organization, pieces }] into the
 * single flat array buildExplorer() expects — organization is kept
 * in the data for context, but isn't shown as a divider in the UI.
 */
function flattenByOrganization(organizations) {
  return organizations.flatMap(org => org.pieces);
}

/**
 * Build the DOM for the right-hand detail panel of a project.
 * galleryStyle picks the preview layout: 'slide' (one item at a time
 * with prev/next arrows — Coding) or 'grid' (all thumbnails at once,
 * click to expand — Creative).
 * Returns a fragment ready to drop into .explorer-panel.
 */
function buildExplorerPanel(project, galleryStyle) {
  const panel = document.createDocumentFragment();

  // ── Preview zone (top): image/video gallery ──
  const previewWrap = document.createElement('div');
  previewWrap.className = galleryStyle === 'grid' ? 'explorer-preview explorer-preview--grid' : 'explorer-preview';
  const buildPreview = galleryStyle === 'grid' ? buildGalleryGrid : buildGallerySlide;
  previewWrap.appendChild(buildPreview(project.media, project.title, project.desc));
  panel.appendChild(previewWrap);

  // ── Outcome line ──
  const outcomeHTML = project.outcome
    ? `<div class="explorer-outcome">${project.outcome}</div>`
    : '';

  // ── What I learned ──
  const learnedHTML = project.learned && project.learned.length
    ? `<div class="explorer-learned">
         <div class="explorer-learned-label">What I learned</div>
         <ul class="explorer-learned-list">
           ${project.learned.map(item => `<li>${item}</li>`).join('')}
         </ul>
       </div>`
    : '';

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
    ${outcomeHTML}
    <p class="explorer-info-desc">${project.desc}</p>
    ${learnedHTML}
    ${tagsHTML}
    ${linksHTML}
    ${statusHTML}
  `;
  panel.appendChild(info);

  return panel;
}

/**
 * Populate a split-pane explorer: sidebar tabs (desktop/tablet), a
 * select dropdown covering the same projects (mobile — see Responsive
 * in style.css), and the initial detail panel for the first project.
 * Used for both the Coding and Creative sections — galleryStyle
 * ('slide' or 'grid') picks each one's detail-panel preview layout;
 * see buildExplorerPanel().
 */
function buildExplorer(projects, sidebarEl, panelEl, galleryStyle) {
  if (!projects.length || !sidebarEl || !panelEl) return;

  const tabs = [];

  function showProject(i) {
    tabs.forEach((t, ti) => t.classList.toggle('active', ti === i));
    select.value = String(i);

    // Fade out, swap content, fade in
    panelEl.classList.add('swapping');
    setTimeout(() => {
      panelEl.replaceChildren(buildExplorerPanel(projects[i], galleryStyle));
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
  panelEl.replaceChildren(buildExplorerPanel(projects[0], galleryStyle));
}


/** Wire up both sections from PROJECTS data — same explorer, different gallery layout. */
function renderProjects() {
  buildExplorer(
    PROJECTS.coding,
    document.getElementById('coding-sidebar'),
    document.getElementById('coding-panel'),
    'slide'
  );

  buildExplorer(
    flattenByOrganization(PROJECTS.creative),
    document.getElementById('creative-sidebar'),
    document.getElementById('creative-panel'),
    'grid'
  );
}


/* ═══════════════════════════════════════════════════════════════
   D. SCROLL LOGIC
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
   E. SCROLL REVEAL
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
   F. INIT
   ─────────────────────────────────────────────────────────────
   Runs once the HTML is fully parsed.
   Cards/tabs must be in the DOM before setupReveal() observes them.
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  // 1. Wire up the lightbox overlay (used by galleries built in step 2)
  Lightbox.setup();

  // 2. Build the coding explorer and creative section
  renderProjects();

  // 3. Scroll-driven nav reveal
  setupScrollLogic();

  // 4. Scroll reveal for headers and cards
  setupReveal();

  // 5. Footer year — fills in automatically
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
