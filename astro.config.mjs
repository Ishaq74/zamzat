// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import path from 'path';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'http://localhost:4321',
  integrations: [mdx(), sitemap(), icon()],

  vite: {
      plugins: [tailwindcss()],
      resolve: {
          alias: {
              '@fonts': path.resolve('./src/fonts'),
              '@components': path.resolve('./src/components'),
              '@Elements': path.resolve('./src/components/Elements'),
              '@styles': path.resolve('./src/styles'),
              '@layouts': path.resolve('./src/layouts'),
              '@partials': path.resolve('./src/partials'),
              '@scripts': path.resolve('./src/scripts'),
              '@lib': path.resolve('./src/lib'),
              '@utils': path.resolve('./src/utils')
          }
      }
  },

  output: 'server',

  adapter: node({
    mode: 'standalone',
  }),
});