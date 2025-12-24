import Image from 'next/image'
import { cn } from '@/utilities/ui'

type Motor = {
  id: string
  naam: string
  prijs: number
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

export const MotorOverview: React.FC<Props> = ({ blockId, titel, tekst, motoren, className }) => {
  if (!motoren?.length) return null

  return (
    <section id={blockId} className={cn('container mx-auto py-16', className)}>
      <h2 className="text-3xl font-bold mb-4">{titel}</h2>

      {tekst && <p className="mb-8 text-gray-600">{tekst}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {motoren.map((motor) => (
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

              {motor.specstekst && <p className="text-sm text-gray-500 mt-1">{motor.specstekst}</p>}

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
