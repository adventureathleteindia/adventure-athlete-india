# Adventure Athlete India

**Status:** Design Phase - HTML Prototypes Ready for Review
**Last Updated:** 2026-01-06

---

## What This Is

Personal tour guiding website for Atul Chauhan - Elite Cyclist, Trail Runner, and Licensed HP Tourism Guide based in Shimla, Himachal Pradesh.

**Tagline:** Experience the raw Himalayas.

---

## Current Files

```
adventure-athlete-india/
├── README.md                           <- You are here
│
├── design/
│   ├── website/
│   │   └── 2026-01-05-website-design.md    <- REQUIREMENTS (Source of Truth)
│   ├── prototypes/                          <- HTML Prototypes (12 pages)
│   │   ├── 01-home.html
│   │   ├── 02-experiences.html
│   │   ├── 03-experience-detail.html
│   │   ├── 04-about.html (merged with achievements)
│   │   ├── 06-why-aai.html
│   │   ├── 07-contact.html
│   │   ├── 08-plan.html
│   │   ├── 09-faq.html
│   │   ├── 10-terms.html
│   │   ├── 11-privacy.html
│   │   ├── 12-safety.html
│   │   ├── 13-cancellation.html
│   │   └── styles.css
│   └── color-palette-comparison.html       <- Design preview
│
├── docs/plans/
│   └── 2026-01-06-design-guidelines.md     <- Design decisions (colors, fonts, tech)
│
├── routes/                                  <- Routes documentation system
│   ├── route-entry.html
│   ├── dashboard.html
│   ├── preview-template.html
│   └── POLISHING-GUIDE.md
│
└── _archive/                               <- Old files (ignore)
```

---

## Key Decisions

| Decision | Choice |
|----------|--------|
| Visual Style | Patagonia-inspired (warm, editorial, photo-forward) |
| Colors | Forest Green (#2D5A3D) + Amber (#D97706) |
| Typography | Oswald (headlines) + Source Sans 3 (body) |
| Tech Stack | Next.js 14 + Tailwind CSS + Vercel |
| Tour Model | **Personalized** (no fixed packages/prices) |

---

## Important Notes

- **No fixed tour prices** - All tours are personalized via inquiry form
- **Experience pages** are a routes library (like a blog), not a booking system
- **About page** includes achievements (merged into one page)
- Website will be mostly static with inquiry form

---

## Next Steps

1. Review HTML prototypes in browser (`design/prototypes/`)
2. Fix Experience Detail page (remove old price/booking content)
3. Approve designs
4. Build with Next.js

---

## Requirements Document

**Source of Truth:** `design/website/2026-01-05-website-design.md`

This document contains:
- All 13 page specifications
- Navigation structure
- Content for each section
- Form fields
- FAQ content
- All policies (Terms, Privacy, Safety, Cancellation)

---

*To resume: "Let's continue with Adventure Athlete India project"*
