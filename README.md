# Sunrisers Leeds 🏏🔥

Official high-performance landing page for the **Sunrisers Leeds Cricket Team**, built with Next.js 15, React 19, TypeScript, Tailwind CSS, and the Agency Microsite Engine architecture.

---

## ⚡ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS, CSS Variables, Modern Sports Color Tokens
- **Animations & Smooth Scroll**: Lenis, GSAP ScrollTrigger, Framer Motion
- **Icons**: Lucide React
- **Forms & Validation**: React Hook Form, Zod
- **Lead Capture**: Google Sheets (Apps Script Webhook) + Resend Email Dispatch
- **Content Architecture**: Decoupled Data Layer (`src/data/*.ts`) & Intake Spec (`client-spec.json`)

---

## 📁 Directory Structure

```text
├── .agents/                 # AI Agent skills and design rules
├── app/
│   ├── (site)/
│   │   ├── layout.tsx       # Root layout with SmoothScrollProvider & dark theme
│   │   └── page.tsx         # Main landing page
│   ├── actions/
│   │   └── submitContactForm.ts  # Zod-validated server action
│   └── globals.css          # Sports tokens, fonts, and utilities
├── public/                  # Static assets & placeholders
├── src/
│   ├── components/
│   │   ├── animations/      # Smooth scroll & motion providers
│   │   ├── reusable/        # Navbar, Footer, and shared chrome
│   │   ├── sections/        # Section components (Hero, Fixtures, Squad, Stats, etc.)
│   │   └── ui/              # Buttons, Inputs, Textareas
│   ├── data/
│   │   ├── siteConfig.ts    # Brand metadata, theme colors, socials
│   │   └── navigation.ts    # Header & footer navigation links
│   ├── lib/
│   │   ├── utils.ts         # cn() utility helper
│   │   ├── googleSheets.ts  # Sheet webhook integration
│   │   └── resend.ts        # Instant lead email alerts
│   └── types/
│       ├── dataContracts.ts # Type-safe data models
│       └── formSchemas.ts   # Zod validation schemas
├── client-spec.json         # Client intake & brand configuration
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS theme configuration
└── tsconfig.json            # TypeScript path aliases
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.
