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
                    assets/creative/<org-slug>/.
   ═══════════════════════════════════════════════════════════════ */
const PROJECTS = {

  coding: [
    {
      title:     'Flexible Drones Research',
      category:  'Research / Hardware',
      desc:      'I conducted hands-on research on autonomous drone control using the Crazyflie and Pihawk systems. On my team of four, I implemented heterogeneous drone control with ROS2 (Kilted) action-based feedback for the Pihawks (Pixhawk 2.4.8 flight controller mounted on a raspberry pi) communicating commands via a telemetry module using the MAVLink protocol. The drones are flown in a netted drone cage using an Optitrack sensor system to track position data. I configured the raspberry pi\'s on the Pihawks to take in the position data and fuse it with the flight controller via a direct UART connection.',
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
      status:    'Ongoing',
    },
    // {
    //   title:     'Cafe Canna Webpage',
    //   category:  'Web Development',
    //   desc:      'I designed the webpage for a prospective business, Cafe Canna. Please note, I do not engage in any marijuana related business, this was purely a design exercise. The webpage is a static site built with HTML, CSS, and JavaScript. I used Claude Code to generate the initial code for the site, then I modified it to fit my design vision. This is an ongoing project and I will be adding more functionality to the site in the future.',
    //   media:     [
    //     'assets/coding/cafe-canna/Cafe_Landing_Page.png',
    //     'assets/coding/cafe-canna/Cafe_About_Page.png',
    //     'assets/coding/cafe-canna/Cafe_Product_Page.png',
    //   ],
    //   tags:      ['HTML', 'CSS', 'JavaScript', 'Claude Code'],
    //   links:     [
    //     { url: 'https://cafe-canna.github.io/cafecannallc/', label: '-> Visit Live site <-' },
    //   ],
    //   status:    'template',
    // },
    {
      title:     'Team Scouting Spreadsheet',
      category:  'Spreadsheet / Automation',
      desc:      'To automate aspects of scouting for a Valorant Esport franchise, I created a spreadsheet that took in raw CSV data and auto-sorted players by tier and MMR. Any notes set to a specific player will follow them after any MMR updates. The primary data tabs are "RAW", "CONSTANTS", and "MASTER_PLAYERS." Everything else is a visual representation of the data in those three tabs. The "DETAILS" tab displays all the players in the given tier and any notes that were made on them. The "PIVOT" tab is a pivot table that filters players by role, tier, and franchise status. The "TEAMS" tab is a team planner that uses the pivot table to display the best possible team based on the selected filters and preferences.  ',
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
    {
      title:     'Valorant Aim Trainer',
      category:  'AI Development',
      desc:      'I created a simple "aim trainer" that takes the position of the player\'s crosshair and compares it with the distance from the opponent\'s head. Opposing players are identified by a custom trained YOLO model. After analyzing the video, a summary of the player\'s analysis and a general plan moving forward is created in a text file. To train the yolo model, I created my own annotated dataset of enemy outlines pulled from screenshots within the game.',
      media:     [
        'assets/coding/valorant-aim-trainer/Crosshair_Trainer_Demo_Web.mp4',
      ],
      tags:      ['Python', 'YOLO', 'Computer Vision'],
      links:     [
        { url: 'https://universe.roboflow.com/aipresentation-5zkno/valorant_enemy_detection-yrmqo/browse?queryText=&pageSize=50&startingIndex=0&browseQuery=true', label: '-> Roboflow Dataset <-' }
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
          desc:     'Design work from coursework and clubs at Christopher Newport University, including event promo art and logo work for a campus gaming club.',
          media:    [
            'assets/creative/university/schoolar_work.jpg',
            'assets/creative/university/Horror_Game_Night.jpg',
            'assets/creative/university/CNU-logo.png',
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
            'assets/creative/valorant-franchise-content/swirly_logo.png',
            'assets/creative/valorant-franchise-content/swirly_dark_logo.png',
            'assets/creative/valorant-franchise-content/swirly_green_logo.png',
            'assets/creative/valorant-franchise-content/swirly_simple_green_logo.png',
            'assets/creative/valorant-franchise-content/swirly_white.png',
            'assets/creative/valorant-franchise-content/clover_logo.png',
          ],
          links:    [],
          status:   null,
        },
        {
          title:    'Sticker Designs',
          category: 'Sticker Design',
          desc:     'Player-nickname sticker designs sold for Light Garden, a Valorant beer league franchise.',
          media:    [
            'assets/creative/valorant-franchise-content/Poster_1.png',
            'assets/creative/valorant-franchise-content/Poster_2.png',
            'assets/creative/valorant-franchise-content/Poster_3.png',
            'assets/creative/valorant-franchise-content/Poster_4.png',
            'assets/creative/valorant-franchise-content/Poster_5.png',
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
            'assets/creative/video-game-content/CheeseBanner.jpg',
            'assets/creative/video-game-content/GhostBanner4.jpg',
            'assets/creative/video-game-content/UcklarBanner.jpg',
            'assets/creative/video-game-content/ZuuBanner3.jpg',
            'assets/creative/video-game-content/KayowBird.jpg',
          ],
          links:    [],
          status:   null,
        },
        {
          title:    'Fan Art',
          category: 'Illustration',
          desc:     'Video game fan art.',
          media:    [
            'assets/creative/video-game-content/Wheatley.jpg',
            'assets/creative/video-game-content/LifeIsStrangeArt.jpg',
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
          desc:     'Logo and brand identity work for a pickleball business.',
          media:    [
            'assets/creative/pickleball-business/Pickle_and_Brew_Logo.jpg',
            'assets/creative/pickleball-business/PicklePeakArtboard_2.jpg',
            'assets/creative/pickleball-business/PicklePeakArtboard_21.jpg',
            'assets/creative/pickleball-business/PicklePeakArtboard_3.png',
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
