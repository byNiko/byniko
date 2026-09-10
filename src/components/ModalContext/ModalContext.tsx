'use client';
import SliderGallery from '../SliderGallery/SliderGallery';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Asset } from 'contentful';

import './style.css';

type ModalContextType = {
  closeModal: () => void;
  isModalOpen: boolean;
  openModal: (idx: number, slides: Array<Asset> | []) => void;
  setSlides: (slides: Array<Asset>) => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

/** Matches the exit duration in style.css. */
const EXIT_MS = 200;

export const ModalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [slides, setSlides] = useState<Array<Asset>>([]);
  const [startIndex, setStartIndex] = useState<number>(0);

  /**
   * Two states, not one. `isMounted` controls whether the node exists;
   * `isActive` controls whether it is visually open. Previously both were the
   * same boolean, so the element mounted already carrying its open class —
   * leaving the CSS transition no starting frame to run from, and unmounting
   * instantly on close. The declared transition never played in either
   * direction, which is what made it feel abrupt.
   */
  const [isMounted, setIsMounted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const returnFocusTo = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const openModal = useCallback((idx: number, next: Array<Asset>) => {
    if (!next.length) return;
    if (exitTimer.current) clearTimeout(exitTimer.current);

    returnFocusTo.current = document.activeElement as HTMLElement | null;
    setSlides(next);
    setStartIndex(idx);
    setIsMounted(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsActive(false);
    if (exitTimer.current) clearTimeout(exitTimer.current);
    exitTimer.current = setTimeout(() => {
      setIsMounted(false);
      returnFocusTo.current?.focus();
    }, EXIT_MS);
  }, []);

  /**
   * Commit the closed state before opening, so the transition has something
   * to interpolate from. Reading layout forces that flush synchronously.
   *
   * Deliberately not requestAnimationFrame: rAF does not fire in a hidden or
   * backgrounded tab, which would mount the overlay invisible — and with the
   * page's scroll already locked behind it.
   */
  useEffect(() => {
    if (!isMounted) return;
    void modalRef.current?.getBoundingClientRect();
    setIsActive(true);
  }, [isMounted]);

  // The overlay covers the page; the page beneath it must not scroll.
  useEffect(() => {
    if (!isMounted) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMounted, closeModal]);

  useEffect(
    () => () => {
      if (exitTimer.current) clearTimeout(exitTimer.current);
    },
    [],
  );

  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, isModalOpen: isMounted, setSlides }}
    >
      {children}
      {isMounted && (
        <div
          ref={modalRef}
          id="fullscreenModal"
          role="dialog"
          aria-modal="true"
          aria-label="Project image gallery"
          className={`fullscreen-modal ${isActive ? 'isActive' : ''}`}
        >
          <button
            type="button"
            className="close-modal"
            aria-label="Close gallery"
            autoFocus
            onClick={closeModal}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 4l12 12M16 4L4 16"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>
          <SliderGallery slides={slides} startIndex={startIndex} />
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
