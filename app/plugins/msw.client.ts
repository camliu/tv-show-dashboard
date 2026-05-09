export default defineNuxtPlugin(async () => {
  if (import.meta.env.VITE_MSW !== 'true') return;

  const { worker } = await import('../../mocks/browser');
  await worker.start({ onUnhandledRequest: 'bypass' });
});
