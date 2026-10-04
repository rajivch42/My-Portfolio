# Build Phases

Eight phases, each shippable on its own. Do not start a phase until the
previous one is visually verified in the browser.

---

## Phase 0 — Setup (½ day)

**Goal:** Runnable Vite + React + Tailwind shell.

- [x] `npm create vite@latest rajiv-portfolio -- --template react`
- [x] Install Tailwind, PostCSS, Autoprefixer
- [x] Install GSAP, Motion, Lenis
- [x] Install React Bits components:
  - ShinyText
  - DecryptedText
  - CountUp
  - Project Cards & Outlined Numerals
  - Circular 3D Gallery / Carousel
  - Magnet
  - ClickSpark
- [x] Set up `jsconfig.json` path alias `@/ → src/`
- [x] Create `src/styles/tokens.css` with all design tokens
- [x] Wire Tailwind `theme.extend` to read tokens
- [x] Set `body { background: #070914; color: #e8ecff; }` in `index.css`
- [x] Add Google Fonts `<link>` to `index.html` (Sora 400/600/800, JetBrains Mono 400/500)
- [x] Verify `npm run dev` shows a dark, empty page

**Ship:** Dark page with fonts loaded, no errors.

---

## Phase 1 — Data Layer (½ day)

**Goal:** Every piece of content lives in `src/data/`.

- [x] Create `links.js` with all URLs (TODO placeholders where unknown)
- [x] Create `profile.js` — name, role, summary, email
- [x] Create `stats.js` — hero stats + LeetCode stats
- [x] Create `skills.js` — cube faces, carousel items, 4 skill groups
- [x] Create `projects.js` — the 3 projects with all fields
- [x] Create `education.js` — 3 entries
- [x] Create `achievements.js` — 2 wins
- [x] Create `socials.js` — GitHub, LinkedIn, LeetCode

**Ship:** All content importable; no JSX yet.

---

## Phase 2 — Layout + Navbar (1 day)

**Goal:** Structural shell with sticky glass nav.

- [x] `App.jsx` renders `<Navbar /> + <main> + <Footer />`
- [x] Build `Navbar.jsx` — glass blur, sticky, links to 5 sections
- [x] Build `useScrollSpy` hook → active link highlight
- [x] Set up Lenis smooth scroll + GSAP ScrollTrigger integration
- [x] Build `SectionTitle.jsx` component
- [x] Build `Button.jsx`, `Tag.jsx`, `Icon.jsx` primitives
- [x] Add skip-to-content link
- [x] Add empty `<section>` stubs for Home, Skills, Projects, Coding, Education, Footer

**Ship:** Nav scrolls, section anchors work, active highlight follows scroll.

---

## Phase 3 — Home Section (1 day)

**Goal:** Hero with animated name, role, stats, photo.

- [x] `Home.jsx` — 2-col grid, mobile stacks with photo first
- [x] Name via `<DecryptedText>` on load
- [x] Role via `<ShinyText>`
- [x] Summary paragraph from `profile.js`
- [x] 4 CTAs wired to `links.js`
- [x] 3 CountUp stats in a horizontal row with dividers
- [x] `PhotoFrame.jsx` — conic-gradient rotating border + ember tag
- [x] Verify reduced-motion: name/role show instantly, conic border paused

**Ship:** Hero looks finished on desktop and mobile.

---

## Phase 4 — Skills Section (2 days)

**Goal:** Cube + carousel + plain groups.

- [x] `Cube.jsx` — CSS 3D, 6 faces, 300px desktop / 220px mobile
- [x] Cube face: devicon SVG, glass bg, cyan edge, violet inner glow
- [x] Cube rotation: `useMousePosition` + lerp, idle spin, touch drag
- [x] Cube floor shadow (radial-gradient below)
- [x] Cube tooltip on face hover
- [x] `SkillCarousel.jsx` — 16 tiles, radius ~420px, auto-rotate, hover pause, drag
- [x] Front tile bright, back tiles dim (opacity + brightness)
- [x] Below: 4 skill groups in plain typography, no boxes
- [x] Lazy-load cube and carousel with `React.lazy`
- [x] `useIntersection` pauses cube `rAF` and carousel rotation off-screen

**Ship:** Skills section is the visual centrepiece it should be.

---

## Phase 5 — Projects Section (2 days)

**Goal:** Poster cards + shooting stars.

- [x] `Projects.jsx` renders 3 `<ProjectCard />`
- [x] `ProjectCard.jsx` — outlined numeral, screenshot, title, bullets, tags, 2 buttons
- [x] Numeral uses `-webkit-text-stroke`
- [x] `ShootingStars.jsx` canvas — masked to Projects section only
- [x] Stars speed tied to scroll velocity, spawn 3–5/sec, cap 20
- [x] `useIntersection` pauses canvas off-screen
- [x] Replace screenshots with `public/projects/*.png`

**Ship:** Scrolling through projects feels cinematic.

---

## Phase 6 — Coding + Education (1.5 days)

**Goal:** Coding cards, achievements, timeline.

- [x] `Coding.jsx` — 3 cards (LeetCode with stats, HackerRank/CodeChef with empty state)
- [x] LeetCode stats via CountUp
- [x] Two achievement lines below with ember left border
- [x] `Education.jsx` — vertical timeline, 3 entries
- [x] `EducationTimeline.jsx` — GSAP ScrollTrigger scrubbed shooting star
- [x] Each entry lights up when the star passes

**Ship:** Both sections finished and linked from navbar.

---

## Phase 7 — Signature Cursor (1.5 days)

**Goal:** Comet cursor with magnet, label, spark.

- [x] `CometCursor.jsx` — dot + ring + canvas trail
- [x] Ring lerps at 0.15
- [x] Trail particles fade, length scales with speed
- [x] Over links: `Magnet` snap
- [x] Over project cards: ring grows, shows "View"
- [x] Over cube: shows "drag"
- [x] `ClickSpark` on mousedown
- [x] `useIsTouch` + `useReducedMotion` → cursor doesn't mount; native cursor stays

**Ship:** Cursor is the site's signature. Test on touch (must not appear).

---

## Phase 8 — Command Palette + Polish (1 day)

**Goal:** Cmd/Ctrl+K palette + final QA.

- [x] `CommandPalette.jsx` — modal, focus trap, Esc to close
- [x] Sections list → scroll to section
- [x] Profiles list → open GitHub, LinkedIn, LeetCode
- [x] Contact → open mailto
- [x] Test keyboard: Cmd/Ctrl+K, arrows, Enter, Esc
- [x] Accessibility audit: focus rings, contrast, alt text
- [x] Responsive QA at 360, 375, 414, 768, 1024, 1440, 1920
- [x] Reduced-motion QA
- [x] Lighthouse desktop target (113KB gzipped JS, 6.7KB gzipped CSS, lazy-loaded chunks)
- [x] `og-image.png` + meta tags
- [x] `robots.txt` + `sitemap.xml`
- [x] README final pass

**Ship:** Production-ready. Deploy to Vercel.

---

## Post-Launch (optional, v1.1)

- Real screenshots for all 3 projects (generated high-res UI mockups in place).
- Add HackerRank / CodeChef stats when available.
- Optional blog via `/blog` route.
- Optional `/uses` page.
