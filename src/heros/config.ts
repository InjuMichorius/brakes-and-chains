import type { Field } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        { label: 'None', value: 'none' },
        { label: 'High Impact', value: 'highImpact' },
        { label: 'Medium Impact', value: 'mediumImpact' },
        { label: 'Low Impact', value: 'lowImpact' },
      ],
      required: true,
    },
    {
      name: 'heroTitle',
      type: 'text',
      label: 'Hero Title',
      admin: {
        placeholder: 'Voer een titel in…',
      },
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
    },
    {
      name: 'youtubeUrl',
      label: 'YouTube URL',
      type: 'text',
      admin: {
        placeholder: 'https://www.youtube.com/watch?v=…',
        description: 'Wordt gebruikt als fallback op mobiel bij video heroes',
        condition: (_, { type } = {}) => type === 'highImpact',
      },
      validate: (value: unknown) => {
        if (!value) return true
        if (
          typeof value === 'string' &&
          (value.includes('youtube.com') || value.includes('youtu.be'))
        ) {
          return true
        }
        return 'Vul een geldige YouTube URL in'
      },
    },
  ],
  label: false,
}
