import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
// Adjust this import path to where your types are generated
import type { TimelineBlock as TimelineBlockProps } from '@/payload-types'

type Props = TimelineBlockProps & {
  className?: string
}

export const TimelineBlock: React.FC<Props> = ({ title, items, className }) => {
  return (
    <div className={cn('py-12 bg-white overflow-hidden', className)}>
      <div className="container">
        {title && <h1 className="text-4xl md:text-6xl font-bold text-center mb-12">{title}</h1>}

        <div className="relative max-w-[1000px] mx-auto py-10">
          <ul className="m-0 p-0 list-none relative">
            {/* The seamless vertical line (moved to the outer container for continuity) */}
            <div className="absolute left-[4px] md:left-[160px] top-0 w-[2px] h-full bg-gray-300" />

            {items?.map((item, i) => (
              <li
                key={i}
                className="relative w-full pb-12 md:pb-16 pl-[20px] md:pl-0 flex flex-col md:flex-row items-start"
              >
                {/* Timeline Dot */}
                <div
                  className={cn(
                    'absolute w-4 h-4 bg-orange-500 rounded-full z-10 border-4 border-white',
                    'top-[6px] left-[-3px] md:left-[153px]',
                  )}
                />

                {/* Date Bubble (Left on Desktop, Above on Mobile) */}
                <div
                  className={cn(
                    'md:w-[140px] md:text-right md:pr-8 shrink-0', // Desktop: fixed width, right aligned
                    'mb-2 md:mb-0', // Mobile: spacing below date
                  )}
                >
                  <div className="inline-block px-4 py-1 bg-orange-500 text-white text-sm font-semibold rounded-full whitespace-nowrap">
                    {item.dateLabel}
                  </div>
                </div>

                {/* Content (Right of line on Desktop) */}
                <div className="md:pl-12 flex-grow">
                  <h3 className="text-xl font-bold m-0 leading-tight">{item.title}</h3>
                  <div className="mt-2 text-gray-700">
                    <RichText data={item.content} enableGutter={false} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
