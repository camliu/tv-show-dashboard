import { server } from '../../mocks/node';

export default defineNitroPlugin((nitroApp) => {
  if (process.env.VITE_MSW === 'true') {
    server.listen({
      onUnhandledRequest: 'bypass',
    });

    nitroApp.hooks.hook('close', () => {
      server.close();
    });
  }
});
