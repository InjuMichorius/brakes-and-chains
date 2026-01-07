'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import Link from 'next/link'

interface CircleCtaButtonProps {
  href: string
  text?: string
}

export const CircleCta: React.FC<CircleCtaButtonProps> = ({
  href,
  text = 'Bekijk video • ', // Make sure there is a space after the dot/bullet
}) => {
  const circumference = 251.32

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex items-center justify-center w-[6rem] h-[6rem] md:w-[8rem] md:h-[8rem] group shrink-0"
    >
      <motion.div
        // Initial animation (Rotation)
        animate={{ rotate: 360 }}
        // Hover animation (Scale)
        whileHover={{ scale: 1.1 }}
        transition={{
          rotate: {
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          },
          scale: {
            type: 'spring',
            stiffness: 300,
            damping: 20,
          },
        }}
        // Setting the origin to center
        style={{ originX: '50%', originY: '50%' }}
        className="absolute inset-0 w-full h-full text-white cursor-pointer"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          <defs>
            <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
          </defs>
          <text
            fill="currentColor"
            xmlSpace="preserve"
            className="text-[8.5px] font-bold uppercase"
            style={{ letterSpacing: '2px' }}
          >
            <textPath xlinkHref="#circlePath" textLength={circumference}>
              {`${text} `.repeat(3)}
            </textPath>
          </text>
        </svg>
      </motion.div>

      <div className="relative flex items-center justify-center w-10 h-10 md:w-14 md:h-14 bg-white text-black rounded-full transition-all duration-300 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white">
        <Play size={20} fill="currentColor" className="ml-1" />
      </div>
    </Link>
  )
}
