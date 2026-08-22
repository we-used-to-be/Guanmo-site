# Design QA

## Comparison target

- Source visual truth: `C:\Users\惜\.codex\generated_images\01a027ec-2597-7b22-a18c-8e1a1866978d\exec-6f7ec419-1ea0-4744-8fe5-cdd445dce62f.png`
- Implementation URL: `http://localhost:3001/` (Next production server)
- Implementation screenshots:
  - `output/playwright/guanmo-site-final2-desktop-top.png`
  - `output/playwright/guanmo-site-final2-desktop-full.png`
  - `output/playwright/guanmo-site-final2-mobile-top.png`
- Source pixels: `864 x 1821` raster design board.
- Implementation pixels: desktop viewport `1440 x 900`; full-page capture `1425 x 5749`; mobile viewport `375 x 900`.
- Density: Playwright CSS screenshots at `deviceScaleFactor=1`; source was compared as a normalized raster board, not treated as a 1:1 browser viewport.
- State: default light/warm theme, page at initial load; full-page desktop capture was preceded by a scroll to trigger all scroll reveals.

## Evidence and review

The source and rendered desktop full-page capture were opened together before review. The composition holds the selected direction: a single real Guanmo screenshot anchors the hero, while the later narrative uses a progress rail, selected-text highlight, local path reveal, syntax cursor, FAQ disclosure, and a large final CTA. The implementation intentionally uses a longer desktop scroll rhythm than the compressed source board so each motion device has room to read.

Focused regions were reviewed separately at the hero (`final2-desktop-top`) and mobile hero (`final2-mobile-top`) because the full-page comparison makes typography and screenshot sharpness too small to judge. The mobile capture confirms that the screenshot stays singular and the menu is collapsed by default.

Required fidelity surfaces:

- Typography: serif display hierarchy and compact monospace labels match the warm editorial register; body copy remains readable at the mobile breakpoint.
- Spacing/layout: wide margins, hairline separators, two-column desktop rhythm, and single-column mobile reflow are consistent with the selected direction.
- Colors/tokens: warm ivory, umber, muted ink, and one restrained teal accent are shared across all sections; no purple/blue AI gradient or default glass panel is present.
- Image/asset fidelity: the hero uses the real `guanmo-main-warm.png` asset once; the brand icon is used only as chrome/favicon. No screenshot is repeated in later sections.
- Copy/content: claims and FAQ wording are grounded in Guanmo 1.6.1 README/privacy facts; no blanket privacy claim is made.

## Findings

No actionable P0/P1/P2 visual findings remain.

## Comparison history

- Browser QA initially found a P2 mobile menu layout issue: closed navigation links still occupied one visible row above the hero. Fixed with an explicit `max-height`, opacity, and pointer-events collapse in `app/globals.css`; the final mobile capture shows only the menu button when closed.
- Browser QA initially reported a non-blocking Next image preload warning caused by `priority` on the below-fold mobile image. Removed `priority` from `components/site/hero.tsx`; the final production console has zero errors and zero warnings.
- No P0/P1/P2 issue was found in the final source-versus-implementation comparison, so no additional design-QA fix loop was required.

## Interaction and browser checks

- Desktop production render: 1440px viewport, console errors 0, warnings 0.
- Mobile production render: 375px viewport, console errors 0, warnings 0.
- Mobile menu: opens/closes through a semantic button with `aria-expanded`.
- FAQ: opens through keyboard-operable buttons and exposes `aria-expanded`; content is animated with `AnimatePresence`.
- Keyboard: first Tab reaches the visible skip link; global `:focus-visible` styling is present for links and buttons.
- Semantic checks: one `h1`, ordered `h2` sections, `main`/`nav`/`footer` landmarks, descriptive screenshot alt text, decorative icon alt empty.

## Implementation checklist

- [x] One real Guanmo product screenshot in the hero only.
- [x] Motion is restrained and honors reduced motion.
- [x] Responsive desktop/mobile layouts verified in a real browser.
- [x] GitHub and Windows release CTA URLs are wired.
- [x] SEO metadata, canonical, Open Graph/Twitter metadata, and SoftwareApplication JSON-LD are present.
- [x] TypeScript, ESLint, and production build pass.

## Follow-up polish

If the site later gains a fixed production domain, update `metadataBase` in `app/layout.tsx` and the generated social image URL. The current canonical uses the existing Guanmo GitHub Pages URL as the safest known public home.

final result: passed
