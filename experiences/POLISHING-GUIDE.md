# Experience Polishing Guide

Instructions for Claude when polishing experience content. Follow this exactly to ensure nothing is missed.

---

## When User Says "Polish experience XXX"

### Step 1: Read Everything (Checklist)

```
READ ALL OF THESE:
☐ experiences/XXX/experience-data.json           → All structured data
☐ experiences/XXX/experience-data.json → notes.raw_description    → Main notes
☐ experiences/XXX/experience-data.json → notes.notes_from_file    → Pasted transcriptions
☐ experiences/XXX/experience-data.json → notes.media_info         → What media they have
☐ experiences/XXX/experience-data.json → metrics.strava_link      → For data extraction
☐ experiences/XXX/media/                    → List files that exist
☐ experiences/XXX/media/gpx/                → List GPX files for elevation profile
☐ Any .txt or .pdf files in experience folder → Additional notes
```

### Step 2: Extract Additional Data

```
IF strava_link exists:
☐ VERIFY metrics against Strava (Strava is source of truth)
  - Open Strava activity link
  - Check: distance, elevation, duration
  - If different from experience-data.json, UPDATE to match Strava
☐ Flag for elevation graph download

IF media/photos/ has files:
☐ Count photos
☐ Note hero image if named hero.*

IF media/videos/ has files:
☐ Flag: Generate YouTube description

IF media/audio/ has files:
☐ Note: Audio available for podcast

IF media/gpx/ has files:
☐ Parse each GPX file for elevation profile data
☐ Generate elevation data for preview (see Step 3.5)
```

**Metrics Priority:**
1. **Strava** (if activity exists) - Source of truth
2. **GPX parsing** - Fallback if no Strava
3. **Manual entry** - Last resort

### Step 2.5: Extract EVERY Detail from Raw Notes (CRITICAL)

Before writing anything, go through raw_description line by line and extract:

```
MUST EXTRACT - Check each category:

☐ ATMOSPHERE/CONDITIONS
  - Weather (sunny, cloudy, cold, hot)
  - Season character ("bright sunny winter day", "monsoon mist")
  - Time of day feel

☐ PRACTICAL WARNINGS
  - Off-season considerations ("carry food if off-season")
  - Water availability and conditions
  - Trail conditions (icy, muddy, dry)
  - Any "if X then Y" advice

☐ VIEWS/HIGHLIGHTS
  - What can be seen from summit/route
  - Sunrise/sunset potential (even if not done on this trip)
  - Memorable moments mentioned

☐ PERSONAL DETAILS
  - Specific times mentioned
  - Lessons learned
  - What they'd do differently
```

**TWO RULES:**

| Rule | Meaning |
|------|---------|
| **DON'T ADD** | Never invent details not in the raw notes. If user didn't mention "Churdhar visible", don't add it. |
| **DON'T MISS** | Every practical tip, warning, or atmosphere detail in raw notes MUST appear in final content. |

**Verification:** After drafting, re-read raw_description and check:
- Is every detail from raw notes included somewhere?
- Is there anything in my draft that wasn't in raw notes?

---

### Step 3: Generate Content

Generate ALL of these:

1. **Website Description** (detailed, multi-paragraph)
2. **Instagram Caption** (with hashtags)
3. **YouTube Description** (if video exists)
4. **Short Summary** (1-2 lines for cards/previews)

### Step 3.5: Generate Elevation Profile Data (If GPX Exists)

If GPX files exist in `media/gpx/`, parse them to generate elevation data for the preview.

**Format for {{ELEVATION_DATA}} placeholder:**

```javascript
[
  {
    "name": "Shali Tibba Trail Run",  // GPX filename or activity name
    "data": [
      { "distance": 0.0, "elevation": 2210 },
      { "distance": 0.1, "elevation": 2225 },
      // ... sample every 25m by DISTANCE (not by point count)
      { "distance": 8.8, "elevation": 2210 }
    ],
    "stats": {
      "min": 2210,        // Minimum elevation in meters
      "max": 2872,        // Maximum elevation in meters
      "gain": 657,        // Total elevation gain in meters
      "totalDistance": 8.8 // Total distance in km
    }
  }
  // Additional objects if multiple GPX files
]
```

**GPX Parsing - Use the Script:**

```bash
# Single GPX file
python3 experiences/scripts/parse-gpx.py experiences/XXX/media/gpx/file.gpx

# All GPX files in folder (recommended)
python3 experiences/scripts/parse-gpx.py experiences/XXX/media/gpx/

# Custom interval (default is 25m)
python3 experiences/scripts/parse-gpx.py experiences/XXX/media/gpx/ --interval 50
```

The script:
1. Samples by DISTANCE (every 25m), not by point count
2. Outputs JSON ready to embed in preview.html
3. Prints stats summary to stderr

**Why 25m distance-based sampling:**
- GPX records points by TIME, so stopping (e.g., at summit) creates many points at same location
- Sampling by point count causes flat sections in the graph where user paused
- Distance-based sampling ensures clean peaks and accurate profile shape

**If NO GPX files exist:**

Set `{{ELEVATION_DATA}}` to empty array:
```javascript
[]
```

The preview will show "No GPX data available" message.

---

### Step 4: Generate Preview HTML Page

Instead of showing in conversation, create a preview HTML page:

1. Read `experiences/preview-template.html`
2. Replace all `{{PLACEHOLDERS}}` with actual content
3. Save as `experiences/XXX/preview.html`

**Placeholders to replace:**
```
{{EXPERIENCE_ID}}    → route_id from JSON
{{FOLDER_NAME}}      → folder_name from JSON
{{TITLE}}            → basic_info.title
{{SHORT_DESCRIPTION}} → basic_info.short_description
{{CATEGORY}}         → basic_info.category (formatted)
{{DIFFICULTY}}       → basic_info.difficulty
{{DATE}}             → basic_info.date
{{DISTANCE}}         → metrics.distance_km
{{ELEVATION}}        → metrics.elevation_gain_m
{{DURATION}}         → metrics.duration
{{START_POINT}}      → location.start_point
{{END_POINT}}        → location.end_point
{{SOURCE_NOTES}}     → First 200 chars of raw_description
{{WEBSITE_CONTENT}}  → Generated website content
{{INSTAGRAM_CONTENT}} → Generated Instagram caption
{{YOUTUBE_CONTENT}}  → Generated YouTube description (or empty)
{{SUMMARY_CONTENT}}  → Generated short summary
{{ELEVATION_DATA}}   → Elevation profile data array (or [] if no GPX)
```

### Step 5: Tell User to Open Preview

```
✅ Preview generated for [Experience Title]

Open this file in your browser:
→ experiences/XXX/preview.html

You can:
- Review all content
- Edit any section
- Copy content with one click
- Finalize when ready (downloads content files)
```

### Step 6: User Reviews & Finalizes in Browser

The preview page lets them:
- See all content formatted nicely
- Edit any section directly
- Copy Instagram/YouTube with one click
- Click "Finalize" to download content files

### Step 7: After User Finalizes

User moves downloaded files to `content/` folder, or Claude can:
1. Check if content files exist in experience folder
2. Move them to `content/` subfolder
3. Update `experience-data.json` with polished status

```
experiences/XXX/
├── experience-data.json   ← UPDATE checklist.polished = true
├── preview.html           ← Generated preview (can keep or delete)
└── content/
    ├── website.md         ← Final website content
    ├── instagram.md       ← Final Instagram caption
    └── youtube.md         ← Final YouTube description
```

### Step 8: Confirm Completion

```
✅ Content finalized for [Experience Title]

Files saved:
- experiences/XXX/content/website.md
- experiences/XXX/content/instagram.md
- experiences/XXX/content/youtube.md (if applicable)

Ready to:
- Copy Instagram caption → post
- View in dashboard
- Use for website (when built)
```

---

## Content Format Templates

### website.md

```markdown
# [Experience Title]

[Opening paragraph - the hook, what makes this special]

[Second paragraph - the experience, what to expect]

[Third paragraph - personal insights, tips]

## Quick Facts

| | |
|---|---|
| **Distance** | X km |
| **Elevation** | X m gain |
| **Duration** | X hours |
| **Difficulty** | Easy/Moderate/Hard/Expert |
| **Best Season** | [months] |
| **Start** | [location] |
| **End** | [location] |

## The Route

[Detailed route description - start to finish, key sections, what to expect at each stage]

## My Notes

[Personal observations, tips from experience, what I learned]

## Getting There

[How to reach the start point]

## What to Bring

[Gear recommendations based on notes]

---

**Atul Chauhan** | Adventure Athlete India
🚴 Elite Cyclist · 🏃 Trail Runner · 🎫 Licensed Guide · 💻 Engineer

[Instagram](https://instagram.com/adventureathlete.in) · [YouTube](https://youtube.com/@adventureathleindia) · [Strava](https://strava.com/athletes/atulchauhan)

*Last updated: [date]*
```

### instagram.md

```markdown
[Opening hook - 1 punchy line that shows before "...more"]

[2-3 short paragraphs - the story/experience, keep it personal]

[Call to action or question to drive engagement]

---

📍 [Location]
🏔️ [Distance] km | ⬆️ [Elevation] m
⏱️ [Duration]
🎯 [Difficulty]

---

#himachalpradesh #shimla #[category] #[activitytype]
#adventureathleindia #himalayas #[specific tags from experience]
#mountainsofinstagram #outdooradventure #traillife

— Atul 🚴🏃
```

### youtube.md

```markdown
# [Video Title - Keep under 60 chars, front-load keywords]

[2-3 sentence compelling description - this shows in search]

📍 Route: [Start] → [End]
📏 Distance: X km
⬆️ Elevation: X m
⏱️ Duration: X hours
🎯 Difficulty: [Level]

---

TIMESTAMPS:
0:00 - Intro
[Add based on content if known]

---

ABOUT THIS EXPERIENCE:
[Brief description of the experience and what makes it special]

---

FOLLOW MY ADVENTURES:
→ Instagram: @adventureathlete.in
→ YouTube: youtube.com/@adventureathleindia
→ Strava: strava.com/athletes/atulchauhan

---

#himachalpradesh #shimla #[category] #[tags]
```

---

## Voice & Attribution (CRITICAL)

### Voice Approach: "I" + Author Section + Brand Name

Use **first person "I"** throughout all content. The author section at the end provides brand context.

**Why this works:**
- "I" creates authenticity and personal connection
- Author section establishes credentials without self-promotion in content
- Brand name (Adventure Athlete India) appears at the end, not throughout

### Author Section Template (Add at End of Content)

```markdown
---

**Atul Chauhan** | Adventure Athlete India
🚴 Elite Cyclist · 🏃 Trail Runner · 🎫 Licensed Guide · 💻 Engineer

[Instagram](https://instagram.com/adventureathlete.in) · [YouTube](https://youtube.com/@adventureathleindia) · [Strava](https://strava.com/athletes/atulchauhan)
```

**IMPORTANT - Credentials Note:**
- DO: "Elite Category, Indian National Championships"
- DON'T: "5x National Champion" (this is incorrect)
- DO: "Licensed HP Tourism Guide" (Reg: 080724 42383)

---

## Tone Guidelines (CRITICAL)

### Keep Atul's Voice - DO:
- "Started early, around 6am. The cold hit immediately."
- "Trail was icy for the first couple kilometers."
- "Had the summit to myself. Worth the early start."
- "Next time I'd start even earlier for better light."
- "Pro tip: bring an extra layer for the summit."

### Avoid AI-Sounding - DON'T:
- "Embarking on this magnificent journey..."
- "The breathtaking vistas unfolded before me..."
- "An absolutely phenomenal experience..."
- "This hidden gem offers an unparalleled..."
- "Nature's grandeur was on full display..."

### Avoid AI Punctuation & Formatting:
- **No em-dashes (—)** - Use commas, periods, or regular dashes instead
- **No "budget X hours"** - Say "allow X hours" or "takes X hours"
- **No flowery transitions** - Just state the next thing directly

### Hashtag Rules:
- **Maximum 5-6 hashtags** per post
- **Must be relevant** to this specific experience
- **Research-based** - Check what's actually used for this location/activity
- **No generic filler** hashtags just to fill space

### Social Handles (IMPORTANT):
| Platform | Handle |
|----------|--------|
| Instagram | @adventureathlete.in |
| YouTube | @adventureathleindia |
| Facebook | Adventure Athlete India |
| Strava | atulchauhan |

### Voice Characteristics:
- **Direct** - Get to the point
- **Practical** - Useful observations
- **Honest** - Include challenges, not just highlights
- **Specific** - Actual temps, times, gear names
- **Personal** - "I" not "one" or "you"
- **Conversational** - Like telling a friend

---

## Batch Processing

When user says "Polish all draft experiences":

```
1. List all experiences where checklist.polished = false
2. Show list and confirm: "Found X unpolished experiences. Polish all?"
3. Process each one, showing preview for each
4. User approves each OR says "save all"
5. Report summary at end:

   ✅ Polished 4 experiences:
   - 001-kuppar-peak-winter ✓
   - 002-shali-tibba ✓
   - 003-jakhu-temple-run ✓
   - 004-hatu-peak ✓

   All content saved to respective /content/ folders.
```

---

## Quick Reference

| User Says | Claude Does |
|-----------|-------------|
| "Polish experience 001" | Full polish flow with preview |
| "Polish all experiences" | Batch process all drafts |
| "Just Instagram for 001" | Only Instagram caption |
| "Regenerate website for 001" | Only website description |
| "Make it shorter" | Revise and show new preview |
| "Save it" | Write files to content/ folder |

---

## Files Summary

| File | Location | Purpose |
|------|----------|---------|
| experience-data.json | experiences/XXX/ | Source data + polished snippets |
| website.md | experiences/XXX/content/ | Full website content |
| instagram.md | experiences/XXX/content/ | Ready-to-post caption |
| youtube.md | experiences/XXX/content/ | Video description |

---

*This guide ensures consistent, high-quality polishing that maintains Atul's authentic voice.*
