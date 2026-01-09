'use client'

import { cn } from '@/utilities/ui'
import React, { useRef } from 'react'
import RichText from '@/components/RichText'
import { FlagTriangleRight, Flag, Scroll } from 'lucide-react'
import { ScrollParagraphAnimation } from '@/components/ScrollParagraphAnimation'
import type { TimelineBlock as TimelineBlockProps } from '@/payload-types'
import { ImageSlider } from './components/ImageSlider'
import { motion, useScroll, useSpring, useInView } from 'framer-motion'

type Props = TimelineBlockProps & {
  className?: string
}

export const TimelineBlock: React.FC<Props> = ({ items, className }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  // Create a scroll progress animation for the vertical line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%'],
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div ref={containerRef} className={cn('py-12 bg-white overflow-hidden', className)}>
      <div className="container">
        <div className="relative max-w-[1000px] mx-auto py-10">
          <ul className="m-0 p-0 list-none relative">
            {/* Background Line (Static Gray) */}
            <div className="absolute left-[8px] md:left-[160px] top-0 w-[2px] h-full bg-gray-100" />

            {/* Animated Progress Line */}
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="absolute left-[8px] md:left-[160px] top-0 w-[2px] h-full bg-orange-500 z-0"
            />

            {items?.map((item, i) => (
              <TimelineItem key={i} item={item} isLast={i === (items?.length ?? 0) - 1} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

const TimelineItem = ({
  item,
  isLast,
}: {
  item: NonNullable<NonNullable<TimelineBlockProps['items']>[number]>
  isLast: boolean
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`${isLast ? '' : 'pb-12 md:pb-16'} relative w-full pl-[35px] md:pl-0 flex flex-col md:flex-row items-start`}
    >
      {/* Icon Replacement for Dots */}
      <div
        className={cn(
          'absolute z-10 bg-white flex items-center justify-center border p-2 rounded-full transition-colors duration-500',
          'top-[-4px] left-[-7px] md:left-[140px]',
          isInView ? 'border-orange-500' : 'border-gray-300',
        )}
      >
        <FlagTriangleRight
          className={cn(
            'h-4 w-4 transition-colors duration-500',
            isInView ? 'text-orange-500 fill-orange-500' : 'text-gray-300 fill-transparent',
          )}
          strokeWidth={2.5}
        />
      </div>

      {isLast && (
        <div
          className={cn(
            'absolute z-10 bg-white flex items-center justify-center border p-2 rounded-full',
            'bottom-[0] left-[-7px] md:left-[140px]',
            isInView ? 'border-orange-500' : 'border-gray-300',
          )}
        >
          <Flag className="h-4 w-4 text-orange-500 fill-orange-500" strokeWidth={2.5} />
        </div>
      )}

      {/* Date Bubble */}
      <div className={cn('md:w-[140px] md:text-right md:pr-8 shrink-0', 'mb-2 md:mb-0')}>
        <motion.div
          initial={{ scale: 0.8 }}
          animate={isInView ? { scale: 1 } : {}}
          className="inline-block px-4 py-1 bg-orange-500 text-white text-sm font-semibold rounded-full whitespace-nowrap"
        >
          {item.dateLabel}
        </motion.div>
      </div>

      {/* Content */}
      <div className="md:pl-12 flex-grow w-full">
        <h3 className="text-xl font-bold m-0 leading-tight">{item.title}</h3>

        <div className="mt-2 text-gray-700">
          <ScrollParagraphAnimation
            text={typeof item.content === 'string' ? item.content : ''}
            className="text-lg leading-relaxed font-medium"
          />
        </div>

        {item.images && item.images.length > 0 && (
          <div className="mt-4">
            <ImageSlider images={item.images} />
          </div>
        )}
      </div>
    </motion.li>
  )
}
