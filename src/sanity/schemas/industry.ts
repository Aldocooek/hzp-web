import { defineField, defineType } from 'sanity';

export const industry = defineType({
  name: 'industry',
  title: 'Průmyslové odvětví',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug (identifikátor)',
      type: 'string',
      description: 'Jedinečný identifikátor: automotive | railway | industrial',
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
      title: 'Popis',
      type: 'object',
      fields: [
        defineField({ name: 'cs', title: 'Česky', type: 'text', rows: 3 }),
        defineField({ name: 'en', title: 'English', type: 'text', rows: 3 }),
      ],
    }),
    defineField({
      name: 'icon',
      title: 'Ikona (identifikátor)',
      type: 'string',
      description: 'Název ikony použité v UI (např. automotive, railway, industrial)',
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
      title: 'name.cs',
      subtitle: 'slug',
    },
  },
});
