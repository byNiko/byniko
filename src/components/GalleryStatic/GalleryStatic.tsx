'use client';
import { Asset } from 'contentful';
import ContentfulImage from '../ContentfulImage';
import { useModalContext } from '../ModalContext/ModalContext';
import './style.css';


export default function GalleryStatic( { slides }: { slides: Asset[] } ) {

  const { openModal} = useModalContext();
  
  
	return (
    <>
      <div className="static-gallery">
        {slides.map((image, index) => (
          <button
            type="button"
            className="static-gallery__item p-0"
            key={index}
            aria-label={`Open image ${index + 1} of ${slides.length}`}
            onClick={() => {
              openModal(index, slides);
            }}
          >
            <ContentfulImage
              asset={image}
              alt={`Image ${index + 1} of ${slides.length}`}
              sizes="(max-width: 40rem) 100vw, (max-width: 64rem) 50vw, 33vw"
            />
          </button>
        ))}
      </div>
    </>
  );
}