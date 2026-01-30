# Experiences Database

Your adventure documentation system. Fill the form, save locally, polish with Claude later.

---

## Quick Start

### 1. Add a New Experience
1. Open `experience-entry.html` in your browser (bookmark it!)
2. Fill the form after your adventure
3. Click "Save Draft" → downloads `experience-data.json`
4. Create folder: `experiences/001-experience-name/`
5. Move the JSON file there
6. Copy your media files to `experiences/001-experience-name/media/`

### 2. View All Experiences
1. Open `dashboard.html` in your browser
2. Click "Load Experiences" → select your `experience-data.json` files
3. See all experiences, status, completeness

### 3. Polish with Claude
Come to Claude Code and say:
- *"Polish experience 001-kuppar-peak"* → Enhances that experience
- *"Polish all draft experiences"* → Batch process
- *"Generate Instagram for experience 002"* → Specific content

---

## File Structure

```
experiences/
├── experience-entry.html  ← Open this to add new experiences
├── dashboard.html         ← Open this to view all experiences
├── README.md              ← You are here
│
├── 001-kuppar-peak-winter/
│   ├── experience-data.json  ← Main data file
│   ├── content/              ← AI-generated content (after polishing)
│   │   ├── website.md
│   │   ├── instagram.md
│   │   └── youtube.md
│   └── media/
│       ├── photos/        ← Your photos (hero + gallery)
│       ├── videos/        ← Raw video clips
│       ├── audio/         ← Voice notes, podcast material
│       └── gpx/           ← Strava export
│
├── 002-shali-tibba/
│   └── ...
└── ...
```

---

## Workflow

```
┌─────────────────────────────────────────────────────┐
│  AFTER ADVENTURE                                    │
│                                                     │
│  1. Open experience-entry.html                      │
│  2. Fill form (rough notes are fine)               │
│  3. Save Draft → downloads JSON                     │
│  4. Create folder, move files                       │
└─────────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────┐
│  WHEN YOU HAVE TIME                                 │
│                                                     │
│  5. Open dashboard.html → load experiences          │
│  6. Review what's complete/missing                  │
└─────────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────┐
│  POLISH WITH CLAUDE                                 │
│                                                     │
│  7. "Claude, polish experiences 001, 002, 003"     │
│  8. Claude reads your notes, generates:            │
│     • Website description (your voice)             │
│     • Instagram caption + hashtags                 │
│     • YouTube description (if video)               │
│     • Downloads elevation graph from Strava        │
│  9. Review in dashboard                            │
└─────────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────┐
│  READY FOR USE                                      │
│                                                     │
│  • Copy Instagram caption → post                   │
│  • Website pulls from this data (when built)       │
│  • Audio files ready for podcast editing           │
└─────────────────────────────────────────────────────┘
```

---

## What Claude Does When Polishing

| Input | Output |
|-------|--------|
| Your rough notes | Polished website description (your voice, not AI-sounding) |
| Strava link | Extracted metrics + downloaded elevation graph |
| Notes file (PDF/TXT) | Incorporated into description |
| Photos exist | Noted for website gallery |
| Video exists | YouTube description generated |
| Audio exists | Flagged for podcast use |

**Tone**: Claude keeps your authentic voice. Enhances clarity without making it "AI-fancy".

---

## Form Fields Reference

**Required:**
- Title, Intro Hook
- Category, Difficulty (+ Difficulty Level 1-5), Date
- Start Point, End Point, District
- GPX File OR Strava Link OR (Distance + Elevation manually)
- Raw Description

**Auto-Calculated (from GPX):**
- Distance (km)
- Elevation Gain (m)
- Duration
- Max Altitude
- Start Altitude

**Optional (Website Extras):**
- Best Season, Recommended Gear
- What to Bring (list)
- Tags

**Optional (Media - add later):**
- Hero Image URL, Card Image URL
- Gallery Photo URLs
- YouTube URL, Video Thumbnail URL

---

## Categories

| Category | categoryValue | Use For |
|----------|---------------|---------|
| Mountain Biking | `mtb` | MTB trails |
| Road Cycling | `road` | Paved routes |
| Gravel Cycling | `gravel` | Mixed surface cycling |
| Trail Running | `trail` | Off-road running |
| Road Running | `road-run` | Paved running |
| Trekking | `hiking` | Full-day mountain treks |
| Hiking | `hiking` | Half-day hikes |
| Nature Walk | `nature` | Easy 2-3 hour walks |
| FKT Attempt | `fkt` | Speed record attempts |

---

## Tips

1. **Fill form same day** → Memory is fresh
2. **Rough notes are fine** → Claude polishes later
3. **Voice memos work great** → Transcribe and paste, or upload audio
4. **Batch polish** → Document 4-5 experiences, polish all at once
5. **Keep originals** → Your raw notes are preserved, polished versions are separate

---

*Created: January 2025*
