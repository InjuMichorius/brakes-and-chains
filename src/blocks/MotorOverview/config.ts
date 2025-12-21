import { Block } from 'payload'

export const MotorOverview: Block = {
  slug: 'motorOverview',
  interfaceName: 'Motor overzicht',
  labels: {
    singular: 'Motor overzicht',
    plural: 'Motor overzichten',
  },
  fields: [
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
