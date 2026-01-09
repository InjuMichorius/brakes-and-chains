'use client'
import React from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import { Check } from 'lucide-react'
import { motion, easeInOut } from 'framer-motion'
import { ScrollParagraphAnimation } from '../../components/ScrollParagraphAnimation'

interface Feature {
  id?: string | number
  text: string
}

interface Button {
  id?: string
  label: string
  url: string
  variant?: 'primary' | 'secondary'
}

interface ImageTextBlockProps {
  blockId?: string
  image?: { url: string } | string
  title?: string
  description?: string
  features?: Feature[]
  buttons?: Button[]
  reverseLayout?: boolean
  className?: string
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeInOut },
  },
}

export const ImageTextBlock: React.FC<ImageTextBlockProps> = ({
  blockId,
  image,
  title,
  description,
  features,
  buttons,
  reverseLayout,
  className,
}) => {
  const imageUrl = typeof image === 'string' ? image : image?.url

  return (
    <section
      id={blockId || undefined}
      className={cn('container mx-auto scroll-mt-20 py-10 md:py-20', className)}
    >
      {/* Added items-center to prevent children stretching vertically */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
        {/* TEXT CONTENT */}
        <div className={cn('flex flex-col max-w-xl', reverseLayout ? 'lg:order-2' : 'lg:order-1')}>
          {title && (
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeInUp}
              className="text-4xl lg:text-5xl font-bold leading-16 mb-4"
            >
              {title}
            </motion.h2>
          )}

          {description && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeInUp}
            >
              <ScrollParagraphAnimation
                text={description}
                className="text-lg leading-relaxed font-medium"
              />
            </motion.div>
          )}

          {features && features.length > 0 && (
            <ul className="flex flex-col gap-3 py-4">
              {features.map((feature, idx) => (
                <motion.li
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-20px' }}
                  // Custom variant to handle the staggering
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: idx * 0.15, // Staggers each checkmark
                        duration: 0.5,
                        ease: easeInOut,
                      },
                    },
                  }}
                  className="flex items-center gap-3 text-gray-700"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                    <Check size={16} />
                  </span>
                  {feature.text}
                </motion.li>
              ))}
            </ul>
          )}

          {buttons && buttons.length > 0 && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeInUp}
              className="flex gap-4 pt-4"
            >
              {buttons.map((btn) => (
                <a
                  key={btn.label}
                  href={btn.url}
                  className={cn(
                    'inline-flex items-center justify-center rounded-full px-6 py-3 font-medium transition font-bold',
                    btn.variant === 'secondary'
                      ? 'border border-gray-300 text-gray-800 hover:bg-gray-100'
                      : 'bg-black text-white hover:bg-gray-800',
                  )}
                >
                  {btn.label}
                </a>
              ))}
            </motion.div>
          )}
        </div>

        {/* IMAGE CONTENT */}
        {imageUrl && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
            className={cn(
              // Added overflow-hidden and rounded corners
              'relative w-full h-[420px] lg:h-[520px] overflow-hidden rounded-2xl md:rounded-3xl',
              reverseLayout ? 'lg:order-1' : 'lg:order-2',
            )}
          >
            <Image
              src={imageUrl}
              alt={title || ''}
              fill
              // Using object-cover to ensure the image fills the rounded container
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </motion.div>
        )}
      </div>
    </section>
  )
}
