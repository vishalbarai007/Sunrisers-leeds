---
name: build-micro-ecommerce
description: Generates a boutique product drop microsite featuring persistent Zustand cart drawer, WhatsApp direct checkout, optional Stripe payment session, semantic tokens, and mobile-native drawer physics.
---

# Boutique Micro-Ecommerce Generator (`build-micro-ecommerce`)

Scaffolds a high-converting product drop microsite for limited merchandise, artisanal goods, or D2C pre-orders with zero monthly platform overhead. Follows `.agents/rules/rules.md` (**Tier 1 Standard Conversion** budget).

## Workflow Instructions

1. **State Store Configuration**:
   - Construct `src/lib/store/useCartStore.ts` using `zustand` with `persist` middleware.

2. **Cart Drawer Component (`design-eng` + `mobile-native`)**:
   - Build the slide-over cart drawer using shadcn/Radix `Sheet` (`src/components/ui/sheet.tsx`), never a hand-rolled div without focus trapping.
   - Use the custom drawer curve `--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)` (`duration: 300ms`).
   - Apply `overscroll-behavior: contain` on the cart item scroll list and `padding-bottom: calc(1rem + env(safe-area-inset-bottom, 0px))` on the checkout footer.
   - Format all prices, quantities, and subtotals with `tabular-nums` (`font-variant-numeric: tabular-nums`) so digits never jitter when incremented.
   - Ensure `+` / `-` / remove controls have at least `44x44px` touch hit areas and `:active { transform: scale(0.97) }` press feedback.

3. **Dual Checkout Flow**:
   - Generate WhatsApp direct order links via `generateWhatsAppOrderUrl()`.
   - Setup optional Stripe Checkout Server Action (`createCheckoutSession.ts`).

4. **Decoupled Product Catalog & Media (`landing-page-media`)**:
   - Store all product data, variants, prices, and descriptions in `src/data/offerings.ts` (typed via `src/types/dataContracts.ts`). Zero hardcoded copy in JSX.
   - Render product photography with `next/image`, consistent aspect ratios, shared card radius tokens, and descriptive `alt` text.

5. **Stress-Testing (`break-ui`)**:
   - Verify cart drawer and product cards against 0 items (empty state), 1 item (singular grammar), 99+ quantity, and long product variant names.
