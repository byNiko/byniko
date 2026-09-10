'use client';
import ContentfulImage from '../ContentfulImage';
import { useModalContext } from '../ModalContext/ModalContext';
import { Asset } from 'contentful';

type Props = {
  mainImage: Asset;
  title: string;
  /** Full lightbox set, with mainImage already at index 0. */
  slides: Array<Asset> | [];
};

export default function FeaturedImage({ mainImage, title, slides }: Props) {
  const { openModal } = useModalContext();

  return (
    <button
      type="button"
      className="hero-frame"
      aria-label={`${title} — view full size`}
      onClick={() => openModal(0, slides)}
    >
      <ContentfulImage
        priority
        asset={mainImage}
        alt={title}
        /* the frame is the full shell width, not the 33vw the default assumed */
        sizes="(max-width: 48rem) 100vw, 90vw"
      />
    </button>
  );
}
