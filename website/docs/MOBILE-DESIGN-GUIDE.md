# Mobile Design Guide

This document captures all mobile-specific design patterns and implementation decisions for the Adventure Athlete India website. Reference this when building new pages.

---

## Breakpoints

| Name | Width | Tailwind Prefix |
|------|-------|-----------------|
| Mobile | < 768px | (default) |
| Tablet | >= 768px | `md:` |
| Desktop | >= 1024px | `lg:` |

**Approach**: Mobile-first. Write mobile styles as default, then add `md:` or `lg:` prefixes for larger screens.

---

## Navigation

### Logo Text
```tsx
className="text-[11px] md:text-sm tracking-[1.5px] md:tracking-[var(--tracking-widest)] whitespace-nowrap"
```
- Mobile: 11px, 1.5px letter-spacing, no wrap
- Desktop: 14px, 3px letter-spacing

### CTA Button
- **Mobile**: Compact "Plan" button next to hamburger
  ```tsx
  className="btn-flag !py-2 !px-3 !text-[10px]"
  ```
- **Desktop**: Full "Plan Your Adventure" button
  ```tsx
  className="btn-flag !hidden md:!inline-block"
  ```

### Showing/Hiding Elements
Use `!important` modifiers to override CSS specificity issues:
```tsx
// Desktop only
className="!hidden md:!inline-block"

// Mobile only
className="flex md:!hidden"
```

### Mobile Menu (Hamburger)
Slide-in drawer from right side:
```tsx
// State management
const [isMenuOpen, setIsMenuOpen] = useState(false);

// Hamburger button
<button onClick={() => setIsMenuOpen(true)}>...</button>

// Menu overlay structure
{isMenuOpen && (
  <div className="fixed inset-0 z-[100] md:hidden">
    {/* Backdrop - click to close */}
    <div className="absolute inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)} />

    {/* Panel - slides from right */}
    <div className="absolute top-0 right-0 h-full w-[280px] bg-white shadow-xl">
      {/* Close button, links, CTA, social icons */}
    </div>
  </div>
)}
```

**Mobile Menu Social Icons** - Show brand colors by default:
```tsx
<a className="text-[#E4405F] hover:opacity-70">Instagram</a>
<a className="text-[#FF0000] hover:opacity-70">YouTube</a>
<a className="text-[#FC4C02] hover:opacity-70">Strava</a>
<a className="text-[#1877F2] hover:opacity-70">Facebook</a>
```

---

## Hero Section

### Mobile Tagline with Pipe Symbols
On mobile, each tagline phrase starts with an amber `|` pipe symbol:
```tsx
<span className="block sm:inline">
  <span className="text-[var(--color-amber)] mr-2 sm:hidden">|</span>
  Unmapped trails
</span>
<span className="hidden sm:inline text-[var(--color-amber)] mx-3">|</span>
```
- Mobile: Phrases stack vertically, each with `|` prefix
- Desktop: Phrases inline with `|` separators between them

### Silver Shimmer Effect
"Yes, this is India." has animated silver shimmer:
```css
.silver-shimmer {
  background: linear-gradient(90deg, #9ca3af 0%, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%, #9ca3af 100%);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: silverShimmer 3s ease-in-out infinite;
}
```

---

## Section Spacing

| Section | Mobile | Desktop |
|---------|--------|---------|
| Standard sections | `py-12` (48px) | `py-[var(--spacing-section)]` (70px) |
| CTA Section | `py-12 px-6` | `py-[70px] px-10` |
| WhyAAI | `py-12` | `py-20` |

**Pattern**:
```tsx
className="py-12 md:py-[var(--spacing-section)]"
```

---

## Footer

### Mobile Layout (3-column compact)
```
┌─────────────────────────────────────┐
│ Adventure Athlete India             │
│ Experience the raw Himalayas.       │
│ Shimla, HP • +91-9459033240         │
│ [social icons - 32px]               │
├───────────┬───────────┬─────────────┤
│Experiences│  About    │   Links     │
│• MTB      │• About Me │• FAQ        │
│• Road     │• Why Us   │• Terms      │
│• Trail    │• Contact  │• Privacy    │
│• Hiking   │           │• Safety     │
├───────────┴───────────┴─────────────┤
│ © 2026 Adventure Athlete India      │
└─────────────────────────────────────┘
```

### Mobile Footer Styles
- Padding: `py-10 px-6`
- Brand section: Full width, centered, compact info on one line
- Link columns: `grid-cols-3 gap-4 text-center`
- Column headers: `text-[10px] tracking-[1px]`
- Links: `text-xs` (12px)
- Social icons: `w-8 h-8` centered (`justify-center`)
- Bottom bar: `mt-8`, centered (`text-center items-center`)
- White mountain silhouette on border line at 33% from left

### Desktop Footer Styles
- Padding: `py-[60px] px-10`
- Grid: `grid-cols-[2fr_1fr_1fr_1fr] gap-[60px]`
- Column headers: `text-xs tracking-[2px]`
- Links: `text-sm` (14px)
- Social icons: `w-9 h-9`
- Bottom bar margin: `mt-[60px]`

### Decorative Elements
- **Mobile**: Hide decorative SVGs (dots pattern)
  ```tsx
  className="hidden md:block absolute ..."
  ```
- **Mobile**: Mountain silhouette layers (more visible on mobile)
  ```tsx
  className="h-[120px] md:h-[300px]"  // Layer 1 - opacity 0.35
  className="h-[80px] md:h-[200px]"   // Layer 2 - opacity 0.5/0.4
  ```
- **Mobile**: White mountain silhouette on bottom bar border line
  ```tsx
  <div className="md:hidden absolute -top-[20px] left-[33%] -translate-x-1/2 opacity-30">
    <svg className="w-[50px] h-[35px]" viewBox="0 0 150 100" fill="white">...</svg>
  </div>
  ```

---

## Grid Layouts

### Route Cards
```tsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
```
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

### WhyAAI Section
```tsx
className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-[60px]"
```
- Mobile: 1 column, 40px gap
- Desktop: 2 columns (1:1.2 ratio), 60px gap

---

## Typography Scale (Mobile)

| Element | Mobile | Desktop |
|---------|--------|---------|
| Nav logo | 11px | 14px |
| Footer headers | 10px | 12px |
| Footer links | 12px | 14px |
| Section text margin | `mb-10` | `mb-16` |

---

## Buttons

### Standard Gradient Button
Desktop padding is preserved; no mobile-specific overrides needed for main CTAs.

### Nav CTA (btn-flag)
```tsx
// Mobile
className="btn-flag !py-2 !px-3 !text-[10px]"

// Desktop
className="btn-flag" // Uses default: py-12px px-24px text-12px
```

---

## Common Patterns

### Responsive Padding
```tsx
// Horizontal padding
className="px-6 md:px-10"

// Vertical padding
className="py-12 md:py-[70px]"
```

### Responsive Gap
```tsx
className="gap-8 md:gap-[60px]"
```

### Hide on Mobile, Show on Desktop
```tsx
className="hidden md:block"
// or with !important for specificity
className="!hidden md:!block"
```

### Show on Mobile, Hide on Desktop
```tsx
className="block md:hidden"
// or
className="md:!hidden"
```

### Responsive Text
```tsx
className="text-xs md:text-sm"
className="text-[11px] md:text-sm"
```

---

## Checklist for New Pages

When building a new page, verify:

- [ ] Section padding uses `py-12 md:py-[var(--spacing-section)]`
- [ ] Container uses `.container` class (has responsive padding built-in)
- [ ] Grids have mobile breakpoints (1-col mobile, 2-col tablet, 3-col desktop)
- [ ] Large gaps reduced on mobile (`gap-8 md:gap-[60px]`)
- [ ] Decorative elements hidden on mobile if not essential
- [ ] Text sizes appropriate for mobile readability
- [ ] Buttons have adequate tap targets (min 44px height)
- [ ] Images have proper `sizes` attribute for responsive loading

---

## CSS Specificity Notes

Tailwind classes may be overridden by:
1. Body's `color: var(--color-dark)` rule
2. `a { color: inherit }` rule

**Solutions**:
- Use `!important` modifier: `!text-white`
- Use inline styles for guaranteed specificity
- Use JS event handlers for hover states (as done in nav social icons)

---

*Last updated: January 7, 2026*
