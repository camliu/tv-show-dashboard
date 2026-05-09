import { $fetch } from 'ofetch';
import { createError } from 'h3';

Object.assign(globalThis, {
  $fetch,
  createError,
});
