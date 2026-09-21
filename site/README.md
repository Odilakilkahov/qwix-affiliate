# Site project

Install dependencies with `npm install`, then run `npm run dev`. Build the static site with `npm run build`; validate types and Astro files with `npm run check`.

## Add a review

Create `src/content/reviews/your-slug.md` with the fields enforced in `src/content.config.ts`. `notForList`, `pricingCheckedAt`, and at least one cited source are required. Set `draft: true` while writing; only `draft: false` content is published. Use an `affiliate` slug only after its offer exists in the offers collection.

## Add an offer

Create `src/content/offers/your-offer.json` with a unique lowercase `slug`, program name, destination URL, disclosure text, and status. Affiliate destinations live only here. Use `active` only for approved programs; links render through `/go/<slug>/`.
