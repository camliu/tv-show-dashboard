import { server } from '../../mocks/node';

export default defineNitroPlugin((nitroApp) => {
  if (import.meta.dev) {
    server.listen({
      onUnhandledRequest: 'bypass',
    });

    console.info('MSW started for Nitro');

    nitroApp.hooks.hook('close', () => {
      server.close();
    });
  }
});
