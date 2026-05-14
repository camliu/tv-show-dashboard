<script setup lang="ts">
import type { H3Error } from 'h3';

const { error } = defineProps<{ error: H3Error }>();

const defaultError: Record<number, { data: { detail: string } }> = {
  404: {
    data: { detail: 'The page you\'re looking for doesn\'t exist.' },
  },
  500: {
    data: { detail: 'An unexpected error occurred.' },
  },
};

const errorInfo = defaultError[error.statusCode] ?? defaultError[500]!;
const statusMessage = error.statusMessage;
const message = errorInfo.data.detail;
</script>

<template>
  <NuxtLayout>
    <div class="flex flex-col items-center justify-center text-center gap-2 flex-1">
      <Icon
        name="lucide:ghost"
        size="50"
        class="mb-4"
        aria-hidden="true"
      />
      <h1 class="text-xl font-semibold">
        {{ statusMessage }}
      </h1>
      <p class="opacity-60 text-sm">
        {{ message }}
      </p>
      <BaseHomeLink class="mt-8" />
    </div>
  </NuxtLayout>
</template>
