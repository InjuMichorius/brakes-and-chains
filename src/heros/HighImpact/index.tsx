'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useRef, useState } from 'react'

import type { Page, Media as MediaType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

const isPopulatedMedia = (media: unknown): media is MediaType => {
  return typeof media === 'object' && media !== null && 'url' in media
}

type HighImpactHeroProps = Page['hero'] & {
  youtubeUrl?: string | null
}

export const HighImpactHero: React.FC<HighImpactHeroProps> = ({
  links,
  media,
  richText,
  youtubeUrl,
  heroTitle,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  const heroRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const [isPlaying, setIsPlaying] = useState(true)
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

  const toggleVideo = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }

    setIsPlaying(!isPlaying)
  }

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
      <div className="container mb-8 z-10 relative flex flex-col items-start">
        <div className="max-w-[32rem]">
          {heroTitle && (
            <h1 className="mb-6 text-4xl md:text-5xl font-bold leading-tight">{heroTitle}</h1>
          )}

          {richText && <RichText className="mb-16" data={richText} enableGutter={false} />}

          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-start gap-4">
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              ))}
            </ul>
          )}
        </div>
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

      {/* Controls */}
      {isVideo && (
        <div className="absolute bottom-6 right-6 z-10 flex gap-3">
          <button
            onClick={toggleVideo}
            className="hidden md:inline-flex items-center rounded-full bg-black/60 px-4 py-2 text-sm text-white hover:bg-black/80 transition"
          >
            {isPlaying ? 'Pauzeer video' : 'Speel video af'}
          </button>

          {youtubeUrl && (
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="md:hidden inline-flex items-center rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
            >
              Bekijk op YouTube
            </a>
          )}
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
    </div>
  )
}
