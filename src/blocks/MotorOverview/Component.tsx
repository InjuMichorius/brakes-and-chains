'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/ui'

type Motor = {
  id: string
  naam: string
  prijs: number
  specsTekst?: string
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
  motoren?: string[] // Nu alleen IDs
  className?: string
}

export const MotorOverview: React.FC<Props> = ({
  blockId,
  titel,
  tekst,
  motoren = [],
  className,
}) => {
  const [motorDetails, setMotorDetails] = useState<Motor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMotoren = async () => {
      if (!motoren.length) return

      try {
        const fetchedMotoren: Motor[] = await Promise.all(
          motoren.map(async (id) => {
            const res = await fetch(`/api/motoren/${id}`) // Pas dit endpoint aan naar je API
            if (!res.ok) throw new Error(`Kon motor ${id} niet ophalen`)
            return res.json()
          }),
        )
        setMotorDetails(fetchedMotoren)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchMotoren()
  }, [motoren])

  if (!motoren.length || loading) return null

  return (
    <section id={blockId} className={cn('container mx-auto py-16', className)}>
      <h2 className="text-3xl font-bold mb-4">{titel}</h2>
      {tekst && <p className="mb-8 text-gray-600">{tekst}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {motorDetails.map((motor) => (
          <div key={motor.id} className="border rounded-lg overflow-hidden shadow">
            {motor.afbeelding?.url && (
              <div className="relative h-48">
                <Image
                  src={motor.afbeelding.url}
                  alt={motor.afbeelding.alt || motor.naam}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="p-4">
              <h3 className="text-xl font-semibold">{motor.naam}</h3>

              {motor.specsTekst && <p className="text-sm text-gray-500 mt-1">{motor.specsTekst}</p>}

              {motor.bodytekst && <p className="mt-2 text-sm">{motor.bodytekst}</p>}

              <p className="font-bold mt-3">€ {motor.prijs}</p>

              {motor.url_marktplaats && (
                <a
                  href={motor.url_marktplaats}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-blue-600 underline"
                >
                  Bekijk op Marktplaats
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
