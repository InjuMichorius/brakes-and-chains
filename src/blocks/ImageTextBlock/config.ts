import { Block } from 'payload'

export const ImageTextBlock: Block = {
  slug: 'ImageTextBlock',
  labels: {
    singular: 'Image & Text',
    plural: 'Image & Texts',
  },
  fields: [
    {
      name: 'blockId',
      type: 'text',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'preTitle',
      type: 'text',
      label: 'Pre-title',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'features',
      type: 'array',
      label: 'Feature bullets',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'buttons',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
          ],
        },
      ],
    },
    {
      name: 'reverseLayout',
      type: 'checkbox',
      label: 'Image left / text right',
    },
  ],
}
