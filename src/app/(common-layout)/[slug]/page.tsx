import { getPostBySlug } from '@/lib/contentful';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Document } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { renderOptions } from '@/components/rich-text/renderOptions';
import { PageFields } from '@/../declarations';
import FactsPanel from '@/components/FactsPanel/FactsPanel';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Page not found' };

  return { title: (post.fields as PageFields).title };
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

  const parsedBody = body
    ? documentToReactComponents(body as Document, renderOptions)
    : null;

  return (
    <>
      <header className="rule-bottom pb-10 md:pb-14">
        <h1
          className="t-statement"
          style={{ maxWidth: 'min(16ch, 100%)' }}
        >
          {title}
        </h1>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-20">
        {parsedBody && (
          <div className="prose prose-niko prose-lg max-w-[min(68ch,100%)]">
            {parsedBody}
          </div>
        )}
        <FactsPanel className="lg:sticky lg:top-28" />
      </div>

      <div className="rule-top mt-16 flex flex-col items-start justify-between gap-6 pt-10 md:flex-row md:items-center">
        <p className="t-display t-display--sm" style={{ maxWidth: 'min(22ch, 100%)' }}>
          Tell me what you&rsquo;re making.
        </p>
        <Link href="/contact" className="action no-underline">
          Start a project <span className="arrow">→</span>
        </Link>
      </div>
    </>
  );
}
