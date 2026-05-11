<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core';

const { show, scrollContainer } = defineProps<{
  show: Show
  scrollContainer: HTMLElement | null
}>();

const card = ref<HTMLElement | null>(null);
const isVisible = ref(false);

const { stop } = useIntersectionObserver(
  card,
  ([entry]) => {
    if (entry?.isIntersecting) {
      isVisible.value = true;
      stop();
    }
  },
  {
    root: scrollContainer,
    rootMargin: '0px 300px 0px 0px',
  },
);
</script>

<template>
  <div
    ref="card"
    class="shrink-0 w-52"
  >
    <ShowCard
      v-if="isVisible"
      :show="show"
    />
    <ShowCardSkeleton v-else />
  </div>
</template>
