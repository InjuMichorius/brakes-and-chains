import type { Block } from 'payload'

export const TimelineBlock: Block = {
  slug: 'TimelineBlock',
  interfaceName: 'TimelineBlock',
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Timeline Items',
      minRows: 1,
      fields: [
        {
          name: 'dateLabel',
          type: 'text',
          label: 'Date/Time (e.g. January 2018)',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Item Title',
          required: true,
        },
        {
          name: 'content',
          type: 'textarea',
          label: 'Item Content',
          required: true,
        },
        {
          name: 'images',
          type: 'array',
          label: 'Images',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
