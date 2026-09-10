'use client';
import { Asset } from 'contentful';
import ContentfulImage from '../ContentfulImage';
import { useModalContext } from '../ModalContext/ModalContext';
import './style.css';

type Props = {
  /** The full lightbox set, hero at index 0 — not just the tiles shown here. */
  slides: Asset[];
  /**
   * First slide to render as a tile. The hero is slide 0 and is already shown
   * at the top of the page, so the grid starts at 1. Passing the full set and
   * an offset keeps the tile's lightbox index correct; rendering a sliced array
   * would open every tile one image early.
   */
  from?: number;
};

export default function GalleryStatic({ slides, from = 0 }: Props) {
  const { openModal } = useModalContext();
  const tiles = slides.slice(from);

  if (tiles.length === 0) return null;

  return (
    <div className="static-gallery">
      {tiles.map((image, i) => {
        const index = from + i;
        return (
          <button
            type="button"
            className="static-gallery__item p-0"
            key={image.sys?.id ?? index}
            aria-label={`View image ${index + 1} of ${slides.length} full size`}
            onClick={() => openModal(index, slides)}
          >
            <ContentfulImage
              asset={image}
              alt=""
              sizes="(max-width: 30rem) 50vw, (max-width: 64rem) 33vw, 17rem"
            />
          </button>
        );
      })}
    </div>
  );
}
