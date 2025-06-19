// components/ContentfulImage.tsx
// 'use client';

import Image from 'next/image';
import React from 'react';

// Define the exact shape of the Contentful asset object you expect
interface ContentfulFileDetailsImage {
  width: number;
  height: number;
}

interface ContentfulFileDetails {
  size: number;
  image?: ContentfulFileDetailsImage; // <--- This '?' is crucial!
}

interface ContentfulFile {
  url: string;
  details: ContentfulFileDetails;
  fileName: string;
  contentType: string;
}

interface ContentfulAssetFields {
  title?: string;
  description?: string;
  file: ContentfulFile;
}

export interface ContentfulAsset {
  sys: {
    id: string;
    type: 'Asset';
  };
  fields: ContentfulAssetFields;
}

interface ContentfulImageProps {
  asset: ContentfulAsset | undefined | null;
  alt?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  quality?: number;
}

const ContentfulImage: React.FC<ContentfulImageProps> = ({
  asset,
  alt,
  className,
  priority = false,
  sizes,
  fill = false,
  quality,
  ...rest
}) => {
  if (!asset || !asset.fields || !asset.fields.file || !asset.fields.file.url) {
    console.warn(
      'ContentfulImage: Invalid or incomplete asset data provided.',
      asset,
    );
    return null;
  }

  const imageUrl = `https:${asset.fields.file.url}`;
  // The error is likely here or similar lines:
  // const imageWidth = asset.fields.file.details.image.width; // <--- PROBLEM LINE
  // const imageHeight = asset.fields.file.details.image.height; // <--- PROBLEM LINE

  // Fix: Use optional chaining and provide a default value (e.g., 0) if 'image' is undefined
  const imageWidth = asset.fields.file.details.image?.width || 0;
  const imageHeight = asset.fields.file.details.image?.height || 0;

  const imageAlt =
    alt || asset.fields.description || asset.fields.title || 'Contentful Image';

  const imageProps = fill
    ? { fill: true, sizes: sizes || '100vw' }
    : { width: imageWidth, height: imageHeight, sizes }; // Pass width/height even if 0

  return (
    <Image
      src={imageUrl}
      alt={imageAlt}
      className={className}
      priority={priority}
      quality={quality}
      {...imageProps}
      {...rest}
    />
  );
};

export default ContentfulImage;
