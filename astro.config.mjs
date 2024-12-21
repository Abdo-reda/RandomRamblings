import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://www.random-ramblings.me',
  trailingSlash: 'never',
  output: 'static',
  adapter: vercel(),
  integrations: [icon()],
});