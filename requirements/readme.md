# Rajiv Chaurasiya — Portfolio

A dark, technical portfolio for **Rajiv Chaurasiya**, Full Stack Developer.
Built with Vite + React 18 + Tailwind CSS + GSAP + Motion + React Bits.

> Theme: *Night sky, launch pad.*
> Dark only. Big type. One memorable moment per section.

---

## ✨ Features

- **Comet cursor** — ion-cyan dot, lagging ring, particle trail, magnet snap,
  "View" label on project cards, "drag" hint on the cube, spark burst on click.
  Disabled on touch and `prefers-reduced-motion`.
- **3D skill cube** — pure CSS 3D, 6 tech faces, follows cursor with inertia,
  idle spin, touch drag, floor shadow, tooltip on hover.
- **Circular skill carousel** — 16 tiles at ~420px radius, auto-rotates,
  pauses on hover, draggable.
- **Poster-style project cards** — huge outlined numerals, shooting stars
  canvas masked to the Projects section, scroll-velocity-driven.
- **Scrubbed education timeline** — glowing shooting star travels down the
  line and lights each entry as it arrives (GSAP ScrollTrigger).
- **Cmd/Ctrl+K command palette** — jump to any section, open GitHub/LinkedIn,
  open email.
- **Fully accessible** — WCAG AA, keyboard-first, `prefers-reduced-motion`.

---

## 🛠 Stack

| Layer | Tech |
|---|---|
| Build | Vite 5 |
| UI | React 18 + Tailwind CSS 3 |
| Animation | GSAP 3 + ScrollTrigger, Motion |
| Smooth scroll | Lenis |
| 3D | CSS 3D transforms (cube), three.js only if needed |
| Components | [React Bits](https://reactbits.dev) |
| Icons | devicon + simple-icons (SVG) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js **20+**
- npm or pnpm

### Install

```bash
git clone https://github.com/<your-username>/rajiv-portfolio.git
cd rajiv-portfolio
npm install
