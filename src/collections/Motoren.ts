import { CollectionConfig } from 'payload'

export const Motoren: CollectionConfig = {
  slug: 'motoren',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'naam',
  },
  fields: [
    {
      name: 'naam',
      type: 'text',
      required: true,
    },
    {
      name: 'specstekst',
      type: 'textarea',
    },
    {
      name: 'prijs',
      type: 'number',
      required: true,
    },
    {
      name: 'bouwjaar',
      type: 'number',
      required: true,
    },
    {
      name: 'kilometerstand',
      type: 'number',
      required: true,
    },
    {
      name: 'vermogen',
      type: 'text',
      required: true,
    },
    {
      name: 'bodytekst',
      type: 'textarea',
    },
    {
      name: 'url_marktplaats',
      type: 'text',
    },
    {
      name: 'afbeelding',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
