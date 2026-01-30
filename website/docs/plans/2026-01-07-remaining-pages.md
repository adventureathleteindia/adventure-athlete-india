# Remaining Pages Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement all remaining pages for the Adventure Athlete India website, matching the HTML prototypes exactly.

**Architecture:** Each page follows Next.js App Router conventions with server components by default. Reusable UI components go in `components/ui/`, page-specific components stay in the page file. All styling uses Tailwind CSS with design tokens from globals.css.

**Tech Stack:** Next.js 16.1.1, React 19, TypeScript, Tailwind CSS 4

**Reference Files:**
- Prototypes: `/Users/FinancialDocs/AI tools/adventure-athlete-india/design/prototypes/`
- Design Guide: `/Users/FinancialDocs/AI tools/adventure-athlete-india/website/docs/MOBILE-DESIGN-GUIDE.md`
- Global CSS: `/Users/FinancialDocs/AI tools/adventure-athlete-india/website/app/globals.css`

---

## Task 1: Add Form Styles to globals.css

**Files:**
- Modify: `app/globals.css`

**Step 1: Add form-related CSS classes**

Add the following to `app/globals.css` after the Page Header section:

```css
/* ===========================================
   Form Styles
   =========================================== */

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-charcoal);
  margin-bottom: 8px;
}

.form-label .required {
  color: #dc2626;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 14px 16px;
  font-family: var(--font-body);
  font-size: 15px;
  border: 1px solid var(--color-gray-200);
  border-radius: 8px;
  background: white;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: var(--color-forest);
  box-shadow: 0 0 0 3px rgba(45, 90, 61, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.form-check {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  font-size: 14px;
  color: var(--color-slate-dark);
}

.form-check input[type="checkbox"],
.form-check input[type="radio"] {
  width: 18px;
  height: 18px;
  margin-top: 2px;
  accent-color: var(--color-forest);
}

/* Contact Info Styles */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.contact-item-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--color-slate);
  margin-bottom: 8px;
}

.contact-item-value {
  font-size: 20px;
  font-weight: 500;
  color: var(--color-charcoal);
}

.contact-item-value a {
  color: var(--color-charcoal);
  transition: color 0.2s;
}

.contact-item-value a:hover {
  color: var(--color-amber);
}

/* Two Column Layout */
.two-col {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
}

@media (min-width: 768px) {
  .two-col {
    grid-template-columns: 1fr 1fr;
  }
}

/* Max Width Utilities */
.max-w-3xl {
  max-width: 768px;
  margin-left: auto;
  margin-right: auto;
}

.max-w-4xl {
  max-width: 896px;
  margin-left: auto;
  margin-right: auto;
}

/* Margin Utilities */
.mb-4 { margin-bottom: 16px; }
.mb-8 { margin-bottom: 32px; }
.mt-4 { margin-top: 16px; }
.mx-auto { margin-left: auto; margin-right: auto; }
.text-center { text-align: center; }
```

**Step 2: Verify the build passes**

Run: `npm run build`
Expected: Build succeeds with no errors

**Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: add form and utility styles to globals.css"
```

---

## Task 2: Experiences Page - Filter Pills Component

**Files:**
- Create: `components/ui/FilterPills.tsx`
- Create: `components/ui/__tests__/FilterPills.test.tsx`
- Modify: `components/ui/index.ts`

**Step 1: Write the test**

Create `components/ui/__tests__/FilterPills.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import FilterPills from "../FilterPills";

const mockCategories = [
  { label: "All", value: "all" },
  { label: "Mountain Biking", value: "mtb" },
  { label: "Road Cycling", value: "road" },
];

describe("FilterPills", () => {
  it("renders all category pills", () => {
    render(<FilterPills categories={mockCategories} activeFilter="all" onFilterChange={() => {}} />);
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Mountain Biking")).toBeInTheDocument();
    expect(screen.getByText("Road Cycling")).toBeInTheDocument();
  });

  it("highlights the active filter", () => {
    render(<FilterPills categories={mockCategories} activeFilter="mtb" onFilterChange={() => {}} />);
    const mtbButton = screen.getByText("Mountain Biking");
    expect(mtbButton).toHaveClass("bg-[var(--color-forest)]");
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test:run -- components/ui/__tests__/FilterPills.test.tsx`
Expected: FAIL with "Cannot find module '../FilterPills'"

**Step 3: Write minimal implementation**

Create `components/ui/FilterPills.tsx`:

```tsx
"use client";

interface Category {
  label: string;
  value: string;
}

interface FilterPillsProps {
  categories: Category[];
  activeFilter: string;
  onFilterChange: (value: string) => void;
}

export default function FilterPills({ categories, activeFilter, onFilterChange }: FilterPillsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onFilterChange(category.value)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
            activeFilter === category.value
              ? "bg-[var(--color-forest)] text-white"
              : "bg-[var(--color-gray-100)] text-[var(--color-slate-dark)] hover:bg-[var(--color-gray-200)]"
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
```

**Step 4: Export from index**

Add to `components/ui/index.ts`:

```ts
export { default as FilterPills } from "./FilterPills";
```

**Step 5: Run test to verify it passes**

Run: `npm run test:run -- components/ui/__tests__/FilterPills.test.tsx`
Expected: PASS

**Step 6: Commit**

```bash
git add components/ui/FilterPills.tsx components/ui/__tests__/FilterPills.test.tsx components/ui/index.ts
git commit -m "feat: add FilterPills component for experiences page"
```

---

## Task 3: Experiences Page - Photo Pile Hero Component

**Files:**
- Create: `components/ui/PhotoPileHero.tsx`
- Create: `components/ui/__tests__/PhotoPileHero.test.tsx`
- Modify: `components/ui/index.ts`

**Step 1: Write the test**

Create `components/ui/__tests__/PhotoPileHero.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PhotoPileHero from "../PhotoPileHero";

const mockPhotos = [
  { src: "/photo1.jpg", alt: "Photo 1", label: "Route 1" },
  { src: "/photo2.jpg", alt: "Photo 2", label: "Route 2" },
];

describe("PhotoPileHero", () => {
  it("renders the title and subtitle", () => {
    render(<PhotoPileHero title="Experiences" subtitle="Discover adventures" photos={mockPhotos} />);
    expect(screen.getByText("Experiences")).toBeInTheDocument();
    expect(screen.getByText("Discover adventures")).toBeInTheDocument();
  });

  it("renders all photos", () => {
    render(<PhotoPileHero title="Experiences" subtitle="Discover adventures" photos={mockPhotos} />);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test:run -- components/ui/__tests__/PhotoPileHero.test.tsx`
Expected: FAIL

**Step 3: Write minimal implementation**

Create `components/ui/PhotoPileHero.tsx`:

```tsx
import Image from "next/image";

interface Photo {
  src: string;
  alt: string;
  label: string;
  style?: React.CSSProperties;
}

interface PhotoPileHeroProps {
  title: string;
  subtitle: string;
  photos: Photo[];
}

// Predefined positions for scattered photo effect
const photoPositions = [
  { top: "5%", left: "3%", transform: "rotate(-8deg)", zIndex: 10, width: 180, height: 120 },
  { top: "8%", left: "18%", transform: "rotate(5deg)", zIndex: 12, width: 140, height: 100 },
  { top: "2%", left: "32%", transform: "rotate(-3deg)", zIndex: 8, width: 200, height: 140 },
  { top: "10%", left: "52%", transform: "rotate(7deg)", zIndex: 14, width: 150, height: 110 },
  { top: "5%", left: "68%", transform: "rotate(-6deg)", zIndex: 9, width: 170, height: 120 },
  { top: "3%", right: "3%", transform: "rotate(4deg)", zIndex: 11, width: 130, height: 90 },
  { top: "40%", left: "2%", transform: "rotate(6deg)", zIndex: 13, width: 160, height: 110 },
  { top: "45%", left: "16%", transform: "rotate(-4deg)", zIndex: 7, width: 190, height: 130 },
  { top: "50%", left: "38%", transform: "rotate(8deg)", zIndex: 15, width: 145, height: 100 },
  { top: "42%", left: "55%", transform: "rotate(-7deg)", zIndex: 10, width: 175, height: 120 },
  { top: "48%", left: "75%", transform: "rotate(5deg)", zIndex: 12, width: 155, height: 105 },
  { top: "72%", left: "5%", transform: "rotate(-5deg)", zIndex: 11, width: 140, height: 95 },
];

export default function PhotoPileHero({ title, subtitle, photos }: PhotoPileHeroProps) {
  return (
    <div className="relative">
      {/* Header */}
      <div className="page-header compact text-center">
        <div className="container">
          <span className="section-label">Explore</span>
          <h1 className="section-title">{title}</h1>
          <p className="section-text mx-auto text-center">{subtitle}</p>
        </div>
      </div>

      {/* Photo Pile */}
      <div className="relative h-[420px] overflow-hidden bg-gradient-to-br from-[var(--color-gray-50)] to-[var(--color-gray-100)]">
        <div className="absolute inset-0">
          {photos.map((photo, index) => {
            const pos = photoPositions[index % photoPositions.length];
            return (
              <div
                key={index}
                className="absolute bg-white p-1.5 shadow-lg cursor-pointer transition-transform duration-300 hover:scale-110 hover:rotate-0 hover:z-[100] hover:shadow-xl"
                style={{
                  top: pos.top,
                  left: pos.left,
                  right: pos.right,
                  transform: pos.transform,
                  zIndex: pos.zIndex,
                  width: pos.width,
                }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={pos.width}
                  height={pos.height}
                  className="object-cover"
                  style={{ height: pos.height }}
                />
                <span className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[10px] px-1.5 py-1 text-center opacity-0 transition-opacity group-hover:opacity-100">
                  {photo.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
```

**Step 4: Export from index**

Add to `components/ui/index.ts`:

```ts
export { default as PhotoPileHero } from "./PhotoPileHero";
```

**Step 5: Run test to verify it passes**

Run: `npm run test:run -- components/ui/__tests__/PhotoPileHero.test.tsx`
Expected: PASS

**Step 6: Commit**

```bash
git add components/ui/PhotoPileHero.tsx components/ui/__tests__/PhotoPileHero.test.tsx components/ui/index.ts
git commit -m "feat: add PhotoPileHero component with scattered photo effect"
```

---

## Task 4: Experiences Page Implementation

**Files:**
- Create: `app/experiences/page.tsx`

**Step 1: Create the experiences page**

Create `app/experiences/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Navigation, Footer } from "@/components/layout";
import { RouteCard, FilterPills, PhotoPileHero, CTASection } from "@/components/ui";

// Sample route data - will be replaced with real data
const allRoutes = [
  {
    title: "Kuppar Peak Loop",
    category: "Mountain Biking",
    categoryValue: "mtb",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
    href: "/experience/kuppar-peak-loop",
    distance: "32 km",
    elevation: "1200m",
    difficulty: "Hard",
    duration: "4-5 hrs",
  },
  {
    title: "Shali Tibba Summit",
    category: "Trail Running",
    categoryValue: "trail",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    href: "/experience/shali-tibba",
    distance: "18 km",
    elevation: "900m",
    difficulty: "Moderate",
    duration: "3-4 hrs",
  },
  {
    title: "Hatu Peak Trail",
    category: "Hiking",
    categoryValue: "hiking",
    image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&q=80",
    href: "/experience/hatu-peak",
    distance: "12 km",
    elevation: "600m",
    difficulty: "Moderate",
    duration: "4-5 hrs",
  },
  {
    title: "Kufri Road Climb",
    category: "Road Cycling",
    categoryValue: "road",
    image: "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?w=800&q=80",
    href: "/experience/kufri-road",
    distance: "45 km",
    elevation: "1500m",
    difficulty: "Hard",
    duration: "3-4 hrs",
  },
  {
    title: "Glen Forest Walk",
    category: "Nature Walk",
    categoryValue: "nature",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    href: "/experience/glen-forest",
    distance: "5 km",
    elevation: "150m",
    difficulty: "Easy",
    duration: "2 hrs",
  },
  {
    title: "Mashobra Gravel Loop",
    category: "Gravel",
    categoryValue: "gravel",
    image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=800&q=80",
    href: "/experience/mashobra-gravel",
    distance: "28 km",
    elevation: "800m",
    difficulty: "Moderate",
    duration: "3 hrs",
  },
];

const categories = [
  { label: "All", value: "all" },
  { label: "Mountain Biking", value: "mtb" },
  { label: "Road Cycling", value: "road" },
  { label: "Trail Running", value: "trail" },
  { label: "Hiking", value: "hiking" },
  { label: "Nature Walk", value: "nature" },
  { label: "Gravel", value: "gravel" },
];

const heroPhotos = [
  { src: "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=400&q=80", alt: "MTB Ride", label: "Kuppar Peak Loop" },
  { src: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80", alt: "Hiking", label: "Shali Tibba Summit" },
  { src: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=400&q=80", alt: "Mountains", label: "Hatu Peak Trail" },
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80", alt: "Trek", label: "Churdhar Trek" },
  { src: "https://images.unsplash.com/photo-1571188654248-7a89213915f7?w=400&q=80", alt: "Trail", label: "Jakhu Temple Walk" },
  { src: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&q=80", alt: "Running", label: "Trail Run" },
  { src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80", alt: "Vista", label: "Himalayan Vista" },
  { src: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=400&q=80", alt: "Snow", label: "Snow Peak Ride" },
  { src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80", alt: "Night", label: "Starlight Trail" },
  { src: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=400&q=80", alt: "Summit", label: "Summit Push" },
  { src: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=400&q=80", alt: "Forest", label: "Forest Loop" },
  { src: "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?w=400&q=80", alt: "Road", label: "Epic Road Climb" },
];

export default function ExperiencesPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredRoutes = activeFilter === "all"
    ? allRoutes
    : allRoutes.filter(route => route.categoryValue === activeFilter);

  return (
    <>
      <Navigation variant="solid" />

      <PhotoPileHero
        title="Experiences"
        subtitle="Every route has a story. These are the trails, climbs, and adventures I've been exploring in the Himalayas."
        photos={heroPhotos}
      />

      {/* Filter & Routes Section */}
      <section className="py-12 md:py-[var(--spacing-section)]">
        <div className="container">
          {/* Filter Pills */}
          <div className="mb-10 md:mb-12">
            <FilterPills
              categories={categories}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </div>

          {/* Routes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRoutes.map((route) => (
              <RouteCard key={route.title} {...route} />
            ))}
          </div>

          {filteredRoutes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[var(--color-slate)]">No experiences found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <CTASection />
      <Footer />
    </>
  );
}
```

**Step 2: Verify the build passes**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Visual verification**

Run: `npm run dev`
Navigate to: `http://localhost:3000/experiences`
Verify: Page matches the prototype design

**Step 4: Commit**

```bash
git add app/experiences/page.tsx
git commit -m "feat: add experiences page with photo pile hero and filter pills"
```

---

## Task 5: Experience Detail Page - Stats Dashboard Component

**Files:**
- Create: `components/ui/StatsDashboard.tsx`
- Create: `components/ui/__tests__/StatsDashboard.test.tsx`
- Modify: `components/ui/index.ts`

**Step 1: Write the test**

Create `components/ui/__tests__/StatsDashboard.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StatsDashboard from "../StatsDashboard";

const mockStats = {
  distance: "32 km",
  elevation: "1200m",
  duration: "4-5 hrs",
  difficulty: "Hard",
  difficultyLevel: 4,
  route: "Shimla → Kuppar Peak → Shimla (Loop)",
  bestSeason: "Mar-Jun, Sep-Nov",
  gear: "MTB · Full-sus recommended",
};

describe("StatsDashboard", () => {
  it("renders primary stats", () => {
    render(<StatsDashboard {...mockStats} />);
    expect(screen.getByText("32 km")).toBeInTheDocument();
    expect(screen.getByText("1200m")).toBeInTheDocument();
    expect(screen.getByText("4-5 hrs")).toBeInTheDocument();
    expect(screen.getByText("Hard")).toBeInTheDocument();
  });

  it("renders secondary stats", () => {
    render(<StatsDashboard {...mockStats} />);
    expect(screen.getByText(/Shimla → Kuppar Peak/)).toBeInTheDocument();
    expect(screen.getByText("Mar-Jun, Sep-Nov")).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test:run -- components/ui/__tests__/StatsDashboard.test.tsx`
Expected: FAIL

**Step 3: Write minimal implementation**

Create `components/ui/StatsDashboard.tsx`:

```tsx
interface StatsDashboardProps {
  distance: string;
  elevation: string;
  duration: string;
  difficulty: string;
  difficultyLevel: number; // 1-5
  route: string;
  bestSeason: string;
  gear: string;
}

// SVG Icons
const DistanceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const ElevationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <path d="M8 3l4 8 5-5 5 15H2L8 3z"/>
  </svg>
);

const DurationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2"/>
  </svg>
);

const DifficultyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
);

const RouteIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <circle cx="12" cy="10" r="3"/>
    <path d="M12 2a8 8 0 0 0-8 8c0 5.4 7 11 8 12 1-1 8-6.6 8-12a8 8 0 0 0-8-8z"/>
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <path d="M16 2v4M8 2v4M3 10h18"/>
  </svg>
);

const GearIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <circle cx="5.5" cy="17.5" r="3.5"/>
    <circle cx="18.5" cy="17.5" r="3.5"/>
    <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h3"/>
  </svg>
);

export default function StatsDashboard({
  distance,
  elevation,
  duration,
  difficulty,
  difficultyLevel,
  route,
  bestSeason,
  gear,
}: StatsDashboardProps) {
  const isHard = difficultyLevel >= 4;

  return (
    <div className="bg-white rounded-2xl shadow-lg -mt-20 relative z-10 max-w-[900px] mx-auto overflow-hidden">
      {/* Primary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[var(--color-gray-100)]">
        <div className="p-5 md:p-7 text-center border-r border-b md:border-b-0 border-[var(--color-gray-100)]">
          <div className="w-12 h-12 rounded-xl bg-[rgba(45,90,61,0.08)] text-[var(--color-forest)] flex items-center justify-center mx-auto mb-3 transition-colors hover:bg-[rgba(45,90,61,0.15)]">
            <DistanceIcon />
          </div>
          <div className="font-[family-name:var(--font-heading)] text-[28px] font-medium text-[var(--color-charcoal)] mb-1">{distance}</div>
          <div className="text-xs text-[var(--color-slate)] uppercase tracking-wider">Distance</div>
        </div>

        <div className="p-5 md:p-7 text-center border-b md:border-b-0 md:border-r border-[var(--color-gray-100)]">
          <div className="w-12 h-12 rounded-xl bg-[rgba(45,90,61,0.08)] text-[var(--color-forest)] flex items-center justify-center mx-auto mb-3 transition-colors hover:bg-[rgba(45,90,61,0.15)]">
            <ElevationIcon />
          </div>
          <div className="font-[family-name:var(--font-heading)] text-[28px] font-medium text-[var(--color-charcoal)] mb-1">{elevation}</div>
          <div className="text-xs text-[var(--color-slate)] uppercase tracking-wider">Elevation Gain</div>
        </div>

        <div className="p-5 md:p-7 text-center border-r border-[var(--color-gray-100)]">
          <div className="w-12 h-12 rounded-xl bg-[rgba(45,90,61,0.08)] text-[var(--color-forest)] flex items-center justify-center mx-auto mb-3 transition-colors hover:bg-[rgba(45,90,61,0.15)]">
            <DurationIcon />
          </div>
          <div className="font-[family-name:var(--font-heading)] text-[28px] font-medium text-[var(--color-charcoal)] mb-1">{duration}</div>
          <div className="text-xs text-[var(--color-slate)] uppercase tracking-wider">Duration</div>
        </div>

        <div className="p-5 md:p-7 text-center">
          <div className="w-12 h-12 rounded-xl bg-[rgba(45,90,61,0.08)] text-[var(--color-forest)] flex items-center justify-center mx-auto mb-3 transition-colors hover:bg-[rgba(45,90,61,0.15)]">
            <DifficultyIcon />
          </div>
          <div className="font-[family-name:var(--font-heading)] text-[28px] font-medium text-[var(--color-charcoal)] mb-1">{difficulty}</div>
          <div className="mt-2">
            <div className="flex gap-[3px] justify-center mb-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`w-4 h-1.5 rounded-sm ${
                    level <= difficultyLevel
                      ? isHard ? "bg-red-600" : "bg-[var(--color-amber)]"
                      : "bg-[var(--color-gray-200)]"
                  }`}
                />
              ))}
            </div>
            <div className="text-[11px] text-[var(--color-slate)]">{difficultyLevel} out of 5</div>
          </div>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 p-5 gap-4 bg-[var(--color-gray-50)]">
        <div className="flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-[rgba(45,90,61,0.05)]">
          <div className="w-10 h-10 rounded-[10px] bg-[rgba(45,90,61,0.08)] text-[var(--color-forest)] flex items-center justify-center flex-shrink-0">
            <RouteIcon />
          </div>
          <div>
            <div className="text-[11px] text-[var(--color-slate)] uppercase tracking-wider mb-0.5">Route</div>
            <div className="text-sm font-medium text-[var(--color-charcoal)]">{route}</div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-[rgba(45,90,61,0.05)]">
          <div className="w-10 h-10 rounded-[10px] bg-[rgba(45,90,61,0.08)] text-[var(--color-forest)] flex items-center justify-center flex-shrink-0">
            <CalendarIcon />
          </div>
          <div>
            <div className="text-[11px] text-[var(--color-slate)] uppercase tracking-wider mb-0.5">Best Season</div>
            <div className="text-sm font-medium text-[var(--color-charcoal)]">{bestSeason}</div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-[rgba(45,90,61,0.05)]">
          <div className="w-10 h-10 rounded-[10px] bg-[rgba(45,90,61,0.08)] text-[var(--color-forest)] flex items-center justify-center flex-shrink-0">
            <GearIcon />
          </div>
          <div>
            <div className="text-[11px] text-[var(--color-slate)] uppercase tracking-wider mb-0.5">Gear</div>
            <div className="text-sm font-medium text-[var(--color-charcoal)]">{gear}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Step 4: Export from index**

Add to `components/ui/index.ts`:

```ts
export { default as StatsDashboard } from "./StatsDashboard";
```

**Step 5: Run test to verify it passes**

Run: `npm run test:run -- components/ui/__tests__/StatsDashboard.test.tsx`
Expected: PASS

**Step 6: Commit**

```bash
git add components/ui/StatsDashboard.tsx components/ui/__tests__/StatsDashboard.test.tsx components/ui/index.ts
git commit -m "feat: add StatsDashboard component for experience detail page"
```

---

## Task 6: Experience Detail Page Implementation

**Files:**
- Create: `app/experience/[slug]/page.tsx`

**Step 1: Create the experience detail page**

Create `app/experience/[slug]/page.tsx`:

```tsx
import Image from "next/image";
import Link from "next/link";
import { Navigation, Footer } from "@/components/layout";
import { StatsDashboard, CTASection } from "@/components/ui";

// Sample experience data - will be replaced with real data/CMS
const experienceData = {
  "kuppar-peak-loop": {
    title: "Kuppar Peak Loop",
    category: "Mountain Biking",
    location: "Shimla District, Himachal Pradesh",
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&q=80",
    stats: {
      distance: "32 km",
      elevation: "1200m",
      duration: "4-5 hrs",
      difficulty: "Hard",
      difficultyLevel: 4,
      route: "Shimla → Kuppar Peak → Shimla (Loop)",
      bestSeason: "Mar-Jun, Sep-Nov",
      gear: "MTB · Full-sus recommended",
    },
    photos: [
      "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?w=600&q=80",
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=600&q=80",
    ],
    intro: "The Kuppar Peak loop is one of my favorite rides in the Shimla region. It has everything — steep climbs, technical descents, ridge riding, and views that make you forget you're suffering.",
    content: `I first discovered this route in 2019 while exploring unmapped trails behind Mashobra. What started as a random "let's see where this goes" turned into what I now consider the definitive Shimla MTB experience.

You start from Shimla town, climbing steadily through the forest roads toward Mashobra. The first 8 km are on tarmac — use this to warm up because things get real after that.

Once you hit the Mashobra junction, take the dirt track heading northeast. This is where the climb begins in earnest. The gradient kicks up to 12-15% in places, and the loose gravel makes traction tricky. I usually shift to my granny gear and just grind.

The ridge section from kilometer 15-22 is pure magic. You're riding along a knife-edge with valleys dropping away on both sides. On clear days, you can see all the way to the Dhauladhar range. Stop here. Take photos. Breathe it in.

The descent from Kuppar Peak is technical — loose rocks, tight switchbacks, and some exposure. Keep your weight back and let the bike do the work. If you're not comfortable with technical descents, walk the sketchy bits. No shame in that.`,
    notes: [
      { title: "Start early.", text: "I usually hit the trail by 6 AM to avoid afternoon clouds and have the forest roads to myself." },
      { title: "Carry extra water.", text: "There's no reliable water source after Mashobra until you're back in town. I carry 3 liters minimum." },
      { title: "Tire pressure matters.", text: "Drop to around 22-24 PSI for the technical sections. You'll thank me on the descent." },
    ],
    gettingThere: `The ride starts from Shimla's main market area (The Ridge). If you're staying elsewhere, I can arrange pickup or share the exact GPS coordinates for the trailhead.

**By Car:** Drive to Shimla, park near The Mall Road. The loop brings you back to the same spot.
**By Bus:** HRTC buses run frequently from Delhi/Chandigarh to Shimla ISBT. The trailhead is 2 km from the bus stand.`,
    whatToBring: [
      "MTB with good brakes (full suspension recommended)",
      "Helmet (non-negotiable)",
      "Gloves and knee pads",
      "3+ liters of water",
      "Energy bars / trail snacks",
      "Light rain jacket (weather changes fast)",
      "Basic repair kit + spare tube",
      "Sunscreen and sunglasses",
    ],
    author: {
      name: "Atul Chauhan",
      image: "https://images.unsplash.com/photo-1571188654248-7a89213915f7?w=200&q=80",
      credentials: "Elite Cyclist | Trail Runner | Licensed Guide | Engineer",
    },
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ExperienceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const experience = experienceData[slug as keyof typeof experienceData];

  if (!experience) {
    return (
      <>
        <Navigation variant="solid" />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="section-title">Experience not found</h1>
            <Link href="/experiences" className="btn-gradient mt-4">
              Back to Experiences
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation variant="solid" />

      {/* Hero Image */}
      <div
        className="relative w-full h-[70vh] min-h-[500px] bg-cover bg-center"
        style={{ backgroundImage: `url('${experience.heroImage}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-[60px] left-1/2 -translate-x-1/2 w-full max-w-[900px] px-6 z-10 text-white">
          <span className="inline-block bg-[var(--color-amber)] text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            {experience.category}
          </span>
          <h1 className="font-[family-name:var(--font-heading)] text-[clamp(2.5rem,6vw,4rem)] font-medium mb-2 leading-tight">
            {experience.title}
          </h1>
          <p className="text-lg opacity-90">{experience.location}</p>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="px-6">
        <StatsDashboard {...experience.stats} />
      </div>

      {/* Photo Gallery */}
      <div className="max-w-[900px] mx-auto my-12 px-6">
        <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr] grid-rows-[200px_200px] md:grid-rows-[200px_200px] gap-3">
          <div className="col-span-2 md:col-span-1 md:row-span-2">
            <Image
              src={experience.photos[0]}
              alt="Trail view"
              width={600}
              height={400}
              className="w-full h-full object-cover rounded-xl cursor-pointer transition-transform hover:scale-[1.02]"
            />
          </div>
          {experience.photos.slice(1).map((photo, index) => (
            <Image
              key={index}
              src={photo}
              alt={`Photo ${index + 2}`}
              width={300}
              height={200}
              className="w-full h-full object-cover rounded-xl cursor-pointer transition-transform hover:scale-[1.02]"
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[720px] mx-auto px-6 pb-16">
        <p className="text-xl font-normal text-[var(--color-charcoal)] mb-8">
          {experience.intro}
        </p>

        {experience.content.split('\n\n').map((paragraph, index) => (
          <p key={index} className="text-lg leading-relaxed text-[var(--color-slate-dark)] mb-5">
            {paragraph}
          </p>
        ))}

        {/* My Notes Callout */}
        <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl p-7 my-8 border-l-4 border-[var(--color-amber)]">
          <h3 className="font-[family-name:var(--font-heading)] text-lg mb-3 text-[var(--color-charcoal)]">My Notes</h3>
          {experience.notes.map((note, index) => (
            <p key={index} className="text-base text-[var(--color-charcoal)] mb-3 last:mb-0">
              <strong>{note.title}</strong> {note.text}
            </p>
          ))}
        </div>

        {/* Getting There */}
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-medium mt-12 mb-5 text-[var(--color-charcoal)]">
          Getting There
        </h2>
        {experience.gettingThere.split('\n\n').map((paragraph, index) => (
          <p key={index} className="text-lg leading-relaxed text-[var(--color-slate-dark)] mb-5">
            {paragraph.split('**').map((part, i) =>
              i % 2 === 1 ? <strong key={i}>{part}</strong> : part
            )}
          </p>
        ))}

        {/* What to Bring */}
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-medium mt-12 mb-5 text-[var(--color-charcoal)]">
          What to Bring
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          {experience.whatToBring.map((item, index) => (
            <li key={index} className="text-[17px] leading-relaxed text-[var(--color-slate-dark)]">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Author & CTA Section */}
      <div className="max-w-[720px] mx-auto px-6 py-12 border-t border-[var(--color-gray-200)] text-center">
        <div className="mb-8">
          <span className="text-[11px] uppercase tracking-[1.5px] text-[var(--color-forest)] font-semibold block mb-1">
            Author
          </span>
          <div className="flex items-center justify-center gap-2 mb-1">
            <Image
              src={experience.author.image}
              alt={experience.author.name}
              width={28}
              height={28}
              className="rounded-full border-2 border-[var(--color-forest)]"
            />
            <span className="font-[family-name:var(--font-heading)] text-xl text-[var(--color-charcoal)]">
              {experience.author.name}
            </span>
          </div>
          <p className="text-sm text-[var(--color-slate)]">
            {experience.author.credentials.split(' | ').map((cred, i, arr) => (
              <span key={i}>
                {cred}
                {i < arr.length - 1 && <span className="text-[var(--color-amber)] mx-1">|</span>}
              </span>
            ))}
          </p>
        </div>

        {/* CTA */}
        <div className="bg-[var(--color-gray-50)] rounded-xl p-8 text-center">
          <h3 className="font-[family-name:var(--font-heading)] text-[22px] mb-2 text-[var(--color-charcoal)]">
            Interested in this route?
          </h3>
          <p className="text-[15px] text-[var(--color-slate)] mb-5 max-w-[400px] mx-auto">
            Share your dates and fitness level — I'll help you plan the perfect adventure.
          </p>
          <Link href="/plan" className="btn-flag">
            Let's Plan Together
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
```

**Step 2: Verify the build passes**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Visual verification**

Run: `npm run dev`
Navigate to: `http://localhost:3000/experience/kuppar-peak-loop`
Verify: Page matches the prototype design

**Step 4: Commit**

```bash
git add app/experience/[slug]/page.tsx
git commit -m "feat: add experience detail page with stats dashboard and content sections"
```

---

## Task 7: Contact Page Implementation

**Files:**
- Create: `app/contact/page.tsx`

**Step 1: Create the contact page**

Create `app/contact/page.tsx`:

```tsx
import Link from "next/link";
import { Navigation, Footer } from "@/components/layout";

// Social icons
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[22px] h-[22px]">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[22px] h-[22px]">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[22px] h-[22px]">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const StravaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[22px] h-[22px]">
    <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.599h4.172L10.463 0l-7 13.828h4.169"/>
  </svg>
);

const socialLinks = [
  { name: "Instagram", href: "https://instagram.com/adventure.athlete.india", icon: InstagramIcon, hoverBg: "#E4405F" },
  { name: "Facebook", href: "https://facebook.com/adventureathleteindia", icon: FacebookIcon, hoverBg: "#1877F2" },
  { name: "YouTube", href: "https://youtube.com/@adventureathleteindia", icon: YouTubeIcon, hoverBg: "#FF0000" },
  { name: "Strava", href: "https://strava.com/athletes/adventureathleteindia", icon: StravaIcon, hoverBg: "#FC4C02" },
];

export default function ContactPage() {
  return (
    <>
      <Navigation variant="solid" />

      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <span className="section-label">Contact</span>
          <h1 className="section-title">Get in Touch</h1>
          <p className="section-text">Have questions? Want to discuss a custom adventure? I'd love to hear from you.</p>
        </div>
      </div>

      {/* Contact Content */}
      <section className="py-12 md:py-[var(--spacing-section)]">
        <div className="container max-w-4xl">
          <div className="two-col" style={{ gap: "60px", alignItems: "start" }}>
            {/* Contact Info */}
            <div>
              <div className="contact-info">
                <div>
                  <div className="contact-item-label">WhatsApp</div>
                  <div className="contact-item-value">
                    <a href="https://wa.me/919459033240">+91-9459033240</a>
                  </div>
                </div>
                <div>
                  <div className="contact-item-label">Email</div>
                  <div className="contact-item-value" style={{ fontSize: "16px" }}>
                    <a href="mailto:adventureathleteindia@gmail.com">adventureathleteindia@gmail.com</a>
                  </div>
                </div>
                <div>
                  <div className="contact-item-label">Based In</div>
                  <div style={{ fontSize: "18px" }}>Shimla, Himachal Pradesh, India</div>
                </div>
              </div>

              {/* Follow Along */}
              <div className="mt-12 pt-8 border-t border-[var(--color-gray-200)]">
                <div className="contact-item-label mb-4">Follow Along</div>
                <div className="flex gap-6">
                  {socialLinks.map((social) => (
                    <div key={social.name} className="flex flex-col items-center gap-2">
                      <span className="text-[13px] text-[var(--color-slate)]">{social.name}</span>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-[var(--color-gray-100)] flex items-center justify-center text-[var(--color-slate)] transition-all hover:scale-110"
                        style={{ "--hover-bg": social.hoverBg } as React.CSSProperties}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = social.hoverBg;
                          e.currentTarget.style.color = "white";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "";
                          e.currentTarget.style.color = "";
                        }}
                      >
                        <social.icon />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Form */}
            <div className="bg-[var(--color-gray-50)] p-8 rounded-xl">
              <h2 className="font-[family-name:var(--font-heading)] text-xl mb-6">Quick Message</h2>
              <form>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className="form-textarea" rows={4} required></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-lg text-white font-semibold transition-all hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(90deg, #F59E0B 0%, #B45309 100%)" }}
                >
                  Send Message
                </button>
              </form>
              <p className="text-[13px] text-[var(--color-slate)] mt-4 text-center whitespace-nowrap">
                For detailed tour inquiries, use the{" "}
                <Link href="/plan" className="text-[var(--color-amber)] underline">
                  Plan Your Adventure
                </Link>{" "}
                form.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
```

**Step 2: Verify the build passes**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Visual verification**

Run: `npm run dev`
Navigate to: `http://localhost:3000/contact`
Verify: Page matches the prototype design

**Step 4: Commit**

```bash
git add app/contact/page.tsx
git commit -m "feat: add contact page with info section and quick message form"
```

---

## Task 8: Plan Your Adventure Page Implementation

**Files:**
- Create: `app/plan/page.tsx`

**Step 1: Create the plan page**

Create `app/plan/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Navigation, Footer } from "@/components/layout";

const activities = [
  { label: "Cycling / MTB", value: "cycling" },
  { label: "Running / Trail", value: "running" },
  { label: "Hiking / Trekking", value: "hiking" },
  { label: "Nature Walk", value: "nature" },
  { label: "Something else", value: "other" },
];

const difficulties = [
  { value: "very-easy", title: "Very Easy", desc: "2+ hrs, minimal climb" },
  { value: "easy", title: "Easy", desc: "Half day, gentle" },
  { value: "moderate", title: "Moderate", desc: "Full day, some challenge" },
  { value: "advanced", title: "Advanced", desc: "5+ hrs, high intensity" },
];

const referralSources = [
  { value: "", label: "Select one..." },
  { value: "instagram", label: "Instagram" },
  { value: "youtube", label: "YouTube" },
  { value: "strava", label: "Strava" },
  { value: "friend", label: "Friend / Word of mouth" },
  { value: "google", label: "Google search" },
  { value: "other", label: "Other" },
];

export default function PlanPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const toggleActivity = (value: string) => {
    setSelectedActivities((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <>
      <Navigation variant="solid" />

      {/* Page Header */}
      <div className="page-header compact text-center">
        <div className="container">
          <span className="section-label">Plan Your Adventure</span>
          <h1 className="section-title">Let's Create Something Special</h1>
          <p className="section-text mx-auto text-center">
            Not sure where to start? Share your vibe — I'll craft an experience just for you.
          </p>
        </div>
      </div>

      {/* Form */}
      <section className="pt-10 pb-16">
        <div className="container max-w-3xl">
          <form>
            {/* About You Section */}
            <div className="mb-8 pb-8 border-b border-[var(--color-gray-200)]">
              <h2 className="font-[family-name:var(--font-heading)] text-xl mb-6 pb-3 border-b-2 border-[var(--color-amber)] inline-block">
                About You
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="form-group">
                  <label className="form-label">
                    Name <span className="text-red-600">*</span>
                  </label>
                  <input type="text" className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Nationality <span className="text-red-600">*</span>
                  </label>
                  <input type="text" className="form-input" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input type="email" className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    WhatsApp / Phone <span className="text-red-600">*</span>
                  </label>
                  <input type="tel" className="form-input" required />
                </div>
              </div>
            </div>

            {/* Your Adventure Section */}
            <div className="mb-8 pb-8 border-b border-[var(--color-gray-200)]">
              <h2 className="font-[family-name:var(--font-heading)] text-xl mb-6 pb-3 border-b-2 border-[var(--color-amber)] inline-block">
                Your Adventure
              </h2>

              {/* Activities */}
              <div className="form-group">
                <label className="form-label">
                  What interests you? <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {activities.map((activity) => (
                    <label key={activity.value} className="form-check">
                      <input
                        type="checkbox"
                        checked={selectedActivities.includes(activity.value)}
                        onChange={() => toggleActivity(activity.value)}
                      />
                      <span>{activity.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div className="form-group">
                <label className="form-label">
                  Preferred difficulty <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {difficulties.map((diff) => (
                    <label
                      key={diff.value}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedDifficulty === diff.value
                          ? "border-[var(--color-forest)] bg-[var(--color-gray-50)]"
                          : "border-[var(--color-gray-200)] hover:border-[var(--color-forest)]"
                      }`}
                      onClick={() => setSelectedDifficulty(diff.value)}
                    >
                      <input
                        type="radio"
                        name="difficulty"
                        value={diff.value}
                        checked={selectedDifficulty === diff.value}
                        onChange={() => setSelectedDifficulty(diff.value)}
                        className="hidden"
                      />
                      <div className={selectedDifficulty === diff.value ? "text-[var(--color-forest)]" : ""}>
                        <div className="font-semibold mb-1">{diff.title}</div>
                        <div className="text-[13px] text-[var(--color-slate)] whitespace-nowrap">{diff.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* People & Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">
                    Number of people <span className="text-red-600">*</span>
                  </label>
                  <input type="number" className="form-input" min="1" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Preferred dates</label>
                  <input type="text" className="form-input" placeholder="e.g., March 15-20, 2026" />
                </div>
              </div>
            </div>

            {/* Tell Me More Section */}
            <div className="mb-8 pb-8 border-b border-[var(--color-gray-200)]">
              <h2 className="font-[family-name:var(--font-heading)] text-xl mb-6 pb-3 border-b-2 border-[var(--color-amber)] inline-block">
                Tell Me More
              </h2>

              <div className="form-group">
                <label className="form-label">
                  What's your ideal adventure? <span className="text-red-600">*</span>
                </label>
                <textarea
                  className="form-textarea"
                  rows={5}
                  placeholder="Share your fitness level, what you're hoping for, any concerns..."
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label className="form-label">How did you hear about me?</label>
                <select className="form-select">
                  {referralSources.map((source) => (
                    <option key={source.value} value={source.value}>
                      {source.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Consent */}
            <div className="form-group mb-8">
              <label className="form-check">
                <input type="checkbox" required />
                <span className="text-sm text-[var(--color-slate)]">
                  I agree to share my information with Adventure Athlete India for the purpose of planning my adventure.
                  View our{" "}
                  <Link href="/privacy" className="text-[var(--color-amber)] underline">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary w-full py-[18px]">
              Send Inquiry
            </button>

            <p className="text-center text-[var(--color-slate)] text-sm mt-4">
              I'll get back to you within 24-48 hours.
            </p>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
```

**Step 2: Verify the build passes**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Visual verification**

Run: `npm run dev`
Navigate to: `http://localhost:3000/plan`
Verify: Page matches the prototype design

**Step 4: Commit**

```bash
git add app/plan/page.tsx
git commit -m "feat: add plan your adventure page with multi-section form"
```

---

## Task 9: About Page - Profile Dashboard Component

**Files:**
- Create: `components/ui/ProfileDashboard.tsx`
- Create: `components/ui/__tests__/ProfileDashboard.test.tsx`
- Modify: `components/ui/index.ts`

**Step 1: Write the test**

Create `components/ui/__tests__/ProfileDashboard.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProfileDashboard from "../ProfileDashboard";

const mockData = {
  primaryStats: [
    { label: "ITRA Score", value: "555" },
    { label: "FTP Power", value: "290W" },
  ],
  secondaryStats: [
    { label: "Guide License", value: "HP Tourism", subtext: "Reg: 080724 42383" },
  ],
};

describe("ProfileDashboard", () => {
  it("renders primary stats", () => {
    render(<ProfileDashboard {...mockData} />);
    expect(screen.getByText("555")).toBeInTheDocument();
    expect(screen.getByText("ITRA Score")).toBeInTheDocument();
  });

  it("renders secondary stats", () => {
    render(<ProfileDashboard {...mockData} />);
    expect(screen.getByText("HP Tourism")).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test:run -- components/ui/__tests__/ProfileDashboard.test.tsx`
Expected: FAIL

**Step 3: Write minimal implementation**

Create `components/ui/ProfileDashboard.tsx`:

```tsx
interface PrimaryStat {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface SecondaryStat {
  label: string;
  value: string;
  subtext?: string;
  icon?: React.ReactNode;
}

interface ProfileDashboardProps {
  primaryStats: PrimaryStat[];
  secondaryStats: SecondaryStat[];
}

// Default icons
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const BoltIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
);

const ArrowUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <path d="M12 19V5M5 12l7-7 7 7"/>
  </svg>
);

const ListIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const defaultPrimaryIcons = [ShieldIcon, BoltIcon, ArrowUpIcon, ListIcon];
const defaultSecondaryIcons = [CalendarIcon, CalendarIcon, CalendarIcon, CalendarIcon];

export default function ProfileDashboard({ primaryStats, secondaryStats }: ProfileDashboardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg max-w-[1000px] mx-auto overflow-hidden mt-[60px]">
      {/* Primary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[var(--color-gray-100)]">
        {primaryStats.map((stat, index) => {
          const Icon = defaultPrimaryIcons[index % defaultPrimaryIcons.length];
          return (
            <div
              key={stat.label}
              className={`p-5 md:p-7 text-center transition-colors hover:bg-[var(--color-gray-50)] ${
                index < primaryStats.length - 1 ? "border-r border-[var(--color-gray-100)]" : ""
              } ${index < 2 ? "border-b md:border-b-0 border-[var(--color-gray-100)]" : ""}`}
            >
              <div className="w-12 h-12 rounded-xl bg-[rgba(45,90,61,0.08)] text-[var(--color-forest)] flex items-center justify-center mx-auto mb-3 transition-colors group-hover:bg-[rgba(45,90,61,0.15)]">
                {stat.icon || <Icon />}
              </div>
              <div className="font-[family-name:var(--font-heading)] text-[28px] font-medium text-[var(--color-charcoal)] mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-[var(--color-slate)] uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 p-5 gap-4 bg-[var(--color-gray-50)]">
        {secondaryStats.map((stat, index) => {
          const Icon = defaultSecondaryIcons[index % defaultSecondaryIcons.length];
          return (
            <div
              key={stat.label}
              className="flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-[rgba(45,90,61,0.05)]"
            >
              <div className="w-10 h-10 rounded-[10px] bg-[rgba(45,90,61,0.08)] text-[var(--color-forest)] flex items-center justify-center flex-shrink-0">
                {stat.icon || <Icon />}
              </div>
              <div>
                <div className="text-[11px] text-[var(--color-slate)] uppercase tracking-wider mb-0.5">
                  {stat.label}
                </div>
                <div className="text-sm font-medium text-[var(--color-charcoal)] leading-snug">
                  {stat.value}
                  {stat.subtext && (
                    <small className="block font-normal text-[var(--color-slate)] text-xs">
                      {stat.subtext}
                    </small>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

**Step 4: Export from index**

Add to `components/ui/index.ts`:

```ts
export { default as ProfileDashboard } from "./ProfileDashboard";
```

**Step 5: Run test to verify it passes**

Run: `npm run test:run -- components/ui/__tests__/ProfileDashboard.test.tsx`
Expected: PASS

**Step 6: Commit**

```bash
git add components/ui/ProfileDashboard.tsx components/ui/__tests__/ProfileDashboard.test.tsx components/ui/index.ts
git commit -m "feat: add ProfileDashboard component for about page"
```

---

## Task 10: About Page Implementation

**Files:**
- Create: `app/about/page.tsx`

**Step 1: Create the about page**

Create `app/about/page.tsx`:

```tsx
import Image from "next/image";
import Link from "next/link";
import { Navigation, Footer } from "@/components/layout";
import { ProfileDashboard, CTASection } from "@/components/ui";

// Social Icons
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const StravaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.599h4.172L10.463 0l-7 13.828h4.169"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const RunnerIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7"/>
  </svg>
);

const socialLinks = [
  { href: "https://instagram.com/adventure.athlete.india", icon: InstagramIcon, hoverBg: "#E4405F" },
  { href: "https://youtube.com/@adventureathleteindia", icon: YouTubeIcon, hoverBg: "#FF0000" },
  { href: "https://strava.com/athletes/atulchauhan", icon: StravaIcon, hoverBg: "#FC4C02" },
  { href: "https://facebook.com/adventureathleteindia", icon: FacebookIcon, hoverBg: "#1877F2" },
  { href: "https://itra.run/RunnerSpace/Atul.Chauhan", icon: RunnerIcon, hoverBg: "var(--color-forest)" },
];

const journey = [
  { year: "The Dream", text: "Wanted to race motorsports. Couldn't afford it. Found bikes instead." },
  { year: "2015 - The Accident", text: "4 months bed rest. Doctor said I'd never run again. I had other plans." },
  { year: "2016 - The Comeback", text: "Started cycling against family's wishes. Dad gifted my first bike anyway. One month later — 22nd overall at Hero MTB Himalaya." },
  { year: "2017-2021", text: "5 National Championships. Multiple podiums. First MTB summits no one had done before." },
  { year: "Now", text: "Less racing, more exploring. Meeting riders from around the world. Showing them my Himalayas." },
];

const summits = [
  { name: "Chandernahan Lake", altitude: "4,000m", desc: "First MTB to the sacred lake, 2019", image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=500&q=80" },
  { name: "Nochi Top", altitude: "3,500m", desc: "First MTB ascent, Winter 2020", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&q=80" },
  { name: "Kuppar Peak", altitude: "3,350m", desc: "First MTB summit from Shimla side", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&q=80" },
];

const profileStats = {
  primaryStats: [
    { label: "ITRA Score", value: "555" },
    { label: "FTP Power", value: "290W" },
    { label: "VK PR", value: "54 min" },
    { label: "National Champ", value: "5x" },
  ],
  secondaryStats: [
    { label: "Guide License", value: "HP Tourism", subtext: "Reg: 080724 42383" },
    { label: "Strava Stats", value: "Cycling 30,000+ kms\nRunning 3,000+ kms" },
    { label: "Education", value: "MBA - HPU\nB.Tech Honors - LPU" },
    { label: "Career", value: "Business Analyst", subtext: "Tech funds the adventures" },
  ],
};

export default function AboutPage() {
  return (
    <>
      <Navigation variant="solid" />

      {/* Hero Section */}
      <section className="pt-[120px] pb-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1571188654248-7a89213915f7?w=800&q=80"
                alt="Atul Chauhan"
                width={500}
                height={600}
                className="w-full rounded-xl shadow-2xl"
              />
              <div className="absolute -bottom-5 -right-5 w-[80%] h-[80%] border-[3px] border-[var(--color-amber)] rounded-xl -z-10" />
            </div>

            {/* Intro */}
            <div>
              <span className="section-label">About</span>
              <h1 className="font-[family-name:var(--font-heading)] text-[clamp(2.5rem,5vw,3.5rem)] leading-tight mb-6">
                I'm Atul.<br />I ride, I run, I explore.
              </h1>
              <p className="text-xl font-light leading-relaxed text-[var(--color-slate-dark)] mb-8">
                Based in Shimla, I've spent a decade discovering trails that most maps don't show. These mountains are my home, my training ground, and my passion.
              </p>
              <p className="text-xl font-light leading-relaxed text-[var(--color-slate-dark)] mb-8">
                Adventure Athlete India isn't a tour company - it's me sharing the Himalayas I know and love.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full bg-[var(--color-gray-100)] flex items-center justify-center text-[var(--color-slate)] transition-all hover:scale-110"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = social.hoverBg;
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "";
                      e.currentTarget.style.color = "";
                    }}
                  >
                    <social.icon />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Dashboard */}
          <ProfileDashboard {...profileStats} />
        </div>
      </section>

      {/* The Journey */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Journey Timeline */}
            <div className="max-w-[700px]">
              <span className="section-label">The Journey</span>
              <h2 className="section-title mt-2">How I Got Here</h2>

              <div className="mt-10">
                {journey.map((item, index) => (
                  <div key={index} className="mb-10 pl-6 border-l-2 border-[var(--color-gray-200)] relative">
                    <div className="absolute left-[-5px] top-2 w-2 h-2 bg-[var(--color-amber)] rounded-full" />
                    <div className="text-[13px] font-semibold text-[var(--color-amber)] uppercase tracking-wider mb-2">
                      {item.year}
                    </div>
                    <p className="text-[17px] leading-relaxed text-[var(--color-slate-dark)]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* First Ascents */}
            <div>
              <span className="section-label">First Ascents</span>
              <h2 className="section-title mt-2">Peaks No One Had Biked</h2>
              <p className="section-text mb-8">Summits I've taken a mountain bike to that no one else had before.</p>

              <div className="space-y-5">
                {summits.map((summit) => (
                  <div key={summit.name} className="bg-white rounded-xl overflow-hidden shadow-lg">
                    <div className="relative h-[180px]">
                      <Image
                        src={summit.image}
                        alt={summit.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute bottom-3 right-3 font-[family-name:var(--font-heading)] text-2xl text-white bg-black/60 px-3 py-1.5 rounded backdrop-blur-sm">
                        {summit.altitude}
                      </span>
                    </div>
                    <div className="p-5">
                      <h4 className="font-[family-name:var(--font-heading)] text-lg mb-1">{summit.name}</h4>
                      <p className="text-sm text-[var(--color-slate)]">{summit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-20 bg-[var(--color-gray-50)]">
        <div className="container">
          <div className="max-w-[800px] mx-auto p-[60px] bg-[var(--color-gray-100)] rounded-2xl text-center">
            <blockquote className="text-2xl font-light leading-relaxed text-[var(--color-slate-dark)] mb-6">
              "When you ride or run with me, you're not getting a tour guide. You're getting a training partner who happens to know every trail, every chai stop, and every shortcut in these hills."
            </blockquote>
            <cite className="text-sm text-[var(--color-slate)]">- Atul</cite>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </>
  );
}
```

**Step 2: Verify the build passes**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Visual verification**

Run: `npm run dev`
Navigate to: `http://localhost:3000/about`
Verify: Page matches the prototype design

**Step 4: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat: add about page with profile dashboard, journey timeline, and first ascents"
```

---

## Task 11: Legal Pages (FAQ, Terms, Privacy, Safety, Cancellation)

**Files:**
- Create: `app/faq/page.tsx`
- Create: `app/terms/page.tsx`
- Create: `app/privacy/page.tsx`
- Create: `app/safety/page.tsx`
- Create: `app/cancellation/page.tsx`

**Step 1: Create a reusable legal page template component**

Add to `app/globals.css` after existing styles:

```css
/* ===========================================
   Legal Page Styles
   =========================================== */

.legal-content {
  max-width: 720px;
  margin: 0 auto;
}

.legal-content h2 {
  font-family: var(--font-heading);
  font-size: 24px;
  font-weight: 500;
  margin: 48px 0 20px;
  color: var(--color-charcoal);
}

.legal-content h3 {
  font-family: var(--font-heading);
  font-size: 18px;
  font-weight: 500;
  margin: 32px 0 12px;
  color: var(--color-charcoal);
}

.legal-content p {
  font-size: 16px;
  line-height: 1.8;
  color: var(--color-slate-dark);
  margin-bottom: 16px;
}

.legal-content ul,
.legal-content ol {
  margin: 16px 0;
  padding-left: 24px;
}

.legal-content li {
  font-size: 16px;
  line-height: 1.7;
  color: var(--color-slate-dark);
  margin-bottom: 8px;
}

.legal-content a {
  color: var(--color-amber);
  text-decoration: underline;
}

/* FAQ Accordion */
.faq-item {
  border-bottom: 1px solid var(--color-gray-200);
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  cursor: pointer;
  font-size: 17px;
  font-weight: 500;
  color: var(--color-charcoal);
  transition: color 0.2s;
}

.faq-question:hover {
  color: var(--color-forest);
}

.faq-answer {
  padding-bottom: 20px;
  font-size: 15px;
  line-height: 1.7;
  color: var(--color-slate-dark);
}
```

**Step 2: Create FAQ Page**

Create `app/faq/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Navigation, Footer } from "@/components/layout";

const faqs = [
  {
    question: "What fitness level do I need?",
    answer: "I offer experiences for all fitness levels. During our planning conversation, I'll understand your current fitness and design an adventure that challenges you appropriately without being overwhelming. If you can walk for 2+ hours comfortably, there's something for you.",
  },
  {
    question: "Do you provide equipment?",
    answer: "I can arrange bike rentals (MTB, road, gravel) through local partners. For hiking and trail running, you'll need your own footwear and gear. I'll send you a detailed packing list based on your chosen adventure.",
  },
  {
    question: "What's included in the price?",
    answer: "Typically: guide services, route planning, local transport coordination, and emergency support. Food, accommodation, and equipment rental are usually additional. Each adventure is custom-priced based on duration and complexity.",
  },
  {
    question: "How far in advance should I book?",
    answer: "Ideally 2-4 weeks for most experiences. For peak season (March-June, September-November) or multi-day adventures, 4-6 weeks is better. Last-minute bookings may be possible depending on availability.",
  },
  {
    question: "What happens if weather is bad?",
    answer: "Weather in the Himalayas can be unpredictable. I monitor conditions closely and will reschedule or modify routes if needed for safety. We'll discuss backup options during planning. No ride is worth risking safety.",
  },
  {
    question: "Do you offer multi-day trips?",
    answer: "Yes! Multi-day adventures are some of my favorites. These typically include accommodation arrangements, luggage transport, and a more immersive experience of the region.",
  },
  {
    question: "Can I bring my own bike?",
    answer: "Absolutely! If you're flying in, I can advise on bike shipping and assembly. Many cyclists bring their own bikes for longer trips. I'll help coordinate logistics.",
  },
  {
    question: "What about insurance?",
    answer: "I recommend all guests have travel insurance that covers adventure activities. This is not included in my services. I'm a licensed guide with HP Tourism, but personal insurance is your responsibility.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <Navigation variant="solid" />

      <div className="page-header">
        <div className="container">
          <span className="section-label">FAQ</span>
          <h1 className="section-title">Frequently Asked Questions</h1>
          <p className="section-text">Common questions about adventures with me.</p>
        </div>
      </div>

      <section className="py-12 md:py-[var(--spacing-section)]">
        <div className="container max-w-3xl">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className="faq-question w-full text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span>{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-[var(--color-slate)] transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="faq-answer">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
```

**Step 3: Create Terms Page**

Create `app/terms/page.tsx`:

```tsx
import { Navigation, Footer } from "@/components/layout";

export default function TermsPage() {
  return (
    <>
      <Navigation variant="solid" />

      <div className="page-header">
        <div className="container">
          <span className="section-label">Legal</span>
          <h1 className="section-title">Terms of Service</h1>
          <p className="section-text">Last updated: January 2026</p>
        </div>
      </div>

      <section className="py-12 md:py-[var(--spacing-section)]">
        <div className="container legal-content">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By booking an experience with Adventure Athlete India, you agree to these terms of service.
            Please read them carefully before making a booking.
          </p>

          <h2>2. Services</h2>
          <p>
            Adventure Athlete India provides guided outdoor experiences including but not limited to:
            mountain biking, road cycling, trail running, hiking, and nature walks in the Himachal Pradesh region.
          </p>

          <h2>3. Booking and Payment</h2>
          <ul>
            <li>All bookings require a 30% advance payment to confirm</li>
            <li>Balance payment is due 7 days before the experience date</li>
            <li>Payments can be made via bank transfer or UPI</li>
          </ul>

          <h2>4. Assumption of Risk</h2>
          <p>
            Outdoor activities carry inherent risks. By participating, you acknowledge and accept these risks.
            You are responsible for ensuring you are physically fit for the chosen activity.
          </p>

          <h2>5. Guide's Authority</h2>
          <p>
            The guide has final authority on all safety-related decisions during the experience.
            This includes the right to modify routes or cancel activities due to weather, trail conditions, or participant safety concerns.
          </p>

          <h2>6. Participant Responsibilities</h2>
          <ul>
            <li>Provide accurate information about fitness level and health conditions</li>
            <li>Follow guide instructions at all times</li>
            <li>Carry personal identification and emergency contact information</li>
            <li>Have appropriate travel/adventure insurance</li>
          </ul>

          <h2>7. Liability Limitation</h2>
          <p>
            Adventure Athlete India's liability is limited to the service fee paid.
            We are not liable for injuries, loss, or damage arising from participant negligence or failure to follow instructions.
          </p>

          <h2>8. Contact</h2>
          <p>
            For questions about these terms, contact us at{" "}
            <a href="mailto:adventureathleteindia@gmail.com">adventureathleteindia@gmail.com</a>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
```

**Step 4: Create Privacy Page**

Create `app/privacy/page.tsx`:

```tsx
import { Navigation, Footer } from "@/components/layout";

export default function PrivacyPage() {
  return (
    <>
      <Navigation variant="solid" />

      <div className="page-header">
        <div className="container">
          <span className="section-label">Legal</span>
          <h1 className="section-title">Privacy Policy</h1>
          <p className="section-text">Last updated: January 2026</p>
        </div>
      </div>

      <section className="py-12 md:py-[var(--spacing-section)]">
        <div className="container legal-content">
          <h2>Information We Collect</h2>
          <p>When you inquire about or book an experience, we collect:</p>
          <ul>
            <li>Name and contact information (email, phone, WhatsApp)</li>
            <li>Nationality and travel details</li>
            <li>Fitness level and health information relevant to the activity</li>
            <li>Payment information for booking purposes</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <ul>
            <li>To plan and customize your adventure</li>
            <li>To communicate about your booking</li>
            <li>For emergency contact purposes during activities</li>
            <li>To improve our services</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>
            We do not sell your personal information. We may share information with:
          </p>
          <ul>
            <li>Local service providers (accommodation, transport) as needed for your booking</li>
            <li>Emergency services if required</li>
            <li>Legal authorities if required by law</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We take reasonable measures to protect your personal information.
            However, no internet transmission is 100% secure.
          </p>

          <h2>Your Rights</h2>
          <p>You can request to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Correct inaccurate information</li>
            <li>Delete your information (subject to legal requirements)</li>
          </ul>

          <h2>Contact</h2>
          <p>
            For privacy-related questions, contact us at{" "}
            <a href="mailto:adventureathleteindia@gmail.com">adventureathleteindia@gmail.com</a>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
```

**Step 5: Create Safety Page**

Create `app/safety/page.tsx`:

```tsx
import { Navigation, Footer } from "@/components/layout";

export default function SafetyPage() {
  return (
    <>
      <Navigation variant="solid" />

      <div className="page-header">
        <div className="container">
          <span className="section-label">Safety</span>
          <h1 className="section-title">Safety First</h1>
          <p className="section-text">Your safety is my top priority on every adventure.</p>
        </div>
      </div>

      <section className="py-12 md:py-[var(--spacing-section)]">
        <div className="container legal-content">
          <h2>Guide Qualifications</h2>
          <p>I am a licensed guide registered with HP Tourism (Reg: 080724 42383) with:</p>
          <ul>
            <li>10+ years of experience in the Himalayas</li>
            <li>First Aid and CPR certification</li>
            <li>Extensive knowledge of local terrain and weather patterns</li>
            <li>Emergency response training</li>
          </ul>

          <h2>Pre-Trip Assessment</h2>
          <p>Before every adventure:</p>
          <ul>
            <li>I assess your fitness level and experience</li>
            <li>We discuss any health conditions or concerns</li>
            <li>Routes are planned based on your abilities</li>
            <li>Weather conditions are monitored</li>
          </ul>

          <h2>During the Adventure</h2>
          <ul>
            <li>I carry a first aid kit on all trips</li>
            <li>Communication devices for emergency contact</li>
            <li>GPS tracking for remote areas</li>
            <li>Regular check-ins on your condition</li>
            <li>Flexible pacing based on your needs</li>
          </ul>

          <h2>Emergency Protocols</h2>
          <p>In case of emergency:</p>
          <ul>
            <li>Direct access to local emergency services</li>
            <li>Knowledge of nearest medical facilities</li>
            <li>Emergency evacuation routes planned for each area</li>
            <li>Contact with your emergency contacts</li>
          </ul>

          <h2>Your Responsibilities</h2>
          <ul>
            <li>Be honest about your fitness and health</li>
            <li>Follow my instructions during activities</li>
            <li>Speak up if you feel unwell or uncomfortable</li>
            <li>Carry personal identification and insurance details</li>
            <li>Use provided safety equipment</li>
          </ul>

          <h2>Insurance Requirement</h2>
          <p>
            I strongly recommend (and for some activities, require) that you have travel insurance
            that covers adventure activities. This should include medical evacuation coverage for
            remote areas.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
```

**Step 6: Create Cancellation Page**

Create `app/cancellation/page.tsx`:

```tsx
import { Navigation, Footer } from "@/components/layout";

export default function CancellationPage() {
  return (
    <>
      <Navigation variant="solid" />

      <div className="page-header">
        <div className="container">
          <span className="section-label">Policy</span>
          <h1 className="section-title">Cancellation Policy</h1>
          <p className="section-text">Fair and transparent cancellation terms.</p>
        </div>
      </div>

      <section className="py-12 md:py-[var(--spacing-section)]">
        <div className="container legal-content">
          <h2>Cancellation by You</h2>

          <h3>More than 14 days before</h3>
          <p>Full refund minus processing fees (approximately 5%)</p>

          <h3>7-14 days before</h3>
          <p>50% refund of the total amount</p>

          <h3>Less than 7 days before</h3>
          <p>No refund, but you can reschedule to another date within 6 months (subject to availability)</p>

          <h2>Cancellation by Me</h2>
          <p>
            If I need to cancel due to weather, safety concerns, or personal emergency:
          </p>
          <ul>
            <li>Full refund of all payments</li>
            <li>Priority rebooking for another date</li>
          </ul>

          <h2>Weather Cancellations</h2>
          <p>
            Mountain weather can be unpredictable. If conditions are unsafe:
          </p>
          <ul>
            <li>I will offer an alternative route/activity if possible</li>
            <li>If no alternative is viable, we'll reschedule</li>
            <li>If rescheduling isn't possible, full refund applies</li>
          </ul>

          <h2>No-Shows</h2>
          <p>
            If you don't show up without prior notice, no refund will be provided.
          </p>

          <h2>Modifications</h2>
          <p>
            Want to change your booking? Contact me at least 48 hours in advance:
          </p>
          <ul>
            <li>Date changes: Subject to availability, no extra charge</li>
            <li>Activity changes: May affect pricing</li>
            <li>Group size changes: Notify as soon as possible</li>
          </ul>

          <h2>How to Cancel</h2>
          <p>
            To cancel or modify your booking, contact me via:
          </p>
          <ul>
            <li>WhatsApp: +91-9459033240</li>
            <li>Email: adventureathleteindia@gmail.com</li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}
```

**Step 7: Verify the build passes**

Run: `npm run build`
Expected: Build succeeds with all legal pages

**Step 8: Commit**

```bash
git add app/globals.css app/faq/page.tsx app/terms/page.tsx app/privacy/page.tsx app/safety/page.tsx app/cancellation/page.tsx
git commit -m "feat: add legal pages - FAQ, Terms, Privacy, Safety, Cancellation"
```

---

## Task 12: Final Verification and Cleanup

**Step 1: Run all tests**

Run: `npm run test:run`
Expected: All tests pass

**Step 2: Run build**

Run: `npm run build`
Expected: Build succeeds with no errors

**Step 3: Run lint**

Run: `npm run lint`
Expected: No lint errors

**Step 4: Visual verification of all pages**

Run: `npm run dev`

Check each page:
- [ ] / (Home) - existing, verify still works
- [ ] /experiences - new page
- [ ] /experience/kuppar-peak-loop - new page
- [ ] /about - new page
- [ ] /plan - new page
- [ ] /contact - new page
- [ ] /faq - new page
- [ ] /terms - new page
- [ ] /privacy - new page
- [ ] /safety - new page
- [ ] /cancellation - new page

Verify mobile responsiveness on all pages.

**Step 5: Final commit**

```bash
git add .
git commit -m "chore: complete all remaining pages implementation"
```

---

## Summary

This plan implements 11 pages total:
1. **Experiences** - Photo pile hero, filter pills, route cards grid
2. **Experience Detail** - Stats dashboard, photo gallery, content sections
3. **About** - Profile dashboard, journey timeline, first ascents
4. **Plan** - Multi-section inquiry form
5. **Contact** - Contact info, social links, quick message form
6. **FAQ** - Accordion-style FAQ
7. **Terms** - Legal content
8. **Privacy** - Privacy policy
9. **Safety** - Safety information
10. **Cancellation** - Cancellation policy

New reusable components created:
- FilterPills
- PhotoPileHero
- StatsDashboard
- ProfileDashboard

All implementations follow the HTML prototypes exactly, use TDD where applicable, and include mobile-responsive design.
