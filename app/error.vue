<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{ error: NuxtError }>();

const is404 = computed(() => props.error.statusCode === 404);
</script>

<template>
  <NuxtLayout>
    <div class="flex flex-col items-center justify-center text-center gap-2 flex-1">
      <Icon
        name="lucide:send"
        size="50"
        class="mb-4"
        aria-hidden="true"
      />
      <h1 class="text-xl font-semibold">
        {{ is404 ? 'Page not found' : 'Something went wrong' }}
      </h1>
      <p class="opacity-60 text-sm">
        {{ is404 ? "The page you're looking for doesn't exist." : 'An unexpected error occurred.' }}
      </p>
      <BaseBackLink class="mt-8" />
    </div>
  </NuxtLayout>
</template>
