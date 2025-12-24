import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://netzerholdings.com',
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
});

