# Design System — O Novo Sujeito (Lourenço Serpa)

Quick-reference companion to the full handoff document. Use this for fast lookups of tokens; use the Word handoff document for full context on any single component.

## Brand direction

Soviet constructivism (Rodchenko, El Lissitzky, VKHUTEMAS) as aesthetic and conceptual framework. Geometric shapes, photomontage, bold flat color blocks, diagonal wordmark treatment. Communism functions as an implicit aesthetic/conceptual layer only, never explicit political symbolism (no red star, hammer and sickle, or similar).

## Color palette — Stepanova

### Stepanova Light (used across all sections except Footer)

| Token | Hex | Usage |
| --- | --- | --- |
| Preto | `#000000` | Base text |
| Bordô Estrutura | `#6D0C15` | Lines, links, shadows |
| Vermelho Impulso | `#B7020B` | Emphasis, primary buttons |
| Creme Papel | `#F5EBD3` | Text on dark/red background |

### Stepanova Dark (used only in Footer and Nav)

| Token | Hex | Usage |
| --- | --- | --- |
| Vinho Noite | `#5E1321` | Background |
| Dourado Vanguarda | `#E0B84D` | Lines, secondary labels, legal links |
| Creme Luz | `#F2E6CF` | Primary text on dark background |

The switch from Light to Dark happens exactly once, at the Footer. Hard cut, no gradient/transition element.

## Typography

| Family | Weights used | Role | Source |
| --- | --- | --- | --- |
| Rodchenko | Bold, Regular | Headlines, buttons, nav links, secondary links | Licensed (Adobe Fonts / Paratype) |
| Oswald | Regular, Medium | Kickers, labels, small caps text, nav-legal text | Google Fonts |
| PT Sans | Regular | Body copy, form input text | Google Fonts |

Bebas Neue is part of the broader brand book but is **not used anywhere on this landing page**.

Common letter-spacing convention: most uppercase/label text uses 20% letter-spacing; most headline/body text uses 10% or 0%. Check the handoff document per-element for exact values.

## Layout tokens

| Token | Value |
| --- | --- |
| Reference viewport | W440 x H956 (mobile only, v1) |
| Fixed status bar | W440 x H62, white, top of viewport |
| Fixed nav bar (closed) | W440 x H96, directly below status bar |
| Scrollable content wrapper | Starts immediately after nav bar, no extra gap |
| Gap between sections | 16px, between sections only (not before first/after last) |
| Typical section side padding | 24px |
| Typical section vertical padding | 16px |

## Component patterns

### Buttons (primary CTA)

- Fill: `#B7020B` (Vermelho Impulso)
- Text: `#F5EBD3` (Creme Papel), Rodchenko Bold
- Drop shadow: X=4 Y=4 Blur=0, color `#6D0C15`
- Corner radius: 0 (sharp corners throughout the whole system, no rounded corners anywhere)

### Secondary links (text + arrow icon)

- Text: Rodchenko Regular, `#6D0C15`, underlined
- Icon: right-pointing arrow vector, `#6D0C15`, 24x24

### Accordion (Abordagem FAQ)

- Only one item open at a time (radio behavior)
- Chevron icon rotates between down (closed) and up (open)
- Transition: Smart Animate in Figma → real height/opacity transition in code, ~300ms ease-out

### Nav

- Closed: horizontal bar, brand mark left, toggle icon right
- Open: fullscreen dark overlay (Stepanova Dark), vertical stack of links + CTA button
- Toggle animation: ~300ms ease-out both directions

### Cards / form inputs

- White fill, 1px stroke in `#B7020B`, corner radius 0
- No placeholder text inside empty inputs

## Icon and asset conventions

- All icons and lockups follow flat, geometric constructivist shapes, no gradients, no soft shadows, no rounded corners.
- Social icons: 44x44, background `#6D0C15`, white glyph
- Pillar icons: 70x70, two states each (A/B), red/bordô color scheme
- All composite lockups (hero, sobre, nav-brand, brand-logo) are pre-flattened single image assets, do not attempt to recreate them from separate layers

## Naming convention

All production filenames are lowercase, hyphen-separated, no accents (e.g., `pilar-mediacao-a.svg`, not `pilar-mediação-a.svg`), matching Figma layer names 1:1.
