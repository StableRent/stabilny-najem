// @ts-check
import { defineConfig } from 'astro/config';
import { resolve } from 'node:path';
import { SITE } from './src/consts';

import sitemap from '@astrojs/sitemap';
import { shield } from '@kindspells/astro-shield';

import favicons from 'astro-favicons';

const rootDir = new URL('.', import.meta.url).pathname;
const modulePath = resolve(rootDir, 'src', 'generated', 'sriHashes.mjs');

// https://astro.build/config
export default defineConfig({
  site: SITE.CANONICAL_URL,
  output: 'static',
  integrations: [sitemap(), shield({
    sri: { hashesModule: modulePath },
  }), favicons()],
});