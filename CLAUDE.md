# Adventure Athlete India - Claude Code Rules

## Social Handles

| Platform | Handle |
|----------|--------|
| Instagram | @adventureathlete.in |
| YouTube | @adventureathleindia |
| Facebook | Adventure Athlete India |
| Strava | Atul Chauhan (atulchauhan) |

---

## Development & Deployment Process

All code changes follow this flow:

```
Local Mac → GitHub (main) → Vercel (auto-deploy) → Live site
```

### Steps

1. **Claude makes changes** locally on the Mac
2. **User reviews** on localhost (`npm run dev`) or by looking at the code
3. **User says "commit"** — Claude creates a git commit with a clear message
4. **Claude pushes to GitHub** — which triggers Vercel to auto-redeploy
5. **Live site updates** within ~1 minute

### Rules

- **Never commit without user approval**
- **Never push to GitHub without user approval**
- **Always verify build passes** (`npx next build`) before committing
- All work happens on `main` branch (no feature branches unless requested)
- GitHub repo is the **single source of truth** for code
- `.env.local` is gitignored — must be created manually on each machine

### Setting up on a new Mac

1. Install Node.js
2. `git clone https://github.com/adventureathleteindia/adventure-athlete-india.git`
3. `cd adventure-athlete-india/website && npm install`
4. Create `.env.local` with Supabase keys (ask Claude for the template)
5. `npm run dev` — local dev server at localhost:3000

---

## Infrastructure & Accounts

| Service | URL / Detail |
|---------|-------------|
| **Live site** | https://adventure-athlete-india.vercel.app |
| **GitHub repo** | https://github.com/adventureathleteindia/adventure-athlete-india |
| **Vercel project** | Linked to GitHub, auto-deploys on push to `main` |
| **Supabase project** | Project ref: `nfwnuwhunlznyaalgnmt` |
| **Supabase URL** | https://nfwnuwhunlznyaalgnmt.supabase.co |
| **Admin panel** | https://adventure-athlete-india.vercel.app/admin |

### Vercel Configuration

- **Root Directory**: `website` (set in Vercel Settings → General → Build)
- **Framework**: Next.js (explicitly set via `website/vercel.json`)
- **Environment Variables**: 3 vars configured in Vercel dashboard (same as `.env.local`)

### Environment Variables (`.env.local`)

```
NEXT_PUBLIC_SUPABASE_URL=https://nfwnuwhunlznyaalgnmt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon public key from Supabase Settings → API>
SUPABASE_SERVICE_ROLE_KEY=<service role key from Supabase Settings → API>
```

- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — safe to expose in browser (RLS enforced)
- `SUPABASE_SERVICE_ROLE_KEY` — server-only, bypasses RLS, never expose to client
- `.env.local` is gitignored — must be created manually on each machine and in Vercel dashboard

---

## Architecture Overview

```
Website (Next.js App Router)
├── Public pages: /, /experiences, /about, /contact, /plan, /plan-tour, /tours-programs, /rentals, /faq, /terms, /privacy, /safety, /cancellation
├── Experience detail: /experience/[slug]
├── Admin panel: /admin (auth-protected)
│   ├── /admin — Dashboard (stats, charts, recent activity)
│   ├── /admin/leads — Lead management (search, filter, status, notes, follow-up)
│   ├── /admin/marketing — Pre-launch checklist, recurring tasks, hotel partners
│   └── /admin/settings — Contact info, social links, notifications, password
├── API: /api/leads (POST — receives form submissions)
└── Auth: Supabase email/password (admin login)

Supabase (PostgreSQL)
├── leads — Form submissions from Contact, Plan, Plan Tour pages
├── marketing_tasks — Pre-launch + recurring marketing checklist
├── hotel_partners — Hotel partnership tracking
├── settings — Key-value config (contact info, social links, notifications)
├── RLS — Authenticated: full CRUD on all tables; Anonymous: INSERT only on leads
└── Triggers — Auto-update `updated_at` on leads, hotel_partners, settings
```

### Form Submission Flow

1. User fills form on `/contact`, `/plan`, or `/plan-tour`
2. Form POSTs to `/api/leads` with `source_form` identifier
3. API uses Supabase service role client to INSERT into `leads` table
4. Core fields: `name`, `email`, `phone`, `nationality`, `source_form`
5. Extra fields stored as JSONB in `form_data` column
6. Admin views/manages leads at `/admin/leads`

### Database Schema

Full schema is at `website/lib/supabase/schema.sql`. Includes tables, RLS policies, triggers, and seed data. Run in Supabase SQL Editor to set up from scratch.

---

## What's Been Built & Deployed

### Website Pages (all live)

- Home, Experiences, Experience Detail, About, Contact, Plan Your Adventure, Plan Tour, Tours & Programs, Equipment Rentals, FAQ, Terms, Privacy, Safety, Cancellation

### Forms Wired Up

| Form | Page | `source_form` | Fields |
|------|------|--------------|--------|
| Contact | `/contact` | `contact` | name, email, message |
| Plan Your Adventure | `/plan` | `plan` | name, email, phone, nationality, activities, difficulty, people, dates, description, referral |
| Plan Tour | `/plan-tour` | `plan_tour` | name, email, phone, nationality, city, program, activities, experience_level, dates, group_size, flexibility, duration, budget, accommodation, pickup, dietary, medical, excitement, referral |

### Admin Panel (fully functional)

- Dashboard with real stats and charts
- Lead management with search, filter, sort, detail panel, status/notes/follow-up editing
- Marketing checklist (pre-launch + recurring tasks)
- Hotel partner tracking
- Settings management

---

## Known Issues & Pending Tasks

### Pending

- [ ] **Strava link**: Currently `strava.com/athletes/atulchauhan` — user will share correct URL later
- [ ] **Custom domain**: User will purchase later, then configure in Vercel
- [ ] **Jest config**: Never committed to git — tests can't run. Not blocking (build + lint are primary checks)
- [ ] **Test the form → database flow**: User needs to submit a test form and verify row appears in Supabase

### Lint Warnings (non-blocking, 0 errors)

- `additionalRoutes` unused in `experiences/page.tsx`
- `linkClasses` and `activeLinkClasses` unused in `Navigation.tsx`
- `progress` unused in `AudioPlayer.tsx`

### Resolved Issues (for context)

- Vercel 404: Fixed by setting Root Directory to `website`, adding `vercel.json`, and configuring env vars
- Edge Runtime middleware error: Fixed by deleting `middleware.ts` (Next.js 16 deprecated it)
- Instagram link: Fixed from `adventure.athlete.india` → `adventureathlete.in` across 6 files
- Nav overflow at tablet widths: Fixed by changing desktop breakpoint from `md` (768px) to `lg` (1024px)
- Supabase tables: Dropped and recreated cleanly with full schema

---

## Prototype-First Development

Prototypes in `/design/prototypes/` are the **source of truth**.

### The One Rule That Matters

> **Always verify COMPUTED styles in browser - never trust CSS rules or Tailwind classes**

### Process

1. Open prototype in browser
2. **Run `getComputedStyle()`** on elements to get actual rendered values
3. Use **inline styles** (not Tailwind) for colors, fonts, spacing
4. Compare screenshots of prototype vs live site
5. Verify computed styles match in both

### Why Inline Styles Over Tailwind

Tailwind classes can be overridden by global CSS (e.g., `a { color: inherit }`). Inline styles cannot.

```jsx
// Use this
<Link style={{ color: 'white' }}>Link</Link>

// Not this - can be overridden
<Link className="text-white">Link</Link>
```

### Animation Rules

| Property | How to Handle |
|----------|--------------|
| Duration | Use EXACT value from prototype (e.g., `1.2s`, not `2s`) |
| Timing | Use EXACT function (`linear` vs `ease-in-out` matters) |
| Keyframes | Copy percentage values exactly (`100%` vs `200%` matters) |
| Conditional | Check if prototype shows animation always or conditionally |

### Typography Rules

| Property | How to Handle |
|----------|--------------|
| Font family | Use CSS variable or exact font name |
| Font size | Use exact pixel value, not Tailwind approximation |
| Letter spacing | Use exact value (e.g., `3px`, `0.5px`) |
| Line height | Use exact value or ratio from prototype |
| Text transform | Match exactly (uppercase, none, etc.) |

### Spacing Rules

| Property | How to Handle |
|----------|--------------|
| Padding | Use exact values (e.g., `padding: 80px 40px`) |
| Margin | Use exact values |
| Gap | Use exact values |
| Container max-width | Use exact values |

### Visual Effects Rules

| Property | How to Handle |
|----------|--------------|
| Box shadow | Copy EXACT shadow values from prototype |
| Gradients | Copy EXACT color stops and percentages |
| Border radius | Use exact pixel values |
| Opacity | Use exact decimal values |

### Code Pattern: Inline Styles for Exact Values

When prototype has specific values that don't map to Tailwind:

```jsx
// CORRECT - exact prototype values
<div style={{ padding: '80px 40px', maxWidth: '700px' }}>

// WRONG - Tailwind approximation
<div className="p-20 max-w-2xl">
```

## Prototype File Mapping

| Page | Prototype |
|------|-----------|
| Home | `/design/prototypes/01-home.html` |
| Experiences | `/design/prototypes/02-experiences.html` |
| Experience Detail | `/design/prototypes/03-experience-detail.html` |
| About | `/design/prototypes/04-about.html` |
| Why AAI | `/design/prototypes/06-why-aai.html` |
| Contact | `/design/prototypes/07-contact.html` |
| Plan | `/design/prototypes/08-plan.html` |
| FAQ | `/design/prototypes/09-faq.html` |
| Terms | `/design/prototypes/10-terms.html` |
| Privacy | `/design/prototypes/11-privacy.html` |
| Safety | `/design/prototypes/12-safety.html` |
| Cancellation | `/design/prototypes/13-cancellation.html` |
| Tours & Programs | `/design/prototypes/14-tours-programs.html` |
| Equipment Rentals | `/design/prototypes/15-rentals.html` |
| Plan Tour | `/design/prototypes/16-plan-tour.html` |

## Design Assets

Standalone HTML files for print/sharing — not part of the Next.js website.

| Asset | File | Purpose |
|-------|------|---------|
| Business Card | `/design/business-card/business-card.html` | Front + back, 3.5x2in, QR code, social handles |
| Athlete Profile | `/design/athlete-profile/athlete-profile.html` | Sponsor portfolio/resume, A4 print-optimized |
| Hotel Pamphlet | `/design/hotel-pamphlet/hotel-pamphlet.html` | A5 flyer for hotel front desks, day experiences only |

### Atul's Credential Ordering

Standard ordering across all materials:

> **Engineer | Mountain Biker | Trail Runner | National Level Athlete**
| Tours & Programs | `/design/prototypes/14-tours-programs.html` |
| Equipment Rentals | `/design/prototypes/15-rentals.html` |
| Plan Tour | `/design/prototypes/16-plan-tour.html` |

## Adding New Experiences

All experience data lives in `/website/lib/experiences.ts`. This is the **single source of truth**.

### Quick Start: Add a Coming Soon Experience

```typescript
// In experiences array, add:
{
  slug: "new-experience-name",
  title: "New Experience Name",
  category: "Mountain Biking",
  categoryValue: "mtb",
  location: "District, Himachal Pradesh",
  image: "https://images.unsplash.com/photo-...",
  distance: "32 km",
  elevation: "1200m",
  difficulty: "Hard",  // "Easy" | "Moderate" | "Hard"
  difficultyLevel: 4,  // 1-5
  duration: "4-5 hrs",
  hasContent: false,   // Shows "Coming Soon"
}
```

### Full Experience (with detail page)

When ready to publish, set `hasContent: true` and add detail fields:

```typescript
{
  // Basic info (required)
  slug: "kuppar-peak-loop",
  title: "Kuppar Peak Loop",
  category: "Mountain Biking",
  categoryValue: "mtb",
  location: "Shimla District, Himachal Pradesh",
  image: "https://...",
  distance: "32 km",
  elevation: "1200m",
  difficulty: "Hard",
  difficultyLevel: 4,
  duration: "4-5 hrs",
  hasContent: true,

  // Additional stats (optional but recommended)
  route: "Shimla → Kuppar Peak → Shimla (Loop)",
  bestSeason: "Mar-Jun, Sep-Nov",
  gear: "MTB · Full-sus recommended",

  // Images (optional)
  heroImage: "https://...",  // High-res hero, defaults to image
  photos: ["url1", "url2", ...],  // Gallery photos, 4-8 recommended

  // Content (optional)
  intro: "Opening hook paragraph (larger text)",
  openingParagraph: "Personal story paragraph",
  content: "Main route description. Use \\n\\n for paragraphs.",
  gettingThere: "How to reach. Supports **bold** markdown.",
  whatToBring: ["Item 1", "Item 2", ...],
  notes: [{ title: "Tip:", text: "Details" }],

  // Media (optional)
  audio: { title: "Trail Notes", duration: "12 min", src: "url" },
  video: { thumbnail: "url", title: "Full Ride", youtubeId: "abc123" },
  stravaActivityId: "1234567890",

  // Author (optional - defaults to Atul Chauhan)
  author: { name: "...", image: "...", credentials: "...", socials: {...} },
}
```

### Category Values

| Category | Value |
|----------|-------|
| Mountain Biking | `mtb` |
| Road Cycling | `road` |
| Gravel Cycling | `gravel` |
| Trail Running | `trail` |
| Road Running | `road-run` |
| Hiking/Trekking | `hiking` |
| Nature Walk | `nature` |
| FKT | `fkt` |

### Where Data Appears

- **Home page**: First 3 experiences (RouteCards)
- **Experiences page**: All experiences with filtering
- **Experience detail**: Full content if `hasContent: true`
- **About page**: Photo gallery from experience images

### Conditional Rendering

All optional fields use conditional rendering:
- Empty strings (`""`) for media will NOT render the section
- Author defaults to `defaultAuthor` (Atul Chauhan)
- Photos default to single image array from card image

---

## Experiences Documentation System

Experiences are documented in `/experiences/` folder before being published to the website.

### Workflow

```
1. After adventure → Fill experience-entry.html
2. Upload GPX → Auto-calculates metrics
3. Add media files to folder
4. "Claude, polish experience XXX" → Generates content
5. Review preview.html → Edit/approve
6. Add to experiences.ts → Publish to website
```

### Polishing Experiences

When asked to "polish experience XXX", follow `/experiences/POLISHING-GUIDE.md` exactly. Key rules:
- **DON'T ADD** - Never invent details not in the raw notes
- **DON'T MISS** - Every practical tip/warning from raw notes MUST appear in final content
- Use the preview template which follows brand design system (forest green, amber, Oswald font)

### Key Files

| File | Purpose |
|------|---------|
| `/experiences/experience-entry.html` | Form to create new experiences (open in browser) |
| `/experiences/dashboard.html` | View all experiences and status |
| `/experiences/POLISHING-GUIDE.md` | Instructions for Claude when polishing (MUST READ) |
| `/experiences/preview-template.html` | Brand-styled template for previews (do not change colors/fonts) |
| `/experiences/scripts/parse-gpx.py` | GPX parser for elevation graphs (25m distance sampling) |
| `/experiences/XXX/experience-data.json` | Single source of truth for each experience |
| `/experiences/XXX/preview.html` | Generated preview (after polishing) |

### experience-data.json Structure

```json
{
  "meta": { "slug", "hasContent", "polished" },
  "basic_info": { "title", "intro", "category", "categoryValue", "difficulty", "difficultyLevel" },
  "location": { "start_point", "end_point", "route", "district", "state", "location" },
  "metrics": { "distance", "elevation", "duration", "max_altitude_m", "strava_activity_id" },
  "website_extras": { "best_season", "gear", "what_to_bring[]" },
  "notes": { "raw_description" },
  "media": { "hero_image", "card_image", "photos[]", "youtube_id", "video_thumbnail" },
  "polished_content": { "website_description", "instagram_caption", "youtube_description" }
}
```

### GPX Auto-Parsing

The experience-entry form parses GPX files to auto-calculate:
- Distance (km) via Haversine formula
- Elevation gain (m)
- Duration from timestamps
- Max/Start altitude

### From Experience to Website

When experience is ready, map `experience-data.json` fields to `experiences.ts`:

| experience-data.json | experiences.ts |
|----------------------|----------------|
| `basic_info.title` | `title` |
| `basic_info.intro` | `intro` |
| `basic_info.categoryValue` | `categoryValue` |
| `basic_info.difficultyLevel` | `difficultyLevel` |
| `location.location` | `location` |
| `metrics.distance` | `distance` |
| `metrics.elevation` | `elevation` |
| `metrics.strava_activity_id` | `stravaActivityId` |
| `website_extras.best_season` | `bestSeason` |
| `website_extras.gear` | `gear` |
| `website_extras.what_to_bring` | `whatToBring` |
| `media.youtube_id` | `video.youtubeId` |
| `polished_content.*` | Content fields |
