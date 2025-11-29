# Multi²¹ (Multi21) · Grid Designer

Multi²¹ is the **square grid designer**. It’s the core building block for:

- Content galleries (YouTube, product cards, event flyers).
- KPI dashboards.
- Future “performance wall” layouts.

It lives at: `/multi21`

---

## 1. Current Behaviour (baseline)

**Layout**

- Uses a CSS grid for the **main tile area**.
- Columns are controlled via sliders:
  - Mobile columns
  - Desktop columns
- Gap (gutter) is controllable.
- There is an “edge-to-edge” style where tiles can visually touch (no visible gap).

**Tiles**

- Each tile is currently:
  - Landscape thumbnail
  - Optional title text
  - Optional meta line
  - CTA text + arrow (or tiny arrow only)

**Controls**

- Bottom panel has 3 states:
  - Collapsed: thin bar with label and chevron.
  - Compact: core sliders (cols mobile/desktop, gap, radius, items).
  - Full: extended controls (layout extras, visibility toggles, etc.).
- Panel state is persisted in `localStorage` (key `multi21_panel_state`).

---

## 2. Golden Rules (specific to Multi²¹)

1. **Square grid as first-class**
   - Everything should be expressible in **grid units**, both horizontal and vertical.
   - Think “24 units across” and “N units tall”, not arbitrary pixels.

2. **Multiple tile aspect ratios**
   - We must support:
     - Square
     - Portrait
     - Landscape
   - Aspect ratios should be applied via **config / props**, not baked into the markup.

3. **Re-usable tile types**
   - The same grid should be able to render:
     - Generic card (image + title + meta + CTA)
     - KPI card (number + label + trend)
     - Product card (image + price + tag)
     - Text / icon card (no image, just content)

4. **CTA controls**
   - CTA **word** and CTA **arrow** are separate toggles:
     - Word only
     - Arrow only
     - Both
     - None
   - Styles for arrows should be tokenised so we can recolour them later.

---

## 3. Backlog · Multi²¹

Use these IDs when writing plans/logs.

### Done / In Progress

- `M21-01` – Base grid + sliders for mobile/desktop columns and gap.
- `M21-02` – 3-state collapsible bottom panel (collapsed / compact / full).
- `M21-03` – Edge-to-edge option (remove visible gutters between tiles where requested).
- `M21-04` – CTA arrow length and spacing tweaks to feel balanced on mobile.

*(If something here is not actually done, adjust in the log.)*

### Next Up

- `M21-05` – **Aspect ratio modes**
  - Add support for square, portrait, and landscape tile modes.
  - Allow per-layout selection (e.g. “all square”, “hero landscape + grid of portrait”, etc.).

- `M21-06` – **Tile type variants**
  - Add internal variants:
    - `card.generic`
    - `card.kpi`
    - `card.product`
    - `card.text`
  - Each variant should share a base frame, but change inner layout/content.

- `M21-07` – **CTA toggles**
  - Separate toggles for:
    - `showCtaLabel`
    - `showCtaArrow`
  - Ensure layout looks clean in all combinations.

- `M21-08` – **Stackable blocks**
  - Allow multiple Multi²¹ blocks vertically on one page.
  - Each block has its own settings (aspect ratios, tile type, colours).

- `M21-09` – **Absolute offset sliders**
  - For each block, allow:
    - Horizontal offset (within grid limits)
    - Vertical offset (within its own section)
  - Think: “layout nudging” while still respecting the 24-grid.

- `M21-10` – **Portrait full-screen mobile mode**
  - One tile can occupy the full viewport on mobile (for hero experiences).
  - Ensure safe scrolling between tiles.

- `M21-11` – **Config surface for agent use**
  - Expose a clean config object for Multi²¹ layouts so agents (or other tools) can:
    - Read the current layout
    - Propose new layouts
    - Apply them without touching component internals.

---

## 4. Active Plan (for Architect)

> Only the Architect (Gemini) should write in this section.  
> Implementers (ChatGPT Codex / OSS) should **read**, not edit.

### Current Task

- **Task ID**: (to be filled, e.g. `M21-05`)
- **Goal**:
- **Files to touch**:
- **Steps**:
  1.
  2.
  3.
- **Verification**:
  - [ ] Check on desktop
  - [ ] Check on mobile
  - [ ] Confirm no layout regressions to existing tiles

*(When this task is done, move the plan details into the Log and start a new one.)*