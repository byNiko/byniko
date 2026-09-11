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

/**
 * Rendered twice and shown once: in the artifact column above 72rem, and after
 * the story below it. Stacked, the column sits above the body, and an offer
 * placed there would ask before the work has finished proving anything —
 * measured, it pushed the story from y=759 to y=902 on an 844px phone, off the
 * first screen entirely. `display: none` removes the unused copy from the
 * accessibility tree, so exactly one exists at any width.
 */
function CaseCta({ where }: { where: 'column' | 'band' }) {
  return (
    <div className={`case-cta case-cta--${where}`}>
      <p className="t-title">Working on something like this?</p>
      <Link href="/contact" className="action">
        Start a project <span aria-hidden>→</span>
      </Link>
    </div>
  );
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
   * means reading two or three of these. Without a move between them that
   * costs a round trip through the index every time. The sequence is the
   * curated `workIndex` order, so stepping through it is meaningful rather
   * than alphabetical accident; it wraps, so neither end is a dead stop.
   */
  const index = projects.findIndex((project) => project.sys.id === post.sys.id);
  const step = (n: number) =>
    projects.length > 1 && index !== -1
      ? ((projects[(index + n + projects.length) % projects.length]?.fields ??
          undefined) as PortfolioPageFields | undefined)
      : undefined;
  const prevFields = step(-1);
  const nextFields = step(1);

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

            {/* The one solid green in the column, and the only thing in it set
                in a heading role — it has to read as an offer, not another
                row of the caption above it. */}
            <CaseCta where="column" />
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

      <CaseCta where="band" />

      {/* The close is a pager now that the offer has moved into the column:
          two moves along the curated order rather than one link left alone. */}
      {(prevFields?.slug || nextFields?.slug) && (
        <nav className="close-band mt-16" aria-label="More projects">
          {prevFields?.slug ? (
            <div className="pager-step">
              <p className="t-label text-ink-faint">Previous project</p>
              <Link
                href={`/work/${prevFields.slug}`}
                className="action-quiet mt-2"
              >
                <span aria-hidden>←</span> {prevFields.title}
              </Link>
            </div>
          ) : (
            <span />
          )}

          {nextFields?.slug && (
            <div className="pager-step pager-step--end">
              <p className="t-label text-ink-faint">Next project</p>
              <Link
                href={`/work/${nextFields.slug}`}
                className="action-quiet mt-2"
              >
                {nextFields.title} <span aria-hidden>→</span>
              </Link>
            </div>
          )}
        </nav>
      )}

      </div>
    </ModalContextProvider>
  );
}
