# Adventure Athlete India - Design Guidelines & Tech Stack

**Date:** 2026-01-06
**Last Updated:** 2026-01-07 (Session 3)
**Status:** Approved
**Phase:** Ready for Development

---

## CRITICAL: Read This First (For Future Claude Sessions)

> **This is NOT a tour booking website. This is a personal adventure journal.**

Before making ANY design changes, understand these core principles:

### What This Site IS:
- A **routes library** (like a personal blog)
- Documentation of **real adventures** the owner has done
- A **journal** with flowing narrative, personal voice
- Content comes from `routes/POLISHING-GUIDE.md` template

### What This Site is NOT:
- A tour booking system
- A commercial tour operator website
- Pre-planned itineraries with timestamps

### Experience Detail Pages - The Template
Read `routes/POLISHING-GUIDE.md` before designing experience pages. The template is:
1. Hero image (full-width)
2. Title + quick stats (distance, elevation, difficulty, time)
3. **Flowing description** (personal, conversational paragraphs)
4. Quick Facts table (simple 2-column)
5. The Route section (narrative paragraphs, NOT timestamps)
6. Video embed (if available)
7. Strava embed (if available)
8. My Notes (callout box with personal tips)
9. Getting There (simple text)
10. What to Bring (bullet list)
11. CTA section
12. Author section

### Common Mistakes to Avoid:
- **NO** structured itineraries ("6:00 AM - Start", "7:30 AM - Reach point X")
- **NO** two-column layouts on detail pages (use single editorial column)
- **NO** booking sidebars or price cards
- **NO** tour package language ("Day 1:", "Includes:", "Excludes:")
- **NO** cluttered grids (use carousels with 3 visible items + arrows)
- **NO** green nav bar on inner pages (use white background)
- **NO** vibrant colored stat icons (use subtle forest green)
- **NO** "Bike Type" field (use "Gear" - works for all activities)
- **NO** experience-specific audio titles (use generic "Trail Notes")
- **NO** AI-sounding commercial copy
- **NO** all-green social icon hovers (use proper brand colors per platform)
- **NO** pine/deodar trees in footer (removed - only mountain + dots decorations)
- **NO** CTA section on About page (ends with quote block)
- **NO** larger nav buttons on inner pages (use 12px font, 12px 24px padding everywhere)
- **NO** green submit buttons on forms (use amber/orange gradient)
- **NO** open FAQ list style (use collapsible accordion)
- **NO** forest green callout boxes on policy pages (use `var(--gray-100)` grey)

### The Voice:
- Personal and direct (like telling a friend)
- Honest about challenges
- Specific with local knowledge
- Conversational, not commercial

---

## Brand Foundation

**Brand Personality:** Warm, authentic, and athletic. An elite competitor who guides like a friend. The design should feel like a personal journal from someone who actually lives this life - not a polished tour company brochure.

**Visual Inspiration:** Patagonia's storytelling warmth + athletic confidence. Let the Himalayas speak through photography while the UI stays clean and grounded.

**Tagline:** Experience the raw Himalayas.

---

## Color Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| **Primary** | Forest Green | `#2D5A3D` | Headers, nav, footer, key sections |
| **Accent** | Amber | `#D97706` | CTAs, buttons, highlights, links, section labels |
| **Text** | Dark | `#1A202C` | Primary body text |
| **Muted** | Slate | `#64748b` | Secondary text, meta info, captions |
| **Background** | White | `#FFFFFF` | Page backgrounds |

**Usage Rules:**
- Forest green for trust and grounding (nav, footer)
- Amber sparingly - only for actions and emphasis
- Photography does the heavy lifting for color vibrancy
- Avoid colored boxes - let content breathe

---

## Typography

**Headlines:** Bold condensed sans-serif
- Font: Oswald (Google Fonts)
- Weight: 400-600
- Style: Uppercase for main headers, title case for section headers
- Letter-spacing: 1-3px

**Body:** Clean sans-serif
- Font: Source Sans 3 (Google Fonts)
- Weight: 300-500
- Line-height: 1.7-1.8
- Size: 16-18px base

**Hierarchy:**
| Element | Font | Size | Weight | Style |
|---------|------|------|--------|-------|
| Hero H1 | Oswald | 48-80px (clamp) | 400 | Uppercase, letter-spacing 2px |
| Section Title | Oswald | 32-48px | 400 | Normal case |
| Section Label | Source Sans | 12px | 600 | Uppercase, letter-spacing 3px, accent color |
| Body | Source Sans | 18px | 300-400 | Normal |
| Meta/Caption | Source Sans | 14px | 400 | Muted color |

---

## Photography Style

**Approach:** Mix of epic and authentic

| Context | Style |
|---------|-------|
| Hero images | Epic & dramatic - wide landscapes, golden hour, cinematic |
| Route pages | Authentic & in-the-moment - action shots, real terrain, real sweat |
| About section | Personal - candid shots, behind-the-scenes |

**Technical Guidelines:**
- Aspect ratios: 16:9 for heroes, 4:3 for cards, 3:4 for portraits
- Subtle gradient overlay on heroes for text legibility
- No heavy filters - natural colors preferred

---

## Layout Principles

**Inspired by:** Patagonia, editorial magazines

**Key Principles:**
1. **Photography-forward** - images do the work, not colored boxes
2. **Generous whitespace** - everything breathes
3. **Minimal UI chrome** - no unnecessary borders, shadows, or boxes
4. **Editorial feel** - like a magazine, not an app
5. **Mobile-first** - all sections stack vertically

**Spacing:**
- Section padding: 70px vertical
- Page header padding: 80px vertical
- Content max-width: 1400px
- Grid gap: 32px
- Element spacing: 16-24px

**Cards:**
- No borders or shadows
- Image with subtle hover zoom
- Clean typography below
- Let the image speak

---

## Components Reference

**Navigation:**
- Transparent overlay on hero
- White text on dark images
- Amber CTA button
- Minimal links

**Buttons:**
- Primary: Amber background, white text
- Secondary: Forest green background, white text
- Padding: 14px 32px (body buttons), 12px 24px (nav CTA)
- Font: 14px body, 12px nav CTA, 600 weight, letter-spacing 1px
- Subtle hover lift (translateY -2px)

**Nav CTA Button (`btn-flag`):**
- Amber gradient background with shimmer animation
- Padding: 12px 24px
- Font-size: 12px
- Consistent across ALL pages

**Route Cards:**
- No border/shadow
- 4:3 image ratio
- Hover: card lifts, image zooms slightly
- Category label in accent color
- Title in Oswald
- Meta with SVG icons: distance, elevation, difficulty, duration
- Icon style: 14px, muted color, 0.7 opacity

**Experiences Page:**
- Photo pile collage hero (3 overlapping images)
- Filter tabs for categories
- Grid of route cards with icon-based meta
- "Load More Experiences" button (not pagination)

**Footer:**
- Forest green gradient background with mountain wave SVG at top
- White text, 4-column grid on desktop
- Amber accent for headers
- Decorative elements:
  - Mountain silhouette (bottom-left, 6% opacity)
  - Dots pattern (top-right, 8% opacity)
- **Logo socials**: Small social icons (16px) directly under "Adventure Athlete India" logo
  - Icons: Instagram, YouTube, Strava, Facebook
  - Color: `rgba(255,255,255,0.7)`, white on hover
  - Present on: Plan Your Adventure, Terms, Privacy, Safety, Cancellation pages
- Social icons (footer-social): Larger 36px circular buttons after contact info, brand colors on hover
- Bottom text: `© 2026 Adventure Athlete India | Atul Chauhan` (orange pipe separator)
- License info on right

---

## Experience Detail Page Components

**Stats Dashboard:**
- Subtle forest green icon backgrounds (`rgba(45, 90, 61, 0.08)`)
- Forest green icon color (`var(--forest)`)
- Hover: slightly darker background (`rgba(45, 90, 61, 0.15)`)
- NO vibrant colored gradients - keep it clean and cohesive
- Fields: Distance, Elevation Gain, Duration, Difficulty (with bar), Route, Best Season, Gear
- Gear field (not "Bike Type") - use short text like "MTB · Full-sus recommended"

**Audio Section (Trail Notes):**
- Badge: "Audio Story" with mic icon
- Play button with animated waveform visualization (20 bars)
- Title: "Trail Notes" (generic, works for all experiences)
- Subtitle: "Route insights, tips & personal commentary"
- Duration shown in meta

**Video Section:**
- YouTube embed style with red play button overlay
- Background thumbnail with gradient overlay
- Video title below

**Author Section:**
- Centered layout within max-width container
- Label: "AUTHOR" (uppercase, forest green, small)
- Name row: Small inline image (28px) + "Atul Chauhan" name on same line
  - Image: 28px circular, 2px forest green border, `vertical-align: middle`
  - Name: Oswald font, `display: inline`, 8px gap from image
- Credentials: `Elite Cyclist | Trail Runner | Licensed Guide | Engineer` (orange pipe separators)
- Social icons centered below (Instagram, YouTube, Strava, Facebook)

**CTA Section (below Author):**
- Light gray background (`var(--gray-50)`) with rounded corners
- Headline: "Interested in this route?"
- Text: "Share your dates and fitness level — I'll help you plan the perfect adventure."
- Button: Amber shimmer button (`btn-flag`) - "Let's Plan Together"
- Natural, conversational tone (not salesy)

---

## Navigation Components

**Inner Pages (nav-solid):**
- White background (not green)
- Dark text for logo and links
- Social icons under logo (small, muted, colored on hover)
- Shimmer amber CTA button (`btn-flag`)

**Homepage (transparent nav):**
- Overlays hero image
- White text
- Social icons under logo
- Shimmer amber CTA button

---

## Social Icons Styling

**Universal Rule:** Grey by default, brand colors on hover

| Platform | Default | Hover Color |
|----------|---------|-------------|
| Instagram | Grey (`var(--slate)`) | #E4405F (pink) |
| Facebook | Grey | #1877F2 (blue) |
| YouTube | Grey | #FF0000 (red) |
| Strava | Grey | #FC4C02 (orange) |
| ITRA | Grey | `var(--forest)` (green) |

**Styles:**
- Nav social icons: 14px, opacity 0.5, full opacity + color on hover
- Bio/About social icons: 44px circular buttons, grey bg, brand bg + white icon on hover
- Contact page "Follow Along": Name labels above, 48px circular clickable icons below
- Footer social icons: 36px circular, semi-transparent white bg, brand bg on hover

---

## About Page Components

**Hero Section:**
- Two-column layout: Image left, intro text right
- Image with amber border accent (offset behind)
- Personal tagline: "I'm Atul. I ride, I run, I explore." (single line)
- Social icons row: Instagram, YouTube, Strava, Facebook, ITRA (in that order)
- Brand colors on hover (NOT all green)

**Profile Dashboard:**
- White card with shadow, rounded corners
- Primary row (4 columns): ITRA Score, FTP Power, VK PR, National Champ
  - Icon in subtle forest green bg (`rgba(45, 90, 61, 0.08)`)
  - Large value (Oswald font)
  - Small label (uppercase)
  - Hover: slightly darker background
- Secondary row (4 columns): Guide License, Strava Stats, Education, Career
  - Smaller icons, flex layout with icon + text
  - Strava Stats: "Cycling 30,000+ kms" / "Running 3,000+ kms" (two lines, regular weight)
  - Education: "MBA - HPU" / "B.Tech Honors - LPU" (two lines, regular weight)
  - Hover effect on each item

**Story Timeline:**
- Left border with amber dots
- Year labels in amber
- Flowing narrative text

**Summit Cards (First Ascents):**
- Image with altitude badge overlay
- White card below with peak name and description

**Race Results Table:**
- Clean table with Year, Event, Category, Result, Cert columns
- Gold/Silver/Bronze color coding for results
- **View More feature**: First 5 rows visible, rest hidden
  - Green "View More Races" button toggles visibility
  - Button text changes to "Show Less" when expanded
  - Chevron icon rotates on expand
- **Certificate column**:
  - Thumbnail images (50x36px) that open in lightbox
  - Placeholder icon for missing certificates
  - Lightbox: Dark overlay, large image, close button, caption, ESC to close

**Photo Pile Gallery:**
- Scattered/cluttered photo layout (like Experiences page hero)
- Absolute positioned photos with rotations
- Hover: photo scales up, z-index increases, rotation resets
- Photo labels appear on hover

**Quote Block:**
- Grey background (`var(--gray-100)`), NOT forest green
- Rounded corners (16px)
- Dark text for quote and citation

**NO CTA section** on About page - ends with quote block before footer

---

## Contact Page Components

**Contact Info Section:**
- WhatsApp, Email, Location with labels
- Clean typography

**Follow Along Section:**
- Label: "Follow Along"
- Grid of social items:
  - Platform name as text label (not clickable)
  - Circular icon button below (clickable)
  - Icons: 48px, grey bg, grey icon
  - Hover: Brand color bg, white icon, slight scale

**Quick Message Form:**
- Grey background card (`var(--gray-50)`)
- Name, Email, Message fields
- Submit button: Amber/orange gradient (same as nav CTA), NOT green
- Link to full inquiry form below (amber colored link)

---

## Plan Your Adventure Form (08-plan)

**Page Header:**
- Centered layout with section label, title, subtitle
- Title: "Let's Create Something Special"

**Form Sections:**
- About You (name, email, phone, location)
- Adventure Preferences (activity type, difficulty level, duration)
- Travel Details (dates, group size, budget)
- Additional Info (special requirements, how did you hear about us)

**Radio Card Selectors (Difficulty, Duration):**
- Cards with title + description
- Border highlight on selection (forest green)
- **Description text**: `white-space: nowrap` to keep on single line
- Example: "Moderate" with "Full day, some challenge"

**Submit Button:**
- Full width, amber/orange (`btn-primary`)
- Text: "Send Inquiry"

**Footer:**
- Includes small logo-socials under "Adventure Athlete India"

---

## Policy Pages (Useful Links)

All pages under "Useful Links" in footer: FAQ, Terms, Privacy, Safety, Cancellation

**Common Elements:**
- Page header with section label and title
- Content in `.policy-content` container with `max-w-3xl`
- Bottom callout box: `var(--gray-100)` background, centered text, 16px font, rounded corners

**FAQ Page (Collapsible Accordion):**
- Questions are clickable headers that expand/collapse answers
- Chevron icon rotates on expand (180deg)
- Smooth max-height transition for animation
- Only one question can be open at a time (optional - current allows multiple)
- Bottom callout: "Still have questions?" with **orange button** (`btn-primary`) for "Get in Touch"

**Terms & Conditions:**
- Sections: About the Service, What's Included, Itinerary, Booking & Payment, Private Tours, Your Responsibilities, Limitation of Liability
- Bottom callout: "Questions about these terms? Contact me"

**Privacy Policy:**
- Sections: What I Collect, Why I Collect It, How It's Stored, Data Retention, Your Rights, Photos & Videos, Contact
- Bottom callout: "Your privacy matters..."

**Safety Policy:**
- Sections: Before the Tour (Fitness, Health Docs, Preparation), During the Tour (My Commitment, Your Responsibility), Insurance, Weather & Conditions, Emergency Contact
- Bottom callout: "Safety is non-negotiable..."

**Cancellation Policy:**
- Sections: If You Need to Cancel, If I Need to Cancel, Rescheduling, Refund Process, Contact for Cancellations
- Bottom callout: "I believe in fair dealings..."

---

## Tech Stack

### Core

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | **Next.js 14** (App Router) | React-based, static generation, API routes |
| Styling | **Tailwind CSS** | Utility-first, matches design system |
| Hosting | **Vercel** | Auto-deploy from GitHub, CDN |
| Repository | **GitHub** | Version control |

### Data & Content

| Layer | Technology | Purpose |
|-------|------------|---------|
| Routes Data | **JSON files** | `routes/*/route-data.json` - already structured |
| Media | **Local + YouTube** | Images in repo, videos embedded |
| Forms (Website) | **Formspree** | Plan Your Adventure, Contact forms (50/month free) |
| Forms (External) | **Google Forms** | Onboarding, Feedback forms (shared via email/WhatsApp) |

### Future (When Needed)

| Feature | Technology | When |
|---------|------------|------|
| Payments | **Razorpay** | Corporate wellness, paid tours |
| Database | **Supabase** | Bookings, user data |
| Email | **Resend** | Transactional emails |
| Auth | **NextAuth.js** | If user accounts needed |

---

## Cost Breakdown

### Phase 1 - Free

| Service | Free Tier |
|---------|-----------|
| Vercel | 100GB bandwidth/month |
| GitHub | Unlimited private repos |
| Formspree | 50 submissions/month |
| Google Forms | Unlimited (for external forms) |
| YouTube embeds | Unlimited |

**Only cost:** Domain (~₹800-1000/year)

### Phase 2+ - Pay As You Grow

| Scenario | Cost | Trigger |
|----------|------|---------|
| Formspree Pro | $10/month | 50+ form submissions/month |
| Vercel Pro | $20/month | 100K+ visitors |
| Razorpay | 2% per transaction | When accepting payments |
| Supabase | $25/month | 50K+ database rows |
| Custom Admin Panel | One-time build | When business is thriving |

**Summary:** Free until business is thriving, then scales with revenue.

---

## File Structure (Proposed)

```
adventure-athlete-india/
├── website/                    # Next.js project
│   ├── app/                    # App router pages
│   │   ├── page.tsx            # Home
│   │   ├── experiences/        # Routes library
│   │   ├── experience/[slug]/  # Route detail
│   │   ├── about/              # About pages
│   │   └── contact/            # Contact + inquiry form
│   ├── components/             # Reusable components
│   ├── lib/                    # Utilities, data fetching
│   └── public/                 # Static assets
│
├── routes/                     # Existing routes data
│   └── [route-name]/
│       ├── route-data.json
│       └── media/
│
├── design/                     # Design assets
│   ├── color-palette-comparison.html
│   └── website/
│
└── docs/
    └── plans/
        └── 2026-01-06-design-guidelines.md  # This file
```

---

## Preview

Live preview of the design direction:
`design/color-palette-comparison.html`

---

## Phase 1: Implementation Checklist

### Setup
- [ ] Set up Next.js 14 project in `website/` folder
- [ ] Configure Tailwind with design tokens (colors, fonts, spacing)
- [ ] Set up Google Fonts (Oswald, Source Sans 3)
- [ ] Create CSS variables file matching design system
- [ ] Deploy initial skeleton to Vercel

### Core Components
- [ ] Navigation (`nav-transparent` for home, `nav-solid` for inner pages)
- [ ] Footer (mountain wave SVG, 4-column grid, social icons)
- [ ] Button styles (`btn`, `btn-primary`, `btn-flag` shimmer)
- [ ] Route Card (image, category label, title, icon meta)
- [ ] Page Header (section label, title, subtitle)
- [ ] Section Label (uppercase, amber, letter-spacing)
- [ ] Author Section (photo, name, credentials, social icons)
- [ ] CTA Section (grey bg, headline, button)

### Pages to Build
- [ ] **Home** (01-home) - Hero, intro, featured routes carousel, about preview, CTA
- [ ] **Experiences** (02-experiences) - Photo pile hero, filter tabs, route cards grid, load more
- [ ] **Experience Detail** (03-experience-detail) - Hero, stats dashboard, description, Quick Facts, route narrative, video embed, Strava embed, My Notes, Getting There, What to Bring, Author, CTA
- [ ] **About** (04-about) - Hero with image, Profile Dashboard, Story Timeline, Summit Cards, Race Results table, Photo Pile gallery, Quote block
- [ ] **Why AAI** (06-why-aai) - Value proposition page
- [ ] **Contact** (07-contact) - Contact info, Follow Along social grid, Quick Message form
- [ ] **Plan Your Adventure** (08-plan) - Multi-step inquiry form
- [ ] **FAQ** (09-faq) - Collapsible accordion
- [ ] **Terms** (10-terms) - Policy content with grey callout
- [ ] **Privacy** (11-privacy) - Policy content with grey callout
- [ ] **Safety** (12-safety) - Policy content with grey callout
- [ ] **Cancellation** (13-cancellation) - Policy content with grey callout

### Data Integration
- [ ] Create route data loader (reads from `routes/*/route-data.json`)
- [ ] Create route content loader (reads from `routes/*/content/website.md`)
- [ ] Generate static pages from route data
- [ ] Image optimization setup

### Forms
- [ ] Contact form (Formspree integration - stays on site)
- [ ] Plan Your Adventure form (Formspree integration - stays on site)
- [ ] Set up Formspree account and get form endpoint

---

## Phase 2: Future Enhancements

### Route Entry Form Updates
These fields are missing from `routes/route-entry.html` and should be added:

| Field | Type | Purpose |
|-------|------|---------|
| **Best Season** | Dropdown/Text | "March-June, Sept-Nov" for Quick Facts |
| **Gear** | Text | "MTB · Full-sus recommended" for Quick Facts |
| **Route Type** | Dropdown | Circular / Point-to-point / Out-and-back |
| **YouTube Video URL** | URL | For video embed section |

### Website Features (When Needed)
| Feature | Technology | Trigger |
|---------|------------|---------|
| **Admin Panel** | Next.js + Supabase | Manage inquiries, clients, testimonials from dashboard |
| Custom Forms | Next.js API + Resend | Replace Formspree with full control |
| Payments | Razorpay | Corporate wellness, paid tours |
| Database | Supabase | Bookings, user data |
| Email notifications | Resend | Transactional emails (branded, automated) |
| User accounts | NextAuth.js | If login/booking system needed |
| Blog/News section | MDX | If content marketing needed |
| Multi-language | next-intl | If international audience grows |

### Content Expansion
- [ ] Add more experiences to routes database
- [ ] Corporate wellness packages page
- [ ] Testimonials/reviews section
- [ ] Photo gallery page (all adventures)
- [ ] Podcast/Trail Notes audio player

---

## Prototype Files Reference

All HTML prototypes are in `design/prototypes/`:

| File | Page |
|------|------|
| 01-home.html | Homepage |
| 02-experiences.html | Experiences listing |
| 03-experience-detail.html | Single experience page |
| 04-about.html | About page |
| 06-why-aai.html | Why Adventure Athlete India |
| 07-contact.html | Contact page |
| 08-plan.html | Plan Your Adventure form |
| 09-faq.html | FAQ (accordion) |
| 10-terms.html | Terms & Conditions |
| 11-privacy.html | Privacy Policy |
| 12-safety.html | Safety Policy |
| 13-cancellation.html | Cancellation Policy |
| styles.css | Shared stylesheet |

Use these as the source of truth for styling and structure when coding.

---

*Approved: 2026-01-06*
*Updated: 2026-01-07 - Added About page components, Contact page components, Social icons styling guide, Race Results table features, corrected nav button sizes*
*Updated: 2026-01-07 (Session 2) - Added Policy Pages section, FAQ accordion style, grey callout boxes on all policy pages, Facebook icon in About bio social row, amber Send Message button on Contact page*
*Updated: 2026-01-07 (Session 3) - Author section: small inline image (28px) before name instead of large image above; About page Strava stats updated to "30,000+ kms / 3,000+ kms"; FAQ "Get in Touch" button changed to orange; Plan Your Adventure form section added with radio card nowrap; Footer logo-socials (small icons under logo) added to Plan and Useful Links pages*
