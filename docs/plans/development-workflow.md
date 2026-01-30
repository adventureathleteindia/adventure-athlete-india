# Adventure Athlete India - Development Workflow

**Created:** 2026-01-07
**Purpose:** Reference guide for the development process

---

## Tech Stack

| Tool | Purpose | Cost |
|------|---------|------|
| **Next.js 14** | Framework to build the website (React-based) | Free |
| **Tailwind CSS** | Styling system (utility classes) | Free |
| **Git** | Version control - tracks every change to code | Free |
| **GitHub** | Stores code online, enables collaboration | Free |
| **Vercel** | Hosts website, auto-deploys from GitHub | Free (until big traffic) |
| **Google Fonts** | Oswald + Source Sans 3 fonts | Free |
| **Formspree** | Website forms (Plan Your Adventure, Contact) | Free (50/month) |
| **Google Forms** | External forms (Onboarding, Feedback) | Free |

---

## Development Flow Diagram

```
   YOUR MAC                    GITHUB                      VERCEL (LIVE)
   ─────────                   ──────                      ─────────────

   ┌─────────┐    git push     ┌─────────┐   auto-deploy   ┌─────────┐
   │  Code   │ ───────────────▶│  Repo   │ ───────────────▶│ Website │
   │ Locally │                 │ (cloud) │                 │ (prod)  │
   └─────────┘                 └─────────┘                 └─────────┘
       │                            │                           │
       │                            │                           │
   You write code              Stores history              Users see it
   Test in browser             Backup & collab             adventureathleteindia.com
```

---

## Step-by-Step Process

### Phase A: Setup (One-time)

1. ✅ Node.js installed (v25.2.1)
2. ✅ Git installed (v2.50.1)
3. Create GitHub account (when ready to push)
4. Create Vercel account (when ready to deploy)
5. Set up Next.js project locally

### Phase B: Development (Daily workflow)

```bash
# 1. Navigate to project
cd /Users/FinancialDocs/AI\ tools/adventure-athlete-india/website

# 2. Start development server
npm run dev

# 3. Open browser
# http://localhost:3000

# 4. Edit code → see changes instantly in browser

# 5. When happy, save your work
git add .
git commit -m "Add About page"

# 6. Push to GitHub (auto-deploys to Vercel)
git push
```

### Phase C: Deployment

1. Connect GitHub repo to Vercel (one-time setup)
2. Every push to `main` branch → live site updates automatically
3. Vercel gives you a preview URL
4. Later: connect custom domain (adventureathleteindia.com)

---

## How Requirements Flow

```
Design Document                    HTML Prototypes                    Next.js Code
(what to build)                    (how it looks)                     (production)
───────────────                    ───────────────                    ────────────

docs/plans/                        design/prototypes/                 website/app/
2026-01-06-design-guidelines.md    01-home.html                       page.tsx
        │                          02-experiences.html                experiences/page.tsx
        │                          03-experience-detail.html          experience/[slug]/page.tsx
        │                          04-about.html                      about/page.tsx
        ▼                          ...                                ...
                                          │
   Design doc describes                   │
   what each component                    ▼
   should look like
                            We convert HTML/CSS structure
                            into React components + Tailwind
```

---

## Project Structure

```
adventure-athlete-india/
├── website/                      # Next.js project
│   ├── app/                      # Pages
│   │   ├── page.tsx              # Home (/)
│   │   ├── experiences/
│   │   │   └── page.tsx          # Experiences listing
│   │   ├── experience/
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Single experience
│   │   ├── about/
│   │   │   └── page.tsx          # About page
│   │   ├── contact/
│   │   │   └── page.tsx          # Contact page
│   │   └── ...
│   │
│   ├── components/               # Reusable pieces
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   ├── RouteCard.tsx
│   │   ├── AuthorSection.tsx
│   │   └── ...
│   │
│   ├── lib/                      # Utilities
│   │   └── routes.ts             # Load route data
│   │
│   ├── public/                   # Static files (images)
│   │
│   ├── tailwind.config.js        # Design tokens (colors, fonts)
│   └── package.json              # Dependencies
│
├── routes/                       # Route content (existing)
│   └── shimla-kufri-mtb/
│       ├── route-data.json
│       └── media/
│
├── design/                       # Prototypes (existing)
│   └── prototypes/
│       ├── 01-home.html
│       └── styles.css
│
└── docs/                         # Documentation (existing)
    └── plans/
        ├── 2026-01-06-design-guidelines.md
        └── development-workflow.md (this file)
```

---

## Quality Assurance

| Aspect | How We Ensure It |
|--------|------------------|
| **Matches Design** | Code directly from HTML prototypes |
| **Performance** | Next.js auto-optimizes images, lazy-loads |
| **SEO** | Next.js metadata, semantic HTML |
| **Mobile** | Tailwind responsive classes |
| **Accessibility** | Semantic HTML, ARIA labels |
| **Code Quality** | TypeScript, ESLint, TDD approach |

---

## Third-Party Services Explained

| Service | What It Does | Why We Need It |
|---------|--------------|----------------|
| **Vercel** | Hosting platform | Serves website, handles traffic, SSL, CDN |
| **GitHub** | Code storage | Backup, version history, collaboration |
| **Formspree** | Website form handling | Plan Your Adventure & Contact forms → email notifications, stays on site |
| **Google Forms** | External form handling | Onboarding & Feedback forms → Google Sheets (shared via email/WhatsApp) |
| **Google Fonts** | Typography | Serves fonts fast worldwide |
| **YouTube** | Video hosting | Trail videos embedded, YouTube handles streaming |

---

## Development Approach

We use **Test-Driven Development (TDD)** and structured planning:

1. **Plan** - Review design doc and prototype for the feature
2. **Test** - Write tests for expected behavior (if applicable)
3. **Code** - Implement the feature
4. **Verify** - Check against prototype, run tests
5. **Commit** - Save with clear commit message
6. **Deploy** - Push to GitHub → auto-deploys

---

## Key Files Reference

| Purpose | File |
|---------|------|
| Design requirements | `docs/plans/2026-01-06-design-guidelines.md` |
| This workflow guide | `docs/plans/development-workflow.md` |
| HTML prototypes | `design/prototypes/*.html` |
| Shared CSS reference | `design/prototypes/styles.css` |

---

## Commands Reference

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Check for lint errors
npm run lint

# Git: Save changes
git add .
git commit -m "Your message"

# Git: Push to GitHub
git push

# Git: Check status
git status
```

---

*Last updated: 2026-01-07*
