import { createClient } from 'contentful';
import { PortfolioPageEntry, PortfolioPageFields } from '../../../declarations';
import { body_font } from '../ui/fonts';
import Image from 'next/image';
import Link from 'next/link';

const client = createClient({
  space: '23pc8vl6lelg',
  accessToken: 'x2dQM8Pd3b8lPOEkmyhmzJVn55p5P6XUMo6spOLL-gs',
  //   space: process.env.CONTENTFUL_SPACE_ID!,
  //   accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN!,
});

async function getPortfolioPages(): Promise<PortfolioPageEntry[]> {
  const response = await client.getEntries<PortfolioPageFields>({
    content_type: 'portfolioPage',
  });
  return response.items as PortfolioPageEntry[];
}

export default async function Work() {
  const portfolioPages = await getPortfolioPages();
  return (
    <div className="container mx-auto max-w-2xl xl:max-w-3xl">
      <div className={`flex flex-col ${body_font.className} text-xl`}>
        <h2 className="font-extrabold text-4xl mb-4">Our Work.</h2>
        <div className="prose prose-2xl prose-blue">
          {portfolioPages.map((page: PortfolioPageEntry) => {
            console.log('here', page);
            return (
              <div key={page.sys.id}>
                <Link href={`/work/${page.fields.slug}`}>
                  <h3>{page.fields.title}</h3>
                </Link>
                <Image
                  src={`https:${page.fields.mainImage.fields.file.url}`}
                  alt={page.fields.title}
                  width={500}
                  height={500}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
