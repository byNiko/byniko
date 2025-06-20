// components/ContentfulImage.tsx (or .jsx)
import Image from 'next/image';
import { Asset } from 'contentful';

interface ContentfulImageProps {
  asset: Asset;
  alt?: string; // Optional alt text, defaults to asset.fields.title
  className?: string;
  priority?: boolean; // For LCP images
  sizes?: string; // For responsive image optimization
}

const ContentfulImage: React.FC<ContentfulImageProps> = ({
  asset,
  alt,
  className,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw', // Example sizes
}) => {
  if (!asset || !asset.fields || !asset.fields.file) {
    console.warn('ContentfulImage: Invalid asset provided', asset);
    return null; // Or render a placeholder/error image
  }

  const imageUrl = `https:${asset.fields.file.url}`;
  const file = asset.fields.file;
  const details = file.details as { image?: { width: number; height: number } };
  const imageWidth = details.image?.width || 0;
  const imageHeight = details.image?.height || 0;
  const imageAlt =
    alt || getLocalizedString(asset.fields.description) || getLocalizedString(asset.fields.title )|| 'Image';

  return (
    <Image
      src={imageUrl}
      alt={imageAlt}
      width={imageWidth}
      height={imageHeight}
      className={className}
      priority={priority}
      sizes={sizes}
      // You can add more props like placeholder="blur", blurDataURL if needed
    />
  );
};

function getLocalizedString(
  field: string | { [x: string]: string | undefined } | undefined,
): string {
  if (!field) return '';
  if (typeof field === 'string') return field;
  // Return the first non-empty value
  return Object.values(field).find(Boolean) || '';
}

export default ContentfulImage;
