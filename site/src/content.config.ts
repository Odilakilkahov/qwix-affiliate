import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const source = z.object({ label: z.string().min(1), url: z.string().url() });
const reviews = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/reviews' }),
  schema: z.object({
    title: z.string(), description: z.string(), product: z.string(), verdict: z.string(),
    prosList: z.array(z.string()).min(1), consList: z.array(z.string()).min(1),
    notForList: z.array(z.string()).min(1), pricingCheckedAt: z.coerce.date(),
    sources: z.array(source).min(1), affiliate: z.string().optional(), youtubeId: z.string().optional(),
    updatedAt: z.coerce.date(), draft: z.boolean().default(false),
  }),
});
const comparisons = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/comparisons' }),
  schema: z.object({
    title: z.string(), description: z.string(),
    products: z.array(z.object({ name: z.string(), price: z.string(), bestFor: z.string(), notFor: z.string(), limits: z.string(), affiliate: z.string().optional() })).min(2).max(4),
    winnerByUseCase: z.array(z.object({ useCase: z.string(), winner: z.string(), reason: z.string() })).min(1),
    sources: z.array(source).min(1), pricingCheckedAt: z.coerce.date(), youtubeId: z.string().optional(),
    affiliateSlugs: z.array(z.string()).default([]), updatedAt: z.coerce.date(), draft: z.boolean().default(false),
  }),
});
const offers = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/offers' }),
  schema: z.object({ slug: z.string().regex(/^[a-z0-9-]+$/), program: z.string(), destinationUrl: z.string().url(), disclosure: z.string(), status: z.enum(['active', 'pending', 'rejected']) }),
});
export const collections = { reviews, comparisons, offers };
