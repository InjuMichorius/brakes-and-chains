'use client'

import { cn } from '@/utilities/ui'
import React, { useRef } from 'react'
import { FlagTriangleRight, Flag } from 'lucide-react'
import { ScrollParagraphAnimation } from '@/components/ScrollParagraphAnimation'
import type { TimelineBlock as TimelineBlockProps } from '@/payload-types'
import { ImageSlider } from './components/ImageSlider'
import { motion, useScroll, useSpring, useTransform, MotionValue } from 'framer-motion'

type Props = TimelineBlockProps & {
  className?: string
}

export const TimelineBlock: React.FC<Props> = ({ items, className }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%'],
  })

  // Use scrollYProgress directly for instant line growth
  const scaleY = scrollYProgress

  return (
    <div ref={containerRef} className={cn('py-12 bg-white overflow-hidden', className)}>
      <div className="container">
        <div className="relative max-w-[1000px] mx-auto py-10">
          <ul className="m-0 p-0 list-none relative">
            {/* Background Line */}
            <div className="absolute left-[8px] md:left-[160px] top-0 w-[2px] h-full bg-gray-100" />

            {/* Animated Progress Line */}
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="absolute left-[8px] md:left-[160px] top-0 w-[2px] h-full bg-orange-500 z-0"
              transition={{ duration: 0 }}
            />

            {items?.map((item, i) => (
              <TimelineItem
                key={i}
                item={item}
                index={i}
                total={items.length}
                progress={scrollYProgress} // Pass the raw progress to children
                isLast={i === (items?.length ?? 0) - 1}
              />
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
  index,
  total,
  progress,
}: {
  item: NonNullable<NonNullable<TimelineBlockProps['items']>[number]>
  isLast: boolean
  index: number
  total: number
  progress: MotionValue<number>
}) => {
  /**
   * 1. Calculate the trigger point.
   * Since the line grows from 0 to 1, we divide the progress into segments.
   * Adding a slight buffer (0.01) ensures the icon turns orange exactly
   * when the tip of the line reaches the center of the icon.
   */
  // Responsive offset for mobile/desktop to match the line visually hitting the flag
  const [offset, setOffset] = React.useState(-0.04)
  React.useEffect(() => {
    const updateOffset = () => {
      setOffset(window.innerWidth < 768 ? -0.13 : -0.04)
    }
    updateOffset()
    window.addEventListener('resize', updateOffset)
    return () => window.removeEventListener('resize', updateOffset)
  }, [])
  const startTrigger = index / total + offset

  // Instantly switch color when the line meets the flag (no transition, no opacity)
  const iconColor = useTransform(
    progress,
    [0, startTrigger, startTrigger + 0.0001, 1],
    ['#d1d5db', '#d1d5db', '#f97316', '#f97316'],
  )
  const borderColor = useTransform(
    progress,
    [0, startTrigger, startTrigger + 0.0001, 1],
    ['#e5e7eb', '#e5e7eb', '#f97316', '#f97316'],
  )
  const iconScale = 1

  return (
    <motion.li
      className={`${isLast ? '' : 'pb-12 md:pb-16'} relative w-full pl-[35px] md:pl-0 flex flex-col md:flex-row items-start`}
    >
      {/* Icon Wrapper */}
      <motion.div
        style={{
          borderColor,
          scale: iconScale,
          borderWidth: '2px',
        }}
        className={cn(
          'absolute z-10 bg-white flex items-center justify-center p-2 rounded-full transition-shadow duration-200',
          'top-[-4px] left-[-7px] md:left-[144px]',
        )}
      >
        <motion.div style={{ color: iconColor }}>
          <FlagTriangleRight className="h-4 w-4 fill-current" strokeWidth={2.5} />
        </motion.div>
      </motion.div>

      {isLast && (
        <motion.div
          style={{
            borderColor,
            scale: iconScale,
            borderWidth: '2px',
          }}
          className={cn(
            'absolute z-10 bg-white flex items-center justify-center border p-2 rounded-full',
            'bottom-[0] left-[-7px] md:left-[144px]',
          )}
        >
          <motion.div style={{ color: iconColor }}>
            <Flag className="h-4 w-4 fill-current" strokeWidth={2.5} />
          </motion.div>
        </motion.div>
      )}

      {/* Date Label */}
      <div className={cn('md:w-[140px] md:text-right md:pr-8 shrink-0', 'mb-2 md:mb-0')}>
        <div className="inline-block px-4 py-1 bg-orange-500 text-white text-sm font-semibold rounded-full whitespace-nowrap">
          {item.dateLabel}
        </div>
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
