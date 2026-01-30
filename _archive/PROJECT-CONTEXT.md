# Adventure Athlete India - Project Context

**Last Updated:** 2026-01-05
**Purpose:** Reference document for understanding the project flow, decisions, and system design.

---

## Project Overview

**Who:** Atul Chauhan - Elite category mountain biker (Indian National Championships) and trail runner based in Shimla, HP
**What:** Personal brand + adventure documentation system + future website
**Goal:** Document adventures, build content library, eventually launch tour business

---

## Strategic Shift (January 2025)

### Original Plan (December 2024)
- 10 fixed tour packages with set prices
- Complex booking flow
- Full website with multiple pages
- Detailed BRD with 33 requirements

### New Direction (January 2025)
- **Start small, iterate**
- Focus on **personalized tours** (not fixed packages)
- Build **routes database** first (document solo adventures)
- Create **content library** that feeds website later
- **Simple workflow** that doesn't take an hour to fill

### Why This Change?
1. No tours booked yet → build credibility first through content
2. Solo adventures happen regularly → document them as assets
3. Content (photos, stories, routes) = marketing material
4. When website launches, content library is ready
5. Personalized tours need good route knowledge anyway

---

## System Architecture

### The Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                        ATUL'S WORKFLOW                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   ADVENTURE                                                          │
│       │                                                              │
│       ▼                                                              │
│   ┌─────────────────────────────────────────┐                       │
│   │  route-entry.html                        │                       │
│   │  • Fill form (5-10 mins)                │                       │
│   │  • Upload notes file (PDF/TXT)          │                       │
│   │  • Add photos, videos, audio            │                       │
│   │  • Paste Strava link                    │                       │
│   │  • Write rough description              │                       │
│   │  → Downloads route-data.json            │                       │
│   └─────────────────────────────────────────┘                       │
│       │                                                              │
│       ▼                                                              │
│   ┌─────────────────────────────────────────┐                       │
│   │  Local Storage                           │                       │
│   │  routes/001-route-name/                 │                       │
│   │  ├── route-data.json                    │                       │
│   │  └── media/                             │                       │
│   │      ├── photos/                        │                       │
│   │      ├── videos/                        │                       │
│   │      ├── audio/   ← for podcast later   │                       │
│   │      └── gpx/                           │                       │
│   └─────────────────────────────────────────┘                       │
│       │                                                              │
│       │  (Can batch multiple routes)                                │
│       ▼                                                              │
│   ┌─────────────────────────────────────────┐                       │
│   │  dashboard.html                          │                       │
│   │  • See all routes                        │                       │
│   │  • Check completeness                    │                       │
│   │  • Filter by status/category            │                       │
│   └─────────────────────────────────────────┘                       │
│       │                                                              │
│       │  "Claude, polish routes 001, 002, 003"                      │
│       ▼                                                              │
│   ┌─────────────────────────────────────────┐                       │
│   │  Claude Code (AI Polish)                 │                       │
│   │  • Reads raw notes                       │                       │
│   │  • Reads notes file (PDF/TXT)           │                       │
│   │  • Extracts Strava metrics              │                       │
│   │  • Downloads elevation graph            │                       │
│   │  • Generates:                           │                       │
│   │    - Website description (Atul's voice) │                       │
│   │    - Instagram caption + hashtags       │                       │
│   │    - YouTube description (if video)     │                       │
│   │  • Saves to routes/XXX/content/         │                       │
│   └─────────────────────────────────────────┘                       │
│       │                                                              │
│       ▼                                                              │
│   ┌─────────────────────────────────────────┐                       │
│   │  Ready for Use                           │                       │
│   │  • Copy Instagram caption → post         │                       │
│   │  • Website pulls data (when built)      │                       │
│   │  • Audio ready for podcast editing      │                       │
│   └─────────────────────────────────────────┘                       │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Key Design Decisions

### 1. Local HTML Forms (Not Notion/Cloud)
**Decision:** Build local HTML files instead of using Notion or cloud tools
**Why:**
- 100% data ownership
- No monthly costs
- Works offline
- Already using Claude Code (AI polish is just a message away)
- No new tools to learn

### 2. Form → Save → Polish Later (Not Auto-Polish)
**Decision:** Separate data entry from AI polishing
**Why:**
- Can batch multiple routes before polishing
- Free (no API costs per entry)
- User controls when AI runs
- Can review and iterate

### 3. Audio Files as Input
**Decision:** Support audio file uploads
**Why:**
- Voice memos are faster than typing
- Can be transcribed and used for polishing
- Raw audio saved for future podcast use
- Captures authentic in-the-moment thoughts

### 4. Strava Link OR Manual Metrics
**Decision:** Either provide Strava link or enter metrics manually
**Why:**
- Most routes will have Strava data
- Some routes might not be on Strava
- Flexibility without forcing both

### 5. Keep Atul's Voice (Not AI-Sounding)
**Decision:** Polished content should sound like Atul wrote it
**Why:**
- Authenticity builds trust
- AI-sounding content feels generic
- His unique perspective is the value
- Direct, practical, personal tone

### 6. Voice Approach: "I" + Author Section + Brand Name
**Decision:** Use first person "I" throughout content, with author section at end
**Why:**
- "I" creates authenticity and personal connection
- Author section provides brand context without interrupting content
- Brand name (Adventure Athlete India) appears at end, not throughout

**Author Section Format:**
```
Atul Chauhan | Adventure Athlete India
🚴 Elite Cyclist · 🏃 Trail Runner · 🎫 Licensed Guide · 💻 Engineer

Instagram · YouTube · Strava
```

**IMPORTANT Credentials Note:**
- CORRECT: "Elite Category, Indian National Championships (Himachal Pradesh)"
- WRONG: "5x National Champion" (this is incorrect - do not use)
- CORRECT: "Licensed HP Tourism Guide" (Reg: 080724 42383, valid to 2027)

---

## Files Created

### Routes System
```
routes/
├── route-entry.html      ← Form to add new routes
├── dashboard.html        ← View all routes, status, completeness
├── README.md             ← Quick reference for the system
└── POLISHING-GUIDE.md    ← Instructions for Claude when polishing
```

### Existing Project Files (From December 2024)
```
adventure-athlete-india/
├── PROJECT-CONTEXT.md    ← THIS FILE - overall project understanding
├── PROJECT-SUMMARY.md    ← Original project summary
├── project-state.json    ← Pipeline state
├── inputs/               ← Original input files
│   ├── client-brief.md
│   ├── Tour Onboarding Form.pdf
│   ├── Tour Feedback Form.pdf
│   ├── Tour Inquiry Form.pdf
│   └── ...
├── outputs/              ← Original BRD, wireframes, flowcharts
│   ├── BRD-v1.md
│   ├── Proposal-v1.md
│   └── ...
├── data/                 ← Structured data from original analysis
│   ├── tour-packages.json
│   └── ...
└── routes/               ← NEW: Routes database system
```

---

## Form Fields (What Gets Captured)

### Required Fields
| Field | Why Required |
|-------|--------------|
| Title | Route identification |
| Short Description | Quick context |
| Category | Filtering, organization |
| Difficulty | User expectation setting |
| Date | Timeline, seasonality |
| Start Point | Navigation |
| End Point | Route clarity |
| Strava Link OR Metrics | Distance/elevation data |
| Raw Description | Content for polishing |
| Hero Image | Visual representation |

### Optional Fields
| Field | Why Optional |
|-------|--------------|
| Tags | Can add later, not critical |
| How to Reach | Helpful but not always needed |
| Max Altitude | Nice to have |
| Duration | Can be extracted from Strava |
| Notes File | Alternative to typing |
| Gallery Photos | More is better but not required |
| Videos | For YouTube content |
| Audio | For podcast content |
| GPX | For map integration |

---

## Content Output (What Gets Generated)

### website.md
- Polished multi-paragraph description
- Quick facts section
- Route details
- Personal notes/tips
- Getting there
- What to bring

### instagram.md
- Opening hook (first line visibility)
- 2-3 short paragraphs
- Location and stats
- 20-30 relevant hashtags

### youtube.md (if video exists)
- SEO-friendly title
- Description with keywords
- Timestamps placeholder
- Links and hashtags

---

## Categories

| Category | Description |
|----------|-------------|
| Mountain Biking | MTB trails, technical riding |
| Road Cycling | Paved routes |
| Gravel Cycling | Mixed surface cycling |
| Trail Running | Off-road running |
| Road Running | Paved running routes |
| Trekking | Full-day mountain treks |
| Hiking | Half-day hikes |
| Nature Walk | Easy 2-3 hour walks |
| FKT Attempt | Speed record attempts |

---

## Existing Assets (Still Valid)

### From Original Project
- **Tour Packages:** 10 tours documented in `data/tour-packages.json`
- **Onboarding Form:** Google Form for client documentation
- **Feedback Form:** Google Form for post-tour feedback
- **BRD:** Full requirements document (may need updating)
- **Wireframes:** 6 screens designed (may need simplifying)

### Credentials
- HP Tourism Guide License (Reg: 080724 42383, valid to 2027)
- Bank: SBI Sanjauli, Account: 20109962376
- Payment: 50% advance via UPI, 50% on arrival

---

## Future Website (When Ready)

### Simplified Pages
1. **Home** - Hero, credentials, featured routes
2. **Routes Gallery** - All documented routes (from routes database)
3. **Route Detail** - Individual route page (auto-generated from data)
4. **About** - Atul's story, achievements
5. **Contact** - WhatsApp + inquiry form

### Data Flow
```
routes/XXX/route-data.json  →  Website route pages
routes/XXX/content/         →  Descriptions, social links
routes/XXX/media/           →  Images, videos
```

---

## Next Steps (When Continuing)

### Immediate
1. Set up Client Management System (see `design/setup/client-management-system.md`)
2. Create Google Forms (Onboarding, Feedback)
3. Test route-entry.html with a real route

### Soon
1. Document 4-5 routes using the routes system
2. Polish them as a batch
3. Post to Instagram, see engagement

### Later
1. Build website based on design: `design/website/2026-01-05-website-design.md`
2. 13 pages ready for development
3. Connect inquiry form to client management system

### Phase 2
1. High Altitude Training programs
2. Corporate Wellness partnerships
3. Insurance provider partnership
4. Legal review of all policies

---

## Commands for Claude

When working on this project:

```
"Polish route 001-kuppar-peak"
→ Read route data, generate website/instagram/youtube content

"Polish all draft routes"
→ Batch process all unpolished routes

"Generate Instagram for route 002"
→ Just the Instagram caption

"Show route status"
→ List all routes with completion status

"Update project context"
→ Add new decisions/changes to this file
```

---

## Key Principles

1. **Start small, iterate** - Don't over-build
2. **Document as you go** - Adventures become content
3. **Authentic voice** - Atul's tone, not AI-generic
4. **Batch processing** - Document many, polish together
5. **Local first** - Data ownership, no dependencies
6. **Website-ready** - Structure data for future use

---

*This document captures the project understanding as of January 2026. Update when significant decisions or changes are made.*

**January 2026 Updates:**
- Website design complete (13 pages) - see `design/website/2026-01-05-website-design.md`
- Client management system designed - see `design/setup/client-management-system.md`
- Forms redefined (Onboarding, Feedback) - no fixed tour numbers, uses experience name
- FAQ and policy pages defined
- Email updated to adventureathleteindia@gmail.com
- Old BRD vs New comparison - see `design/website/2026-01-05-old-vs-new-comparison.md`
- Old agent workflow files moved to `_archive/` (can be deleted)

**Project Foundation:**
The routes system is the starting point for content creation:
- `routes/route-entry.html` - Document adventures
- `routes/dashboard.html` - View all routes
- `routes/preview-template.html` - Preview polished content
- `routes/POLISHING-GUIDE.md` - Claude polishing instructions

Workflow: Adventure → Fill Form → "Polish route XXX" → Content Ready
