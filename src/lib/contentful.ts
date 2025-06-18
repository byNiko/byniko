import { createClient } from 'contentful';

// Ensure these variables are defined
const space = process.env.CONTENTFUL_SPACE_ID!;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN!;

const client = createClient({
  space: space,
  accessToken: accessToken,
});


export const getPortfolioItem = async ( slug: string ) => {
	const entries = await client.getEntries({
	  content_type: 'portfolioPage',
	  'fields.slug': slug,
	  limit: 1,
	});

	return entries.items[0];
  };