import { defineField, defineType } from 'sanity';

export const value = defineType({
  name: 'value',
  title: 'Firemní hodnoty',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Název',
      type: 'object',
      fields: [
        defineField({ name: 'cs', title: 'Česky', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'en', title: 'English', type: 'string', validation: (Rule) => Rule.required() }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Popis',
      type: 'object',
      fields: [
        defineField({ name: 'cs', title: 'Česky', type: 'text', rows: 3 }),
        defineField({ name: 'en', title: 'English', type: 'text', rows: 3 }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Pořadí',
      type: 'number',
      initialValue: 0,
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
      title: 'title.cs',
      subtitle: 'title.en',
    },
  },
});
