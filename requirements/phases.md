# Build Phases

Eight phases, each shippable on its own. Do not start a phase until the
previous one is visually verified in the browser.

---

## Phase 0 — Setup (½ day)

**Goal:** Runnable Vite + React + Tailwind shell.

- [ ] `npm create vite@latest rajiv-portfolio -- --template react`
- [ ] Install Tailwind, PostCSS, Autoprefixer
- [ ] Install GSAP, Motion, Lenis
- [ ] Install React Bits components:
npx shadcn@latest add @react-bits/ShinyText-TS-TW
npx shadcn@latest add @react-bits/DecryptedText-TS-TW
npx shadcn@latest add @react-bits/CountUp-TS-TW
npx shadcn@latest add @react-bits/ScrollStack-TS-TW
npx shadcn@latest add @react-bits/CircularGallery-TS-TW
npx shadcn@latest add @react-bits/Magnet-TS-TW
npx shadcn@latest add @react-bits/ClickSpark-TS-TW

- [ ] Set up `jsconfig.json` path alias `@/ → src/`
- [ ] Create `src/styles/tokens.css` with all design tokens
- [ ] Wire Tailwind `theme.extend` to read tokens
- [ ] Set `body { background: #070914; color: #e8ecff; }` in `index.css`
- [ ] Add Google Fonts `<link>` to `index.html` (Sora 400/600/800, JetBrains Mono 400/500)
- [ ] Verify `npm run dev` shows a dark, empty page

**Ship:** Dark page with fonts loaded, no errors.

---

## Phase 1 — Data Layer (½ day)

**Goal:** Every piece of content lives in `src/data/`.

- [ ] Create `links.js` with all URLs (TODO placeholders where unknown)
- [ ] Create `profile.js` — name, role, summary, email
- [ ] Create `stats.js` — hero stats + LeetCode stats
- [ ] Create `skills.js` — cube faces, carousel items, 4 skill groups
- [ ] Create `projects.js` — the 3 projects with all fields
- [ ] Create `education.js` — 3 entries
- [ ] Create `achievements.js` — 2 wins
- [ ] Create `socials.js` — GitHub, LinkedIn, LeetCode

**Ship:** All content importable; no JSX yet.

---

## Phase 2 — Layout + Navbar (1 day)

**Goal:** Structural shell with sticky glass nav.

- [ ] `App.jsx` renders `<Navbar /> + <main> + <Footer />`
- [ ] Build `Navbar.jsx` — glass blur, sticky, links to 5 sections
- [ ] Build `useScrollSpy` hook → active link highlight
- [ ] Set up Lenis smooth scroll + GSAP ScrollTrigger integration
- [ ] Build `SectionTitle.jsx` component
- [ ] Build `Button.jsx`, `Tag.jsx`, `Icon.jsx` primitives
- [ ] Add skip-to-content link
- [ ] Add empty `<section>` stubs for Home, Skills, Projects, Coding, Education, Footer

**Ship:** Nav scrolls, section anchors work, active highlight follows scroll.

---

## Phase 3 — Home Section (1 day)

**Goal:** Hero with animated name, role, stats, photo.

- [ ] `Home.jsx` — 2-col grid, mobile stacks with photo first
- [ ] Name via `<DecryptedText>` on load
- [ ] Role via `<ShinyText>`
- [ ] Summary paragraph from `profile.js`
- [ ] 4 CTAs wired to `links.js`
- [ ] 3 CountUp stats in a horizontal row with dividers
- [ ] `PhotoFrame.jsx` — conic-gradient rotating border + ember tag
- [ ] Verify reduced-motion: name/role show instantly, conic border paused

**Ship:** Hero looks finished on desktop and mobile.

---

## Phase 4 — Skills Section (2 days)

**Goal:** Cube + carousel + plain groups.

- [ ] `Cube.jsx` — CSS 3D, 6 faces, 300px desktop / 220px mobile
- [ ] Cube face: devicon SVG, glass bg, cyan edge, violet inner glow
- [ ] Cube rotation: `useMousePosition` + lerp, idle spin, touch drag
- [ ] Cube floor shadow (radial-gradient below)
- [ ] Cube tooltip on face hover
- [ ] `SkillCarousel.jsx` — 16 tiles, radius ~420px, auto-rotate, hover pause, drag
- [ ] Front tile bright, back tiles dim (opacity + brightness)
- [ ] Below: 4 skill groups in plain typography, no boxes
- [ ] Lazy-load cube and carousel with `React.lazy`
- [ ] `useIntersection` pauses cube `rAF` and carousel rotation off-screen

**Ship:** Skills section is the visual centrepiece it should be.

---

## Phase 5 — Projects Section (2 days)

**Goal:** Poster cards + shooting stars.

- [ ] `Projects.jsx` renders 3 `<ProjectCard />` in `ScrollStack`
- [ ] `ProjectCard.jsx` — outlined numeral, screenshot, title, bullets, tags, 2 buttons
- [ ] Numeral uses `-webkit-text-stroke`
- [ ] `ShootingStars.jsx` canvas — masked to Projects section only
- [ ] Stars speed tied to scroll velocity, spawn 3–5/sec, cap 20
- [ ] `useIntersection` pauses canvas off-screen
- [ ] Replace screenshots with `public/projects/*.png`

**Ship:** Scrolling through projects feels cinematic.

---

## Phase 6 — Coding + Education (1.5 days)

**Goal:** Coding cards, achievements, timeline.

- [ ] `Coding.jsx` — 3 cards (LeetCode with stats, HackerRank/CodeChef with empty state)
- [ ] LeetCode stats via CountUp
- [ ] Two achievement lines below with ember left border
- [ ] `Education.jsx` — vertical timeline, 3 entries
- [ ] `EducationTimeline.jsx` — GSAP ScrollTrigger scrubbed shooting star
- [ ] Each entry lights up when the star passes

**Ship:** Both sections finished and linked from navbar.

---

## Phase 7 — Signature Cursor (1.5 days)

**Goal:** Comet cursor with magnet, label, spark.

- [ ] `CometCursor.jsx` — dot + ring + canvas trail
- [ ] Ring lerps at 0.15
- [ ] Trail particles fade, length scales with speed
- [ ] Over links: `Magnet` snap (React Bits)
- [ ] Over project cards: ring grows, shows "View"
- [ ] Over cube: shows "drag"
- [ ] `ClickSpark` on mousedown
- [ ] `useIsTouch` + `useReducedMotion` → cursor doesn't mount; native cursor stays

**Ship:** Cursor is the site's signature. Test on touch (must not appear).

---

## Phase 8 — Command Palette + Polish (1 day)

**Goal:** Cmd/Ctrl+K palette + final QA.

- [ ] `CommandPalette.jsx` — modal, focus trap, Esc to close
- [ ] Sections list → scroll to section
- [ ] Profiles list → open GitHub, LinkedIn, LeetCode
- [ ] Contact → open mailto
- [ ] Test keyboard: Cmd/Ctrl+K, arrows, Enter, Esc
- [ ] Accessibility audit: focus rings, contrast, alt text
- [ ] Responsive QA at 360, 375, 414, 768, 1024, 1440, 1920
- [ ] Reduced-motion QA
- [ ] Lighthouse desktop ≥ 90
- [ ] `og-image.png` + meta tags
- [ ] `robots.txt` + `sitemap.xml`
- [ ] README final pass

**Ship:** Production-ready. Deploy to Vercel.

---

## Post-Launch (optional, v1.1)

- Real screenshots for all 3 projects.
- Add HackerRank / CodeChef stats when available.
- Optional blog via `/blog` route.
- Optional `/uses` page.
