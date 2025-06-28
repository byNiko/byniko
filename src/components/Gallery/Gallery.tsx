'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import  SwiperCore from 'swiper';
import { Navigation, Pagination, Controller } from 'swiper/modules';
import ContentfulImage from '../ContentfulImage';
import { useState, useEffect, useRef } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Asset } from 'contentful';
import './style.css';

export default function Gallery( { slides }: { slides: Asset[] } ) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startIndex, setStartIndex] = useState( 0 );
  
  // const fullscreenSwiperRef = useRef<SwiperCore | null>(null);
  const mainSwiperRef = useRef<SwiperCore | null>(null);
  const modalSwiperRef = useRef<SwiperCore | null>(null);

  const openModal = (idx = 0) => {
    setIsModalOpen(true);
    setStartIndex(idx);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Effect to handle keyboard escape key for closing
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]); // Re-run effect if isFullscreenOpen changes


  return (
    <>
      <Swiper
        className="swiper-container"
        modules={[Navigation, Pagination, Controller]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={2}
        breakpoints={
          {
            640: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            }
          }
        }
        onSwiper={(swiper) => {
          mainSwiperRef.current = swiper;
          if (modalSwiperRef.current) {
            mainSwiperRef.current.controller.control = modalSwiperRef.current;
          }
        }}
      >
        {slides
          ?.filter((slide) => !!slide.fields.file)
          .map((slide, index) => (
            <SwiperSlide
              className="cursor-pointer"
              key={index}
              onClick={() => openModal(index)}
            >
              <div>
                <ContentfulImage asset={slide} />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
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
        {isModalOpen && (
          <Swiper
            className="swiper-container-fullscreen"
            modules={[Navigation, Pagination, Controller]}
            navigation
            pagination={false}
            spaceBetween={30}
            slidesPerView={1}
            initialSlide={startIndex}
            onClick={() => {
              closeModal();
            }}
            onSwiper={(swiper) => {
              modalSwiperRef.current = swiper;
              if (mainSwiperRef.current) {
                modalSwiperRef.current.controller.control = mainSwiperRef.current;
              }
            }}
          >
            {slides
              ?.filter((slide) => !!slide.fields.file)
              .map((slide, index) => (
                <SwiperSlide key={index} className="fullscreen-swiper-slide">
                  <div>
                    <ContentfulImage asset={slide} />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </div>
    </>
  );
}
