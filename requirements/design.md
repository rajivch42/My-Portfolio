# Design System
## Night Sky, Launch Pad

---

## 1. Design Principles

1. **Calm, dark, technical.** Never loud. The page earns attention, it
   doesn't demand it.
2. **One memorable moment per section.** No section competes with another.
3. **Big type, quiet chrome.** Headlines are large. Supporting UI is thin.
4. **Motion is earned.** Animation is used to signal meaning, not decorate.
5. **The three wows:** cursor, cube, project numerals. Everything else stays quiet.

---

## 2. Colour Tokens

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#070914` | Page background |
| `--ink-soft` | `#0c1020` | Card / glass surface |
| `--ion-cyan` | `#5ee7ff` | Primary accent — cursor dot, edges, links |
| `--nebula-violet` | `#8b7bff` | Secondary accent — inner glow, trail |
| `--ember` | `#ffb36b` | Rare highlight — tag, achievements |
| `--text` | `#e8ecff` | Primary text |
| `--text-muted` | `#8f97bd` | Secondary text, metadata |
| `--stroke` | `rgba(232,236,255,0.10)` | Hairline borders |
| `--glass` | `rgba(232,236,255,0.04)` | Glass surface fill |

**Rules:**
- Body background is always `--ink`. Set explicitly in CSS.
- Gradients only allowed on the photo frame and the cursor trail.
- Ember is never used for text except the "Open to opportunities" tag and achievement border.

---

## 3. Typography

**Families**
- Display + body: **Sora** (400, 600, 800) — Google Fonts
- Mono details: **JetBrains Mono** (400, 500) — Google Fonts

**Fallbacks**
- `--font-display: 'Sora', system-ui, -apple-system, sans-serif`
- `--font-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace`

**Scale**

| Token | Size | Line-height | Tracking | Weight | Family |
|---|---|---|---|---|---|
| `hero-name` | `clamp(3.5rem, 11vw, 9rem)` | 0.95 | -0.04em | 800 | Sora |
| `hero-role` | `clamp(1.75rem, 4vw, 3rem)` | 1.1 | -0.02em | 600 | Sora |
| `section-title` | `clamp(3rem, 8vw, 6rem)` | 1.0 | -0.03em | 800 | Sora |
| `stat-value` | `clamp(3rem, 6vw, 5rem)` | 1.0 | -0.03em | 800 | Sora |
| `project-numeral` | `clamp(6rem, 14vw, 14rem)` | 0.9 | -0.05em | 800 | Sora |
| `body` | `18px` | 1.7 | 0 | 400 | Sora |
| `body-sm` | `16px` | 1.6 | 0 | 400 | Sora |
| `label` | `13px` | 1.4 | 0.05em | 400 | JetBrains Mono |
| `code` | `14px` | 1.5 | 0 | 400 | JetBrains Mono |

**Rules:**
- Body copy max-width: `65ch`.
- Project numerals use `-webkit-text-stroke: 2px var(--ion-cyan)` and
  `color: transparent`.
- No all-caps labels above every heading. Use mono labels sparingly.

---

## 4. Spacing

Base unit: **4px**. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160, 200.

Section vertical padding: `clamp(80px, 12vw, 160px)`.

---

## 5. Layout

**Grid:** 12-column, max-width `1440px`, side gutter `clamp(20px, 5vw, 80px)`.

**Breakpoints**
| Name | Min width |
|---|---|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

**Per-section layout**

- **Home** — 2 columns (60/40) at `lg`+, stacked at `<lg` with photo first.
- **Skills** — 2 columns at `lg`+ (cube left, carousel right), stacked below.
- **Projects** — 1 column, full-bleed cards.
- **Coding** — 3 columns at `lg`+, 1 column below.
- **Education** — timeline centered at `max-width: 800px`.
- **Footer** — single centered column.

---

## 6. Component Library (React Bits)

| Need | Component | Section |
|---|---|---|
| Decrypt hero name | `DecryptedText` | Home |
| Shiny role line | `ShinyText` | Home |
| Number animations | `CountUp` | Home, Coding |
| Stacking project cards | `ScrollStack` **or** `TiltedCard` | Projects |
| 3D card hover | `SpotlightCard` (fallback) | Projects |
| Circular skills ring | `CircularGallery` **or** `RollingGallery` | Skills |
| Cursor magnet | `Magnet` **or** `TargetCursor` | Global |
| Click spark | `ClickSpark` | Global |

Use others only if they clearly improve the result.

---

## 7. Motion Rules

**Allowed:**
- Hero entrance: DecryptedText + ShinyText + CountUp (once on load).
- Scroll-triggered: education shooting star (scrubbed), shooting stars in Projects.
- Hover: cube face tooltip, project card lift, cursor magnet snap.
- Idle: cube slow spin, carousel slow rotation, photo conic border rotation.

**Forbidden:**
- Fade-up on every section.
- Parallax on more than one element per section.
- Auto-playing background animations.
- Any animation running when element is off-screen.

**Reduced motion:** disable cursor trail, cube idle spin, carousel auto-rotate,
shooting stars, conic border rotation. Keep static cube/carousel visible.

---

## 8. Iconography

- Devicon SVG for tech logos (JavaScript, C++, Java, Node, MongoDB, MySQL, etc.).
- Simple Icons SVG for LeetCode, HackerRank, CodeChef, GitHub, LinkedIn.
- Icons sized to match context: 32–48px in cube faces, 24–32px in carousel tiles,
  20–24px in nav/footer.
- No emoji anywhere.

---

## 9. Accessibility Contract

- Every interactive element has a visible `:focus-visible` ring (2px ion-cyan offset 2px).
- Every image has meaningful `alt` (decorative images use `alt=""`).
- Colour contrast: text on `--ink` must pass AA (all tokens above pass).
- Keyboard: full tab order, Cmd/Ctrl+K opens palette, Esc closes, Enter activates.
- `prefers-reduced-motion` fully respected.
- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`.

---

## 10. Content Voice

- First person, direct.
- No buzzwords ("synergy", "leverage").
- Claims backed by numbers or links.
- Sentence case for headings, not Title Case.
- Mono for anything that looks like code, a tag, or metadata.
