import { siteSettings } from './siteSettings';
import { product } from './product';
import { industry } from './industry';
import { teamMember } from './teamMember';
import { department } from './department';
import { benefit } from './benefit';
import { value } from './value';
import { newsArticle } from './newsArticle';
import { jobPosition } from './jobPosition';
import { page } from './page';

export const schemaTypes = [
  siteSettings,
  product,
  industry,
  teamMember,
  department,
  benefit,
  value,
  newsArticle,
  jobPosition,
  page,
];

// Alias for backwards compatibility with src/sanity/config.ts
export const schemas = schemaTypes;
