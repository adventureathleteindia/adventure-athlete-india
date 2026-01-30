# Adventure Athlete India - Business Requirements Document (BRD)

**Version:** 1.0
**Date:** 2026-01-08
**Status:** Phase 1 - In Development
**Author:** Auto-generated from project documentation

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Design System](#3-design-system)
4. [Page Inventory](#4-page-inventory)
5. [Component Inventory](#5-component-inventory)
6. [Route/Experience Intake Process](#6-routeexperience-intake-process)
7. [Content Status](#7-content-status)
8. [Features Built vs Pending](#8-features-built-vs-pending)
9. [Development Rules](#9-development-rules)
10. [Form Integration](#10-form-integration)
11. [Deployment & Infrastructure](#11-deployment--infrastructure)
12. [File Structure](#12-file-structure)
13. [QA Checklist](#13-qa-checklist)
14. [Future Roadmap](#14-future-roadmap)

---

## 1. Project Overview

### 1.1 Purpose

Adventure Athlete India is a **personal adventure journal website** for Atul Chauhan — an elite cyclist, trail runner, and licensed Himalayan tour guide based in Shimla, India.

### 1.2 What This Site IS

| Aspect | Description |
|--------|-------------|
| **Routes Library** | A personal blog documenting real adventures |
| **Adventure Journal** | Flowing narrative, personal voice |
| **Inquiry System** | Contact forms for custom tour planning |
| **Portfolio** | Showcase of athlete credentials and achievements |

### 1.3 What This Site is NOT

- **NOT** a tour booking system
- **NOT** a commercial tour operator website
- **NOT** pre-planned itineraries with pricing
- **NOT** an e-commerce platform

### 1.4 Target Audience

- Adventure enthusiasts looking for Himalayan experiences
- Cyclists, trail runners, hikers seeking guided tours
- Corporate groups interested in wellness retreats
- International travelers wanting authentic local experiences

### 1.5 Brand Identity

**Tagline:** Experience the raw Himalayas.

**Brand Personality:** Warm, authentic, and athletic. An elite competitor who guides like a friend.

**Voice Characteristics:**
- Personal and direct (like telling a friend)
- Honest about challenges
- Specific with local knowledge
- Conversational, not commercial

---

## 2. Tech Stack

### 2.1 Core Technologies

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Framework | Next.js | 16.1.1 | App Router, SSG, API routes |
| UI Library | React | 19.2.3 | Component-based UI |
| Language | TypeScript | 5.x | Type-safe development |
| Styling | Tailwind CSS | 4.x | Utility-first CSS |
| Testing | Vitest | 4.0.16 | Unit testing |
| Build Tool | Turbopack | (bundled) | Fast builds |

### 2.2 Hosting & Deployment

| Service | Purpose | Tier |
|---------|---------|------|
| **Vercel** | Hosting, CDN, auto-deploy | Free (100GB/month) |
| **GitHub** | Version control | Free |
| **Formspree** | Form submissions | Free (50/month) |

### 2.3 External Services

| Service | Purpose | Status |
|---------|---------|--------|
| Google Fonts | Oswald, Source Sans 3 | Active |
| Unsplash | Placeholder images | Active (temp) |
| YouTube | Video embeds | Ready |
| Strava | Activity embeds | Ready |

### 2.4 Future Technologies (Phase 2+)

| Feature | Technology | Trigger |
|---------|------------|---------|
| Payments | Razorpay | When accepting paid tours |
| Database | Supabase | User data, bookings |
| Email | Resend | Transactional emails |
| Auth | NextAuth.js | If user accounts needed |

---

## 3. Design System

### 3.1 Color Palette

| Role | Color | Hex | CSS Variable | Usage |
|------|-------|-----|--------------|-------|
| Primary | Forest Green | `#2D5A3D` | `--color-forest` | Nav, footer, key sections |
| Accent | Amber | `#D97706` | `--color-amber` | CTAs, buttons, highlights |
| Text | Dark | `#1A202C` | `--color-dark` | Primary body text |
| Muted | Slate | `#64748b` | `--color-slate` | Secondary text, meta |
| Background | White | `#FFFFFF` | - | Page backgrounds |
| Light Gray | Gray-50 | `#F9FAFB` | `--color-gray-50` | Callout boxes |
| Border | Gray-200 | `#E5E7EB` | `--color-gray-200` | Borders |

### 3.2 Typography

| Element | Font | Size | Weight | Style |
|---------|------|------|--------|-------|
| Hero H1 | Oswald | 48-80px (clamp) | 400 | Uppercase, 2px letter-spacing |
| Section Title | Oswald | 32-48px | 400 | Normal case |
| Section Label | Source Sans 3 | 12px | 600 | Uppercase, 3px letter-spacing, amber |
| Body | Source Sans 3 | 18px | 300-400 | 1.7-1.8 line-height |
| Meta/Caption | Source Sans 3 | 14px | 400 | Muted color |

### 3.3 Spacing

| Property | Value |
|----------|-------|
| Section padding | 70px vertical |
| Page header padding | 80px vertical |
| Content max-width | 1400px |
| Grid gap | 32px |
| Element spacing | 16-24px |

### 3.4 Button Styles

| Type | Background | Text | Padding | Usage |
|------|------------|------|---------|-------|
| Primary (`btn-primary`) | Amber gradient | White | 14px 32px | Main CTAs |
| Flag (`btn-flag`) | Amber + shimmer | White | 12px 24px | Nav CTA |
| Outline | Transparent | Dark | 14px 32px | Secondary actions |

### 3.5 Card Styles

- No borders or shadows
- Image with subtle hover zoom (1.03x)
- Clean typography below
- Category label in amber
- SVG icon metadata

---

## 4. Page Inventory

### 4.1 All Pages

| # | Page | Route | Prototype | Status |
|---|------|-------|-----------|--------|
| 01 | Home | `/` | `01-home.html` | Built |
| 02 | Experiences | `/experiences` | `02-experiences.html` | Built |
| 03 | Experience Detail | `/experience/[slug]` | `03-experience-detail.html` | Built |
| 04 | About | `/about` | `04-about.html` | Built |
| 06 | Why AAI | `/why-aai` | `06-why-aai.html` | Built |
| 07 | Contact | `/contact` | `07-contact.html` | Built |
| 08 | Plan Your Adventure | `/plan` | `08-plan.html` | Built |
| 09 | FAQ | `/faq` | `09-faq.html` | Built |
| 10 | Terms | `/terms` | `10-terms.html` | Built |
| 11 | Privacy | `/privacy` | `11-privacy.html` | Built |
| 12 | Safety | `/safety` | `12-safety.html` | Built |
| 13 | Cancellation | `/cancellation` | `13-cancellation.html` | Built |

### 4.2 Page Details

#### Home Page (`/`)
- Hero with tagline and CTA
- Featured routes carousel (3 cards)
- Why Adventure Athlete India section
- Category carousel (6 categories)
- CTA section
- Footer

#### Experiences Page (`/experiences`)
- Photo pile hero (scattered collage)
- Category filter pills
- Difficulty/Duration dropdowns
- Route cards grid (6 initial + 3 more)
- Load More button
- CTA section

#### Experience Detail Page (`/experience/[slug]`)
- Full-width hero image
- Stats dashboard (distance, elevation, duration, difficulty, route, season, gear)
- Photo gallery (masonry-style)
- Flowing description content
- Audio player (Trail Notes)
- Video player (YouTube embed)
- Strava embed
- My Notes callout box
- Getting There section
- What to Bring list
- Author section with CTA

---

## 5. Component Inventory

### 5.1 Layout Components

| Component | File | Purpose |
|-----------|------|---------|
| Navigation | `components/layout/Navigation.tsx` | Site header (transparent/solid variants) |
| Footer | `components/layout/Footer.tsx` | Mountain wave footer with social icons |

### 5.2 UI Components

| Component | File | Purpose |
|-----------|------|---------|
| RouteCard | `components/ui/RouteCard.tsx` | Experience card with image, meta, Coming Soon modal |
| PhotoPileHero | `components/ui/PhotoPileHero.tsx` | Scattered photo collage for Experiences page |
| StatsDashboard | `components/ui/StatsDashboard.tsx` | Experience stats (distance, elevation, etc.) |
| AudioPlayer | `components/ui/AudioPlayer.tsx` | Trail Notes player with waveform, Coming Soon popup |
| VideoPlayer | `components/ui/VideoPlayer.tsx` | YouTube embed with custom thumbnail |
| StravaEmbed | `components/ui/StravaEmbed.tsx` | Strava activity embed |
| WhyAAI | `components/ui/WhyAAI.tsx` | Value proposition section |
| CTASection | `components/ui/CTASection.tsx` | Call-to-action with button |
| CategoryCarousel | `components/ui/CategoryCarousel.tsx` | Horizontal scrolling categories |
| FilterPills | `components/ui/FilterPills.tsx` | Category filter buttons |
| ProfileDashboard | `components/ui/ProfileDashboard.tsx` | About page stats grid |
| RaceResults | `components/ui/RaceResults.tsx` | Race results table with certificates |
| ComingSoonModal | `components/ui/ComingSoonModal.tsx` | Reusable Coming Soon popup |

---

## 6. Route/Experience Intake Process

### 6.1 Overview

The intake process allows documenting new adventures through an HTML form that generates JSON data, which Claude then processes into polished content for the website.

### 6.2 Workflow Diagram

```
┌─────────────────────────────────────────────────────┐
│  AFTER ADVENTURE                                    │
│                                                     │
│  1. Open routes/route-entry.html in browser         │
│  2. Fill form (rough notes are fine)                │
│  3. Click "Save Draft" → downloads route-data.json  │
│  4. Create folder: routes/001-route-name/           │
│  5. Move JSON + media files there                   │
└─────────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────┐
│  REVIEW IN DASHBOARD                                │
│                                                     │
│  6. Open routes/dashboard.html                      │
│  7. Load route-data.json files                      │
│  8. Review completeness status                      │
└─────────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────┐
│  POLISH WITH CLAUDE                                 │
│                                                     │
│  9. "Claude, polish route 001-kuppar-peak"          │
│  10. Claude reads notes, generates:                 │
│      • Website description (your voice)             │
│      • Instagram caption + hashtags                 │
│      • YouTube description (if video)               │
│  11. Preview HTML generated for review              │
│  12. Approve and finalize                           │
└─────────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────┐
│  READY FOR WEBSITE                                  │
│                                                     │
│  Files saved to:                                    │
│  • routes/XXX/content/website.md                    │
│  • routes/XXX/content/instagram.md                  │
│  • routes/XXX/content/youtube.md                    │
│                                                     │
│  Website pulls from this data when live             │
└─────────────────────────────────────────────────────┘
```

### 6.3 Intake Form Fields

**Required Fields:**
- Title, Short Description
- Category, Difficulty, Date
- Start Point, End Point
- Strava Link OR (Distance + Elevation)
- Raw Description
- Hero Image

**Optional Fields:**
- Tags, How to Reach, Max Altitude, Duration
- Notes File (PDF/TXT)
- Gallery Photos, Videos, Audio, GPX

### 6.4 Route Data Structure

```
routes/
├── route-entry.html      ← Form for adding new routes
├── dashboard.html        ← Route management dashboard
├── preview-template.html ← Preview template
├── POLISHING-GUIDE.md    ← Claude's polishing instructions
│
├── 001-kuppar-peak-winter/
│   ├── route-data.json   ← Main data file
│   ├── preview.html      ← Generated preview
│   ├── content/          ← Polished content (after Claude)
│   │   ├── website.md
│   │   ├── instagram.md
│   │   └── youtube.md
│   └── media/
│       ├── photos/
│       ├── videos/
│       ├── audio/
│       └── gpx/
```

### 6.5 Categories Supported

| Category | Use For |
|----------|---------|
| Mountain Biking | MTB trails |
| Road Cycling | Paved routes |
| Gravel Cycling | Mixed surface cycling |
| Trail Running | Off-road running |
| Road Running | Paved running |
| Trekking | Full-day mountain treks |
| Hiking | Half-day hikes |
| Nature Walk | Easy 2-3 hour walks |
| FKT Attempt | Speed record attempts |

### 6.6 Content Polishing Guidelines

Claude follows `routes/POLISHING-GUIDE.md` to generate content:

**Voice Requirements:**
- Use first-person "I" throughout
- Direct and practical
- Honest about challenges
- Specific with local knowledge
- Conversational, not commercial

**Output Files:**
1. `website.md` - Full website content with Quick Facts, Route description, My Notes
2. `instagram.md` - Ready-to-post caption with hashtags
3. `youtube.md` - Video description with timestamps

---

## 7. Content Status

### 7.1 Experience Content

| Experience | Has Full Content | Has Audio | Has Video | Status |
|------------|-----------------|-----------|-----------|--------|
| Kuppar Peak Loop | Yes | Sample | Placeholder | Ready |
| Shali Tibba Summit | No | No | No | Coming Soon |
| Hatu Peak Trail | No | No | No | Coming Soon |
| Churdhar Trek | No | No | No | Coming Soon |
| Jakhu Temple Walk | No | No | No | Coming Soon |
| Shimla to Fagu | No | No | No | Coming Soon |
| Kufri Road Climb | No | No | No | Coming Soon |
| Glen Forest Walk | No | No | No | Coming Soon |
| Mashobra FKT | No | No | No | Coming Soon |

### 7.2 Media Status

| Type | Current Status | Action Needed |
|------|----------------|---------------|
| Hero Images | Unsplash placeholders | Replace with real photos |
| Gallery Photos | Unsplash placeholders | Replace with real photos |
| Audio (Trail Notes) | Sample MP3 for Kuppar | Record real audio stories |
| Video | YouTube placeholder | Add real YouTube embeds |
| Author Photo | Unsplash placeholder | Replace with real photo |

### 7.3 Forms Status

| Form | Platform | Endpoint | Status |
|------|----------|----------|--------|
| Contact | Formspree | Pending setup | Not connected |
| Plan Your Adventure | Formspree | Pending setup | Not connected |

---

## 8. Features Built vs Pending

### 8.1 Features Complete

| Feature | Component | Notes |
|---------|-----------|-------|
| Navigation (transparent/solid) | `Navigation.tsx` | Both variants working |
| Footer with mountain wave | `Footer.tsx` | SVG decorations, social icons |
| Route cards with Coming Soon modal | `RouteCard.tsx` | Shows popup for experiences without content |
| Category filtering | `FilterPills.tsx` | All, MTB, Road, Trail, etc. |
| Stats dashboard | `StatsDashboard.tsx` | 7 stat items with icons |
| Audio player with Coming Soon | `AudioPlayer.tsx` | Shows popup when no audio, plays when available |
| Video player | `VideoPlayer.tsx` | YouTube embed style |
| Strava embed | `StravaEmbed.tsx` | Activity embed placeholder |
| Photo pile hero | `PhotoPileHero.tsx` | Scattered photo collage |
| FAQ accordion | `faq/page.tsx` | Collapsible questions |
| Race results table | `RaceResults.tsx` | Expandable with certificate lightbox |
| "Still have questions?" CTA | `faq/page.tsx` | Bottom section with contact link |
| Policy pages | Various | Terms, Privacy, Safety, Cancellation |
| Responsive design | All components | Mobile-first approach |

### 8.2 Features Pending

| Feature | Priority | Notes |
|---------|----------|-------|
| Formspree integration | High | Connect contact and plan forms |
| Real media content | High | Replace all placeholders |
| Route data integration | High | Load from JSON files |
| Image optimization | Medium | Next.js Image component for all images |
| SEO metadata | Medium | Page titles, descriptions, OG tags |
| Strava API integration | Low | Real activity embeds |
| Google Analytics | Low | Traffic tracking |
| Sitemap generation | Low | For SEO |

---

## 9. Development Rules

### 9.1 Critical Rules (from CLAUDE.md)

> **Prototypes are the source of truth.** Always verify COMPUTED styles in browser.

### 9.2 Style Rules

| Rule | Description |
|------|-------------|
| **Use inline styles** | Prefer inline styles over Tailwind for colors, fonts, spacing |
| **Verify computed styles** | Run `getComputedStyle()` in browser, not CSS rules |
| **Match exact values** | Copy exact pixel values from prototypes |
| **Animation precision** | Use exact duration, timing, keyframes from prototype |

### 9.3 Why Inline Styles Over Tailwind

```jsx
// CORRECT - can't be overridden
<Link style={{ color: 'white' }}>Link</Link>

// WRONG - can be overridden by global CSS
<Link className="text-white">Link</Link>
```

### 9.4 Component Behavior Rules

| Component | Rule |
|-----------|------|
| Experience cards | Show Coming Soon modal for `hasContent: false` |
| Audio player | Show Coming Soon popup when play clicked without audio |
| Footer social icons | Grey default, brand colors on hover |
| Nav CTA button | Always amber shimmer (`btn-flag`) |
| Form buttons | Amber/orange gradient, NOT green |
| Callout boxes | Grey (`var(--gray-100)`), NOT forest green |

---

## 10. Form Integration

### 10.1 Formspree Setup

| Form | Endpoint Format | Fields |
|------|-----------------|--------|
| Contact | `https://formspree.io/f/{form_id}` | Name, Email, Message |
| Plan Your Adventure | `https://formspree.io/f/{form_id}` | Name, Email, Phone, Location, Activity Type, Difficulty, Duration, Dates, Group Size, Budget, Requirements, How Heard |

### 10.2 Setup Steps

1. Create Formspree account at formspree.io
2. Create two forms (Contact, Plan)
3. Get form endpoint URLs
4. Update form `action` attributes in pages
5. Test submissions

### 10.3 Free Tier Limits

- 50 submissions/month
- Basic spam filtering
- Email notifications

---

## 11. Deployment & Infrastructure

### 11.1 Current Setup

| Service | Configuration |
|---------|---------------|
| **Vercel** | Auto-deploy from GitHub |
| **Domain** | Pending purchase (~₹800-1000/year) |
| **Build** | Next.js 16 with Turbopack |

### 11.2 Environment Variables

```env
# None required for Phase 1
# Future: FORMSPREE_FORM_ID, etc.
```

### 11.3 Cost Breakdown

**Phase 1 - Free:**
| Service | Free Tier |
|---------|-----------|
| Vercel | 100GB bandwidth/month |
| GitHub | Unlimited private repos |
| Formspree | 50 submissions/month |
| Google Fonts | Unlimited |

**Only cost:** Domain (~₹800-1000/year)

**Phase 2+ - Pay As You Grow:**
| Scenario | Cost | Trigger |
|----------|------|---------|
| Formspree Pro | $10/month | >50 submissions/month |
| Vercel Pro | $20/month | >100K visitors |
| Razorpay | 2% per transaction | When accepting payments |
| Supabase | $25/month | Database needed |

---

## 12. File Structure

```
adventure-athlete-india/
├── website/                          # Next.js application
│   ├── app/                          # App Router pages
│   │   ├── page.tsx                  # Home
│   │   ├── experiences/page.tsx      # Experiences listing
│   │   ├── experience/[slug]/page.tsx # Experience detail
│   │   ├── about/page.tsx            # About
│   │   ├── contact/page.tsx          # Contact
│   │   ├── plan/page.tsx             # Plan Your Adventure form
│   │   ├── faq/page.tsx              # FAQ
│   │   ├── terms/page.tsx            # Terms
│   │   ├── privacy/page.tsx          # Privacy
│   │   ├── safety/page.tsx           # Safety
│   │   ├── cancellation/page.tsx     # Cancellation
│   │   ├── layout.tsx                # Root layout
│   │   └── globals.css               # Global styles & CSS tokens
│   │
│   ├── components/
│   │   ├── layout/                   # Navigation, Footer
│   │   └── ui/                       # All UI components
│   │
│   ├── public/                       # Static assets
│   │   └── audio/                    # Audio files
│   │
│   ├── types/                        # TypeScript definitions
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   └── vitest.config.ts
│
├── design/                           # Design assets
│   ├── prototypes/                   # HTML prototypes (source of truth)
│   │   ├── 01-home.html
│   │   ├── 02-experiences.html
│   │   ├── ... (all prototype files)
│   │   └── styles.css
│   └── website/
│       └── 2026-01-05-website-design.md
│
├── routes/                           # Route data & intake system
│   ├── route-entry.html              # HTML form for adding routes
│   ├── dashboard.html                # Route management dashboard
│   ├── preview-template.html         # Preview template
│   ├── POLISHING-GUIDE.md            # Claude's polishing instructions
│   └── README.md                     # Intake system documentation
│
├── docs/plans/
│   └── 2026-01-06-design-guidelines.md # Design system & tech decisions
│
├── CLAUDE.md                         # Development rules
├── BRD.md                           # This document
└── README.md                        # Project overview
```

---

## 13. QA Checklist

### 13.1 Visual QA Process

1. Open prototype in browser (`design/prototypes/XX-page.html`)
2. Open website page (`localhost:3000/page`)
3. Compare side-by-side
4. Use browser DevTools to run `getComputedStyle()` on elements
5. Verify exact values match

### 13.2 Pre-Launch Checklist

**Content:**
- [ ] All placeholder images replaced with real photos
- [ ] All placeholder text reviewed and finalized
- [ ] Audio files recorded and uploaded
- [ ] Video embeds configured with real YouTube URLs
- [ ] Form endpoints connected to Formspree

**Functionality:**
- [ ] All page links working
- [ ] Forms submitting correctly
- [ ] Coming Soon modals appearing for incomplete experiences
- [ ] Audio player popup working when no audio
- [ ] FAQ accordion expanding/collapsing
- [ ] Load More button working on Experiences page
- [ ] Category filters working
- [ ] Mobile navigation working

**Design:**
- [ ] All pages match prototypes
- [ ] Responsive design verified on mobile, tablet, desktop
- [ ] Footer social icons have correct hover colors
- [ ] Buttons have correct styles
- [ ] Typography matches design system

**Technical:**
- [ ] No console errors
- [ ] Images optimized
- [ ] SEO metadata added
- [ ] Favicon added
- [ ] 404 page created

---

## 14. Future Roadmap

### 14.1 Phase 2 Features

| Feature | Purpose |
|---------|---------|
| Real route data integration | Load experiences from JSON files |
| Strava API integration | Real activity embeds |
| Admin panel | Manage inquiries from dashboard |
| Database | Store bookings, user data |
| Payment integration | Accept payments via Razorpay |
| Email notifications | Branded transactional emails |

### 14.2 Content Expansion

- Add more experiences to routes database
- Corporate wellness packages page
- Testimonials/reviews section
- Photo gallery page (all adventures)
- Podcast/Trail Notes audio series
- Blog section (if content marketing needed)

### 14.3 Route Entry Form Updates

Fields to add to `routes/route-entry.html`:

| Field | Type | Purpose |
|-------|------|---------|
| Best Season | Dropdown/Text | For Quick Facts |
| Gear | Text | Equipment recommendations |
| Route Type | Dropdown | Circular / Point-to-point / Out-and-back |
| YouTube Video URL | URL | For video embed section |

---

## Appendix A: Prototype File Mapping

| Page | Prototype File | Next.js Route |
|------|----------------|---------------|
| Home | `01-home.html` | `/` |
| Experiences | `02-experiences.html` | `/experiences` |
| Experience Detail | `03-experience-detail.html` | `/experience/[slug]` |
| About | `04-about.html` | `/about` |
| Why AAI | `06-why-aai.html` | `/why-aai` |
| Contact | `07-contact.html` | `/contact` |
| Plan | `08-plan.html` | `/plan` |
| FAQ | `09-faq.html` | `/faq` |
| Terms | `10-terms.html` | `/terms` |
| Privacy | `11-privacy.html` | `/privacy` |
| Safety | `12-safety.html` | `/safety` |
| Cancellation | `13-cancellation.html` | `/cancellation` |

---

## Appendix B: Social Media Links

| Platform | URL | Icon Color (Hover) |
|----------|-----|-------------------|
| Instagram | instagram.com/adventure.athlete.india | #E4405F |
| Facebook | facebook.com/adventureathleteindia | #1877F2 |
| YouTube | youtube.com/@adventureathleteindia | #FF0000 |
| Strava | strava.com/athletes/adventureathleteindia | #FC4C02 |

---

## Appendix C: Contact Information

**Atul Chauhan**
Adventure Athlete India
Shimla, HP, India
+91-9459033240
adventureathleteindia@gmail.com

**Licensed HP Tourism Guide**
Registration: 080724 42383

---

*Document auto-generated from project files. Last updated: 2026-01-08*
