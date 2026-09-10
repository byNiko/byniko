import Link from 'next/link';
import { notFound } from 'next/navigation';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';
import type { Asset } from 'contentful';

import { getAllPortfolioItems, getPortfolioItem } from '@/lib/contentful';
import { renderOptions } from '@/components/rich-text/renderOptions';
import { PortfolioPageFields } from '@/../declarations';
import { ModalContextProvider } from '@/components/ModalContext/ModalContext';
import CaseArtifact from '@/components/CaseArtifact/CaseArtifact';
import CaseFacts from '@/components/CaseFacts/CaseFacts';

/**
 * Case studies are built as static pages, so a CMS outage cannot reach them:
 * the HTML already exists, and a failed revalidation keeps serving the last
 * good version. `dynamicParams` leaves newly published slugs working before
 * the next deploy.
 */
export async function generateStaticParams() {
  const projects = await getAllPortfolioItems();

  // `slug` widens to a localised record through the entry skeleton, so it is
  // read as unknown and narrowed here rather than trusted from the type.
  return projects
    .map((project) => (project.fields as { slug?: unknown })?.slug)
    .filter((slug): slug is string => typeof slug === 'string' && slug !== '')
    .map((slug) => ({ slug }));
}

export const dynamicParams = true;
export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getPortfolioItem(slug);
  if (!item) return { title: 'Project not found' };

  const { title, servicesList } = item.fields as PortfolioPageFields;
  return {
    title,
    description: servicesList?.length
      ? `${title} — ${servicesList.join(', ')}. Built by byNiko.`
      : `${title} — a project built by byNiko.`,
  };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, projects] = await Promise.all([
    getPortfolioItem(slug),
    getAllPortfolioItems(),
  ]);
  if (!post) return notFound();

  const { title, body, mainImage, servicesList, gallery, publicUrl } =
    post.fields as PortfolioPageFields;

  const parsedBody = body
    ? documentToReactComponents(body as Document, renderOptions)
    : null;

  /**
   * The hero is slide 0 of the lightbox. Previously the hero was a button
   * that early-returned when a project had no gallery — dead on six of nine
   * projects — and opened `gallery[0]` on the rest, which is not the image
   * the visitor clicked.
   */
  const assetId = (asset?: Asset) => asset?.sys?.id;
  const extras = (gallery ?? []).filter(
    (asset) => assetId(asset) !== assetId(mainImage),
  );
  const slides = mainImage ? [mainImage, ...extras] : extras;

  /**
   * The visitor's real question is "have they done work like mine", which
   * means reading two or three of these. Without a forward move that costs a
   * round trip through the index every time.
   */
  const index = projects.findIndex((project) => project.sys.id === post.sys.id);
  const nextProject =
    projects.length > 1 && index !== -1
      ? projects[(index + 1) % projects.length]
      : null;
  const nextFields = nextProject?.fields as PortfolioPageFields | undefined;

  return (
    <ModalContextProvider>
      <div className="case-shell">
      <nav aria-label="Breadcrumb" className="mb-6">
        <Link
          href="/work"
          className="link-target t-label text-ink-muted transition-colors hover:text-accent"
        >
          ← All work
        </Link>
      </nav>

      <header className="rule-bottom pb-7">
        <h1
          className="t-statement t-statement--feature"
          style={{ maxWidth: 'min(15ch, 100%)' }}
        >
          {title}
        </h1>
      </header>

      {/* The artifact and its caption ride in a column beside the story and
          stay in view while it is read; the story itself comes from one
          free-form field and is never inspected. Without a mainImage there is
          no column to hold, so the split is not opened at all — an empty grid
          track is exactly the dead gutter this layout exists to remove.

          Every image lives in the artifact now: the stage carries the whole
          set and the strip indexes it, so there is no separate grid below the
          story restating what the column already holds. */}
      <div className={mainImage ? 'case-split' : 'mt-10'}>
        {mainImage && (
          <aside className="case-art">
            <CaseArtifact title={title} slides={slides} />
            <CaseFacts services={servicesList} publicUrl={publicUrl} />
          </aside>
        )}

        {parsedBody ? (
          <div
            className={`case-body prose prose-niko prose-lg${mainImage ? '' : ' mx-auto'}`}
          >
            {parsedBody}
          </div>
        ) : (
          <p
            className={`t-prose text-ink-muted${mainImage ? '' : ' mx-auto'}`}
          >
            The write-up for this project isn&rsquo;t published yet.
            {servicesList?.length
              ? ' What I did is listed with it — ask me about it and I’ll walk you through the work.'
              : ' Ask me about it and I’ll walk you through the work.'}
          </p>
        )}
      </div>

      <div className="close-band mt-16">
        <div>
          <p className="t-title">Working on something like this?</p>
          <Link href="/contact" className="action-quiet mt-2">
            Start a project <span aria-hidden>→</span>
          </Link>
        </div>

        {nextFields?.slug && (
          <div className="sm:text-right">
            <p className="t-label text-ink-faint">Next project</p>
            <Link
              href={`/work/${nextFields.slug}`}
              className="action-quiet mt-2"
            >
              {nextFields.title} <span aria-hidden>→</span>
            </Link>
          </div>
        )}
      </div>
      </div>
    </ModalContextProvider>
  );
}
