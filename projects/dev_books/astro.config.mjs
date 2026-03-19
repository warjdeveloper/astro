// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname
      }
    }
  },
  output: 'server',
  adapter: vercel(),
  env: {
    schema: {
        SHOW_BUY_BUTTON: envField.boolean({ context: 'server', access: 'public', default: true }),
        SCORE_API_ENDPOINT: envField.string({ context: 'server', access: 'public', default: '' }),
    }
  }
});