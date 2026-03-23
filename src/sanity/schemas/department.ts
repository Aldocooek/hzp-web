import { defineField, defineType } from 'sanity';

export const department = defineType({
  name: 'department',
  title: 'Oddělení (kontakt)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Název oddělení',
      type: 'object',
      fields: [
        defineField({ name: 'cs', title: 'Česky', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'en', title: 'English', type: 'string', validation: (Rule) => Rule.required() }),
      ],
    }),
    defineField({
      name: 'person',
      title: 'Kontaktní osoba',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'E-mail',
      type: 'string',
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
      subtitle: 'person',
    },
  },
});
