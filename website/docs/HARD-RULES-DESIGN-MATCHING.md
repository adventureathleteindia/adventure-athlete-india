# HARD RULES - Design Matching Checklist

## STOP! Before Writing ANY Code

This document contains **NON-NEGOTIABLE** rules. Violating these rules wastes time and creates frustration.

---

## CRITICAL: Root Causes of Design Mismatches (Learn From Past Mistakes)

These are the exact reasons why implementations failed to match prototypes in the past:

| Root Cause | What Happened | How To Prevent |
|------------|---------------|----------------|
| **Plan didn't reference prototypes** | Plan described "page header + filter chips" but prototype had "photo collage with overlay" | Plans MUST include prototype file path and key structural elements |
| **Never read HTML prototypes during execution** | Executed plan steps without comparing to source HTML | MUST open prototype HTML file before coding each component |
| **TDD tested rendering, not visual accuracy** | Tests confirmed "renders Mountain Biking filter" but not "filter has padding: 8px 16px" | Tests verify structure; visual comparison verifies design |
| **"Build passes" = "Done"** | Assumed passing build meant prototype match | Build verification is separate from design verification |
| **Executed plan blindly** | Followed plan steps without questioning if they matched prototype | ALWAYS compare plan description against prototype before implementing |

**MANDATORY PRINCIPLE:** If you haven't opened the HTML prototype file in this session, you are NOT ready to code.

---

## RULE 0: Read Prototype BEFORE Anything Else (NEW - HIGHEST PRIORITY)

**Before writing a single line of code for ANY page/component:**

1. **Locate the prototype file:**
   ```
   design/prototypes/01-home.html
   design/prototypes/02-experiences.html
   design/prototypes/03-experience-detail.html
   etc.
   ```

2. **Open and READ the entire HTML file:**
   - Note all wrapper divs and their classes
   - Note all text content verbatim
   - Note all structural elements (grids, sections, headers)
   - Note any unique features (overlays, gradients, special effects)

3. **Cross-reference with styles.css:**
   - Find every class used in the HTML
   - Extract exact CSS values for each class

4. **Create written comparison:**
   ```markdown
   ## Component: Experiences Hero

   ### Prototype Says:
   - Structure: `.photo-pile-collage` with 5 images
   - Overlay: `.collage-overlay` with gradient `rgba(0,0,0,0.4)`
   - Title: "Explore the Himalayas" in white, centered on overlay
   - Position: Title is INSIDE the collage, not above it

   ### I Will Implement:
   [Write out exactly what you plan to build MATCHING the above]
   ```

**If your plan says something different than the prototype, THE PROTOTYPE WINS.**

---

## RULE 1: Extract EXACT Values First

**NEVER use Tailwind defaults.** Always extract exact values from prototype CSS.

### BAD (Tailwind defaults):
```jsx
// WRONG - These are approximations
className="shadow-xl"           // What shadow exactly?
className="tracking-wider"      // What letter-spacing exactly?
className="gap-12"              // What gap exactly?
className="rounded-lg"          // What border-radius exactly?
```

### GOOD (Exact values):
```jsx
// CORRECT - Exact values from prototype CSS
style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
className="tracking-[2px]"
className="gap-[60px]"
className="rounded-[12px]"
```

---

## RULE 2: The Extraction Checklist

Before implementing ANY component, fill out this checklist:

```
Component: ________________

From styles.css, I extracted:
[ ] padding: ____________________
[ ] margin: _____________________
[ ] font-size: __________________
[ ] font-weight: ________________
[ ] letter-spacing: _____________
[ ] line-height: ________________
[ ] color: ______________________
[ ] background: _________________
[ ] border-radius: ______________
[ ] box-shadow: _________________
[ ] gap: ________________________
[ ] grid-template-columns: ______
[ ] width/height: _______________

From HTML, I identified:
[ ] All wrapper divs
[ ] All decorative elements (SVGs, patterns, overlays)
[ ] All pseudo-elements (::before, ::after)
[ ] All inline styles
```

---

## RULE 3: Count ALL Layers

Prototype components often have multiple decorative layers:

### Footer Example:
1. Mountain wave SVG (top)
2. Decorative dots pattern (absolute positioned)
3. Decorative mountain icon (absolute positioned)
4. ::before pseudo-element (mountain silhouette, 300px)
5. ::after pseudo-element (mountain silhouette, 200px)
6. Content grid
7. Bottom bar

**If prototype has 7 layers, implementation MUST have 7 layers.**

---

## RULE 4: Side-by-Side Verification

After implementing, open BOTH:
- Browser tab 1: `file:///path/to/design/prototypes/01-home.html`
- Browser tab 2: `http://localhost:3000`

### Verification Steps:
1. Set both windows to same width (1440px, 768px, 375px)
2. Screenshot both
3. Overlay screenshots in image editor
4. Check EVERY element aligns
5. Check colors match (use color picker tool)
6. Check spacing matches (use browser dev tools)

**Do NOT mark component complete until this verification passes.**

---

## RULE 5: The Implementation Order

1. **READ** prototype HTML structure completely
2. **READ** prototype CSS completely
3. **EXTRACT** all values into checklist
4. **COUNT** all layers/elements
5. **IMPLEMENT** with exact values
6. **VERIFY** side-by-side
7. **FIX** any mismatches
8. **RE-VERIFY** until perfect

---

## RULE 6: No Shortcuts

| Shortcut | Why It Fails |
|----------|--------------|
| "It looks close enough" | Users notice 2px differences |
| "Tailwind's default is similar" | Similar != same |
| "I'll fix it later" | You won't remember |
| "The prototype is probably wrong" | No, follow the prototype |
| "This CSS property doesn't matter" | It all matters |

---

## RULE 7: When In Doubt

If you're unsure about a value:
1. Inspect element in prototype browser
2. Copy computed style
3. Use that exact value
4. Document it in a comment

```jsx
// From prototype: .why-aai-image { box-shadow: 0 20px 40px rgba(0,0,0,0.1) }
style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
```

---

## RULE 8: CSS Specificity Issues

If Tailwind classes don't work (like `text-white` being overridden):
1. Check if body/parent has conflicting styles
2. Use `!important` modifier: `!text-white`
3. Or use inline style: `style={{ color: 'white' }}`
4. Document WHY in a comment

### Common Specificity Pitfall: Active States
```jsx
// BAD - !important on base overrides the active state
const linkClasses = "!text-[var(--color-dark)]";  // Always wins
const activeClasses = "text-[var(--color-amber)]"; // Never shows

// GOOD - !important on active state wins when active
const linkClasses = "text-[var(--color-dark)]";    // Base style
const activeClasses = "!text-[var(--color-amber)]"; // Wins when active
```

---

## RULE 8.5: Interactive States Verification (CRITICAL)

**Build passing ≠ Interactive states working.** You MUST manually verify ALL interactive states:

### Navigation Active States
- [ ] Current page link is highlighted (different color/weight)
- [ ] Navigate to `/experiences` → "Experiences" link should be highlighted
- [ ] Navigate to `/about` → "About" link should be highlighted
- [ ] Navigate to `/contact` → "Contact" link should be highlighted

### Hover States
- [ ] Buttons change appearance on hover
- [ ] Links change color on hover
- [ ] Cards have hover effects (scale, shadow, etc.)
- [ ] Images have hover overlays where applicable

### Focus States (Accessibility)
- [ ] Form inputs show focus ring
- [ ] Buttons show focus indicator
- [ ] Links are keyboard navigable

### Click/Active States
- [ ] Buttons show pressed state
- [ ] Filter pills show selected state
- [ ] Toggle elements show on/off state

### Scroll/Animation States
- [ ] Sticky headers work as expected
- [ ] Scroll-triggered animations fire correctly
- [ ] Carousels/sliders work properly

### How To Verify Interactive States
```
1. Open the page in browser
2. CLICK on each interactive element
3. HOVER over each interactive element
4. TAB through the page (keyboard navigation)
5. NAVIGATE to the page from another page
6. Compare EACH state against prototype
```

**If prototype has active navigation highlighting, implementation MUST have it too.**

---

## Quick Reference: Prototype Files

| File | Purpose |
|------|---------|
| `design/prototypes/styles.css` | All CSS values |
| `design/prototypes/01-home.html` | Home page structure |
| `design/prototypes/02-*.html` | Other page structures |

---

## Related Documentation

| File | Purpose |
|------|---------|
| `docs/MOBILE-DESIGN-GUIDE.md` | Mobile-specific patterns, breakpoints, and implementation reference |

---

---

## RULE 9: For Plan Writers (MANDATORY)

When writing implementation plans, you MUST:

### A. Include Prototype Reference
```markdown
### Task N: [Page Name]

**Prototype Source:** `design/prototypes/02-experiences.html` (lines 50-120)
**Stylesheet:** `design/prototypes/styles.css` (classes: .filter-pills, .route-card, etc.)
```

### B. Describe Actual Prototype Structure
```markdown
**Prototype Structure (VERIFIED):**
- Hero: Photo pile collage with overlay gradient
- Title: "Explore the Himalayas" (white, inside overlay)
- Filters: Dropdown selects for Difficulty + Duration, then pill buttons
- Cards: 6 cards in 3-column grid with specific hover effects
- CTA: "Can't find what you're looking for?" with contact link
- Pagination: "Load More Experiences" button
```

### C. Include Verification Step
```markdown
**Step X: Visual Verification (MANDATORY)**
1. Open `design/prototypes/02-experiences.html` in browser
2. Open `localhost:3000/experiences` side-by-side
3. Compare element-by-element at 1440px width
4. Screenshot both and overlay to find differences
5. Fix ANY discrepancy before proceeding
```

---

## RULE 10: For Plan Executors (MANDATORY)

When executing a plan, you MUST:

### A. Before Starting ANY Task
1. Read the prototype HTML file mentioned in the task
2. If no prototype file is mentioned, STOP and ask
3. Verify the plan description matches the prototype
4. If plan differs from prototype, THE PROTOTYPE WINS

### B. Red Flags - STOP Immediately If:
- Plan says "page header" but prototype has different hero structure
- Plan describes components not found in prototype HTML
- Plan doesn't reference a prototype file
- You haven't opened the prototype HTML in this session

### C. Completion Checklist
- [ ] I READ the prototype HTML file (not just the plan)
- [ ] My implementation matches the prototype structure
- [ ] My implementation uses exact CSS values from styles.css
- [ ] I did side-by-side visual comparison at 1440px
- [ ] I did side-by-side visual comparison at 768px
- [ ] I did side-by-side visual comparison at 375px
- [ ] ALL elements match (not "close enough")

---

## RULE 11: The Two-Source Verification

**NEVER rely on just one source:**

| What You're Doing | You MUST Reference |
|-------------------|---------------------|
| Writing a plan | Prototype HTML + styles.css |
| Executing a task | Plan + Prototype HTML + styles.css |
| Marking complete | Implementation + Prototype HTML (visual comparison) |

**"The plan told me to" is NOT an excuse if the plan was wrong.**

---

## Signature

By working on this project, I agree to follow these rules without exception.

**Time spent matching designs > Time spent fixing mismatches later**

---

## Appendix: Prototype File Mapping

| Page | Prototype File | Key Classes |
|------|----------------|-------------|
| Home | `01-home.html` | `.hero`, `.experiences-grid`, `.cta-section` |
| Experiences | `02-experiences.html` | `.photo-pile-collage`, `.filter-pills`, `.route-card` |
| Experience Detail | `03-experience-detail.html` | `.experience-hero`, `.stats-dashboard`, `.my-notes` |
| About | `04-about.html` | `.profile-dashboard`, `.journey-timeline` |
| Plan Your Trip | `05-plan.html` | `.form-group`, `.difficulty-options` |
| Contact | `06-contact.html` | `.contact-info`, `.quick-form` |
| Why AAI | `07-why-aai.html` | `.why-aai-grid`, `.testimonials` |
| Legal Pages | `08-*.html` | `.legal-content`, `.faq-item` |
