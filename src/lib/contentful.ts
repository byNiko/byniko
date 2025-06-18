import { Entry, EntryCollection, EntrySkeletonType } from 'contentful';
import { createClient } from 'contentful';
// import { Document } from '@contentful/rich-text-types';


// Ensure these variables are defined
const space = process.env.CONTENTFUL_SPACE_ID!;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN!;

const client = createClient({
  space: space,
  accessToken: accessToken,
	environment: 'master', // or 'main' or whatever you're using
});

import { PortfolioPageFields } from '@/../declarations'; // adjust path as needed

type PortfolioPageSkeleton = EntrySkeletonType<
  PortfolioPageFields,
  'portfolioPage'
>;





export const getPortfolioItem = async ( slug: string ) => {
	const entries = await client.getEntries({
    content_type: 'portfolioPage',
    'fields.slug': slug,
    locale: 'en-US', 
    limit: 1,
  });

	return entries.items[0];
};
  

/**
 * Fetch all portfolio items (e.g. for index pages or paths)
 */
export async function getAllPortfolioItems(): Promise<Entry<PortfolioPageSkeleton>[]> {
  const response: EntryCollection<PortfolioPageSkeleton> =
    await client.getEntries<PortfolioPageSkeleton>({
      content_type: 'portfolioPage', // replace with your actual content type ID
      locale: 'en-US', 
    });

  return response.items;
}