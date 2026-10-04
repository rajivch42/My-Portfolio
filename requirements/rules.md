# Project Rules

Non-negotiable conventions. If a rule conflicts with a task, ask before breaking it.

---

## 1. Code Style

- **Language:** JavaScript (JSX), not TypeScript. Keep it simple for a portfolio.
- **Formatting:** Prettier defaults + 2-space indent.
- **Linting:** ESLint with `eslint-plugin-react` and `eslint-plugin-react-hooks`.
- **Naming:**
  - Components: `PascalCase.jsx`
  - Hooks: `useCamelCase.js`
  - Data files: `camelCase.js`
  - CSS classes: Tailwind utilities only, custom classes in `kebab-case`
- **Imports:** Absolute paths with `@/` alias. Order: React → libs → `@/` → relative → CSS.
- **No `any`-style shortcuts.** No `// @ts-ignore` (N/A but same spirit — no disabling lint rules inline).

---

## 2. Content Rules

- **All content lives in `src/data/`.**
  Never hardcode a name, URL, stat, or project in JSX.
- **All external links go through `src/data/links.js`.**
  If a URL is unknown, use `"#"` with a `TODO:` comment.
- **Never invent numbers.** If a stat doesn't exist, render an "Add your stats" state.
- **Never publish:** date of birth, phone number, home address.
- **Email:** `67rajivchaurasiya@gmail.com` (single source in `profile.js`).

---

## 3. Design Rules

- Follow `design.md` tokens exactly. No new hex values without updating tokens.
- **Dark only.** No light mode.
- **No emoji.** Use devicon/simple-icons SVGs.
- **No gradient washes as decoration.** Gradients only on:
  - Photo frame border
  - Cursor trail
  - Cube inner glow
- **No all-caps labels above headings.**
- **Section titles are `<h2>`.** Only hero name is `<h1>`.
- **Body text max-width: `65ch`.**
- **Type must be big.** Don't shrink hero or section titles on desktop.

---

## 4. Animation Rules

- **One memorable moment per section.** Don't stack animations.
- **Respect `prefers-reduced-motion`.** Non-negotiable. Disable:
  cursor trail, cube idle spin, carousel auto-rotate, shooting stars,
  conic border rotation, CountUp (show final value instantly).
- **Pause off-screen.** Every `rAF` loop and canvas checks `useIntersection`.
- **Cap DPR at 2.** Canvas helpers must clamp.
- **No animation on scroll for scroll's sake.** Only Education timeline
  and Projects shooting stars are scroll-linked by design.
- **No autoplay video.** No animated GIFs. No Lottie over 50KB.

---

## 5. Accessibility Rules

- **Every interactive element:** visible `:focus-visible` ring.
- **Every image:** `alt` (or `alt=""` if decorative).
- **Canvas:** `aria-hidden="true"`.
- **Keyboard:** All flows reachable with Tab. Palette has focus trap.
- **Contrast:** AA minimum. Test with axe DevTools before launch.
- **Semantic HTML:** `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`.
- **Skip link:** always present at top of `<body>`.

---

## 6. Performance Rules

- **Initial JS ≤ 250KB gzip.** Check with `npx vite-bundle-visualizer`.
- **Lazy-load:** Skills, Projects, Education sections.
- **Images:** `loading="lazy"` below fold, `decoding="async"`, AVIF/WebP preferred.
- **Fonts:** `display=swap`, preconnect, subset if possible.
- **No CSS-in-JS.** Tailwind only.
- **No unused deps.** Remove anything not shipped.
- **Lighthouse ≥ 90 desktop** before merging to `main`.

---

## 7. Git Rules

- **Branches:** `main` (deploy), `feat/…`, `fix/…`, `chore/…`.
- **Commits:** Conventional Commits.
  - `feat(cursor): add magnet snap on links`
  - `fix(cube): prevent jitter on touch drag`
  - `chore(deps): bump gsap to 3.12.5`
- **PRs:** one phase per PR. Include screenshots for visual changes.
- **Never commit:** `.env`, `node_modules`, `.DS_Store`, build output.

---

## 8. Component Rules

- **One component per file.**
- **Props first, data second.** Components accept props; sections read from `data/`.
- **No prop drilling past 2 levels.** Use context or restructure.
- **Every component has a default export.**
- **Section components end in `Section`?** No — use plain names (`Home`, `Skills`).
- **Reusable primitives** (`Button`, `Tag`, `Icon`) live in `src/components/`.

---

## 9. Hook Rules

- **Prefix with `use`.**
- **Return a stable shape** (object or tuple). Don't mix.
- **Clean up** every listener, observer, timer, and `rAF` in `useEffect` return.
- **No side effects in render.**
- **Guard browser APIs** (`window`, `document`) for SSR-safety — even though we don't SSR, it keeps hooks portable.

---

## 10. Testing Checklist (manual, before each PR)

- [ ] Works at 360px, 375px, 414px, 768px, 1024px, 1440px
- [ ] No horizontal scroll at any width
- [ ] Keyboard: Tab order sane, focus visible everywhere
- [ ] `prefers-reduced-motion: reduce` → animations disabled
- [ ] Touch device → no comet cursor, native cursor visible
- [ ] All external links open correctly (no 404)
- [ ] Console clean (no errors, no warnings)
- [ ] Lighthouse desktop ≥ 90
- [ ] Lighthouse mobile ≥ 80

---

## 11. Things We Never Do

- ❌ Hardcode content in JSX
- ❌ Add a dependency without checking bundle impact
- ❌ Use `!important` in CSS
- ❌ Use `any` in TypeScript (N/A — but same energy: don't disable lint)
- ❌ Ship without testing reduced-motion
- ❌ Ship without testing on real mobile
- ❌ Invent stats, testimonials, or projects
- ❌ Add emoji
- ❌ Use a gradient wash as decoration
- ❌ Break the 3-wow rule (cursor, cube, numerals)
