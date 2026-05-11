<script setup lang="ts">
const { show } = defineProps<{ show: Show }>();
const imgLoaded = ref(false);
</script>

<template>
  <div class="flex items-center gap-3">
    <div class="size-12 rounded bg-zinc-100 shrink-0 overflow-hidden">
      <NuxtImg
        v-if="show.image"
        :src="show.image"
        :alt="show.name"
        width="48"
        height="48"
        loading="lazy"
        :class="['object-cover size-12', { 'opacity-0': !imgLoaded }]"
        @load="imgLoaded = true"
      />
    </div>
    <span>{{ show.name }}</span>
  </div>
</template>
