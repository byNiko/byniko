/**
 * `notFound()` resolves to the closest not-found boundary inside the calling
 * segment's own subtree, so the root boundary alone does not cover the pages
 * in this group — Next falls back to its built-in 404, which injects a style
 * block that overrides the site's own background. This re-exports the root
 * boundary so both paths render the same page.
 */
export { default, metadata } from '../not-found';
