import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { ImageTextBlock } from '@/blocks/ImageTextBlock/Component'
import { MotorOverview } from '@/blocks/MotorOverview/Component'

import type {
  ArchiveBlock as ArchiveBlockProps,
  ContentBlock as ContentBlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'

interface BlockBaseProps {
  disableInnerContainer?: boolean
}

type ArchiveBlockComponent = React.ComponentType<ArchiveBlockProps & BlockBaseProps>
type ContentBlockComponent = React.ComponentType<ContentBlockProps & BlockBaseProps>
type MediaBlockComponent = React.ComponentType<MediaBlockProps & BlockBaseProps>
// Add other block prop types as needed

type BlockComponent =
  | ArchiveBlockComponent
  | ContentBlockComponent
  | MediaBlockComponent
  | React.ComponentType<any>

const blockComponents: Record<string, BlockComponent> = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  ImageTextBlock: ImageTextBlock,
  motorOverview: MotorOverview,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="py-10 md:py-12" key={index}>
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
