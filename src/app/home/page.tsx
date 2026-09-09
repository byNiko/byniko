import Link from 'next/link';
import { getAllPortfolioItems, getHomeContent } from '@/lib/contentful';
import WorkGrid from '@/components/WorkGrid/WorkGrid';
import FactsPanel from '@/components/FactsPanel/FactsPanel';

// Reordering in Contentful reaches the site without a redeploy.
export const revalidate = 300;

export default async function Home() {
  const [projects, { headline, intro }] = await Promise.all([
    getAllPortfolioItems(),
    getHomeContent(),
  ]);
  const featured = projects.slice(0, 6);

  return (
    <>
      {/* Statement + facts ------------------------------------------------ */}
      <section className="shell rule-bottom pb-14 pt-14 md:pb-20 md:pt-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_23rem] lg:gap-20">
          <div>
            <h1
              className="settle t-statement t-statement--hero"
              style={{ maxWidth: 'var(--measure-statement)', ['--i' as string]: 0 }}
            >
              {headline}
            </h1>
            <p
              className="settle t-prose mt-7 whitespace-pre-line t-lede text-ink-muted"
              style={{ ['--i' as string]: 1 }}
            >
              {intro}
            </p>
          </div>

          <div className="settle" style={{ ['--i' as string]: 2 }}>
            <FactsPanel />
          </div>
        </div>
      </section>

      {/* Work -------------------------------------------------------------- */}
      <section className="shell py-14 md:py-20">
        <div className="rule-strong-bottom mb-9 flex items-baseline justify-between pb-3">
          <h2 className="t-label text-ink-muted">Selected work</h2>
          {projects.length > 0 && (
            <p className="t-label text-ink-faint">
              {projects.length} {projects.length === 1 ? 'project' : 'projects'}
            </p>
          )}
        </div>

        <WorkGrid projects={featured} />

        {projects.length > featured.length && (
          <div className="mt-12">
            <Link href="/work" className="action-quiet">
              All {projects.length} projects <span aria-hidden>→</span>
            </Link>
          </div>
        )}
      </section>

      {/* What I do --------------------------------------------------------- */}
      <section className="shell rule-top py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[23rem_minmax(0,1fr)] lg:gap-20">
          <h2 className="t-display">
            Four things, done by one person.
          </h2>
          <dl className="grid gap-0 sm:grid-cols-2">
            {[
              {
                t: 'Branding',
                d: 'Strategy, visual identity, brand guidelines and messaging.',
              },
              {
                t: 'Website design',
                d: 'UX and UI design, responsive layouts, and user testing.',
              },
              {
                t: 'Development',
                d: 'Custom builds, CMS integration, e-commerce and bespoke features.',
              },
              {
                t: 'Search engine optimization',
                d: 'Keyword research, on-page work, technical audits and local search.',
              },
            ].map((s) => (
              <div key={s.t} className="rule-top py-5 pr-8">
                <dt
                  className="t-title"
                >
                  {s.t}
                </dt>
                <dd className="mt-1.5 max-w-[min(38ch,100%)] text-sm leading-relaxed text-ink-muted">
                  {s.d}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Close ------------------------------------------------------------- */}
      <section className="shell rule-top py-16 md:py-24">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <h2
            className="t-statement t-statement--sm"
            style={{ maxWidth: 'min(18ch, 100%)' }}
          >
            Tell me what you&rsquo;re making.
          </h2>
          <Link href="/contact" className="action no-underline">
            Start a project <span className="arrow">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
