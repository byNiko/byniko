'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type SwiperCore from 'swiper';
import { Thumbs, FreeMode, Keyboard, A11y } from 'swiper/modules';
import { Asset } from 'contentful';

import ContentfulImage from '../ContentfulImage';
import { useModalContext } from '../ModalContext/ModalContext';

import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import './style.css';

type Props = {
  title: string;
  /** Full set, with mainImage at index 0. */
  slides: Array<Asset>;
};

/**
 * The stage and its thumbnail strip, linked by Swiper's own Thumbs module.
 *
 * A hand-rolled version of this used scroll-snap plus an observer, and it had
 * the bug that pattern always has: with `scroll-snap-align: start` the strip
 * cannot scroll far enough to bring the last thumbnails to the leading edge,
 * so the final three images were unreachable. Swiper positions the strip from
 * the active index instead of relying on scroll position, and brings keyboard
 * control and correct ARIA with it. It was already a dependency for the
 * lightbox, so the stage costs three modules rather than a library.
 */
export default function CaseArtifact({ title, slides }: Props) {
  const { openModal } = useModalContext();
  const [thumbs, setThumbs] = useState<SwiperCore | null>(null);
  const [index, setIndex] = useState(0);

  if (slides.length === 0) return null;

  // One image is a frame, not a gallery: no strip, no counter, no swipe.
  const single = slides.length === 1;

  return (
    <div className="artifact">
      <Swiper
        className="artifact-stage"
        modules={single ? [A11y] : [Thumbs, Keyboard, A11y]}
        thumbs={single ? undefined : { swiper: thumbs }}
        keyboard={single ? false : { enabled: true }}
        allowTouchMove={!single}
        spaceBetween={12}
        slidesPerView={1}
        onSlideChange={(s) => setIndex(s.activeIndex)}
        a11y={{
          containerMessage: `${title} — project images`,
          prevSlideMessage: 'Previous image',
          nextSlideMessage: 'Next image',
        }}
      >
        {slides.map((asset, i) => (
          <SwiperSlide key={asset.sys?.id ?? i}>
            <button
              type="button"
              className="hero-frame"
              aria-label={`${title} — view image ${i + 1} of ${slides.length} full size`}
              /* Focus the trigger before opening. Swiper preventDefaults
                 mousedown to drive dragging, which suppresses the focus a
                 click would normally move to the button — so the lightbox
                 captured `body` as its opener and returned focus to nowhere
                 on Escape. Measured: click-then-Escape landed on BODY. */
              onClick={(e) => {
                e.currentTarget.focus();
                openModal(i, slides);
              }}
            >
              <ContentfulImage
                priority={i === 0}
                asset={asset}
                alt={i === 0 ? title : ''}
                sizes="(max-width: 72rem) 100vw, 30rem"
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      {!single && (
        <>
          <Swiper
            className="artifact-strip"
            modules={[FreeMode, Thumbs, A11y]}
            onSwiper={setThumbs}
            spaceBetween={8}
            slidesPerView={4}
            freeMode
            watchSlidesProgress
            a11y={{ containerMessage: 'Choose an image' }}
          >
            {slides.map((asset, i) => (
              <SwiperSlide key={asset.sys?.id ?? i}>
                <span className="artifact-thumb">
                  <ContentfulImage asset={asset} alt="" sizes="8rem" />
                </span>
              </SwiperSlide>
            ))}
          </Swiper>

          <p className="artifact-foot t-label text-ink-faint">
            <span>Swipe or choose a frame</span>
            {/* aria-live so a screen reader hears the stage change, which is
                otherwise silent — the slide is swapped, not navigated to. */}
            <span aria-live="polite" aria-atomic="true">
              {index + 1} / {slides.length}
            </span>
          </p>
        </>
      )}
    </div>
  );
}
