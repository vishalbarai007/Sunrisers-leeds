---
name: build-sanity-cms
description: Generates a multi-page business website with Sanity CMS for blog posts, leadership team, and service listings, following unified design tokens and server-first performance rules.
---

# Sanity Headless CMS Microsite Generator (`build-sanity-cms`)

Scaffolds a corporate website or editorial publication backed by Sanity CMS v3, featuring GROQ queries, PortableText rendering, on-demand ISR revalidation, and decoupled static fallback data. Follows `.agents/rules/rules.md` (**Tier 1 Standard Conversion** budget).

## Workflow Instructions

1. **Client & Fallback Setup**:
   - Verify `src/lib/sanity/client.ts` reads `NEXT_PUBLIC_SANITY_PROJECT_ID`.
   - Implement `src/lib/sanity/queries.ts` for post index and article detail GROQ queries.
   - Ensure the app serves `src/data/blogFallback.ts` gracefully if Sanity credentials are unconfigured.

2. **Route Generation & Typography (`landing-page-styles`)**:
   - Create `app/(site)/blogs/page.tsx` for the article grid using shared `<Section>`, `<Container>`, and `<SectionHeader>` primitives.
   - Create `app/(site)/blogs/[slug]/page.tsx` for individual articles with PortableText formatting, enforcing `16px` (`1rem`) minimum body font size, `1.6–1.7` line-height, and `65ch` measure for optimal reading comfort.
   - Implement `app/api/revalidate/route.ts` for on-demand webhook cache purging.

3. **Server Components & Motion Discipline (`landing-page-animations`)**:
   - Keep article pages and grids as React Server Components by default for fast LCP (< 2.5s).
   - Isolate any scroll reveal animations into lightweight client motion wrappers (`src/components/animations/`).

4. **Validation & QA**:
   - Stress-test article cards with long headlines, missing cover images, and multiple category tags (`break-ui`).
   - Confirm `npm run build` succeeds.
