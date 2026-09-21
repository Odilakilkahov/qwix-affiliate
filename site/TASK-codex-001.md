You are the interface/design member of a three-model team (Claude, Codex, Gemini). First read `D:\qwix-affiliate\AGENTS.md` — its rules are binding. Your zone is `site/` and `brand/` only. Do not touch `offers/`, `scripts/`, `legal/`, `research/`.

TASK 001 — build the affiliate site skeleton in `D:\qwix-affiliate\site` with Astro (latest stable), TypeScript, Tailwind CSS. Static output, deployable to Vercel/Cloudflare Pages free tier. English UI. No database.

Requirements
1. Brand is a single constant (`src/config/site.ts`): name "Small Team Stack", tagline, url, social links. Nothing else may hard-code the name.
2. Content collections (Markdown/MDX with zod schemas):
   - `reviews`: title, description, product, verdict, prosList, consList, notForList (REQUIRED, min 1 — build must fail without it), pricingCheckedAt (date, required), sources[] {label,url} (required, min 1), affiliate slug (optional), youtubeId (optional), updatedAt.
   - `comparisons`: title, description, products[2..4] each with name, price, bestFor, notFor, limits; winnerByUseCase[]; sources[]; pricingCheckedAt; youtubeId; affiliate slugs.
   - `offers` (data collection, JSON/YAML): slug, program name, destination url, disclosure text, status (active|pending|rejected). Destination URLs come ONLY from here.
3. Outbound affiliate links: every affiliate link is rendered as `/go/<slug>` with `rel="sponsored nofollow noopener"`. Implement `/go/[slug]` as a static page per offer that redirects (meta refresh + JS) to the destination and fires a lightweight click event. For counting, add a tiny pluggable tracker module (`src/lib/track.ts`) that posts to an endpoint read from `PUBLIC_TRACK_ENDPOINT` if set and otherwise does nothing. No third-party analytics scripts, no cookies.
4. Affiliate disclosure component rendered at the TOP of every review/comparison page that has an affiliate slug (FTC requirement), plus a `/disclosure` page and footer link. Placeholder pages: `/about`, `/how-we-test`, `/privacy`, `/contact` — mark clearly as DRAFT text for Claude to write; do not invent claims about experience, team size or years of testing.
5. Pages: home (latest comparisons + reviews), `/reviews`, `/comparisons`, article templates, 404, RSS, sitemap, robots.txt, canonical URLs, Open Graph + JSON-LD (`Review`/`Article`; never emit star ratings unless a rating field exists).
6. Comparison page: responsive comparison table that works at 360px width, "Not for you if…" block per product, sources list with check date, embedded lite YouTube (no iframe until click).
7. Design: clean editorial, fast, light + dark. Not a generic AI-template look: no purple gradients, no glassmorphism, no emoji bullets. System font stack or one self-hosted variable font. Target Lighthouse mobile performance ≥ 95; ship zero client JS except the tracker, theme toggle and lite YouTube.
8. Seed exactly ONE review and ONE comparison clearly labelled `draft: true` with lorem-free placeholder text like "TO BE WRITTEN BY CLAUDE" so the layout can be checked; drafts must be excluded from production builds, sitemap and RSS.
9. `brand/`: SVG wordmark + square avatar (1:1) + YouTube banner (2560×1440 safe-area aware) as SVG, and 3 thumbnail templates as SVG with editable text layers. Same restrained visual language as the site.
10. `npm run build` and `npm run check` (astro check) must pass. Add a short `site/README.md`: how to run, how to add a review, how to add an offer.

Constraints: machine is weak (2 cores, 8 GB RAM) — keep dependencies minimal, do not add a UI framework (no React/Vue), do not run dev servers in the background. Do not commit. Do not deploy. No secrets anywhere.

When done, write `D:\qwix-affiliate\site\HANDOFF-001.md`: what was built, exact commands you ran with their real results (paste the tail of build output), what failed or was skipped, and a section "NEEDS FROM CLAUDE" (texts, offers data, tracking endpoint).
