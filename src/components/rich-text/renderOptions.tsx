import { BLOCKS } from '@contentful/rich-text-types';
import { Options } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';

/**
 * Contentful returns unresolved links for assets and entries that are deleted
 * or unpublished. Every accessor below is defensive: a single missing asset in
 * a case-study body must not take the page down.
 */

function assetUrl(url: unknown): string | null {
  if (typeof url !== 'string' || !url) return null;
  if (url.startsWith('//')) return `https:${url}`;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `https://${url}`;
}

type Dimensions = { width: number; height: number };

function dimensions(file: unknown): Dimensions {
  const details = (file as { details?: { image?: Partial<Dimensions> } })
    ?.details?.image;
  return {
    width: details?.width ?? 1200,
    height: details?.height ?? 800,
  };
}

export const renderOptions: Options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      const fields = node?.data?.target?.fields;
      const image = fields?.image;
      const file = image?.fields?.file;
      const url = assetUrl(file?.url);
      if (!url) return null;

      const { width: imgWidth, height: imgHeight } = dimensions(file);

      const alt = fields.altText || image.fields.title || '';
      const width = fields.width || '200px';
      const float = fields.float || 'none';

      const classes = ['embedded-img', fields.classes, `float-${float}`]
        .filter(Boolean)
        .join(' ');

      return (
        <div
          className={classes}
          style={{
            width,
            maxWidth: '100%',
            marginBlock: float === 'none' ? '1rem' : 0,
            marginInlineEnd: float === 'left' ? '1rem' : 0,
            marginInlineStart: float === 'right' ? '1rem' : 0,
            marginBottom: float === 'none' ? '1rem' : '1rem',
          }}
        >
          <Image
            src={url}
            alt={alt}
            width={imgWidth}
            height={imgHeight}
            sizes="(max-width: 48rem) 100vw, 40rem"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      );
    },

    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const fields = node?.data?.target?.fields;
      const url = assetUrl(fields?.file?.url);
      if (!url) return null;

      const { width, height } = dimensions(fields.file);

      return (
        <Image
          src={url}
          alt={typeof fields.title === 'string' ? fields.title : ''}
          width={width}
          height={height}
          sizes="(max-width: 48rem) 100vw, 40rem"
          style={{ width: '100%', height: 'auto' }}
        />
      );
    },
  },
};
