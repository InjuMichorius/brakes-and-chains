'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page, Media as MediaType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

const isPopulatedMedia = (media: unknown): media is MediaType => {
  return typeof media === 'object' && media !== null && 'url' in media
}

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])

  if (!isPopulatedMedia(media)) {
    return null
  }

  const isVideo = media.mimeType?.startsWith('video/')
  const mediaUrl = media.url ?? undefined

  return (
    <div
      className="relative -mt-[10.4rem] flex items-center justify-center text-white pt-8 min-h-[90vh] md:min-h-[80vh]"
      data-theme="dark"
    >
      {/* Content */}
      <div className="container mb-8 z-10 relative flex items-center justify-start">
        <div className="max-w-[32rem]">
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
