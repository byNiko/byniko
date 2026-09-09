import type { Metadata } from 'next';
import DiscoveryForm from '@/components/FormDiscovery';

export const metadata: Metadata = {
  title: 'Discovery questionnaire',
  description:
    'A few questions to get a project started — what you do, what the site needs to achieve, and what you already have.',
};

export default function ClientDiscovery() {
  return (
    <>
      <header className="rule-bottom pb-10 md:pb-14">
        <h1 className="t-statement" style={{ maxWidth: 'min(16ch, 100%)' }}>
          A few questions to get started.
        </h1>
      </header>

      <div className="mt-12 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
        {/* the form is long; the guidance stays alongside it rather than
            scrolling away and leaving a column of empty paper */}
        <div className="lg:sticky lg:top-28">
          <p className="t-prose t-lede text-ink-muted">
            Every project starts with a conversation, and this is the long
            version of it. Your answers tell me what the work actually is
            before either of us commits to anything.
          </p>

          <dl className="mt-10">
            <div className="rule-top py-5">
              <dt className="t-title">Take your time</dt>
              <dd className="mt-1.5 max-w-[min(42ch,100%)] text-sm leading-relaxed text-ink-muted">
                Only your name and email are required. Skip anything you
                haven&rsquo;t worked out yet — &ldquo;not sure&rdquo; is a
                genuinely useful answer.
              </dd>
            </div>
            <div className="rule-top py-5">
              <dt className="t-title">What happens next</dt>
              <dd className="mt-1.5 max-w-[min(42ch,100%)] text-sm leading-relaxed text-ink-muted">
                I read it myself and come back with questions and a sense of
                scope. No proposal-by-template, no pressure.
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <DiscoveryForm />
        </div>
      </div>
    </>
  );
}
