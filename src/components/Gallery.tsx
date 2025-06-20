'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import ContentfulImage from './ContentfulImage';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Asset } from 'contentful';

export default function Gallery({ slides }: { slides: Asset[] }) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={30}
      slidesPerView={4}
    >
      {slides
        ?.filter((slide) => !!slide.fields.file)
        .map((slide, index) => (
          <SwiperSlide key={index}>
            <div>
              <ContentfulImage asset={slide} />
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
