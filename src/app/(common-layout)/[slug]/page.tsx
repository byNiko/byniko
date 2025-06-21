import {getPostBySlug} from '@/lib/contentful';
import { notFound } from 'next/navigation';
import { Document } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { renderOptions } from '@/components/rich-text/renderOptions';
import { PageFields } from '@/../declarations';
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return {
    title: post.fields.title,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return notFound();

  const { title, body } = post.fields as PageFields;

  const parsedBody = documentToReactComponents(body as Document, renderOptions);
  return (
    <>
      <header className="page-header  ">
        <h1 className="mb-4 text-balance">{title}</h1>
      </header>
      <div className="prose prose-2xl prose-blue">{parsedBody}</div>
    </>
  );
}
