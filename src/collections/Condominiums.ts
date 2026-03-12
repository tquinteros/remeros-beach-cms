import type { CollectionConfig } from 'payload'

export const Condominiums: CollectionConfig = {
  slug: 'condominiums',

  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'price', 'bedrooms', 'bathrooms', 'updatedAt'],
  },

  access: {
    read: () => true,
  },

  fields: [
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',
      required: true,
    },

    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },

    {
      name: 'price',
      label: 'Precio',
      type: 'number',
      required: true,
      min: 0,
    },

    {
      name: 'bedrooms',
      label: 'Dormitorios',
      type: 'number',
      min: 0,
    },

    {
      name: 'bathrooms',
      label: 'Baños',
      type: 'number',
      min: 0,
    },

    {
      name: 'rooms',
      label: 'Ambientes',
      type: 'number',
      min: 0,
    },

    {
      name: 'parkingSpaces',
      label: 'Cocheras',
      type: 'number',
      min: 0,
    },

    {
      name: 'totalArea',
      label: 'M² Totales',
      type: 'number',
      min: 0,
    },

    {
      name: 'view',
      label: 'Vista',
      type: 'select',
      options: [
        { label: 'Mar', value: 'sea' },
        { label: 'Montaña', value: 'mountain' },
        { label: 'Ciudad', value: 'city' },
        { label: 'Jardín', value: 'garden' },
      ],
    },

    {
      name: 'age',
      label: 'Antigüedad (años)',
      type: 'number',
      min: 0,
    },

    {
      name: 'description',
      label: 'Descripción',
      type: 'richText',
    },

    {
      name: 'images',
      label: 'Imágenes',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
    },

    {
      name: 'featured',
      label: 'Destacado',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
