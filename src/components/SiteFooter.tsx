import Link from 'next/link';
import navLinksData from '@/utils/navLinks-data';

export default function SiteFooter() {
  return (
    <footer className="rule-top mt-4">
      <div className="shell grid gap-10 py-12 md:grid-cols-[minmax(0,1fr)_auto] md:gap-20 md:py-14">
        <div>
          <p
            className="wordmark"
           
          >
            byNiko
          </p>
          <p className="t-prose mt-2 text-sm text-ink-muted">
            Websites, brands and custom applications for galleries, nonprofits
            and small businesses. An independent practice run by one person,
            since 2010.
          </p>
          <Link href="/contact" className="action-quiet mt-6">
            Start a project <span aria-hidden>→</span>
          </Link>
        </div>

        <nav aria-label="Footer" className="md:min-w-40">
          <h2 className="t-label rule-bottom mb-3 pb-2 text-ink-faint">Pages</h2>
          <ul className="m-0 grid list-none gap-0 p-0 md:gap-1">
            {navLinksData.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="link-target text-sm text-ink-muted transition-colors hover:text-ink"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="shell rule-top flex flex-wrap items-center justify-between gap-3 py-5">
        <p className="t-label text-ink-faint">
          © {new Date().getFullYear()} byNiko
        </p>
        <p className="t-label text-ink-faint">
          Website &amp; brand development for the arts
        </p>
      </div>
    </footer>
  );
}
