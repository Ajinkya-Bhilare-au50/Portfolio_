# UI Polish & Update Plan

Branch: `update1` · Reviewed: 2026-11-15

The portfolio already has a strong identity: a red (`#ff2a2a`) / black / white palette, bold type, and a dark-mode toggle. The site doesn't need a redesign. This plan fixes broken details, tightens consistency, and makes the work samples carry more weight.

Each item has a priority:

- **P0**: broken or misleading. Fix first.
- **P1**: makes the biggest visual difference.
- **P2**: nice to have.

---

## P0 — Broken or misleading

| # | Issue | Where | Fix |
|---|---|---|---|
| 1 | The **"Certifications"** nav link goes nowhere because no section has `id="certifications"`. | `src/components/Navbar.jsx:16` | Add a Certifications section, or remove the link. |
| 2 | The footer nav has no **Projects** link. | `src/components/Footer.jsx:5` | Add `'Projects'` to `NAV_LINKS`. Better: share one `NAV_LINKS` array in `siteConfig.js` and use it in both the navbar and the footer. |
| 3 | The **LinkedIn** link is `#`. | `src/siteConfig.js:5` | Add your real LinkedIn URL. |
| 4 | Every project's **Live Demo / Source Code** link is `#`, and each one opens a blank new tab. | `src/data/projects.js` | Add the real URLs. Set a field to `''` to hide its button until you have the link. |
| 5 | The hero video **stops at the end**: it has no `loop`, and `onEnded` freezes it. | `src/components/Hero.jsx:40-50` | Add `loop`, add a `poster` image, and delete the unused `isPlaying` state. |
| 6 | The mute control is a clickable `<div>`, so keyboard and screen-reader users can't reach it. | `src/components/Hero.jsx:107-129` | Make it a `<button>` with `aria-label` and `aria-pressed`. |
| 7 | The page has **two `<h1>`s**: the hero heading and the decorative "CONTACT" text. | `src/components/Contact.jsx:110` | Make the decorative text a `<div aria-hidden="true">`. |
| 8 | **White text on `#ff2a2a` fails WCAG AA contrast** (about 3.6:1, and lower for `text-white/80`). | `src/components/About.jsx:97-111` | Use black or near-black body text on the red, keep white only for large headings, or darken the About background to about `#e01e1e`. |

---

## P1 — Biggest visual upgrades

### 1. Real project screenshots (the biggest win)
All three projects show the placeholder browser mockup. Visitors judge a portfolio by its work, so real screenshots matter most.
- Capture 1600×1000 screenshots and save them as `.webp` in `src/assets/projects/`.
- Set `image:` in `src/data/projects.js`. The card layout already supports it.
- Optional: show a short muted looping preview (`.webm`) when a card is hovered.

### 2. Give the hero your name and a sharper message
"Hi, I'm a Full Stack Developer" is generic, and visitors won't see your name until the About section.
- Suggested heading: **"Ajinkya Bhilare"** in large type, with "Full-Stack & AI Developer" as a smaller line underneath.
- The gradient on the heading's `<span>` goes from white to white, so it has no visible effect. Either remove it or use a real gradient (white → `#ff2a2a`).
- Add a stronger bottom gradient (`from-black/70`) so the text stays readable on any video frame.
- Add a row of small trust signals under the buttons, such as `3 projects · 29 technologies · Open to work`.

### 3. Typography system
The site uses the system font, and `font-['Caveat']` is referenced but never loaded, so it falls back to whatever cursive font the browser has.
- Load one display font and one text font, for example **Space Grotesk** or **Clash Display** for headings and **Inter** for body text. Self-host them, or use Google Fonts with `display=swap`.
- Load **Caveat** properly, or drop the handwritten line.
- Define the fonts in `@theme` in `src/index.css`:
  ```css
  @theme {
    --font-display: "Space Grotesk", system-ui, sans-serif;
    --font-sans: "Inter", system-ui, sans-serif;
    --font-hand: "Caveat", cursive;
  }
  ```

### 4. Design tokens instead of hard-coded values
`#ff2a2a` is typed out more than 60 times, along with `#0a0a0a`, `#111`, `#141414` and `#f7f7f7`. Define them once:
```css
@theme {
  --color-brand: #ff2a2a;
  --color-brand-dark: #c41616;
  --color-ink: #0a0a0a;
  --color-surface: #111111;
  --color-muted: #f7f7f7;
}
```
Then use `bg-brand`, `text-brand`, `shadow-brand/40`, and so on. Changing a color or tuning the theme becomes a one-line edit.

### 5. Consistent section headers
Each section builds its own label and heading, and they differ: Expertise uses a pill badge, while the others use a line and uppercase text. Create one `<SectionHeader eyebrow title subtitle />` component and use it everywhere. This one change will make the site look much more consistent.

### 6. Shorten the preloader
The preloader holds the page for **2.2 s**, then spends **1.2 s** sliding away: about 3.4 s before anyone sees content, on every visit.
- Cut it to about 1.2 s total, or dismiss it when `window.onload` fires.
- Show it only once per session (`sessionStorage`).
- Skip it for users who set `prefers-reduced-motion`.

### 7. Navbar polish
- Underline or color the link for the section currently on screen, using an `IntersectionObserver`.
- The logo uses `href="#"`. Change it to `#home`.
- Remove `focus:outline-none` from the hamburger button and add `focus-visible:ring-2 ring-brand`.
- Lock page scrolling while the mobile menu is open, and close the menu when the user presses Esc.

### 8. Expertise section layout
The desktop layout uses absolute positioning inside a fixed **1350px** height, so it breaks on tablet widths (768–1024px) and with long text.
- Use the zig-zag card layout only at `lg:` and above. Below that, use the stacked layout.
- Active cards get `border-red-400`, but since they have no `border` class, no border appears. Add `border`.
- Remove the hidden leftover `<path className="hidden">` in the arrow SVG.
- Give each card an icon, such as the ones `Skills.jsx` already uses (`TbLayout`, `TbServer`, `TbBrain`, `TbCloud`).

---

## P2 — Nice to have

- **Use one animation library.** The site uses both **AOS** and **framer-motion**. Moving the AOS animations to framer-motion's `whileInView` would remove a dependency and its CSS. A shared `fadeUp` variant would keep timings consistent.
- **Respect `prefers-reduced-motion` everywhere**: the parallax effects, the Expertise path animation, the pulsing elements, and the drop-bounce badge. framer-motion has `useReducedMotion()` for this.
- **Custom cursor or magnetic buttons** on desktop for the main calls to action (the red "Let's Talk" circle is a good candidate).
- **Testimonials or experience timeline** section between Projects and Contact.
- **Certifications section** (this also fixes P0 #1): a grid of logo cards with the issuer, date and a verify link.
- **Résumé download** button in the navbar or the About section.
- **Skills counts:** derive the "29+ Technologies" stat in `About.jsx:16` from `skillsData` so it can't go out of date.
- **Contact form:** show a red border and a message under any field that fails validation, instead of relying on the browser's default tooltip.
- **Hover states on touch devices:** the `hover:-translate-y` effects can get stuck on mobile. Wrap them in `@media (hover: hover)` or use Tailwind's `hover:` with `hoverOnlyWhenSupported`.

---

## Performance & SEO

| Item | Fix |
|---|---|
| `ajinkya-desk.png` is **1.0 MB** | Convert it to `.webp`/`.avif` (target under 150 KB). |
| Unused assets: `ajinkya.png` (1.1 MB), `mongodb.png`, `node.png`, `react.png` | Delete them. |
| `src/App.css` is leftover Vite boilerplate and nothing imports it | Delete it. |
| The hero video (1.6 MB) has no poster | Add a poster frame plus `preload="metadata"`, and serve a smaller file on mobile. |
| `index.html` has no meta description or Open Graph/Twitter tags | Add a description, `og:title`, `og:image` (a 1200×630 preview), and `twitter:card`. |
| `README.md` is still the Vite template | Replace it with a project description, the tech stack, a screenshot and the live URL. |
| `npm install` reports 11 known vulnerabilities in dependencies (4 moderate, 7 high) | Run `npm audit fix` and test again. |

---

## Suggested order of work

1. Fix all P0 items (about 1 hour).
2. Add project screenshots and real links (P1-1).
3. Add design tokens and the typography system (P1-3, P1-4), and replace hard-coded colors.
4. Add the shared `SectionHeader` component (P1-5).
5. Update the hero copy and shorten the preloader (P1-2, P1-6).
6. Polish the navbar and fix the Expertise layout (P1-7, P1-8).
7. Do the performance and SEO cleanup.
8. Pick P2 items as time allows.

## Progress log

| Date | Change | Status |
|---|---|---|
| 2026-11-15 | Created the `update1` branch and this plan | ✅ |
| 2026-11-15 | P0 #1–2: removed the dead Certifications link; navbar and footer now share `NAV_LINKS` from `siteConfig.js` | ✅ |
| 2026-11-15 | P0 #3–4: LinkedIn and project links set to `''` (hidden until real URLs are added) | ⏳ needs URLs |
| 2026-11-15 | P0 #5–8: hero video loops, mute control is a real button, only one `<h1>`, About text now dark on red | ✅ |
| 2026-11-15 | P1-2: hero shows name, a gradient role line and a trust-signal row | ✅ |
| 2026-11-15 | P1-3/4: Inter + Space Grotesk + Caveat loaded; `brand` color token replaces hard-coded `#ff2a2a` | ✅ |
| 2026-11-15 | P1-6: preloader cut to ~2 s, shown once per session, skipped for reduced motion | ✅ |
| 2026-11-15 | P1-7: active-section highlight, `#home` logo link, focus rings, Esc closes menu, scroll lock | ✅ |
| 2026-11-15 | P1-8 (partial): active card border fixed, leftover SVG removed | ✅ |
| 2026-11-15 | SEO: meta description + Open Graph tags (og:image still TODO); removed `App.css` and ~1.5 MB of unused images | ✅ |
| 2026-11-15 | Added project #4: Aurelia Fine Jewellery (live link + real screenshot), shown first | ✅ |
| 2026-11-15 | Hero: replaced the background video with a 1920×1080 still taken from it; removed the mute button; mobile text moved low with a dark fade | ✅ |
| 2026-11-15 | New Skills Dashboard section (KPI tiles, skills by area, tech usage across projects, proficiency meters); skills data moved to `src/data/skills.js` | ✅ (proficiency values are placeholders) |
| — | Still open: project screenshots (P1-1), `SectionHeader` component (P1-5), Expertise tablet layout, convert the About photo to WebP, `npm audit fix` | ⏳ |
