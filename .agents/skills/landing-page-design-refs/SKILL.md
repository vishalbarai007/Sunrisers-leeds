---
name: landing-page-design-refs
description: Analyse multiple reference/competitor websites listed in client/competitors.md, merge them into one page direction, and convert any superdesign.dev designs into Tailwind + shadcn code. Use in Phase 2 of landing-page-core, or whenever the user shares reference URLs or superdesign output for a landing page.
---

# Landing Page Design References

Turns several reference sites (and optional superdesign.dev designs) into one merged direction. References inform structure and ideas. They are never copied.

## Inputs
- `client/competitors.md`: a list of URLs, each with optional notes: borrow / avoid / how the client differs. The user's notes outrank anything you observe.
- Optional: superdesign.dev output (see below).

## 1. Analyse each URL
Open each reference in a browser. Read the page text and look at the rendered page at desktop and 375px mobile. Record per site, in a compact block:

- **Positioning:** headline, subhead, who it's for, primary CTA label
- **Section order:** list top to bottom with each section's job
- **Hero:** layout, media type (image, video, product UI, illustration), motion
- **Proof:** logos, numbers, testimonials, case studies, where they sit
- **Pricing/CTA handling:** how and where conversion is asked
- **Visual language:** palette feel, type style, density, radius/edges, imagery style
- **Motion:** what moves, scroll behaviour, ambient effects
- **Weak spots:** what is confusing, slow, generic or off-brand for this client

If a site blocks access or fails to load, say so, note it as unreviewed, and continue with the rest. Do not guess its content.

## 2. Compare
Build one table: rows = section types, columns = references, cells = present / position / notes. Mark:
- **Common:** in most references. Strong default for the plan.
- **Distinct:** in one or two. Candidate for borrowing if it fits the client.
- **Missing everywhere:** a gap the client can own.

## 3. Merge into one direction
Write a short merged brief (this goes into `LANDING_PLAN.md`):
- **Section order:** follow the common order. Justify each deviation in one line.
- **Borrow:** a list of specific ideas, each tagged with the source reference and the section it applies to. Example: "Hero: product UI shown in a browser frame (Ref 2)".
- **Avoid:** patterns to leave out, with the reason.
- **Differentiate:** what the client does differently, taken from `client/company.md`, and where the page shows it.
- **Visual direction:** palette feel, type feel, density, edge style, imagery style, motion level. Stated as a direction, not specific values (styles skill sets the values).

Rules for merging:
- Combine ideas from at least two references per section where possible. Never mirror one site's layout end to end.
- Never reuse a reference's copy, images, illustrations, logos, brand marks or distinctive code. Only structure and general patterns.
- Everything must stay buildable with the project's stack (see `.claude/rules.md`). Flag any borrowed idea that would break the motion budget or the grid rule, and ask before keeping it.
- Claims about the client must come from `client/`, not from what competitors say about themselves.

## 4. superdesign.dev intake (optional)
If the user supplies superdesign.dev designs or a `.superdesign/` folder:

1. Read what is there: the design system file, any analysis, and the exported layouts or prompts.
2. Save the chosen references to `client/design-refs/` (screenshots or exported files) so they are traceable.
3. Treat the output as a visual reference only. Never paste its HTML or inline styles into components.
4. Rebuild each design as Tailwind + shadcn code using the project's tokens.
5. If the export format is unclear or unreadable, say so and ask the user for screenshots instead of guessing.

### Conversion rules
| In the design | Build as |
|---|---|
| Hex or RGB colors | Nearest design token. Propose a new token only if no token fits, and ask. |
| Inline styles, custom CSS | Tailwind utilities using token values |
| Fixed pixel sizes and margins | Spacing scale tokens; fluid type with `clamp()` |
| Custom modal, tabs, accordion, menu | shadcn `Dialog`/`Sheet`, `Tabs`, `Accordion`, `DropdownMenu` |
| Repeated cards or rows | One component fed by data from `content/site.ts` |
| Hardcoded text | Props from `content/site.ts` |
| Animations from the design | Map to the motion catalogue; within the motion budget |
| Images | Replace per `landing-page-media`; do not hotlink |

## Output
Return to `landing-page-core` with:
1. Per-reference summaries (compact)
2. The comparison table
3. The merged direction (order, borrow, avoid, differentiate, visual direction)
4. Open questions for the user, each with a recommendation
