# Product Requirements Document (PRD)
## Rajiv Chaurasiya — Developer Portfolio

**Version:** 1.0
**Owner:** Rajiv Chaurasiya
**Status:** Ready for build
**Target launch:** Portfolio v1

---

## 1. Overview

A single-page, dark-themed developer portfolio for Rajiv Chaurasiya — a Full
Stack Developer and B.Tech IT student at VIT Pune. The site showcases skills,
projects, coding profiles, and education with a premium, developer-native feel.
It is not a template portfolio. It is designed to feel like a launch pad.

---

## 2. Goals

### Primary
- Present Rajiv as a serious, hireable full-stack developer.
- Make recruiters and peers want to scroll.
- Give every claim a link, number, or proof.

### Secondary
- Be fast (Lighthouse ≥ 90 desktop).
- Be accessible (WCAG AA, keyboard navigable).
- Be maintainable (content lives in data files, not JSX).
- Work flawlessly from 360px up.

### Non-goals
- No blog, no CMS, no auth.
- No dark/light toggle — dark only by design.
- No phone number or date of birth shown publicly.

---

## 3. Target Audience

| Audience | What they need |
|---|---|
| Recruiters | Fast scan of skills, projects, achievements, contact |
| Engineers | Code-quality signals, real project depth, GitHub |
| Peers / judges | Contest wins, LeetCode stats, tech stack clarity |
| Mobile visitors | Same content, no horizontal scroll, no broken layout |

---

## 4. Sections (in order)

1. Sticky glass navbar — Home, Skills, Projects, Coding, Education + Cmd/Ctrl+K palette
2. Home (hero + photo + stats)
3. Skills (3D cube + circular carousel + plain-text groups)
4. Projects (3 poster cards with shooting-star canvas)
5. Coding Profiles (LeetCode / HackerRank / CodeChef + achievements)
6. Education (vertical timeline with scrubbed shooting star)
7. Footer (closing line, email, socials)

---

## 5. Functional Requirements

### FR-1 Hero
- Name animates via DecryptedText on load.
- Role animates via ShinyText.
- Three CountUp stats: 500+, 1691, 9.34.
- Four CTAs: Projects, GitHub, LinkedIn, Email.
- Photo with rotating conic-gradient border + "Open to opportunities" tag.

### FR-2 Skills
- CSS 3D cube: 6 faces, 300px desktop / 220px mobile, follows cursor with lerp inertia, idle spin, touch drag, floor shadow, tooltip on hover.
- Circular carousel: 16 tiles, radius ~420px, auto-rotate, pause on hover, drag.
- Four plain-text skill groups, no boxes.

### FR-3 Projects
- Three poster cards, ScrollStack or TiltedCard.
- Outlined numerals 1, 2, 3 (10–14rem).
- Shooting stars canvas masked to this section only.
- Each card: screenshot area, title, 3 bullets, tech tags, Live demo + GitHub buttons.
- All URLs in `src/data/links.js` with TODO placeholders.

### FR-4 Coding Profiles
- Three cards: LeetCode (with real stats), HackerRank + CodeChef (with "Add your stats" empty state).
- Two achievement lines below with ember accent.
- Never invent numbers.

### FR-5 Education
- Vertical timeline with 3 entries.
- GSAP ScrollTrigger scrubbed shooting star travels down the line.

### FR-6 Cursor
- Comet cursor on desktop only: dot + lagging ring + particle trail + magnet snap + "View" over projects + "drag" hint over cube + click spark burst.
- Disabled on touch and `prefers-reduced-motion`.
- Native cursor never hidden on touch.

### FR-7 Command Palette
- Cmd/Ctrl+K opens.
- Jump to any section.
- Open GitHub, LinkedIn, Email.

### FR-8 Navbar
- Sticky, glass background.
- Active-section highlighting via IntersectionObserver.

---

## 6. Non-Functional Requirements

| Category | Requirement |
|---|---|
| Performance | Lighthouse ≥ 90 desktop, 60fps animations |
| Responsive | 360px → 2560px, zero horizontal scroll |
| Accessibility | WCAG AA contrast, keyboard focus rings, semantic HTML, alt text |
| Motion | Full `prefers-reduced-motion` support |
| SEO | Meta tags, OG image, `sitemap.xml`, `robots.txt` |
| Browser support | Last 2 versions of Chrome, Firefox, Safari, Edge |
| DPR cap | 2 (on retina, canvases render at max 2x) |
| Bundle | Initial JS ≤ 250KB gzipped, lazy-load heavy sections |

---

## 7. Content Sources

All content must live in `src/data/`. Files:
- `links.js` — all external URLs with TODO placeholders
- `profile.js` — name, role, summary, email
- `stats.js` — hero stats, LeetCode stats
- `skills.js` — cube faces, carousel items, skill groups
- `projects.js` — the 3 projects
- `education.js` — the 3 timeline entries
- `achievements.js` — the 2 wins
- `socials.js` — GitHub, LinkedIn, LeetCode

---

## 8. Success Metrics

- LCP < 2.0s on desktop 4G
- CLS < 0.05
- No console errors on production build
- All links resolve (no 404s)
- Works on iPhone SE (375px) and Galaxy S8 (360px)

---

## 9. Out of Scope (v1)

- Blog
- Contact form backend
- Analytics dashboard
- Multi-language
- Light theme
- Admin panel

---

## 10. Milestones

See `phases.md` for the 8-phase build plan.
