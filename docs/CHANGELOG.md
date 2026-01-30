# Changelog

All notable changes to the Adventure Athlete India website.

---

## [2026-01-08] - Phase 1 Completion & Documentation

### Phase 2 Planning

- Consolidated Phase 2 requirements from BRD.md and design docs
- Created `/docs/PHASE-2-REQUIREMENTS.md` with prioritized feature list
- Added: Search bar for experiences page
- Added: Email pamphlet for direct client outreach (Marketing)

### Code Review Fixes

#### Critical
- **StravaEmbed Conditional Rendering** (`app/experience/[slug]/page.tsx:253-255`)
  - Fixed: Component was always rendering even when no Strava activity ID provided
  - Now only renders when `experience.stravaActivityId` exists and is non-empty

#### Important
- **Author Social Links** (`app/experience/[slug]/page.tsx:342-389`)
  - Added: Instagram, YouTube, Strava, Facebook social link buttons
  - Added: Brand-colored hover effects (Instagram pink, YouTube red, Strava orange, Facebook blue)
  - Added: Proper accessibility labels (`aria-label`)

- **Font Sizes to Inline Styles** (`app/experience/[slug]/page.tsx`)
  - Changed: Intro paragraph from Tailwind to `style={{ fontSize: '20px' }}`
  - Changed: Opening paragraph from Tailwind to `style={{ fontSize: '18px', lineHeight: 1.8 }}`
  - Changed: Content paragraphs to use inline styles
  - Changed: Getting there sections to use inline styles
  - Reason: Per CLAUDE.md rules - inline styles prevent Tailwind override issues

#### Accessibility
- **Gallery Modal** (`app/experience/[slug]/page.tsx:169-177`)
  - Added: `role="dialog"` and `aria-modal="true"`
  - Added: `aria-label` with experience title
  - Added: `onKeyDown` handler for Escape key to close modal
  - Added: `tabIndex={-1}` for focus management

### Experience System

- **Extended Experience Interface** (`lib/experiences.ts`)
  - Added: `Author` interface with name, image, credentials, socials
  - Added: `defaultAuthor` constant (Atul Chauhan)
  - Added: Optional detail fields: route, bestSeason, gear
  - Added: Optional media fields: audio, video, stravaActivityId
  - Added: Optional content fields: intro, openingParagraph, content, gettingThere, whatToBring, notes
  - Added: Optional image fields: heroImage, photos

- **Updated Kuppar Peak Loop** (`lib/experiences.ts:104-191`)
  - Added: Full content with all detail fields populated
  - Set: `hasContent: true` to enable detail page

- **Updated StatsDashboard** (`components/ui/StatsDashboard.tsx`)
  - Changed: Made route, bestSeason, gear props optional
  - Added: Conditional rendering for secondary stats section

### Documentation

#### New Files
- `/website/docs/DESIGN-SYSTEM.md` - Complete visual design system reference
  - Color tokens (brand, neutral, social)
  - Typography scale and font families
  - Spacing system
  - Component specifications
  - Animation keyframes
  - Shadow and z-index scales

- `/docs/PHASE-2-REQUIREMENTS.md` - Phase 2 planning document
  - Phase 1 completion status
  - Priority-ordered feature roadmap
  - Technical debt notes
  - Proposed file structure

- `/docs/CHANGELOG.md` - This file

#### Updated Files
- `/CLAUDE.md` - Added "Adding New Experiences" section
  - Quick start template for Coming Soon experiences
  - Full experience template with all fields
  - Category value reference
  - Data flow documentation

### File Organization

- **Moved Screenshots** to `/website/docs/screenshots/`
  - `footer-md-768.png`, `footer-mobile-375.png`
  - `kuppar-full.png`, `kuppar-gallery-close.png`
  - `prototype-author.png`, `prototype-gallery.png`, `prototype-gallery-compare.png`
  - `screenshot-desktop-gallery.png`, `screenshot-mobile-*.png`
  - `website-author.png`, `website-full.png`, `website-gallery*.png`

### Verification

- Build: Passed (13 pages generated)
- TypeScript: Passed (no errors)
- All routes returning 200 OK

---

## [2026-01-07] - Photo Gallery Mobile Responsive

### Fixed
- Photo gallery grid mobile layout
- Footer mobile responsive issues
- Navigation mobile menu

---

## [Earlier] - Phase 1 Implementation

### Pages
- Home (`/`)
- Experiences listing (`/experiences`)
- Experience detail (`/experience/[slug]`)
- About (`/about`)
- Contact (`/contact`)
- Plan Your Trip (`/plan`)
- FAQ (`/faq`)
- Terms, Privacy, Safety, Cancellation

### Components
- Navigation (solid/transparent variants)
- Footer with social links
- RouteCard for experience cards
- StatsDashboard for route stats
- AudioPlayer with waveform animation
- VideoPlayer placeholder
- StravaEmbed for activity maps
- PhotoPileHero for experiences page

### Core Systems
- Centralized experience configuration
- CSS design tokens in globals.css
- Prototype-first development workflow
