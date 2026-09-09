# byNiko

Websites and brands for galleries, nonprofits and small businesses.
Next.js 15 (App Router) · React 19 · Tailwind CSS v4 · Contentful · Formspree.

- `PRODUCT.md` — who the site is for and what it must not claim
- `DESIGN.md` — the visual system, its tokens, and the rules worth not undoing

## Running it

```bash
pnpm install
pnpm dev
```

## Environment

`.env*` is gitignored, so these live in `.env.local` locally and in the host's
environment in production.

| Variable | Required | What it does |
| --- | --- | --- |
| `CONTENTFUL_SPACE_ID` | yes | Contentful space. Without it, content renders empty rather than erroring. |
| `CONTENTFUL_ACCESS_TOKEN` | yes | Contentful Content Delivery API token (read-only). |
| `NEXT_PUBLIC_FORMSPREE_FORM` | yes | Formspree form id for `/contact`. Unset shows an honest "not connected" state instead of failing on send. |
| `NEXT_PUBLIC_FORMSPREE_DISCOVERY` | yes | Formspree form id for `/client-discovery`. Same fallback. |
| `REVALIDATE_SECRET` | yes | Shared secret for the Contentful revalidation webhook. Unset means the webhook rejects everything. |

## Content

Contentful drives the site. Content types:

| Type | Purpose |
| --- | --- |
| `homePage` | Homepage headline and intro. Each field falls back independently, so a half-filled entry degrades one line at a time. |
| `workIndex` | Drag-sortable ordering for the work grid. Projects missing from the list are appended, never hidden. |
| `portfolioPage` | A project: title, slug, body, main image, gallery, services, live URL. |
| `page` | Flat pages — currently About and Services. |

### Publishing

Pages are prerendered at build time and revalidate every 5 minutes. To make
publishing immediate, point a Contentful webhook at the revalidation route:

- **URL** — `POST https://byniko.com/api/revalidate`
- **Triggers** — Entry: publish, unpublish, delete
- **Header** — `x-revalidate-secret: <REVALIDATE_SECRET>`

The secret travels in a header rather than a query string, so it stays out of
access logs. The route revalidates only the paths a given entry affects, and
falls back to revalidating everything when it cannot tell.

## How it behaves when things break

This is deliberate and worth preserving:

- **The CMS is unreachable.** No route 500s. The homepage keeps its fallback
  copy, the work grid explains itself, and contact still works. Prerendered
  pages are unaffected — they are already-built HTML, and a failed
  revalidation keeps serving the last good version.
- **A page genuinely does not exist** → 404.
- **A page cannot be fetched** → 5xx, not 404, so crawlers retry instead of
  treating the project as permanently gone. List routes never do this; a
  degraded grid beats an error page.
- **A form is misconfigured** → it says so, rather than silently failing on
  submit.
- **An asset is unpublished** → that block is skipped, not a crashed page.

## Accessibility

WCAG 2.1 AA is a product requirement, not a nice-to-have — the site publicly
claims to meet every web standard. Current state, measured with axe-core
across every route at desktop and mobile: zero violations, zero contrast
failures, zero touch targets under 24×24.

Two things in `DESIGN.md` are easy to break by accident:

- The skip link is a real component. Tailwind's `sr-only` +
  `focus:not-sr-only` pair does **not** reveal on focus — `sr-only` wins on
  source order at equal specificity.
- `.link-target` gives text links their tap height from padding. Removing it
  fails WCAG 2.2 SC 2.5.8.
