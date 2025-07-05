"use client";

import {useMemo, useState, useRef, useCallback} from "react";
import type {Slide} from "yet-another-react-lightbox";

import {ThumbnailImage} from "@/components/image/animated-image-loading/thumbnail-image";
import useLightbox from "@/components/image/useLightBox";
import {generateLBSlides} from "@/lib/image";

export namespace Carousel {
  export type Props = {
    imageCfgs: {
      src: string;
      imageURL: string;
      blurDataURL: string;
      ratio: number;
    }[];
    projectType?: string;
  };
}

export function Carousel(props: Carousel.Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50;
  const lightBoxSlides = useMemo(() => generateLBSlides(props.imageCfgs.map(image => image.src)), [props.imageCfgs]) as Slide[];
  const {openLightbox, renderLightbox} = useLightbox();

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % props.imageCfgs.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + props.imageCfgs.length) % props.imageCfgs.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const openImageLightbox = (index: number) => {
    setLightboxIndex(index);
    openLightbox();
  };

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && props.imageCfgs.length > 1) {
      nextSlide();
    } else if (isRightSwipe && props.imageCfgs.length > 1) {
      prevSlide();
    }
  }, [nextSlide, prevSlide, props.imageCfgs.length]);

  if (props.imageCfgs.length === 0) {
    return null;
  }

  return (
    <>
      <div className="relative w-full max-w-4xl mx-auto">
        {/* Main carousel container */}
        <div
          className="relative h-64 md:h-80 lg:h-96 bg-slate-100 rounded-lg overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Images */}
          <div
            className="flex transition-transform duration-300 ease-in-out h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {props.imageCfgs.map((imageCfg, index) => (
              <div
                key={imageCfg.src}
                className="w-full h-full flex-shrink-0 cursor-pointer"
                onClick={() => openImageLightbox(index)}
              >
                <ThumbnailImage
                  unoptimized={true}
                  src={imageCfg.imageURL}
                  blurDataURL={imageCfg.blurDataURL}
                  alt={`Carousel image ${index + 1}`}
                  className="w-full h-full"
                  imageClassName="w-full h-full object-contain"
                  loading="lazy"
                  width={900}
                  height={900 / imageCfg.ratio}
                />
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          {props.imageCfgs.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200 cursor-pointer"
                aria-label="Previous image"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200 cursor-pointer"
                aria-label="Next image"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Own project mark */}
          {props.projectType === "Own project" && (
            <div className="absolute top-0 left-0 bg-amber-500 text-white px-2 py-1 rounded text-sm font-medium shadow-lg z-10">
              Own project
            </div>
          )}

          {/* Image counter */}
          <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
            {currentIndex + 1} / {props.imageCfgs.length}
          </div>
        </div>

        {/* Dots indicator */}
        {props.imageCfgs.length > 1 && (
          <div className="flex justify-center space-x-2 mt-4">
            {props.imageCfgs.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 cursor-pointer ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {renderLightbox({slides: lightBoxSlides, index: lightboxIndex})}
    </>
  );
}
