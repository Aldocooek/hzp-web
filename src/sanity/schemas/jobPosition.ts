import { defineField, defineType } from 'sanity';

const blockContent = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [
      {
        type: 'block',
        styles: [
          { title: 'Normal', value: 'normal' },
          { title: 'H3', value: 'h3' },
        ],
        lists: [
          { title: 'Bullet', value: 'bullet' },
          { title: 'Numbered', value: 'number' },
        ],
        marks: {
          decorators: [
            { title: 'Strong', value: 'strong' },
            { title: 'Emphasis', value: 'em' },
          ],
        },
      },
    ],
  });

export const jobPosition = defineType({
  name: 'jobPosition',
  title: 'Volná pracovní pozice',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Název pozice',
      type: 'object',
      fields: [
        defineField({ name: 'cs', title: 'Česky', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'en', title: 'English', type: 'string', validation: (Rule) => Rule.required() }),
      ],
    }),
    defineField({
      name: 'department',
      title: 'Oddělení',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Místo výkonu práce',
      type: 'string',
      initialValue: 'Prostějov',
    }),
    defineField({
      name: 'description',
      title: 'Popis pozice',
      type: 'object',
      fields: [
        blockContent('cs', 'Česky'),
        blockContent('en', 'English'),
      ],
    }),
    defineField({
      name: 'requirements',
      title: 'Požadavky',
      type: 'object',
      fields: [
        blockContent('cs', 'Česky'),
        blockContent('en', 'English'),
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Aktivní pozice',
      type: 'boolean',
      description: 'Zobrazit na webu',
      initialValue: true,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Datum zveřejnění',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],

  orderings: [
    {
      title: 'Nejnovější',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],

  preview: {
    select: {
      title: 'title.cs',
      subtitle: 'department',
      active: 'isActive',
    },
    prepare({ title, subtitle, active }) {
      return {
        title: `${active ? '' : '[NEAKTIVNÍ] '}${title}`,
        subtitle,
      };
    },
  },
});
