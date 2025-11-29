# MULTI 2¹

MULTI 2¹ is a 24-column grid-based card layout system designed to render various types of items (YouTube feeds, products, collections, etc.) in a flexible, responsive grid.

## Purpose

This component serves as a "brick" in a larger 24-column page grid. It abstracts away the complexity of responsive grid layouts, allowing for easy integration of diverse content types.

## API Reference

### `Multi21Props`

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `items` | `Multi21Item[]` | Required | Array of items to render. |
| `colsDesktop` | `number` | `6` | Number of columns on desktop (min-width: 768px). Based on a 24-column grid mental model. |
| `colsMobile` | `number` | `2` | Number of columns on mobile. |
| `tileGap` | `number` | `16` | Gap between grid items in pixels. Set to 0 for seamless tiles. |
| `tileRadius` | `number` | `8` | Border radius of the card images in pixels. Set to 0 for hard corners. |
| `align` | `'left' \| 'center' \| 'right'` | `'center'` | Alignment of the grid within its container. |
| `showTitle` | `boolean` | `true` | Whether to show the item title. |
| `showMeta` | `boolean` | `true` | Whether to show the item meta text. |
| `showBadge` | `boolean` | `true` | Whether to show the item badge. |
| `showCtaLabel` | `boolean` | `true` | Whether to show the CTA label text. |
| `showCtaArrow` | `boolean` | `true` | Whether to show the CTA arrow icon. |

### 24-Column Mental Model

MULTI 2¹ is designed to be a "brick" within a larger 24-column page layout.
- `colsDesktop` represents how many columns of that 24-column grid this component's items should span *conceptually* if the component itself spans the full width.
- In the future, this component may be embedded in a layout wrapper that controls its overall width and alignment on the page.
- The `align` prop allows you to control how the grid sits within its container, useful when the total width of columns + gaps is less than the container width.

### Design-Time vs Run-Time

- **Design-Time (UItreX):** All props are exposed in the `Multi21Designer` for tweaking.
- **Run-Time (OS/Agents):** Agents will likely control `items`, `colsDesktop`, `colsMobile`, and content toggles. `tileGap`, `tileRadius`, and `align` might be set by the system's design tokens or specific layout requirements.

### `Multi21Item`

```typescript
interface Multi21Item {
  id: string;
  title: string;
  meta?: string;
  imageUrl?: string;
  href?: string;
  badge?: string;
  secondaryLink?: {
    href: string;
    label?: string;
  };
}
```

## Usage

### Design-Time (This Repo)

In this repository, use the `Multi21Designer` component to visualize and tweak the grid settings. This component provides a UI to adjust columns, gaps, and visibility toggles live.

Route: `/multi21`

### Production (Future)

In the final application, use the `Multi21` base component directly. It should be driven by props, likely coming from a CMS or API response.

```tsx
import { Multi21 } from '@/components/multi21/Multi21';

<Multi21 
  items={myItems}
  colsDesktop={8}
  colsMobile={2}
  gap={20}
/>
```

## Styling

The component uses Tailwind CSS for layout and styling. It integrates `Roboto Flex` as the primary font.
The grid uses CSS variables for column counts to allow dynamic updates from the designer UI.

### CSS Variables

The component uses the following CSS variables for styling:

| Variable | Description | Default |
| :--- | :--- | :--- |
| `--multi-cta-arrow-color` | Color of the CTA arrow stroke. | `currentColor` |
