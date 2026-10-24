---
name: build-static-landing
description: Generates a high-converting, responsive static landing page based on client/ or client-spec.json, semantic design tokens, shared layout primitives, Tier 1 motion budget, Zod form engine, and decoupled data contracts.
---

# Static Conversion Landing Page Generator (`build-static-landing`)

Scaffolds a production-ready, ultra-fast conversion landing page tailored for SaaS products, waitlists, single events, agencies, or quick business launches. Follows `.agents/rules/rules.md` and the **Tier 1 (Standard Conversion)** motion budget.

## Workflow Instructions

1. **Hybrid Intake (`client/` or `client-spec.json`)**:
   - Check `client/company.md`, `client/copy.md`, and `client/competitors.md` first. If populated, follow `landing-page-core` to generate `LANDING_PLAN.md`.
   - Otherwise, read `client-spec.json` (`brand.name`, `brand.vibe`, `brand.tagline`, `contentSummaries`, `leadCapture`).

2. **Apply Semantic Design Tokens (`landing-page-styles` + `design-tokens.md`)**:
   - Configure semantic color, radius, and motion tokens (`--ease-out`, `--ease-in-out`) in `app/globals.css`.
   - Load max two font families via `next/font` with `display: "swap"` in `app/(site)/layout.tsx`.
   - Verify WCAG AA contrast ratios (4.5:1 body text, 3:1 large text/UI).

3. **Populate Decoupled Content Layer (`src/data/*.ts` or `content/site.ts`)**:
   - Write brand configuration to `src/data/siteConfig.ts`.
   - Populate `src/data/hero.ts`, `src/data/offerings.ts`, `src/data/testimonials.ts`, and `src/data/faqs.ts` using strict TypeScript interfaces from `src/types/dataContracts.ts`.
   - Never hardcode copy in JSX; never invent fake proof (use `TODO(placeholder)` if proof is missing).

4. **Shared Primitives & Tier 1 Motion (`landing-page-animations` + `animate`)**:
   - Use shared `<Section>`, `<Container>`, and `<SectionHeader>` primitives so vertical padding (`py-16 md:py-24`) and container alignment (`max-w-7xl`) are identical across all sections.
   - Register GSAP once in `src/lib/gsap.ts` and wrap reveals in `useGSAP` with `gsap.matchMedia()` for `prefers-reduced-motion`.
   - Respect the **Tier 1 Motion Budget**: 1 hero entrance sequence (< 1.2s), max 1 ambient marquee, max 1 pinned scene, shared `<Reveal>` (`transform` & `opacity` only) for sections, and `:active { transform: scale(0.97) }` on buttons.

5. **Assemble Page Layout (`app/(site)/page.tsx`)**:
   - `Navbar`: Sticky blurred header (`scroll-mt-20` on anchor targets) with brand logo and primary CTA button.
   - `Hero`: `min-h-[100svh]`, single `<h1>`, subtitle, primary CTA, and optimized `next/image` (`priority`).
   - `FeatureGrid`: Equal-height, equal-radius cards fed by `src/data/offerings.ts`.
   - `FaqAccordion`: shadcn/Radix `Accordion` fed by `src/data/faqs.ts`.
   - `ContactForm`: Zod-validated form (`16px` minimum input font size) connected to `submitContactForm` Server Action (honeypot + Google Sheets + Resend).
   - `Footer`: Semantic `<footer>` with links, copyright, and contact details.

6. **QA & Verification (`mobile-native` + `review-animations`)**:
   - Check viewports at `375px`, `768px`, `1024px`, and `1440px`.
   - Verify `npm run build` passes with zero errors.
