'use client';
type Props = {
  services?: string[];
  publicUrl?: string;
};

/**
 * Displays the host rather than the raw URL — `autotechinvestments.com` reads
 * as a destination where `https://autotechinvestments.com/` reads as a string.
 * A URL the CMS holds in a shape `URL` cannot parse falls back to the raw value
 * rather than dropping the only outbound link on the page.
 */
function displayUrl(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

/**
 * The artifact's caption. Every row is guarded, and the whole block is absent
 * when a project carries neither — an empty hairline table reads as a defect,
 * where a missing one reads as a project that simply has less to say.
 *
 * There is deliberately no image-count row: it could only ever be true when the
 * gallery below is also rendering, so it would name what is already shown.
 */
export default function CaseFacts({ services, publicUrl }: Props) {
  const hasServices = Boolean(services?.length);

  if (!hasServices && !publicUrl) return null;

  return (
    <dl className="case-facts">
      {hasServices && (
        <div>
          <dt className="t-label text-ink-muted">What I did</dt>
          <dd>{services!.join(' · ')}</dd>
        </div>
      )}

      {publicUrl && (
        <div>
          <dt className="t-label text-ink-muted">Live site</dt>
          <dd>
            <a
              href={publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="action-quiet"
            >
              {displayUrl(publicUrl)} <span aria-hidden>↗</span>
            </a>
          </dd>
        </div>
      )}
    </dl>
  );
}
