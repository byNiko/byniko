import Link from 'next/link';
import { notFound } from 'next/navigation';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';

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
  const post = await getPortfolioItem(slug);
  if (!post) return notFound();

  const { title, body, mainImage, servicesList, gallery, publicUrl } =
    post.fields as PortfolioPageFields;

  const parsedBody = body
    ? documentToReactComponents(body as Document, renderOptions)
    : null;

  return (
    <ModalContextProvider>
      <nav aria-label="Breadcrumb" className="mb-6">
        <Link
          href="/work"
          className="link-target t-label text-ink-muted transition-colors hover:text-accent"
        >
          ← All work
        </Link>
      </nav>

      <header className="rule-bottom pb-10">
        <h1
          className="t-statement t-statement--feature"
          style={{ maxWidth: 'min(15ch, 100%)' }}
        >
          {title}
        </h1>
      </header>

      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
        <div className="order-2 lg:order-1">
          {mainImage && (
            <FeaturedImage
              mainImage={mainImage}
              title={title}
              slides={gallery ?? []}
            />
          )}

          {parsedBody ? (
            <div className="prose prose-niko prose-lg mt-10 max-w-[min(68ch,100%)]">
              {parsedBody}
            </div>
          ) : (
            <p className="t-prose mt-10 text-ink-muted">
              The write-up for this project isn&rsquo;t published yet. The
              services listed alongside are accurate — ask me about it and
              I&rsquo;ll walk you through the work.
            </p>
          )}

          {gallery && gallery.length > 0 && (
            <section className="mt-14">
              <h2 className="t-label rule-strong-bottom mb-6 pb-3 text-ink-muted">
                More from this project
              </h2>
              <GalleryStatic slides={gallery} />
            </section>
          )}
        </div>

        <aside className="order-1 self-start lg:sticky lg:top-28 lg:order-2">
          <div className="facts">
            <dl className="m-0">
              {servicesList?.length ? (
                <div className="facts-row">
                  <dt className="facts-key t-label">What I did</dt>
                  <dd className="facts-value m-0">
                    <ul className="m-0 list-none space-y-1 p-0">
                      {servicesList.map((service) => (
                        <li key={service}>{service}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ) : null}
              <div className="facts-row">
                <dt className="facts-key t-label">Practice</dt>
                <dd className="facts-value m-0">byNiko — sole proprietor</dd>
              </div>
            </dl>
            {publicUrl && (
              <a
                href={publicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="action no-underline"
              >
                Visit the live site <span className="arrow">↗</span>
              </a>
            )}
          </div>

          <div className="rule-top mt-8 pt-8">
            <p className="t-prose text-sm text-ink-muted">
              Working on something like this?
            </p>
            <Link href="/contact" className="action-quiet mt-3">
              Start a project <span aria-hidden>→</span>
            </Link>
          </div>
        </aside>
      </div>
    </ModalContextProvider>
  );
}
