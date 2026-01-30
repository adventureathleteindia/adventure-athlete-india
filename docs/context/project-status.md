# Adventure Athlete India — Project Status

**Last updated:** 2026-01-29

## What's Done

### Phase 1: Customer-Facing Website (Code Complete)
All pages coded in Next.js, matching HTML prototypes pixel-for-pixel.

| Page | Route | Prototype |
|------|-------|-----------|
| Home | `/` | `01-home.html` |
| Experiences | `/experiences` | `02-experiences.html` |
| Experience Detail | `/experience/[slug]` | `03-experience-detail.html` |
| About | `/about` | `04-about.html` |
| Why AAI | (section in About) | `06-why-aai.html` |
| Contact | `/contact` | `07-contact.html` |
| Plan Your Adventure | `/plan` | `08-plan.html` |
| FAQ | `/faq` | `09-faq.html` |
| Terms | `/terms` | `10-terms.html` |
| Privacy | `/privacy` | `11-privacy.html` |
| Safety | `/safety` | `12-safety.html` |
| Cancellation | `/cancellation` | `13-cancellation.html` |

### Phase 2: Customer-Facing Pages (Code Complete)
Prototypes reviewed, feedback incorporated, pages coded in Next.js.

| Page | Route | Prototype | Status |
|------|-------|-----------|--------|
| Tours & Programs | `/tours-programs` | `14-tours-programs.html` | Coded |
| Equipment Rentals | `/rentals` | `15-rentals.html` | Coded |
| Plan Your Tour (form) | `/plan-tour` | `16-plan-tour.html` | Coded |

Navigation updated to 5 links (Experiences, Tours & Programs, Rentals, About, Contact).
Footer "Experiences" column renamed to "Explore" with links to Experiences, Tours & Programs, Equipment Rentals.

### Phase 2: Admin Panel (Code Complete)
Fully coded, needs Supabase setup to run. See `docs/context/admin-panel.md` for details.

- Dashboard with stats + charts
- Lead Management (table, filters, detail panel)
- Marketing Dashboard (checklists + hotel partners)
- Settings (contact, social, notifications, password)
- Public form API endpoint
- Auth middleware + login page

### Design Assets (Complete)
Standalone HTML files for print/sharing — not part of the Next.js website.

| Asset | File | Purpose |
|-------|------|---------|
| Business Card | `design/business-card/business-card.html` | Front + back, 3.5x2in, QR code, social handles |
| Athlete Profile | `design/athlete-profile/athlete-profile.html` | Sponsor portfolio/resume, A4 print-optimized |
| Hotel Pamphlet | `design/hotel-pamphlet/hotel-pamphlet.html` | A5 flyer for hotel front desks, day experiences only |

Key details:
- Credential ordering: Engineer | Mountain Biker | Trail Runner | National Level Athlete
- Pamphlet focuses on day experiences only (not multi-day tours) — targeted at hotel weekend guests
- Pamphlet experiences: MTB (half-day off-road, full-day mountain ride), Trail Run (summit run, scenic forest run), Hike (Shali Tibba, Kuppar Peak)
- Includes note: "These are just our popular picks — we offer many more routes & custom experiences"

## What's In Progress

- **User reviewing** the coded Phase 2 pages and design assets

## What's Next

### Immediate
1. Incorporate any remaining feedback on Phase 2 pages and design assets
2. Connect public forms to `/api/leads` endpoint

### Deployment
1. Set up Supabase project (create project, run schema.sql, create admin user)
2. Configure `.env.local` with Supabase credentials
3. Deploy to hosting (Vercel or similar)
4. Set up custom domain
5. Test all forms end-to-end

### Future Tasks (see `docs/context/future-tasks.md`)
- Blog/content system
- Map view with GPX downloads
- Testimonials section
- Tour detail pages (full itineraries)
- And more

## Key Files

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Project rules, prototype mapping, experience system, design assets |
| `design/website/2026-01-05-website-design.md` | Full design spec |
| `docs/plans/2026-01-29-admin-panel.md` | Admin panel implementation plan |
| `docs/context/admin-panel.md` | Admin panel technical context |
| `docs/context/future-tasks.md` | Backlog of future work |
| `website/lib/experiences.ts` | Experience data (single source of truth) |
| `website/lib/supabase/schema.sql` | Database schema |
