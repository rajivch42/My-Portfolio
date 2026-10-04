# Rajiv Chaurasiya — Portfolio

A dark, technical portfolio for **Rajiv Chaurasiya**, Full Stack Developer and B.Tech IT student at VIT Pune.
Built with Vite 5 + React 18 + Tailwind CSS 3 + GSAP + Motion + Lenis.

> **Theme:** *Night sky, launch pad.*  
> Dark only. Big type. One memorable moment per section.

---

## ✨ Features

- **Comet Cursor** — Ion-cyan dot, lagging ring (lerp 0.15), canvas particle trail, magnetic snap, `"View"` context badge over project cards, `"drag"` badge over the cube, and click spark burst. Disabled on touch and `prefers-reduced-motion`.
- **3D Skill Cube** — Pure CSS 3D cube with 6 technology faces, mouse position inertia tracking, idle spin, touch drag/swipe, floor shadow, and face tooltips.
- **Circular Skill Carousel** — 16 tiles at ~340px radius, smooth continuous auto-rotation, hover pause, and pointer drag.
- **Poster-Style Project Cards** — Massive outlined numerals (`01`, `02`, `03`) using `-webkit-text-stroke: 2px var(--ion-cyan)`, technical bullets, and demo/repo action buttons.
- **Masked Shooting Stars Canvas** — Velocity-driven shooting stars canvas masked strictly to the Projects section.
- **Scrubbed Education Timeline** — Glowing shooting star head travels down the central axis via GSAP `ScrollTrigger` (scrub: 0.5) and ignites milestone cards as it arrives.
- **Cmd/Ctrl+K Command Palette** — Keyboard-first modal with focus trap to jump to any section, open external social/coding profiles, or copy email.
- **Fully Accessible & Responsive** — WCAG AA contrast compliance, keyboard focus rings, `prefers-reduced-motion` fallbacks, zero horizontal overflow across 360px–2560px.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Build Tool | Vite 5 |
| UI Framework | React 18 |
| Styling | Tailwind CSS 3 + Design Tokens (`src/styles/tokens.css`) |
| Animation | GSAP 3 + ScrollTrigger, Motion |
| Smooth Scroll | Lenis |
| 3D Visualization | Pure CSS 3D transforms |
| Iconography | Devicon + Simple Icons (Pure SVG, zero emoji) |
| Typography | Google Fonts (Sora & JetBrains Mono) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js **20+**
- npm or pnpm

### Development

```bash
npm install
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173).

### Production Build

```bash
npm run build
npm run preview
```

Production bundle output is code-split and optimized under `dist/` (initial JS bundle is ~113 KB gzipped, well within the 250 KB budget).

---

## 📁 Content Management

All site content is decoupled from JSX and centralized in `src/data/`:
- `links.js` — All outbound links & repository URLs
- `profile.js` — Personal summary, status, email, role
- `stats.js` — Hero metrics & LeetCode statistics
- `skills.js` — Cube faces, carousel items, plain-text skill groups
- `projects.js` — Featured project case studies & technical bullets
- `education.js` — Academic qualifications & timeline entries
- `achievements.js` — Verified milestones & awards
- `socials.js` — External profile links
