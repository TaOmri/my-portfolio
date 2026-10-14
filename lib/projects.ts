export type Media = {
  /** Path under /public, e.g. /projects/debut/01_hero_live.jpg */
  src: string;
  type?: "image" | "video";
  /** Still frame shown before a video plays. */
  poster?: string;
  alt: string;
  width: number;
  height: number;
  /** Device chrome drawn around the media. Defaults to none. */
  frame?: "browser" | "tablet";
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  year: string;
  role: string;
  platforms: string[];
  stack: string[];
  accent: string;
  accent2: string;
  /** e.g. "Pre-release · TestFlight" */
  status?: string;
  link?: { label: string; href: string };
  cover: Media;
  problem: string;
  solution: string;
  features: { title: string; body: string }[];
  stats: { value: string; label: string }[];
  /** Hard problems solved — rendered as "Engineering notes". */
  engineering?: { title: string; body: string }[];
  gallery: Media[];
};

const debutVideo = (name: string, alt: string): Media => ({
  src: `/projects/debut/${name}.mp4`,
  poster: `/projects/debut/${name}.jpg`,
  type: "video",
  alt,
  width: 640,
  height: 444,
  frame: "tablet",
});

const debutShot = (name: string, alt: string): Media => ({
  src: `/projects/debut/${name}.jpg`,
  alt,
  width: 1800,
  height: 1350,
});

const mondialShot = (name: string, alt: string): Media => ({
  src: `/projects/mondial/${name}.jpg`,
  alt,
  width: 2200,
  height: 1194,
  frame: "browser",
});

const jachnoonShot = (name: string, alt: string): Media => ({
  src: `/projects/jachnoon/${name}.jpg`,
  alt,
  width: 2200,
  height: 1194,
  frame: "browser",
});

/** One night in the pot, as the scroll scene shows it. */
export const jachnoonNight = [
  { time: "22:00", caption: "The pot goes on", media: jachnoonShot("night-intro", "22:00 — the night begins") },
  { time: "01:50", caption: "Lid on, lowest flame", media: jachnoonShot("night-0150", "01:50 — the pot is sealed") },
  { time: "05:30", caption: "Everyone's asleep", media: jachnoonShot("night-0530", "05:30 — dawn breaks") },
  { time: "08:30", caption: "Lid off. Good morning.", media: jachnoonShot("morning", "08:30 — the pot opens") },
];

export const debutDrills = [
  debutVideo("fireball_dribble", "Fireball Dribble"),
  debutVideo("four_corners", "Four Corners"),
  debutVideo("line_shift", "Line Shifts"),
  debutVideo("wall_color_split", "Wall Color Split"),
];

/** All drills live in production. */
export const debutDrillNames = [
  "Juggling", "Dribbling Targets", "Dribble Decisions", "V‑Drag", "Side Steps", "Hurdle Steps",
  "Line Shifts", "Circles", "Balance Hops", "Four Corners", "Cone Target Ring", "Shield & Escape",
  "Wall Rhythm", "Wall Color Split", "Tick Tock Targets", "Falling Gates", "Fireball Dodge",
  "Fireball Dribble", "Find the Window", "Defender Shuffle", "Box to Box", "Reaction Bursts",
];

export const projects: Project[] = [
  {
    slug: "debut",
    title: "Debut",
    tagline: "Your phone's camera becomes a football coach that scores every touch.",
    summary:
      "An iOS football training app that runs a computer‑vision model on the device to track the ball, the player and the cones in real time — and scores 22 interactive AR drills live. Around the drills sits a full community and coaching platform: challenges, battles, groups, coach‑run training sessions and assessments.",
    year: "2026",
    status: "Pre‑release · TestFlight",
    role: "Solo — design, mobile, ML & backend",
    platforms: ["iPhone", "iPad"],
    stack: ["Flutter", "Swift / CoreML", "D‑FINE detector", "FastAPI", "PostgreSQL", "Cloudflare R2", "Firebase Messaging"],
    accent: "#4ade80",
    accent2: "#f97316",
    link: { label: "debutfc.com", href: "https://debutfc.com" },
    cover: debutVideo("fireball_dribble", "Fireball Dribble drill with live ball tracking"),
    problem:
      "Players training on their own get no objective feedback on technique, speed or control — and coaches can't see what happens between sessions.",
    solution:
      "A CoreML detector running at ~22 fps on the phone drives an AR overlay and a single, versioned scoring engine, so every result is comparable and flows into history, leaderboards and coach tools.",
    features: [
      { title: "Real‑time AI drills", body: "22 camera‑scored drills with AR targets, gates and fireballs drawn onto the live feed." },
      { title: "On‑device detection", body: "A D‑FINE model on CoreML finds the ball, cones, feet and players ~22 times a second." },
      { title: "Unified scoring", body: "One additive, versioned formula — reps + combo bonuses − penalties — keeps scores fair across drills." },
      { title: "Coach tools", body: "Groups, assignments, QR‑joined training sessions, assessments and a tactics board." },
      { title: "Compete & share", body: "Global and group challenges, head‑to‑head battles, leaderboards and a social feed." },
      { title: "Family‑safe", body: "Parent‑mediated accounts for under‑13s, plus report and block moderation." },
    ],
    stats: [
      { value: "22", label: "AI‑scored drills live in production" },
      { value: "~22 Hz", label: "On‑device detection, steady for a full drill" },
      { value: "6", label: "Object classes: ball, cone, foot, goal post, ground, player" },
      { value: "4", label: "Languages, including Hebrew (RTL)" },
    ],
    engineering: [
      {
        title: "Beating thermal throttling",
        body: "Unthrottled, detection ran at 30 Hz for ~40 seconds and then collapsed to 15 Hz — right in the middle of every one‑minute drill. Pacing frames at 45 ms holds a steady ~22 Hz from start to finish.",
      },
      {
        title: "Tuning for the ball, not the benchmark",
        body: "Per‑class confidence floors, NMS ceilings and top‑K caps were swept on a 605‑image validation split. The ball floor sits deliberately below its F1 optimum (precision 0.92, recall 0.89): the tracker can absorb a false positive, but nothing downstream can invent a missed ball.",
      },
      {
        title: "Finding the one real ball",
        body: "A stabilizer picks the true ball out of noisy detections using continuity and plausible per‑frame travel — with a separate speed profile so a hard wall pass isn't rejected as a teleport.",
      },
      {
        title: "Licence‑driven model migration",
        body: "Moved from an AGPL YOLO segmentation model to the Apache‑2.0 D‑FINE‑N detector, re‑tuned every threshold, and cut 40 MB of unused weights from the iOS bundle.",
      },
      {
        title: "Scores you can compare",
        body: "A global scoring version plus per‑drill overrides means leaderboards and personal bests only ever compare attempts scored by the same formula.",
      },
    ],
    gallery: [
      debutShot("01_hero_live", "Every touch, scored live"),
      debutShot("02_result_448", "Instant score and real metrics"),
      debutShot("03_history_map", "Drill history with a 2D position map"),
      debutShot("04_drill_picker", "Drill library"),
      debutShot("05_challenge", "Weekly challenges and leaderboard"),
      debutShot("06_feed", "Social feed"),
    ],
  },
  {
    slug: "mondial",
    title: "Mondial",
    tagline: "Fill in the scores — the whole World Cup 2026 bracket builds itself.",
    summary:
      "A zero‑dependency web app for predicting the 48‑team 2026 World Cup. Enter match scores and it applies FIFA's tie‑break rules and the 495‑combination Annex C table to build every group table and the full knockout bracket — down to the champion. Predictions can be kept side by side, exported, or published to a live community feed.",
    year: "2026",
    status: "Live · Personal project",
    role: "Solo — design & development",
    platforms: ["Web (responsive)"],
    stack: ["Vanilla JavaScript", "HTML / CSS", "Firebase Firestore", "localStorage", "GitHub Pages"],
    accent: "#5b8cff",
    accent2: "#f5c542",
    link: { label: "Open the live app", href: "https://taomri.github.io/mondial-2026/" },
    cover: mondialShot("groups", "Group stage with live standings"),
    problem:
      "The new 48‑team format sends eight of the twelve third‑placed teams into a Round of 32, placed by a 495‑combination FIFA table. Filling in a bracket by hand is complicated and easy to get wrong.",
    solution:
      "A rules engine that turns raw scores into correct standings, third‑place rankings and knockout pairings in real time — all inside a single static page, with no framework and no build step.",
    features: [
      { title: "Auto‑calculated standings", body: "Group tables with FIFA tie‑breakers — points, goal difference, goals, then head‑to‑head." },
      { title: "Smart knockout bracket", body: "Round of 32 to the final, placed via FIFA Annex C, with penalties for drawn matches." },
      { title: "Multiple predictions", body: "Create, duplicate, rename and compare alternative predictions side by side." },
      { title: "Ready‑made AI prediction", body: "One click adds a prefilled prediction for all 104 matches as a separate entry." },
      { title: "Community feed", body: "Publish a prediction and browse everyone else's in real time." },
      { title: "Export / import", body: "Move predictions between devices as JSON — older save formats included." },
    ],
    stats: [
      { value: "104", label: "Matches modeled — 72 group, 32 knockout" },
      { value: "495", label: "Third‑place bracket combinations handled" },
      { value: "48", label: "National teams in 12 groups" },
      { value: "0", label: "Frameworks or build steps — one HTML file" },
    ],
    engineering: [
      {
        title: "FIFA tie‑break engine",
        body: "Teams are sorted by points, goal difference and goals scored. Teams still level are re‑ranked on a mini‑table built only from the matches between them, before falling back to draw order.",
      },
      {
        title: "Annex C in one lookup",
        body: "The letters of the eight qualifying third‑placed groups form a key into a 495‑entry table, which tells each group winner exactly which third‑placed team it faces.",
      },
      {
        title: "A bracket written as data",
        body: "Every knockout slot is a short code — \"1A\", \"3\", \"W89\", \"L101\" — resolved recursively, so the whole bracket from the Round of 32 to the final comes from 32 lines of data.",
      },
      {
        title: "From right‑to‑left to English",
        body: "Started as a native right‑to‑left Hebrew app built on logical CSS properties, then moved to English — responsive down to phone width.",
      },
      {
        title: "Safe community sharing",
        body: "Firestore security rules validate the shape of every post and make posts immutable, and all user text is escaped before rendering to prevent XSS.",
      },
    ],
    gallery: [
      mondialShot("schedule", "Match schedule — all 104 matches by date"),
      mondialShot("knockout", "Knockout bracket with penalties"),
      mondialShot("community", "Community predictions"),
      mondialShot("groups", "Group stage with live standings"),
    ],
  },
  {
    slug: "jachnoon",
    title: "Talma's Jachnoon",
    tagline: "Scroll through one night in the pot — then order Shabbat breakfast on WhatsApp.",
    summary:
      "A Hebrew, right‑to‑left site for a home kitchen that sells Yemenite jachnoon on Saturday mornings. The page tells the dish's overnight story as a scroll‑driven scene — a clock runs from 22:00 to 08:30 while the sky turns from night to dawn and the lid finally lifts — then hands off to a menu that builds a WhatsApp order in a few taps.",
    year: "2026",
    status: "Live · Small business",
    role: "Solo — design, illustration & development",
    platforms: ["Web (mobile‑first)"],
    stack: ["Vanilla JavaScript", "HTML / CSS", "SVG illustration", "WhatsApp click‑to‑chat", "Netlify"],
    accent: "#f0a94a",
    accent2: "#c4402b",
    link: { label: "Open the live site", href: "https://jachnoon-talma.netlify.app/" },
    cover: jachnoonShot("morning", "08:30 — the lid lifts on a full pot"),
    problem:
      "A one‑woman kitchen that cooks once a week took orders through scattered calls and messages — no menu or prices in one place, and nothing that showed why jachnoon is worth waking up for.",
    solution:
      "One static page with no backend: a scroll story sells the slow overnight cooking, and a menu with a live order slip turns each choice into a ready‑to‑send WhatsApp message to the owner.",
    features: [
      { title: "A night in one scroll", body: "Scrolling runs a clock from 22:00 to 08:30 while stars fade, dawn breaks, the sun rises and the lid comes off." },
      { title: "Hand‑drawn SVG", body: "The pot, dough rolls, brown eggs and dips are drawn in SVG from shared gradients and patterns — no stock art." },
      { title: "WhatsApp ordering", body: "Steppers build an order slip with live totals; one tap opens WhatsApp with the items, total, name and pickup time." },
      { title: "Floating order bar", body: "Once something is in the order, a bar follows you down the page — and steps aside when the slip itself is on screen." },
      { title: "Native right‑to‑left", body: "Written in Hebrew from the first line, with Waze, call and WhatsApp links for a phone‑first audience." },
      { title: "One place to edit", body: "Menu, prices, hours, address and phone live in a single config object, so details change without touching the layout." },
    ],
    stats: [
      { value: "10.5h", label: "Of overnight cooking, told in one scroll" },
      { value: "6", label: "Story beats, from rolling the dough to opening the pot" },
      { value: "0", label: "Servers, frameworks or build steps" },
      { value: "1", label: "Config object for the menu, prices and hours" },
    ],
    engineering: [
      {
        title: "One number drives the scene",
        body: "Scroll progress is read once per animation frame and turned into a handful of CSS custom properties — stars, dawn, morning, sun, lid — each eased with smoothstep. Every layer animates in plain CSS, with no animation library.",
      },
      {
        title: "A clock that tells the story",
        body: "Progress maps onto 10.5 hours in 10‑minute steps. Captions switch as the clock passes each story beat, and it reaches 08:30 just before the lid lifts — the moment pickup opens.",
      },
      {
        title: "Orders without a backend",
        body: "The order is written into a WhatsApp click‑to‑chat link as a formatted, URL‑encoded message, so the business gets structured orders with no server, database or fees.",
      },
      {
        title: "A bar that knows where you are",
        body: "An IntersectionObserver watches the order slip; the floating bar only appears when there's an order and the slip is off screen, and toggles its tab order and aria‑hidden with it.",
      },
    ],
    gallery: [
      jachnoonShot("night-0150", "01:50 — the clock runs through the night"),
      jachnoonShot("night-0530", "05:30 — dawn over the pot"),
      jachnoonShot("menu", "The menu"),
      jachnoonShot("order", "Order slip, sent on WhatsApp"),
      jachnoonShot("info", "When and where — Waze, call and WhatsApp"),
      jachnoonShot("night-intro", "22:00 — where the story starts"),
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const getNextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};
