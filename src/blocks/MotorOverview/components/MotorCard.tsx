'use client'

import Image from 'next/image'
import { Calendar, Gauge, MapPin } from 'lucide-react'

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

export const MotorCard: React.FC<MotorCardProps> = ({ motor }) => {
  return (
    <div className="group relative w-full max-w-md overflow-hidden rounded-[2.5rem] bg-[#1a1a1a] p-3 shadow-xl">
      {/* Main Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem]">
        {motor.afbeelding?.url ? (
          <Image
            src={motor.afbeelding.url}
            alt={motor.afbeelding.alt || motor.naam}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full bg-neutral-800" />
        )}

        {/* Title Overlay on Image */}
        <div className="absolute bottom-6 left-6 right-6">
          <h2 className="text-3xl font-extrabold text-white drop-shadow-md">{motor.naam}</h2>
        </div>
      </div>

      {/* Specs Grid */}
      <div className="mt-3 grid grid-cols-3 gap-3">
        {/* Year Card */}
        <div className="flex flex-col items-center justify-center rounded-[1.5rem] bg-[#8d8d8d] py-4 text-white">
          <Calendar className="mb-2 h-6 w-6" strokeWidth={2.5} />
          <span className="text-xl font-bold">{motor.bouwjaar}</span>
        </div>

        {/* Mileage Card */}
        <div className="flex flex-col items-center justify-center rounded-[1.5rem] bg-[#8d8d8d] py-4 text-white">
          <MapPin className="mb-2 h-6 w-6" strokeWidth={2.5} />
          <span className="text-lg font-bold">{motor.kilometerstand}</span>
        </div>

        {/* Power Card */}
        <div className="flex flex-col items-center justify-center rounded-[1.5rem] bg-[#8d8d8d] py-4 text-white px-2 text-center">
          <Gauge className="mb-2 h-6 w-6" strokeWidth={2.5} />
          <span className="text-sm font-bold leading-tight">{motor.vermogen}</span>
        </div>
      </div>

      {/* Optional: Hover Price Overlay */}
      <div className="absolute top-6 right-8 rounded-full bg-white/10 px-4 py-1 backdrop-blur-md">
        <p className="font-bold text-white">€ {motor.prijs.toLocaleString('nl-NL')}</p>
      </div>
    </div>
  )
}
