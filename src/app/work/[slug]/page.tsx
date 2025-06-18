import { getPortfolioItem } from '@/lib/contentful';
import { renderOptions } from '../../../components/rich-text/renderOptions';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import {
  PortfolioPageEntry,
  PortfolioPageFields,
} from '../../../../declarations';
import { body_font } from '../../ui/fonts';

import { notFound } from 'next/navigation';


export async function generateMetadata({ params }: { params: { slug: string } }) {
  const item = await getPortfolioItem(params.slug);

  return {
    title: item.fields.title,
    description: item.fields.summary || '',
  };
}


export default async function PortfolioPage({
  params
}: {
    params: { slug: string };
}) {
  const post = await getPortfolioItem(params.slug);
  if (!post) return notFound();

  const { title, body } = post.fields as PortfolioPageFields;
  console.log(body);
  const parsed = await documentToReactComponents(body, renderOptions);

  return (
    <div className="container mx-auto max-w-2xl xl:max-w-3xl">
      <div className={`flex flex-col ${body_font.className} text-xl`}>
        <h2 className="font-extrabold text-4xl mb-4">Our Work.</h2>
        <div className="prose prose-2xl prose-blue">
          <h1>{title}</h1>
          <div>{parsed}</div>
        </div>
      </div>
    </div>
  );
}
