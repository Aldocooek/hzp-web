import { defineField, defineType } from 'sanity';

export const product = defineType({
  name: 'product',
  title: 'Produkt',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug (identifikátor)',
      type: 'string',
      description: 'Jedinečný identifikátor: helical | trapezoidal | parabolic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Název',
      type: 'object',
      fields: [
        defineField({ name: 'cs', title: 'Česky', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'en', title: 'English', type: 'string', validation: (Rule) => Rule.required() }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Krátký popis',
      type: 'object',
      fields: [
        defineField({ name: 'cs', title: 'Česky', type: 'text', rows: 3 }),
        defineField({ name: 'en', title: 'English', type: 'text', rows: 3 }),
      ],
    }),
    defineField({
      name: 'detail',
      title: 'Detailní popis',
      type: 'object',
      fields: [
        defineField({ name: 'cs', title: 'Česky', type: 'text', rows: 4 }),
        defineField({ name: 'en', title: 'English', type: 'text', rows: 4 }),
      ],
    }),
    defineField({
      name: 'specs',
      title: 'Technické parametry',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'spec',
          title: 'Parametr',
          fields: [
            defineField({ name: 'cs', title: 'Česky', type: 'string' }),
            defineField({ name: 'en', title: 'English', type: 'string' }),
          ],
          preview: {
            select: { title: 'cs', subtitle: 'en' },
          },
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Pořadí',
      type: 'number',
      description: 'Nižší číslo = zobrazí se dříve',
      initialValue: 0,
    }),
    defineField({
      name: 'image',
      title: 'Obrázek',
      type: 'image',
      options: { hotspot: true },
    }),
  ],

  orderings: [
    {
      title: 'Pořadí',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      title: 'name.cs',
      subtitle: 'slug',
      media: 'image',
    },
  },
});
