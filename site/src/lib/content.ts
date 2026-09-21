import { getCollection } from 'astro:content';
export const published = async (collection: 'reviews' | 'comparisons') =>
  (await getCollection(collection)).filter((entry) => !entry.data.draft).sort((a, b) => b.data.updatedAt.getTime() - a.data.updatedAt.getTime());
