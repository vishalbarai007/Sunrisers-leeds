---
name: build-portfolio-static
description: Generates a creative portfolio microsite featuring bento-grid case studies, bio highlights, skill badges, shared typography/spacing tokens, and contact drawer.
---

# Creative Portfolio Microsite Generator (`build-portfolio-static`)

Scaffolds a modern, high-converting portfolio website for designers, engineers, creative directors, or boutique agencies. Follows `.agents/rules/rules.md` (**Tier 1 Standard Conversion** budget).

## Workflow Instructions

1. **Hybrid Intake & Design Tokens (`landing-page-styles`)**:
   - Read `client/` (`company.md`, `copy.md`, `competitors.md`) or `client-spec.json`.
   - Configure semantic tokens in `app/globals.css` and load max two font families via `next/font` (`display: "swap"`).
   - Use shared `<Section>`, `<Container>`, and `<SectionHeader>` primitives across all sections.

2. **Bento-Grid Composition & Motion (`landing-page-animations` + `animate`)**:
   - Construct an asymmetric 12-column desktop / 4-column mobile bento grid displaying featured case studies.
   - Gate card hover effects (`scale(1.02)` / overlay reveal) inside `@media (hover: hover) and (pointer: fine)` and keep transitions on GPU composite properties (`transform`, `opacity`).
   - Include stat counters using `tabular-nums` (`font-variant-numeric: tabular-nums`) and single-view reveal via `src/lib/gsap.ts` + `useGSAP`.

3. **Decoupled Data Layer**:
   - Store projects, case study summaries, metrics, and tech stacks in `src/data/offerings.ts` (or `content/site.ts`).
   - Store testimonials in `src/data/testimonials.ts`. Never invent fake client quotes or metrics—mark missing proof as `TODO(placeholder)`.

4. **Lead Capture & QA**:
   - Embed a contact section or shadcn `Sheet`/`Dialog` drawer calling the Zod-validated `submitContactForm` Server Action (`16px` minimum input font size).
   - Verify `375px` / `768px` / `1024px` / `1440px` responsiveness and `npm run build`.
