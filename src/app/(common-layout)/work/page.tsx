import type { Metadata } from 'next';
import { getAllPortfolioItems } from '@/lib/contentful';
import WorkGrid from '@/components/WorkGrid/WorkGrid';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected projects — websites, brands and custom applications built for galleries, nonprofits and small businesses.',
};

export default async function Work() {
  const projects = await getAllPortfolioItems();

  return (
    <>
      <header className="rule-bottom pb-10 md:pb-14">
        <h1 className="t-statement text-[2.5rem] sm:text-[3.25rem]" style={{ maxWidth: 'min(16ch, 100%)' }}>
          Selected work
        </h1>
        <p className="t-prose mt-5 text-[1.0625rem] text-ink-muted">
          Every project below I built myself — brand, design, front-end, and the
          custom applications where off-the-shelf tools ran out.
        </p>
      </header>

      <section>
        <div className="rule-strong-bottom mb-9 mt-10 flex items-baseline justify-between pb-3">
          {/* an h2 so the page never jumps h1 → h3 (WCAG 1.3.1) */}
          <h2 className="t-label text-ink-muted">Projects</h2>
          {projects.length > 0 && (
            <p className="t-label text-ink-faint">{projects.length} total</p>
          )}
        </div>

        <WorkGrid projects={projects} />
      </section>
    </>
  );
}
