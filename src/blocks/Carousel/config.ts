import type { Block } from 'payload'

export const Carousel: Block = {
  slug: 'carousel',
  labels: {
    singular: 'Carousel',
    plural: 'Carousels',
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },

    {
      name: 'source',
      type: 'select',
      label: 'Content source',
      options: [
        { label: 'Manual items', value: 'manual' },
        { label: 'Condominiums', value: 'condominiums' },
      ],
      defaultValue: 'manual',
    },

    {
      name: 'items',
      type: 'array',
      label: 'Manual Items',
      admin: {
        condition: (_, siblingData) => siblingData.source === 'manual',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'link',
          type: 'text',
        },
      ],
    },

    {
      name: 'selectedCondominiums',
      type: 'relationship',
      relationTo: 'condominiums',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData.source === 'condominiums',
      },
    },

    {
      name: 'itemsPerView',
      type: 'number',
      label: 'Items per view',
      defaultValue: 3,
      min: 1,
      max: 6,
    },

    {
      name: 'autoplay',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
