---
name: build-brand-gsap
description: Generates an interactive, brand-focused landing page with centralized GSAP ScrollTrigger animations, smooth scrolling (Lenis), semantic tokens, and editorial typography.
---

# Brand Storytelling & GSAP Microsite Generator (`build-brand-gsap`)

Scaffolds a high-interaction luxury agency, architectural, or flagship brand website featuring momentum smooth scrolling (Lenis), pinned storytelling sequences, and parallax visual depth. Follows `.agents/rules/rules.md` (**Tier 2 Immersive Showcase** budget).

## Workflow Instructions

1. **Provider & Centralized GSAP Setup (`src/lib/gsap.ts`)**:
   - Register `gsap`, `ScrollTrigger`, and `useGSAP` once in `src/lib/gsap.ts`.
   - Wrap `app/(site)/layout.tsx` in `<SmoothScrollProvider>` (Lenis synced to `gsap.ticker`).

2. **Typography & Semantic Tokens (`landing-page-styles`)**:
   - Load max two font families via `next/font` (`display: "swap"`): editorial serif (`Cormorant Garamond` or `Playfair Display`) paired with `Plus Jakarta Sans`.
   - Define semantic tokens in `app/globals.css` (e.g., Deep Obsidian `#0F0F11` background with Champagne Gold `#C5A880` accent) and verify 4.5:1 text contrast.
   - Use shared `<Section>`, `<Container>`, and `<SectionHeader>` primitives.

3. **Motion Architecture (`landing-page-animations` + `animate`)**:
   - Wrap all section animations in `useGSAP(() => { ... }, { scope })` and gate desktop pinning inside `gsap.matchMedia()` for `(min-width: 768px)` and `(prefers-reduced-motion: reduce)`.
   - **Hero (`min-h-[100svh]`)**: Staggered headline entrance + subtle parallax on background media (`yPercent: 15`, GPU `transform` only).
   - **Narrative Section**: 3-slide horizontal card scrub pinned on desktop (`pin: true, scrub: 1`); clean vertical stack or touch-swipe carousel (`touch-action: pan-y`) on mobile (`< 768px`).
   - **Button & Interactive Craft (`design-eng`)**: Gate `:hover` inside `@media (hover: hover) and (pointer: fine)` and apply `:active { transform: scale(0.97) }` press feedback (`150ms ease-out`).

4. **Decoupled Content Compliance**:
   - Store all copy and showcase items in `content/site.ts` (from `client/copy.md`) or `src/data/*.ts` (`src/data/offerings.ts`, `src/data/hero.ts`). Zero hardcoded copy in JSX.

5. **Form Integration & QA**:
   - Place a dark-mode VIP access inquiry form (`16px` min input font size, Zod validation, honeypot) calling `submitContactForm`.
   - Audit animations with `review-animations` and `animation-performance` before running `npm run build`.
