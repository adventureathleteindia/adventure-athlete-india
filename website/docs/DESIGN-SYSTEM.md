# Adventure Athlete India - Design System

## Overview

This document defines the visual design system extracted from `/design/prototypes/styles.css`.
Use this as a reference when implementing components.

---

## Colors

### Brand Colors

| Name | CSS Variable | Hex | Usage |
|------|-------------|-----|-------|
| Forest | `--color-forest` | `#2D5A3D` | Primary brand, buttons, icons |
| Forest Dark | `--color-forest-dark` | `#1E3D2A` | Hover states, footer background |
| Amber | `--color-amber` | `#D97706` | CTAs, highlights, accents |
| Amber Light | `--color-amber-light` | `#F59E0B` | Gradient start, badges |

### Neutral Colors

| Name | CSS Variable | Hex | Usage |
|------|-------------|-----|-------|
| Dark | `--color-dark` | `#1A202C` | Body text |
| Charcoal | `--color-charcoal` | `#374151` | Headings |
| Slate | `--color-slate` | `#64748b` | Labels, secondary text |
| Slate Dark | `--color-slate-dark` | `#475569` | Body paragraphs |
| Slate Light | `--color-slate-light` | `#94a3b8` | Muted text |
| Gray 50 | `--color-gray-50` | `#F9FAFB` | Light backgrounds |
| Gray 100 | `--color-gray-100` | `#F3F4F6` | Borders, dividers |
| Gray 200 | `--color-gray-200` | `#E5E7EB` | Inactive states |

### Social Colors (for hover states)

| Platform | Color |
|----------|-------|
| Instagram | `#E4405F` |
| YouTube | `#FF0000` |
| Strava | `#FC4C02` |
| Facebook | `#1877F2` |

---

## Typography

### Font Families

| Variable | Fonts | Usage |
|----------|-------|-------|
| `--font-heading` | Oswald, sans-serif | Headings, titles, stats |
| `--font-body` | Source Sans Pro, system fonts | Body text, paragraphs |

### Font Sizes

| Use Case | Size | Weight | Line Height |
|----------|------|--------|-------------|
| Hero title | `clamp(2.5rem, 6vw, 4rem)` | 500 | 1.1 |
| Section title | `clamp(2rem, 5vw, 3rem)` | 400 | 1.2 |
| Subsection title | `24px` | 500 | 1.3 |
| Intro paragraph | `20px` | 400 | 1.5 |
| Body text | `18px` | 300 | 1.8 |
| List items | `17px` | 400 | 1.7 |
| Small text | `14px-15px` | 400 | 1.6 |
| Labels | `11px-13px` | 600 | 1.4 |
| Stat values | `28px` | 500 | 1.2 |

### Letter Spacing

| Variable | Value | Usage |
|----------|-------|-------|
| `--tracking-wide` | `0.5px` | Buttons, small caps |
| `--tracking-wider` | `2px` | Section labels |
| `--tracking-widest` | `3px` | Uppercase headings |

---

## Spacing

### Section Spacing

| Variable | Value | Usage |
|----------|-------|-------|
| `--spacing-section` | `70px` | Vertical padding for sections |

### Container

| Property | Value |
|----------|-------|
| Max width | `1400px` |
| Padding (mobile) | `24px` |
| Padding (desktop) | `40px` |

### Common Spacings

| Size | Pixels | Usage |
|------|--------|-------|
| xs | `4px` | Inline elements |
| sm | `8px` | Small gaps |
| md | `16px` | Standard padding |
| lg | `24px` | Section gaps |
| xl | `32px` | Large gaps |
| 2xl | `48px` | Major sections |
| 3xl | `60px` | Hero spacing |

---

## Components

### Buttons

#### Primary/Gradient Button (.btn-gradient, .btn-primary)

```css
background: linear-gradient(90deg, #F59E0B 0%, #B45309 100%);
color: white;
padding: 14px 32px;
font-size: 14px;
font-weight: 600;
letter-spacing: 1px;
text-transform: uppercase;
```

Hover: `transform: translateY(-2px); box-shadow: 0 4px 12px rgba(217, 119, 6, 0.4);`

#### Flag Button (.btn-flag) - Nav CTA

```css
background: linear-gradient(90deg, #F59E0B 0%, #B45309 100%);
padding: 12px 24px;
font-size: 12px;
border-radius: 4px;
box-shadow: 0 2px 10px rgba(180, 83, 9, 0.35);
```

Includes shimmer animation on `::before` pseudo-element.

### Cards

#### Route Card

```css
border-radius: 16px;
overflow: hidden;
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
```

Hover: `transform: translateY(-4px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);`

### Stats Dashboard

```css
background: white;
border-radius: 16px (rounded-2xl);
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
margin-top: -80px (overlaps hero);
```

Icon container: `w-12 h-12 rounded-xl bg-[rgba(45,90,61,0.08)]`

### Forms

```css
input, textarea, select {
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid var(--color-gray-200);
  border-radius: 8px;
}

:focus {
  border-color: var(--color-forest);
  outline: none;
}
```

---

## Animations

### Silver Shimmer (Audio Player)

```css
.silver-shimmer {
  background: linear-gradient(90deg,
    #9ca3af 0%, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%, #9ca3af 100%
  );
  background-size: 200% 100%;
  animation: silverShimmer 3s linear infinite;
}

@keyframes silverShimmer {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}
```

### Audio Wave

```css
@keyframes audioWave {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(0.6); }
}

.animate-audio-wave {
  animation: audioWave 1.2s ease-in-out infinite;
}
```

### Flag Shimmer (Button)

```css
@keyframes flagShimmer {
  0% { left: -100%; }
  60%, 100% { left: 100%; }
}

/* Duration: 2.5s ease-in-out infinite */
```

---

## Photo Gallery Grid

### Structure

```css
/* Mobile: 2 columns */
grid-template-columns: 1.5fr 1fr;
grid-template-rows: 120px 120px;

/* Desktop (md+): 3 columns */
grid-template-columns: 2fr 1fr 1fr;
grid-template-rows: 200px 200px;

gap: 12px;
```

### Images

```css
.photo-main {
  grid-row: span 2;
  border-radius: 12px;
  object-fit: cover;
}

.photo-small {
  border-radius: 12px;
  object-fit: cover;
}
```

---

## Shadows

| Name | Value | Usage |
|------|-------|-------|
| sm | `0 1px 2px rgba(0,0,0,0.05)` | Subtle elevation |
| md | `0 4px 6px -1px rgba(0,0,0,0.1)` | Cards |
| lg | `0 10px 15px -3px rgba(0,0,0,0.1)` | Stats dashboard |
| xl | `0 20px 25px -5px rgba(0,0,0,0.1)` | Card hover |
| 2xl | `0 25px 50px -12px rgba(0,0,0,0.25)` | Modals |

---

## Breakpoints

| Name | Width | Usage |
|------|-------|-------|
| sm | 640px | Small tablets |
| md | 768px | Tablets, major layout shifts |
| lg | 1024px | Desktops |
| xl | 1280px | Large desktops |
| 2xl | 1536px | Extra large screens |

---

## Icon Sizes

| Context | Size |
|---------|------|
| Navigation | `w-6 h-6` (24px) |
| Stats primary | `w-6 h-6` (24px) |
| Stats secondary | `w-5 h-5` (20px) |
| Social icons | `w-[18px] h-[18px]` |
| Large feature | `w-10 h-10` (40px) |

---

## Z-Index Scale

| Layer | Z-Index | Usage |
|-------|---------|-------|
| Base | 0 | Default content |
| Elevated | 10 | Stats dashboard |
| Sticky | 50 | Sticky navigation |
| Modal backdrop | 100 | Background overlays |
| Modal | 200 | Modals, lightboxes |
| Toast | 300 | Notifications |

---

## Best Practices

### Use Inline Styles When

1. Value doesn't map to Tailwind (e.g., `28px`, `1.8`)
2. CSS variable needed (e.g., `var(--color-charcoal)`)
3. Tailwind class is being overridden by global CSS

### Use CSS Variables For

1. Brand colors
2. Font families
3. Consistent spacing

### Use Tailwind For

1. Layout (flex, grid)
2. Responsive design (md:, lg:)
3. Standard spacing that maps to Tailwind scale
4. Utility classes (hidden, overflow, etc.)
