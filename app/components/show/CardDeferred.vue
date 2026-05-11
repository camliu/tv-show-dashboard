<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core';

const { show, eager = false } = defineProps<{
  show: Show
  eager?: boolean
}>();

const root = inject<Ref<HTMLElement | null>>('scrollRoot');
const card = ref<HTMLElement | null>(null);
const isVisible = ref(eager);

if (!eager) {
  const { stop } = useIntersectionObserver(
    card,
    ([entry]) => {
      if (entry?.isIntersecting) {
        isVisible.value = true;
        stop();
      }
    },
    {
      root,
      rootMargin: '0px 300px 0px 0px',
    },
  );
}
</script>

<template>
  <div
    ref="card"
    class="shrink-0 w-52"
  >
    <ShowCard
      v-if="isVisible"
      :show="show"
      :eager="eager"
    />
    <ShowCardSkeleton v-else />
  </div>
</template>
