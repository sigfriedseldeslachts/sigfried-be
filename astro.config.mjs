// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://sigfried.be',
  integrations: [tailwind(), svelte({ extensions: ['.svelte'] }), sitemap()],
  redirects: {
    '/others/aircraft': '/projects/aircraft',
  }
});