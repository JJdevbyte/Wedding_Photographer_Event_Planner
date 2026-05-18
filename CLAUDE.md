# Wedding Photographer & Event Planner Portfolio Blueprint (CLAUDE.md)

This document outlines the design architecture, tech stack, build instructions, and code conventions for our high-end, image-heavy interactive portfolio site.

## Tech Stack & Architecture
- **Framework:** Next.js (App Router, React 19)
- **Styling:** Tailwind CSS v4, Vanilla CSS variables for dynamic themes
- **Animations:** Framer Motion (for physics-based 3D carousels, orbit menus, and transitions)
- **Icons:** Lucide React
- **Images:** Premium custom-generated portraiture and wedding event assets (WebP)

## Key Design "Tricks" from spencergabor.work
1. **Typography Depth Layering:** Giant, high-end display headings layered *behind* fanned-out interactive media card stacks (using Z-Index separation).
2. **3D Tilted Card Carousel:** Physics-driven carousel where adjacent cards are rotated outward and faded, straightening and sizing up as they slide into active focus.
3. **Floating Theme Picker (Color Wheel Switcher):** Orbiting floating selector to instantly transition background tones, fonts, and accent colors across the entire site.
4. **Seamless Detail Portals:** Clicking cases launches immediate, scrollable overlay modals with mixed-width, irregular masonry grids for immersive, rapid gallery viewing.

## Development & Build Commands
- **Install Dependencies:** `npm install`
- **Run Dev Server:** `npm run dev`
- **Build Production:** `npm run build`
- **Lint Code:** `npm run lint`

## Coding Conventions
- **TypeScript:** Strict type checking, clear interface definitions.
- **Dynamic Theming:** Map all colors to root CSS variables (`--bg-primary`, `--text-primary`, `--accent-color`, etc.) and transition them smoothly.
- **Performance:** Optimize high-resolution images using Next.js `<Image />` component with correct layout sizing and `priority` for above-the-fold media.
