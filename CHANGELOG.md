# Changelog

All notable changes to the Tournament Card Generator are documented here.

---

## [2026-05-20]

### Added — Multiple Card Layouts

The card design system was rebuilt from scratch. Previously only color themes were available; now each design is a fully distinct card layout with its own visual grammar.

**5 layouts:**

| Layout | Description |
|--------|-------------|
| `report` | Original style — diagonal stripes, pill badge, glow blob, bordered match rows |
| `arcade` | Retro terminal — horizontal scanlines, double-border frame, corner `+` tick marks, monospace rows, ASCII `═══` separators |
| `blade` | Angular — thick left accent bar spanning full card height, repeating diagonal-slash dividers in header/footer, match rows with left-only colored border, pill stat badges |
| `award` | Centered prestige — double-border ornate header box, diamond `◆◆◆` separators, centered match table, full trophy ceremony section |
| `minimal` | Editorial — no decoration, large low-opacity card number in background, ultra-thin horizontal rules, clean columnar match rows |

**10 selectable designs (2 per layout):**

| Design | Layout | Color |
|--------|--------|-------|
| Signal | Report | Aqua / Cyan |
| Ember | Report | Amber / Orange |
| Retro | Arcade | Yellow-gold |
| Neon | Arcade | Magenta / Hot pink |
| Crimson | Blade | Red |
| Storm | Blade | Ice blue |
| Prestige | Award | Gold |
| Solar | Award | Burnt orange |
| Ghost | Minimal | Monochrome |
| Jade | Minimal | Green |

---

### Added — Dota 2-Style Design Carousel

Replaced the simple 3×2 color-button grid with a full hero-picker-style carousel.

- **3 visible cards** — center slot full-size, flanking cards scaled down and dimmed; ±2 cards clip at container edges for a depth peek
- **Mini card previews** — each slot renders its layout's visual signature (diagonal stripes, scanlines, slash lines, diamond shapes, thin rules)
- **Keyboard navigation** — `←` / `→` arrow keys when the carousel is focused
- **Dot indicator** — active dot stretches wide and glows with the design's accent color

---

### Changed — Modern Carousel Redesign

The carousel UI was overhauled for a more polished, contemporary feel.

- **Ambient background** — the picker container uses an 8-digit hex `backgroundColor` with `transition-colors duration-500`, so the entire section shifts color as you navigate through designs
- **Larger cards** — mini cards increased from 110×162 px to 140×200 px; center card receives a CSS `drop-shadow` filter glow that bleeds outside the card boundary
- **Readability gradient** — each mini card fades its background color up from the bottom so label text is always legible regardless of the preview decoration
- **Layout type badge** — top-left corner of every card shows the layout type (`report` / `arcade` / `blade` / `award` / `minimal`) as a small tinted pill
- **Borderless arrows** — replaced circle-border nav buttons with compact tinted `rounded-full` buttons that match the current accent color
- **Info row** — design name (large, left-aligned) + `01 / 10` monospace counter (right-aligned) replaced the old centered text block
- **Segmented progress track** — full-width row of equal-width segments; active segment is taller (4 px vs 2 px), glowing, and accent-colored; replaced the previous dot cluster

---

### Changed — Sidebar Scrollbar

The browser default scrollbar on the sidebar was replaced with a minimal custom scrollbar via `::-webkit-scrollbar` CSS pseudo-elements.

- **Width:** 4 px (down from ~15 px browser default)
- **Track:** transparent
- **Thumb:** `rgba(255,255,255,0.10)` at rest, `rgba(255,255,255,0.22)` on hover
- **Shape:** `border-radius: 999px` (pill/rounded)
