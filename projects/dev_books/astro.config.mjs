// @ts-check
import { defineConfig, envField } from 'astro/config';
import netlify from '@astrojs/netlify';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    vite: {
        resolve: {
            alias: {
                '@': new URL('./src', import.meta.url).pathname,
            },
        },
        plugins: [tailwindcss()],
    },
    env: {
        schema: {
            SHOW_BUY_BUTTON: envField.boolean({ context: 'server', access: 'public', default: true }),
            SCORE_API_ENDPOINT: envField.string({ context: 'server', access: 'public', default: '' }),
        }
    },
    output: 'server',
    adapter: netlify(),
});