// components/ContentfulImage.tsx (or .jsx)
import Image from 'next/image';

// Define the shape of the Contentful asset data we expect
interface ContentfulAsset {
  fields: {
    title: string;
    description?: string;
    file: {
      url: string;
      details: {
        image: {
          width: number;
          height: number;
        };
      };
      contentType: string;
      fileName: string;
    };
  };
  sys: {
    id: string;
  };
}

interface ContentfulImageProps {
  asset: ContentfulAsset;
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
  const imageWidth = asset.fields.file.details.image.width;
  const imageHeight = asset.fields.file.details.image.height;
  const imageAlt =
    alt || asset.fields.description || asset.fields.title || 'Image';

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

export default ContentfulImage;
