import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  site: 'https://odilakilkahov.github.io',
  base: '/qwix-affiliate/',
  integrations: [mdx(), sitemap()],
  vite: { plugins: [tailwindcss()] },
});
