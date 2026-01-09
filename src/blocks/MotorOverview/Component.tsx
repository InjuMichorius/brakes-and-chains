'use client'

import { cn } from '@/utilities/ui'
import { motion, easeInOut } from 'framer-motion'
import { ScrollParagraphAnimation } from '@/components/ScrollParagraphAnimation'
import { MotorCard } from './components/MotorCard'

type Motor = {
  id: string
  naam: string
  prijs: number
  bouwjaar: number
  kilometerstand: string
  vermogen: string
  specstekst?: string
  bodytekst?: string
  url_marktplaats?: string
  afbeelding?: {
    url: string
    alt?: string
  }
}

interface Props {
  blockId?: string
  titel: string
  tekst?: string
  motoren: Motor[]
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const MotorOverview: React.FC<Props> = ({ blockId, titel, tekst, motoren, className }) => {
  if (!motoren?.length) return null

  return (
    <section id={blockId} className={cn('bg-beige py-20 scroll-mt-20', className)}>
      <div className="mb-12 container">
        {titel && (
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeInUp}
            className="text-4xl lg:text-5xl font-bold mb-4 leading-16"
          >
            {titel}
          </motion.h2>
        )}

        {tekst && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeInUp}
          >
            <ScrollParagraphAnimation
              text={tekst}
              className="text-lg leading-relaxed font-medium max-w-3xl"
            />
          </motion.div>
        )}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto"
      >
        {motoren.map((motor) => (
          <MotorCard key={motor.id} motor={motor} />
        ))}
      </motion.div>
    </section>
  )
}
