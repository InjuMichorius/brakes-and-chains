'use client'
import React, { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { cn } from '@/utilities/ui'

interface ScrollParagraphAnimationProps {
  text: string
  className?: string
}

export const ScrollParagraphAnimation = ({ text, className }: ScrollParagraphAnimationProps) => {
  const element = useRef<HTMLParagraphElement>(null)

  const { scrollYProgress } = useScroll({
    target: element,
    offset: ['start 0.9', 'start 0.5'], // Adjusted offsets for better timing
  })

  const words = text.split(' ')

  return (
    <p ref={element} className={cn('flex flex-wrap', className)}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        )
      })}
    </p>
  )
}

interface WordProps {
  children: string
  progress: MotionValue<number>
  range: [number, number]
}

const Word = ({ children, progress, range }: WordProps) => {
  const opacity = useTransform(progress, range, [0.3, 1])

  return (
    <span className="relative mr-1.5 mt-1">
      <motion.span style={{ opacity }} className="text-black">
        {children}
      </motion.span>
    </span>
  )
}
