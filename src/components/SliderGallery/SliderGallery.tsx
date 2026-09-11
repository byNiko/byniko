'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, Pagination, Controller } from 'swiper/modules';
import ContentfulImage from '../ContentfulImage';
import { useRef } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Asset } from 'contentful';

type Props = {
  slides: Array<Asset>;
  startIndex?: number;
  slidesPerView?: number;
  pagination?: boolean;
  isFullscreen?: boolean;
  className?: string;
};

export default function SliderGallery({
  slides,
  startIndex = 0,
  slidesPerView = 1,
  pagination = false,
  isFullscreen = false,
}: Props) {
  const mainSwiperRef = useRef<SwiperCore | null>(null);
  const modalSwiperRef = useRef<SwiperCore | null>(null);
  return (
    <>
      <Swiper
        className={isFullscreen ? 'swiper-container-fullscreen' : ''}
        modules={[Navigation, Pagination, Controller]}
        navigation
        pagination={pagination}
        spaceBetween={30}
        slidesPerView={slidesPerView}
        initialSlide={startIndex}
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
            <SwiperSlide key={index} className="swiper-slide">
              <div>
                {/* A lightbox slide is the whole viewport; without this it
                    inherited ContentfulImage's 33vw default and requested a
                    variant sized for a grid tile. */}
                <ContentfulImage asset={slide} sizes="100vw" />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
