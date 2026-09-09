import Image from 'next/image';
import Link from 'next/link';
import type { Entry } from 'contentful';
import type {
  PortfolioPageEntrySkeleton,
  PortfolioPageFields,
} from '@/../declarations';

type Project = Entry<PortfolioPageEntrySkeleton>;

/**
 * The one authored moment on the site. Hovering or focusing any cell brings
 * that screenshot forward while every sibling recedes to grayscale, and the
 * hairline under the active name draws in from the left. Driven entirely from
 * .work-grid / .work-cell in globals.css so it survives without JS.
 */
export default function WorkGrid({
  projects,
  priorityCount = 3,
}: {
  projects: Project[];
  priorityCount?: number;
}) {
  if (!projects.length) {
    return (
      <div className="facts max-w-[min(48ch,100%)] p-8">
        <h3
          className="t-display t-display--xs"
         
        >
          The project list isn&rsquo;t loading.
        </h3>
        <p className="t-prose mt-3 text-sm text-ink-muted">
          That&rsquo;s on my end, not yours — the content service is
          unreachable at the moment. Everything else on the site still works,
          and I can send work samples straight over.
        </p>
        <Link href="/contact" className="action-quiet mt-5">
          Ask me for samples <span aria-hidden>→</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="work-grid">
      {projects.map((project, i) => {
        const { title, slug, mainImage, servicesList } =
          project.fields as unknown as PortfolioPageFields;
        const file = mainImage?.fields?.file as
          | { url?: string }
          | undefined;
        const src = file?.url ? `https:${file.url}` : null;

        // Not every mainImage is a screenshot — A.T.I. is a brand board — so
        // the asset describes itself where it can, and the fallback stays
        // medium-neutral rather than asserting what the image shows.
        const described = mainImage?.fields?.description;
        const alt =
          typeof described === 'string' && described.trim()
            ? described
            : `${title} — project image`;

        return (
          <Link key={project.sys.id} href={`/work/${slug}`} className="work-cell">
            <div className="work-frame">
              {src ? (
                <Image
                  src={src}
                  alt={alt}
                  width={800}
                  height={500}
                  priority={i < priorityCount}
                  sizes="(max-width: 40rem) 100vw, (max-width: 64rem) 50vw, 33vw"
                />
              ) : (
                <span className="t-label absolute inset-0 flex items-center justify-center text-ink-faint">
                  No image yet
                </span>
              )}
            </div>

            <div className="work-name">
              <h3
                className="t-title min-w-0 break-words"
                style={{ overflowWrap: 'anywhere' }}
              >
                {title}
              </h3>
              <span aria-hidden className="t-label shrink-0 text-ink-faint">
                View
              </span>
            </div>

            <span aria-hidden className="work-underline block" />

            {servicesList?.length ? (
              <p className="t-meta mt-2 text-ink-muted">
                {servicesList.join(' · ')}
              </p>
            ) : null}
          </Link>
        );
      })}
    </div>
  );
}
