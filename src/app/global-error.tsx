'use client';

import { useEffect } from 'react';

/**
 * Last resort: an error in the root layout itself, where the site's own
 * chrome and stylesheet may not have mounted. Styles are inline for that
 * reason — this file cannot assume globals.css loaded.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[byNiko] root layout error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: '#f7f7f5',
          color: '#14161a',
          fontFamily:
            'Archivo, system-ui, -apple-system, "Segoe UI", sans-serif',
        }}
      >
        <main style={{ padding: '2.5rem', maxWidth: '34rem' }}>
          <h1
            style={{
              margin: 0,
              fontSize: 'clamp(2rem, 5vw, 2.75rem)',
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
            }}
          >
            byNiko is having a problem.
          </h1>
          <p
            style={{
              marginTop: '1.25rem',
              fontSize: '1.0625rem',
              lineHeight: 1.65,
              color: '#5c6268',
            }}
          >
            The site failed to load. That&rsquo;s on my end, not yours.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: '1.75rem',
              padding: '0.85rem 1.35rem',
              background: '#0c6b45',
              color: '#ffffff',
              border: 0,
              fontSize: '0.875rem',
              fontWeight: 600,
              fontFamily: 'inherit',
              cursor: 'pointer',
            }}
          >
            Reload the page
          </button>
          {error.digest && (
            <p
              style={{
                marginTop: '2rem',
                fontSize: '0.75rem',
                letterSpacing: '0.02em',
                color: '#696f76',
              }}
            >
              Reference: {error.digest}
            </p>
          )}
        </main>
      </body>
    </html>
  );
}
