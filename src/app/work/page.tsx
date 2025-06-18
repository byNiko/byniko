// import { createClient } from 'contentful';
import { getAllPortfolioItems } from '@/lib/contentful';
// import { PortfolioPageEntry, PortfolioPageFields } from '../../../declarations';
import { body_font } from '../ui/fonts';
import Image from 'next/image';
import Link from 'next/link';

export default async function Work() {
  const pages = await getAllPortfolioItems();
  return (
    <div className="container mx-auto max-w-2xl xl:max-w-3xl">
      <div className={`flex flex-col ${body_font.className} text-xl`}>
        <h2 className="font-extrabold text-4xl mb-4">Our Work.</h2>
        <div className="prose prose-2xl prose-blue">
          {pages.map((page) => {
            return (
              <div key={page.sys.id}>
                <Link href={`/work/${page.fields.slug}`}>
                  <h3>{`${page.fields.title}`}</h3>
                </Link>
                {page.fields.mainImage && (
                  <Image
                    src={`https:${page.fields.mainImage.fields.file.url}`}
                    alt={`${page.fields.title} `}
                    width={500}
                    height={500}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
