# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: **a warm referral.** Someone has just been told "you should talk to Niko." They arrive already half-sold, on a phone, between other things. Their job is not to discover a vendor; it is to **confirm the referral was good and find the fastest honest path to a conversation.**

The client base is **wider than performing arts** and must not be narrowed to it:
- **Visual arts** — galleries, individual artists, studios
- **Nonprofits** — arts and mission-driven organizations
- **Small businesses** — owner-operated companies needing a real site

"For the arts" is the positioning line and the center of gravity, not the boundary. Design metaphors drawn from any single one of these worlds (theatre production, gallery white cube, studio practice) will read as wrong to the other two. The visual world must be legible to all three.

They are checking three things, in this order:
1. Is this person real, and do they actually do this?
2. Have they done work like mine, for people like me?
3. How do I reach them without a sales gauntlet?

Secondary (not the design target, but present): past clients returning for a link, and peers or collaborators sizing up the practice.

## Product Purpose

ByNiko is Niko's independent web practice — website and brand development for the arts, operating since 2010. The site exists to close the loop on a referral: confirm competence, show relevant work, and hand off to a conversation. Success is a qualified inquiry from someone who arrived with a name already in hand.

It is explicitly **not** a lead-generation funnel for cold traffic, and not a content marketing engine.

## Positioning

An artist who codes, working solo. Not an agency, not a freelancer-marketplace body, not a template shop. The differentiator is that **the person you meet is the person who builds it** — brand system, front-end, and the custom applications that off-the-shelf tools won't cover, done by one practitioner who understands arts clients because he comes from there.

The confirmed public positioning line is: *website & brand development for the arts.*

## Operating Context

- Visitors typically arrive from a text message, an email intro, or a name spoken in a meeting — often mobile, often in a hurry, rarely via search.
- Clients evaluate visually and on trust. They are frequently under-budgeted and have been burned by agencies or by a nephew-with-Squarespace.
- **Stated design constraint (user, this session):** directions that are too thematically specific or too complicated are wrong for this audience. The world must stay simple and broadly legible; a single-industry costume excludes two thirds of the client base.
- Work is delivered as a solo practice; scale is a real constraint and an honest one.
- The site is CMS-backed so Niko can add projects without a deploy.

## Capabilities and Constraints

**Stack (existing, retained):** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Contentful (CMS) · Formspree (contact) · Vercel Analytics. Deployed at byniko.com.

**Contentful content model — confirmed fields:**
- `portfolioPage`: `title`, `slug`, `body` (rich text), `mainImage` (Asset), `gallery` (Asset[]), `servicesList` (string[]), `publicUrl`
- `page`: `title`, `slug`, `body` (rich text) — powers About, Services, and other flat pages

**No `year` / `date` field exists on `portfolioPage`.** Project dates must not be invented; showing them requires the user to add the field and populate it.

**Routes in place:** `/` · `/work` · `/work/[slug]` · `/[slug]` (About, Services) · `/contact` · `/client-discovery`

## Brand Commitments

- **Name:** byNiko (rendered `byNiko.` on the current masthead; `BN.` as a compact mark). Retained.
- **Tagline:** "website & brand development for the arts." Retained — it is the confirmed positioning line.
- **Voice:** first person singular — **"I," not "we."** Niko, sole proprietor. Existing site copy written in the studio "we" is to be rewritten into first person, preserving its substance. Direct, warm, unpretentious; no agency costume, no "digital masterpiece" inflation.
- **Not binding:** the current blue gradient, Montserrat Alternates, and rounded-panel shell. The user has approved a full visual redesign; the incumbent look is evidence and anti-reference only.

## Evidence on Hand

**Real, confirmed — nine shipped projects:**
Calibrate.earth · BurgessTV · Doctor Doctor · Kobalt Pier · Fulcrum Arts · Procession.la · Domestic Light · A.T.I. · How To Become a Working Actor

Each has a live Contentful entry with imagery, a body write-up, and a services list. Example (Calibrate.earth): services *Front End Development, Custom Donation App*; built pro-bono as part of an annual commitment; standout deliverable a custom donation widget with one-time and recurring tiers.

**Confirmed service areas:** Branding (strategy, visual identity, guidelines, messaging) · Website Design (UX/UI, responsive, user testing) · Development (custom builds, CMS integration, e-commerce, custom features) · Search Engine Optimization (keyword research, on-page, technical audit, local).

**Confirmed practice fact:** operating since 2010.

**Absent — must not be fabricated:**
- Testimonials or client quotes (none exist)
- Project dates or years (no CMS field)
- City / studio location
- Current availability or booking window
- Public email address (contact currently routes through a Formspree form)
- Client counts, revenue figures, awards, press

## Product Principles

1. **Confirm, don't convince.** The visitor already has a referral in hand. Remove friction; do not re-sell from zero.
2. **The work is the argument.** Nine real projects with real imagery outrank any adjective about quality.
3. **One person, said plainly.** Solo scale is stated honestly and made into an advantage, never disguised as a studio.
4. **Fast path to a human.** Contact is never more than one deliberate move away, from any page, on any device.
5. **Craft is the credential.** For a web developer, the site itself is the portfolio piece — execution quality is a product requirement, not decoration.

## Accessibility & Inclusion

No client-mandated standard established. Baseline requirement derived from positioning: the practice publicly claims to meet "every web standard and best practice," so the site must hold to WCAG 2.1 AA — real contrast ratios, full keyboard operability, honest focus states, and `prefers-reduced-motion` support. Failing this on Niko's own site would contradict the pitch.
