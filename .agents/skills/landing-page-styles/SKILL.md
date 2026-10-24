---
name: landing-page-styles
description: Design tokens, typography roles, spacing primitives, color palettes, and contrast checks for landing pages and category microsites. Use in Phase 4-6 of landing-page-core when choosing a palette and fonts, writing app/globals.css, or building shared primitives like SectionTitle, Section, Container, and Button.
---

# Landing Page Styles & Token System

Defines the visual system so every component consumes semantic tokens from `app/globals.css` rather than raw hex values or ad-hoc classes. Combines `.agents/rules/rules.md` (sections 3–5) with the aesthetic presets in `.agents/rules/design-tokens.md`.

## Order of Work
1. **Fonts:** Load max two font families (Display/Heading + Body, plus optional Mono for badges/code) in `app/(site)/layout.tsx` using `next/font/google` or `next/font/local` with `display: "swap"`.
2. **Palette:** Derive from `client/company.md` brand assets, `client-spec.json` (`brand.vibe` / `brand.palette`), or extract from the client's logo. If none exist, propose 2–3 semantic palettes tied to the reference direction and tone.
3. **Write Tokens in `app/globals.css`:** Map semantic CSS variables (`--background`, `--foreground`, `--surface`, `--surface-alt`, `--primary`, `--accent`, `--muted`, `--border`, `--ring`, `--radius`, `--ease-out`, `--ease-in-out`).
4. **Build Shared Primitives:** Create/verify `Container`, `Section`, `SectionHeader` (`SectionTitle`), and `Button` consuming only tokens.
5. **Contrast Check:** Verify WCAG AA contrast before building sections.

---

## Semantic Tokens (`app/globals.css`)
Whether the project uses Tailwind v4 (`@import "tailwindcss"; @theme { ... }`) or Tailwind v3 with CSS variables, define these semantic token groups in `app/globals.css`:

- **Color (semantic, never literal color names):**
  - `background`, `foreground`
  - `surface`, `surface-alt` (max two alternating section surfaces on standard landing pages)
  - `card`, `card-foreground`, `popover`, `popover-foreground`
  - `primary`, `primary-foreground` (main CTA and brand energy)
  - `secondary`, `secondary-foreground`
  - `muted`, `muted-foreground`
  - `accent`, `accent-foreground`
  - `destructive`, `destructive-foreground`
  - `border`, `input`, `ring`
- **Typography:**
  - `--font-heading`, `--font-sans`, `--font-mono`
  - Fluid `clamp()` scales for `display` (H1) and `section-title` (H2).
- **Spacing & Layout:**
  - `section-y` (`py-16` mobile) and `section-y-lg` (`md:py-24` desktop)
  - `title-gap` (`mb-10 md:mb-14` between section header and content)
  - Single `container` max-width (`max-w-7xl` / `1280px` or `1400px` with `px-4 sm:px-6 lg:px-8`)
- **Radius & Elevation:**
  - One card radius (`rounded-2xl` or `--radius`), one control radius (`rounded-lg`), one shared card border/shadow token.
- **Motion Curves:**
  - `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`
  - `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`
  - `--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)`

---

## Typography Roles
Define each role once (as a shared component in `src/components/reusable/` or utility class in `app/globals.css`) and reuse across every section:

| Role | Element | Specification |
|---|---|---|
| `display` | Hero `<h1>` only | `--font-heading`, fluid `clamp(2.5rem, 6vw, 5.5rem)`, tight leading (`0.95–1.05`) |
| `section-title` | Every section `<h2>` | `--font-heading`, fluid `clamp(1.875rem, 4vw, 3.25rem)`, identical weight, tracking, and line-height across all sections |
| `section-subtitle` | Intro `<p>` under H2 | `--font-sans`, `text-base md:text-lg text-muted-foreground max-w-2xl` |
| `eyebrow` | Small label above H2 | `text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-primary` |
| `card-title` | `<h3>` inside cards | `--font-heading` or `--font-sans`, `text-lg md:text-xl font-bold` |
| `body` | Standard `<p>` | `text-base` (`16px` min), `leading-relaxed` (`1.6`), `max-w-[65ch]` |
| `caption` | Metadata / badges | `text-xs sm:text-sm text-muted-foreground`, `tabular-nums` for numbers |

**Hard Rules:**
- One `<h1>` per page. Never skip heading levels (`h1` → `h2` → `h3`).
- Never override `H2` styles per section unless required by a specialized archetype banner.

---

## Spacing & Layout Primitives
Build and use these primitives across all sections:
- `<Container>`: Single content width token and responsive horizontal padding (`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8`).
- `<Section id="...">`: Applies `py-16 md:py-24`, surface background token (`bg-background` or `bg-surface`), and `scroll-mt-20` (matching sticky header height).
- `<SectionHeader eyebrow="..." title="..." subtitle="..." />`: Renders the eyebrow, `<h2>` title, and subtitle with the standard `title-gap` below.

---

## Category Vibe Presets (from `design-tokens.md`)
When `client-spec.json` specifies a `brand.vibe`, map the semantic tokens to the corresponding preset:
- **`premium`**: Cormorant Garamond + Plus Jakarta Sans, Deep Obsidian (`#0F0F11`), Champagne Gold (`#C5A880`).
- **`bold-tech`**: Plus Jakarta Sans + JetBrains Mono, Midnight Slate (`#090D16`), Electric Cyan (`#38BDF8`) & Violet (`#8B5CF6`).
- **`minimal`**: Geist Sans, Neutral Zinc (`#09090B`), monochrome high-contrast `#FAFAFA`, crisp hairline borders.
- **`funky`**: Space Grotesk + Space Mono, Electric Lime (`#84CC16`) or Cyber Yellow (`#FACC15`), 2px brutalist borders.
- **`luxury-real-estate`**: Cormorant Garamond/Playfair Display (with curated `<span className="italic font-light">` accents) + Plus Jakarta Sans, logo-derived palette (Sapphire, Tuscan Bronze, Champagne Gold, Blanc & Noir, or Emerald).
- **`sports-franchise`**: Athletic condensed display (`VTFRedzone` / `Impact` / `Anton`) + geometric sans (`FormaDJRMicro` / `Plus Jakarta Sans`), Obsidian Void (`#070A12`) + vibrant club crest primary energy + frosted glass (`bg-white/10 backdrop-blur-md border-white/20`).

---

## Contrast Check (Required Before Building Sections)
Compute and verify contrast ratios for:
1. `foreground` on `background` (>= 4.5:1)
2. `foreground` on `surface` / `card` (>= 4.5:1)
3. `muted-foreground` on `background` and `surface` (>= 4.5:1)
4. `primary-foreground` on `primary` (>= 4.5:1 for text, >= 3:1 for large UI)
5. `accent-foreground` on `accent` (>= 4.5:1)

## Don'ts
- No raw hex (`bg-[#123456]`) or unmapped default Tailwind palette classes scattered across section components—bind them to semantic tokens in `globals.css` / `tailwind.config.ts`.
- No arbitrary spacing hacks like `mt-[37px]` or `text-[17px]`.
- No inline `style={{ ... }}` for static design values.
- No per-section restyling of `H2` titles, buttons, or cards.
