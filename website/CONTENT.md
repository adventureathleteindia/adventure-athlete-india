# Adventure Athlete India - Content Requirements

This document lists all placeholder content that needs to be replaced with your own images, videos, and media. Keep this updated as you add real content.

---

## Content Checklist Summary

| Section | Location | Type | Status |
|---------|----------|------|--------|
| Hero Background | Homepage | Image | Placeholder |
| Category Cards | Homepage "Find Your Adventure" | 6 Images | Placeholder |
| "Why AAI" Photo | Homepage | Image | Placeholder |
| Route Cards | Homepage + Experiences | Images per experience | Placeholder |
| Photo Pile/Cluster | Experiences page header | 16 Images | Placeholder |
| Profile Photo | About page | Image | Placeholder |
| First Ascents | About page | 3 Images | Placeholder |
| Race Certificates | About page | Images | Placeholder |
| Experience Detail | Each experience page | Hero + Gallery + Author | Placeholder |
| Audio Stories | Experience detail | Audio files | Placeholder |
| Video Content | Experience detail | Video files | Placeholder |
| Strava Embeds | Experience detail | Strava activity IDs | Placeholder |

---

## 1. Homepage (`app/page.tsx`)

### Hero Background Image
- **Current:** `https://images.unsplash.com/photo-1464822759023-fed622ff2c3b`
- **Replace with:** Your own dramatic Himalayan landscape photo
- **Specs:** Minimum 1920px wide, landscape orientation, dark enough for white text overlay
- **Location in code:** Line ~81, `backgroundImage` style

### "Find Your Adventure" Category Images
These appear in the horizontal scrolling carousel. Replace with YOUR photos representing each activity type.

| Category | Current Placeholder | Replace With |
|----------|-------------------|--------------|
| Mountain Biking | `photo-1544191696-102dbdaeeaa0` | Your MTB action shot |
| Road Cycling | `photo-1534787238916-9ba6764efd4f` | Your road cycling photo |
| Trail Running | `photo-1551632811-561732d1e306` | Your trail running photo |
| Hiking & Treks | `photo-1551524559-8af4e6624178` | Your hiking/trekking photo |
| Nature Walks | `photo-1441974231531-c6227db76b6e` | Your nature walk photo |
| Gravel Cycling | `photo-1507035895480-2b3156c31fc8` | Your gravel cycling photo |

**Location in code:** `categories` array starting at line ~39

### "Why Adventure Athlete India" Section Photo
- **Current:** `https://images.unsplash.com/photo-1571188654248-7a89213915f7`
- **Replace with:** Photo of you in action (cycling, running, or guiding)
- **Location in code:** `components/ui/WhyAAI.tsx` line ~62

### Latest Adventures Route Cards
These pull from the `latestRoutes` array. Each experience needs its own image.
- **Location in code:** `latestRoutes` array starting at line ~6
- **Note:** These should match the experience detail page images

---

## 2. Experiences Page (`app/experiences/page.tsx`)

### Photo Pile/Cluster Hero
The scattered photo collage behind "EXPLORE THE HIMALAYAS" header.

**How it works:**
- Currently uses 16 placeholder images in `heroPhotos` array (line ~124)
- First 6 photos link to actual experiences (clickable)
- Remaining 10 are decorative

**Future behavior (to be implemented):**
- Should auto-populate from actual experiences
- Main image from each experience becomes a clickable photo in the pile
- Clicking navigates to that experience's detail page

**Current placeholder images to replace:**

| # | Current | Replace With | Links To |
|---|---------|--------------|----------|
| 1 | `photo-1544735716-392fe2489ffa` | Kuppar Peak main | `/experience/kuppar-peak-loop` |
| 2 | `photo-1551632811-561732d1e306` | Shali Tibba main | `/experience/shali-tibba` |
| 3 | `photo-1483728642387-6c3bdd6c93e5` | Hatu Peak main | `/experience/hatu-peak` |
| 4 | `photo-1506905925346-21bda4d32df4` | Churdhar main | `/experience/churdhar` |
| 5 | `photo-1571188654248-7a89213915f7` | Jakhu Temple main | `/experience/jakhu-temple` |
| 6 | `photo-1544191696-102dbdaeeaa0` | Shimla-Fagu main | `/experience/shimla-fagu` |
| 7-16 | Various mountain photos | Your scenic Himalayan photos | Decorative (no link) |

**Location in code:** `heroPhotos` array starting at line ~124

### Route Cards Grid
Each experience card shows an image. These are defined in `allRoutes` and `additionalRoutes` arrays.

**Location in code:**
- `allRoutes` array starting at line ~8
- `additionalRoutes` array starting at line ~78

---

## 3. About Page (`app/about/page.tsx`)

### Main Profile Photo
- **Current:** `https://images.unsplash.com/photo-1571188654248-7a89213915f7`
- **Replace with:** Professional photo of you
- **Specs:** Portrait orientation, ~500x600px
- **Location in code:** Line ~103

### First Ascents Summit Images
Three cards showing your first MTB ascents.

| Summit | Current | Replace With |
|--------|---------|--------------|
| Chandernahan Lake | `photo-1483728642387-6c3bdd6c93e5` | Your photo from that ascent |
| Nochi Top | `photo-1519681393784-d120267933ba` | Your photo from that ascent |
| Kuppar Peak | `photo-1464822759023-fed622ff2c3b` | Your photo from that ascent |

**Location in code:** `summits` array starting at line ~54

### Race Result Certificates
Optional certificate/medal images for race results table.
- **Location in code:** `raceResults` array, `certificateImage` property

---

## 4. Experience Detail Pages (`app/experience/[slug]/page.tsx`)

Each experience needs:

### Hero Image
- Full-width background image for the experience
- Specs: Minimum 1920px wide, dramatic shot of the trail/route
- **Location:** `heroImage` property in experience data

### Photo Gallery
- 4 images per experience in a grid layout
- Mix of trail shots, action shots, scenery
- **Location:** `photos` array in experience data

### Author Photo
- Small circular avatar
- **Current:** Uses same placeholder as About page
- **Location:** `author.image` property

### Media Assets (per experience)

| Asset | Description | Status |
|-------|-------------|--------|
| Audio Story | 3-5 min audio narration of the route | To be recorded |
| Video | Full ride/run video | To be recorded/edited |
| Strava Activity | Embed actual Strava activity | Need activity IDs |

**Location in code:** `experienceData` object starting at line ~7

---

## 5. Dynamic Content Architecture

### Current State (Hardcoded)
All experience data is currently hardcoded in:
- `app/page.tsx` - `latestRoutes` array
- `app/experiences/page.tsx` - `allRoutes`, `additionalRoutes`, `heroPhotos` arrays
- `app/experience/[slug]/page.tsx` - `experienceData` object

### Future State (CMS/Database)
When you add a CMS or database:

1. **Experiences Collection**
   - Each experience has: title, category, images, stats, content, media
   - Main image auto-populates into homepage route cards
   - Main image auto-populates into experiences page photo pile

2. **Photo Pile Behavior**
   - Photos dynamically pulled from experiences
   - Clickable photos link to their experience detail page
   - Decorative photos can come from a separate "gallery" collection

3. **Route Cards**
   - Auto-generated from experiences collection
   - Filtered by category, difficulty, duration
   - "Latest Adventures" shows most recently added

---

## 6. Image Specifications

### Recommended Sizes

| Use Case | Width | Height | Format |
|----------|-------|--------|--------|
| Hero backgrounds | 1920px | 1080px+ | JPG, WebP |
| Route card images | 800px | 600px | JPG, WebP |
| Photo pile images | 400px | 300px | JPG, WebP |
| Profile photos | 500px | 600px | JPG, WebP |
| Gallery images | 600-800px | Varies | JPG, WebP |
| Thumbnails | 200px | 200px | JPG, WebP |

### Image Optimization
- Use Next.js Image component (already in place)
- Images are automatically optimized on-demand
- Original images can be larger; Next.js handles resizing

---

## 7. How to Replace Content

### Step 1: Prepare Your Images
1. Gather all your photos for each category
2. Ensure they meet the size specifications
3. Name them descriptively (e.g., `kuppar-peak-hero.jpg`)

### Step 2: Add Images to Project
**Option A: Local Images**
- Place in `/public/images/` folder
- Reference as `/images/your-image.jpg`

**Option B: External Hosting**
- Upload to your CDN/hosting
- Use full URL in the code

### Step 3: Update Code References
1. Find the file (use locations listed above)
2. Replace the Unsplash URL with your image path
3. Update alt text to describe your actual image

### Example:
```jsx
// Before
image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80"

// After (local)
image: "/images/kuppar-peak-loop.jpg"

// After (external)
image: "https://your-cdn.com/images/kuppar-peak-loop.jpg"
```

---

## 8. Content To-Do Checklist

Use this to track your progress:

- [ ] Homepage hero background
- [ ] 6 category carousel images
- [ ] "Why AAI" profile photo
- [ ] 3 latest adventures images
- [ ] 16 photo pile images (or auto-populate from experiences)
- [ ] About page main photo
- [ ] 3 first ascent summit photos
- [ ] Race certificate images (optional)
- [ ] Experience: Kuppar Peak Loop (hero + 4 gallery)
- [ ] Experience: Shali Tibba Summit (hero + 4 gallery)
- [ ] Experience: Hatu Peak Trail (hero + 4 gallery)
- [ ] Experience: Churdhar Trek (hero + 4 gallery)
- [ ] Experience: Jakhu Temple Walk (hero + 4 gallery)
- [ ] Experience: Shimla to Fagu (hero + 4 gallery)
- [ ] Audio stories for each experience
- [ ] Video content for each experience
- [ ] Strava activity IDs for route embeds

---

## Notes

- All current images are from Unsplash (free stock photos)
- Replace gradually - the site works fine with placeholders
- Prioritize: Hero images > Route cards > Photo pile > Gallery
- Consider hiring a photographer for professional action shots
