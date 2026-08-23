# Guanmo site design lock

## Register and anchor

- Register: `marketing` with an editorial, product-led reading narrative.
- Anchor: warm editorial serif pacing, informed by the selected ImageGen direction and the generous one-screenshot rhythm observed in Magic Resume / magicv.art.
- Signature move: one real Guanmo screenshot in the hero; every later capability is expressed through a single quiet motion device (progress rail, text selection, path reveal, syntax cursor, or FAQ disclosure).

## Token lock

| Token | Value | Use |
| --- | --- | --- |
| paper | `oklch(0.965 0.013 91)` | page background |
| paper-deep | `oklch(0.930 0.020 90)` | recessed paper surfaces |
| paper-line | `oklch(0.860 0.025 90)` | hairline borders |
| ink | `oklch(0.250 0.025 60)` | primary text |
| ink-soft | `oklch(0.530 0.035 75)` | supporting text |
| umber | `oklch(0.380 0.080 55)` | serif display type |
| teal | `oklch(0.620 0.110 177)` | one restrained accent |
| teal-soft | `oklch(0.900 0.050 175)` | selection and progress halo |
| white | `oklch(0.990 0.010 90)` | screenshot frame and button text |

Base spacing uses an 8px rhythm with 4px sub-steps. Radius is limited to 8px controls, 14px image corners, and 22px image frame corners. Motion uses 180ms interaction transitions and 650–900ms reveal transitions with an ease-out curve; all reveals honor `prefers-reduced-motion`.

Typography uses `Noto Serif SC` / Songti-style faces for display and `Noto Sans SC` / PingFang-style faces for body copy, with a small system monospace label layer for Markdown cues.

## Interaction contract

- Header links and both primary CTAs are real external links.
- Mobile navigation is a semantic button with `aria-expanded` and a visible focus ring.
- FAQ rows are keyboard-operable buttons with `aria-expanded` and animated disclosure.
- Scroll motion is progressive enhancement only; reduced-motion users receive the same content without travel.
- A click emits a small solid-petal fireworks bloom from the pointer location, then disappears; it is decorative and disabled for reduced-motion users.
- No claim is made that Guanmo never sends content off-device; FAQ language follows the current project privacy policy.

## Asset rule

`public/assets/guanmo-main-warm.png` is the only product screenshot. The logo icon is used only as brand chrome and favicon. No placeholder UI or abstract AI illustration is used.
