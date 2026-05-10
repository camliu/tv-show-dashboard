<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core';

const props = defineProps<{
  genre: string
  shows: Show[]
  isFirst: boolean
}>();

const container = ref<HTMLElement | null>(null);
const isVisible = useState(`group-visible-${props.genre}`, () => props.isFirst);

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
