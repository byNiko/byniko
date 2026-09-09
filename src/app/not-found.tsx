import Link from 'next/link';
import type { Metadata } from 'next';
import FactsPanel from '@/components/FactsPanel/FactsPanel';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="shell py-16 md:py-24">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-20">
        <div>
          <h1
            className="t-statement"
            style={{ maxWidth: 'min(16ch, 100%)' }}
          >
            That page isn&rsquo;t here.
          </h1>
          <p className="t-prose mt-6 t-lede text-ink-muted">
            Either the link is wrong or I&rsquo;ve moved something. Nothing is
            broken on your end.
          </p>

          <nav aria-label="Where to go instead" className="mt-10">
            <h2 className="t-label rule-strong-bottom pb-3 text-ink-muted">
              Try one of these
            </h2>
            <ul className="m-0 list-none p-0">
              {[
                { href: '/work', label: 'Selected work', hint: 'Nine projects, start to finish' },
                { href: '/about', label: 'About', hint: 'Who I am and how I work' },
                { href: '/contact', label: 'Contact', hint: 'Tell me what you’re making' },
              ].map((item) => (
                <li key={item.href} className="rule-bottom">
                  <Link
                    href={item.href}
                    className="flex items-baseline justify-between gap-6 py-4 no-underline"
                  >
                    <span
                      className="t-title"
                    >
                      {item.label}
                    </span>
                    <span className="t-meta text-right text-ink-muted">
                      {item.hint}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <FactsPanel className="lg:sticky lg:top-28" />
      </div>
    </div>
  );
}
