import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { FlagTriangleRight, Flag } from 'lucide-react'
import type { TimelineBlock as TimelineBlockProps } from '@/payload-types'
import { ImageSlider } from './components/ImageSlider'

type Props = TimelineBlockProps & {
  className?: string
}

export const TimelineBlock: React.FC<Props> = ({ items, className }) => {
  return (
    <div className={cn('py-12 bg-white overflow-hidden', className)}>
      <div className="container">
        <div className="relative max-w-[1000px] mx-auto py-10">
          <ul className="m-0 p-0 list-none relative">
            {/* The vertical line */}
            <div className="absolute left-[8px] md:left-[160px] top-0 w-[2px] h-full bg-gray-300" />

            {items?.map((item, i) => {
              const isLast = i === items.length - 1

              return (
                <li
                  key={i}
                  className={`${isLast ? '' : 'pb-12 md:pb-16'} relative w-full pl-[30px] md:pl-0 flex flex-col md:flex-row items-start`}
                >
                  {/* Icon Replacement for Dots */}
                  <div
                    className={cn(
                      'absolute z-10 bg-white flex items-center justify-center bg-white border p-2 rounded-full',
                      'top-[-4px] left-[-7px] md:left-[140px]',
                    )}
                  >
                    <FlagTriangleRight
                      className="h-4 w-4 text-orange-500 fill-orange-500"
                      strokeWidth={2.5}
                    />
                  </div>

                  {isLast && (
                    <div
                      className={cn(
                        'absolute z-10 bg-white flex items-center justify-center bg-white border p-2 rounded-full',
                        'bottom-[0] left-[-7px] md:left-[140px]',
                      )}
                    >
                      <Flag className="h-4 w-4 text-orange-500 fill-orange-500" strokeWidth={2.5} />
                    </div>
                  )}

                  {/* Date Bubble */}
                  <div
                    className={cn('md:w-[140px] md:text-right md:pr-8 shrink-0', 'mb-2 md:mb-0')}
                  >
                    <div className="inline-block px-4 py-1 bg-orange-500 text-white text-sm font-semibold rounded-full whitespace-nowrap">
                      {item.dateLabel}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:pl-12 flex-grow">
                    <h3 className="text-xl font-bold m-0 leading-tight">{item.title}</h3>

                    <div className="mt-2 text-gray-700">
                      <RichText data={item.content} enableGutter={false} />
                    </div>

                    {item.images && item.images.length > 0 && <ImageSlider images={item.images} />}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
