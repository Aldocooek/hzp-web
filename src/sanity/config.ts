import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { projectId, dataset, apiVersion } from './env';
import { schemas } from './schemas';

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  apiVersion,
  title: 'HŽP CMS',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Obsah')
          .items([
            S.listItem()
              .title('Nastavení webu')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            S.listItem()
              .title('Produkty')
              .child(S.documentTypeList('product').title('Produkty')),
            S.listItem()
              .title('Průmysly / Odvětví')
              .child(S.documentTypeList('industry').title('Průmysly')),
            S.divider(),
            S.listItem()
              .title('Tým')
              .child(S.documentTypeList('teamMember').title('Členové týmu')),
            S.listItem()
              .title('Oddělení')
              .child(S.documentTypeList('department').title('Oddělení')),
            S.divider(),
            S.listItem()
              .title('Hodnoty')
              .child(S.documentTypeList('value').title('Hodnoty')),
            S.listItem()
              .title('Benefity')
              .child(S.documentTypeList('benefit').title('Benefity')),
            S.divider(),
            S.listItem()
              .title('Aktuality')
              .child(S.documentTypeList('newsArticle').title('Aktuality')),
            S.listItem()
              .title('Pracovní pozice')
              .child(S.documentTypeList('jobPosition').title('Pracovní pozice')),
            S.divider(),
            S.listItem()
              .title('Stránky')
              .child(S.documentTypeList('page').title('Stránky')),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  schema: {
    types: schemas,
  },
});
