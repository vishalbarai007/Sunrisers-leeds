---
name: landing-page-core
description: Master entry point and 7-phase pathway for building any landing page or category microsite from client files (client/ or client-spec.json) and reference sites. Use whenever the user asks to plan, design, or build a landing page or microsite. Orchestrates intake, reference analysis, archetype selection, LANDING_PLAN.md, motion, media, build, and QA.
---

# Landing Page Core (Unified Engine Router)

The master pathway for building high-converting landing pages and specialized microsites with minimal token overhead. Phases run in order.

## Companion Skills

### Core Pathway Skills
- `landing-page-design-refs` (Phase 2): Analyse and merge competitor/reference sites (`client/competitors.md`) and convert superdesign.dev references into Tailwind + shadcn.
- `landing-page-styles` (Phase 4): Design tokens, typography roles, spacing primitives (`Section`, `Container`, `SectionHeader`), palette selection, and contrast checks.
- `landing-page-animations` (Phase 5): Motion budget (Tier 1 vs Tier 2), section-to-motion map, and centralized `src/lib/gsap.ts` setup.
- `landing-page-media` (Phase 5): Client media inventory first (`client/media/`), then Magnific stock API or category assets, optimized into `public/media/` with `manifest.md`.

### Category Archetype Skills (Phase 3 & 6)
When the client brief or `client-spec.json` matches a specialized vertical, load the corresponding archetype skill alongside this pathway:
- `build-static-landing`: High-speed 5-section conversion landing page for SaaS, waitlists, and launches.
- `build-sports-franchise`: Sports franchise, athletic club, or motorsport racing showcase (GSAP depth hero, Cadillac F1 clip-path roster, 3D ball/helmet, cascading news bento, fixtures & standings).
- `build-real-estate`: Luxury real estate & property showcase (aperture hero, master GSAP gallery, floorplan scrubber, location radar, VIP booking/brochure/film modals).
- `build-brand-gsap`: Luxury brand / agency storytelling microsite with Lenis + GSAP pinned narratives.
- `build-interactive-3d`: Tech/AI/hardware showcase with React Three Fiber (`@react-three/fiber`) WebGL canvas hero.
- `build-portfolio-static`: Creative bento-grid portfolio with case studies, metrics, and contact drawer.
- `build-micro-ecommerce`: Boutique product drop microsite with persistent Zustand cart, WhatsApp checkout, and optional Stripe session.
- `build-sanity-cms`: Editorial multi-page business site backed by Sanity CMS + ISR revalidation.

### Craft & QA Skills (Phase 5–7)
- `design-eng`: UI polish, unseen details, custom easing curves, and before/after review tables.
- `animate`: Step-by-step construction of custom animations (`RECIPES.md`).
- `find-animation-opportunities`: Identify high-leverage motion moments and reject unnecessary motion.
- `review-animations`: Audit motion against the 10 non-negotiable standards (`STANDARDS.md`).
- `animation-performance`: Ensure 60/120fps compositor-only performance.
- `animation-vocabulary`: Translate motion descriptions into exact design engineering terms.
- `mobile-native`: Make mobile web feel native (`100svh`/`100dvh`, `16px` inputs, gated `:hover`, safe areas).
- `break-ui`: Stress-test components with realistic worst-case data (`CATALOG.md`).
- `pick-ui-library`: Curated library selector for specialized UI primitives.

---

## Inputs (Hybrid Intake)
Check in this order before asking the user anything:
1. `.agents/rules/rules.md` (and `.claude/rules.md` — applies to everything below)
2. **Mode A — Detailed Client Brief (`client/`):**
   - `client/company.md`: business, audience, tone, CTAs, brand assets, real proof
   - `client/copy.md`: static copy by section (used verbatim)
   - `client/competitors.md`: list of reference URLs with notes
   - `client/media/`: videos and images supplied by the user
3. **Mode B — Rapid Spec Intake (`client-spec.json`):**
   - If `client/*.md` files are blank/template-only and `client-spec.json` is populated, use `client-spec.json` (`archetype`, `brand`, `navigation`, `leadCapture`, `contentSummaries`) to drive the build.

If both are empty or missing critical blocking details, ask only for what is needed to continue. Never invent fake proof (testimonials, numbers, awards, logos).

---

## Phases

### 1. Intake
Summarise what you read in 5–8 lines: who the client is, who the page is for, the primary action/CTA the page drives, tone, and intake mode (Mode A `client/` or Mode B `client-spec.json`). List any gaps (missing copy, proof, media, brand assets) and ask only blocking questions.

### 2. Reference Analysis
If `client/competitors.md` has URLs (or the chosen archetype skill defines benchmark URLs), run `landing-page-design-refs`. Output a compact comparison and one merged direction (shared section order, best idea to borrow from each, what to avoid, how the client differentiates).

### 3. Archetype & Sections
Select the page archetype (`static-landing`, `sports-franchise`, `real-estate`, `brand-gsap`, `interactive-3d`, `portfolio-static`, `micro-ecommerce`, `sanity-cms`, or custom SaaS/devtool/fintech). Choose the section list and order so each section has one clear job and one primary message.

### 4. Plan: Write `LANDING_PLAN.md`
Create `LANDING_PLAN.md` at the project root:
- Goal and primary CTA (exact label)
- Archetype, motion budget tier (Tier 1 Standard or Tier 2 Immersive Showcase), and merged reference direction
- Section list in order: purpose, copy/data source (`client/copy.md` heading or `src/data/*.ts` file), layout, media needed, motion (ID or "none" + purpose)
- Style direction: semantic palette tokens, font pair, border-radius and surface style via `landing-page-styles`
- Gaps and `TODO(placeholder)` items
- Deviations from `rules.md`, if any, with reason

In Mode A (pitch builds), show `LANDING_PLAN.md` to the user and wait for approval before writing component code. In Mode B (rapid `client-spec.json` execution when the user asks for an immediate build), generate `LANDING_PLAN.md` and proceed directly to Phase 5–6.

### 5. Assign Motion & Media
- **Motion:** Run `landing-page-animations` (and `find-animation-opportunities`). Stay strictly within the Tier 1 or Tier 2 budget in `rules.md` section 8.
- **Media:** Run `landing-page-media`. Use `client/media/` first, then Magnific stock or category assets.
Update `LANDING_PLAN.md` with the final assignments.

### 6. Build
Order of work:
1. Verify stack dependencies (`package.json`) and `src/lib/gsap.ts` plugin registration.
2. Configure semantic tokens and fonts in `app/globals.css` and `app/(site)/layout.tsx` (`landing-page-styles` + `.agents/rules/design-tokens.md`).
3. Populate decoupled content in `content/site.ts` or strictly-typed `src/data/*.ts` (`src/types/dataContracts.ts`). Zero hardcoded copy in JSX.
4. Build or verify shared primitives: `Section`, `Container`, `SectionHeader`/`SectionTitle`, `Button`, card wrappers, and motion wrappers (`Reveal`, `SmoothScrollProvider`).
5. Build sections one at a time in plan order, keeping components modular (under ~250 lines per file).
6. Wire Zod-validated lead capture (`src/types/formSchemas.ts` + `app/actions/submitContactForm.ts`).
7. Configure SEO metadata, Open Graph, `sitemap.ts`, and `robots.ts`.

### 7. QA
Run the Definition of Done checklist in `rules.md` section 11:
- Run `review-animations`, `animation-performance`, and `mobile-native` checks.
- Optionally stress-test with `break-ui`.
- Check viewports at `375px`, `768px`, `1024px`, and `1440px`.
- Run `npm run build` and report what passed, what failed, and any remaining `TODO(placeholder)` items.

---

## Project Structure

```
app/
  (site)/
    layout.tsx          # next/font setup, metadata, SmoothScrollProvider, Navbar
    page.tsx            # composes sections in plan order
    robots.ts
    sitemap.ts
  actions/
    submitContactForm.ts # Zod + honeypot + Google Sheets + Resend server action
  globals.css           # Semantic design tokens, utility classes, mobile-native baseline
src/
  components/
    ui/                 # shadcn/Radix primitives (Button, Input, Dialog, Sheet, etc.)
    reusable/           # Shared primitives: Navbar, Footer, Section, Container, SectionTitle
    animations/         # Motion wrappers: SmoothScrollProvider, Reveal, Marquee
    3d/                 # Three.js / R3F WebGL models (for 3D & Sports archetypes)
    sections/           # Modular page sections (<250 lines each, zero hardcoded copy)
  data/                 # Decoupled typed data files (or content/site.ts)
  lib/
    gsap.ts             # Single centralized GSAP + ScrollTrigger + useGSAP registration
    googleSheets.ts
    resend.ts
    utils.ts
  types/
    dataContracts.ts    # TypeScript interfaces for all section data
    formSchemas.ts      # Zod validation schemas
public/
  media/                # Optimised AVIF/WebP images and videos
client/                 # Pitch brief inputs (company.md, copy.md, competitors.md, media/)
client-spec.json        # Rapid 6-question intake config
LANDING_PLAN.md         # Approved architecture & motion/media plan
```
