<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core';

const { rootMargin, root } = defineProps<{
  rootMargin?: string
  root?: HTMLElement | null
}>();

const container = useTemplateRef<HTMLElement>('container');
const isVisible = ref(false);

const { stop } = useIntersectionObserver(
  container,
  ([entry]) => {
    if (entry?.isIntersecting) {
      isVisible.value = true;
      stop();
    }
  },
  {
    root: root ?? undefined,
    rootMargin,
  },
);
</script>

<template>
  <div ref="container">
    <slot v-if="isVisible" />
    <slot
      v-else
      name="placeholder"
    />
  </div>
</template>
