import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://aspurv.github.io',
  base: '/uni-mecanica',
  integrations: [react()]
});
