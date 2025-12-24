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
    <section id={blockId} className={cn('container mx-auto py-16 px-4', className)}>
      <div className="mb-12">
        <h2 className="text-4xl font-bold mb-4 uppercase tracking-tight">{titel}</h2>
        {tekst && <p className="text-lg text-gray-600 max-w-2xl">{tekst}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {motoren.map((motor) => (
          <div
            key={motor.id}
            className="group relative flex flex-col bg-white overflow-hidden border border-gray-100"
          >
            {/* Afbeelding Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-200">
              {motor.afbeelding?.url && (
                <Image
                  src={motor.afbeelding.url}
                  alt={motor.afbeelding.alt || motor.naam}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </div>

            {/* Header Sectie (Altijd zichtbaar) */}
            <div className="p-5 flex justify-between items-start border-b border-gray-100 bg-white z-10">
              <div>
                <h3 className="text-xl font-bold uppercase leading-tight">{motor.naam}</h3>
                {motor.specstekst && (
                  <p className="text-sm text-gray-400 mt-1 font-medium">{motor.specstekst}</p>
                )}
              </div>
              <p className="text-xl font-bold">€ {motor.prijs}</p>
            </div>

            {/* Content Sectie (Mobile: Onder elkaar | Desktop: Hover Overlay) */}
            <div
              className={cn(
                'p-5 bg-white flex-grow flex flex-col justify-between transition-all duration-300 ease-in-out',
                // Desktop hover effecten:
                'md:absolute md:inset-x-0 md:bottom-0 md:h-full md:translate-y-full md:group-hover:translate-y-0 md:z-20 md:border-t md:border-gray-200',
              )}
            >
              {/* Herhaal titel/prijs in de overlay voor de desktop state uit je screenshot */}
              <div className="hidden md:flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold uppercase">{motor.naam}</h3>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">
                    {motor.specstekst}
                  </p>
                </div>
                <p className="text-xl font-bold">€ {motor.prijs}</p>
              </div>

              <div className="space-y-4">
                {motor.bodytekst && (
                  <p className="text-sm leading-relaxed text-gray-700">{motor.bodytekst}</p>
                )}

                {motor.url_marktplaats && (
                  <a
                    href={motor.url_marktplaats}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full md:w-auto bg-black text-white px-6 py-3 text-sm font-bold uppercase tracking-widest text-center hover:bg-gray-800 transition-colors"
                  >
                    Bekijk op marktplaats
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
