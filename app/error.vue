<script setup lang="ts">
import type { H3Error } from 'h3';

const props = defineProps<{ error: H3Error }>();

const errorMap: Record<number, {
  message: string
  detail: string
}> = {
  404: {
    message: 'Page not found',
    detail: 'The page you\'re looking for doesn\'t exist.',
  },
  500: {
    message: 'Something went wrong',
    detail: 'An unexpected error occurred.',
  },
};

const errorInfo = computed(() => errorMap[props.error.statusCode] ?? errorMap[500]!);
const message = computed(() => props.error.statusMessage || errorInfo.value.message);
const detail = computed(() => errorInfo.value.detail);
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
        {{ message }}
      </h1>
      <p class="opacity-60 text-sm">
        {{ detail }}
      </p>
      <BaseHomeLink class="mt-8" />
    </div>
  </NuxtLayout>
</template>
