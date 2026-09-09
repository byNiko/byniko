import { revalidatePath } from 'next/cache';
import { timingSafeEqual } from 'node:crypto';

/**
 * Contentful webhook target. Prerendering makes the site immune to a CMS
 * outage but introduces a staleness window; this closes it, so publishing is
 * immediate and the pages stay static.
 *
 * Configure in Contentful → Settings → Webhooks:
 *   URL     POST https://byniko.com/api/revalidate
 *   Trigger Entry: publish, unpublish, delete
 *   Header  x-revalidate-secret: <REVALIDATE_SECRET>
 *
 * The secret travels in a header, never a query string, so it stays out of
 * access logs and referrers.
 */

export const dynamic = 'force-dynamic';

const SECRET = process.env.REVALIDATE_SECRET;

function authorized(request: Request) {
  if (!SECRET) return false;

  const provided = request.headers.get('x-revalidate-secret');
  if (!provided) return false;

  const a = Buffer.from(provided);
  const b = Buffer.from(SECRET);
  // timingSafeEqual throws on length mismatch, so compare lengths first
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Webhook payloads are localised: `fields.slug['en-US']`. */
function readSlug(fields: unknown): string | null {
  const slug = (fields as { slug?: unknown } | undefined)?.slug;
  if (typeof slug === 'string') return slug;
  if (slug && typeof slug === 'object') {
    const first = Object.values(slug as Record<string, unknown>).find(
      (value) => typeof value === 'string' && value,
    );
    if (typeof first === 'string') return first;
  }
  return null;
}

export async function POST(request: Request) {
  if (!authorized(request)) {
    // Same response whether the secret is wrong or unset — no oracle.
    return Response.json({ revalidated: false }, { status: 401 });
  }

  let contentType: string | null = null;
  let slug: string | null = null;

  try {
    const body = await request.json();
    contentType = body?.sys?.contentType?.sys?.id ?? null;
    slug = readSlug(body?.fields);
  } catch {
    // A malformed or empty body is not worth failing over; fall through to
    // the broad revalidation below.
  }

  // Unpublish and delete arrive as DeletedEntry, which carries `sys` but no
  // `fields` — so the slug of the page that just went stale is unknowable.
  // Fall back to a layout revalidation in that case, otherwise the removed
  // project's own URL keeps serving from cache until the next interval.
  if (!slug && (contentType === 'portfolioPage' || contentType === 'page')) {
    revalidatePath('/', 'layout');
    return Response.json({
      revalidated: true,
      scope: 'layout',
      contentType,
      reason: 'no slug in payload',
    });
  }

  const paths = new Set<string>();

  switch (contentType) {
    case 'portfolioPage':
      if (slug) paths.add(`/work/${slug}`);
      paths.add('/work');
      paths.add('/');
      break;
    case 'page':
      if (slug) paths.add(`/${slug}`);
      break;
    case 'homePage':
      paths.add('/');
      break;
    case 'workIndex':
      paths.add('/work');
      paths.add('/');
      break;
    default:
      // Unknown or unreadable content type — an asset change, say, which can
      // appear on any page. Revalidate everything rather than guess wrong.
      revalidatePath('/', 'layout');
      return Response.json({
        revalidated: true,
        scope: 'layout',
        contentType,
      });
  }

  for (const path of paths) revalidatePath(path);

  return Response.json({
    revalidated: true,
    scope: 'paths',
    contentType,
    paths: [...paths],
  });
}
