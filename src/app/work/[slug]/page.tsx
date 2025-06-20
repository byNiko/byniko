import { getPortfolioItem } from '@/lib/contentful';
import ContentfulImage from '@/components/ContentfulImage';
import { Document } from '@contentful/rich-text-types';
import { renderOptions } from '../../../components/rich-text/renderOptions';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { PortfolioPageFields } from '../../../../declarations';
import { body_font } from '../../ui/fonts';
import { notFound } from 'next/navigation';
import ClientGalleryWrapper from '../../../components/ClientGallery';

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
  console.log(post);
  const { title, body, mainImage, servicesList, gallery } =
    post.fields as PortfolioPageFields;
  const parsed = await documentToReactComponents(
    body as Document,
    renderOptions,
  );

  return (
    <div className="container mx-auto max-w-3xl xl:max-w-6xl ">
      <div className={`flex flex-col ${body_font.className} `}>
        <div className="flex flex-wrap md:flex-nowrap justify-between ">
          <div className="w-5/7  ">
            <h1 className="font-extrabold text-7xl mb-4  text-balance">
              {title}
            </h1>
          </div>
          <div className="w-2/7">
            {post.fields.mainImage && (
              <div className="featured-image ">
                <ContentfulImage
                  asset={mainImage}
                  alt={title}
                  className="w-full"
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 flex gap-14 flex-wrap md:flex-nowrap justify-between">
          <div className="w-5/7 ">
            <hr className="w-full h-1 my-1 bg-gray-100 border-0 rounded-sm md:my-5 dark:bg-gray-300" />

            <div className=" prose prose-2xl prose-blue">{parsed}</div>
          </div>
          <aside className="w-2/7 flex flex-col gap-4">
            <h3 className="text-[1rem] border-b ">Services:</h3>
            <ul className=" text-sm bg-blue-50 p-4 rounded-md shadow-sm">
              {servicesList?.map((service: string, index: number) => (
                <li className="leading-5 my-1" key={index}>
                  {service}
                </li>
              ))}
            </ul>
          </aside>
        </div>
        <div className="mt-14 flex gap-14 flex-nowrap">
          {gallery && gallery.length > 0 && <Gallery slides={gallery} />}
        </div>
      </div>
    </div>
  );
}
