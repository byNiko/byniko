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
        /* full width until the artifact column is promoted at 72rem, then the
           column's own width — roughly 30rem, never the whole shell */
        sizes="(max-width: 72rem) 100vw, 30rem"
      />
    </button>
  );
}
