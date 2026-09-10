'use client';
import { Asset } from 'contentful';
import { useModalContext } from '../ModalContext/ModalContext';

type Props = {
  services?: string[];
  publicUrl?: string;
  /** Full lightbox set, with mainImage already at index 0. */
  slides: Array<Asset>;
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
 * when a project carries none of them — an empty hairline table reads as a
 * defect, where a missing one reads as a project that simply has less to say.
 */
export default function CaseFacts({ services, publicUrl, slides }: Props) {
  const { openModal } = useModalContext();
  const hasServices = Boolean(services?.length);
  const hasMore = slides.length > 1;

  if (!hasServices && !hasMore && !publicUrl) return null;

  return (
    <dl className="case-facts">
      {hasServices && (
        <div>
          <dt className="t-label text-ink-muted">What I did</dt>
          <dd>{services!.join(' · ')}</dd>
        </div>
      )}

      {hasMore && (
        <div>
          <dt className="t-label text-ink-muted">Images</dt>
          <dd>
            <button
              type="button"
              className="action-quiet"
              onClick={() => openModal(0, slides)}
            >
              {slides.length} images <span aria-hidden>↗</span>
            </button>
          </dd>
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
