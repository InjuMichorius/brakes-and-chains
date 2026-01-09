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
          {/* Vertical Center Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 w-[2px] h-full bg-gray-300 -translate-x-1/2" />

          <ul className="m-0 p-0 list-none">
            {items?.map((item, i) => (
              <li
                key={i}
                className={cn(
                  'group relative w-full md:w-1/2 px-10 pb-12 md:pb-5 box-border clear-both',
                  // Odd items: Left side on Desktop
                  'md:odd:float-left md:odd:text-right md:odd:pl-0 md:odd:pr-10',
                  // Even items: Right side on Desktop
                  'md:even:float-right md:even:text-left md:even:pr-0 md:even:pl-10',
                  // Mobile adjustments (all left aligned)
                  'pl-[50px] text-left',
                )}
              >
                {/* Timeline Dot */}
                <div
                  className={cn(
                    'absolute w-[10px] h-[10px] bg-pink-600 rounded-full shadow-[0_0_0_3px_rgba(233,33,99,0.2)] z-10',
                    'top-[24px] md:group-odd:-right-[5px] md:group-even:-left-[5px]',
                    'left-[16px] md:left-auto top-[0] md:top-[24px]', // Mobile pos
                  )}
                />

                {/* Date Bubble */}
                <div
                  className={cn(
                    'absolute top-[-10px] md:top-[12px] px-4 py-2 bg-pink-600 text-white text-sm rounded-[18px] shadow-[0_0_0_3px_rgba(233,33,99,0.3)] whitespace-nowrap z-20',
                    'md:group-odd:-right-[165px] md:group-even:-left-[165px]',
                    'left-[50px] md:left-auto', // Mobile pos
                  )}
                >
                  <h4 className="m-0 font-semibold">{item.dateLabel}</h4>
                </div>

                {/* Content */}
                <div className="pt-8 md:pt-0">
                  <h3 className="text-xl font-bold m-0">{item.title}</h3>
                  <div className="mt-2 text-gray-700">
                    <RichText data={item.content} enableGutter={false} />
                  </div>
                </div>
              </li>
            ))}
            <div className="clear-both" />
          </ul>
        </div>
      </div>
    </div>
  )
}
