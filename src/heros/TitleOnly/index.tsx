'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

import type { Page, Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'

const isPopulatedMedia = (media: unknown): media is MediaType => {
  return typeof media === 'object' && media !== null && 'url' in media
}

type TitleOnlyHeroProps = Page['hero'] & {
  youtubeUrl?: string | null
}

export const TitleOnlyHero: React.FC<TitleOnlyHeroProps> = ({ media, youtubeUrl, heroTitle }) => {
  const { setHeaderTheme } = useHeaderTheme()

  const heroRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isShrunk, setIsShrunk] = useState(false)

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])

  useEffect(() => {
    if (!heroRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const top = entry.boundingClientRect.top
        setIsShrunk(top < -100)
      },
      {
        threshold: Array.from({ length: 50 }, (_, i) => i / 50),
      },
    )

    observer.observe(heroRef.current)

    return () => observer.disconnect()
  }, [])

  if (!isPopulatedMedia(media)) return null

  const isVideo = media.mimeType?.startsWith('video/')
  const mediaUrl = media.url ?? undefined

  return (
    <div
      ref={heroRef}
      className={`
        relative -mt-[10.4rem] flex items-center justify-center text-white pt-8
        min-h-[90vh] md:min-h-[80vh] overflow-hidden
        transition-[margin,border-radius,transform] duration-700 ease-in-out
        ${
          isShrunk
            ? 'mx-[1rem] md:mx-[2rem] md:mx-[3rem] rounded-xl sm:rounded-2xl md:rounded-3xl translate-y-[-10px]'
            : 'mx-0 rounded-none translate-y-0'
        }
                              `}
      data-theme="dark"
    >
      {/* Content */}
      <div className="z-10 absolute bottom-0 left-0 w-full">
        <motion.div
          className="flex gap-10 flex-row-reverse flex-wrap justify-end container mx-auto py-8 md:py-16"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
          }}
        >
          {youtubeUrl && (
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
            >
              Bekijk op YouTube
            </a>
          )}

          <div className="max-w-[21rem] sm:max-w-[26rem] md:max-w-[40rem] xl:max-w-[55rem]">
            {heroTitle && (
              <h1 className="text-[1.6rem] sm:text-[2rem] md:text-[3rem] xl:text-[4rem] font-bold leading-tight uppercase">
                {heroTitle}
              </h1>
            )}
          </div>
        </motion.div>
      </div>

      {/* Background Media */}
      {mediaUrl &&
        (isVideo ? (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src={mediaUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <Media fill priority imgClassName="absolute inset-0 object-cover" resource={media} />
        ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
    </div>
  )
}
