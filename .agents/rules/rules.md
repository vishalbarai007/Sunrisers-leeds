# Unified Landing Page & Microsite Engine Rules

Master rules for every landing page and category microsite built with this engine. Both **Google Antigravity** (`.agents/`) and **Claude Code** (`.claude/`) read and enforce this rulebook. Where a rule says "token", use the project's semantic design token, never a raw value.

---

## 1. Stack Defaults & Category Allowances
- **Core Stack:** Next.js (App Router), Tailwind CSS (v4 CSS-first `@theme` in `app/globals.css` preferred; or mapped CSS variables in `globals.css` + `tailwind.config.ts` if existing), shadcn/ui (Radix primitives), GSAP (`gsap`, `ScrollTrigger`, `@gsap/react` `useGSAP`), Lucide icons, Zod + React Hook Form, Sonner (`toast`).
- **UI Primitives:** Always use shadcn/Radix primitives for `Dialog`, `Sheet`, `Tabs`, `Accordion`, `Toast`, and `DropdownMenu`. Never hand-roll custom modal/dropdown divs without focus management.
- **Category-Specific Libraries:**
  - **Standard Landing Pages (`landing-page-core`, `build-static-landing`, `build-portfolio-static`):** Use CSS transitions, shadcn built-ins, and GSAP only. Do not add extra animation or 3D libraries unless required.
  - **High-Craft / Specialized Archetypes (`build-sports-franchise`, `build-real-estate`, `build-interactive-3d`, `build-brand-gsap`, `build-micro-ecommerce`, `build-sanity-cms`):** Allowed to use **Three.js / `@react-three/fiber` / `@react-three/drei`** (for 3D showcases), **Lenis** (`SmoothScrollProvider`), **Embla Carousel**, **Zustand** (cart state), and **Sanity Client** where specified by the category skill.
- Always install the latest stable versions of required packages; if any breaking errors occur, ask for user approval before proceeding.

---

## 2. Hybrid Client Intake & Content Architecture
This engine supports two intake modes so you can build either from a deep pitch brief or a rapid 6-question intake without wasting tokens:

### Mode A: Detailed Pitch / Brief Intake (`client/` Folder)
When `client/company.md`, `client/copy.md`, and `client/competitors.md` are populated:
1. Read `client/company.md` (business, audience, tone, CTAs, brand assets, real proof), `client/copy.md` (verbatim section copy), `client/competitors.md` (reference URLs), and `client/media/`.
2. Generate `LANDING_PLAN.md` at the project root and **wait for user approval** before writing component code (unless the user explicitly says "skip plan approval and build directly").
3. Compile all copy into `content/site.ts` (or typed `src/data/*.ts` modules). Use client wording verbatim.
4. **Never invent proof** (fake numbers, testimonials, client logos, awards, certifications). Mark any missing proof or copy visibly as `TODO(placeholder)` in `LANDING_PLAN.md` and in code.

### Mode B: Rapid Archetype Intake (`client-spec.json`)
When `client/` files are blank or the user invokes a rapid category build (`@build-sports-franchise`, `@build-real-estate`, `@build-static-landing`, etc.) using `client-spec.json`:
1. Read `client-spec.json` (`archetype`, `brand.name`, `brand.vibe`, `brand.palette`, `contentSummaries`, `leadCapture`).
2. Populate decoupled, strictly-typed data contracts in `src/data/*.ts` governed by `src/types/dataContracts.ts` (following `.agents/rules/data-contracts.md`).
3. **Zero Hardcoded Copy in JSX:** Regardless of Mode A or Mode B, React components in `src/components/sections/` must NEVER contain hardcoded paragraphs, headlines, or data arrays. All text, links, and media paths are imported from `content/site.ts` or `src/data/*.ts` and passed via props.

---

## 3. Typography Consistency
- **Max Two Font Families:** One display/heading font (`--font-heading`), one body font (`--font-sans`). Optional `--font-mono` for technical badges/code only.
- **Load via `next/font`:** Load Google or local fonts in `app/(site)/layout.tsx` (or `app/layout.tsx`) with `display: "swap"` and CSS variables.
- **Shared Typography Roles:** Every section title (`H2`) uses the exact same font family, weight, fluid size scale, line-height, and letter-spacing. Define shared typography primitives (`SectionTitle` / `SectionHeader`) or utility classes (`display`, `section-title`, `section-subtitle`, `eyebrow`, `card-title`, `body`, `caption`) once and reuse everywhere. Never restyle `H2` per section unless a category archetype explicitly demands a special feature banner.
- **Hierarchy & Legibility:**
  - Exactly **one `<h1>` per page** (in the Hero). Never skip heading levels (`h1` → `h2` → `h3`).
  - Use fluid type with `clamp()` for `H1` and `H2`.
  - Body text stays `16px` (`1rem`) minimum, `line-height: 1.5–1.7`, measure `60–75ch`.
  - Metadata/badges must remain legible (minimum `12px`/`0.75rem`, or `14px` for standard body labels).
  - Max two font weights for headings across the page.
  - Use `tabular-nums` (`font-variant-numeric: tabular-nums`) on all counters, timers, prices, and points tables.

---

## 4. Spacing, Layout & Shared Primitives
- **Spacing Scale Tokens Only:** Use the 4/8px spacing scale (`py-16 md:py-24`, `gap-6`, etc.). Avoid arbitrary pixel values like `mt-[37px]` or `text-[17px]`.
- **Shared Layout Primitives:** Use shared `<Section>`, `<Container>`, and `<SectionHeader>` primitives (or consistent section tokens):
  - Identical vertical padding across standard sections (`section-y` on mobile, `section-y-lg` on desktop). Hero and full-screen pinned scenes (`100svh` / `100dvh`) may differ.
  - Identical gap (`title-gap`) between a section's header block and its content across all sections.
  - Single container max-width token (`max-w-7xl` / `1280px` or `1400px` container) so content aligns to the same left edge down the page.
- **Grid System:** 12 columns on desktop, 4–6 on mobile. Cards in a row must share equal height, equal padding, and equal border-radius.

---

## 5. Color, Tokens & Surfaces
- **Semantic Tokens Only:** Define colors as semantic tokens in `app/globals.css` (`background`, `foreground`, `surface`, `surface-alt`, `muted`, `muted-foreground`, `primary`, `primary-foreground`, `accent`, `accent-foreground`, `border`, `ring`, `card`). Avoid scattering raw hex values in component JSX.
- **Contrast Requirements:**
  - Body text: minimum **4.5:1** contrast ratio against its surface.
  - Large text & UI components: minimum **3:1** contrast ratio.
  - Verify both light and dark sections if the archetype alternates surfaces.
- **Surface Rhythm:** Alternate section backgrounds sparingly (max two primary surface tokens for standard landing pages).
- **Consistent Card & Button System:**
  - One card style (radius, hairline border/ring, elevation shadow) reused across sections.
  - One `<Button>` component system with consistent variants, radius, hover/focus/disabled states, and `:active` press feedback (`scale(0.97)`).

---

## 6. Components, Forms & Lead Routing
- **Touch Hit Area:** Minimum `44x44px` on mobile/touch devices. Icon-only buttons must have an `aria-label`.
- **Icons:** Single icon library (`lucide-react`), consistent stroke width and size scale.
- **Forms & Validation (`.agents/rules/forms-and-validation.md`):**
  - Visible `<label>` elements, `font-size: 16px` minimum on inputs (prevents iOS Safari auto-zoom), inline validation messages, and clear loading/success/error states via `sonner`.
  - Validate client and server payloads with **Zod** schemas in `src/types/formSchemas.ts`.
  - Include the invisible `honeypot` field trap in Server Actions (`submitContactForm.ts`) and dispatch concurrently (`Promise.allSettled` / `Promise.all`) to Google Sheets and Resend Email when configured.

---

## 7. Media & Asset Optimization (`landing-page-media`)
- **Priority Order:**
  1. Client-supplied assets in `client/media/` or `public/`.
  2. Stock media via Magnific API (`MAGNIFIC_API_KEY` in `.env.local`, logged in `client/media/stock/manifest.md`) or curated high-res category assets saved/optimized into `public/media/`.
  3. Explicit neutral placeholder marked `TODO(placeholder)`.
- **`next/image` Discipline:** Always use `next/image` with explicit `width`/`height` or `fill` + `sizes`. Set `priority` **only** on the above-the-fold Hero LCP image.
- **Alt Text:** Meaningful images get specific, contextual `alt` text (stored in the data file). Purely decorative backgrounds get `alt=""`.
- **Video:** Must be `muted`, `playsInline`, `preload="metadata"`, with a `poster` image. Lazy-load below the fold, pause when off-screen, and provide a static poster fallback for `prefers-reduced-motion`.

---

## 8. Motion, GSAP Setup & Category-Aware Motion Budget (`landing-page-animations` + `animate`)
- **Purpose Gate:** Every animation must have an explicit purpose: *Feedback*, *Spatial consistency*, *State indication*, *Preventing a jarring change*, *Explanation*, or *Delight* (rare/first-time only). Never animate keyboard shortcuts or 100+/day actions.
- **GPU Compositor Properties Only:** Animate `transform` and `opacity` (and `clip-path` where specifically called for by reveal recipes). Never animate `width`, `height`, `margin`, `padding`, `top`, or `left`. Never use `transition: all`—always list exact properties.
- **Easing & Duration Craft (`design-eng` & `animate`):**
  - Never use `ease-in` on UI entrances. Use strong custom curves:
    - `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` (entrances/exits)
    - `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)` (on-screen morph/move)
    - `--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)` (drawers/sheets)
  - Never animate from `scale(0)`—start from `scale(0.95)` + `opacity: 0`.
  - UI micro-interactions stay under `300ms` (button press `100–160ms` with `:active { transform: scale(0.97) }`, popovers/dropdowns `150–250ms`, scroll reveals `400–700ms`).
- **Centralized GSAP Setup:**
  - Register GSAP plugins (`gsap`, `ScrollTrigger`, `useGSAP`) in a single `src/lib/gsap.ts` file.
  - Wrap component animations in `useGSAP` with a `scope` ref for automatic cleanup.
  - Use `gsap.matchMedia()` to gate desktop-only scroll pinning (`(min-width: 768px)`) and respect `(prefers-reduced-motion: reduce)`.
  - Never hide content in static CSS before JS loads (prevent Flash of Invisible Content).
- **Category-Aware Motion Budget:**
  - **Tier 1 — Standard Conversion Landing Pages (`landing-page-core`, `build-static-landing`, `build-portfolio-static`, `build-sanity-cms`, `build-micro-ecommerce`):**
    - Max **1** hero entrance sequence (under ~1.2s, no hero pin/scrub that delays CTA/LCP)
    - Max **1** ambient effect (e.g. slow logo marquee)
    - Max **1** pinned scene across the entire page
    - Max **2** scrubbed effects
    - Everything else uses a single shared `<Reveal>` component pattern.
  - **Tier 2 — Immersive Showcase Archetypes (`build-sports-franchise`, `build-real-estate`, `build-brand-gsap`, `build-interactive-3d`):**
    - May use archetype-specific multi-pinned scenes (e.g., Sports Hero depth zoom, Cadillac F1 clip-path roster stack, 3D WebGL ball/model scroll, expanding gallery scroller, Real Estate aperture carousel) **strictly on desktop (`>= 768px`)**.
    - **Mandatory Mobile Fallback:** On mobile (`< 768px`), disable heavy multi-section scroll hijacking in favor of native touch-swipe carousels (`touch-action: pan-y`) and clean vertical flow.
    - Cap Three.js WebGL canvas DPR at `[1, 1.5]` or `Math.min(window.devicePixelRatio, 2)` to prevent mobile GPU throttling.

---

## 9. Mobile-Native Feel & Responsiveness (`mobile-native`)
- **Mobile-First Viewports:** Verify layouts at `375px`, `768px`, `1024px`, and `1440px` widths. Zero horizontal overflow at any breakpoint.
- **Viewport Units:** Use `min-h-[100svh]` for Heroes (prevents layout jump when mobile URL bar hides) and `100dvh` for fixed app shells/modals.
- **Hover Gating:** Wrap hover transforms/effects in `@media (hover: hover) and (pointer: fine)` so touch devices never get stuck hover states.
- **Touch Polish:** Set `-webkit-tap-highlight-color: transparent` on `html`, `touch-action: manipulation` and `user-select: none` on buttons/controls, and `touch-action: pan-y` on horizontal carousels.
- **Never Disable Zoom:** Never set `user-scalable=no` or `maximum-scale=1`. Use `16px` minimum font size on form inputs instead.

---

## 10. Accessibility, Performance, SEO & Code Hygiene
- **Accessibility:** Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), skip-to-content link first, visible `:focus-visible` ring using the `--ring` token, full keyboard navigation, and `scroll-margin-top` on anchor targets matching the sticky navbar height.
- **Performance Targets:** LCP < 2.5s, CLS < 0.1, INP < 200ms on mobile. Keep sections as Server Components by default where possible, isolating interactive GSAP/motion logic into modular client components.
- **SEO:** Unique `title`, `description`, Open Graph & Twitter metadata, canonical URL, `lang="en"` on `<html>`, and `robots.ts` / `sitemap.ts`.
- **Code Hygiene:**
  - TypeScript strict mode; no unannotated `any`.
  - Modular architecture: keep components focused and single-purpose (split sub-components or extract blocks into `src/components/reusable/` or `src/components/blocks/` so files stay maintainable, targeting ~250 lines max per file).
  - No dead code, no commented-out blocks, no `console.log` in finished code.
  - Always test resilience against worst-case content (`break-ui`: long names/emails, missing optional fields, 0/1/many items).

---

## 11. Definition of Done Checklist
Before declaring any landing page or microsite finished, verify:
- [ ] Every section title (`H2`), subtitle, eyebrow, and body text uses the shared typography definitions
- [ ] Section spacing and container alignment are consistent across the page; no arbitrary pixel hacks
- [ ] Zero hardcoded copy in JSX (all copy in `content/site.ts` or `src/data/*.ts`), zero raw hex values in components, zero invented proof
- [ ] All media uses `next/image` with proper `sizes` and `alt` text; stock assets recorded in `manifest.md` if used
- [ ] Motion stays within the archetype's tier budget, uses `src/lib/gsap.ts` + `useGSAP`, and honors `prefers-reduced-motion`
- [ ] Mobile-native rules applied (`100svh` hero, `16px` inputs, gated `:hover`, `44x44px` touch targets)
- [ ] Checked at `375px` / `768px` / `1024px` / `1440px` viewports; keyboard navigation and Zod form actions work
- [ ] `npm run build` succeeds with zero TypeScript or Next.js errors
