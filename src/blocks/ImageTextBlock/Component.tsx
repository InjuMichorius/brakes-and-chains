import React from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import type { DefaultTypedEditorState } from 'payload/components/richText/types'

type Media = {
  id: string
  url: string
  alt?: string
  [key: string]: unknown
}

export type ImageTextBlockProps = {
  image?: string | Media | null
  title?: string | null
  description?: string | null | DefaultTypedEditorState
  buttons?: { label: string; url: string; id?: string | null }[] | null
  className?: string
}

export const ImageTextBlock: React.FC<ImageTextBlockProps> = ({
  className,
  image,
  title,
  description,
  buttons,
}) => {
  const imageUrl = typeof image === 'string' ? image : image?.url

  if (!imageUrl && !title && !description) return null

  const richTextData: DefaultTypedEditorState | undefined =
    typeof description === 'string'
      ? { type: 'root', children: [{ text: description }] }
      : description || undefined

  return (
    <div className={cn('mx-auto my-8 w-full', className)}>
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {imageUrl && (
          <div className="w-full md:w-1/2 relative h-64 md:h-80">
            <Image
              src={imageUrl}
              alt={title || ''}
              fill
              className="rounded-lg object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        )}

        <div className="w-full md:w-1/2 flex flex-col justify-center gap-4">
          {title && <h2 className="text-2xl font-semibold">{title}</h2>}
          {richTextData && <RichText data={richTextData} enableGutter={false} enableProse={true} />}
          {buttons?.length ? (
            <div className="flex flex-wrap gap-2 mt-2">
              {buttons.map((btn: { label: string; url: string; id?: string | null }) => (
                <a
                  key={btn.id || btn.label}
                  href={btn.url}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  {btn.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default ImageTextBlock
