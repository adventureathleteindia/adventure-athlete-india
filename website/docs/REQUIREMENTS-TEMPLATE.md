# Website Requirements Template

Use this template to capture ALL requirements before starting implementation. Proper upfront requirements = zero rework later.

---

## How to Use This Template

1. **Fill out EVERY section** before writing any code
2. **Review with stakeholder** to confirm understanding
3. **Reference this document** during planning and execution
4. **Update this document** if requirements change

---

## 1. Design Source Files

| Item | Location | Notes |
|------|----------|-------|
| HTML Prototypes | `design/prototypes/` | Source of truth for structure |
| CSS Stylesheet | `design/prototypes/styles.css` | Source of truth for styling |
| Design System | | (Figma/Sketch link if available) |
| Brand Guidelines | | (Logo, colors, fonts) |

### Page Mapping

| Page | Prototype File | Route |
|------|----------------|-------|
| Home | `01-home.html` | `/` |
| (add all pages) | | |

---

## 2. Global Components Checklist

### Navigation
- [ ] Logo placement and size
- [ ] Navigation links (list all)
- [ ] **Active state highlighting** ← CRITICAL: Current page must be highlighted
- [ ] Mobile hamburger menu behavior
- [ ] Sticky/fixed behavior on scroll
- [ ] Transparent vs solid variant

### Footer
- [ ] Column structure
- [ ] Social links
- [ ] Legal links
- [ ] Decorative elements (SVGs, patterns)

### Buttons
- [ ] Primary button style
- [ ] Secondary button style
- [ ] Hover states
- [ ] Focus states
- [ ] Disabled states

---

## 3. Per-Page Requirements

### Page: [Name]

**Prototype File:** `design/prototypes/XX-page.html`

#### Structure (top to bottom)
1. [ ] Section 1: [description]
2. [ ] Section 2: [description]
3. [ ] ...

#### Interactive Elements
- [ ] Element 1: hover state, click behavior
- [ ] Element 2: ...

#### Dynamic Features
- [ ] Filters: [describe behavior]
- [ ] Pagination: [describe behavior]
- [ ] Forms: [validation rules]

---

## 4. Interactive States Checklist

**CRITICAL:** These are often missed in implementation but visible in prototypes.

### Navigation States
- [ ] Hover: links change color/background
- [ ] **Active/Current: current page link is highlighted**
- [ ] Focus: keyboard navigation visible
- [ ] Mobile: touch states

### Button States
- [ ] Default appearance
- [ ] Hover appearance
- [ ] Active/pressed appearance
- [ ] Focus ring
- [ ] Disabled appearance

### Form States
- [ ] Empty/placeholder
- [ ] Focused
- [ ] Filled
- [ ] Error
- [ ] Success
- [ ] Disabled

### Card/Item States
- [ ] Default
- [ ] Hover (scale, shadow, overlay)
- [ ] Selected (if applicable)

---

## 5. Responsive Breakpoints

| Breakpoint | Width | Key Changes |
|------------|-------|-------------|
| Desktop | 1440px+ | Full layout |
| Tablet | 768px-1439px | [describe] |
| Mobile | <768px | [describe] |

---

## 6. Animation/Transition Requirements

| Element | Trigger | Animation |
|---------|---------|-----------|
| Buttons | Hover | Scale 1.05, 200ms |
| Cards | Hover | Shadow increase, 300ms |
| (add all) | | |

---

## 7. Content Requirements

### Text Content
- [ ] All headings and subheadings
- [ ] CTA button text
- [ ] Form labels and placeholders
- [ ] Error messages
- [ ] Success messages

### Media
- [ ] Image sources/placeholders
- [ ] Video embeds
- [ ] Icons (specify library or custom)

---

## 8. Functionality Requirements

### Forms
| Form | Fields | Validation | Submit Action |
|------|--------|------------|---------------|
| Contact | name, email, message | required, email format | API call |
| (add all) | | | |

### Filters/Search
| Feature | Behavior |
|---------|----------|
| Category filter | Filter cards by category |
| (add all) | |

### Pagination
| Feature | Behavior |
|---------|----------|
| Load More | Show next 6 items |
| (add all) | |

---

## 9. Third-Party Integrations

| Integration | Purpose | Implementation Notes |
|-------------|---------|---------------------|
| Strava | Route embeds | Placeholder if no API key |
| (add all) | | |

---

## 10. Verification Checklist

**Before marking ANY page complete:**

### Visual Verification
- [ ] Side-by-side comparison at 1440px
- [ ] Side-by-side comparison at 768px
- [ ] Side-by-side comparison at 375px
- [ ] Colors match (use color picker)
- [ ] Spacing matches (use dev tools)
- [ ] Typography matches

### Interactive Verification
- [ ] All hover states work
- [ ] All click states work
- [ ] **Navigation active state shows current page**
- [ ] Form validation works
- [ ] Filters/pagination work
- [ ] Mobile menu works

### Technical Verification
- [ ] Build passes
- [ ] Tests pass
- [ ] Lint passes
- [ ] No console errors
- [ ] No accessibility violations

---

## 11. Known Issues Log

| Issue | Status | Notes |
|-------|--------|-------|
| | | |

---

## 12. Sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Requirements gathered by | | | |
| Approved by | | | |

---

## Appendix: Common Missed Requirements

These are frequently missed during requirements gathering. **Check each one explicitly:**

1. **Navigation active state** - Current page link should be highlighted
2. **Form validation messages** - What appears when validation fails
3. **Empty states** - What shows when no data/results
4. **Loading states** - What shows while loading
5. **Error states** - What shows on API failure
6. **Hover/focus states** - All interactive elements need these
7. **Mobile-specific behaviors** - Hamburger menu, touch targets
8. **Scroll behaviors** - Sticky headers, infinite scroll, scroll-to-top
9. **Animation timings** - Duration and easing for all transitions
10. **Accessibility** - Focus management, ARIA labels, keyboard navigation
