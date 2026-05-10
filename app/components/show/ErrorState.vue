<script setup lang="ts">
defineProps<{
  subject?: string
  context?: string
}>();
</script>

<template>
  <div
    role="alert"
    class="flex flex-1 items-center justify-center flex-col gap-2 text-center"
  >
    <Icon
      name="lucide:ghost"
      size="50"
      class="mb-4"
      aria-hidden="true"
    />
    <h1 class="text-xl font-semibold">
      {{ subject }}
    </h1>
    <p class="opacity-60 text-sm">
      {{ context }}
    </p>
    <BaseBackLink class="mt-8" />
  </div>
</template>
