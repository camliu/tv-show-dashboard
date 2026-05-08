export default defineNuxtPlugin(async () => {
  if (import.meta.dev) {
    if (import.meta.client) {
      const { worker } = await import('../../mocks/browser');
      await worker.start({
        onUnhandledRequest: 'bypass',
      });
    }
    else {
      const { server } = await import('../../mocks/node');
      server.listen({
        onUnhandledRequest: 'bypass',
      });
    }
  }
});
