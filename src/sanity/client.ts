import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: '1dyubvw4',
  dataset: 'hzp',
  apiVersion: '2024-01-01',
  useCdn: true,
});
