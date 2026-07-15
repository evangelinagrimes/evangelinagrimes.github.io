/* ─────────────────────────────────────────────────────────────
   script.js — Portfolio interactivity

   Sections (Ctrl+F to jump):
     A. PROJECT DATA       — edit here to add/change your work
     B. GALLERY & LIGHTBOX — multi-image preview + expanded viewer
     C. EXPLORER RENDERER  — split-pane shared by Coding + Creative
     D. SKILLS             — tag-derived, color-grouped skill filter bar
                             (inside the Technical section), cross-
                             highlights into the explorer above
     E. SKILL SWARM        — cursor-reactive flocking skill-logo canvas
                             in the hero (desktop-only)
     F. SCROLL LOGIC       — nav reveal + section tracking
     G. REVEAL             — fade-in-on-scroll for cards and headers
     H. INIT               — wires everything together on page load
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
                (1.webp, 2.webp, or a .mp4 for video) in there and they show up here
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

   PROJECTS.creative — an array of organizations (who the work was
   made for), flattened by flattenByOrganization() into the same flat
   tab list buildExplorer() expects — organization isn't shown in the
   UI, it's just how entries are grouped in this file for your own
   editing sanity:
     organization — label for your own reference, e.g. 'Pickleball Business'
     pieces       — array of pieces, same shape as a coding project
                    above (title/category/desc/media/links; tags are
                    optional and rarely needed here). Each
                    piece has its own folder under
                    assets/creative/<org-slug>/<piece-slug>/.
   ═══════════════════════════════════════════════════════════════ */
const PROJECTS = {

  coding: [
     {
      title:     'Flexible Drones Research',
      category:  'Research / Hardware',
      desc:      'As a Research Apprentice with Dr. David Conner at CNU, I do hands-on autonomous drone control research with Crazyflie and Pixhawk systems under the project title "Flexible Drones." Within this research, I co-authored an IEEE publication alongside three other fellow researchers. I focused on the PiHawk implementation and integration of ROS 2 action interfaces for multi-drone coordination, as well as sensor fusion with OptiTrack motion capture data via the onboard Raspberry Pi.',
      outcome:   'Built a framework with a unified interface for multi-drone coordination, so other researchers could focus on higher-level questions instead of low-level implementation',
      learned:   [
        'How to fuse OptiTrack position data with a Pixhawk flight controller over a direct UART connection with an onboard Raspberry Pi',
        'How to design ROS 2 action interfaces (arm, takeoff, land) for Pixhawk systems, and implementing them in Python',
        'How to configure a Raspberry Pi for real-time MAVLink telemetry and onboard ROS2 control',
        'How to create a cloneable OS image and a "pre-boot" service that auto-configures unique parameters for each drone\'s Raspberry Pi at startup',
        'How to assign unique serial IDs to telemetry modules and map them to fixed ports using UDEV rules',
        'How to use Agentic AI (Claude Code/Codex) to assist in the development and learning process',
      ],
      media:     [
        'assets/coding/drone-research-platform/capwic_poster.webp',
        'assets/coding/drone-research-platform/drones-2.webp',
        'assets/coding/drone-research-platform/Drone_Flying_Web.mp4',
        'assets/coding/drone-research-platform/First3Sails_Web.mp4',
        'assets/coding/drone-research-platform/DSC_5330.webp',
      ],
      tags:      ['ROS 2', 'Bash Scripts', 'Linux OS', 'Python', 'Raspberry Pi', 'Pixhawk', 'ArduPilot', 'MAVLink', 'Crazyflie', 'OptiTrack', 'GazeboSim', 'Mission Planner', 'Claude Code', 'Codex'],
      links:     [
        { url: 'https://ieeexplore.ieee.org/document/11476332', label: 'IEEE Paper ↗' },
        { url: 'https://github.com/CNURobotics/flexible_drones', label: 'GitHub ↗' },
      ],
    },
    {
      title:     'Valorant Aim Trainer',
      category:  'AI Development',
      desc:      'A video analysis tool that identifies opposing players with a custom-trained YOLO model, measures crosshair-to-head distance frame by frame, then generates a plain-text performance report and improvement plan.',
      outcome:   'Custom YOLO model trained on a custom annotated dataset now published on Roboflow',
      learned:   [
        'How to build and annotate a training dataset from in-game screenshots using Roboflow',
        'How to train a custom YOLO model for object detection in a specific visual domain, i.e. Valorant gameplay',
        'How to compute per-frame distance metrics from detected bounding boxes',
      ],
      media:     [
        'assets/coding/valorant-aim-trainer/Crosshair_Trainer_Demo_Web.mp4',
      ],
      tags:      ['Python', 'YOLO', 'Computer Vision', 'PyCharm', 'Roboflow', 'OpenCV'],
      links:     [
        { url: 'https://universe.roboflow.com/aipresentation-5zkno/valorant_enemy_detection-yrmqo/browse?queryText=&pageSize=50&startingIndex=0&browseQuery=true', label: 'Roboflow Dataset ↗' },
      ],
    },
    {
      title:     'Day Out Generator',
      category:  'Application Development',
      desc:      'A Python app that uses the Google Places API to generate a personalized day out, including a restaurant, activity, then dessert based on your location.',
      outcome:   'Custom application GUI that creates a three-step plan for an exciting day out',
      learned:   [
        'How to query the Google Places API to retrieve and filter location-based results',
        'How to chain multiple API calls to build a multi-stop day itinerary',
        'How to parse and filter JSON data to extract relevant parameters',
        'How to develop a GUI application using Tkinter',
      ],
      media:     [
        'assets/coding/day-out-generator/Egrimes_Demo_Web.mp4',
      ],
      tags:      ['Python', 'Google Places API', 'Tkinter', 'JSON Parsing', 'GUI Development', 'PyCharm'],
      links:     [
        { url: 'https://github.com/evangelinagrimes/Day_Out_Generator_V1', label: 'GitHub ↗' },
      ],
    },
    {
      title:     'Team Scouting Spreadsheet',
      category:  'Spreadsheet / Automation',
      desc:      'I developed this Google Sheets system to take in raw CSV data and auto-sort players by tier and MMR for a Valorant esports league. Player notes follow individuals through MMR updates, and a pivot-based team planner display available players based on a series of conditions.',
      outcome:   'An interactive spreadsheet used for player scouting in a Valorant for-fun league franchise',
      learned:   [
        'How to build a multi-tab data pipeline in Google Sheets driven by a single master data source',
        'How to preserve relational data (player notes) through automated sort and re-rank operations',
        'How to design a pivot table and team planner to surface actionable scouting recommendations',
      ],
      media:     [
        'assets/coding/team-scouting-spreadsheet/VDC_Raw.webp',
        'assets/coding/team-scouting-spreadsheet/VDC_Master.webp',
        'assets/coding/team-scouting-spreadsheet/VDC_Details.webp',
        'assets/coding/team-scouting-spreadsheet/VDC_Pivot.webp',
        'assets/coding/team-scouting-spreadsheet/VDC_Teams.webp',
      ],
      tags:      ['Google Sheets', 'Pivot Tables', 'Data Automation', 'CSV Parsing'],
      links:     [
        { url: 'https://docs.google.com/spreadsheets/d/1DYBbGsZIkx_Ndu5gCp6SY9YLeocEbdeAOWur2p733J8/edit?usp=sharing', label: 'View Spreadsheet ↗' },
      ],
    },
    {
      title:     'Senior RA Duty Schedule',
      category:  'Spreadsheet / Automation',
      desc:      'A Google Sheets scheduling hub and swap board built for my Resident Assistant staff. A master schedule tab feeds two visual views; a companion Apps Script automatically creates calendar events with shift type and length for each RA.',
      outcome:   'An interactive visual reference of semesterly duty rotation for RA staff throughout the academic year',
      learned:   [
        'How to write a Google Apps Script to automate calendar event creation from spreadsheet data',
        'How to link multiple visual views to a single master data tab for consistent updates',
        'How to design a swap board so staff could flag and negotiate shift changes without a separate tool',
        'How to create an intuitive spreadsheet design for non-technical users to easily adapt to',
      ],
      media:     [
        'assets/coding/sra-duty-schedule/SRA_Spreadsheet_Demo.mp4',
        'assets/coding/sra-duty-schedule/SRA_Main.webp',
        'assets/coding/sra-duty-schedule/SRA_Swap.webp',
        'assets/coding/sra-duty-schedule/SRA_Master.webp',
        'assets/coding/sra-duty-schedule/SRA_Calendar.webp',
        
      ],
      tags:      ['Google Sheets', 'Scheduling', 'Data Automation', 'Apps Script'],
      links:     [
        { url: 'https://docs.google.com/spreadsheets/d/1bC61uJsBbzzgJt6sBgBHMXJ60ZfcMeZZpcyo5NiNbQU/edit?usp=sharing', label: 'View Spreadsheet ↗' },
      ],
    },
    {
      title:     'Franchise Merch Webpage',
      category:  'Web Development',
      desc:      'A static storefront for selling stickers and merchandise for Light Garden, a Valorant for-fun franchise (VDC league). Built with HTML, CSS, and JavaScript; Shopify handles e-commerce checkout.',
      outcome:   'Live site selling Light Garden franchise merchandise',
      learned:   [
        'How to integrate Shopify e-commerce into a hand-built static HTML/CSS/JS site',
        'How to design a product-focused storefront with a browse-to-checkout flow',
        'How to integrate Google Forms for customer feedback and product requests',
      ],
      media:     [
        'assets/coding/lg-merch-site/Merch_Landing_Page.webp',
        'assets/coding/lg-merch-site/Merch_Product_Page.webp',
        'assets/coding/lg-merch-site/Merch_Order_Page.webp',
      ],
      tags:      ['HTML', 'CSS', 'JavaScript', 'Shopify', 'Claude Code', 'Google Forms'],
      links:     [
        { url: 'https://bobert-merch.github.io/', label: 'Live Site ↗' },
      ],
    },
     {
      title:     'Cafe Canna Webpage',
      category:  'Web Development',
      desc:      'A static site design exercise for Cafe Canna, a prospective cannabis café concept. Built with HTML, CSS, and JavaScript using Claude Code for initial scaffolding, then customized to a specific design vision.',
      outcome:   'Live site prototype for Cafe Canna café concept',
      learned:   [
        'How to use Claude Code to scaffold a site quickly, then customizing the output to match a specific design vision',
        'How to design distinct pages for different business needs (landing, about, products)',
        'How to research and implement best practices for cannabis-related business websites',
      ],
      media:     [
        'assets/coding/cafe-canna/Cafe_Landing_Page.webp',
        'assets/coding/cafe-canna/Cafe_About_Page.webp',
        'assets/coding/cafe-canna/Cafe_Product_Page.webp',
      ],
      tags:      ['HTML', 'CSS', 'JavaScript', 'Claude Code'],
      links:     [
        { url: 'https://cafe-canna.github.io/cafecannallc/', label: 'Live Site ↗' },
      ],
    },
    {
      title:     'UAS Competition Webpage',
      category:  'Web Development',
      desc:      'Initiated and led development of the CNU UAS Club website to meet SUAS international competition qualification requirements — the first website any of the four team members had ever built.',
      outcome:   'Helped the CNU UAS Club meet SUAS competition qualification requirements',
      learned:   [
        'How to lead a first-time web dev team through weekly sprint meetings and goal-setting',
        'How to structure a multi-page static site to satisfy external technical requirements',
        'How to move delegate tasks and learning material while managing my own role as a developer under a real competition deadline',
      ],
      media:     [
        'assets/coding/uas-competition-webpage/UAS_About.webp',
        'assets/coding/uas-competition-webpage/UAS_Team.webp',
      ],
      tags:      ['HTML', 'CSS', 'JavaScript'],
      links:     [
        { url: 'https://cnuuas.github.io/', label: 'Live Site ↗' },
        { url: 'https://github.com/CNUUAS/CNUUAS.github.io', label: 'GitHub ↗' },
      ],
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
            'assets/creative/university/university-media/schoolar_work.webp',
            'assets/creative/university/university-media/Horror_Game_Night.webp',
            'assets/creative/university/university-media/CNU-logo.webp',
          ],
          links:    [],
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
            'assets/creative/valorant-franchise-content/franchise-logo-design/swirly_logo.webp',
            'assets/creative/valorant-franchise-content/franchise-logo-design/swirly_dark_logo.webp',
            'assets/creative/valorant-franchise-content/franchise-logo-design/swirly_green_logo.webp',
            'assets/creative/valorant-franchise-content/franchise-logo-design/swirly_simple_green_logo.webp',
            'assets/creative/valorant-franchise-content/franchise-logo-design/swirly_white.webp',
            'assets/creative/valorant-franchise-content/franchise-logo-design/clover_logo.webp',
          ],
          links:    [],
        },
        {
          title:    'Sticker Designs',
          category: 'Sticker Design',
          desc:     'Player-nickname sticker designs for players in Valorant league.',
          media:    [
            'assets/creative/valorant-franchise-content/sticker-designs/Poster_1.webp',
            'assets/creative/valorant-franchise-content/sticker-designs/Poster_2.webp',
            'assets/creative/valorant-franchise-content/sticker-designs/Poster_3.webp',
            'assets/creative/valorant-franchise-content/sticker-designs/Poster_4.webp',
            'assets/creative/valorant-franchise-content/sticker-designs/Poster_5.webp',
          ],
          links:    [],
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
            'assets/creative/video-game-content/player-banner-art/CheeseBanner.webp',
            'assets/creative/video-game-content/player-banner-art/GhostBanner4.webp',
            'assets/creative/video-game-content/player-banner-art/UcklarBanner.webp',
            'assets/creative/video-game-content/player-banner-art/ZuuBanner3.webp',
          ],
          links:    [],
        },
        {
          title:    'Fan Art',
          category: 'Illustration',
          desc:     'Digital illustrations of characters from games I love — including Wheatley from Portal 2, scenes from Life is Strange, and original character concepts.',
          media:    [
            'assets/creative/video-game-content/fan-art/Wheatley.webp',
            'assets/creative/video-game-content/fan-art/LifeIsStrangeArt.webp',
            'assets/creative/video-game-content/fan-art/KayowBird.webp',
          ],
          links:    [],
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
            'assets/creative/pickleball-business/brand-identity/Pickle_and_Brew_Logo.webp',
            'assets/creative/pickleball-business/brand-identity/PicklePeakArtboard_2.webp',
            'assets/creative/pickleball-business/brand-identity/PicklePeakArtboard_21.webp',
            'assets/creative/pickleball-business/brand-identity/PicklePeakArtboard_3.webp',
          ],
          links:    [],
        },
      ],
    },
  ],

};


/* ─────────────────────────────────────────────────────────────
   SKILL_COLOR_GROUPS — feeds the skill filter bar (Section D).
   The chips themselves aren't a separate list to maintain: every
   tag used anywhere in PROJECTS.coding shows up automatically, and
   which project(s) it links to is looked up from those same `tags`
   arrays at render time. This config only decides color — which
   bucket of related tags gets grouped under the same hue so the
   bar reads as organized by domain without printing group labels.
   A tag not listed in any group here still renders (just in the
   neutral/uncategorized color) — nothing to keep in sync.
   ───────────────────────────────────────────────────────────── */
const SKILL_COLOR_GROUPS = [
  { color: 'var(--accent-hero-a)',   tags: ['ROS 2', 'MAVLink', 'Pixhawk', 'ArduPilot', 'Crazyflie', 'OptiTrack', 'GazeboSim', 'Mission Planner', 'Raspberry Pi', 'Bash Scripts', 'Linux OS'] },
  { color: 'var(--accent-hero-b)',   tags: ['YOLO', 'Computer Vision', 'OpenCV', 'Roboflow'] },
  { color: 'var(--accent-creative)', tags: ['Google Sheets', 'Google Forms', 'Pivot Tables', 'Data Automation', 'Scheduling', 'Apps Script', 'CSV Parsing', 'JSON Parsing'] },
  { color: '#E8618C',                tags: ['HTML', 'CSS', 'JavaScript', 'Shopify'] },
  { color: 'var(--accent-coding)',   tags: ['Python', 'PyCharm', 'Tkinter', 'GUI Development', 'Google Places API'] },
  { color: '#6BCB77',                tags: ['Claude Code', 'Codex'] },
];


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
  let returnFocusEl = null;

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

  // Returns all keyboard-focusable, visible elements inside the overlay.
  function getFocusableEls() {
    return Array.from(overlayEl.querySelectorAll(
      'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )).filter(el => !el.hidden);
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
    returnFocusEl = document.activeElement;
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
    if (returnFocusEl) {
      returnFocusEl.focus();
      returnFocusEl = null;
    }
  }

  function handleKeydown(e) {
    if (overlayEl.hidden) return;
    if (e.key === 'Escape')     { close(); return; }
    if (e.key === 'ArrowLeft')  { go(-1); return; }
    if (e.key === 'ArrowRight') { go(1);  return; }
    if (e.key === 'Tab') {
      const focusable = getFocusableEls();
      if (!focusable.length) return;
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
      }
    }
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
      dot.setAttribute('tabindex', '0');
      dot.setAttribute('aria-label', `Go to item ${i + 1}`);
      dot.addEventListener('click', e => {
        e.stopPropagation();
        index = i;
        renderSlide();
      });
      dot.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          index = i;
          renderSlide();
        }
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
  `;
  panel.appendChild(info);

  return panel;
}

/** Turns a project title into a URL-safe slug: "Drone Research" → "drone-research" */
function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

/**
 * Populate a split-pane explorer: sidebar tabs (desktop/tablet), a
 * select dropdown covering the same projects (mobile — see Responsive
 * in style.css), and the initial detail panel for the first project.
 * Used for both the Coding and Creative sections — galleryStyle
 * ('slide' or 'grid') picks each one's detail-panel preview layout;
 * see buildExplorerPanel(). hashPrefix ('coding' or 'creative') drives
 * URL deep-linking so individual projects are directly shareable.
 */
function buildExplorer(projects, sidebarEl, panelEl, galleryStyle, hashPrefix) {
  if (!projects.length || !sidebarEl || !panelEl) return;

  const tabs = [];

  function showProject(i, pushHash) {
    tabs.forEach((t, ti) => t.classList.toggle('active', ti === i));
    select.value = String(i);

    if (pushHash !== false && hashPrefix) {
      history.replaceState(null, '', '#' + hashPrefix + '/' + slugify(projects[i].title));
    }

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

  return { showProject, projects, tabs };
}


/** Wire up both sections from PROJECTS data — same explorer, different gallery layout. */
function renderProjects() {
  const coding = buildExplorer(
    PROJECTS.coding,
    document.getElementById('coding-sidebar'),
    document.getElementById('coding-panel'),
    'slide',
    'coding'
  );

  const creative = buildExplorer(
    flattenByOrganization(PROJECTS.creative),
    document.getElementById('creative-sidebar'),
    document.getElementById('creative-panel'),
    'grid',
    'creative'
  );

  // Restore from URL hash on initial load (e.g. #coding/valorant-aim-trainer)
  function restoreHash(hash) {
    const match = hash.match(/^#(coding|creative)\/(.+)$/);
    if (!match) return;
    const explorer = match[1] === 'coding' ? coding : creative;
    if (!explorer) return;
    const slug = match[2];
    const idx = explorer.projects.findIndex(p => slugify(p.title) === slug);
    if (idx !== -1) explorer.showProject(idx, false);
  }

  restoreHash(window.location.hash);

  window.addEventListener('popstate', () => restoreHash(window.location.hash));

  return { coding, creative };
}


/* ═══════════════════════════════════════════════════════════════
   D. SKILLS
   ─────────────────────────────────────────────────────────────
   Renders every tag used across PROJECTS.coding as a chip in
   #skills-chips — no separate skill list to maintain, tags are the
   skills. Chips are colored by SKILL_COLOR_GROUPS (Section A) and
   sorted so same-color chips sit together, grouping by domain
   without printing a label. Hovering (or focusing) a chip
   highlights the sidebar tab(s) of every project that uses that
   tag — proof it isn't just a keyword — and clicking jumps to the
   first one, switching its panel via the same showProject() the
   tabs use.
   ═══════════════════════════════════════════════════════════════ */
function setupSkills(coding) {
  const container = document.getElementById('skills-chips');
  if (!container || !coding) return;

  // Every unique tag across the coding projects, in first-seen order.
  const tags = [];
  coding.projects.forEach(p => (p.tags || []).forEach(t => {
    if (!tags.includes(t)) tags.push(t);
  }));

  function colorGroupIndex(tag) {
    const i = SKILL_COLOR_GROUPS.findIndex(g => g.tags.includes(tag));
    return i === -1 ? SKILL_COLOR_GROUPS.length : i;
  }
  const colorOf = tag => (SKILL_COLOR_GROUPS.find(g => g.tags.includes(tag)) || {}).color;

  // Cluster by color group (uncategorized tags trail at the end).
  tags.sort((a, b) => colorGroupIndex(a) - colorGroupIndex(b));

  function matchesFor(tag) {
    return coding.projects
      .map((p, i) => ({ p, i }))
      .filter(({ p }) => (p.tags || []).includes(tag))
      .map(({ i }) => i);
  }

  function highlight(indices, color, on) {
    indices.forEach(i => {
      const tab = coding.tabs[i];
      if (!tab) return;
      tab.classList.toggle('explorer-tab--skill-match', on);
      if (on && color) tab.style.setProperty('--skill-match-color', color);
    });
  }

  function jumpTo(indices) {
    if (!indices.length) return;
    // No scrollIntoView here on purpose: this only swaps the panel
    // content (and, on mobile, the dropdown's selected value) in
    // place. Scrolling the page on every click made repeatedly trying
    // different chips annoying — it kept shoving the skills bar itself
    // out of view, forcing a scroll back up between clicks.
    coding.showProject(indices[0]);
  }

  tags.forEach(tag => {
    const indices = matchesFor(tag);
    const color = colorOf(tag);
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'skill-chip';
    chip.textContent = tag;
    if (color) chip.style.setProperty('--chip-color', color);

    if (indices.length) {
      const titles = indices.map(i => coding.projects[i].title).join(', ');
      chip.setAttribute('aria-label', `${tag} — used in ${titles}. Activate to view.`);
      chip.addEventListener('mouseenter', () => highlight(indices, color, true));
      chip.addEventListener('mouseleave', () => highlight(indices, color, false));
      chip.addEventListener('focus', () => highlight(indices, color, true));
      chip.addEventListener('blur', () => highlight(indices, color, false));
      chip.addEventListener('click', () => jumpTo(indices));
    } else {
      chip.disabled = true;
    }

    container.appendChild(chip);
  });
}


/* ═══════════════════════════════════════════════════════════════
   E. SKILL SWARM
   ─────────────────────────────────────────────────────────────
   A small flock of skill-logo icons in #skill-swarm (the hero's
   canvas), evenly spaced around one shared circular orbit at a
   constant angular speed, that scatter away from the cursor when it
   comes near (a stiff spring back toward that same radius is what
   pulls them back into the circle once the cursor moves off). A light
   separation force keeps two icons from overlapping if a repel ever
   crosses their paths. Desktop-only and motion-safe: skips entirely on
   touch/coarse pointers and when prefers-reduced-motion is set, and
   pauses the animation loop whenever the hero scrolls out of view or
   the tab is hidden.
   ═══════════════════════════════════════════════════════════════ */
function setupSkillSwarm() {
  const canvas = document.getElementById('skill-swarm');
  const hero = document.getElementById('hero');
  if (!canvas || !hero) return;

  // Desktop-only, motion-safe: bail before creating any state, listeners,
  // or drawing a single frame if either check fails.
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;
  if (prefersReducedMotion || !isFinePointer) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // ── Tunables ──
  // One entry per real skill/tool used somewhere in PROJECTS.coding —
  // no duplicates needed now that there's enough real variety to fill
  // the ring on its own.
  const ICON_SOURCES = [
    'assets/icons/python.svg',
    'assets/icons/javascript.svg',
    'assets/icons/html5.svg',
    'assets/icons/css3.svg',
    'assets/icons/git.svg',
    'assets/icons/github.svg',
    'assets/icons/shopify.svg',
    'assets/icons/googlesheets.svg',
    'assets/icons/ros.svg',
    'assets/icons/claude.svg',
  ];
  const ICON_SIZE           = 38;   // CSS px, square
  const ICON_OPACITY        = 0.65;
  const SEPARATION_RADIUS   = 70;   // closer than this, push apart (ramps up near-linearly the closer they get)
  const CURSOR_RADIUS       = 260;  // cursor pushes icons within this range — wide enough that a hover clearly scatters more than one
  const MAX_SPEED           = 170;  // px/sec — raised so a close-range repel reads as a real, snappy launch rather than an instant clamp
  const MIN_SPEED           = 8;    // px/sec — never fully freezes
  const SEPARATION_WEIGHT   = 2.6;  // safety net only — the shared orbit ring already keeps icons apart in the common case
  const ORBIT_WEIGHT        = 3.0;  // dominates when the cursor is away — this is the idle "gently orbiting" behavior
  const ORBIT_TANGENT_SPEED = 30;   // px/sec-ish drive along the orbit — shared by every icon, so spacing never drifts
  const ORBIT_RADIAL_STIFFNESS = 2.6; // stiff spring holding the exact ring radius — this is what makes it read as one clean circle, and what pulls icons back after a repel
  const CURSOR_WEIGHT       = 3.4;  // strong, obvious scatter — see also the *90 scale and the proximity ramp where it's applied
  const WANDER_WEIGHT       = 0.06; // just a hair of imperfection — the ring should read as a "perfect circle", not hand-drawn
  const BOUNDARY_MARGIN     = 60;   // px from an edge before steering back in (rarely triggers; orbit already stays inbounds)
  const BOUNDARY_WEIGHT     = 2.2;

  const icons = ICON_SOURCES.map(src => {
    const img = new Image();
    img.src = src;
    return {
      img,
      x: 0, y: 0, vx: 0, vy: 0,
      orbitRadius: 0,           // shared radius, set once real size is known, below — same for every icon
      wanderAngle: Math.random() * Math.PI * 2,
    };
  });

  let width = 0, height = 0;
  const dpr = Math.max(1, window.devicePixelRatio || 1);

  // Resizes the backing bitmap to the hero's actual CSS size (scaled by
  // devicePixelRatio so icons stay crisp on high-DPI displays), and
  // re-clamps existing icon positions into the new bounds so a window
  // resize can't strand one off-canvas.
  function resize() {
    const rect = hero.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    icons.forEach(icon => {
      icon.x = Math.min(Math.max(icon.x, 0), Math.max(width, 1));
      icon.y = Math.min(Math.max(icon.y, 0), Math.max(height, 1));
    });
  }

  resize();
  // Seed each icon directly onto the shared orbit circle (rather than a
  // random point it would otherwise spend a second or two spring-
  // correcting into place), evenly spaced around it by index so they
  // read as one deliberate ring, not a scatter that happens to circle.
  {
    const orbitRadius = Math.min(width, height) * 0.4;
    icons.forEach((icon, i) => {
      icon.orbitRadius = orbitRadius;

      const theta = (i / icons.length) * Math.PI * 2;
      icon.x = width / 2 + icon.orbitRadius * Math.cos(theta);
      icon.y = height / 2 + icon.orbitRadius * Math.sin(theta);

      // Start already moving tangentially so it eases into orbit
      // immediately instead of snapping from a standing start.
      icon.vx = -Math.sin(theta) * ORBIT_TANGENT_SPEED;
      icon.vy = Math.cos(theta) * ORBIT_TANGENT_SPEED;
    });
  }

  // mousemove/mouseleave just record where the cursor is — they never
  // schedule a frame themselves; the already-running tick() below reads
  // this every frame. That's a deliberate difference from
  // setupScrollLogic()'s rafPending-guard idiom, which throttles a
  // bursty *event*: this loop is a continuous simulation, not an
  // event handler, so it schedules its own frames independently.
  const pointer = { x: 0, y: 0, active: false };
  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;
    pointer.active = true;
  });
  hero.addEventListener('mouseleave', () => { pointer.active = false; });

  function clampSpeed(icon) {
    const speed = Math.hypot(icon.vx, icon.vy);
    if (speed > MAX_SPEED) {
      const s = MAX_SPEED / speed;
      icon.vx *= s; icon.vy *= s;
    } else if (speed < MIN_SPEED) {
      const s = speed > 0.0001 ? MIN_SPEED / speed : 1;
      icon.vx = speed > 0.0001 ? icon.vx * s : MIN_SPEED;
      icon.vy = speed > 0.0001 ? icon.vy * s : 0;
    }
  }

  function update(dt) {
    const cx = width / 2;
    const cy = height / 2;

    icons.forEach(icon => {
      // Separation is now just a collision-avoidance safety net — orbit
      // radii already keep icons apart in the common case, this only
      // matters on the rare pass where two rings' angles briefly line up.
      let sepX = 0, sepY = 0;
      icons.forEach(other => {
        if (other === icon) return;
        const dx = icon.x - other.x;
        const dy = icon.y - other.y;
        const dist = Math.hypot(dx, dy);
        if (dist < SEPARATION_RADIUS && dist > 0.0001) {
          // Ramp the push-apart strength up the closer they get (1 at
          // near-zero distance, 0 at the edge of the radius).
          const strength = (SEPARATION_RADIUS - dist) / SEPARATION_RADIUS;
          sepX += (dx / dist) * strength;
          sepY += (dy / dist) * strength;
        }
      });

      // Orbit around the hero center: a tangential drive (rotation) plus
      // a radial spring back toward the shared orbit radius —
      // the spring is what pulls it back into orbit after a cursor
      // repel pushes it off-ring, with no special-cased "resume orbit"
      // state needed; the two forces just keep summing every frame.
      const rdx = icon.x - cx;
      const rdy = icon.y - cy;
      const r = Math.hypot(rdx, rdy) || 0.0001;
      const tangentX = -rdy / r;
      const tangentY = rdx / r;
      const radialError = icon.orbitRadius - r; // + means pull outward, - means pull inward
      const orbitX = tangentX * ORBIT_TANGENT_SPEED + (rdx / r) * radialError * ORBIT_RADIAL_STIFFNESS;
      const orbitY = tangentY * ORBIT_TANGENT_SPEED + (rdy / r) * radialError * ORBIT_RADIAL_STIFFNESS;

      // Cursor repel — pushes icons away from the pointer instead of
      // toward it, so hovering scatters them off their orbit rather
      // than pulling everything into a knot around the cursor. Scaled
      // by proximity (same ramp as separation, above) rather than a flat
      // push anywhere inside the radius, so the reaction reads as
      // immediate and alive as the cursor closes in, not a binary
      // in-range/out-of-range toggle.
      let repelX = 0, repelY = 0;
      if (pointer.active) {
        const dx = icon.x - pointer.x;
        const dy = icon.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < CURSOR_RADIUS && dist > 0.0001) {
          const proximity = (CURSOR_RADIUS - dist) / CURSOR_RADIUS;
          repelX = (dx / dist) * proximity;
          repelY = (dy / dist) * proximity;
        }
      }

      // Idle wander: the target angle only drifts slowly (scaled by dt),
      // not a fresh random direction every frame — a small nudge added
      // on top of the orbit so it doesn't look mechanically perfect.
      icon.wanderAngle += (Math.random() - 0.5) * 0.6 * dt;
      const wanderX = Math.cos(icon.wanderAngle);
      const wanderY = Math.sin(icon.wanderAngle);

      // Soft boundary steering — safety net for the rare case a cursor
      // repel pushes an icon toward an edge; nudges back inward rather
      // than hard-bouncing or wrapping. The orbit itself already keeps
      // icons inbounds in the common case.
      let boundX = 0, boundY = 0;
      if (icon.x < BOUNDARY_MARGIN) boundX = 1;
      else if (icon.x > width - BOUNDARY_MARGIN) boundX = -1;
      if (icon.y < BOUNDARY_MARGIN) boundY = 1;
      else if (icon.y > height - BOUNDARY_MARGIN) boundY = -1;

      const ax = SEPARATION_WEIGHT * sepX
               + ORBIT_WEIGHT      * orbitX
               + CURSOR_WEIGHT     * repelX * 90
               + WANDER_WEIGHT     * wanderX * 20
               + BOUNDARY_WEIGHT   * boundX * 30;
      const ay = SEPARATION_WEIGHT * sepY
               + ORBIT_WEIGHT      * orbitY
               + CURSOR_WEIGHT     * repelY * 90
               + WANDER_WEIGHT     * wanderY * 20
               + BOUNDARY_WEIGHT   * boundY * 30;

      icon.vx += ax * dt;
      icon.vy += ay * dt;
      clampSpeed(icon);

      icon.x += icon.vx * dt;
      icon.y += icon.vy * dt;
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.globalAlpha = ICON_OPACITY;
    icons.forEach(icon => {
      // Skip drawing until each small local SVG has actually loaded —
      // avoids a blank/broken glyph flashing on the very first frames.
      if (!icon.img.complete || !icon.img.naturalWidth) return;
      ctx.drawImage(icon.img, icon.x - ICON_SIZE / 2, icon.y - ICON_SIZE / 2, ICON_SIZE, ICON_SIZE);
    });
    ctx.globalAlpha = 1;
  }

  let running = false;
  let rafId = null;
  let lastTime = null;

  function tick(timestamp) {
    if (!running) return;
    if (lastTime === null) lastTime = timestamp;
    // Clamp dt so a long pause (tab backgrounded, slow frame) can't
    // fling every icon across the canvas in one jump when it resumes.
    const dt = Math.min((timestamp - lastTime) / 1000, 0.05);
    lastTime = timestamp;

    update(dt);
    draw();
    rafId = requestAnimationFrame(tick);
  }

  function start() {
    if (running) return;
    running = true;
    lastTime = null;
    rafId = requestAnimationFrame(tick);
  }

  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
  }

  // Resize handling — rAF-throttled the same way setupScrollLogic()
  // throttles its scroll listener, since resize can also fire rapidly.
  let resizePending = false;
  window.addEventListener('resize', () => {
    if (resizePending) return;
    resizePending = true;
    requestAnimationFrame(() => {
      resizePending = false;
      resize();
    });
  });

  // Pause whenever the hero scrolls out of view — same IntersectionObserver
  // idiom as setupReveal(), but this observer keeps firing indefinitely
  // (no unobserve) since the hero can scroll in and out many times in
  // one session, unlike a reveal-once fade-in.
  let heroVisible = false;
  const heroObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      heroVisible = entry.isIntersecting;
      if (heroVisible && !document.hidden) start();
      else stop();
    });
  }, { threshold: 0 });
  heroObserver.observe(hero);

  // ...and whenever the tab itself is hidden, independent of scroll position.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else if (heroVisible) start();
  });
}


/* ═══════════════════════════════════════════════════════════════
   F. SCROLL LOGIC
   ─────────────────────────────────────────────────────────────
   Shows/hides the nav after the hero scrolls out of view.
   ═══════════════════════════════════════════════════════════════ */
function setupScrollLogic() {
  const nav  = document.getElementById('site-nav');
  const hero = document.getElementById('hero');
  if (!nav || !hero) return;

  let rafPending = false;
  window.addEventListener('scroll', () => {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(() => {
      rafPending = false;
      if (window.scrollY > hero.offsetHeight * 0.6) {
        nav.classList.add('nav--visible');
      } else {
        nav.classList.remove('nav--visible');
      }
    });
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

  // 2. Build the coding explorer and creative section
  const { coding, creative } = renderProjects();

  // 3. Skills filter bar — cross-links into the Technical explorer above
  setupSkills(coding);

  // 4. Scroll-driven nav reveal
  setupScrollLogic();

  // 5. Scroll reveal for headers and cards
  setupReveal();

  // 6. Hero skill-logo swarm (desktop-only, motion-safe — no-ops otherwise)
  setupSkillSwarm();

  // 7. Footer year — fills in automatically
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
