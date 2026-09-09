'use client';
import ContentfulImage from '../ContentfulImage';
import { useModalContext } from '../ModalContext/ModalContext';
import { Asset } from 'contentful';

type Props = {
  mainImage: Asset;
  title: string;
  slides: Array<Asset> | [];
};

export default function FeaturedImage({ mainImage, title, slides }: Props) {
	const { openModal } = useModalContext();

  return (
    <button
      type="button"
      className="featured-image block w-full p-0 text-left"
      aria-label={`${title} — open image gallery`}
      onClick={() => {
        openModal(0, slides);
      }}
    >
      <ContentfulImage priority asset={mainImage} alt={title} className="w-full" />
    </button>
  );
}
