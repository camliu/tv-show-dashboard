import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/hints',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxt/a11y',
  ],
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'TV Show Dashboard',
    },
  },

  css: ['./app/assets/css/main.css'],

  compatibilityDate: '2025-07-15',

  nitro: {
    preset: 'azure',
    azure: {
      config: {
        platform: {
          apiRuntime: 'node:22',
        },
      },
    },
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  eslint: {
    config: { stylistic: true },
  },
});
