# Prototype vs Implementation Discrepancies

This document tracks all differences between HTML prototypes and Next.js implementations.

**Status Legend:**
- [ ] Not fixed
- [x] Fixed

---

## 1. Experiences Page (`02-experiences.html` vs `app/experiences/page.tsx`)

### Critical Structural Issues

| # | Element | Prototype | Implementation | Priority | Status |
|---|---------|-----------|----------------|----------|--------|
| 1 | Hero Structure | Photo pile collage with overlay gradient + title "Explore the Himalayas" INSIDE collage | Separate page-header ABOVE photo pile, title "Experiences" | HIGH | FIXED |
| 2 | Filters | Dropdown selects for Difficulty + Duration, THEN pill buttons | Only pill buttons, no dropdowns | HIGH | FIXED |
| 3 | Category Label | "FKT" (Fastest Known Time) | "Gravel" | MEDIUM | FIXED |
| 4 | Pagination | "Load More Experiences" button at bottom | No pagination button | MEDIUM | FIXED |
| 5 | CTA Text | "Can't find what you're looking for?" | Different text | LOW | FIXED |
| 6 | Collage Overlay | `.collage-overlay` with `background: rgba(0,0,0,0.4)` | Missing overlay gradient | HIGH | FIXED |

### Missing Elements
- [x] Dropdown filter for Difficulty (Easy/Moderate/Hard/All)
- [x] Dropdown filter for Duration (Half Day/Full Day/Multi-Day/All)
- [x] "Load More Experiences" button
- [x] Overlay inside photo pile with title

---

## 2. Experience Detail Page (`03-experience-detail.html` vs `app/experience/[slug]/page.tsx`)

### Critical Missing Sections

| # | Element | Prototype | Implementation | Priority | Status |
|---|---------|-----------|----------------|----------|--------|
| 1 | Audio Player | Full audio player with waveform animation, play button | NOT IMPLEMENTED | HIGH | FIXED |
| 2 | Strava Embed | Placeholder for Strava activity embed | NOT IMPLEMENTED | MEDIUM | FIXED |
| 3 | Video Section | Video container with YouTube-style play button | NOT IMPLEMENTED | MEDIUM | FIXED |
| 4 | Route Map section | "Route Map & Elevation" heading with Strava embed | NOT IMPLEMENTED | MEDIUM | FIXED |

### Missing Elements
- [x] `.audio-player` component with waveform bars
- [x] Audio badge "Audio Story"
- [x] Strava embed placeholder
- [x] Video container with play button
- [x] "Route Map & Elevation" section heading

---

## 3. About Page (`04-about.html` vs `app/about/page.tsx`)

### Critical Missing Sections

| # | Element | Prototype | Implementation | Priority | Status |
|---|---------|-----------|----------------|----------|--------|
| 1 | Race Results Table | Full race table with Year/Event/Category/Result/Cert columns | NOT IMPLEMENTED | HIGH | FIXED |
| 2 | View More Button | "View More Races" button to expand table | NOT IMPLEMENTED | HIGH | FIXED |
| 3 | Certificate Thumbnails | Clickable cert thumbnails with lightbox | NOT IMPLEMENTED | MEDIUM | FIXED |
| 4 | Photo Pile Gallery | Interactive photo pile with hover effects | NOT IMPLEMENTED | MEDIUM | PENDING |
| 5 | ITRA Link | "View full race history on ITRA" link | NOT IMPLEMENTED | LOW | FIXED |

### Missing Elements
- [x] `.race-table` with expandable rows
- [x] `.view-more-btn` for expanding race table
- [x] `.cert-thumb` clickable certificate images
- [x] `.lightbox` modal for certificates
- [ ] `.photo-pile-section` with scattered photos (can be added later)
- [x] ITRA profile link

---

## 4. Contact Page (`07-contact.html` vs `app/contact/page.tsx`)

### Minor Differences

| # | Element | Prototype | Implementation | Priority |
|---|---------|-----------|----------------|----------|
| 1 | Section padding | `<section>` without class | `<section className="py-12 md:py-[var(--spacing-section)]">` | LOW |
| 2 | Form background | `style="background: var(--gray-50); padding: 32px; border-radius: 12px;"` | `className="bg-[var(--color-gray-50)] p-8 rounded-xl"` | LOW |

**Note:** Contact page implementation is close to prototype.

---

## 5. Plan Page (`08-plan.html` vs `app/plan/page.tsx`)

### Minor Differences

| # | Element | Prototype | Implementation | Priority |
|---|---------|-----------|----------------|----------|
| 1 | Required marker | `<span class="required">*</span>` | `<span className="text-red-600">*</span>` | LOW |
| 2 | Radio card styling | Uses JS for visual feedback | Uses React state | LOW |

**Note:** Plan page implementation is fairly close to prototype.

---

## 6. Navigation (all pages)

### Missing Elements

| # | Element | Prototype | Implementation | Priority |
|---|---------|-----------|----------------|----------|
| 1 | Logo Socials | Small social icons under logo in nav | NOT IMPLEMENTED | MEDIUM |
| 2 | `.nav-logo-wrapper` | Wrapper for logo + socials | NOT IMPLEMENTED | MEDIUM |

**Prototype structure:**
```html
<div class="nav-logo-wrapper">
    <a href="01-home.html" class="nav-logo">Adventure Athlete India</a>
    <span class="logo-socials">
        <a href="..." class="instagram">...</a>
        <a href="..." class="youtube">...</a>
        ...
    </span>
</div>
```

---

## Summary by Priority

### HIGH Priority (Affects user experience significantly)
1. ~~Experiences page hero structure~~ - FIXED
2. ~~Experiences page dropdown filters~~ - FIXED
3. ~~Experience Detail audio player~~ - FIXED
4. ~~About page race results table~~ - FIXED

### MEDIUM Priority (Missing features)
1. ~~Experiences page Load More button~~ - FIXED
2. ~~Experience Detail Strava/Video placeholders~~ - FIXED
3. About page photo pile gallery - PENDING
4. Navigation logo socials - PENDING

### LOW Priority (Styling differences)
1. ~~Experiences page category label (FKT vs Gravel)~~ - FIXED
2. Contact/Plan page minor styling - LOW (acceptable)
3. Various text content differences - LOW (acceptable)

---

## Fix Progress

**Completed (January 2026):**
1. **Experiences Page Hero** - Overlay inside collage with correct title
2. **Experiences Page Filters** - Added dropdown filters for Difficulty/Duration
3. **Experiences Page Load More** - Added pagination button
4. **Experience Detail Media** - Added AudioPlayer, VideoPlayer, StravaEmbed components
5. **About Page Race Results** - Added RaceResults component with table, expandable rows, certificates lightbox, and ITRA link

**Remaining (Lower Priority):**
1. About page photo pile gallery
2. Navigation logo socials

---

## Notes

This document was created after comparing HTML prototypes against Next.js implementations.

**Root cause:** The original implementation plan didn't accurately reflect prototype designs, and execution proceeded without verifying against prototype HTML files.

**Prevention:** See `docs/HARD-RULES-DESIGN-MATCHING.md` and `docs/DEVELOPMENT-GUIDELINES.md` for updated process requirements.
