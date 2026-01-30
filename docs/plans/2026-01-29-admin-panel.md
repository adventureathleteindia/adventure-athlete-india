# Admin Panel Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a complete admin panel at `/admin/*` with Supabase Auth, Lead Management, Marketing Dashboard, and Settings — all protected by authentication.

**Architecture:** Next.js App Router with `/admin` route group. Supabase for auth + PostgreSQL database. Server components for data fetching, client components for interactivity. shadcn/ui for admin UI components. Recharts for charts. Middleware-based route protection redirecting unauthenticated users to `/admin/login`.

**Tech Stack:** Next.js 16 (App Router), Supabase (Auth + PostgreSQL), shadcn/ui (Tailwind v4 compatible), Recharts, TypeScript strict mode

---

## Task 1: Install Dependencies & Initialize shadcn/ui

**Files:**
- Modify: `website/package.json`
- Create: `website/components.json` (shadcn config)
- Modify: `website/app/globals.css` (add shadcn CSS variables)
- Create: `website/lib/utils.ts` (cn utility)

**Step 1: Install Supabase + Recharts**

```bash
cd website
npm install @supabase/supabase-js @supabase/ssr recharts
```

**Step 2: Initialize shadcn/ui**

```bash
npx shadcn@latest init
```

Select: New York style, Zinc base color, CSS variables = yes.

If init fails with Tailwind v4, manually create `components.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "zinc",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

**Step 3: Create cn utility**

Create `website/lib/utils.ts`:

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Install peer deps:
```bash
npm install clsx tailwind-merge
```

**Step 4: Add shadcn CSS variables to globals.css**

Append to `website/app/globals.css` (do NOT overwrite existing @theme — add below it):

```css
/* Admin Panel - shadcn/ui variables */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 142 40% 30%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 142 40% 30%;
    --radius: 0.5rem;
  }
}
```

Note: `--primary` is set to forest green (142 40% 30% ≈ #2D5A3D in HSL).

**Step 5: Install shadcn components we'll need**

```bash
npx shadcn@latest add button card input label select textarea table badge tabs dialog dropdown-menu separator avatar sheet toast
```

**Step 6: Verify build**

```bash
npm run build
```

Expected: Build succeeds with no errors.

**Step 7: Commit**

```bash
git add -A
git commit -m "feat: add Supabase, shadcn/ui, and Recharts dependencies"
```

---

## Task 2: Supabase Project Setup & Environment Variables

**Files:**
- Create: `website/.env.local` (gitignored)
- Create: `website/.env.example`
- Modify: `website/.gitignore`
- Create: `website/lib/supabase/client.ts` (browser client)
- Create: `website/lib/supabase/server.ts` (server client)
- Create: `website/lib/supabase/middleware.ts` (middleware helper)

**Step 1: Create Supabase project**

Go to https://supabase.com → New Project → Name: "adventure-athlete-india"
Copy: Project URL and Anon Key from Settings → API.

**Step 2: Create .env.example**

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**Step 3: Create .env.local with real values**

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

**Step 4: Verify .gitignore includes .env.local**

Check `website/.gitignore` contains `.env.local`. Add if missing.

**Step 5: Create browser Supabase client**

Create `website/lib/supabase/client.ts`:

```typescript
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

**Step 6: Create server Supabase client**

Create `website/lib/supabase/server.ts`:

```typescript
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from Server Component — ignore
          }
        },
      },
    }
  );
}
```

**Step 7: Create middleware helper**

Create `website/lib/supabase/middleware.ts`:

```typescript
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith("/admin") &&
      !request.nextUrl.pathname.startsWith("/admin/login") &&
      !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  // Redirect logged-in users away from login page
  if (request.nextUrl.pathname === "/admin/login" && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
```

**Step 8: Verify dev server starts**

```bash
npm run dev
```

Expected: Server starts without errors.

**Step 9: Commit**

```bash
git add website/lib/supabase/ website/.env.example
git commit -m "feat: add Supabase client setup (browser, server, middleware)"
```

---

## Task 3: Auth Middleware & Login Page

**Files:**
- Create: `website/middleware.ts`
- Create: `website/app/admin/login/page.tsx`
- Create: `website/app/admin/login/actions.ts` (server actions)

**Step 1: Create middleware**

Create `website/middleware.ts`:

```typescript
import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: ["/admin/:path*"],
};
```

**Step 2: Create login server actions**

Create `website/app/admin/login/actions.ts`:

```typescript
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin", "layout");
  redirect("/admin");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/admin/login");
}
```

**Step 3: Create login page**

Create `website/app/admin/login/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { login } from "./actions";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #1E3D2A 0%, #2D5A3D 50%, #1E3D2A 100%)",
      fontFamily: "var(--font-body)",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "400px",
        padding: "40px",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "28px",
            fontWeight: 400,
            color: "#2D5A3D",
            marginBottom: "8px",
          }}>
            Adventure Athlete India
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px" }}>Admin Panel</p>
        </div>

        <form action={handleSubmit}>
          {error && (
            <div style={{
              padding: "12px",
              background: "#FEF2F2",
              border: "1px solid #FECACA",
              borderRadius: "8px",
              color: "#DC2626",
              fontSize: "14px",
              marginBottom: "20px",
            }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: "16px" }}>
            <label style={{
              display: "block",
              fontSize: "14px",
              fontWeight: 500,
              color: "#374151",
              marginBottom: "6px",
            }}>
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              style={{
                width: "100%",
                padding: "10px 14px",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                fontSize: "15px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{
              display: "block",
              fontSize: "14px",
              fontWeight: 500,
              color: "#374151",
              marginBottom: "6px",
            }}>
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              style={{
                width: "100%",
                padding: "10px 14px",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                fontSize: "15px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              background: loading ? "#9CA3AF" : "#2D5A3D",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.2s",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
```

**Step 4: Test manually**

```bash
npm run dev
```

Navigate to `http://localhost:3000/admin` — should redirect to `/admin/login`.
Navigate to `http://localhost:3000/admin/login` — should show login form.

**Step 5: Commit**

```bash
git add website/middleware.ts website/app/admin/
git commit -m "feat: add admin authentication with Supabase Auth + login page"
```

---

## Task 4: Database Schema (Supabase SQL)

**Files:**
- Create: `website/lib/supabase/schema.sql` (reference file, run in Supabase dashboard)
- Create: `website/lib/types/admin.ts` (TypeScript types)

**Step 1: Create database schema SQL**

Create `website/lib/supabase/schema.sql`:

```sql
-- Leads table
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  nationality TEXT,
  source TEXT NOT NULL DEFAULT 'website',
  source_form TEXT NOT NULL DEFAULT 'contact',
  status TEXT NOT NULL DEFAULT 'new',
  notes TEXT DEFAULT '',
  follow_up_date DATE,
  form_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lead status constraint
ALTER TABLE leads ADD CONSTRAINT valid_status
  CHECK (status IN ('new', 'contacted', 'in_discussion', 'booked', 'completed', 'archived'));

-- Lead source_form constraint
ALTER TABLE leads ADD CONSTRAINT valid_source_form
  CHECK (source_form IN ('contact', 'plan', 'plan_tour', 'gpx_download', 'rental'));

-- Marketing tasks table
CREATE TABLE marketing_tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'pre_launch',
  platform TEXT,
  frequency TEXT,
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Marketing task category constraint
ALTER TABLE marketing_tasks ADD CONSTRAINT valid_category
  CHECK (category IN ('pre_launch', 'recurring'));

-- Hotel partnerships table
CREATE TABLE hotel_partners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hotel_name TEXT NOT NULL,
  contact_person TEXT,
  phone_email TEXT,
  status TEXT NOT NULL DEFAULT 'pitched',
  last_contacted DATE,
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hotel status constraint
ALTER TABLE hotel_partners ADD CONSTRAINT valid_hotel_status
  CHECK (status IN ('pitched', 'interested', 'active', 'declined'));

-- Settings table (key-value store)
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed default settings
INSERT INTO settings (key, value) VALUES
  ('contact_phone', '+91-9459033240'),
  ('contact_email', 'adventureathleteindia@gmail.com'),
  ('contact_address', 'Shimla, HP, India'),
  ('social_instagram', 'https://instagram.com/adventureathlete.in'),
  ('social_youtube', 'https://youtube.com/@adventureathleindia'),
  ('social_strava', 'https://strava.com/athletes/atulchauhan'),
  ('social_facebook', 'https://facebook.com/AdventureAthleteIndia'),
  ('notify_new_leads', 'true'),
  ('notify_overdue_followups', 'true');

-- Seed pre-launch marketing tasks
INSERT INTO marketing_tasks (title, category, platform, sort_order) VALUES
  ('Set up Google Business Profile', 'pre_launch', 'Google', 1),
  ('Set up Instagram Business account', 'pre_launch', 'Instagram', 2),
  ('Set up Facebook Page', 'pre_launch', 'Facebook', 3),
  ('Set up YouTube channel', 'pre_launch', 'YouTube', 4),
  ('Set up Google Analytics on website', 'pre_launch', 'Google', 5),
  ('Create WhatsApp Business profile', 'pre_launch', 'WhatsApp', 6),
  ('Design business cards / digital pamphlet', 'pre_launch', 'Design', 7),
  ('List on Google Maps as adventure guide', 'pre_launch', 'Google', 8),
  ('List on TripAdvisor as local experience', 'pre_launch', 'TripAdvisor', 9),
  ('Finalize domain (adventureathleteindia.com)', 'pre_launch', 'Domain', 10);

-- Seed recurring marketing tasks
INSERT INTO marketing_tasks (title, category, platform, frequency, sort_order) VALUES
  ('Post on Instagram', 'recurring', 'Instagram', '3x/week', 1),
  ('Share Instagram story', 'recurring', 'Instagram', 'Daily', 2),
  ('Post YouTube video', 'recurring', 'YouTube', '1x/month', 3),
  ('Respond to inquiries within 24hrs', 'recurring', 'WhatsApp', 'Ongoing', 4),
  ('Ask completed clients for Google/TripAdvisor review', 'recurring', 'Google', 'After each tour', 5),
  ('Share experience on Strava', 'recurring', 'Strava', 'After each ride/run', 6),
  ('Update website with new experience', 'recurring', 'Website', 'After each adventure', 7);

-- Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Policies: Only authenticated users can access
CREATE POLICY "Authenticated users can read leads" ON leads FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert leads" ON leads FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update leads" ON leads FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete leads" ON leads FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can read marketing_tasks" ON marketing_tasks FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can update marketing_tasks" ON marketing_tasks FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can read hotel_partners" ON hotel_partners FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert hotel_partners" ON hotel_partners FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update hotel_partners" ON hotel_partners FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete hotel_partners" ON hotel_partners FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can read settings" ON settings FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can update settings" ON settings FOR UPDATE TO authenticated USING (true);

-- Also allow anonymous inserts to leads (for public form submissions)
CREATE POLICY "Anyone can submit leads" ON leads FOR INSERT TO anon WITH CHECK (true);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER hotel_partners_updated_at BEFORE UPDATE ON hotel_partners
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER settings_updated_at BEFORE UPDATE ON settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

**Step 2: Run SQL in Supabase Dashboard**

Go to Supabase Dashboard → SQL Editor → Paste and run the entire script.

**Step 3: Create admin user**

In Supabase Dashboard → Authentication → Users → "Add User":
- Email: adventureathleteindia@gmail.com
- Password: (secure password)
- Auto-confirm: Yes

**Step 4: Create TypeScript types**

Create `website/lib/types/admin.ts`:

```typescript
export type LeadStatus = "new" | "contacted" | "in_discussion" | "booked" | "completed" | "archived";
export type SourceForm = "contact" | "plan" | "plan_tour" | "gpx_download" | "rental";
export type HotelStatus = "pitched" | "interested" | "active" | "declined";
export type MarketingCategory = "pre_launch" | "recurring";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  nationality: string | null;
  source: string;
  source_form: SourceForm;
  status: LeadStatus;
  notes: string;
  follow_up_date: string | null;
  form_data: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface MarketingTask {
  id: string;
  title: string;
  category: MarketingCategory;
  platform: string | null;
  frequency: string | null;
  is_completed: boolean;
  completed_at: string | null;
  sort_order: number;
  created_at: string;
}

export interface HotelPartner {
  id: string;
  hotel_name: string;
  contact_person: string | null;
  phone_email: string | null;
  status: HotelStatus;
  last_contacted: string | null;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface Setting {
  key: string;
  value: string;
  updated_at: string;
}

export const LEAD_STATUS_CONFIG: Record<LeadStatus, { label: string; color: string }> = {
  new: { label: "New", color: "#3B82F6" },
  contacted: { label: "Contacted", color: "#EAB308" },
  in_discussion: { label: "In Discussion", color: "#F97316" },
  booked: { label: "Booked", color: "#22C55E" },
  completed: { label: "Completed", color: "#9CA3AF" },
  archived: { label: "Archived", color: "#D1D5DB" },
};

export const HOTEL_STATUS_CONFIG: Record<HotelStatus, { label: string; color: string }> = {
  pitched: { label: "Pitched", color: "#3B82F6" },
  interested: { label: "Interested", color: "#EAB308" },
  active: { label: "Active Partner", color: "#22C55E" },
  declined: { label: "Declined", color: "#9CA3AF" },
};
```

**Step 5: Commit**

```bash
git add website/lib/supabase/schema.sql website/lib/types/admin.ts
git commit -m "feat: add database schema and TypeScript types for admin panel"
```

---

## Task 5: Admin Layout (Sidebar + Shell)

**Files:**
- Create: `website/app/admin/layout.tsx`
- Create: `website/app/admin/components/AdminSidebar.tsx`
- Create: `website/app/admin/components/AdminHeader.tsx`
- Create: `website/app/admin/page.tsx` (placeholder)

**Step 1: Create AdminSidebar component**

Create `website/app/admin/components/AdminSidebar.tsx`:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    label: "Leads",
    href: "/admin/leads",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: "Marketing",
    href: "/admin/marketing",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
      </svg>
    ),
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside style={{
      width: "240px",
      minHeight: "100vh",
      background: "#1E3D2A",
      color: "white",
      display: "flex",
      flexDirection: "column",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 50,
    }}>
      {/* Logo */}
      <div style={{
        padding: "24px 20px",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}>
        <Link href="/admin" style={{ textDecoration: "none", color: "white" }}>
          <div style={{
            fontFamily: "var(--font-heading)",
            fontSize: "18px",
            fontWeight: 400,
            letterSpacing: "1px",
          }}>
            Adventure Athlete
          </div>
          <div style={{
            fontSize: "11px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            opacity: 0.6,
            marginTop: "4px",
          }}>
            Admin Panel
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav style={{ padding: "16px 12px", flex: 1 }}>
        {navItems.map((item) => {
          const isActive = item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 12px",
                borderRadius: "8px",
                textDecoration: "none",
                color: isActive ? "white" : "rgba(255,255,255,0.7)",
                background: isActive ? "rgba(255,255,255,0.15)" : "transparent",
                fontSize: "14px",
                fontWeight: isActive ? 600 : 400,
                marginBottom: "4px",
                transition: "all 0.2s",
              }}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* View Site Link */}
      <div style={{
        padding: "16px 20px",
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}>
        <Link
          href="/"
          target="_blank"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "rgba(255,255,255,0.5)",
            textDecoration: "none",
            fontSize: "13px",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          View Website
        </Link>
      </div>
    </aside>
  );
}
```

**Step 2: Create AdminHeader component**

Create `website/app/admin/components/AdminHeader.tsx`:

```tsx
"use client";

import { usePathname } from "next/navigation";
import { logout } from "../login/actions";

const pageTitle: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/leads": "Lead Management",
  "/admin/marketing": "Marketing",
  "/admin/settings": "Settings",
};

export default function AdminHeader() {
  const pathname = usePathname();
  const title = pageTitle[pathname] || "Admin";

  return (
    <header style={{
      height: "64px",
      borderBottom: "1px solid #E5E7EB",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 32px",
      background: "white",
    }}>
      <h1 style={{
        fontFamily: "var(--font-heading)",
        fontSize: "22px",
        fontWeight: 400,
        color: "#1A202C",
      }}>
        {title}
      </h1>

      <button
        onClick={() => logout()}
        style={{
          padding: "8px 16px",
          background: "transparent",
          border: "1px solid #E5E7EB",
          borderRadius: "6px",
          fontSize: "13px",
          color: "#64748b",
          cursor: "pointer",
        }}
      >
        Sign Out
      </button>
    </header>
  );
}
```

**Step 3: Create admin layout**

Create `website/app/admin/layout.tsx`:

```tsx
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";

export const metadata = {
  title: "Admin | Adventure Athlete India",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Don't apply admin layout to login page
  if (!user) {
    return <>{children}</>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F9FAFB" }}>
      <AdminSidebar />
      <div style={{ flex: 1, marginLeft: "240px" }}>
        <AdminHeader />
        <main style={{ padding: "32px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
```

**Step 4: Create dashboard placeholder**

Create `website/app/admin/page.tsx`:

```tsx
export default function AdminDashboard() {
  return (
    <div>
      <p style={{ color: "#64748b" }}>Dashboard coming soon...</p>
    </div>
  );
}
```

**Step 5: Test manually**

Login at `/admin/login` → should redirect to `/admin` → should show sidebar + header + placeholder.

**Step 6: Commit**

```bash
git add website/app/admin/
git commit -m "feat: add admin layout with sidebar navigation and header"
```

---

## Task 6: Dashboard Page (Stats + Recent Activity)

**Files:**
- Modify: `website/app/admin/page.tsx`
- Create: `website/app/admin/components/StatCard.tsx`
- Create: `website/app/admin/components/LeadSourceChart.tsx`

**Step 1: Create StatCard component**

Create `website/app/admin/components/StatCard.tsx`:

```tsx
interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  color?: string;
  alert?: boolean;
}

export default function StatCard({ title, value, subtitle, color = "#2D5A3D", alert = false }: StatCardProps) {
  return (
    <div style={{
      background: "white",
      borderRadius: "12px",
      padding: "24px",
      border: alert ? "1px solid #FECACA" : "1px solid #E5E7EB",
    }}>
      <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "8px" }}>{title}</p>
      <p style={{
        fontSize: "36px",
        fontFamily: "var(--font-heading)",
        fontWeight: 400,
        color: alert ? "#DC2626" : color,
        lineHeight: 1,
      }}>
        {value}
      </p>
      {subtitle && (
        <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "8px" }}>{subtitle}</p>
      )}
    </div>
  );
}
```

**Step 2: Create LeadSourceChart component**

Create `website/app/admin/components/LeadSourceChart.tsx`:

```tsx
"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const COLORS = ["#2D5A3D", "#D97706", "#3B82F6", "#22C55E", "#EAB308", "#F97316", "#8B5CF6", "#9CA3AF"];

interface LeadSourceChartProps {
  data: { name: string; value: number }[];
}

export default function LeadSourceChart({ data }: LeadSourceChartProps) {
  if (data.length === 0) {
    return (
      <div style={{
        background: "white",
        borderRadius: "12px",
        padding: "24px",
        border: "1px solid #E5E7EB",
        textAlign: "center",
        color: "#94a3b8",
        fontSize: "14px",
      }}>
        <p style={{ marginBottom: "8px", fontWeight: 500, color: "#374151" }}>Lead Sources</p>
        <p>No leads yet. They&apos;ll show up here once forms start coming in.</p>
      </div>
    );
  }

  return (
    <div style={{
      background: "white",
      borderRadius: "12px",
      padding: "24px",
      border: "1px solid #E5E7EB",
    }}>
      <p style={{ fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "16px" }}>
        Lead Sources This Month
      </p>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
```

**Step 3: Build full dashboard page**

Replace `website/app/admin/page.tsx`:

```tsx
import { createClient } from "@/lib/supabase/server";
import StatCard from "./components/StatCard";
import LeadSourceChart from "./components/LeadSourceChart";
import { LEAD_STATUS_CONFIG } from "@/lib/types/admin";
import type { Lead } from "@/lib/types/admin";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch lead counts
  const { data: leads } = await supabase.from("leads").select("*");
  const allLeads = (leads || []) as Lead[];

  const now = new Date();
  const thisWeekStart = new Date(now);
  thisWeekStart.setDate(now.getDate() - now.getDay());
  thisWeekStart.setHours(0, 0, 0, 0);

  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const newLeads = allLeads.filter(l => l.status === "new").length;
  const inDiscussion = allLeads.filter(l => l.status === "in_discussion").length;
  const bookedThisMonth = allLeads.filter(
    l => l.status === "booked" && new Date(l.created_at) >= thisMonthStart
  ).length;
  const overdueFollowups = allLeads.filter(
    l => l.follow_up_date && new Date(l.follow_up_date) < now && !["completed", "archived"].includes(l.status)
  ).length;

  // Lead sources for pie chart
  const sourceMap: Record<string, number> = {};
  allLeads
    .filter(l => new Date(l.created_at) >= thisMonthStart)
    .forEach(l => {
      sourceMap[l.source] = (sourceMap[l.source] || 0) + 1;
    });
  const sourceData = Object.entries(sourceMap).map(([name, value]) => ({ name, value }));

  // Recent activity (last 5 updated leads)
  const recentLeads = [...allLeads]
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 5);

  return (
    <div>
      {/* Stats Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        marginBottom: "32px",
      }}>
        <StatCard title="New Leads" value={newLeads} subtitle="This week" color="#3B82F6" />
        <StatCard title="In Discussion" value={inDiscussion} color="#F97316" />
        <StatCard title="Booked This Month" value={bookedThisMonth} color="#22C55E" />
        <StatCard title="Pending Follow-ups" value={overdueFollowups} alert={overdueFollowups > 0} subtitle={overdueFollowups > 0 ? "Overdue!" : "All clear"} />
      </div>

      {/* Chart + Recent Activity */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <LeadSourceChart data={sourceData} />

        {/* Recent Activity */}
        <div style={{
          background: "white",
          borderRadius: "12px",
          padding: "24px",
          border: "1px solid #E5E7EB",
        }}>
          <p style={{ fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "16px" }}>
            Recent Activity
          </p>
          {recentLeads.length === 0 ? (
            <p style={{ color: "#94a3b8", fontSize: "14px" }}>No leads yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {recentLeads.map((lead) => (
                <div key={lead.id} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px",
                  borderRadius: "8px",
                  background: "#F9FAFB",
                }}>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 500, color: "#1A202C" }}>{lead.name}</p>
                    <p style={{ fontSize: "12px", color: "#94a3b8" }}>{lead.source_form} form</p>
                  </div>
                  <span style={{
                    padding: "4px 10px",
                    borderRadius: "12px",
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "white",
                    background: LEAD_STATUS_CONFIG[lead.status].color,
                  }}>
                    {LEAD_STATUS_CONFIG[lead.status].label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

**Step 4: Verify in browser**

Navigate to `/admin` — should show 4 stat cards + pie chart + recent activity.

**Step 5: Commit**

```bash
git add website/app/admin/
git commit -m "feat: add admin dashboard with stats, lead sources chart, recent activity"
```

---

## Task 7: Lead Management Page

**Files:**
- Create: `website/app/admin/leads/page.tsx`
- Create: `website/app/admin/leads/actions.ts`
- Create: `website/app/admin/leads/LeadsTable.tsx`
- Create: `website/app/admin/leads/LeadDetail.tsx`

**Step 1: Create server actions for leads**

Create `website/app/admin/leads/actions.ts`:

```typescript
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { LeadStatus } from "@/lib/types/admin";

export async function updateLeadStatus(id: string, status: LeadStatus) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("leads")
    .update({ status })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}

export async function updateLeadNotes(id: string, notes: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("leads")
    .update({ notes })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/leads");
}

export async function updateLeadFollowUp(id: string, follow_up_date: string | null) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("leads")
    .update({ follow_up_date })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/leads");
}

export async function deleteLead(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("leads").delete().eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}
```

**Step 2: Create LeadsTable client component**

Create `website/app/admin/leads/LeadsTable.tsx`:

```tsx
"use client";

import { useState } from "react";
import type { Lead, LeadStatus } from "@/lib/types/admin";
import { LEAD_STATUS_CONFIG } from "@/lib/types/admin";
import { updateLeadStatus, updateLeadNotes, updateLeadFollowUp, deleteLead } from "./actions";

interface LeadsTableProps {
  leads: Lead[];
}

export default function LeadsTable({ leads: initialLeads }: LeadsTableProps) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterSource, setFilterSource] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"created_at" | "name" | "status">("created_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const statuses: LeadStatus[] = ["new", "contacted", "in_discussion", "booked", "completed", "archived"];
  const sources = [...new Set(initialLeads.map(l => l.source_form))];

  let filtered = initialLeads.filter(lead => {
    if (filterStatus !== "all" && lead.status !== filterStatus) return false;
    if (filterSource !== "all" && lead.source_form !== filterSource) return false;
    if (search && !lead.name.toLowerCase().includes(search.toLowerCase()) &&
        !lead.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  filtered = filtered.sort((a, b) => {
    const dir = sortDir === "asc" ? 1 : -1;
    if (sortBy === "name") return dir * a.name.localeCompare(b.name);
    if (sortBy === "status") return dir * a.status.localeCompare(b.status);
    return dir * (new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  });

  function handleSort(col: typeof sortBy) {
    if (sortBy === col) {
      setSortDir(d => d === "asc" ? "desc" : "asc");
    } else {
      setSortBy(col);
      setSortDir("desc");
    }
  }

  return (
    <div style={{ display: "flex", gap: "24px" }}>
      {/* Table */}
      <div style={{ flex: 1 }}>
        {/* Filters */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "8px 14px",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              fontSize: "14px",
              width: "250px",
              outline: "none",
            }}
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: "8px 14px",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none",
            }}
          >
            <option value="all">All Statuses</option>
            {statuses.map(s => (
              <option key={s} value={s}>{LEAD_STATUS_CONFIG[s].label}</option>
            ))}
          </select>
          <select
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
            style={{
              padding: "8px 14px",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none",
            }}
          >
            <option value="all">All Sources</option>
            {sources.map(s => (
              <option key={s} value={s}>{s.replace("_", " ")}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div style={{
          background: "white",
          borderRadius: "12px",
          border: "1px solid #E5E7EB",
          overflow: "hidden",
        }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
                <th onClick={() => handleSort("name")} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 500, color: "#374151", cursor: "pointer" }}>
                  Name {sortBy === "name" && (sortDir === "asc" ? "↑" : "↓")}
                </th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 500, color: "#374151" }}>Email</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 500, color: "#374151" }}>Source</th>
                <th onClick={() => handleSort("created_at")} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 500, color: "#374151", cursor: "pointer" }}>
                  Date {sortBy === "created_at" && (sortDir === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("status")} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 500, color: "#374151", cursor: "pointer" }}>
                  Status {sortBy === "status" && (sortDir === "asc" ? "↑" : "↓")}
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "40px", textAlign: "center", color: "#94a3b8" }}>
                    {initialLeads.length === 0 ? "No leads yet. They'll appear here when forms get submitted." : "No leads match your filters."}
                  </td>
                </tr>
              ) : (
                filtered.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    style={{
                      borderBottom: "1px solid #F3F4F6",
                      cursor: "pointer",
                      background: selectedLead?.id === lead.id ? "#F0FDF4" : "transparent",
                    }}
                  >
                    <td style={{ padding: "12px 16px", fontWeight: 500 }}>{lead.name}</td>
                    <td style={{ padding: "12px 16px", color: "#64748b" }}>{lead.email}</td>
                    <td style={{ padding: "12px 16px", color: "#64748b" }}>{lead.source_form.replace("_", " ")}</td>
                    <td style={{ padding: "12px 16px", color: "#64748b" }}>
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{
                        padding: "4px 10px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "white",
                        background: LEAD_STATUS_CONFIG[lead.status].color,
                      }}>
                        {LEAD_STATUS_CONFIG[lead.status].label}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Panel */}
      {selectedLead && (
        <LeadDetailPanel
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}
    </div>
  );
}

function LeadDetailPanel({ lead, onClose }: { lead: Lead; onClose: () => void }) {
  const [notes, setNotes] = useState(lead.notes);
  const [followUp, setFollowUp] = useState(lead.follow_up_date || "");
  const [saving, setSaving] = useState(false);

  const statuses: LeadStatus[] = ["new", "contacted", "in_discussion", "booked", "completed", "archived"];

  async function handleStatusChange(status: LeadStatus) {
    await updateLeadStatus(lead.id, status);
  }

  async function handleSaveNotes() {
    setSaving(true);
    await updateLeadNotes(lead.id, notes);
    setSaving(false);
  }

  async function handleSaveFollowUp() {
    await updateLeadFollowUp(lead.id, followUp || null);
  }

  async function handleDelete() {
    if (confirm("Delete this lead permanently?")) {
      await deleteLead(lead.id);
      onClose();
    }
  }

  return (
    <div style={{
      width: "380px",
      background: "white",
      borderRadius: "12px",
      border: "1px solid #E5E7EB",
      padding: "24px",
      position: "sticky",
      top: "96px",
      maxHeight: "calc(100vh - 128px)",
      overflowY: "auto",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "20px", fontWeight: 400 }}>{lead.name}</h3>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: "18px" }}>✕</button>
      </div>

      {/* Contact Info */}
      <div style={{ marginBottom: "20px" }}>
        <p style={{ fontSize: "14px", color: "#64748b" }}>{lead.email}</p>
        {lead.phone && (
          <p style={{ fontSize: "14px", marginTop: "4px" }}>
            <a href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" style={{ color: "#22C55E", textDecoration: "none" }}>
              WhatsApp: {lead.phone}
            </a>
          </p>
        )}
        {lead.nationality && <p style={{ fontSize: "13px", color: "#94a3b8", marginTop: "4px" }}>{lead.nationality}</p>}
      </div>

      {/* Status */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontSize: "13px", fontWeight: 500, color: "#374151", display: "block", marginBottom: "6px" }}>Status</label>
        <select
          value={lead.status}
          onChange={(e) => handleStatusChange(e.target.value as LeadStatus)}
          style={{
            width: "100%",
            padding: "8px 12px",
            border: "1px solid #E5E7EB",
            borderRadius: "8px",
            fontSize: "14px",
            outline: "none",
          }}
        >
          {statuses.map(s => (
            <option key={s} value={s}>{LEAD_STATUS_CONFIG[s].label}</option>
          ))}
        </select>
      </div>

      {/* Follow-up Date */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontSize: "13px", fontWeight: 500, color: "#374151", display: "block", marginBottom: "6px" }}>Follow-up Date</label>
        <input
          type="date"
          value={followUp}
          onChange={(e) => setFollowUp(e.target.value)}
          onBlur={handleSaveFollowUp}
          style={{
            width: "100%",
            padding: "8px 12px",
            border: "1px solid #E5E7EB",
            borderRadius: "8px",
            fontSize: "14px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Notes */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontSize: "13px", fontWeight: 500, color: "#374151", display: "block", marginBottom: "6px" }}>Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          style={{
            width: "100%",
            padding: "8px 12px",
            border: "1px solid #E5E7EB",
            borderRadius: "8px",
            fontSize: "14px",
            outline: "none",
            resize: "vertical",
            boxSizing: "border-box",
          }}
        />
        <button
          onClick={handleSaveNotes}
          disabled={saving}
          style={{
            marginTop: "8px",
            padding: "6px 16px",
            background: "#2D5A3D",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          {saving ? "Saving..." : "Save Notes"}
        </button>
      </div>

      {/* Form Data */}
      {Object.keys(lead.form_data).length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "13px", fontWeight: 500, color: "#374151", display: "block", marginBottom: "8px" }}>Form Submission</label>
          <div style={{ background: "#F9FAFB", borderRadius: "8px", padding: "12px", fontSize: "13px" }}>
            {Object.entries(lead.form_data).map(([key, value]) => (
              <div key={key} style={{ marginBottom: "6px" }}>
                <span style={{ color: "#64748b" }}>{key.replace(/_/g, " ")}: </span>
                <span style={{ color: "#1A202C" }}>{String(value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Meta */}
      <div style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "16px" }}>
        <p>Source: {lead.source_form.replace("_", " ")} form</p>
        <p>Created: {new Date(lead.created_at).toLocaleString()}</p>
        <p>Updated: {new Date(lead.updated_at).toLocaleString()}</p>
      </div>

      {/* Delete */}
      <button
        onClick={handleDelete}
        style={{
          width: "100%",
          padding: "8px",
          background: "transparent",
          color: "#DC2626",
          border: "1px solid #FECACA",
          borderRadius: "6px",
          fontSize: "13px",
          cursor: "pointer",
        }}
      >
        Delete Lead
      </button>
    </div>
  );
}
```

**Step 3: Create leads page**

Create `website/app/admin/leads/page.tsx`:

```tsx
import { createClient } from "@/lib/supabase/server";
import type { Lead } from "@/lib/types/admin";
import LeadsTable from "./LeadsTable";

export default async function LeadsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  const leads = (data || []) as Lead[];

  return <LeadsTable leads={leads} />;
}
```

**Step 4: Test in browser**

Navigate to `/admin/leads` — should show table with filters, search, and detail panel.

**Step 5: Commit**

```bash
git add website/app/admin/leads/
git commit -m "feat: add lead management page with table, filters, detail panel"
```

---

## Task 8: Marketing Dashboard Page

**Files:**
- Create: `website/app/admin/marketing/page.tsx`
- Create: `website/app/admin/marketing/actions.ts`
- Create: `website/app/admin/marketing/MarketingClient.tsx`

**Step 1: Create server actions**

Create `website/app/admin/marketing/actions.ts`:

```typescript
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { HotelStatus } from "@/lib/types/admin";

export async function toggleTask(id: string, isCompleted: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("marketing_tasks")
    .update({
      is_completed: isCompleted,
      completed_at: isCompleted ? new Date().toISOString() : null,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/marketing");
}

export async function addHotelPartner(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("hotel_partners").insert({
    hotel_name: formData.get("hotel_name") as string,
    contact_person: formData.get("contact_person") as string || null,
    phone_email: formData.get("phone_email") as string || null,
    status: "pitched",
    notes: formData.get("notes") as string || "",
  });

  if (error) throw new Error(error.message);
  revalidatePath("/admin/marketing");
}

export async function updateHotelStatus(id: string, status: HotelStatus) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("hotel_partners")
    .update({ status })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/marketing");
}

export async function deleteHotelPartner(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("hotel_partners").delete().eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/marketing");
}
```

**Step 2: Create MarketingClient component**

Create `website/app/admin/marketing/MarketingClient.tsx`:

```tsx
"use client";

import { useState } from "react";
import type { MarketingTask, HotelPartner, HotelStatus } from "@/lib/types/admin";
import { HOTEL_STATUS_CONFIG } from "@/lib/types/admin";
import { toggleTask, addHotelPartner, updateHotelStatus, deleteHotelPartner } from "./actions";

interface MarketingClientProps {
  preLaunchTasks: MarketingTask[];
  recurringTasks: MarketingTask[];
  hotelPartners: HotelPartner[];
}

export default function MarketingClient({ preLaunchTasks, recurringTasks, hotelPartners }: MarketingClientProps) {
  const [activeTab, setActiveTab] = useState<"checklist" | "hotels">("checklist");
  const [showAddHotel, setShowAddHotel] = useState(false);

  const preLaunchDone = preLaunchTasks.filter(t => t.is_completed).length;
  const recurringDone = recurringTasks.filter(t => t.is_completed).length;

  return (
    <div>
      {/* Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
        <button
          onClick={() => setActiveTab("checklist")}
          style={{
            padding: "8px 20px",
            borderRadius: "8px",
            border: "1px solid #E5E7EB",
            background: activeTab === "checklist" ? "#2D5A3D" : "white",
            color: activeTab === "checklist" ? "white" : "#374151",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Checklists
        </button>
        <button
          onClick={() => setActiveTab("hotels")}
          style={{
            padding: "8px 20px",
            borderRadius: "8px",
            border: "1px solid #E5E7EB",
            background: activeTab === "hotels" ? "#2D5A3D" : "white",
            color: activeTab === "hotels" ? "white" : "#374151",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Hotel Partners
        </button>
      </div>

      {activeTab === "checklist" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Pre-Launch */}
          <div style={{ background: "white", borderRadius: "12px", border: "1px solid #E5E7EB", padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "18px", fontWeight: 400 }}>Pre-Launch Checklist</h3>
              <span style={{ fontSize: "13px", color: "#64748b" }}>{preLaunchDone}/{preLaunchTasks.length} done</span>
            </div>
            <div style={{ background: "#F3F4F6", borderRadius: "6px", height: "6px", marginBottom: "20px" }}>
              <div style={{ background: "#2D5A3D", borderRadius: "6px", height: "6px", width: `${preLaunchTasks.length ? (preLaunchDone / preLaunchTasks.length) * 100 : 0}%`, transition: "width 0.3s" }} />
            </div>
            {preLaunchTasks.map((task) => (
              <TaskRow key={task.id} task={task} />
            ))}
          </div>

          {/* Recurring */}
          <div style={{ background: "white", borderRadius: "12px", border: "1px solid #E5E7EB", padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "18px", fontWeight: 400 }}>Recurring Tasks</h3>
              <span style={{ fontSize: "13px", color: "#64748b" }}>{recurringDone}/{recurringTasks.length} done this period</span>
            </div>
            {recurringTasks.map((task) => (
              <TaskRow key={task.id} task={task} showFrequency />
            ))}
          </div>
        </div>
      ) : (
        <div style={{ background: "white", borderRadius: "12px", border: "1px solid #E5E7EB", padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "18px", fontWeight: 400 }}>Hotel Partnerships</h3>
            <button
              onClick={() => setShowAddHotel(true)}
              style={{
                padding: "8px 16px",
                background: "#2D5A3D",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              + Add Hotel
            </button>
          </div>

          {/* Add Hotel Form */}
          {showAddHotel && (
            <form action={async (formData) => {
              await addHotelPartner(formData);
              setShowAddHotel(false);
            }} style={{
              background: "#F9FAFB",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "20px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}>
              <input name="hotel_name" placeholder="Hotel Name *" required style={{ padding: "8px 12px", border: "1px solid #E5E7EB", borderRadius: "6px", fontSize: "14px" }} />
              <input name="contact_person" placeholder="Contact Person" style={{ padding: "8px 12px", border: "1px solid #E5E7EB", borderRadius: "6px", fontSize: "14px" }} />
              <input name="phone_email" placeholder="Phone / Email" style={{ padding: "8px 12px", border: "1px solid #E5E7EB", borderRadius: "6px", fontSize: "14px" }} />
              <input name="notes" placeholder="Notes" style={{ padding: "8px 12px", border: "1px solid #E5E7EB", borderRadius: "6px", fontSize: "14px" }} />
              <div style={{ gridColumn: "1 / -1", display: "flex", gap: "8px" }}>
                <button type="submit" style={{ padding: "8px 16px", background: "#2D5A3D", color: "white", border: "none", borderRadius: "6px", fontSize: "13px", cursor: "pointer" }}>Add</button>
                <button type="button" onClick={() => setShowAddHotel(false)} style={{ padding: "8px 16px", background: "white", border: "1px solid #E5E7EB", borderRadius: "6px", fontSize: "13px", cursor: "pointer" }}>Cancel</button>
              </div>
            </form>
          )}

          {/* Hotels Table */}
          {hotelPartners.length === 0 ? (
            <p style={{ color: "#94a3b8", fontSize: "14px", textAlign: "center", padding: "40px" }}>
              No hotel partners yet. Start reaching out to hotels in your area!
            </p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
                  <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: 500, color: "#374151" }}>Hotel</th>
                  <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: 500, color: "#374151" }}>Contact</th>
                  <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: 500, color: "#374151" }}>Status</th>
                  <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: 500, color: "#374151" }}>Notes</th>
                  <th style={{ padding: "10px 12px", textAlign: "right", fontWeight: 500, color: "#374151" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {hotelPartners.map((hotel) => (
                  <tr key={hotel.id} style={{ borderBottom: "1px solid #F3F4F6" }}>
                    <td style={{ padding: "10px 12px", fontWeight: 500 }}>{hotel.hotel_name}</td>
                    <td style={{ padding: "10px 12px", color: "#64748b" }}>
                      {hotel.contact_person && <div>{hotel.contact_person}</div>}
                      {hotel.phone_email && <div style={{ fontSize: "12px" }}>{hotel.phone_email}</div>}
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      <select
                        value={hotel.status}
                        onChange={(e) => updateHotelStatus(hotel.id, e.target.value as HotelStatus)}
                        style={{
                          padding: "4px 8px",
                          border: "1px solid #E5E7EB",
                          borderRadius: "6px",
                          fontSize: "12px",
                          background: HOTEL_STATUS_CONFIG[hotel.status].color,
                          color: "white",
                        }}
                      >
                        {(Object.keys(HOTEL_STATUS_CONFIG) as HotelStatus[]).map(s => (
                          <option key={s} value={s}>{HOTEL_STATUS_CONFIG[s].label}</option>
                        ))}
                      </select>
                    </td>
                    <td style={{ padding: "10px 12px", color: "#64748b", fontSize: "13px" }}>{hotel.notes}</td>
                    <td style={{ padding: "10px 12px", textAlign: "right" }}>
                      <button onClick={() => deleteHotelPartner(hotel.id)} style={{ background: "none", border: "none", color: "#DC2626", cursor: "pointer", fontSize: "13px" }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

function TaskRow({ task, showFrequency = false }: { task: MarketingTask; showFrequency?: boolean }) {
  return (
    <label style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "10px 0",
      borderBottom: "1px solid #F3F4F6",
      cursor: "pointer",
    }}>
      <input
        type="checkbox"
        checked={task.is_completed}
        onChange={(e) => toggleTask(task.id, e.target.checked)}
        style={{ width: "18px", height: "18px", accentColor: "#2D5A3D" }}
      />
      <span style={{
        flex: 1,
        fontSize: "14px",
        color: task.is_completed ? "#94a3b8" : "#1A202C",
        textDecoration: task.is_completed ? "line-through" : "none",
      }}>
        {task.title}
      </span>
      {task.platform && (
        <span style={{ fontSize: "12px", color: "#94a3b8", background: "#F3F4F6", padding: "2px 8px", borderRadius: "4px" }}>
          {task.platform}
        </span>
      )}
      {showFrequency && task.frequency && (
        <span style={{ fontSize: "12px", color: "#D97706", fontWeight: 500 }}>
          {task.frequency}
        </span>
      )}
    </label>
  );
}
```

**Step 3: Create marketing page**

Create `website/app/admin/marketing/page.tsx`:

```tsx
import { createClient } from "@/lib/supabase/server";
import type { MarketingTask, HotelPartner } from "@/lib/types/admin";
import MarketingClient from "./MarketingClient";

export default async function MarketingPage() {
  const supabase = await createClient();

  const { data: tasks } = await supabase
    .from("marketing_tasks")
    .select("*")
    .order("sort_order", { ascending: true });

  const { data: hotels } = await supabase
    .from("hotel_partners")
    .select("*")
    .order("created_at", { ascending: false });

  const allTasks = (tasks || []) as MarketingTask[];
  const preLaunchTasks = allTasks.filter(t => t.category === "pre_launch");
  const recurringTasks = allTasks.filter(t => t.category === "recurring");

  return (
    <MarketingClient
      preLaunchTasks={preLaunchTasks}
      recurringTasks={recurringTasks}
      hotelPartners={(hotels || []) as HotelPartner[]}
    />
  );
}
```

**Step 4: Test in browser**

Navigate to `/admin/marketing` — should show checklists with progress bar + hotel partners tab.

**Step 5: Commit**

```bash
git add website/app/admin/marketing/
git commit -m "feat: add marketing dashboard with checklists, hotel partnerships"
```

---

## Task 9: Settings Page

**Files:**
- Create: `website/app/admin/settings/page.tsx`
- Create: `website/app/admin/settings/actions.ts`
- Create: `website/app/admin/settings/SettingsClient.tsx`

**Step 1: Create server actions**

Create `website/app/admin/settings/actions.ts`:

```typescript
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateSettings(settings: Record<string, string>) {
  const supabase = await createClient();

  for (const [key, value] of Object.entries(settings)) {
    const { error } = await supabase
      .from("settings")
      .update({ value })
      .eq("key", key);

    if (error) throw new Error(error.message);
  }

  revalidatePath("/admin/settings");
}

export async function changePassword(currentPassword: string, newPassword: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) return { error: error.message };
  return { success: true };
}
```

**Step 2: Create SettingsClient component**

Create `website/app/admin/settings/SettingsClient.tsx`:

```tsx
"use client";

import { useState } from "react";
import type { Setting } from "@/lib/types/admin";
import { updateSettings, changePassword } from "./actions";

interface SettingsClientProps {
  settings: Setting[];
}

export default function SettingsClient({ settings }: SettingsClientProps) {
  const getValue = (key: string) => settings.find(s => s.key === key)?.value || "";

  const [contact, setContact] = useState({
    contact_phone: getValue("contact_phone"),
    contact_email: getValue("contact_email"),
    contact_address: getValue("contact_address"),
  });

  const [social, setSocial] = useState({
    social_instagram: getValue("social_instagram"),
    social_youtube: getValue("social_youtube"),
    social_strava: getValue("social_strava"),
    social_facebook: getValue("social_facebook"),
  });

  const [notifications, setNotifications] = useState({
    notify_new_leads: getValue("notify_new_leads"),
    notify_overdue_followups: getValue("notify_overdue_followups"),
  });

  const [password, setPassword] = useState({ current: "", new: "", confirm: "" });
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function saveSection(section: string, data: Record<string, string>) {
    setSaving(section);
    setMessage(null);
    await updateSettings(data);
    setSaving(null);
    setMessage(`${section} saved!`);
    setTimeout(() => setMessage(null), 3000);
  }

  async function handleChangePassword() {
    if (password.new !== password.confirm) {
      setMessage("Passwords don't match");
      return;
    }
    if (password.new.length < 8) {
      setMessage("Password must be at least 8 characters");
      return;
    }
    setSaving("password");
    const result = await changePassword(password.current, password.new);
    setSaving(null);
    if (result.error) {
      setMessage(`Error: ${result.error}`);
    } else {
      setMessage("Password updated!");
      setPassword({ current: "", new: "", confirm: "" });
    }
    setTimeout(() => setMessage(null), 3000);
  }

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    display: "block",
    fontSize: "13px",
    fontWeight: 500 as const,
    color: "#374151",
    marginBottom: "6px",
  };

  const sectionStyle = {
    background: "white",
    borderRadius: "12px",
    border: "1px solid #E5E7EB",
    padding: "24px",
    marginBottom: "24px",
  };

  return (
    <div style={{ maxWidth: "700px" }}>
      {message && (
        <div style={{
          padding: "12px 16px",
          borderRadius: "8px",
          background: message.startsWith("Error") ? "#FEF2F2" : "#F0FDF4",
          color: message.startsWith("Error") ? "#DC2626" : "#22C55E",
          fontSize: "14px",
          marginBottom: "20px",
        }}>
          {message}
        </div>
      )}

      {/* Contact Info */}
      <div style={sectionStyle}>
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "18px", fontWeight: 400, marginBottom: "20px" }}>Contact Information</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={labelStyle}>Phone</label>
            <input value={contact.contact_phone} onChange={e => setContact(c => ({ ...c, contact_phone: e.target.value }))} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Email</label>
            <input value={contact.contact_email} onChange={e => setContact(c => ({ ...c, contact_email: e.target.value }))} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Address</label>
            <input value={contact.contact_address} onChange={e => setContact(c => ({ ...c, contact_address: e.target.value }))} style={inputStyle} />
          </div>
          <button onClick={() => saveSection("Contact", contact)} disabled={saving === "Contact"} style={{ padding: "10px 20px", background: "#2D5A3D", color: "white", border: "none", borderRadius: "8px", fontSize: "14px", cursor: "pointer", alignSelf: "flex-start" }}>
            {saving === "Contact" ? "Saving..." : "Save Contact Info"}
          </button>
        </div>
      </div>

      {/* Social Links */}
      <div style={sectionStyle}>
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "18px", fontWeight: 400, marginBottom: "20px" }}>Social Links</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={labelStyle}>Instagram URL</label>
            <input value={social.social_instagram} onChange={e => setSocial(s => ({ ...s, social_instagram: e.target.value }))} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>YouTube URL</label>
            <input value={social.social_youtube} onChange={e => setSocial(s => ({ ...s, social_youtube: e.target.value }))} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Strava URL</label>
            <input value={social.social_strava} onChange={e => setSocial(s => ({ ...s, social_strava: e.target.value }))} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Facebook URL</label>
            <input value={social.social_facebook} onChange={e => setSocial(s => ({ ...s, social_facebook: e.target.value }))} style={inputStyle} />
          </div>
          <button onClick={() => saveSection("Social", social)} disabled={saving === "Social"} style={{ padding: "10px 20px", background: "#2D5A3D", color: "white", border: "none", borderRadius: "8px", fontSize: "14px", cursor: "pointer", alignSelf: "flex-start" }}>
            {saving === "Social" ? "Saving..." : "Save Social Links"}
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div style={sectionStyle}>
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "18px", fontWeight: 400, marginBottom: "20px" }}>Notifications</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={notifications.notify_new_leads === "true"}
              onChange={e => {
                const val = e.target.checked ? "true" : "false";
                setNotifications(n => ({ ...n, notify_new_leads: val }));
                saveSection("Notifications", { ...notifications, notify_new_leads: val });
              }}
              style={{ width: "18px", height: "18px", accentColor: "#2D5A3D" }}
            />
            <span style={{ fontSize: "14px" }}>Email me when a new lead comes in</span>
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={notifications.notify_overdue_followups === "true"}
              onChange={e => {
                const val = e.target.checked ? "true" : "false";
                setNotifications(n => ({ ...n, notify_overdue_followups: val }));
                saveSection("Notifications", { ...notifications, notify_overdue_followups: val });
              }}
              style={{ width: "18px", height: "18px", accentColor: "#2D5A3D" }}
            />
            <span style={{ fontSize: "14px" }}>Notify me about overdue follow-ups</span>
          </label>
        </div>
      </div>

      {/* Change Password */}
      <div style={sectionStyle}>
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "18px", fontWeight: 400, marginBottom: "20px" }}>Change Password</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={labelStyle}>Current Password</label>
            <input type="password" value={password.current} onChange={e => setPassword(p => ({ ...p, current: e.target.value }))} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>New Password</label>
            <input type="password" value={password.new} onChange={e => setPassword(p => ({ ...p, new: e.target.value }))} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Confirm New Password</label>
            <input type="password" value={password.confirm} onChange={e => setPassword(p => ({ ...p, confirm: e.target.value }))} style={inputStyle} />
          </div>
          <button onClick={handleChangePassword} disabled={saving === "password"} style={{ padding: "10px 20px", background: "#2D5A3D", color: "white", border: "none", borderRadius: "8px", fontSize: "14px", cursor: "pointer", alignSelf: "flex-start" }}>
            {saving === "password" ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>
    </div>
  );
}
```

**Step 3: Create settings page**

Create `website/app/admin/settings/page.tsx`:

```tsx
import { createClient } from "@/lib/supabase/server";
import type { Setting } from "@/lib/types/admin";
import SettingsClient from "./SettingsClient";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("settings").select("*");

  return <SettingsClient settings={(data || []) as Setting[]} />;
}
```

**Step 4: Test in browser**

Navigate to `/admin/settings` — should show all 4 sections with forms.

**Step 5: Commit**

```bash
git add website/app/admin/settings/
git commit -m "feat: add settings page with contact, social, notifications, password"
```

---

## Task 10: Public Form → Lead API Route

**Files:**
- Create: `website/app/api/leads/route.ts`

This API route will receive form submissions from the public website (contact, plan, plan-tour, GPX, rental) and insert them into the leads table.

**Step 1: Create API route**

Create `website/app/api/leads/route.ts`:

```typescript
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Use service-level client for public form submissions (bypasses RLS)
function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, phone, nationality, source_form, ...rest } = body;

    if (!name || !email || !source_form) {
      return NextResponse.json(
        { error: "Name, email, and source_form are required" },
        { status: 400 }
      );
    }

    const supabase = getServiceClient();

    const { error } = await supabase.from("leads").insert({
      name,
      email,
      phone: phone || null,
      nationality: nationality || null,
      source: "website",
      source_form,
      status: "new",
      form_data: rest,
    });

    if (error) {
      console.error("Lead insert error:", error);
      return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
```

**Step 2: Add service role key to .env.local**

Get from Supabase Dashboard → Settings → API → `service_role` key.

Add to `website/.env.local`:
```env
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
```

Add to `website/.env.example`:
```env
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Step 3: Test with curl**

```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"+44123456","source_form":"contact","message":"Hello"}'
```

Expected: `{"success":true}`

Check Supabase table — new lead should appear.

**Step 4: Commit**

```bash
git add website/app/api/leads/ website/.env.example
git commit -m "feat: add public API route for form submissions to create leads"
```

---

## Task 11: Update next.config.ts for Supabase Images

**Files:**
- Modify: `website/next.config.ts`

**Step 1: No image changes needed** — admin panel doesn't use external images beyond Unsplash (already configured).

This task is a no-op. Skip.

---

## Task 12: Final Integration Test & Cleanup

**Step 1: Run build**

```bash
cd website && npm run build
```

Expected: Build succeeds.

**Step 2: Run existing tests**

```bash
npm run test:run
```

Expected: All existing tests pass (admin panel doesn't break public site).

**Step 3: Manual test checklist**

- [ ] `/admin/login` — shows login form
- [ ] Login with credentials → redirects to `/admin`
- [ ] `/admin` — shows dashboard with 4 stat cards, chart, activity
- [ ] `/admin/leads` — shows leads table, filters work, click opens detail
- [ ] `/admin/marketing` — checklists toggle, hotel partners CRUD
- [ ] `/admin/settings` — save contact info, social links, notifications, password
- [ ] Sign Out → redirects to login
- [ ] Public site still works (home, experiences, about, etc.)

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete admin panel — dashboard, leads, marketing, settings"
```

---

## Summary

| Task | What | Files |
|------|------|-------|
| 1 | Dependencies + shadcn/ui | package.json, globals.css, utils.ts |
| 2 | Supabase client setup | lib/supabase/*.ts, .env files |
| 3 | Auth + Login page | middleware.ts, admin/login/* |
| 4 | Database schema + types | schema.sql, types/admin.ts |
| 5 | Admin layout + sidebar | admin/layout.tsx, admin/components/* |
| 6 | Dashboard page | admin/page.tsx, StatCard, LeadSourceChart |
| 7 | Lead management | admin/leads/* |
| 8 | Marketing dashboard | admin/marketing/* |
| 9 | Settings page | admin/settings/* |
| 10 | Public form API | api/leads/route.ts |
| 12 | Integration test | Build, test, manual check |
