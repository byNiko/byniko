import Link from 'next/link';
import { notFound } from 'next/navigation';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';
import type { Asset } from 'contentful';

import { getAllPortfolioItems, getPortfolioItem } from '@/lib/contentful';
import { renderOptions } from '@/components/rich-text/renderOptions';
import { PortfolioPageFields } from '@/../declarations';
import GalleryStatic from '@/components/GalleryStatic/GalleryStatic';
import { ModalContextProvider } from '@/components/ModalContext/ModalContext';
import FeaturedImage from '@/components/FeaturedImage/FeaturedImage';

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

      <header className="rule-bottom pb-8">
        <h1
          className="t-statement t-statement--feature"
          style={{ maxWidth: 'min(15ch, 100%)' }}
        >
          {title}
        </h1>
      </header>

      {/* One hairline row, not a panel: the sidebar this replaces was empty on
          seven of nine projects. Rendered only when it carries something, so
          the empty state is an absent row rather than a bare double hairline. */}
      {(servicesList?.length || publicUrl) && (
        <div className="meta-row">
          {servicesList?.length ? (
            <p className="t-label text-ink-muted">
              <span className="sr-only">What I did: </span>
              {servicesList.join(' · ')}
            </p>
          ) : (
            <span />
          )}
          {publicUrl && (
            <a
              href={publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="action-quiet shrink-0"
            >
              Visit the live site <span aria-hidden>↗</span>
            </a>
          )}
        </div>
      )}

      {mainImage && (
        <div className="mt-10">
          <FeaturedImage mainImage={mainImage} title={title} slides={slides} />
        </div>
      )}

      {parsedBody ? (
        <div className="prose prose-niko prose-lg mx-auto mt-12 max-w-[var(--measure-longform)]">
          {parsedBody}
        </div>
      ) : (
        <p className="t-prose mx-auto mt-12 text-ink-muted">
          The write-up for this project isn&rsquo;t published yet. What I did is
          listed above — ask me about it and I&rsquo;ll walk you through the
          work.
        </p>
      )}

      {extras.length > 0 && (
        <section className="mt-16">
          <h2 className="t-label rule-strong-bottom mb-6 pb-3 text-ink-muted">
            More from this project
          </h2>
          <GalleryStatic slides={extras} />
        </section>
      )}

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
