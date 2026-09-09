'use client'
import SliderGallery from '../SliderGallery/SliderGallery';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { Asset } from 'contentful';

import './style.css';

type ModalContextType = {
  closeModal: () => void;
  isModalOpen: boolean;
  openModal: ( idx: number, slides: Array<Asset> | [] ) => void;
  setSlides: ( slides: Array<Asset> ) => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalContextProvider = ( { children }: { children: React.ReactNode } ) => {
  const [slides, setSlides] = useState<Array<Asset>>([]);
  const [startIndex, setStartIndex] = useState<number >( 0 );
  const [isModalOpen, setIsModalOpen] = useState( false );



  const openModal = ( idx: number, slides: Array<Asset> ) => {
    if ( slides.length > 0 ) {
      setSlides(slides);
      setStartIndex(idx);
      setIsModalOpen( true );
    } 
  }
  const closeModal = () => {
    setIsModalOpen( false );
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, isModalOpen, setSlides }}
    >
      {children}
      {isModalOpen && (
        <div
          id="fullscreenModal"
          className={`fullscreen-modal ${isModalOpen ? 'isActive' : ''}`}
        >
          <button
            className="close-modal"
            onClick={() => {
              closeModal();
            }}
          >
            &times;
          </button>
          <SliderGallery
            slides={slides}
            startIndex={startIndex}             
          />
        </div>
      )}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within ModalProvider');
  return ctx;
};


