import type { Metadata } from 'next';
import ContactForm from '@/components/FormContact';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Tell me what you are making. Websites, brands and custom applications for galleries, nonprofits and small businesses.',
};

export default function Contact() {
  return (
    <div className="case-shell">
      <header className="rule-bottom pb-10 md:pb-14">
        <h1
          className="t-statement"
          style={{ maxWidth: 'min(16ch, 100%)' }}
        >
          Tell me what you&rsquo;re making.
        </h1>
      </header>

      <div className="contact-split">
        <div>
          <p className="t-prose t-lede text-ink-muted">
            Every project starts with a conversation. Whether you have a fully
            formed brief or just a sense that the current site isn&rsquo;t
            working, send it over — I read everything myself.
          </p>

          <dl className="mt-10">
            <div className="rule-top py-5">
              <dt
                className="t-title"
              >
                What happens next
              </dt>
              <dd className="mt-1.5 max-w-[min(42ch,100%)] text-sm leading-relaxed text-ink-muted">
                I&rsquo;ll reply personally, usually with a couple of questions
                before anything else. No sales sequence, no discovery call
                you didn&rsquo;t ask for.
              </dd>
            </div>
            <div className="rule-top py-5">
              <dt
                className="t-title"
              >
                Helpful to include
              </dt>
              <dd className="mt-1.5 max-w-[min(42ch,100%)] text-sm leading-relaxed text-ink-muted">
                What the organisation does, what the site needs to accomplish,
                and whatever timeline or budget shape you already have in mind.
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
