import { getPortfolioItem } from '@/lib/contentful';

import { Document } from '@contentful/rich-text-types';
import { renderOptions } from '../../../components/rich-text/renderOptions';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import {
  PortfolioPageFields
} from '../../../../declarations';
import { body_font } from '../../ui/fonts';

import { notFound } from 'next/navigation';


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getPortfolioItem(slug);

  return {
    title: item.fields.title
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

  const { title, body } = post.fields as PortfolioPageFields;
  const parsed = await documentToReactComponents(body as Document, renderOptions);

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
