<script setup lang="ts">
const { show, eager = false } = defineProps<{
  show: Show
  eager?: boolean
}>();

const loaded = ref(!show.image);
</script>

<template>
  <div class="group shrink-0 w-52">
    <div
      class="h-72 rounded-lg overflow-hidden outline-2 outline-transparent
      group-hover:outline-white transition-[outline-color]"
    >
      <ShowCardSkeleton v-if="show.image && !loaded" />
      <LazyShowCardPlaceholder v-else-if="!show.image" />
      <img
        v-if="show.image"
        :src="show.image"
        :alt="show.name"
        width="210"
        height="295"
        :loading="eager ? 'eager' : 'lazy'"
        :fetchpriority="eager ? 'high' : 'auto'"
        :class="[
          'w-52 h-72 object-cover transition-transform duration-300 group-hover:scale-105',
          { 'sr-only': !loaded },
        ]"
        @load="loaded = true"
      >
    </div>
    <h3 v-if="loaded">
      {{ show.name }}
    </h3>
  </div>
</template>
