---
name: Pulse
description: A minimalist API monitoring dashboard with instant clarity
colors:
  bg-darkest: "#080c14"
  bg-dark: "#0d1220"
  text-primary: "#e2e8f0"
  text-secondary: "#94a3b8"
  text-tertiary: "#475569"
  border-subtle: "rgba(255,255,255,0.07)"
  border-active: "rgba(255,255,255,0.13)"
  status-vital: "#10b981"
  status-warning: "#f59e0b"
  status-alert: "#f43f5e"
  accent-clarity: "#22d3ee"
  accent-insight: "#8b5ce6"
typography:
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  mono:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.03em"
  label:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    letterSpacing: "0.03em"
    textTransform: "uppercase"
rounded:
  sm: "8px"
  md: "10px"
  lg: "14px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  xxl: "28px"
components:
  card-base:
    backgroundColor: "{colors.bg-dark}"
    borderRadius: "{rounded.md}"
    border: "1px solid {colors.border-subtle}"
  card-hover:
    border: "1px solid {colors.border-active}"
  card-alert:
    backgroundColor: "{colors.bg-dark}"
    borderRadius: "{rounded.md}"
    border: "1px solid rgba(244,63,94,0.2)"
  status-pill:
    backgroundColor: "rgba(0,0,0,0.3)"
    textColor: "{colors.text-primary}"
    borderRadius: "20px"
    padding: "2px 9px"
    typography: "label"
  button-primary:
    backgroundColor: "{colors.accent-clarity}"
    textColor: "{colors.bg-darkest}"
    borderRadius: "{rounded.sm}"
    padding: "10px 20px"
    typography: "body"
    fontWeight: 600
  badge-vital:
    backgroundColor: "rgba(16,185,129,0.1)"
    textColor: "{colors.status-vital}"
  badge-warning:
    backgroundColor: "rgba(245,158,11,0.1)"
    textColor: "{colors.status-warning}"
  badge-alert:
    backgroundColor: "rgba(244,63,94,0.1)"
    textColor: "{colors.status-alert}"
---

# Design System: Pulse

## Overview

**Creative North Star: "The Midnight Dashboard"**

Pulse embraces a minimalist, dark-first aesthetic designed for precision and control in high-stakes monitoring. The visual system prioritizes instant clarity: every element serves the developer's immediate need to understand API health and locate problems. The dark navy backdrop (#080c14) provides a stable, low-fatigue foundation; layered card surfaces (#0d1220) create hierarchy without distraction. Accent colors—cyan for active focus, green for vitality, amber for warning, red for urgency—form a semantic color language that developers can read without thinking. The interface removes ceremony; typography, spacing, and components stay minimal and purposeful. Confident minimalism: you are a professional tool, not a decorative experience.

**Key Characteristics:**
- Dark, low-contrast backgrounds designed for sustained monitoring without eye strain
- Semantic color coding tied directly to API health states
- Minimal ornament; every edge and space serves clarity
- Monospace typography for technical data; sans-serif for prose and labels
- Dense, scannable layouts optimized for desktop rapid-response workflows

## Colors

The palette centers on precise status signaling. Cyan (#22d3ee, "Midnight Clarity") acts as the primary interactive accent—focus, selection, and active states. The three status colors form an intuitive health hierarchy: green (#10b981, "Vital Emerald") signals healthy systems; amber (#f59e0b) signals degraded performance; red (#f43f5e, "Alert Crimson") signals failures or downtime. Neutral text layers (#e2e8f0 primary → #475569 tertiary) create visual hierarchy on the dark background without jarring contrast. Borders use transparent white at low opacity (7–13%), preserving the dark aesthetic while defining card and input boundaries.

- **bg-darkest** (#080c14): Root background, application chrome
- **bg-dark** (#0d1220): Card and panel backgrounds; layered surfaces
- **text-primary** (#e2e8f0): Primary text, headings
- **text-secondary** (#94a3b8): Secondary content, descriptions
- **text-tertiary** (#475569): Labels, metadata, tertiary information
- **status-vital** (#10b981): Healthy, active, success states (Vital Emerald)
- **status-warning** (#f59e0b): Degraded performance, caution
- **status-alert** (#f43f5e): Failures, errors, downtime (Alert Crimson)
- **accent-clarity** (#22d3ee): Primary interactive accent, focus, active navigation (Midnight Clarity)
- **accent-insight** (#8b5ce6): Supporting accent for insights, analysis, secondary highlights

## Typography

Two font families maintain clarity and hierarchy:

- **Inter** (sans-serif): body text, labels, navigation, headings. Geometric, readable, familiar to developers. Used at 14px for body copy and 11–12px for labels.
- **JetBrains Mono** (monospace): technical data, timestamps, URLs, latency values, status codes. Monospace signals "this is data" and aids rapid scanning of metrics. Always paired with tertiary text color (#475569) to avoid visual noise.

Weights are reserved: 400 for body and mono, 600 for labels and button text. No hairline weights or ultra-heavy weights; the palette stays restrained.

## Layout

Desktop-first, single-column navigation with a left sidebar for primary routes (Dashboard, Endpoints, Incidents, History). Main content area uses a card-based grid: card width typically spans 100% of container on first row, splitting to 2–3 columns below for stat cards and charts. Padding and spacing follow the scale (xs: 4px → xxl: 28px). Gutters between cards are consistent (16px). Responsive behavior is secondary; mobile adapts the sidebar to a mobile nav bar and card columns stack to single column at viewport < 768px.

Modal dialogs are centered and use max-width 420px. Tooltips and popovers render at 8–10px gap from trigger. All animations use a 0.15–0.2s ease-out timing function; motion is subtle and focuses on state transitions (hover, focus, open/close), never decorative.

## Elevation & Depth

Pulse avoids shadows in the traditional sense. Instead, layering is achieved through background color steps: #080c14 (darkest) → #0d1220 (dark) → future lighter layers if needed. Borders create visual containment: subtle white borders (7% opacity) define card edges; active states bump to 13% opacity. No drop shadows, no blur effects. The aesthetic is flat and layered, not dimensioned.

Glowing borders are used sparingly for alert states (e.g., a card with an active incident glows with a red border at 20% opacity). This creates urgency without visual chaos.

## Shapes

Consistency in corner radius: 8px for smaller UI elements (buttons, badges, small cards), 10px for primary cards and panels, 14px for modals. Fully rounded (border-radius: 50%) is reserved for status indicator dots and badge shapes. Buttons use 8px border-radius; inputs and text areas use 8px. No harsh corners; no extreme radii (24px+). Line thickness is always 1px; no double or triple borders.

## Components

### Status Pill
Compact inline badge showing API health. Combines a colored dot (6px, border-radius: 50%) with uppercase text label (11px JetBrains Mono, 600 weight). Padding: 2px top/bottom, 9px left/right. Background is semi-transparent (rgba-based) tied to status: green/amber/red. Never uses text color alone; dot + label + background together encode status.

### Card
Primary surface component. Background: #0d1220. Border: 1px solid rgba(255,255,255,0.07). Border-radius: 10px. Hover state bumps border to rgba(255,255,255,0.13) if clickable. Alert variant: border color rgba(244,63,94,0.2) (red tint) for incident cards. Transition: border-color 0.15s ease-out.

### Button
Primary: background #22d3ee, text #080c14, padding 10px 20px, border-radius 8px, font-weight 600. Secondary/ghost buttons use transparent background with text color #22d3ee and border rgba(34,211,238,0.3). Hover state: slightly increased opacity or brightness; active state (on click) applies a 0.1s scale reduction (98%). Focus ring: 2px outline in #22d3ee at 50% opacity.

### Status Indicator Dot
6px circle, border-radius 50%. Color mapped to status (green/amber/red). Used inline in lists, tables, and timeline views. No border; solid fill.

### Charts
Built with Recharts. Custom tooltip background: #0d1220 (inherits card styling). Label text: #475569. Grid lines: rgba(255,255,255,0.05). Line stroke: 2px; default color #22d3ee. Area fill opacity: 0.1. Animations are subtle (animationDuration 300ms).

## Do's and Don'ts

**Do:**
- Use the color palette semantically. Green = healthy. Amber = watch. Red = urgent.
- Pair text and visual cues (label + color, icon + text) so color alone never carries meaning.
- Reserve Midnight Clarity cyan (#22d3ee) for interactive affordances: buttons, active navigation, focus states.
- Use monospace for any timestamp, URL, metric, or status code. It signals "this is data."
- Maintain the 8/10/14px border-radius hierarchy; avoid custom radii.
- Space elements using the xs–xxl scale; avoid arbitrary pixel values.
- Assume a desktop-first experience; responsive stacking is secondary.

**Don't:**
- Use shadows or drop-shadow filters. Elevation is expressed through layered background colors and borders.
- Mix fonts. Stick to Inter (sans) and JetBrains Mono (mono). No serif, no script, no decorative fonts.
- Apply color to text without a background or supporting glyph. Contrast must be WCAG AA minimum.
- Rely on color alone to communicate state. Always pair with text label, icon, or both.
- Add gradients or blurred backgrounds unless they are tied to a specific component (e.g., modal backdrop).
- Use opacity shifts (fading) as a primary hover state. Use color, border, or scale changes.
- Introduce new accent colors. Cyan, green, amber, red, and purple cover interaction and status. If more color is needed, defer to the Neutral text palette.
- Forget keyboard navigation. All interactive elements must be reachable and show focus state.
