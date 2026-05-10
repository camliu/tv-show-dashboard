import { afterAll, afterEach, beforeAll } from 'vitest';
import { $fetch } from 'ofetch';
import { createError } from 'h3';
import { server } from '../../mocks/node';

Object.assign(globalThis, {
  $fetch,
  createError,
});

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
