import { Block } from 'payload'

export const MotorOverview: Block = {
  slug: 'motorOverview',
  interfaceName: 'MotorOverview',
  labels: {
    singular: 'Motor overzicht',
    plural: 'Motor overzichten',
  },
  fields: [
    {
      name: 'blockId',
      type: 'text',
    },
    {
      name: 'titel',
      type: 'text',
      required: true,
    },
    {
      name: 'tekst',
      type: 'textarea',
    },
    {
      name: 'motoren',
      type: 'relationship',
      relationTo: 'motoren',
      hasMany: true,
      required: true,
    },
  ],
}
