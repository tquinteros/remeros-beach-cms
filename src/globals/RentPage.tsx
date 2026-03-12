// src/payload/globals/RentPage.ts
import type { GlobalConfig } from 'payload'

export const RentPage: GlobalConfig = {
  slug: 'rent-page',
  label: 'Página de Renta',
  admin: {
    group: 'Páginas', // agrupa en el sidebar del CMS
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Hero',
      fields: [
        { name: 'title', type: 'text', label: 'Título' },
        { name: 'subtitle', type: 'textarea', label: 'Subtítulo' },
        { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Título de la sección de condominios',
    },
    {
      name: 'bottomContent',
      type: 'richText',
      label: 'Contenido adicional (al final)',
    },
  ],
}
