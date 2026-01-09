'use client'

import Image from 'next/image'
import { Calendar, Gauge, Bike } from 'lucide-react'
import { motion } from 'framer-motion'

interface Motor {
  id: string
  naam: string
  prijs: number
  bouwjaar: number
  kilometerstand: string
  vermogen: string
  afbeelding?: {
    url: string
    alt?: string
  }
}

interface MotorCardProps {
  motor: Motor
}

// 1. Card entrance variants (controlled by parent stagger)
const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number], // Custom cubic-bezier for a premium feel
    },
  },
}

// 2. Variants for the 3 small info chips
const chipVariants = {
  hidden: { scale: 0.8, opacity: 0, y: 10 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 200, damping: 15 },
  },
}

export const MotorCard: React.FC<MotorCardProps> = ({ motor }) => {
  return (
    <motion.a
      href="#"
      variants={cardVariants}
      whileHover={{ y: -8 }}
      className="group relative block w-full max-w-md overflow-hidden rounded-[1.8rem] bg-black p-3 transition-shadow hover:shadow-2xl hover:shadow-white/10"
    >
      {/* Main Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1rem]">
        {motor.afbeelding?.url ? (
          <Image
            src={motor.afbeelding.url}
            alt={motor.afbeelding.alt || motor.naam}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full bg-neutral-800" />
        )}

        {/* Title Animation: Reveal from bottom within the image */}
        <div className="absolute bottom-6 left-6 right-6 overflow-hidden">
          <motion.h2
            variants={{
              hidden: { y: 50, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.5 } },
            }}
            className="text-2xl font-extrabold text-white drop-shadow-md"
          >
            {motor.naam}
          </motion.h2>
        </div>
      </div>

      {/* Specs Grid: Inherits visibility from the card */}
      <motion.div
        className="mt-3 grid grid-cols-3 gap-3"
        variants={{
          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
        }}
      >
        <motion.div
          variants={chipVariants}
          className="flex flex-col items-center justify-center rounded-[1rem] bg-white/10 py-4 text-white"
        >
          <Calendar className="mb-2 h-6 w-6 text-orange-400" strokeWidth={2.5} />
          <span className="text-sm font-bold leading-tight">{motor.bouwjaar}</span>
        </motion.div>

        <motion.div
          variants={chipVariants}
          className="flex flex-col items-center justify-center rounded-[1rem] bg-white/10 py-4 text-white"
        >
          <Bike className="mb-2 h-6 w-6 text-orange-400" strokeWidth={2.5} />
          <span className="text-sm font-bold leading-tight">{motor.kilometerstand}km</span>
        </motion.div>

        <motion.div
          variants={chipVariants}
          className="flex flex-col items-center justify-center rounded-[1rem] bg-white/10 py-4 text-white px-2 text-center"
        >
          <Gauge className="mb-2 h-6 w-6 text-orange-400" strokeWidth={2.5} />
          <span className="text-sm font-bold leading-tight">{motor.vermogen}</span>
        </motion.div>
      </motion.div>

      {/* Price Overlay */}
      <motion.div
        variants={{
          hidden: { opacity: 0, scale: 0.5 },
          visible: { opacity: 1, scale: 1, transition: { delay: 0.5 } },
        }}
        className="absolute top-6 right-8 rounded-full bg-white/10 px-4 py-1 backdrop-blur-md border border-white/10"
      >
        <p className="font-bold text-white text-sm">€ {motor.prijs.toLocaleString('nl-NL')}</p>
      </motion.div>
    </motion.a>
  )
}
