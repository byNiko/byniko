'use client';

import Gallery from './Gallery';
import { Asset } from 'contentful';

export default function ClientGalleryWrapper({slides}: {slides: Array<Asset>}) {
  return <Gallery slides={slides} />;
}
