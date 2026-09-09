'use client';

import Link from 'next/link';
import { useEffect } from 'react';

/**
 * Route-level error boundary. Without this, an unexpected runtime error shows
 * Next's default screen — unstyled in development and a bare "Application
 * error" in production, with no way back into the site.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[byNiko] unhandled route error:', error);
  }, [error]);

  return (
    <div className="shell py-16 md:py-24">
      <h1
        className="t-statement"
        style={{ maxWidth: 'min(18ch, 100%)' }}
      >
        Something went wrong on my end.
      </h1>
      <p className="t-prose mt-6 t-lede text-ink-muted">
        This isn&rsquo;t you. Try again — and if it keeps happening, tell me
        what you were looking for and I&rsquo;ll send it over directly.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <button type="button" className="action" onClick={reset}>
          Try again <span className="arrow">→</span>
        </button>
        <Link href="/contact" className="action-quiet">
          Tell me what happened <span aria-hidden>→</span>
        </Link>
      </div>

      {error.digest && (
        <p className="t-meta mt-10 text-ink-faint">
          Reference: {error.digest}
        </p>
      )}
    </div>
  );
}
