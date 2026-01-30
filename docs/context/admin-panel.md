# Admin Panel — Implementation Context

## Status: Code Complete (not yet deployed)

The admin panel is fully coded but requires Supabase project setup before it can run.

## Tech Stack

- **Next.js 16** App Router (server components + server actions)
- **Supabase** for Auth (email/password) + PostgreSQL database
- **Recharts** for pie chart on dashboard
- **Inline styles** throughout (project rule — no Tailwind classes)

## Routes

| Route | Type | Purpose |
|-------|------|---------|
| `/admin` | Server | Dashboard — stats, lead source pie chart, recent activity |
| `/admin/login` | Client | Email/password login form |
| `/admin/leads` | Server+Client | Lead table with search, filters, sort, slide-out detail panel |
| `/admin/marketing` | Server+Client | Checklists (pre-launch + recurring) + hotel partners table |
| `/admin/settings` | Server+Client | Contact info, social links, notification toggles, password change |
| `/api/leads` | API Route | POST endpoint for public form submissions (service-role client) |

## File Map

```
website/
├── middleware.ts                          # Protects /admin/* routes
├── lib/
│   ├── utils.ts                          # shadcn cn() utility
│   ├── types/admin.ts                    # Lead, MarketingTask, HotelPartner, Setting types
│   └── supabase/
│       ├── client.ts                     # Browser client
│       ├── server.ts                     # Server client (cookies)
│       ├── middleware.ts                 # Session management + route protection
│       └── schema.sql                   # Full DB schema with RLS + seed data
├── app/
│   ├── admin/
│   │   ├── layout.tsx                   # Auth check, sidebar + header shell
│   │   ├── page.tsx                     # Dashboard
│   │   ├── components/
│   │   │   ├── AdminSidebar.tsx         # Dark green sidebar with nav
│   │   │   ├── AdminHeader.tsx          # Page title + sign out
│   │   │   ├── StatCard.tsx             # Dashboard stat card
│   │   │   └── LeadSourceChart.tsx      # Recharts pie chart
│   │   ├── login/
│   │   │   ├── page.tsx                 # Login form
│   │   │   └── actions.ts              # login() + logout() server actions
│   │   ├── leads/
│   │   │   ├── page.tsx                 # Server component — fetches leads
│   │   │   ├── actions.ts              # CRUD server actions for leads
│   │   │   └── LeadsTable.tsx           # Client — table + detail panel
│   │   ├── marketing/
│   │   │   ├── page.tsx                 # Server component — fetches tasks + hotels
│   │   │   ├── actions.ts              # Toggle task, CRUD hotel partners
│   │   │   └── MarketingClient.tsx      # Client — tabs for checklists + hotels
│   │   └── settings/
│   │       ├── page.tsx                 # Server component — fetches settings
│   │       ├── actions.ts              # updateSettings(), changePassword()
│   │       └── SettingsClient.tsx       # Client — 4-section settings form
│   └── api/leads/
│       └── route.ts                     # Public POST endpoint (service-role)
├── .env.example                          # Template for env vars
└── components.json                       # shadcn/ui config
```

## Database Schema (schema.sql)

4 tables with RLS:
- **leads** — name, email, phone, nationality, source, source_form, status, notes, follow_up_date, form_data (JSONB)
- **marketing_tasks** — title, category (pre_launch/recurring), platform, frequency, is_completed, sort_order
- **hotel_partners** — hotel_name, contact_person, phone_email, status, notes
- **settings** — key/value store for contact info, social links, notification prefs

Seed data includes 10 pre-launch tasks, 7 recurring tasks, and 9 default settings.

## Setup Instructions (for deployment)

1. Create a Supabase project at supabase.com
2. Go to SQL Editor, paste and run `website/lib/supabase/schema.sql`
3. Go to Authentication > Users > Add User — create admin account (email/password)
4. Copy `.env.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL` — from Supabase project settings
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from API settings
   - `SUPABASE_SERVICE_ROLE_KEY` — from API settings (keep secret)

## Design Notes

- Brand colors: Forest Green `#2D5A3D`, Amber `#D97706`
- Sidebar: Dark green `#1E3D2A`
- Cards: White background, `border-radius: 12px`, `1px solid #E5E7EB`
- Font: Oswald for headings (via `var(--font-heading)`)
- All inline styles — no Tailwind classes
