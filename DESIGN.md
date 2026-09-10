---
name: byNiko
description: Paper ground, one green, hairlines only — an independent practice whose site is the portfolio piece.
colors:
  paper: "#f7f7f5"
  paper-raised: "#ffffff"
  paper-sunk: "#eeeeea"
  ink: "#14161a"
  ink-muted: "#5c6268"
  ink-faint: "#696f76"
  ink-inverse: "#f7f7f5"
  rule: "#e2e2de"
  rule-strong: "#14161a"
  accent: "#0c6b45"
  accent-hover: "#084f33"
  accent-soft: "#e7f0eb"
  signal-error: "#a3261b"
typography:
  statement:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.9rem + 1.5vw, 3.25rem)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.032em"
    fontVariation: "'wdth' 112"
  statement-hero:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.5rem + 2.5vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.032em"
    fontVariation: "'wdth' 112"
  statement-feature:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.3rem + 3vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.032em"
    fontVariation: "'wdth' 112"
  statement-sm:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.4rem + 1.5vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.032em"
    fontVariation: "'wdth' 112"
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1.35rem + 1vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.028em"
    fontVariation: "'wdth' 108"
  display-sm:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.028em"
    fontVariation: "'wdth' 108"
  display-xs:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.028em"
    fontVariation: "'wdth' 108"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 102"
  lede:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
    fontVariation: "'wdth' 100"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
    fontVariation: "'wdth' 100"
  wordmark:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 104"
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.688rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.15em"
    fontVariation: "'wdth' 82"
  meta:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.02em"
    fontVariation: "'wdth' 88"
  control:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.01em"
    fontVariation: "'wdth' 96"
  input:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
    fontVariation: "'wdth' 100"
  error:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
    fontVariation: "'wdth' 100"
  navMobile:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 106"
rounded:
  none: "0"
  focus: "1px"
  scrollbar: "99px"
spacing:
  gutter-sm: "1.25rem"
  gutter-md: "2.5rem"
  gutter-lg: "3.5rem"
  section-y: "3.5rem"
  section-y-md: "5rem"
  grid-gap-x: "1.5rem"
  grid-gap-y: "2.25rem"
  target-touch: "2.75rem"
  target-pointer: "1.75rem"
components:
  action:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.paper-raised}"
    rounded: "{rounded.none}"
    padding: "0.85rem 1.35rem"
  action-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "{colors.paper-raised}"
  action-disabled:
    backgroundColor: "{colors.ink-faint}"
    textColor: "{colors.paper-raised}"
  action-quiet:
    textColor: "{colors.accent}"
    rounded: "{rounded.none}"
    padding: "0 0 2px 0"
  action-quiet-hover:
    textColor: "{colors.accent-hover}"
  link-target:
    height: "{spacing.target-touch}"
    rounded: "{rounded.none}"
  skip-link:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.paper-raised}"
    rounded: "{rounded.none}"
    padding: "0.75rem 1.15rem"
  field-input:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.7rem 0.8rem"
  field-label:
    textColor: "{colors.ink-muted}"
    typography: "{typography.label}"
  field-error:
    textColor: "{colors.signal-error}"
  facts-panel:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
  facts-key:
    textColor: "{colors.ink-muted}"
    typography: "{typography.label}"
    padding: "0.6rem 0.75rem"
    width: "6.5rem"
  facts-value:
    textColor: "{colors.ink}"
    padding: "0.6rem 0.8rem"
  work-frame:
    backgroundColor: "{colors.paper-sunk}"
    rounded: "{rounded.none}"
  nav-link:
    textColor: "{colors.ink-muted}"
  nav-link-active:
    textColor: "{colors.ink}"
  site-header:
    backgroundColor: "{colors.paper}"
    height: "4rem"
  mobile-sheet:
    backgroundColor: "{colors.paper}"
    padding: "6rem 1.5rem 2rem"
---

# Design System: byNiko

## Overview

**Creative North Star: "The Ruled Sheet"**

Everything happens on one continuous sheet of cool paper. Structure is drawn onto that sheet with hairlines and nothing else — there are no cards to lift things off it, no shadows to float them above it, no rounded containers to fence them in. When a region needs to be separated from its neighbor, a 1px rule does the job and then gets out of the way. The result reads like a well-set printed document rather than a stack of UI panels, and it is the whole argument for the practice: a solo builder proving craft by how much he was willing to leave out.

The governing idea is **subtraction**. Every device this system might have reached for — a second typeface, a gradient, an elevation ramp, a decorative icon set, a secondary accent — was declined on purpose, and the world only holds together while those refusals hold. Hierarchy that a second face would normally carry is carried instead by the **width axis** of a single variable superfamily: Archivo expanded for statements, regular for prose, narrow and tracked in caps for labels and metadata. Color that a palette would normally carry is carried by one deep green doing every job an accent can do, plus one admitted red for errors. Depth that shadows would normally carry is carried by a hairline and a slightly recessed frame.

The chrome is deliberately colorless because the content is not. Nine project screenshots supply every chromatic event on the site, and the interface around them is built to lose that contest gracefully. The one place the system permits itself an authored gesture is the work grid, where hovering or focusing a project pulls it forward while its siblings recede — one orchestrated moment, spent once, instead of a dozen small hovers scattered everywhere.

The system is also **defined in one place**. Every type role carries its own fluid size in `src/ui/globals.css`; no page or component declares a font size. Every reveal-on-focus, every touch target, every failure state is a named component in that same stylesheet rather than a local improvisation, so a surface that fails — an unreachable CMS, a missing entry, a thrown render — still lands on the ruled sheet instead of on the browser's default page.

**Key Characteristics:**
- Cool paper ground with ink type; the page is never white-on-white or dark
- Hairline rules as the sole division device — no cards, no shadows, no radius on content surfaces
- One superfamily (Archivo variable), hierarchy from the `wdth` axis rather than a second face
- One fluid type ramp defined in the stylesheet; call sites name a role, never a size
- One green accent carrying every action, link and active state
- Square corners everywhere content lives
- Motion that is orchestrated and rare, never ambient
- Content is never held invisible waiting on an animation
- Failure is a designed state: every route has a boundary in the house language

## Colors

A near-neutral paper-and-ink field with exactly one saturated voice; all remaining chroma on any page comes from project imagery.

### Primary
- **Practice Green** (`{colors.accent}`): The single accent. It carries every primary action button, every quiet inline action, every prose link, the active-state underline in the nav, the focus ring, the skip link's ground, the work-grid underline as it draws in, the text selection background, and the caret. Nothing else in the interface is saturated. Its darker companion **Practice Green Deep** (`{colors.accent-hover}`) is the hover state and only the hover state. **Green Wash** (`{colors.accent-soft}`) is a defined tint held in reserve for accent-tinted grounds; it stays rare by design.

### Tertiary
- **Signal Red** (`{colors.signal-error}`): The one deliberate chromatic exception to the single-accent rule, admitted as a named decision because an error has to read as an error. It appears only on form validation messages (`.field-error`) and nowhere else — not on borders, not on icons, not as a warning tint, and not on the error boundaries, which are set in plain ink. It clears WCAG AA on the paper ground.

### Neutral
- **Cool Paper** (`{colors.paper}`): The page ground. Every band of the site sits on it.
- **Raised Paper** (`{colors.paper-raised}`): Pure white, used only where a surface must read as *on* the sheet rather than *as* the sheet — the facts panel, the contact form body, form inputs — and always in combination with a hairline border rather than a shadow.
- **Sunk Paper** (`{colors.paper-sunk}`): The empty state behind a project image inside its frame, so an unloaded or missing screenshot reads as a recess rather than a hole. Also the ground of the case-study featured image and every static-gallery tile.
- **Ink** (`{colors.ink}`): Body and heading text, and the strong section rule.
- **Muted Ink** (`{colors.ink-muted}`): Secondary prose, supporting descriptions, inactive nav links, facts keys.
- **Faint Ink** (`{colors.ink-faint}`): The quietest text tier — counts, footer meta, placeholders, the "View" affordance in the work grid, disabled action grounds.
- **Hairline** (`{colors.rule}`): Every divider, every frame border, every input border.
- **Strong Rule** (`{colors.rule-strong}`): A 1.5px ink rule reserved for the top of a major content section (the "Selected work" header), where a hairline would be too quiet to read as a heading boundary.

### Named Rules

**The One Green Rule.** A single accent carries every action, link and active state on the site. If a new element needs to signal interactivity, it uses `{colors.accent}` — it does not get its own hue. The only chromatic exception in the system is `{colors.signal-error}`, which is admitted for form errors alone.

**The Imagery Carries the Color Rule.** Project screenshots supply all chromatic variety. The chrome around them is paper, ink and one green, and it is built to never compete with the work it frames. Do not introduce a background tint, gradient or colored band to "liven up" a section.

**The Faint Ink Contrast Obligation.** `{colors.ink-faint}` is a contrast obligation, not a taste choice. It carries 11–12px uppercase labels, so AA applies at that size; the token was darkened from an earlier `#8b9097` (3.0:1 on paper — failing) to the current value, measured **4.73:1 on `{colors.paper}` and 5.08:1 on `{colors.paper-raised}`**. It is the floor, not a starting point. Never lighten it, and never push a smaller size onto it. (The code comment beside the token in `src/ui/globals.css` rounds these up to 4.8/5.2; the measured figures here are the record.)

## Typography

**Superfamily:** Archivo (variable, `wdth` axis loaded), with `system-ui, sans-serif` as fallback.
**Display Font:** Archivo, width-expanded.
**Body Font:** Archivo, width-normal.
**Label Font:** Archivo, width-condensed, tracked and uppercased.

**Character:** One grotesque doing every job, distinguished by how wide it is set rather than by what it is. Expanded widths read as confident and built; condensed tracked caps read as clerical and precise; the normal width in between is plain and unremarkable on purpose. The effect is a document typeset by someone paying attention, not a page assembled from a type pairing.

Width is authored in CSS as `font-stretch` percentages on the `.t-*` role classes; the frontmatter records the same values in `fontVariation` notation. **Size is authored the same way.** Every role owns its size in `src/ui/globals.css`, fluidly via `clamp()`, and no page or component declares a font size. Each curve is tuned to reach its floor at 640px and its ceiling at 1440px, so the ramp is continuous between those points and pinned outside them.

### Hierarchy
- **Statement** (`.t-statement`, 600, `wdth` 112, -0.032em, 1.06, balanced wrapping): Page-opening headlines only. Base curve `clamp(2.5rem, 1.9rem + 1.5vw, 3.25rem)`, with three modifiers that change nothing but the curve: `--hero` (`clamp(2.5rem, 1.5rem + 2.5vw, 3.75rem)`) for the homepage opener, `--feature` (`clamp(2.5rem, 1.3rem + 3vw, 4rem)`) for a case-study title that is the whole first viewport, and `--sm` (`clamp(2rem, 1.4rem + 1.5vw, 2.75rem)`) for a closing statement subordinate to the one that opened the page. It is always the widest and tightest thing on the page.
- **Display** (`.t-display`, 600, `wdth` 108, -0.028em, 1.1): Section headings below the page statement, and the contact form's success heading. Base curve `clamp(1.75rem, 1.35rem + 1vw, 2.25rem)`; the two fixed modifiers `--sm` (1.5rem) and `--xs` (1.375rem) are for headings inside a column too narrow to justify a fluid curve. One notch narrower and looser than Statement so the two never read as peers.
- **Title** (`.t-title`, 600, `wdth` 102, -0.015em, 1.4, 1.0625rem): The recurring inline heading — project names in the work grid, service names in the definition lists, list rows. Now a real class; it was previously three declarations repeated at six call sites.
- **Lede** (`.t-lede`, 1.0625rem): The opening paragraph under a statement. It is Body's size and weight carrying a positional job, which is why it is its own class rather than a size on the paragraph.
- **Body / Prose** (`.t-prose`, 400, `wdth` 100, 1.65 line-height, capped at `min(40ch, 100%)`): All running text. The measure cap is part of the role, not a per-surface decision.
- **Wordmark** (`.wordmark`, 700, `wdth` 104, -0.02em, 1.15rem): The practice name, shared by the masthead and the footer so the two can never drift apart.
- **Label** (`.t-label`, 600, `wdth` 82, 0.688rem, 0.15em tracking, uppercase, 1.4): Real section headings that name a region and are marked up as such (the `h2`s "Selected work", "Pages", "More from this project"), facts-panel keys, form field labels, the breadcrumb, project counts, footer meta. This is the system's only uppercase. It is a heading and labelling role, never a decorative line stacked above a headline.
- **Meta** (`.t-meta`, 500, `wdth` 88, 0.75rem, 0.02em): Sentence-case supporting data — the services list under each project, the required-fields note on the form.
- **Mobile nav item** (`.mobile-sheet a:not(.action)`, 600, `wdth` 106, -0.02em, 1.875rem): Scoped to the sheet, because it is a size that exists nowhere else and should not become a general role.

### Named Rules

**The One Family Rule.** Hierarchy comes from the width axis, never from a second typeface. A new role gets a new `font-stretch` value and weight, not a new family. There is no serif, no mono, no display face in this system.

**The Ramp Lives in the Stylesheet Rule.** A component names a role; it never declares a size. If a surface needs a size the ramp does not have, add a modifier to the role in `src/ui/globals.css` (`.t-statement--feature`) rather than a literal at the call site — and give it a `clamp()`, not a breakpoint step. There are exactly two admitted exceptions, both structural: `src/app/global-error.tsx` uses inline styles because it replaces the whole document and cannot assume the stylesheet loaded, and `src/components/GalleryStatic/style.css` sizes the lightbox close glyph inside a component that renders over a dark field outside the paper world.

**The Narrow Caps Rule.** Uppercase belongs to Label and Meta-adjacent roles only, and always with 0.15em tracking at condensed width. Body text, statements, display headings and buttons are never uppercased. A Label must be labelling something structural — a section, a field, a key, a count. Never set a Label above a headline as a decorative kicker.

**The Balanced Statement Rule.** Statement and Display both set `text-wrap: balance` and a `ch`-based `max-width`. A headline's line count is a consequence of its measure and its size — set the measure, do not chase a target number of lines.

## Layout

The site is a single-column stack of full-bleed horizontal bands, each separated from the next by a hairline. Every band's content is constrained by one shared container, `.shell`: `max-width: 96rem`, centered, with inline padding stepping 1.25rem → 2.5rem at 48rem → 3.5rem at 90rem. Nothing on the site sits outside the shell, and nothing touches the viewport edge.

Within a band, the recurring device is a two-column asymmetric split that collapses to a stack: content plus a fixed-width sidebar (`minmax(0,1fr)` beside `23rem` on the home page, `20rem` on flat pages), with a 3rem–5rem gap, promoted at the `lg` breakpoint. On flat pages the sidebar is sticky at `top-28`.

**Case studies run the story in one column with the project parked beside it.** The shell is `68rem`, centered. Above `72rem` the grid is `minmax(0, 36rem)` for the body and `minmax(0, 1fr)` for the artifact, `4rem` apart, with the artifact `position: sticky` at `top: 6.5rem` so the work stays in view for as long as the story runs. DOM order is artifact-then-body and the grid does the visual swap, so the sequence a screen reader hears is the one the page tells. Below `72rem` it stacks — artifact above story — and the artifact is capped to `36rem` and centered rather than running the full shell; unbounded it rendered 944px wide and 785px tall at 1024, pushing the story to y=1138.

This column replaced a single-column pass that had itself replaced a metadata sidebar. That first removal was right about the contents and wrong about the column: it measured the panel's payload (7.6–16.1% fill, up to 1,835px of gutter) and concluded the space was unearned, when the panel's actual job was keeping something in view while the story is read. Removing it also left `.case-shell` capped at `68rem` with no `margin-inline: auto` inside a `96rem` shell, so every case study carried a 240px dead gutter at 1440 and 392px at 1600, growing with the viewport, while the header and footer ran full width. Both faults are gone.

The work grid is 1 column, 2 columns at 40rem, 3 columns at 64rem, with an asymmetric gap (2.25rem row, 1.5rem column) so rows breathe more than columns. Each cell's image sits in a 16:10 frame. The case-study artifact frame uses the same 16:10 material at the column's width.

Vertical rhythm is section-scale rather than a fine spacing scale: bands run `3.5rem` top and bottom, opening to `5rem` at the `md` breakpoint and `6rem` on the closing band. Inside a band, spacing comes from Tailwind's default 0.25rem-based utilities; there is no bespoke spacing token set beyond the shell, section and target values.

The header is sticky at the top with a translucent paper background (92% opacity) and a light backdrop blur, closed by a hairline. It is 4rem tall, 4.5rem at `md`. Below `md` the nav becomes a full-screen sheet that translates down from above; the sheet is always mounted and hidden by transform plus `visibility`, with its links taken out of the tab order while closed.

Interactive text has a minimum size independent of its type size: `.link-target` gives a text link in a list or breadcrumb a `2.75rem` min-height on touch, relaxing to `1.75rem` at 48rem where a pointer is likely. The padding is invisible in the layout because the link is `inline-flex` and its line box is unchanged; it exists only for the thumb. Measured sitewide: zero targets below the WCAG 2.2 SC 2.5.8 24×24 floor.

### Named Rules

**The Shell Rule.** Every full-width band is a bare section with `.shell` inside it. Bands own the background and the hairline; the shell owns the horizontal constraint. Do not invent a second container width.

**The Bounded Measure Rule.** Every `ch`-based measure is wrapped in `min(…, 100%)` — including the tokens `--measure-prose` (40ch), `--measure-longform` (50ch) and `--measure-statement` (20ch), and every inline `min(15ch, 100%)`-style cap on a page heading. A bare `ch` measure does not shrink below its own character count and overflowed narrow viewports; the `min()` wrapper is what makes these headlines safe on a phone. Verified: there is no bare `ch` value anywhere in `src/`. Never write one.

**The Thumb Floor Rule.** A text link that is not already a button gets `.link-target`. Height comes from padding on an `inline-flex` box, never from line-height or font-size — the type role is not allowed to change to satisfy a target size.

## Elevation & Depth

**This system has no elevation.** There is zero `box-shadow` and zero `drop-shadow` anywhere in `src/` — verified, including the component stylesheets — and that is a load-bearing property of the world rather than an omission. Depth is expressed three ways, in ascending strength:

1. **Hairline** (`1px solid {colors.rule}`) — the default and near-universal division. Section boundaries, panel borders, table-like rows, input strokes, image frames.
2. **Tonal shift** — a surface reads as raised by being `{colors.paper-raised}` (white) against the paper ground, or recessed by being `{colors.paper-sunk}`. Always combined with a hairline; the tone alone is too quiet to define an edge.
3. **Strong rule** (`1.5px solid {colors.rule-strong}`) — reserved for the heading boundary above a major content region.

The only translucency in the system is the sticky header's 92% paper background with a small backdrop blur, which exists so scrolled content does not collide with the masthead, plus the 45%-white hairline on the lightbox close control, which is the same device translated onto a dark field.

### Named Rules

**The Hairline Rule.** A 1px rule is the only way to divide anything. If a new element seems to need a card, a shadow, or a filled container to be legible, the layout is wrong — fix the spacing or add a rule.

**The No-Shadow Rule.** No `box-shadow`, no `drop-shadow`, no glow, no inset highlight on any content surface. This is absolute; the world's flatness is what makes the hairlines readable.

## Shapes

Square. Content surfaces have `border-radius: 0` without exception — buttons, inputs, the facts panel, image frames, the mobile sheet, the skip link, and the lightbox slide, which was explicitly squared to match.

Two non-content exceptions exist and are deliberate, both on browser-chrome affordances rather than on the design's own surfaces: the focus ring softens by 1px so a 2px outline does not produce visibly sharp corners on inline text, and the custom scrollbar thumb is fully pilled at 99px with a 3px paper border so it reads as a thumb.

Form language is otherwise built from straight lines: full-width hairline dividers, a two-column hairline grid in the facts panel (a `6.5rem` key column beside a fluid value column), 16:10 image frames, and a 2.75rem square close control. The only curve anywhere in the interface is the arrow glyph inside actions, and the only motion path is linear translation or uniform scale.

## Components

### Buttons

**Character:** Plain, solid, unmistakably clickable, and deliberately unstyled beyond its color.

- **Shape:** Square (`0` radius). No border.
- **Primary (`.action`):** Solid green ground, white text, `0.85rem 1.35rem` padding, 0.875rem semibold at `wdth` 96 with 0.01em tracking. Inline-flex with a `0.55rem` gap so the trailing arrow sits with the label.
- **Hover:** Ground darkens to `{colors.accent-hover}` over 180ms; the trailing `.arrow` slides 3px right over 420ms. The two durations differ on purpose — the color answers immediately, the arrow follows.
- **Active:** Translates down 1px.
- **Disabled:** Ground becomes `{colors.ink-faint}`, cursor `not-allowed`. Both `[disabled]` and `[aria-disabled="true"]` are styled, so a busy-but-focusable button looks right.
- **Quiet (`.action-quiet`):** Green text on paper with a 1.5px underline in `currentColor` and 2px of standoff. Used for tertiary navigation moves ("All 9 projects →", footer "Start a project"). Hover deepens the green only; the rule is already there and does not animate in.
- **Full-width:** Inside the facts panel and the mobile sheet, `.action` stretches to 100%.

### Skip Link

**Character:** The first tab stop on every page, and the only element in the system whose entire job is to appear.

`.skip-link` is a real component rather than the `sr-only` + `focus:not-sr-only` utility pair, because that pair does not reveal on focus: at equal specificity `.sr-only` wins on source order and the link stays clipped, leaving the first tab stop invisible (WCAG 2.4.7). Instead it is a normal absolutely-positioned element parked above the viewport at `translateY(calc(-100% - 1.5rem))`, sliding to `translateY(0)` on `:focus` over `--dur-fast`. On the ground it is a green `{colors.accent}` block with white text, square, `0.75rem 1.15rem` padding, pinned 0.75rem from the top-left, carrying the standard accent focus ring. Measured on focus: 133×45px, top 12px. Under `prefers-reduced-motion: reduce` the transition is dropped and it simply appears. Do not revert this to the utility pair.

### Inputs / Fields

**Character:** Ruled boxes on white, quiet until touched.

- **Style:** White ground, 1px hairline border, square, `0.7rem 0.8rem` padding, 0.9375rem text inheriting the body face. Labels sit above in the Label role, colored `{colors.ink-muted}`.
- **Hover:** Border darkens to `{colors.ink-faint}`.
- **Focus:** A 2px green outline at 1px offset, with the element's own border set to `transparent` so the outline replaces the stroke rather than doubling it.
- **Error:** Message text in `{colors.signal-error}` at 0.8125rem below the field. No red border, no icon, no background tint — the message alone carries the state, wired to the input with `aria-describedby` and `aria-invalid`.
- **Validation posture:** The form sets `noValidate` and validates itself, because native browser validation bubbles render in a system face outside this world and cannot be styled. Errors clear on blur once fixed, and a visually hidden `aria-live` region announces sending, success, and error counts.

### Facts Panel (signature component)

**Character:** A specification block — the referral's questions answered before they are asked.

A bordered white panel with no radius, containing a definition list rendered as a hairline table: a `6.5rem` key column in the Label role and muted ink, a hairline down the middle, a fluid value column at 0.875rem medium. Every row closes with a bottom hairline. When the panel takes an action, the button is full-width and flush inside the panel's border, so the green edge-to-edge bar becomes the panel's own footer. It appears in two registers: full practice facts on the home page, and the same panel sticky on flat CMS pages. Case studies use a lighter relative, `.case-facts` — the same hairline key/value table without the panel border, sitting under the artifact as its caption rather than standing as its own object. The contact form and its success confirmation reuse the same `.facts` container, which is how the form reads as part of the same family.

### Navigation

- **Desktop:** Sticky masthead, the shared `.wordmark` beside an 0.15em-tracked Label. Nav links at 0.875rem, muted ink at rest going to full ink on hover, semibold ink when active. Under each link sits a 1px green bar that scales from `scaleX(0)` on the left origin — permanently at `scaleX(1)` for the current page, drawn in on hover for the others, over 300ms on the house ease.
- **Mobile:** A three-line button morphs into an X (the top and bottom bars rotate ±45° to meet at center while the middle bar fades). The sheet is a fixed full-screen paper panel that slides down from `translateY(-101%)`, with links at 1.875rem `wdth` 106, hairline-separated, active link in green, closing with the full-width primary action. Body scroll locks while open, and the sheet closes on route change.
- **Focus containment:** While the sheet is open, every body child outside the header gets `inert` and `aria-hidden`, so the browser's own tab order is already correct without a hand-rolled focus trap. Escape closes the sheet and returns focus to the toggle; the attributes are removed on close.
- **Skip link:** See its own entry above; it is the first element in the tab order.

### Work Grid (signature interaction)

**Character:** The one authored moment on the site. Everything else is quiet so this can be loud.

A responsive grid of project cells; each cell is a link wrapping a 16:10 hairline-bordered frame, a baseline-aligned name row with a "View" affordance in faint Label caps, a hairline underline, and a services list in Meta. The interaction has **three separate code paths**, each existing for a specific reason:

1. **Pointer** — gated on `@media (hover: hover) and (pointer: fine)`. Hovering the grid desaturates and dims every image (`grayscale(1) contrast(0.94)`, 62% opacity); hovering a cell restores that one to full color and scales it 1.035 inside its frame. The gate exists so a tap on a phone cannot leave the grid stuck in its recessed state with nothing brought forward.
2. **Keyboard** — `.work-grid:focus-within` recedes the siblings and `.work-cell:focus` brings the focused one forward, so the same moment is reachable without a pointer on any device. The un-recede rule matches **`:focus`, not `:focus-visible`, deliberately**: a tap on iOS focuses the link and satisfies `:focus-within` but never `:focus-visible`, which would leave the entire grid grayed with nothing restored.
3. **Touch** — behind `@supports (animation-timeline: view())` and `@media (hover: none)`, each cell's underline draws itself in as the cell scrolls into view (`animation-range: entry 20% cover 38%`), so arrival substitutes for the pointer. The `@supports` gate matters: without it, browsers lacking scroll timelines would fire the animation immediately on load and spend the gesture all at once.

The underline itself is a green pseudo-element scaling from a left origin over 420ms on the house ease. Under `prefers-reduced-motion: reduce`, the desaturation and the rule extension survive and only the image scale is dropped; transitions collapse to 1ms.

### Editorial Prose

CMS rich text is rendered through Tailwind Typography with a `.prose-niko` theme that rebinds every prose variable to system tokens: ink body and headings, green links and quote borders, hairline bullets and horizontal rules, muted captions. Prose headings pick up `wdth` 104 and -0.02em tracking so they belong to the same width family as the rest of the page, and links carry a green underline color. Prose is capped at `--measure-longform` (`min(50ch, 100%)`) on case studies and flat pages — wider than the 40ch `--measure-prose` used for interface copy, because long-form reading tolerates a longer line. **These numbers are tuned to the rendered line, not the nominal one.** Archivo's average advance sits far below the `0` glyph that the `ch` unit measures, so a nominal 68ch rendered at 89–94 characters — well past the 65–75 reading range. Measured after correction: 65–71 characters at 1440. Never set a `ch` measure from the nominal figure without measuring the result.

### Case-Study Imagery

**Character:** The same recessed frame as the work grid, at two sizes, opening into a full-bleed lightbox.

Case studies carry a **featured image** in the sticky artifact column, with `.case-facts` beneath it as its caption: a hairline row per fact — What I did, Images, Live site — each present only when the project holds it, and the whole block absent rather than empty when it holds none. The extra images no longer render as a grid below the body; the `Images` row states the count and opens the lightbox at slide 0, which removed a section that ran 1,627px tall on a phone. The `.static-gallery` component and its styles remain in the tree, unused by this route.

The **work grid** and the gallery share the same treatment; both carry the work grid's full three-path treatment rather than a hover-only one: the pointer path is gated on `@media (hover: hover) and (pointer: fine)`, and `.static-gallery:focus-within` / `.static-gallery__item:focus` (and `.featured-image:focus`) reach the same state from the keyboard and from an iOS tap. Hovering or focusing the set desaturates it (`grayscale(1) contrast(0.94)`, 68% opacity) and returns the active tile to full color at 1.035 scale; the featured image scales 1.02 alone. Both drop the scale under `prefers-reduced-motion: reduce`. Clicking a tile opens a dark full-screen lightbox whose slides are square (`border-radius: 0`, matching every other frame on the site) and whose only chrome is a 2.75rem square close control drawn as a translucent white hairline box on transparent ground, filling on hover — the site's hairline language carried onto a dark field.

### Failure States

**Character:** A failure is a page, not an accident. It arrives on the same paper, inside the same shell, in the same type roles.

Four boundaries ship as real surfaces: `src/app/error.tsx` (a thrown render inside the app shell), `src/app/global-error.tsx` (the root boundary, which replaces `<html>` and therefore styles itself inline — the one place in the system that may, because it cannot assume the stylesheet loaded), `src/app/not-found.tsx`, and `src/app/(common-layout)/not-found.tsx`. The route group needs its own: `notFound()` inside the group does not resolve to the root boundary, and Next's default injects a style block that overrides the site background with white. Each boundary is a Statement, a bounded prose line, and a quiet action back into the site — no illustration, no error color, no icon.

### Data Resilience

Presentation degrades one field at a time rather than all at once. Every Contentful read is wrapped and returns an empty result instead of throwing, so a section with no data renders as an absent section rather than a broken route. The homepage headline and intro fall back **per field** to `HOME_CONTENT_FALLBACK`, so a half-filled entry loses one line, not the page. Rich-text asset accessors are fully guarded, so a missing or unlinked image collapses to its sunk-paper frame — the same recess the design already uses for an unloaded screenshot. Verified against a live server with broken credentials: no route returns a 500.

### Motion

Two tokens govern everything: `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)` (exponential, fast-out then long settle) and a pair of durations, `--dur: 420ms` for authored gestures and `--dur-fast: 180ms` for state answers like a button darkening or the skip link arriving.

The entrance is one staggered pass: `.settle` translates elements up from `0.55rem` over 640ms with a `--i * 70ms` delay, applied to the home statement, its paragraph, and the facts panel. **It animates `transform` only — never opacity.** Starting from an already-legible default means no element is ever held invisible waiting on its stagger delay, which keeps the first paint honest and survives a stalled animation. The whole block is inside `@media (prefers-reduced-motion: no-preference)`.

### Named Rules

**The Earned Column Rule.** A column is earned by the job it does, not by the fields it holds — and measuring the contents will not tell you the job. The case-study sidebar was deleted on a contents measurement (7.6–16.1% fill, up to 1,835px of gutter, three rows that were a duplicate, a constant, and a field two of nine projects have) that was accurate and beside the point: its function was keeping the work in view while the story is read. The column came back carrying the artifact, and the same thin metadata now rides underneath it as caption without ever looking thin, because the image holds the column. Before removing a column, ask what it is for; before adding one, check what the content model holds across every instance, not the richest one.

**The Opaque Field Rule.** `body` is one free-form rich-text field, and no layout rule may read inside it. Nothing branches on how many headings it has, whether it has any, or what they say. A layout that infers structure from prose makes the author responsible for a contract they cannot see in the CMS — nine of nine projects happening to open with "The Ask" and "The Delivery" is an authoring habit, not a schema. Structure that the design needs comes from its own optional field on the content type, which is opt-in per project and degrades to nothing when empty.

**The One Crop Policy Rule.** Every project image renders in a 16:10 frame with `object-fit: cover` and `object-position: top center` — the work grid, the case-study hero, and the gallery tiles alike. Source ratios run 1.13–1.83, and rendering them raw made the hero swing 565–832px in height at identical width while the index promised a tidy card. The uncropped original is never lost: the hero is slide 0 of the lightbox, so the full frame is always one tap away.

**The One Authored Moment Rule.** The work grid is the site's single orchestrated interaction. New components get state changes that answer the user (a color, a rule, an outline) — not their own choreography. Scattered micro-animations spend the budget this moment needs. The case-study gallery is not a second moment; it is the same moment reused on the same material.

**The Never Invisible Rule.** Entrance animation moves things; it does not fade them in. No `opacity: 0` starting state, ever. If an animation fails or a delay stalls, the content is already readable. The one element that is genuinely hidden — the skip link — is moved out of the viewport by transform and comes back on focus, so it is never clipped away from the accessibility tree.

**The Three-Path Rule.** Any interaction built on hover must ship its keyboard path and its touch path in the same change. Pointer behavior is gated behind `(hover: hover) and (pointer: fine)` so it never strands a touch device.

**The Designed Failure Rule.** Every route segment that can fail owns a boundary in the house language, and every data read returns a degraded value rather than throwing. A blank white page with a system font is a design defect, not an edge case.

## Do's and Don'ts

### Do:
- **Do** divide with a 1px `{colors.rule}` hairline, and reach for the 1.5px `{colors.rule-strong}` only above a major content region.
- **Do** put every band's content inside `.shell` and let the band itself own the background and the rule.
- **Do** get hierarchy from the width axis — a new type role is a new `font-stretch` and weight on Archivo, never a new family.
- **Do** name a type role at the call site and let `globals.css` own the size; extend the ramp with a `clamp()` modifier when a surface needs a new one.
- **Do** wrap every `ch` measure in `min(…, 100%)`, including inline heading caps.
- **Do** use `{colors.accent}` for every action, link, active state and focus ring, and let its consistency be the signal.
- **Do** keep `{colors.ink-faint}` at its exact value; it is calibrated to clear WCAG AA at the 11–12px label sizes it carries.
- **Do** pair any raised or sunk tone with a hairline — tone alone never defines an edge.
- **Do** give non-button text links `.link-target` so they clear 24×24 on touch, taking the height from padding rather than from type.
- **Do** ship the keyboard and touch paths alongside any hover behavior, and use `:focus` rather than `:focus-visible` where an iOS tap must satisfy the rule.
- **Do** animate `transform` for entrance and leave content visible from first paint.
- **Do** honor `prefers-reduced-motion` by dropping the movement while keeping the state change that carries the meaning.
- **Do** give every route segment that can fail its own boundary, and make every data read degrade per field instead of throwing.
- **Do** let project imagery be the only chromatic event on the page.

### Don't:
- **Don't** add a `box-shadow`, `drop-shadow`, glow or inset highlight to any content surface. There is none in `src/` and its absence is structural.
- **Don't** introduce a card, a filled panel, or a rounded container to group content. Rules and spacing do that job.
- **Don't** round content corners, including a lightbox slide or an overlay control. Radius exists only on the focus ring (1px) and the scrollbar thumb (99px).
- **Don't** declare a `font-size` or `font-stretch` in a page or component; only `globals.css` sets type, and only the root error boundary and the lightbox close control are exempt.
- **Don't** express a responsive type change as a breakpoint step. The ramp is fluid.
- **Don't** add a second typeface, including for code, quotes or numerals.
- **Don't** add a second accent hue, a gradient, or a colored section background. `{colors.signal-error}` on form validation text is the system's only chromatic exception.
- **Don't** put an error state on a border, icon or background tint — the message text alone carries it.
- **Don't** uppercase anything outside the Label role, and never uppercase a button or a heading.
- **Don't** lighten `{colors.ink-faint}`, or set text smaller than 11px on it.
- **Don't** write a bare `ch` max-width; it will overflow a narrow viewport.
- **Don't** rebuild the skip link from `sr-only` + `focus:not-sr-only`; that pair does not reveal on focus.
- **Don't** start an entrance animation from `opacity: 0`.
- **Don't** gate an interaction on hover alone, and don't let a scroll-driven animation ship without an `@supports` guard.
- **Don't** scatter micro-interactions across new components; the work grid is where that budget was spent.
