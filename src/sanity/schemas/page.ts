import { defineField, defineType } from 'sanity';

const i18nString = (name: string, title: string, required = false) =>
  defineField({
    name,
    title,
    type: 'object',
    fields: [
      defineField({
        name: 'cs',
        title: 'Česky',
        type: 'string',
        validation: required ? (Rule) => Rule.required() : undefined,
      }),
      defineField({
        name: 'en',
        title: 'English',
        type: 'string',
        validation: required ? (Rule) => Rule.required() : undefined,
      }),
    ],
  });

const i18nText = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'object',
    fields: [
      defineField({ name: 'cs', title: 'Česky', type: 'text', rows: 4 }),
      defineField({ name: 'en', title: 'English', type: 'text', rows: 4 }),
    ],
  });

export const page = defineType({
  name: 'page',
  title: 'Statická stránka',
  type: 'document',
  fields: [
    defineField({
      name: 'pageId',
      title: 'ID stránky',
      type: 'string',
      description: 'Jedinečný identifikátor: about | career | products | contact',
      options: {
        list: [
          { title: 'O nás (about)', value: 'about' },
          { title: 'Kariéra (career)', value: 'career' },
          { title: 'Produkty (products)', value: 'products' },
          { title: 'Kontakt (contact)', value: 'contact' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    i18nString('title', 'Nadpis stránky', true),
    i18nString('subtitle', 'Podnadpis stránky'),

    // About page specific fields
    defineField({
      name: 'about',
      title: 'O nás — obsah',
      type: 'object',
      hidden: ({ document }) => document?.pageId !== 'about',
      fields: [
        i18nText('mission', 'Mise / poslání'),
        i18nString('historyTitle', 'Název sekce — Historie'),
        i18nText('historyText', 'Text historie (odstavec 1)'),
        i18nText('history2', 'Text historie (odstavec 2)'),
        i18nString('visionTitle', 'Název sekce — Vize'),
        i18nText('visionText', 'Text vize'),
        i18nString('valuesTitle', 'Název sekce — Hodnoty'),
        i18nString('managementTitle', 'Název sekce — Vedení'),
      ],
    }),

    // Career page specific fields
    defineField({
      name: 'career',
      title: 'Kariéra — obsah',
      type: 'object',
      hidden: ({ document }) => document?.pageId !== 'career',
      fields: [
        i18nText('intro', 'Úvodní text'),
        i18nString('whyTitle', 'Název sekce — Proč HŽP?'),
        i18nString('openPositions', 'Nadpis — Volné pozice'),
        i18nText('noPositions', 'Text — žádné volné pozice'),
        i18nString('contactHR', 'Nadpis — Kontakt HR'),
        i18nString('sendCV', 'Tlačítko — Zaslat životopis'),
      ],
    }),

    // Contact page specific fields
    defineField({
      name: 'contact',
      title: 'Kontakt — obsah',
      type: 'object',
      hidden: ({ document }) => document?.pageId !== 'contact',
      fields: [
        i18nString('formTitle', 'Nadpis formuláře'),
        i18nString('formName', 'Pole — Jméno'),
        i18nString('formEmail', 'Pole — E-mail'),
        i18nString('formCompany', 'Pole — Společnost'),
        i18nString('formSubject', 'Pole — Předmět'),
        i18nString('formMessage', 'Pole — Zpráva'),
        i18nString('formSend', 'Tlačítko — Odeslat'),
        i18nString('formSuccess', 'Zpráva — Úspěch'),
        i18nString('required', 'Text — Povinné pole'),
        i18nString('departments', 'Nadpis — Kontakty oddělení'),
        i18nString('address', 'Label — Adresa'),
        i18nString('phone', 'Label — Telefon'),
        i18nString('email', 'Label — E-mail'),
        i18nString('ico', 'Label — IČO'),
      ],
    }),
  ],

  preview: {
    select: {
      pageId: 'pageId',
      title: 'title.cs',
    },
    prepare({ pageId, title }) {
      const labels: Record<string, string> = {
        about: 'O nás',
        career: 'Kariéra',
        products: 'Produkty',
        contact: 'Kontakt',
      };
      return {
        title: labels[pageId] ?? pageId,
        subtitle: title,
      };
    },
  },
});
