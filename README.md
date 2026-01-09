# AI Agents Inbox

A beautiful, interactive inbox interface for managing AI agent requests with fluid animations and keyboard navigation. Built with Solid.js, TanStack Router, and Tailwind CSS.

## About This Project

 This project showcases an inbox where AI agents await your decisions, featuring smooth expand/collapse animations, keyboard navigation, and a fun dissolve effect when approving items.

- Two-tabs: "Needs You" (active items) and "AI Handling" (handled items)
- Expand/collapse animations
- Navigate with `J` (down) and `K` (up) keys, with scroll following selection
- Following WCAG accessibility practices
- Dissolve effect: Items dissolve with a SVG filter effect when approved ( Safari not supported due to filter limitations)
- Design tokens from Figma to Tailwind for consistent styling
- iOS-style rounded corners: Using `corner-shape` CSS property for smooth, modern corners

## Installation & Running

[Bun](https://bun.sh/) installed

```bash
bun install
bun run start
```

### Building For Production

```bash
# Building For Production
bun --bun run build
```

## Tech Stack

- **Solid.js**: Reactive UI framework
- **TanStack Router**: File-based routing
- **Tailwind CSS**: Utility-first styling
- **TypeScript**: Type safety

## Implementation Details

### 1. Dissolve Effect
The most distinctive feature is the dissolve animation when approving items. This uses a chain of SVG filters applied sequentially:

- Turbulence filter creates the organic dissolve pattern
- Displacement map creates the distortion effect
- Filters are composed to create the final disappearing animation
- Implementation inspired by existing effects but recreated from scratch

### 2. Design System Integration
- Converted Figma design tokens directly to Tailwind configuration
- Custom utility for `corner-shape` CSS property (cutting-edge, not yet fully supported)
- Automatically applies iOS-style smooth rounded corners throughout the app

### 3. Keyboard Navigation
- `J` key: Move down
- `K` key: Move up  
- `Escape`: Clear selection
- Auto-scroll follows the selected item

## Initial Challenge

The most difficult aspect was simulating the interaction model of AI agents and token streaming without implementing a full backend. I explored several approaches but prioritized frontend polish given the time constraint.

What I Deprioritized
- Backend/API integration (mocked data instead)
- Cross-browser compatibility (dissolve effect Safari limitation)
- Advanced agent simulation logic

Solid.js learnings coming from React/Svelte
- Reactivity without virtual DOM overhead like in Svelte
- Minimal runtime, compiled away reactivity
- Familiar JSX: easy transition from React
- Learning curve for new patterns
