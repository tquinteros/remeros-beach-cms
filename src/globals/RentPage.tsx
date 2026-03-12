import type { GlobalConfig } from 'payload'

export const RentPage: GlobalConfig = {
  slug: 'rent-page',
  label: 'Página de Renta',
  admin: {
    group: 'Globals', // ← esto lo mueve junto a Header y Footer
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Hero',
      fields: [
        { name: 'title', type: 'text', label: 'Título' },
        { name: 'subtitle', type: 'textarea', label: 'Subtítulo' },
        { name: 'backgroundImage', type: 'upload', relationTo: 'media', label: 'Imagen de fondo' },
      ],
    },
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Título sección condominios',
    },
    {
      name: 'bottomContent',
      type: 'richText',
      label: 'Contenido adicional (al final)',
    },
  ],
}
