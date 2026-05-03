'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { Media } from '../../../../payload-types';

interface BlogCarouselProps {
  images: Media[];
  autoScroll?: boolean;
  autoScrollInterval?: number; // in milliseconds
}

export default function BlogCarousel({
  images,
  autoScroll = true,
  autoScrollInterval = 4000
}: BlogCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoScroll);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const validImages = images?.filter(image => image && image.url) || [];

  const startAutoScroll = useCallback(() => {
    // Clear any existing interval first
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (autoScroll && isPlaying && validImages.length > 1 && !isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % validImages.length);
      }, autoScrollInterval);
    }
  }, [autoScroll, isPlaying, validImages.length, isHovered, autoScrollInterval]);

  const stopAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    if (autoScroll && isPlaying && validImages.length > 1 && !isHovered) {
      startAutoScroll();
    } else {
      stopAutoScroll();
    }

    return () => stopAutoScroll();
  }, [startAutoScroll, stopAutoScroll]);

  if (validImages.length === 0) {
    return null;
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % validImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
    // Reset auto-scroll when manually changing images
    if (autoScroll && isPlaying && validImages.length > 1 && !isHovered) {
      startAutoScroll();
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Pause auto-scroll on hover
  const handleMouseEnter = () => {
    setIsHovered(true);
    stopAutoScroll();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (autoScroll && isPlaying && validImages.length > 1) {
      startAutoScroll();
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main image display */}
      <div className="relative aspect-[508/600] mb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            <Image
              src={validImages[currentIndex].url!}
              alt={validImages[currentIndex].alt || `Gallery image ${currentIndex + 1}`}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        {validImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
              aria-label="Next image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Play/Pause button */}
            {autoScroll && (
              <button
                onClick={togglePlayPause}
                className="absolute left-2 bottom-2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              >
                {isPlaying ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>
            )}
          </>
        )}

        {/* Auto-scroll progress indicator */}
        {autoScroll && isPlaying && validImages.length > 1 && !isHovered && (
          <div className="absolute bottom-4 left-16 right-4">
            <div className="bg-white/20 rounded-full h-1 overflow-hidden">
              <motion.div
                key={currentIndex}
                className="bg-gray-400 h-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{
                  duration: autoScrollInterval / 1000,
                  ease: 'linear',
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Thumbnail row */}
      {validImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {validImages.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => goToImage(index)}
              className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === currentIndex
                  ? 'border-gray-100 shadow-lg shadow-white/15'
                  : 'border-white/20 hover:border-white/40'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src={image.url!}
                alt={image.alt || `Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
              {index === currentIndex && (
                <div className="absolute inset-0 bg-white/10" />
              )}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
