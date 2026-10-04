# Architecture

---

## 1. Stack

| Layer | Choice | Why |
|---|---|---|
| Build | **Vite 5** | Fastest dev server, tiny prod bundle, first-class React support |
| Framework | **React 18** | Concurrent features, `Suspense`, stable |
| Styling | **Tailwind CSS 3** | Utility-first, no runtime, matches design tokens |
| Animation | **GSAP 3 + ScrollTrigger** | Best-in-class scroll-driven animation, free |
| Motion | **Motion (Framer Motion successor)** | Declarative component animation |
| 3D | **CSS 3D transforms** for cube, **three + @react-three/fiber + drei** only if needed | Cube is pure CSS for perf |
| Components | **React Bits** via `npx shadcn add` | Copy-in components, no runtime bloat |
| Smooth scroll | **Lenis** | Handles inertial scroll, hooks into GSAP |
| Icons | **devicon** + **simple-icons** (SVG) | Inline or self-host, no emoji |
| Fonts | **Google Fonts** (Sora + JetBrains Mono) | `display=swap`, self-host later if needed |
| Router | **None** — single page with anchor scrolling | Portfolio doesn't need routing |
| State | **React `useState` + context** where needed | No Redux, no Zustand |

---

## 2. Folder Structure
rajiv-portfolio/
├── public/
│ ├── rajiv.jpg # Hero photo (replace this)
│ ├── og-image.png # Social share image
│ ├── projects/
│ │ ├── voyageur.png
│ │ ├── page-replacement.png
│ │ └── civic-issue.png
│ ├── favicon.svg
│ └── robots.txt
│
├── src/
│ ├── main.jsx # React entry
│ ├── App.jsx # Layout + section composition
│ ├── index.css # Tailwind + design tokens (CSS vars)
│ │
│ ├── data/ # ALL content lives here
│ │ ├── links.js # All external URLs (with TODO)
│ │ ├── profile.js
│ │ ├── stats.js
│ │ ├── skills.js
│ │ ├── projects.js
│ │ ├── education.js
│ │ ├── achievements.js
│ │ └── socials.js
│ │
│ ├── sections/ # One file per section
│ │ ├── Navbar.jsx
│ │ ├── Home.jsx
│ │ ├── Skills.jsx
│ │ ├── Projects.jsx
│ │ ├── Coding.jsx
│ │ ├── Education.jsx
│ │ └── Footer.jsx
│ │
│ ├── components/ # Reusable pieces
│ │ ├── CometCursor.jsx
│ │ ├── CommandPalette.jsx
│ │ ├── Cube.jsx # CSS 3D cube
│ │ ├── SkillCarousel.jsx
│ │ ├── ProjectCard.jsx
│ │ ├── ShootingStars.jsx # Canvas for Projects
│ │ ├── EducationTimeline.jsx
│ │ ├── PhotoFrame.jsx
│ │ ├── Icon.jsx # Wraps devicon/simple-icons SVGs
│ │ ├── Button.jsx
│ │ ├── Tag.jsx
│ │ └── SectionTitle.jsx
│ │
│ ├── hooks/ # Custom hooks
│ │ ├── useScrollSpy.js # Active navbar section
│ │ ├── useIntersection.js # Pause off-screen canvases
│ │ ├── useReducedMotion.js
│ │ ├── useIsTouch.js
│ │ └── useMousePosition.js
│ │
│ ├── lib/
│ │ ├── gsap.js # GSAP + ScrollTrigger setup
│ │ ├── lenis.js # Smooth scroll singleton
│ │ └── canvas.js # DPR-aware canvas helper
│ │
│ └── styles/
│ └── tokens.css # Design tokens as CSS variables
│
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── jsconfig.json # Path aliases (@/)
├── package.json
└── README.md


---

## 3. Data Flow


- **No state management library.** Content is imported directly.
- **Links** are imported from `src/data/links.js` everywhere. Never hardcoded.
- **Section visibility** for navbar highlighting uses an IntersectionObserver
  via `useScrollSpy`.

---

## 4. Rendering Strategy

| Concern | Approach |
|---|---|
| Initial render | Static HTML from Vite, hydrate with React |
| Heavy sections (Skills cube, Carousel, Projects canvas) | `React.lazy` + `<Suspense>` |
| Off-screen canvases | Paused via `useIntersection` hook |
| Fonts | `<link rel="preconnect">` + `display=swap` |
| Images | `loading="lazy"` for below-fold, `decoding="async"` |
| DPR cap | `Math.min(window.devicePixelRatio, 2)` in canvas helpers |

---

## 5. Cursor Architecture
CometCursor.jsx
├── <canvas> — particle trail (cyan/violet sparks)
├── <div.cursor-dot> — ion-cyan dot, follows pointer exactly
├── <div.cursor-ring> — thin ring, lerps toward pointer (0.15)
└── ClickSpark (React Bits) — spawns burst on mousedown

State machine:
idle → dot + ring at rest
over-link → ring snaps to element bounds (Magnet)
over-card → ring grows, shows "View"
over-cube → ring shows "drag"
pressed → spark burst


- Mounted only when `!isTouch && !prefersReducedMotion`.
- Native cursor hidden via `body { cursor: none }` **only** in that case.

---

## 6. Animation Architecture

| Animation | Library | Trigger |
|---|---|---|
| Hero name decrypt | React Bits `DecryptedText` | on mount |
| Role shine | React Bits `ShinyText` | on mount |
| Stats count | React Bits `CountUp` | in-view |
| Cube follow | `requestAnimationFrame` + lerp | mousemove |
| Cube idle spin | CSS animation (paused when off-screen) | idle |
| Carousel rotate | CSS transform or GSAP | idle, hover pause |
| Project stack | React Bits `ScrollStack` | scroll |
| Shooting stars | Canvas + `rAF` | scroll velocity |
| Education star | GSAP ScrollTrigger (scrub: true) | scroll |
| Photo conic border | CSS `@keyframes rotate` | idle |
| Cursor trail | Canvas + `rAF` | mousemove |

---

## 7. Performance Budget

| Metric | Target |
|---|---|
| Initial JS | ≤ 250KB gzip |
| Initial CSS | ≤ 30KB gzip |
| LCP (desktop 4G) | < 2.0s |
| CLS | < 0.05 |
| Lighthouse perf | ≥ 90 desktop |
| Frame time | ≤ 16ms |

**Techniques used:**
- `React.lazy` for Skills, Projects, Education (heavy).
- `useIntersection` to pause `rAF` loops and canvas rendering.
- DPR capped at 2.
- Images in AVIF/WebP with PNG fallback.
- Fonts subset via `&text=` where possible.
- No CSS-in-JS runtime (Tailwind only).

---

## 8. Accessibility Architecture

- All animations check `useReducedMotion()` before mounting.
- Focus trap inside `CommandPalette` when open.
- Skip-to-content link at the top of `<body>`.
- All canvas content is decorative (`aria-hidden="true"`).
- Section headings use semantic `<h2>`.
- `<nav aria-label="Primary">` for navbar.

---

## 9. Deployment

- **Host:** Vercel (recommended) or Netlify.
- **Build:** `npm run build` → `dist/`
- **Node:** 20+
- **Env vars:** none required.
- **Domain:** add via Vercel dashboard, then update `og:url` in `index.html`.
- **Preview:** every PR gets a preview URL on Vercel.

---

## 10. Extension Points

Where to add later without refactor:
- New project → add object to `src/data/projects.js`.
- New skill → add to `src/data/skills.js` (cube, carousel, and groups).
- New section → new file in `src/sections/`, add to `App.jsx`, add to `useScrollSpy` list.
- Blog → add React Router and a `/blog` route; keep portfolio at `/`.
