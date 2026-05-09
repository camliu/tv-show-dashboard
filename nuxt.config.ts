import tailwindcss from '@tailwindcss/vite';
import {
  primeVueConfig,
} from './configs/primevue';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/hints',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxt/a11y',
    '@primevue/nuxt-module',
  ],

  devtools: {
    enabled: true,
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'TV Show',
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon.svg',
        },
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
        },
      ],
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
    optimizeDeps: {
      include: ['@iconify/vue'],
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  icon: {
    serverBundle: {
      collections: ['lucide'],
    },
  },

  image: {
    domains: ['static.tvmaze.com'],
  },

  primevue: primeVueConfig,
});
