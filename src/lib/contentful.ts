import { Entry, EntryCollection, EntrySkeletonType } from 'contentful';
import { createClient } from 'contentful';

import { PortfolioPageFields } from '@/../declarations';

type PortfolioPageSkeleton = EntrySkeletonType<
  PortfolioPageFields,
  'portfolioPage'
>;

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

export async function getAllPortfolioItems(): Promise<
  Entry<PortfolioPageSkeleton>[]
> {
  if (!client) return [];

  try {
    const response: EntryCollection<PortfolioPageSkeleton> =
      await client.getEntries<PortfolioPageSkeleton>({
        content_type: 'portfolioPage',
        locale: 'en-US',
        limit: 100,
      });

    return response.items ?? [];
  } catch (error) {
    report('getAllPortfolioItems', error);
    return [];
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
