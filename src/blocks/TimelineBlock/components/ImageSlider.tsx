'use client'
import React, { useState, TouchEvent } from 'react'
import type { TimelineBlock } from '@/payload-types'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export const ImageSlider = ({
  images,
}: {
  images: NonNullable<NonNullable<TimelineBlock['items']>[number]['images']>
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  if (!images || images.length === 0) return null

  // Threshold for swipe detection (in pixels)
  const minSwipeDistance = 50

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  // Swipe Logic
  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) nextSlide()
    if (isRightSwipe) prevSlide()
  }

  return (
    <div
      className="relative group w-full aspect-video mt-4 overflow-hidden rounded-2xl md:rounded-3xl bg-gray-100 touch-pan-y"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Images */}
      <Image
        src={
          typeof images[currentIndex].image === 'string'
            ? images[currentIndex].image
            : images[currentIndex].image?.url || ''
        }
        alt={
          typeof images[currentIndex].image === 'string'
            ? 'Timeline image'
            : images[currentIndex].image?.alt || 'Timeline image'
        }
        fill
        className="object-cover transition-opacity duration-300"
        draggable={false}
      />

      {/* Navigation Controls */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation()
              prevSlide()
            }}
            className={cn(
              'absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full transition-opacity hover:bg-white z-20',
              'opacity-100 md:opacity-0 md:group-hover:opacity-100', // Always visible on mobile, hover on desktop
            )}
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              nextSlide()
            }}
            className={cn(
              'absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full transition-opacity hover:bg-white z-20',
              'opacity-100 md:opacity-0 md:group-hover:opacity-100', // Always visible on mobile, hover on desktop
            )}
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {images.map((_, i) => (
              <div
                key={i}
                className={cn(
                  'h-1.5 w-1.5 rounded-full transition-all',
                  i === currentIndex ? 'bg-orange-500 w-3' : 'bg-white/70',
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
