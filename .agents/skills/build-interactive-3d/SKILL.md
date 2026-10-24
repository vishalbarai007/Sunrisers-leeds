---
name: build-interactive-3d
description: Generates a modern tech landing page featuring an interactive WebGL 3D canvas hero, model viewer, and particle fields using React Three Fiber, governed by strict GPU and mobile-native performance rules.
---

# Interactive 3D WebGL Landing Page Generator (`build-interactive-3d`)

Scaffolds an advanced 3D interactive experience using Three.js, `@react-three/fiber`, and `@react-three/drei` tailored for AI startups, Web3 protocols, or hardware showcases. Follows `.agents/rules/rules.md` (**Tier 2 Immersive Showcase** budget).

## Workflow Instructions

1. **Canvas Architecture & Performance (`animation-performance`)**:
   - Construct `src/components/3d/Hero3DCanvas.tsx` (or `src/components/animations/Hero3DCanvas.tsx`) using `@react-three/fiber`.
   - Wrap interactive geometry inside `<Float>` and `<Suspense>`.
   - Implement smooth mouse-tracking interpolation inside `useFrame` (never call React `setState` per frame).
   - **Strict Performance Constraints:**
     - Clamp device pixel ratio at `dpr={[1, 1.5]}` to protect mobile GPUs and high-DPI laptops from thermal throttling.
     - Provide a clean fallback/poster for `(prefers-reduced-motion: reduce)` and a lightweight skeleton loader while 3D assets download.

2. **Typography, Tokens & Primitives (`landing-page-styles`)**:
   - Apply the `bold-tech` token preset in `app/globals.css` (`Plus Jakarta Sans` + `JetBrains Mono`, Midnight Slate `#090D16` background, semantic `primary` and `accent` tokens).
   - Use shared `<Section>`, `<Container>`, and `<SectionHeader>` primitives across all sections below the hero.

3. **Decoupled Content & Page Composition**:
   - Store all copy in `content/site.ts` or `src/data/*.ts` (`hero.ts`, `offerings.ts`, `faqs.ts`). Zero hardcoded strings in JSX.
   - Layer the Hero `<h1>` headline and CTAs over or alongside the `min-h-[100svh]` 3D canvas with `z-10` glassmorphism.
   - Build a 3-card tech architecture grid in `src/components/sections/FeatureGrid.tsx` using shared `<Reveal>` animations (`src/lib/gsap.ts`).
   - Connect the Zod-validated lead capture form (`submitContactForm`) in the closing section.

4. **QA & Mobile-Native Verification (`mobile-native`)**:
   - Ensure touch scrolling is never blocked by the 3D canvas on mobile (`pointer-events-none` on decorative background canvas or `touch-action: pan-y`).
   - Verify `375px` / `768px` / `1024px` / `1440px` viewports and `npm run build`.
