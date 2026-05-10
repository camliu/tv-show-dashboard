<script setup lang="ts">
const { show } = defineProps<{ show: Show }>();
</script>

<template>
  <div class="flex items-center gap-3">
    <NuxtImg
      v-if="show.image"
      :src="show.image"
      :alt="show.name"
      width="48"
      height="48"
      loading="lazy"
      class="rounded object-cover shrink-0 size-12"
    />
    <div
      v-else
      class="size-12 rounded bg-zinc-100 shrink-0"
    />
    <span>{{ show.name }}</span>
  </div>
</template>
