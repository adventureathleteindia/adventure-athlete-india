# Next.js Foundation Setup - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Set up Next.js 14 project with Tailwind CSS, design tokens, and core layout components (Navigation, Footer).

**Architecture:** Next.js 14 App Router with TypeScript. Tailwind CSS for styling with custom design tokens matching the HTML prototypes. Component-based architecture with reusable layout components.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Google Fonts (Oswald, Source Sans 3)

---

## Task 1: Create Next.js Project

**Files:**
- Create: `website/` directory with Next.js scaffold

**Step 1: Create the Next.js project**

Run from project root:
```bash
cd "/Users/FinancialDocs/AI tools/adventure-athlete-india"
npx create-next-app@latest website --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm
```

When prompted:
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- `src/` directory: No
- App Router: Yes
- Import alias: @/*

**Step 2: Verify project created**

```bash
ls -la website/
```

Expected: See `app/`, `public/`, `package.json`, `tailwind.config.ts`, etc.

**Step 3: Test the dev server**

```bash
cd website && npm run dev
```

Expected: Server starts at http://localhost:3000

**Step 4: Stop the server**

Press `Ctrl+C` to stop.

---

## Task 2: Configure Design Tokens in Tailwind

**Files:**
- Modify: `website/tailwind.config.ts`

**Step 1: Update Tailwind config with design tokens**

Replace contents of `website/tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#2D5A3D",
          dark: "#1E3D2A",
        },
        amber: {
          DEFAULT: "#D97706",
          light: "#F59E0B",
        },
        dark: "#1A202C",
        slate: {
          DEFAULT: "#64748b",
          dark: "#475569",
          light: "#94a3b8",
        },
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
        },
      },
      fontFamily: {
        heading: ["var(--font-oswald)", "sans-serif"],
        body: ["var(--font-source-sans)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      maxWidth: {
        container: "1400px",
      },
      spacing: {
        section: "70px",
      },
      letterSpacing: {
        wide: "0.5px",
        wider: "2px",
        widest: "3px",
      },
    },
  },
  plugins: [],
};

export default config;
```

**Step 2: Verify config syntax**

```bash
cd website && npm run build
```

Expected: Build succeeds (or only warns about unused CSS)

---

## Task 3: Configure Google Fonts

**Files:**
- Modify: `website/app/layout.tsx`

**Step 1: Update layout with fonts**

Replace contents of `website/app/layout.tsx`:

```typescript
import type { Metadata } from "next";
import { Oswald, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
  weight: ["400", "500", "600"],
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Adventure Athlete India",
  description: "Experience the raw Himalayas with Atul Chauhan - Elite cyclist, trail runner, and licensed guide.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${oswald.variable} ${sourceSans.variable}`}>
      <body className="font-body text-dark bg-white antialiased">
        {children}
      </body>
    </html>
  );
}
```

**Step 2: Verify fonts load**

```bash
cd website && npm run dev
```

Open http://localhost:3000 - inspect the page, fonts should be loading.

---

## Task 4: Set Up Global Styles

**Files:**
- Modify: `website/app/globals.css`

**Step 1: Update global styles**

Replace contents of `website/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Base styles */
@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply leading-relaxed;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-heading font-normal leading-tight;
  }

  img {
    @apply max-w-full h-auto block;
  }

  a {
    @apply text-inherit no-underline;
  }
}

/* Component styles */
@layer components {
  /* Container */
  .container {
    @apply max-w-container mx-auto px-6 md:px-10;
  }

  /* Section Label */
  .section-label {
    @apply text-xs font-semibold tracking-widest uppercase text-amber;
  }

  /* Section Title */
  .section-title {
    @apply font-heading font-normal leading-tight mb-6;
    font-size: clamp(2rem, 5vw, 3rem);
  }

  /* Section Text */
  .section-text {
    @apply text-lg font-light leading-relaxed text-slate-dark max-w-[600px];
  }

  /* Buttons */
  .btn {
    @apply inline-block px-8 py-3.5 font-body text-sm font-semibold tracking-wide text-center border-none cursor-pointer transition-all duration-200;
  }

  .btn:hover {
    @apply -translate-y-0.5 shadow-lg;
  }

  .btn-primary {
    @apply bg-amber text-white;
  }

  .btn-secondary {
    @apply bg-forest text-white;
  }

  .btn-outline {
    @apply bg-transparent border-2 border-forest text-forest;
  }

  /* Nav CTA Button (shimmer effect) */
  .btn-flag {
    @apply relative px-6 py-3 text-xs font-semibold text-white rounded-full overflow-hidden;
    background: linear-gradient(135deg, #D97706 0%, #F59E0B 100%);
    box-shadow: 0 4px 15px rgba(217, 119, 6, 0.4);
  }

  .btn-flag::before {
    content: '';
    @apply absolute top-0 -left-full w-full h-full transition-all duration-500;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  }

  .btn-flag:hover {
    @apply -translate-y-0.5;
    box-shadow: 0 6px 20px rgba(217, 119, 6, 0.5);
  }

  .btn-flag:hover::before {
    @apply left-full;
  }

  /* Page Header */
  .page-header {
    @apply pt-28 pb-12 px-10 bg-gray-50;
  }

  .page-header.compact {
    @apply pt-24 pb-10;
  }

  .page-header .container {
    @apply max-w-3xl;
  }
}
```

**Step 2: Verify styles work**

```bash
cd website && npm run dev
```

Expected: No CSS errors, page loads.

---

## Task 5: Create Folder Structure

**Files:**
- Create: `website/components/` directory
- Create: `website/components/layout/` directory
- Create: `website/lib/` directory
- Create: `website/types/` directory

**Step 1: Create directories**

```bash
cd "/Users/FinancialDocs/AI tools/adventure-athlete-india/website"
mkdir -p components/layout components/ui lib types
```

**Step 2: Verify structure**

```bash
ls -la components/ lib/ types/
```

Expected: Directories exist.

---

## Task 6: Create Navigation Component

**Files:**
- Create: `website/components/layout/Navigation.tsx`

**Step 1: Create Navigation component**

Create `website/components/layout/Navigation.tsx`:

```typescript
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationProps {
  variant?: "transparent" | "solid";
}

export default function Navigation({ variant = "solid" }: NavigationProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navClasses = variant === "transparent"
    ? "absolute top-0 left-0 right-0 z-50 py-5 px-10"
    : "relative bg-white shadow-sm py-5 px-10";

  const logoClasses = variant === "transparent"
    ? "text-white"
    : "text-dark";

  const linkClasses = variant === "transparent"
    ? "text-white hover:bg-white/10"
    : "text-dark hover:bg-black/5";

  const activeLinkClasses = "text-amber font-semibold";

  return (
    <nav className={navClasses}>
      <div className="max-w-container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className={`font-heading text-sm font-medium tracking-widest uppercase ${logoClasses}`}
        >
          Adventure Athlete India
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex list-none gap-8">
          <li>
            <Link
              href="/experiences"
              className={`text-base font-medium px-4 py-2 rounded-md transition-all ${linkClasses} ${isActive("/experiences") ? activeLinkClasses : ""}`}
            >
              Experiences
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`text-base font-medium px-4 py-2 rounded-md transition-all ${linkClasses} ${isActive("/about") ? activeLinkClasses : ""}`}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={`text-base font-medium px-4 py-2 rounded-md transition-all ${linkClasses} ${isActive("/contact") ? activeLinkClasses : ""}`}
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* CTA Button */}
        <Link href="/plan" className="btn-flag hidden md:inline-block">
          Plan Your Adventure
        </Link>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 ${variant === "transparent" ? "text-white" : "text-dark"}`}
          aria-label="Open menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
```

**Step 2: Verify no TypeScript errors**

```bash
cd website && npx tsc --noEmit
```

Expected: No errors (or only warnings).

---

## Task 7: Create Footer Component

**Files:**
- Create: `website/components/layout/Footer.tsx`

**Step 1: Create Footer component**

Create `website/components/layout/Footer.tsx`:

```typescript
import Link from "next/link";

// Social Icons as components
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const StravaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
    <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.599h4.172L10.463 0l-7 13.828h4.169" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-forest text-white py-16 px-10 relative overflow-hidden">
      {/* Mountain Wave SVG */}
      <div className="absolute -top-20 left-0 right-0 z-0">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="w-full h-20 block"
        >
          <path
            fill="#2D5A3D"
            d="M0,120 L0,80 Q60,60 120,70 L200,50 L280,75 L320,45 L400,65 L480,35 L560,55 L640,25 L720,50 L800,20 L880,45 L960,15 L1040,40 L1120,10 L1200,35 L1280,5 L1360,30 L1440,0 L1440,120 Z"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-16 relative z-10">
        {/* Brand Column */}
        <div>
          <div className="font-heading text-sm font-medium tracking-widest uppercase mb-4">
            Adventure Athlete India
          </div>
          <p className="text-sm opacity-80 mt-4 leading-relaxed">
            Experience the raw Himalayas.
          </p>
          <p className="mt-6 text-sm opacity-80">
            Shimla, HP, India
            <br />
            +91-9459033240
            <br />
            adventureathleteindia@gmail.com
          </p>
          {/* Social Icons */}
          <div className="flex gap-3 mt-5">
            <a
              href="https://instagram.com/adventure.athlete.india"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white transition-colors hover:bg-[#E4405F]"
              title="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://facebook.com/adventureathleteindia"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white transition-colors hover:bg-[#1877F2]"
              title="Facebook"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://youtube.com/@adventureathleteindia"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white transition-colors hover:bg-[#FF0000]"
              title="YouTube"
            >
              <YouTubeIcon />
            </a>
            <a
              href="https://strava.com/athletes/adventureathleteindia"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white transition-colors hover:bg-[#FC4C02]"
              title="Strava"
            >
              <StravaIcon />
            </a>
          </div>
        </div>

        {/* Experiences Column */}
        <div>
          <h4 className="text-xs font-semibold tracking-wider uppercase opacity-50 mb-5">
            Experiences
          </h4>
          <ul className="space-y-3">
            <li>
              <Link href="/experiences" className="text-sm opacity-85 hover:opacity-100 transition-opacity">
                Mountain Biking
              </Link>
            </li>
            <li>
              <Link href="/experiences" className="text-sm opacity-85 hover:opacity-100 transition-opacity">
                Road Cycling
              </Link>
            </li>
            <li>
              <Link href="/experiences" className="text-sm opacity-85 hover:opacity-100 transition-opacity">
                Trail Running
              </Link>
            </li>
            <li>
              <Link href="/experiences" className="text-sm opacity-85 hover:opacity-100 transition-opacity">
                Hiking
              </Link>
            </li>
            <li>
              <Link href="/experiences" className="text-sm opacity-85 hover:opacity-100 transition-opacity">
                Nature Walks
              </Link>
            </li>
          </ul>
        </div>

        {/* About Column */}
        <div>
          <h4 className="text-xs font-semibold tracking-wider uppercase opacity-50 mb-5">
            About
          </h4>
          <ul className="space-y-3">
            <li>
              <Link href="/about" className="text-sm opacity-85 hover:opacity-100 transition-opacity">
                About Me
              </Link>
            </li>
            <li>
              <Link href="/why-aai" className="text-sm opacity-85 hover:opacity-100 transition-opacity">
                Why Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm opacity-85 hover:opacity-100 transition-opacity">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Useful Links Column */}
        <div>
          <h4 className="text-xs font-semibold tracking-wider uppercase opacity-50 mb-5">
            Useful Links
          </h4>
          <ul className="space-y-3">
            <li>
              <Link href="/faq" className="text-sm opacity-85 hover:opacity-100 transition-opacity">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-sm opacity-85 hover:opacity-100 transition-opacity">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-sm opacity-85 hover:opacity-100 transition-opacity">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/safety" className="text-sm opacity-85 hover:opacity-100 transition-opacity">
                Safety
              </Link>
            </li>
            <li>
              <Link href="/cancellation" className="text-sm opacity-85 hover:opacity-100 transition-opacity">
                Cancellation
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-container mx-auto mt-16 pt-6 border-t border-white/15 flex flex-col md:flex-row justify-between gap-2 text-[13px] opacity-60 relative z-10">
        <span>
          © 2026 Adventure Athlete India <span className="text-amber mx-1.5">|</span> Atul Chauhan
        </span>
        <span>Licensed HP Tourism Guide (Reg: 080724 42383)</span>
      </div>
    </footer>
  );
}
```

**Step 2: Verify no TypeScript errors**

```bash
cd website && npx tsc --noEmit
```

Expected: No errors.

---

## Task 8: Create Layout Component Index

**Files:**
- Create: `website/components/layout/index.ts`

**Step 1: Create index file**

Create `website/components/layout/index.ts`:

```typescript
export { default as Navigation } from "./Navigation";
export { default as Footer } from "./Footer";
```

**Step 2: Verify exports work**

```bash
cd website && npx tsc --noEmit
```

Expected: No errors.

---

## Task 9: Create Home Page Placeholder

**Files:**
- Modify: `website/app/page.tsx`

**Step 1: Update home page with layout**

Replace contents of `website/app/page.tsx`:

```typescript
import { Navigation, Footer } from "@/components/layout";

export default function Home() {
  return (
    <>
      <Navigation variant="transparent" />

      {/* Hero Section Placeholder */}
      <section
        className="relative h-screen min-h-[600px] flex flex-col justify-end p-10 md:p-20 bg-cover bg-center text-white"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80')`,
        }}
      >
        <div className="relative max-w-[700px]">
          <h1 className="font-heading text-5xl md:text-7xl uppercase tracking-wider leading-tight mb-4">
            Experience the Raw Himalayas
          </h1>
          <p className="text-xl font-light opacity-95 max-w-[500px] mb-8">
            Ride. Run. Explore. With an athlete who calls these mountains home.
          </p>
          <a href="/plan" className="btn btn-primary">
            Plan Your Adventure
          </a>
        </div>
      </section>

      {/* Placeholder sections */}
      <section className="py-section">
        <div className="container text-center">
          <span className="section-label">Featured Routes</span>
          <h2 className="section-title mt-4">Choose Your Adventure</h2>
          <p className="section-text mx-auto">
            More content coming soon...
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
```

**Step 2: Test the page**

```bash
cd website && npm run dev
```

Open http://localhost:3000

Expected: See hero with navigation, placeholder section, and footer.

**Step 3: Verify visually**

- Navigation shows "Adventure Athlete India" logo
- Hero has background image with text
- Footer shows all columns and social icons
- Fonts are Oswald (headings) and Source Sans (body)

---

## Task 10: Verify Build

**Files:** None (verification only)

**Step 1: Run production build**

```bash
cd website && npm run build
```

Expected: Build succeeds with no errors.

**Step 2: Test production locally**

```bash
cd website && npm run start
```

Open http://localhost:3000

Expected: Site works same as dev mode.

---

## Summary

After completing all tasks, you will have:

1. ✅ Next.js 14 project with TypeScript
2. ✅ Tailwind CSS configured with design tokens
3. ✅ Google Fonts (Oswald, Source Sans 3)
4. ✅ Global styles matching prototype
5. ✅ Navigation component (transparent + solid variants)
6. ✅ Footer component with social icons
7. ✅ Home page with hero placeholder
8. ✅ Proper folder structure for future components

**Next steps after this foundation:**
- Build Home page fully (hero, featured routes, about preview, CTA)
- Build Experiences listing page
- Build Experience detail page
- Continue with remaining pages...
