import { notFound } from 'next/navigation';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';

import { getPortfolioItem } from '@/lib/contentful';
import ContentfulImage from '@/components/ContentfulImage';
import ClientGalleryWrapper from '@/components/ClientGallery';
import { renderOptions } from '@/components/rich-text/renderOptions';
import { PortfolioPageFields } from '../../../../../declarations';
import Link from 'next/link';
import ScrollToTop from '@/components/ScrollToTop';

const Gallery = ClientGalleryWrapper;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getPortfolioItem(slug);

  return {
    title: item.fields.title,
  };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPortfolioItem(slug);

  if (!post) return notFound();

  const { title, body, mainImage, servicesList, gallery } =
    post.fields as PortfolioPageFields;

  const parsedBody = documentToReactComponents(body as Document, renderOptions);

  return (
    <>
      <div className="breadcrumbs text-base flex gap-2 mb-4">
        <Link className="underline " href="/work">
          Our Work
        </Link>
        <span className="text-gray-400">&gt;</span>
        <span>{title}</span>
      </div>
      <div className="flex flex-wrap md:flex-nowrap gap-4 justify-between">
        <div className="w-full md:w-5/7 title-container">
          <h1 className="font-extrabold text-7xl mb-4 text-balance">{title}</h1>
        </div>
        {servicesList && (
          <>
            <div className="w-1/1 md:w-2/7">
              <h3 className="hidden md:block text-[1rem] border-b">Services:</h3>
              <ul className="flex flex-wrap md:block gap-4 text-xs md:text-sm md:bg-blue-50 md:p-4 md:rounded-md md:shadow-sm md:mt-4">
                {servicesList?.map((service, index) => (
                  <li className="leading-5 my-1 bg-blue-50 md:bg-transparent p-2 md:p-0 rounded-md md:rounded-none md:shadow-none shadow-sm" key={index}>
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="md:my-5 flex gap-8 flex-wrap md:flex-nowrap justify-between">
        <div className="md:w-5/7">
          <hr className="h-1 my-5 border-0 rounded-sm bg-gray-300" />
        </div>
        <aside className="md:w-2/7 flex flex-col gap-4"></aside>
      </div>

      {/* Body and Featured Image */}
      <div className="md:my-5 flex gap-8 flex-wrap md:flex-nowrap justify-between">
        <div className="md:w-5/7 order-1 md:order-0">
          <div className="prose prose-2xl prose-blue  ">{parsedBody}</div>
        </div>
        <aside className="md:w-2/7 flex flex-col gap-4 order-0 w-full">
          {mainImage && (
            <div className="featured-image">
              <ContentfulImage
                
                asset={mainImage}
                alt={title}
                className="w-full shadow"
              />
            </div>
          )}
        </aside>
      </div>

      {/* Gallery */}
      {gallery && gallery.length > 0 && (
        <div className="mt-14 flex gap-14 flex-nowrap">
          <Gallery slides={gallery} />
        </div>
      )}
      <ScrollToTop targetElement="#scroll-container" />
    </>
  );
}
