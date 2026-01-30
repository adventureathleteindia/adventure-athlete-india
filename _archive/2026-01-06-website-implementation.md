# Adventure Athlete India - Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a production-ready Next.js website for Adventure Athlete India following the Patagonia-inspired design guidelines.

**Architecture:** Static Site Generation (SSG) with Next.js App Router. Routes data loaded from JSON files at build time. Tailwind CSS for styling with custom design tokens. Component-based architecture with reusable UI primitives.

**Tech Stack:** Next.js 14 (App Router), Tailwind CSS, TypeScript, Vercel hosting

---

## Phase 1: Project Setup & Configuration

### Task 1.1: Initialize Next.js Project

**Files:**
- Create: `website/` (entire Next.js project)

**Step 1: Create Next.js project**

Run from project root:
```bash
cd "/Users/FinancialDocs/AI tools/adventure-athlete-india"
npx create-next-app@latest website --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

When prompted:
- Would you like to use Turbopack? **No**

**Step 2: Verify installation**

```bash
cd website && npm run dev
```
Expected: Dev server starts at http://localhost:3000

**Step 3: Stop server and commit**

```bash
# Stop with Ctrl+C, then:
cd "/Users/FinancialDocs/AI tools/adventure-athlete-india"
git init
git add .
git commit -m "chore: initialize Next.js project with TypeScript and Tailwind"
```

---

### Task 1.2: Configure Tailwind Design Tokens

**Files:**
- Modify: `website/tailwind.config.ts`
- Modify: `website/src/app/globals.css`

**Step 1: Update Tailwind config with design tokens**

Replace `website/tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        forest: {
          DEFAULT: "#2D5A3D",
          dark: "#1E3D2A",
          light: "#3D7A52",
        },
        amber: {
          DEFAULT: "#D97706",
          dark: "#B45309",
          light: "#F59E0B",
        },
        slate: {
          DEFAULT: "#64748b",
          dark: "#475569",
          light: "#94a3b8",
        },
        dark: "#1A202C",
      },
      fontFamily: {
        heading: ["var(--font-oswald)", "sans-serif"],
        body: ["var(--font-source-sans)", "sans-serif"],
      },
      fontSize: {
        // Clamp sizes for responsive typography
        "hero": "clamp(3rem, 8vw, 5rem)",
        "section": "clamp(2rem, 5vw, 3rem)",
      },
      letterSpacing: {
        "widest": "0.2em",
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "3/4": "3 / 4",
        "16/9": "16 / 9",
      },
    },
  },
  plugins: [],
};

export default config;
```

**Step 2: Update global styles**

Replace `website/src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply font-body text-dark antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-heading;
  }
}

@layer components {
  .section-label {
    @apply text-xs font-semibold uppercase tracking-widest text-amber;
  }

  .section-title {
    @apply font-heading text-section font-normal leading-tight;
  }

  .section-text {
    @apply text-lg font-light leading-relaxed text-slate-dark max-w-xl;
  }

  .btn-primary {
    @apply inline-block bg-amber px-8 py-4 text-white font-semibold text-sm tracking-wide
           transition-transform hover:-translate-y-0.5 hover:shadow-lg;
  }

  .btn-secondary {
    @apply inline-block bg-forest px-8 py-4 text-white font-semibold text-sm tracking-wide
           transition-transform hover:-translate-y-0.5 hover:shadow-lg;
  }
}
```

**Step 3: Verify Tailwind is working**

```bash
cd website && npm run dev
```
Check http://localhost:3000 - should load without errors.

**Step 4: Commit**

```bash
git add .
git commit -m "feat: configure Tailwind with brand design tokens"
```

---

### Task 1.3: Setup Google Fonts

**Files:**
- Modify: `website/src/app/layout.tsx`

**Step 1: Update layout with fonts**

Replace `website/src/app/layout.tsx`:

```typescript
import type { Metadata } from "next";
import { Oswald, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Adventure Athlete India | Experience the Raw Himalayas",
  description:
    "Personalized cycling, trail running, and hiking experiences in the Himalayas with elite athlete and licensed guide Atul Chauhan.",
  keywords: [
    "Himachal Pradesh cycling",
    "Shimla mountain biking",
    "trail running India",
    "adventure tours Himalayas",
    "licensed guide Shimla",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${sourceSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

**Step 2: Verify fonts load**

```bash
npm run dev
```
Open DevTools → Network → filter "font" → should see Oswald and Source Sans loading.

**Step 3: Commit**

```bash
git add .
git commit -m "feat: add Oswald and Source Sans fonts"
```

---

### Task 1.4: Create Type Definitions

**Files:**
- Create: `website/src/types/index.ts`

**Step 1: Create types file**

```typescript
// Route data structure (matches routes/*/route-data.json)
export interface RouteData {
  meta: {
    route_id: string;
    slug: string;
    folder_name: string;
    status: "draft" | "polished" | "published";
    created_date: string;
    polished: boolean;
  };
  basic_info: {
    title: string;
    short_description: string;
    category: Category;
    difficulty: Difficulty;
    date: string;
    tags: string[];
  };
  location: {
    start_point: string;
    end_point: string;
    how_to_reach: string;
    region: string;
  };
  metrics: {
    strava_link: string | null;
    distance_km: number | null;
    elevation_gain_m: number | null;
    duration: string;
    max_altitude_m: number | null;
    elevation_profile_downloaded: boolean;
  };
  notes: {
    raw_description: string;
    notes_from_file: string;
    media_info: string;
  };
  media: {
    hero_image: string | null;
    photos_count: number;
    videos_count: number;
    audio_count: number;
    has_gpx: boolean;
  };
  polished_content: {
    website_description: string | null;
    instagram_caption: string | null;
    youtube_description: string | null;
    short_summary: string | null;
  };
  checklist: {
    basic_info_complete: boolean;
    location_complete: boolean;
    metrics_available: boolean;
    notes_added: boolean;
    media_added: boolean;
    polished: boolean;
    published: boolean;
  };
}

export type Category =
  | "Mountain Biking"
  | "Road Cycling"
  | "Gravel Cycling"
  | "Trail Running"
  | "Road Running"
  | "Trekking"
  | "Hiking"
  | "Nature Walk"
  | "FKT Attempt";

export type Difficulty = "Easy" | "Moderate" | "Hard" | "Expert";

// Athlete profile (matches data/athlete-profile.json)
export interface AthleteProfile {
  name: string;
  location: string;
  tagline: string;
  credentials: {
    guide_license: {
      registration_number: string;
      issuing_authority: string;
      valid_until: string;
      status: string;
    };
    itra_score: number;
    national_championships: number;
  };
  achievements: string[];
  physical_stats: {
    ftp_watts: number;
    vertical_km_time: string;
    specialty: string[];
  };
  social_media: {
    instagram: {
      handle: string;
      current_followers: number;
      goal_followers: number;
    };
    youtube: {
      current_subscribers: number;
      goal_subscribers: number;
    };
    strava: string;
  };
}

// Navigation types
export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: add TypeScript type definitions for routes and profile"
```

---

### Task 1.5: Create Data Utilities

**Files:**
- Create: `website/src/lib/data.ts`

**Step 1: Create data fetching utilities**

```typescript
import fs from "fs";
import path from "path";
import { RouteData, AthleteProfile } from "@/types";

const ROUTES_DIR = path.join(process.cwd(), "..", "routes");
const DATA_DIR = path.join(process.cwd(), "..", "data");

/**
 * Get all routes from the routes directory
 * Only returns published or polished routes for production
 */
export async function getAllRoutes(): Promise<RouteData[]> {
  const routes: RouteData[] = [];

  // Check if routes directory exists
  if (!fs.existsSync(ROUTES_DIR)) {
    console.warn("Routes directory not found:", ROUTES_DIR);
    return routes;
  }

  const folders = fs.readdirSync(ROUTES_DIR);

  for (const folder of folders) {
    // Skip non-route folders (those not starting with a number)
    if (!/^\d{3}-/.test(folder)) continue;

    const routeDataPath = path.join(ROUTES_DIR, folder, "route-data.json");

    if (fs.existsSync(routeDataPath)) {
      try {
        const data = JSON.parse(fs.readFileSync(routeDataPath, "utf-8"));
        // Only include polished or published routes
        if (data.meta.status === "polished" || data.meta.status === "published") {
          routes.push(data);
        }
      } catch (error) {
        console.error(`Error reading route data from ${folder}:`, error);
      }
    }
  }

  // Sort by date, newest first
  return routes.sort(
    (a, b) =>
      new Date(b.basic_info.date).getTime() -
      new Date(a.basic_info.date).getTime()
  );
}

/**
 * Get a single route by slug
 */
export async function getRouteBySlug(
  slug: string
): Promise<RouteData | null> {
  const routes = await getAllRoutes();
  return routes.find((route) => route.meta.slug === slug) || null;
}

/**
 * Get routes by category
 */
export async function getRoutesByCategory(
  category: string
): Promise<RouteData[]> {
  const routes = await getAllRoutes();
  return routes.filter((route) => route.basic_info.category === category);
}

/**
 * Get athlete profile
 */
export async function getAthleteProfile(): Promise<AthleteProfile | null> {
  const profilePath = path.join(DATA_DIR, "athlete-profile.json");

  if (!fs.existsSync(profilePath)) {
    console.warn("Athlete profile not found:", profilePath);
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(profilePath, "utf-8"));
  } catch (error) {
    console.error("Error reading athlete profile:", error);
    return null;
  }
}

/**
 * Get all unique categories from routes
 */
export async function getAllCategories(): Promise<string[]> {
  const routes = await getAllRoutes();
  const categories = new Set(routes.map((route) => route.basic_info.category));
  return Array.from(categories);
}

/**
 * Get route image path (for use in Image component)
 */
export function getRouteImagePath(route: RouteData): string {
  // Default placeholder if no hero image
  if (!route.media.hero_image) {
    return "/images/placeholder-route.jpg";
  }
  // Return path relative to public folder
  return `/routes/${route.meta.folder_name}/media/photos/${route.media.hero_image}`;
}
```

**Step 2: Create placeholder image**

```bash
mkdir -p website/public/images
# We'll add a real placeholder later, for now just note it's needed
```

**Step 3: Commit**

```bash
git add .
git commit -m "feat: add data fetching utilities for routes and profile"
```

---

## Phase 2: Core Layout Components

### Task 2.1: Create Navigation Component

**Files:**
- Create: `website/src/components/layout/Navigation.tsx`

**Step 1: Create Navigation component**

```typescript
"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  {
    label: "Experiences",
    href: "/experiences",
  },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About Me", href: "/about" },
      { label: "Achievements", href: "/about/achievements" },
      { label: "Why AAI", href: "/about/why-aai" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

interface NavigationProps {
  transparent?: boolean;
}

export function Navigation({ transparent = false }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const bgClass = transparent
    ? "bg-transparent"
    : "bg-forest";

  return (
    <nav className={`${bgClass} absolute top-0 left-0 right-0 z-50`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-heading text-white text-sm tracking-[3px] uppercase"
          >
            Adventure Athlete India
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() =>
                  link.children && setDropdownOpen(link.label)
                }
                onMouseLeave={() => setDropdownOpen(null)}
              >
                <Link
                  href={link.href}
                  className="text-white text-sm font-normal tracking-wide hover:opacity-80 transition-opacity"
                >
                  {link.label}
                  {link.children && (
                    <span className="ml-1 text-xs">▼</span>
                  )}
                </Link>

                {/* Dropdown */}
                {link.children && dropdownOpen === link.label && (
                  <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl py-2 min-w-[180px]">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-dark hover:bg-gray-50 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* CTA Button */}
            <Link href="/plan" className="btn-primary py-2.5 px-5">
              Plan Your Adventure
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-forest-dark py-4">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  className="block px-4 py-3 text-white text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
                {link.children?.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="block px-8 py-2 text-white/80 text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
            <div className="px-4 pt-4">
              <Link
                href="/plan"
                className="btn-primary block text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Plan Your Adventure
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: add Navigation component with dropdown and mobile menu"
```

---

### Task 2.2: Create Footer Component

**Files:**
- Create: `website/src/components/layout/Footer.tsx`

**Step 1: Create Footer component**

```typescript
import Link from "next/link";

const experienceLinks = [
  { label: "Mountain Biking", href: "/experiences?category=Mountain+Biking" },
  { label: "Trail Running", href: "/experiences?category=Trail+Running" },
  { label: "Hiking", href: "/experiences?category=Hiking" },
  { label: "Nature Walks", href: "/experiences?category=Nature+Walk" },
];

const aboutLinks = [
  { label: "About Me", href: "/about" },
  { label: "Achievements", href: "/about/achievements" },
  { label: "Why AAI", href: "/about/why-aai" },
  { label: "Contact", href: "/contact" },
];

const usefulLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Safety Policy", href: "/safety" },
  { label: "Cancellation Policy", href: "/cancellation" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/adventure.athlete.india",
    icon: "instagram",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@adventureathleteindia",
    icon: "youtube",
  },
  {
    label: "Strava",
    href: "https://strava.com/athletes/atulchauhan",
    icon: "strava",
  },
];

export function Footer() {
  return (
    <footer className="bg-forest text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-sm tracking-[3px] uppercase mb-4">
              Adventure Athlete India
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Experience the raw Himalayas.
            </p>
            <div className="mt-6 space-y-2 text-sm text-white/70">
              <p>📍 Shimla, HP, India</p>
              <p>📱 +91-9459033240</p>
              <p>✉️ adventureathleteindia@gmail.com</p>
            </div>
          </div>

          {/* Experiences */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-4">
              Experiences
            </h4>
            <ul className="space-y-3">
              {experienceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-4">
              About
            </h4>
            <ul className="space-y-3">
              {aboutLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-4">
              Useful Links
            </h4>
            <ul className="space-y-3">
              {usefulLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} Adventure Athlete India · Atul Chauhan
          </p>
          <p className="text-sm text-white/50">
            Licensed HP Tourism Guide (Reg: 080724 42383)
          </p>
        </div>
      </div>
    </footer>
  );
}
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: add Footer component"
```

---

### Task 2.3: Create Layout Component & Index Exports

**Files:**
- Create: `website/src/components/layout/index.ts`
- Modify: `website/src/app/layout.tsx`

**Step 1: Create layout exports**

Create `website/src/components/layout/index.ts`:

```typescript
export { Navigation } from "./Navigation";
export { Footer } from "./Footer";
```

**Step 2: Update root layout**

Modify `website/src/app/layout.tsx`:

```typescript
import type { Metadata } from "next";
import { Oswald, Source_Sans_3 } from "next/font/google";
import { Footer } from "@/components/layout";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Adventure Athlete India | Experience the Raw Himalayas",
    template: "%s | Adventure Athlete India",
  },
  description:
    "Personalized cycling, trail running, and hiking experiences in the Himalayas with elite athlete and licensed guide Atul Chauhan.",
  keywords: [
    "Himachal Pradesh cycling",
    "Shimla mountain biking",
    "trail running India",
    "adventure tours Himalayas",
    "licensed guide Shimla",
  ],
  authors: [{ name: "Atul Chauhan" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Adventure Athlete India",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${sourceSans.variable}`}>
      <body className="min-h-screen flex flex-col">
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

**Step 3: Commit**

```bash
git add .
git commit -m "feat: integrate layout components into root layout"
```

---

## Phase 3: Home Page

### Task 3.1: Create Hero Component

**Files:**
- Create: `website/src/components/home/Hero.tsx`

**Step 1: Create Hero component**

```typescript
import Link from "next/link";
import { Navigation } from "@/components/layout";

export function Hero() {
  return (
    <section className="relative h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.5)),
            url('/images/hero-mountains.jpg')`,
        }}
      />

      {/* Navigation - transparent on hero */}
      <Navigation transparent />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        <div className="max-w-2xl">
          <h1 className="font-heading text-hero text-white uppercase tracking-wide leading-none mb-6">
            Experience the Raw Himalayas
          </h1>
          <p className="text-xl text-white/90 font-light mb-10 max-w-lg">
            Trails that don&apos;t show up on maps. Guided by someone who&apos;s
            spent years discovering them.
          </p>
          <Link href="/experiences" className="btn-primary">
            Explore Experiences
          </Link>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: add Hero component for home page"
```

---

### Task 3.2: Create RouteCard Component

**Files:**
- Create: `website/src/components/routes/RouteCard.tsx`

**Step 1: Create RouteCard component**

```typescript
import Link from "next/link";
import Image from "next/image";
import { RouteData } from "@/types";
import { getRouteImagePath } from "@/lib/data";

interface RouteCardProps {
  route: RouteData;
}

export function RouteCard({ route }: RouteCardProps) {
  const imagePath = getRouteImagePath(route);

  return (
    <Link
      href={`/experience/${route.meta.slug}`}
      className="group cursor-pointer"
    >
      {/* Image */}
      <div className="aspect-4/3 overflow-hidden mb-5">
        <div className="relative w-full h-full bg-gray-200">
          <Image
            src={imagePath}
            alt={route.basic_info.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <span className="section-label">{route.basic_info.category}</span>
        <h3 className="font-heading text-2xl">{route.basic_info.title}</h3>
        <p className="text-sm text-slate">
          {route.metrics.distance_km && `${route.metrics.distance_km} km`}
          {route.metrics.elevation_gain_m &&
            ` · ${route.metrics.elevation_gain_m}m ↑`}
          {route.basic_info.difficulty && ` · ${route.basic_info.difficulty}`}
          {route.metrics.duration && ` · ${route.metrics.duration}`}
        </p>
      </div>
    </Link>
  );
}
```

**Step 2: Create routes index export**

Create `website/src/components/routes/index.ts`:

```typescript
export { RouteCard } from "./RouteCard";
```

**Step 3: Commit**

```bash
git add .
git commit -m "feat: add RouteCard component"
```

---

### Task 3.3: Create LatestAdventures Section

**Files:**
- Create: `website/src/components/home/LatestAdventures.tsx`

**Step 1: Create LatestAdventures component**

```typescript
import { RouteData } from "@/types";
import { RouteCard } from "@/components/routes";
import Link from "next/link";

interface LatestAdventuresProps {
  routes: RouteData[];
}

export function LatestAdventures({ routes }: LatestAdventuresProps) {
  // Show max 4 routes
  const displayRoutes = routes.slice(0, 4);

  return (
    <section className="py-24 px-6 lg:px-10 max-w-7xl mx-auto">
      <span className="section-label">Latest Adventures</span>
      <h2 className="section-title mt-4 mb-6">Recently Explored</h2>
      <p className="section-text mb-16">
        Every route is a story. These are the trails I&apos;ve been discovering
        lately.
      </p>

      {displayRoutes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayRoutes.map((route) => (
            <RouteCard key={route.meta.route_id} route={route} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <p className="text-slate mb-4">
            Routes are being documented. Check back soon!
          </p>
          <p className="text-sm text-slate-light">
            In the meantime, feel free to reach out about custom adventures.
          </p>
        </div>
      )}

      {displayRoutes.length > 0 && (
        <div className="text-center mt-12">
          <Link href="/experiences" className="btn-secondary">
            View All Experiences
          </Link>
        </div>
      )}
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: add LatestAdventures section component"
```

---

### Task 3.4: Create Athlete Section

**Files:**
- Create: `website/src/components/home/AthleteSection.tsx`

**Step 1: Create AthleteSection component**

```typescript
import Image from "next/image";
import Link from "next/link";

export function AthleteSection() {
  return (
    <section className="py-24 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <div className="aspect-3/4 relative overflow-hidden">
          <Image
            src="/images/atul-portrait.jpg"
            alt="Atul Chauhan"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Content */}
        <div className="py-8">
          <span className="section-label">The Athlete</span>
          <h2 className="section-title mt-4 mb-8">
            I&apos;m Atul. I ride, I run, I explore.
          </h2>
          <div className="space-y-6 section-text">
            <p>
              Based in Shimla, I&apos;ve spent years discovering trails that
              most maps don&apos;t show. This isn&apos;t a tour company — it&apos;s
              a personal invitation to experience the Himalayas the way I do.
            </p>
            <p>
              When you book with Adventure Athlete India, you get me. Personal
              attention, real connection, shared passion for these mountains.
            </p>
          </div>

          {/* Credentials */}
          <div className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-2 text-slate text-sm">
              <span>🚴</span>
              <span>Elite Cyclist</span>
            </div>
            <div className="flex items-center gap-2 text-slate text-sm">
              <span>🏃</span>
              <span>Trail Runner</span>
            </div>
            <div className="flex items-center gap-2 text-slate text-sm">
              <span>🎫</span>
              <span>Licensed Guide</span>
            </div>
            <div className="flex items-center gap-2 text-slate text-sm">
              <span>🏆</span>
              <span>5x Nationals</span>
            </div>
          </div>

          <div className="mt-8">
            <Link href="/about" className="btn-secondary">
              Read My Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: add AthleteSection component"
```

---

### Task 3.5: Create CTA Section

**Files:**
- Create: `website/src/components/home/CTASection.tsx`

**Step 1: Create CTASection component**

```typescript
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-24 px-6 lg:px-10 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="section-title mb-6">Not sure where to start?</h2>
        <p className="section-text mx-auto text-center mb-10">
          Share your vibe — fitness level, interests, dates. I&apos;ll craft an
          experience just for you.
        </p>
        <Link href="/plan" className="btn-primary">
          Let&apos;s Plan Together
        </Link>
      </div>
    </section>
  );
}
```

**Step 2: Create home components index**

Create `website/src/components/home/index.ts`:

```typescript
export { Hero } from "./Hero";
export { LatestAdventures } from "./LatestAdventures";
export { AthleteSection } from "./AthleteSection";
export { CTASection } from "./CTASection";
```

**Step 3: Commit**

```bash
git add .
git commit -m "feat: add CTASection component and home exports"
```

---

### Task 3.6: Build Home Page

**Files:**
- Modify: `website/src/app/page.tsx`

**Step 1: Create home page**

Replace `website/src/app/page.tsx`:

```typescript
import {
  Hero,
  LatestAdventures,
  AthleteSection,
  CTASection,
} from "@/components/home";
import { getAllRoutes } from "@/lib/data";

export default async function HomePage() {
  const routes = await getAllRoutes();

  return (
    <>
      <Hero />
      <LatestAdventures routes={routes} />
      <AthleteSection />
      <CTASection />
    </>
  );
}
```

**Step 2: Add placeholder images**

Create placeholder files (will be replaced with real images):

```bash
mkdir -p website/public/images
# Create placeholder text file as reminder
echo "Add hero-mountains.jpg and atul-portrait.jpg here" > website/public/images/README.md
```

**Step 3: Test the page**

```bash
cd website && npm run dev
```

Visit http://localhost:3000 - should show home page structure (images will be broken until added).

**Step 4: Commit**

```bash
git add .
git commit -m "feat: build complete home page with all sections"
```

---

## Phase 4: Experiences Pages

### Task 4.1: Create Experiences Library Page

**Files:**
- Create: `website/src/app/experiences/page.tsx`

**Step 1: Create experiences page**

```typescript
import { Metadata } from "next";
import { Navigation } from "@/components/layout";
import { RouteCard } from "@/components/routes";
import { getAllRoutes, getAllCategories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "Explore cycling, running, and hiking routes in the Himalayas. Each route documented from personal adventures.",
};

interface ExperiencesPageProps {
  searchParams: { category?: string };
}

export default async function ExperiencesPage({
  searchParams,
}: ExperiencesPageProps) {
  const allRoutes = await getAllRoutes();
  const categories = await getAllCategories();
  const selectedCategory = searchParams.category;

  const filteredRoutes = selectedCategory
    ? allRoutes.filter((r) => r.basic_info.category === selectedCategory)
    : allRoutes;

  return (
    <>
      <Navigation />
      <div className="pt-32 pb-24 px-6 lg:px-10 max-w-7xl mx-auto">
        {/* Header */}
        <span className="section-label">Experiences</span>
        <h1 className="section-title mt-4 mb-6">Explore the Himalayas</h1>
        <p className="section-text mb-12">
          Every route is one I&apos;ve personally ridden, run, or hiked.
          Documented from real adventures.
        </p>

        {/* Category Filters */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-12">
            <a
              href="/experiences"
              className={`px-4 py-2 text-sm rounded-full transition-colors ${
                !selectedCategory
                  ? "bg-forest text-white"
                  : "bg-gray-100 text-slate hover:bg-gray-200"
              }`}
            >
              All
            </a>
            {categories.map((category) => (
              <a
                key={category}
                href={`/experiences?category=${encodeURIComponent(category)}`}
                className={`px-4 py-2 text-sm rounded-full transition-colors ${
                  selectedCategory === category
                    ? "bg-forest text-white"
                    : "bg-gray-100 text-slate hover:bg-gray-200"
                }`}
              >
                {category}
              </a>
            ))}
          </div>
        )}

        {/* Routes Grid */}
        {filteredRoutes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredRoutes.map((route) => (
              <RouteCard key={route.meta.route_id} route={route} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <h3 className="font-heading text-2xl mb-4">Coming Soon</h3>
            <p className="text-slate mb-6">
              Routes are being documented from recent adventures.
            </p>
            <p className="text-sm text-slate-light">
              Want a custom experience?{" "}
              <a href="/plan" className="text-amber underline">
                Let&apos;s plan together
              </a>
            </p>
          </div>
        )}
      </div>
    </>
  );
}
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: add Experiences library page with category filtering"
```

---

### Task 4.2: Create Experience Detail Page

**Files:**
- Create: `website/src/app/experience/[slug]/page.tsx`

**Step 1: Create dynamic experience page**

```typescript
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/layout";
import { getAllRoutes, getRouteBySlug, getRouteImagePath } from "@/lib/data";

interface ExperiencePageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const routes = await getAllRoutes();
  return routes.map((route) => ({
    slug: route.meta.slug,
  }));
}

export async function generateMetadata({
  params,
}: ExperiencePageProps): Promise<Metadata> {
  const route = await getRouteBySlug(params.slug);
  if (!route) return { title: "Route Not Found" };

  return {
    title: route.basic_info.title,
    description:
      route.polished_content.short_summary ||
      route.basic_info.short_description,
  };
}

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const route = await getRouteBySlug(params.slug);

  if (!route) {
    notFound();
  }

  const imagePath = getRouteImagePath(route);
  const description =
    route.polished_content.website_description || route.notes.raw_description;

  return (
    <>
      <Navigation />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px]">
        <Image
          src={imagePath}
          alt={route.basic_info.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10 max-w-7xl mx-auto">
          <span className="section-label text-amber-light mb-2 block">
            {route.basic_info.category}
          </span>
          <h1 className="font-heading text-4xl lg:text-5xl text-white mb-4">
            {route.basic_info.title}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            {route.basic_info.short_description}
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 p-6 bg-gray-50 rounded-lg">
          {route.metrics.distance_km && (
            <div>
              <div className="text-xs uppercase tracking-wide text-slate mb-1">
                Distance
              </div>
              <div className="font-heading text-2xl">
                {route.metrics.distance_km} km
              </div>
            </div>
          )}
          {route.metrics.elevation_gain_m && (
            <div>
              <div className="text-xs uppercase tracking-wide text-slate mb-1">
                Elevation
              </div>
              <div className="font-heading text-2xl">
                {route.metrics.elevation_gain_m}m ↑
              </div>
            </div>
          )}
          <div>
            <div className="text-xs uppercase tracking-wide text-slate mb-1">
              Difficulty
            </div>
            <div className="font-heading text-2xl">
              {route.basic_info.difficulty}
            </div>
          </div>
          {route.metrics.duration && (
            <div>
              <div className="text-xs uppercase tracking-wide text-slate mb-1">
                Duration
              </div>
              <div className="font-heading text-2xl">
                {route.metrics.duration}
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="prose prose-lg max-w-none mb-16">
          <h2 className="font-heading text-2xl mb-6">About This Route</h2>
          <div className="whitespace-pre-line text-slate-dark leading-relaxed">
            {description}
          </div>
        </div>

        {/* Location */}
        <div className="mb-16">
          <h2 className="font-heading text-2xl mb-6">Getting There</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-xs uppercase tracking-wide text-slate mb-1">
                Start Point
              </div>
              <div className="font-medium">{route.location.start_point}</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-xs uppercase tracking-wide text-slate mb-1">
                End Point
              </div>
              <div className="font-medium">{route.location.end_point}</div>
            </div>
          </div>
          {route.location.how_to_reach && (
            <p className="mt-4 text-slate-dark">{route.location.how_to_reach}</p>
          )}
        </div>

        {/* Strava Embed */}
        {route.metrics.strava_link && (
          <div className="mb-16">
            <h2 className="font-heading text-2xl mb-6">View on Strava</h2>
            <a
              href={route.metrics.strava_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-amber hover:underline"
            >
              Open in Strava →
            </a>
          </div>
        )}

        {/* CTA */}
        <div className="text-center p-10 bg-forest rounded-lg">
          <h3 className="font-heading text-2xl text-white mb-4">
            Want a guided experience?
          </h3>
          <p className="text-white/80 mb-6">
            I&apos;ll take you on this route with local insights, safety, and
            good company.
          </p>
          <Link href="/plan" className="btn-primary">
            Plan Your Adventure
          </Link>
        </div>

        {/* Author */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
              <Image
                src="/images/atul-avatar.jpg"
                alt="Atul Chauhan"
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
            <div>
              <div className="font-heading text-lg">Atul Chauhan</div>
              <div className="text-sm text-slate">
                🚴 Elite Cyclist · 🏃 Trail Runner · 🎫 Licensed Guide
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: add Experience detail page with dynamic routing"
```

---

## Phase 5: About Pages

### Task 5.1: Create About Page

**Files:**
- Create: `website/src/app/about/page.tsx`

**Step 1: Create about page**

```typescript
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/layout";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Meet Atul Chauhan - elite cyclist, trail runner, and licensed HP Tourism guide based in Shimla.",
};

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <div className="pt-32 pb-24">
        {/* Hero */}
        <section className="px-6 lg:px-10 max-w-7xl mx-auto mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="aspect-3/4 relative overflow-hidden">
              <Image
                src="/images/atul-about.jpg"
                alt="Atul Chauhan"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <span className="section-label">About Me</span>
              <h1 className="section-title mt-4 mb-8">
                I&apos;m Atul. I ride, I run, I explore.
              </h1>
              <div className="space-y-6 section-text">
                <p>
                  Based in Shimla, I&apos;ve spent years discovering trails that
                  most maps don&apos;t show. These mountains are my home, my
                  training ground, and my passion.
                </p>
                <p>
                  Adventure Athlete India isn&apos;t a tour company — it&apos;s
                  me sharing the Himalayas I know and love. When you book, you
                  get personal attention, real local knowledge, and an athlete
                  who understands what your body needs on the trail.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Numbers */}
        <section className="bg-gray-50 py-20 px-6 lg:px-10 mb-24">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-heading text-3xl text-center mb-16">
              The Numbers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="font-heading text-5xl text-forest mb-2">9+</div>
                <div className="text-slate">Years of Adventure</div>
              </div>
              <div>
                <div className="font-heading text-5xl text-forest mb-2">5</div>
                <div className="text-slate">National Championships</div>
              </div>
              <div>
                <div className="font-heading text-5xl text-forest mb-2">10+</div>
                <div className="text-slate">Podium Finishes</div>
              </div>
              <div>
                <div className="font-heading text-5xl text-forest mb-2">20+</div>
                <div className="text-slate">Races Completed</div>
              </div>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="px-6 lg:px-10 max-w-3xl mx-auto mb-24">
          <h2 className="font-heading text-3xl mb-12">My Story</h2>
          <div className="space-y-12">
            <div className="border-l-2 border-amber pl-6">
              <div className="section-label mb-2">The Dream</div>
              <p className="text-slate-dark">
                Wanted to race motorsports. Couldn&apos;t afford it. Found bikes
                instead.
              </p>
            </div>
            <div className="border-l-2 border-amber pl-6">
              <div className="section-label mb-2">2015 — The Accident</div>
              <p className="text-slate-dark">
                4 months bed rest. Doctor said I&apos;d never run again. I had
                other plans.
              </p>
            </div>
            <div className="border-l-2 border-amber pl-6">
              <div className="section-label mb-2">2016 — The Comeback</div>
              <p className="text-slate-dark">
                Started cycling against family&apos;s wishes. Dad gifted my
                first bike. One month later — Hero MTB Himalaya.
              </p>
            </div>
            <div className="border-l-2 border-amber pl-6">
              <div className="section-label mb-2">2017-2021 — Racing Years</div>
              <p className="text-slate-dark">
                5 National Championships. Multiple podiums. First MTB summits no
                one had done before.
              </p>
            </div>
            <div className="border-l-2 border-amber pl-6">
              <div className="section-label mb-2">Now — Sharing It</div>
              <p className="text-slate-dark">
                Less racing, more exploring. Meeting riders from around the
                world. Showing them my Himalayas.
              </p>
            </div>
          </div>
        </section>

        {/* Beyond Sports */}
        <section className="bg-forest text-white py-20 px-6 lg:px-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl mb-12 text-center">
              Beyond the Trails
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-amber text-sm uppercase tracking-wide mb-3">
                  Education
                </div>
                <p className="text-white/80">MBA — HP University (2019)</p>
                <p className="text-white/80">
                  B.Tech Computer Science — LPU (2015)
                </p>
              </div>
              <div>
                <div className="text-amber text-sm uppercase tracking-wide mb-3">
                  Profession
                </div>
                <p className="text-white/80">Software Business Analyst</p>
                <p className="text-white/60 text-sm mt-1">
                  Tech pays the bills, trails feed the soul
                </p>
              </div>
              <div>
                <div className="text-amber text-sm uppercase tracking-wide mb-3">
                  Certified
                </div>
                <p className="text-white/80">Licensed HP Tourism Guide</p>
                <p className="text-white/60 text-sm mt-1">
                  Reg: 080724 42383
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 lg:px-10 text-center">
          <h2 className="font-heading text-3xl mb-6">Ready to ride?</h2>
          <p className="text-slate max-w-lg mx-auto mb-10">
            Let&apos;s plan an adventure that matches your style and fitness.
          </p>
          <Link href="/plan" className="btn-primary">
            Plan Your Adventure
          </Link>
        </section>
      </div>
    </>
  );
}
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: add About page with story timeline"
```

---

## Phase 6: Contact & Plan Pages

### Task 6.1: Create Contact Page

**Files:**
- Create: `website/src/app/contact/page.tsx`

**Step 1: Create contact page**

```typescript
import { Metadata } from "next";
import { Navigation } from "@/components/layout";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Atul Chauhan for adventure tours in Himachal Pradesh.",
};

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <div className="pt-32 pb-24 px-6 lg:px-10 max-w-4xl mx-auto">
        <span className="section-label">Contact</span>
        <h1 className="section-title mt-4 mb-8">Get in Touch</h1>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <p className="section-text mb-8">
              Have questions? Want to discuss a custom adventure? I&apos;d love to hear from you.
            </p>

            <div className="space-y-6">
              <div>
                <div className="text-xs uppercase tracking-wide text-slate mb-2">WhatsApp</div>
                <a href="https://wa.me/919459033240" className="text-xl font-medium text-forest hover:text-amber transition-colors">
                  +91-9459033240
                </a>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wide text-slate mb-2">Email</div>
                <a href="mailto:adventureathleteindia@gmail.com" className="text-lg text-forest hover:text-amber transition-colors">
                  adventureathleteindia@gmail.com
                </a>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wide text-slate mb-2">Based In</div>
                <p className="text-lg">Shimla, Himachal Pradesh, India</p>
              </div>
            </div>

            {/* Social */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="text-xs uppercase tracking-wide text-slate mb-4">Follow Along</div>
              <div className="flex gap-4">
                <a href="https://instagram.com/adventure.athlete.india" target="_blank" rel="noopener noreferrer" className="text-slate hover:text-amber transition-colors">
                  Instagram
                </a>
                <a href="https://youtube.com/@adventureathleteindia" target="_blank" rel="noopener noreferrer" className="text-slate hover:text-amber transition-colors">
                  YouTube
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate hover:text-amber transition-colors">
                  Strava
                </a>
              </div>
            </div>
          </div>

          {/* Quick Form */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="font-heading text-xl mb-6">Quick Message</h2>
            <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-forest"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-forest"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-forest"
                />
              </div>
              <button type="submit" className="btn-primary w-full text-center">
                Send Message
              </button>
            </form>
            <p className="text-xs text-slate mt-4 text-center">
              For detailed tour inquiries, use the{" "}
              <a href="/plan" className="text-amber underline">Plan Your Adventure</a> form.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: add Contact page with form"
```

---

### Task 6.2: Create Plan Your Adventure Page

**Files:**
- Create: `website/src/app/plan/page.tsx`

**Step 1: Create plan page**

```typescript
import { Metadata } from "next";
import { Navigation } from "@/components/layout";

export const metadata: Metadata = {
  title: "Plan Your Adventure",
  description: "Tell me about your ideal Himalayan adventure and I'll craft a personalized experience.",
};

export default function PlanPage() {
  return (
    <>
      <Navigation />
      <div className="pt-32 pb-24 px-6 lg:px-10 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-label">Plan Your Adventure</span>
          <h1 className="section-title mt-4 mb-6">
            Let&apos;s Create Something Special
          </h1>
          <p className="section-text mx-auto text-center">
            Not sure where to start? Share your vibe — I&apos;ll craft an experience just for you.
          </p>
        </div>

        <form
          action="https://formspree.io/f/YOUR_FORM_ID"
          method="POST"
          className="space-y-8 bg-white"
        >
          {/* Basic Info */}
          <div className="space-y-4">
            <h2 className="font-heading text-xl border-b pb-2">About You</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-forest"
                />
              </div>
              <div>
                <label htmlFor="nationality" className="block text-sm font-medium mb-2">
                  Nationality <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="nationality"
                  name="nationality"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-forest"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-forest"
                />
              </div>
              <div>
                <label htmlFor="whatsapp" className="block text-sm font-medium mb-2">
                  WhatsApp / Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-forest"
                />
              </div>
            </div>
          </div>

          {/* Activity Preferences */}
          <div className="space-y-4">
            <h2 className="font-heading text-xl border-b pb-2">Your Adventure</h2>

            <div>
              <label className="block text-sm font-medium mb-3">
                What interests you? <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["Cycling / MTB", "Running / Trail", "Hiking / Trekking", "Nature Walk", "Something else"].map((activity) => (
                  <label key={activity} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="activities" value={activity} className="w-4 h-4 text-forest" />
                    <span className="text-sm">{activity}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">
                Preferred difficulty <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: "very-easy", label: "Very Easy", desc: "2+ hrs, minimal elevation" },
                  { value: "easy", label: "Easy", desc: "Half day, gentle terrain" },
                  { value: "moderate", label: "Moderate", desc: "Full day, some challenge" },
                  { value: "advanced", label: "Advanced", desc: "5+ hrs, high intensity" },
                ].map((level) => (
                  <label key={level.value} className="flex items-start gap-2 cursor-pointer">
                    <input type="radio" name="difficulty" value={level.value} required className="mt-1 w-4 h-4 text-forest" />
                    <div>
                      <span className="text-sm font-medium">{level.label}</span>
                      <p className="text-xs text-slate">{level.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="people" className="block text-sm font-medium mb-2">
                  Number of people <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="people"
                  name="people"
                  min="1"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-forest"
                />
              </div>
              <div>
                <label htmlFor="dates" className="block text-sm font-medium mb-2">
                  Preferred dates
                </label>
                <input
                  type="text"
                  id="dates"
                  name="dates"
                  placeholder="e.g., March 15-20, 2026"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-forest"
                />
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-4">
            <h2 className="font-heading text-xl border-b pb-2">Tell Me More</h2>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                What&apos;s your ideal adventure? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder="Share your fitness level, what you're hoping for, any concerns..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-forest"
              />
            </div>

            <div>
              <label htmlFor="referral" className="block text-sm font-medium mb-2">
                How did you hear about me?
              </label>
              <select
                id="referral"
                name="referral"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-forest"
              >
                <option value="">Select one...</option>
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
                <option value="strava">Strava</option>
                <option value="friend">Friend/Word of mouth</option>
                <option value="google">Google search</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Consent */}
          <div className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" name="consent" required className="mt-1 w-4 h-4 text-forest" />
              <span className="text-sm text-slate">
                I agree to share my information with Adventure Athlete India for the purpose of planning my adventure.
                View our <a href="/privacy" className="text-amber underline">Privacy Policy</a>.
              </span>
            </label>
          </div>

          <button type="submit" className="btn-primary w-full text-center py-4">
            Send Inquiry
          </button>

          <p className="text-center text-sm text-slate">
            I&apos;ll get back to you within 24-48 hours.
          </p>
        </form>
      </div>
    </>
  );
}
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: add Plan Your Adventure inquiry form page"
```

---

## Phase 7: Policy Pages

### Task 7.1: Create FAQ Page

**Files:**
- Create: `website/src/app/faq/page.tsx`

**Step 1: Create FAQ page**

```typescript
import { Metadata } from "next";
import { Navigation } from "@/components/layout";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Adventure Athlete India tours.",
};

const faqs = [
  {
    category: "Booking",
    questions: [
      {
        q: "How do I book a tour?",
        a: "Fill the 'Plan Your Adventure' form. I'll reach out within 24-48 hours to discuss and customize your experience.",
      },
      {
        q: "How far in advance should I book?",
        a: "At least 3-5 days for day trips. 1-2 weeks for multi-day adventures.",
      },
      {
        q: "Is this a private tour?",
        a: "Yes, all tours are private - just you/your group and me. No strangers.",
      },
    ],
  },
  {
    category: "Payment",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "UPI, Bank Transfer, or Cash. 50% advance to confirm, 50% before tour.",
      },
      {
        q: "What's included in the price?",
        a: "Guide fee only. Extras (transport, bike rental, food) depend on your choices. You can pay providers directly, or I maintain a record and you settle with me at the end.",
      },
    ],
  },
  {
    category: "Safety",
    questions: [
      {
        q: "Do you provide insurance?",
        a: "No. I recommend carrying personal insurance that covers adventure activities.",
      },
      {
        q: "What if I get injured?",
        a: "I will provide immediate assistance and help you reach appropriate medical care.",
      },
      {
        q: "Do I need to be very fit?",
        a: "Depends on the activity. I'll recommend appropriate difficulty based on your fitness.",
      },
    ],
  },
  {
    category: "Gear",
    questions: [
      {
        q: "Do I need my own bike/gear?",
        a: "Your choice: bring your own or rent locally. I'll send a gear checklist and can sort out rentals for you if needed.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      <Navigation />
      <div className="pt-32 pb-24 px-6 lg:px-10 max-w-3xl mx-auto">
        <span className="section-label">FAQ</span>
        <h1 className="section-title mt-4 mb-6">Frequently Asked Questions</h1>
        <p className="section-text mb-12">
          Everything you need to know before your adventure.
        </p>

        <div className="space-y-12">
          {faqs.map((category) => (
            <div key={category.category}>
              <h2 className="font-heading text-xl text-forest mb-6">
                {category.category}
              </h2>
              <div className="space-y-6">
                {category.questions.map((faq, index) => (
                  <div key={index} className="border-b border-gray-100 pb-6">
                    <h3 className="font-medium mb-2">{faq.q}</h3>
                    <p className="text-slate">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-gray-50 rounded-lg text-center">
          <h2 className="font-heading text-xl mb-4">Still have questions?</h2>
          <p className="text-slate mb-6">
            I&apos;m happy to chat and answer anything else.
          </p>
          <a href="/contact" className="btn-secondary">
            Get in Touch
          </a>
        </div>
      </div>
    </>
  );
}
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: add FAQ page"
```

---

### Task 7.2: Create Policy Pages

**Files:**
- Create: `website/src/app/terms/page.tsx`
- Create: `website/src/app/privacy/page.tsx`
- Create: `website/src/app/safety/page.tsx`
- Create: `website/src/app/cancellation/page.tsx`

These pages follow the same pattern - content from the website design doc wrapped in consistent layout. For brevity, creating one template that can be replicated.

**Step 1: Create terms page**

```typescript
import { Metadata } from "next";
import { Navigation } from "@/components/layout";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for Adventure Athlete India tours.",
};

export default function TermsPage() {
  return (
    <>
      <Navigation />
      <div className="pt-32 pb-24 px-6 lg:px-10 max-w-3xl mx-auto">
        <span className="section-label">Legal</span>
        <h1 className="section-title mt-4 mb-2">Terms & Conditions</h1>
        <p className="text-sm text-slate mb-12">Last updated: January 2026</p>

        <div className="prose prose-slate max-w-none">
          <p className="text-lg font-medium">
            By booking a tour, you agree to the following:
          </p>

          <h2>About the Service</h2>
          <ul>
            <li>Tours are conducted personally by Atul Chauhan</li>
            <li>This is a personal guiding service, not a tour company</li>
            <li>Licensed HP Tourism Guide (Reg: 080724 42383)</li>
          </ul>

          <h2>What&apos;s Included</h2>
          <ul>
            <li>Fees cover guiding service only</li>
            <li>Third-party costs (food, transport, rentals, permits) are extra</li>
            <li>Equipment damage costs are the client&apos;s responsibility</li>
          </ul>

          <h2>Booking & Payment</h2>
          <ul>
            <li>Booking confirmed only after payment received</li>
            <li>50% advance to confirm, 50% before tour starts</li>
            <li>Payment via UPI, Bank Transfer, or Cash</li>
          </ul>

          <h2>Itinerary</h2>
          <ul>
            <li>Routes may change due to weather, road conditions, or safety concerns</li>
            <li>Flexibility and cooperation appreciated in such cases</li>
            <li>Alternative solutions will be offered</li>
          </ul>

          <h2>Your Responsibilities</h2>
          <ul>
            <li>Provide accurate health and fitness information</li>
            <li>Follow safety instructions during the tour</li>
            <li>Carry valid ID proof</li>
            <li>Respect the environment - carry your trash</li>
          </ul>

          <h2>Limitation of Liability</h2>
          <ul>
            <li>I am not liable for injuries, accidents, or losses</li>
            <li>In case of injury, I will provide immediate assistance and help reach medical care</li>
            <li>Personal insurance covering adventure activities is recommended</li>
          </ul>
        </div>
      </div>
    </>
  );
}
```

**Step 2: Create remaining policy pages** (privacy, safety, cancellation)

Follow the same pattern with content from the website design document.

**Step 3: Commit**

```bash
git add .
git commit -m "feat: add policy pages (terms, privacy, safety, cancellation)"
```

---

## Phase 8: Final Setup & Deploy

### Task 8.1: Add Placeholder Images

**Files:**
- Create: `website/public/images/` (various placeholder images)

**Step 1: Create placeholder directory structure and note required images**

```bash
mkdir -p website/public/images
mkdir -p website/public/routes
```

Create `website/public/images/REQUIRED.md`:
```markdown
# Required Images

Add these images before launch:

1. `hero-mountains.jpg` - Hero background (1920x1080 min)
2. `atul-portrait.jpg` - Portrait for home page (800x1200)
3. `atul-about.jpg` - About page image
4. `atul-avatar.jpg` - Small avatar (200x200)
5. `placeholder-route.jpg` - Default route image (800x600)
```

**Step 2: Commit**

```bash
git add .
git commit -m "chore: add placeholder image structure"
```

---

### Task 8.2: Create 404 Page

**Files:**
- Create: `website/src/app/not-found.tsx`

**Step 1: Create 404 page**

```typescript
import Link from "next/link";
import { Navigation } from "@/components/layout";

export default function NotFound() {
  return (
    <>
      <Navigation />
      <div className="pt-32 pb-24 px-6 lg:px-10 max-w-2xl mx-auto text-center min-h-[60vh] flex flex-col justify-center">
        <h1 className="font-heading text-6xl text-forest mb-4">404</h1>
        <h2 className="font-heading text-2xl mb-6">Trail Not Found</h2>
        <p className="text-slate mb-10">
          Looks like this path doesn&apos;t exist. Even I haven&apos;t explored everywhere yet.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/" className="btn-primary">
            Back Home
          </Link>
          <Link href="/experiences" className="btn-secondary">
            Explore Routes
          </Link>
        </div>
      </div>
    </>
  );
}
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: add custom 404 page"
```

---

### Task 8.3: Final Build Test

**Step 1: Run production build**

```bash
cd website
npm run build
```

Expected: Build completes without errors.

**Step 2: Test production locally**

```bash
npm run start
```

Visit http://localhost:3000 and test all pages.

**Step 3: Final commit**

```bash
git add .
git commit -m "chore: verify production build"
```

---

### Task 8.4: Prepare for Vercel Deployment

**Files:**
- Create: `website/vercel.json` (optional, for custom config)

**Step 1: Ensure Vercel-ready**

The project is already Vercel-ready. When you're ready to deploy:

1. Push to GitHub
2. Connect repo to Vercel
3. Vercel auto-detects Next.js and deploys

**Step 2: Document deployment steps**

Create `website/DEPLOY.md`:

```markdown
# Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (free)

## Steps

1. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/adventure-athlete-india.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to vercel.com
   - Click "Add New Project"
   - Import your GitHub repo
   - Set root directory to `website`
   - Deploy

3. **Environment Variables** (if needed later)
   - Add in Vercel dashboard under Settings > Environment Variables

4. **Custom Domain** (optional)
   - Add in Vercel dashboard under Settings > Domains
   - Point DNS to Vercel

## Updating

Every push to `main` branch auto-deploys.
```

**Step 3: Commit**

```bash
git add .
git commit -m "docs: add deployment guide"
```

---

## Summary

### Pages Created
1. Home (`/`)
2. Experiences Library (`/experiences`)
3. Experience Detail (`/experience/[slug]`)
4. About (`/about`)
5. Achievements (`/about/achievements`) - TODO
6. Why AAI (`/about/why-aai`) - TODO
7. Contact (`/contact`)
8. Plan Your Adventure (`/plan`)
9. FAQ (`/faq`)
10. Terms (`/terms`)
11. Privacy (`/privacy`)
12. Safety (`/safety`)
13. Cancellation (`/cancellation`)
14. 404 Not Found

### Components Created
- Navigation (with dropdown, mobile menu)
- Footer
- Hero
- RouteCard
- LatestAdventures
- AthleteSection
- CTASection

### Data Utilities
- `getAllRoutes()` - Get all published routes
- `getRouteBySlug()` - Get single route
- `getRoutesByCategory()` - Filter by category
- `getAthleteProfile()` - Get profile data

---

**Plan complete and saved to `docs/plans/2026-01-06-website-implementation.md`.**

**Two execution options:**

1. **Subagent-Driven (this session)** - I dispatch fresh subagent per task, review between tasks, fast iteration

2. **Parallel Session (separate)** - Open new session with executing-plans, batch execution with checkpoints

Which approach would you prefer?