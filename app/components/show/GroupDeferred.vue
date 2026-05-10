<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core';

defineProps<{
  genre: string
  shows: Show[]
  isFirst: boolean
}>();

const container = ref<HTMLElement | null>(null);
const isVisible = ref(false);

const { stop } = useIntersectionObserver(
  container,
  ([entry]) => {
    if (entry?.isIntersecting) {
      isVisible.value = true;
      stop();
    }
  },
  { rootMargin: '300px' },
);
</script>

<template>
  <div ref="container">
    <ShowGroup
      v-if="isVisible"
      :genre="genre"
      :shows="shows"
      :is-first="isFirst"
    />
    <ShowGroupSkeleton v-else />
  </div>
</template>
