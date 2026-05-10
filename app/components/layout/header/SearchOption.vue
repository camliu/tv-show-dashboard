<script setup lang="ts">
const { show } = defineProps<{ show: Show }>();

const loaded = ref(!show.image);
</script>

<template>
  <div class="relative flex items-center gap-3">
    <SearchOptionSkeleton
      v-if="show.image && !loaded"
      class="absolute top-0 left-0"
    />
    <div
      class="flex items-center gap-3"
      :class="{ invisible: show.image && !loaded }"
    >
      <NuxtImg
        v-if="show.image"
        :src="show.image"
        :alt="show.name"
        width="48"
        height="48"
        class="rounded object-cover shrink-0 size-12"
        @load="loaded = true"
      />
      <div
        v-else
        class="size-12 rounded bg-zinc-100 shrink-0"
      />
      <span>{{ show.name }}</span>
    </div>
  </div>
</template>
