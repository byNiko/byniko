// import { createClient } from 'contentful';
import { getAllPortfolioItems } from '@/lib/contentful';
// import { PortfolioPageEntry, PortfolioPageFields } from '../../../declarations';
import Image from 'next/image';
import Link from 'next/link';

export default async function Work() {
  const pages = await getAllPortfolioItems();
  return (
    <>
      {/* <div className="container mx-auto max-w-2xl lg:max-w-4xl">
     <div className={`flex flex-col ${body_font.className} text-xl`}> */}
      <h2 className="font-extrabold text-4xl mb-4">Our Work.</h2>
      <div className="prose prose-2xl prose-blue grid gap-12  grid-cols-[repeat(auto-fit,minmax(25%,1fr))]">
        {pages.map((page) => {
          return (
            <div key={page.sys.id} className="portfolio-item">
              <Link className="no-underline portfolio-link" href={`/work/${page.fields.slug}`}>
                {page.fields.mainImage && (
                  <div className="portfolioImage-wrap">
                    <Image
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
      {/* </div>
    </div> */}
    </>
  );
}
