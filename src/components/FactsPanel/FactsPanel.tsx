import Link from 'next/link';

type Fact = { key: string; value: React.ReactNode };

const PRACTICE_FACTS: Fact[] = [
  { key: 'Practice', value: 'Sole proprietor' },
  { key: 'Since', value: '2010' },
  {
    key: 'Services',
    value: 'Branding · Website design · Development · SEO',
  },
  { key: 'Built with', value: 'Next.js · WordPress · Contentful' },
];

/**
 * The referral's questions, answered before they have to ask. Used on the
 * home page, on flat CMS pages, and in a reduced form on case studies.
 */
export default function FactsPanel({
  facts = PRACTICE_FACTS,
  action = true,
  label = 'Practice at a glance',
  className,
}: {
  facts?: Fact[];
  action?: boolean;
  label?: string;
  className?: string;
}) {
  return (
    <aside className={`facts self-start ${className ?? ''}`} aria-label={label}>
      <dl className="m-0">
        {facts.map((fact) => (
          <div key={fact.key} className="facts-row">
            <dt className="facts-key t-label">{fact.key}</dt>
            <dd className="facts-value m-0">{fact.value}</dd>
          </div>
        ))}
      </dl>
      {action && (
        <Link href="/contact" className="action no-underline">
          Start a project <span className="arrow">→</span>
        </Link>
      )}
    </aside>
  );
}
