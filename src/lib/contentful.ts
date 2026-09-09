import {
  Entry,
  EntryCollection,
  EntryFieldTypes,
  EntrySkeletonType,
} from 'contentful';
import { createClient } from 'contentful';

import { PortfolioPageFields } from '@/../declarations';

type PortfolioPageSkeleton = EntrySkeletonType<
  PortfolioPageFields,
  'portfolioPage'
>;

/**
 * `projects` is left as a generic entry link: PortfolioPageFields is declared
 * with plain TS types rather than `EntryFieldTypes`, which the SDK's link
 * resolution cannot narrow through, so naming the skeleton here resolves the
 * linked fields to `never`. The concrete type is reasserted after filtering.
 */
type WorkIndexFields = {
  title: EntryFieldTypes.Symbol;
  projects: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<EntrySkeletonType>
  >;
};

type WorkIndexSkeleton = EntrySkeletonType<WorkIndexFields, 'workIndex'>;

type HomePageFields = {
  title: EntryFieldTypes.Symbol;
  headline: EntryFieldTypes.Symbol;
  intro: EntryFieldTypes.Text;
};

type HomePageSkeleton = EntrySkeletonType<HomePageFields, 'homePage'>;

export type HomeContent = {
  headline: string;
  intro: string;
};

/**
 * The copy that shipped before the homepage was editable. It stays the
 * fallback: an unreachable CMS, a missing entry, or a field someone emptied
 * leaves the page reading exactly as it does now rather than blank.
 */
export const HOME_CONTENT_FALLBACK: HomeContent = {
  headline:
    'Websites and brands for galleries, nonprofits and small businesses.',
  intro:
    'I’m Niko. Since 2010 I’ve done the whole job myself — brand, design, front-end, and the custom applications off-the-shelf tools won’t cover. No hand-offs, no account manager, no sub-contractors. Everything below, I built.',
};

const space = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

/**
 * The CMS is a network dependency, and a marketing site must not 500 because
 * Contentful is slow, rate-limiting, or misconfigured. The client is created
 * lazily and every read is wrapped: callers get empty results and render an
 * honest state instead of an error page.
 */
const client =
  space && accessToken
    ? createClient({ space, accessToken, environment: 'master' })
    : null;

if (!client && process.env.NODE_ENV !== 'production') {
  console.warn(
    '[contentful] CONTENTFUL_SPACE_ID / CONTENTFUL_ACCESS_TOKEN are not set — content will render empty.',
  );
}

function report(operation: string, error: unknown) {
  console.error(`[contentful] ${operation} failed:`, error);
}

/**
 * Order comes from the single `workIndex` entry, whose `projects` field is
 * drag-sortable in Contentful. Anything missing from that list is appended, so
 * a newly published project is never invisible — just unplaced. `include: 3`
 * reaches past the referenced entries to the assets inside them; at the default
 * depth `mainImage` comes back as an unresolved link and the cards lose their
 * images.
 */
export async function getAllPortfolioItems(): Promise<
  Entry<PortfolioPageSkeleton>[]
> {
  if (!client) return [];

  try {
    const [index, response] = await Promise.all([
      // A failure here costs the ordering, not the page.
      client
        .getEntries<WorkIndexSkeleton>({
          content_type: 'workIndex',
          locale: 'en-US',
          limit: 1,
          include: 3,
        })
        .catch((error) => {
          report('getAllPortfolioItems (workIndex)', error);
          return null;
        }),
      client.getEntries<PortfolioPageSkeleton>({
        content_type: 'portfolioPage',
        locale: 'en-US',
        limit: 100,
      }) as Promise<EntryCollection<PortfolioPageSkeleton>>,
    ]);

    const items = response.items ?? [];

    // Unpublished or deleted references arrive as bare links, not entries.
    const ordered = (index?.items?.[0]?.fields.projects ?? []).filter(
      (project) => project && 'fields' in project,
    ) as unknown as Entry<PortfolioPageSkeleton>[];

    if (!ordered.length) return items;

    const placed = new Set(ordered.map((project) => project.sys.id));

    return [...ordered, ...items.filter((item) => !placed.has(item.sys.id))];
  } catch (error) {
    report('getAllPortfolioItems', error);
    return [];
  }
}

/**
 * Reads the single `homePage` entry. Each field falls back independently, so a
 * half-filled entry degrades one line at a time instead of all at once.
 */
export async function getHomeContent(): Promise<HomeContent> {
  if (!client) return HOME_CONTENT_FALLBACK;

  try {
    const entries = await client.getEntries<HomePageSkeleton>({
      content_type: 'homePage',
      locale: 'en-US',
      limit: 1,
    });

    const fields = entries.items?.[0]?.fields;

    return {
      headline: fields?.headline?.trim() || HOME_CONTENT_FALLBACK.headline,
      intro: fields?.intro?.trim() || HOME_CONTENT_FALLBACK.intro,
    };
  } catch (error) {
    report('getHomeContent', error);
    return HOME_CONTENT_FALLBACK;
  }
}

export async function getPortfolioItem(slug: string) {
  if (!client || !slug) return undefined;

  try {
    const entries = await client.getEntries({
      content_type: 'portfolioPage',
      'fields.slug': slug,
      locale: 'en-US',
      limit: 1,
    });

    return entries.items?.[0];
  } catch (error) {
    report(`getPortfolioItem(${slug})`, error);
    return undefined;
  }
}

export async function getPostBySlug(slug: string) {
  if (!client || !slug) return undefined;

  try {
    const entries = await client.getEntries({
      content_type: 'page',
      'fields.slug': slug,
      limit: 1,
    });

    return entries.items?.[0];
  } catch (error) {
    report(`getPostBySlug(${slug})`, error);
    return undefined;
  }
}

/**
 * Distinguishes "the CMS answered and has nothing" from "the CMS is
 * unreachable", so pages can tell the visitor which one happened.
 */
export function isCmsConfigured() {
  return Boolean(client);
}
