import Aura from '@primeuix/themes/aura';

export const primeVueConfig = {
  options: {
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: false,
        cssLayer: {
          name: 'primevue',
          order: 'tailwind-base, primevue, tailwind-utilities',
        },
      },
    },
  },
};
