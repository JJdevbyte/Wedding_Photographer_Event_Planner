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
- **TypeScript:** Strict type checking, explicit interface properties, and custom data type definitions.
- **Hydration Safety (Next.js SSR):**
  - **Browser APIs:** Never access `window`, `document`, or `localStorage` during initial render. Encapsulate all browser-only queries and state updates within React `useEffect()` hooks.
  - **Extension Locks:** Keep the `<meta name="darkreader" content="NO-DARKREADER-PLUGIN" />` and `<meta name="darkreader-lock" />` headers active in the root metadata to prevent inline style injection conflicts during hydration.
  - **Stable Date Calculations:** Avoid dynamic locale-formatting or server-to-client formatting discrepancies inside markup renders.
- **Dynamic Theming:** Map all accent and background colors to centralized vanilla CSS variables (`--bg-primary`, `--text-primary`, `--accent-color`, etc.) and transition them smoothly on theme swaps.
- **Performance & Media Optimization:** 
  - Utilize Next.js `<Image />` component with custom layout bounds, correct `sizes` specs, and dynamic priority attributes above the fold.
  - Keep spring configurations lightweight (`stiffness: 180`, `damping: 22`) for responsive carousel layouts to guarantee 60fps animations.
