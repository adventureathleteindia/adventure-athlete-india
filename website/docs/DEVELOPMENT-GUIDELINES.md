# Development Guidelines - Adventure Athlete India

## MANDATORY: Follow These Rules Every Session

### 0. CRITICAL LESSON LEARNED (READ FIRST)

**Past sessions failed because:**
1. Plans described components differently than prototypes showed
2. Executors followed plans without reading prototype HTML files
3. TDD verified code runs, not that it matches design
4. "Build passes" was mistaken for "design matches"

**The solution:**
- ALWAYS read the prototype HTML file before coding
- If plan differs from prototype, PROTOTYPE WINS
- Visual verification is mandatory, not optional
- Tests verify code works; eyes verify design matches

**See `docs/HARD-RULES-DESIGN-MATCHING.md` for complete rules.**

---

### 1. Design Matching (NON-NEGOTIABLE)

**Before writing ANY component code:**
1. **READ the prototype HTML file** (not just look at it - READ it)
2. Open `design/prototypes/styles.css` and extract EXACT values:
   - Colors (hex codes)
   - Spacing (px values)
   - Gradients (exact syntax)
   - Shadows (exact syntax)
   - Font sizes, weights, letter-spacing
   - Border radius values
3. **Write down what you see** in the prototype before implementing
4. Compare your written description to any plan - if they differ, prototype wins

**During implementation:**
1. Keep prototype HTML open in another tab/window
2. Reference it constantly, not from memory
3. Use exact text content from prototype
4. Use exact class structure from prototype

**After writing component:**
1. Side-by-side visual comparison with prototype
2. Check at 3 breakpoints: 375px, 768px, 1440px
3. If ANY pixel looks different - fix it before moving on
4. Do NOT mark complete until visual match is confirmed

**Design Source of Truth:**
- `design/prototypes/styles.css` - CSS values
- `design/prototypes/*.html` - Structure, layout, and content

### 2. TDD Approach (MANDATORY)

Follow `superpowers:test-driven-development`:
1. **RED**: Write failing test first
2. **GREEN**: Write minimal code to pass
3. **REFACTOR**: Clean up while keeping tests green

**Never skip watching the test fail first.**

### 3. Systematic Development

Use these superpowers skills in order:
1. `superpowers:brainstorming` - Before any creative work
2. `superpowers:writing-plans` - For multi-step tasks
3. `superpowers:test-driven-development` - For all implementation
4. `superpowers:verification-before-completion` - Before claiming done
5. `superpowers:requesting-code-review` - After major features

### 4. Component Checklist

Before marking ANY component complete:
- [ ] CSS values match prototype EXACTLY (copy-paste from styles.css)
- [ ] All tests written and passing
- [ ] Tested at mobile (375px)
- [ ] Tested at tablet (768px)
- [ ] Tested at desktop (1440px)
- [ ] Visual comparison screenshot taken
- [ ] No Tailwind defaults used - only design-specified values

### 5. Common Mistakes to AVOID

| Mistake | Correct Approach |
|---------|------------------|
| Using `rounded-lg` | Extract exact `border-radius` from CSS |
| Using `shadow-sm` | Extract exact `box-shadow` from CSS |
| Guessing colors | Copy exact hex from CSS |
| Assuming spacing | Copy exact px values from CSS |
| Skipping responsive test | Test ALL 3 breakpoints |

### 6. Reference Files

When implementing, always have these open:
- `design/prototypes/styles.css` - Design tokens
- `design/prototypes/01-home.html` - Home page structure
- This file (`docs/DEVELOPMENT-GUIDELINES.md`)

---

## Design Tokens Reference (from styles.css)

```css
/* Colors */
--forest: #2D5A3D;
--forest-dark: #1E3D2A;
--amber: #D97706;
--amber-light: #F59E0B;
--dark: #1A202C;
--slate: #64748b;
--slate-dark: #475569;

/* Button Gradient */
background: linear-gradient(90deg, #F59E0B 0%, #B45309 100%);

/* Footer Gradient */
background: linear-gradient(180deg, #3a7a52 0%, #2D5A3D 40%, #1e3d29 100%);

/* Section Padding */
--section-padding: 70px;

/* Container Max Width */
--container-max: 1400px;
```

---

### 7. Plan Writing Requirements (FOR ARCHITECTS)

When writing implementation plans for this project:

**Every task MUST include:**
```markdown
### Task N: [Component/Page Name]

**Prototype Source:** `design/prototypes/XX-name.html`
**Relevant CSS:** `design/prototypes/styles.css` (classes: .class1, .class2)

**Prototype Structure (I verified this):**
- [Describe actual HTML structure seen in prototype]
- [List all major elements/sections]
- [Note any special effects, overlays, gradients]
- [Include exact text content where important]

**Steps:**
1. ...
```

**Do NOT write plans from memory.** Always read the prototype file first.

---

### 8. Plan Execution Requirements (FOR IMPLEMENTERS)

When executing a plan for this project:

1. **Before starting each task:**
   - Read the prototype HTML file mentioned in task
   - If no prototype file is mentioned, STOP and find it
   - Compare plan description to actual prototype
   - If they differ, follow the PROTOTYPE not the plan

2. **During implementation:**
   - Keep prototype HTML open at all times
   - Match structure exactly, not approximately
   - Use exact CSS values from styles.css

3. **Before marking task complete:**
   - Visual comparison at 3 breakpoints
   - All elements match (not "close enough")
   - Tests pass AND design matches

**"The plan told me to" is never an excuse for wrong implementation.**

---

### 9. Quick Verification Checklist

Copy this for every page/component:

```
Page: _______________
Prototype: design/prototypes/_______________

Before Coding:
[ ] Read prototype HTML file completely
[ ] Read relevant CSS classes in styles.css
[ ] Wrote down prototype structure before coding

After Coding - Visual:
[ ] Visual match at 1440px
[ ] Visual match at 768px
[ ] Visual match at 375px
[ ] All text matches prototype exactly
[ ] All spacing matches prototype exactly
[ ] All colors match prototype exactly

After Coding - Interactive States (CRITICAL):
[ ] Navigation active state highlights current page
[ ] All hover states work (buttons, links, cards)
[ ] All focus states work (keyboard navigation)
[ ] Filter/toggle states work
[ ] Form validation states work

After Coding - Technical:
[ ] Tests pass
[ ] Build passes
[ ] Lint passes
[ ] No console errors
```

---

### 10. Requirements Template

For NEW projects, use `docs/REQUIREMENTS-TEMPLATE.md` to capture ALL requirements upfront:
- Design source files
- Global components (navigation, footer)
- Per-page requirements
- **Interactive states** (hover, active, focus)
- Responsive breakpoints
- Animation requirements

**Proper upfront requirements = zero rework later.**

---

### 11. Common Missed Requirements

These are FREQUENTLY missed. Check each one EXPLICITLY:

| Requirement | How to Verify |
|-------------|---------------|
| **Navigation active state** | Navigate to each page, current link should be highlighted |
| Form validation messages | Submit empty/invalid forms |
| Empty states | Remove all data, see what shows |
| Loading states | Add network delay, see spinners |
| Error states | Simulate API failures |
| Hover states | Mouse over every interactive element |
| Focus states | Tab through entire page |
| Mobile menu | Test hamburger, touch targets |

---

**This document is the law. No exceptions.**
