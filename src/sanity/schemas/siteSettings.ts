import { defineField, defineType } from 'sanity';

const i18nString = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'object',
    fields: [
      defineField({ name: 'cs', title: 'Česky', type: 'string' }),
      defineField({ name: 'en', title: 'English', type: 'string' }),
    ],
  });

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Nastavení webu',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Název dokumentu',
      type: 'string',
      initialValue: 'Site Settings',
      readOnly: true,
    }),

    // Hero section
    defineField({
      name: 'hero',
      title: 'Hero sekce',
      type: 'object',
      fields: [
        i18nString('headline1', 'Headline 1'),
        i18nString('headline2', 'Headline 2'),
        i18nString('headline3', 'Headline 3'),
        i18nString('subheadline', 'Subheadline'),
        i18nString('sub', 'Sub text'),
        i18nString('cta1', 'CTA tlačítko 1'),
        i18nString('cta2', 'CTA tlačítko 2'),
      ],
    }),

    // Stats
    defineField({
      name: 'stats',
      title: 'Statistiky',
      type: 'object',
      fields: [
        defineField({
          name: 'founded',
          title: 'Rok založení',
          type: 'object',
          fields: [
            defineField({ name: 'cs', title: 'Popis (CZ)', type: 'string' }),
            defineField({ name: 'en', title: 'Popis (EN)', type: 'string' }),
            defineField({ name: 'value', title: 'Hodnota', type: 'string' }),
          ],
        }),
        defineField({
          name: 'springs',
          title: 'Pružin ročně',
          type: 'object',
          fields: [
            defineField({ name: 'cs', title: 'Popis (CZ)', type: 'string' }),
            defineField({ name: 'en', title: 'Popis (EN)', type: 'string' }),
            defineField({ name: 'value', title: 'Hodnota', type: 'string' }),
          ],
        }),
        defineField({
          name: 'employees',
          title: 'Zaměstnanců',
          type: 'object',
          fields: [
            defineField({ name: 'cs', title: 'Popis (CZ)', type: 'string' }),
            defineField({ name: 'en', title: 'Popis (EN)', type: 'string' }),
            defineField({ name: 'value', title: 'Hodnota', type: 'string' }),
          ],
        }),
        defineField({
          name: 'years',
          title: 'Let zkušeností',
          type: 'object',
          fields: [
            defineField({ name: 'cs', title: 'Popis (CZ)', type: 'string' }),
            defineField({ name: 'en', title: 'Popis (EN)', type: 'string' }),
            defineField({ name: 'value', title: 'Hodnota', type: 'string' }),
          ],
        }),
      ],
    }),

    // Footer
    defineField({
      name: 'footer',
      title: 'Patička',
      type: 'object',
      fields: [
        i18nString('tagline', 'Tagline'),
      ],
    }),

    // Contact info
    defineField({
      name: 'contactInfo',
      title: 'Kontaktní informace',
      type: 'object',
      fields: [
        defineField({
          name: 'address',
          title: 'Adresa',
          type: 'object',
          fields: [
            defineField({ name: 'cs', title: 'Adresa (CZ)', type: 'string' }),
            defineField({ name: 'en', title: 'Adresa (EN)', type: 'string' }),
          ],
        }),
        defineField({ name: 'phone', title: 'Telefon', type: 'string' }),
        defineField({ name: 'email', title: 'E-mail', type: 'string' }),
        defineField({ name: 'ico', title: 'IČO (label)', type: 'string' }),
        defineField({ name: 'icoVal', title: 'IČO (hodnota)', type: 'string' }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
    },
    prepare() {
      return { title: 'Nastavení webu' };
    },
  },
});
