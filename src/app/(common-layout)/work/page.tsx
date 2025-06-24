// import { createClient } from 'contentful';
import { getAllPortfolioItems } from '@/lib/contentful';
// import { PortfolioPageEntry, PortfolioPageFields } from '../../../declarations';
import Image from 'next/image';
import Link from 'next/link';

export default async function Work() {
  const pages = await getAllPortfolioItems();
  return (
    <>
      <h2 className="font-extrabold text-4xl mb-4">Latest Work.</h2>
      <div className="grid gap-6  grid-cols-2 md:grid-cols-3 ">
        {pages.map((page) => {
          return (
            <div key={page.sys.id} className="portfolio-item">
              <Link
                className="no-underline portfolio-link flex flex-col gap-4 "
                href={`/work/${page.fields.slug}`}
              >
                {page.fields.mainImage && (
                  <div className="portfolioImage-wrap">
                    <Image
                      className="rounded"
                      src={`https:${page.fields.mainImage.fields.file.url}`}
                      alt={`${page.fields.title} `}
                      width={500}
                      height={500}
                    />
                  </div>
                )}

                <h4>{`${page.fields.title}`}</h4>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
