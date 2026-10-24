---
name: landing-page-animations
description: Motion plan, category-aware motion budget, and centralized GSAP/ScrollTrigger setup for landing pages and category microsites. Maps each section to its motion, enforces the Tier 1 / Tier 2 motion budget, and routes to the animation craft skills. Use in Phase 5-7 of landing-page-core, or whenever adding, reviewing, or fixing animations.
---

# Landing Page Animations & Motion Budget

Covers page-level motion architecture, centralized GSAP setup, and the category-aware motion budget. Craft details (custom cubic-bezier curves, durations, GPU properties, interruption, and mobile performance) come from the companion animation skills (`design-eng`, `animate`, `review-animations`, `animation-performance`, `mobile-native`). Follows `.agents/rules/rules.md` section 8.

## Precedence
- **Craft skills (`animate`, `design-eng`, `review-animations`, `animation-performance`)** decide curve, duration, properties, interruption, and frame budget.
- **This skill (`landing-page-animations`)** decides page-level scope: which sections move, which tool is used, and the per-page motion budget based on archetype tier.

## Routing to Companion Animation Skills
When invoking any of the craft skills, always pass a concrete task:

| Phase | Skill | Concrete Task |
|---|---|---|
| Always active | `design-eng` | Apply UI polish, `:active` scale(0.97) feedback, origin-aware popovers, and custom easing curves |
| 5. Assign motion | `find-animation-opportunities` | "Find where this page should and should not animate, given `LANDING_PLAN.md`" |
| 5. Assign motion | `pick-ui-library` | Check before adding any UI/motion dependency |
| 6. Build | `animate` | Build each planned animation using `RECIPES.md` (curve, duration, GPU properties, exit, reduced-motion) |
| 6. Build | `animation-vocabulary` | Translate reference site motion into exact technical terms |
| 7. QA | `review-animations` | Audit all animations against `STANDARDS.md` (Before / After / Why table) |
| 7. QA | `animation-performance` | Verify composite-only properties (`transform`, `opacity`), no React state per frame, no layout thrashing |
| 7. QA | `mobile-native` | Verify `100svh`/`100dvh`, `@media (hover: hover) and (pointer: fine)`, `touch-action`, and `16px` inputs |
| 7. QA | `break-ui` | Stress-test animated components with worst-case data (`CATALOG.md`) |

---

## Tool Split
1. **CSS Transitions & `@starting-style`:** Hover/press feedback (`:active { transform: scale(0.97) }`), focus rings, simple state toggles, sticky navbar background transitions.
2. **shadcn / Radix Built-ins:** `Dialog`, `Sheet`, `Accordion`, `Tabs`, `Toast`, `DropdownMenu`. Keep their built-in transitions consistent with `--ease-out` and `--ease-drawer`.
3. **GSAP + ScrollTrigger (`src/lib/gsap.ts`):** Scroll reveals, hero entrance sequence, pinned scenes, scrubbed timelines, marquees.
4. **Specialized Archetype Engines (Tier 2 only):**
   - **Lenis (`SmoothScrollProvider`):** Synced with `gsap.ticker` for `build-brand-gsap`, `build-sports-franchise`, and `build-real-estate`.
   - **Three.js / `@react-three/fiber`:** WebGL 3D canvases for `build-interactive-3d` and `build-sports-franchise` (with DPR capped at `[1, 1.5]`).

---

## Centralized GSAP Setup (`src/lib/gsap.ts`)
- Register all GSAP plugins **once** in `src/lib/gsap.ts`:
  ```ts
  "use client";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { useGSAP } from "@gsap/react";

  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
  }

  export const MOTION_TOKENS = {
    duration: { fast: 0.2, base: 0.5, slow: 0.8 },
    ease: {
      out: "power3.out",
      inOut: "power2.inOut",
      scrub: "none",
    },
  } as const;

  export { gsap, ScrollTrigger, useGSAP };
  ```
- Import `gsap`, `ScrollTrigger`, and `useGSAP` **only** from `@/lib/gsap`.
- Wrap component animations in `useGSAP(() => { ... }, { scope: containerRef })` so ScrollTriggers and timelines automatically clean up on unmount.
- Always use `gsap.matchMedia()` for desktop vs. mobile breakpoints and `(prefers-reduced-motion: reduce)`:
  ```ts
  const mm = gsap.matchMedia();
  mm.add(
    {
      isDesktop: "(min-width: 768px)",
      reduceMotion: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      const { isDesktop, reduceMotion } = context.conditions!;
      if (reduceMotion) {
        gsap.set(".reveal-item", { autoAlpha: 1, y: 0, clearProps: "all" });
        return;
      }
      // Animations here...
    }
  );
  ```
- **No Flash of Invisible Content (FOIC):** Set initial hidden states via JS inside `useGSAP` (or use `@starting-style`), never hardcode `opacity: 0` in static CSS classes that leave the page blank if JS fails or is delayed.
- **GPU Composite Properties Only:** Animate `transform` (`x`, `y`, `xPercent`, `yPercent`, `scale`, `rotation`) and `opacity` (`autoAlpha`). Use `clip-path: inset(...)` only for sanctioned reveal recipes (such as Cadillac F1 card stacks or image reveal wipes). Never animate `width`, `height`, `top`, `left`, `margin`, or `padding`.

---

## Category-Aware Motion Budget (Per Page)

### Tier 1 — Standard Conversion Landing Pages
*(Applies to `landing-page-core` default pitch pages, `build-static-landing`, `build-portfolio-static`, `build-micro-ecommerce`, `build-sanity-cms`)*
- **1 Hero sequence:** Staggered entrance of eyebrow, H1, subtitle, CTA, then media (under ~1.2s total, no pin/scrub in Hero).
- **At most 1 Ambient effect:** Slow logo marquee or subtle floating accent.
- **At most 1 Pinned scene** across the entire page.
- **At most 2 Scrubbed effects** across the entire page.
- **Everything else:** Uses a single shared `<Reveal>` wrapper (consistent `y: 24`, `autoAlpha: 0 -> 1`, `duration: 0.55`, `power3.out`, `30–80ms` stagger).

### Tier 2 — Immersive Showcase Microsites
*(Applies to `build-sports-franchise`, `build-real-estate`, `build-brand-gsap`, `build-interactive-3d`)*
- Allows the category's signature desktop ScrollTrigger scenes defined in the archetype skill (e.g., Sports pinned depth zoom hero + Cadillac F1 clip-path roster stack + 3D model scroll + expanding gallery; or Real Estate aperture hero + master GSAP expanding gallery).
- **Mandatory Rules for Tier 2:**
  1. **Desktop-Only Pinning:** Multi-section scroll pinning must be gated inside `gsap.matchMedia()` for `(min-width: 768px)`.
  2. **Mobile Native Swipe Fallback:** On `< 768px`, disable scroll hijacking/pinning and render touch-friendly Embla/CSS scroll-snap carousels (`touch-action: pan-y`).
  3. **Skip Affordance:** Any pinned scene longer than `150vh` should include a subtle `"Skip Section"` button for keyboard and impatient users.
  4. **Reduced Motion:** When `prefers-reduced-motion: reduce` is active, disable all pins and scrubs so every section renders statically in normal document flow.

---

## Default Section-to-Motion Map (Tier 1 Defaults)

| Section | Default Motion | Avoid |
|---|---|---|
| **Hero** | Staggered entrance (`eyebrow` → `H1` → `subtitle` → `CTA` → `media`), < 1.2s total | Pinning/scrubbing in Tier 1 heroes that delays CTA or hurts LCP |
| **Logo / Proof Bar** | Slow continuous CSS marquee (1 ambient effect) or static grid | Fast scrolling, jarring hover-pause jumps |
| **Features / Bento** | Shared `<Reveal>` with 50ms group stagger | Unique competing animations on every card |
| **How It Works / Steps** | Sequential `<Reveal>` or 1 scrubbed progress line | Pinning short 3-step sections |
| **Product / Showcase** | The 1 allowed pinned or scrubbed scene | Multiple competing pinned showcases in Tier 1 |
| **Stats / Numbers** | Single count-up on first view (`once: true`) with `tabular-nums` | Re-triggering count-up on every scroll up/down |
| **Testimonials** | Shared `<Reveal>`; Embla carousel with `touch-action: pan-y` | Unpausable rapid autoplay |
| **FAQ** | shadcn `Accordion` built-in height/opacity transition | Hand-rolled JS height animations |
| **Contact / Final CTA** | Shared `<Reveal>`, button `:active` press scale(`0.97`) | Looping pulsing/shaking CTA buttons |
| **Buttons / Cards** | CSS `:hover` gated by `@media (hover: hover) and (pointer: fine)` + `:active` scale(`0.97`) in `150ms` | Using GSAP for simple button hovers |
