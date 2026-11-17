import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Si se despliega en GitHub Pages (GitHub Actions), se usa la subruta '/uni-mecanica'.
// En Vercel o en entorno local, se sirve desde la raíz '/'.
const isGitHubPages = Boolean(process.env.GITHUB_ACTIONS && !process.env.VERCEL);

export default defineConfig({
  site: isGitHubPages ? 'https://aspurv.github.io' : undefined,
  base: isGitHubPages ? '/uni-mecanica' : '/',
  integrations: [react()]
});
