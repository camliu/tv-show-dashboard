// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/hints',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxt/a11y',
    '@nuxtjs/tailwindcss',
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
  compatibilityDate: '2025-07-15',

  nitro: {
    preset: 'azure',
    azure: {
      config: {
        platform: {
          apiRuntime: 'node:24',
        },
      },
    },
  },

  eslint: {
    config: { stylistic: true },
  },
});
