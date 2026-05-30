<script setup lang="ts">
const { season } = defineProps<{
  season: Season
}>();
</script>

<template>
  <div>
    <div class="relative h-72 w-52 overflow-hidden rounded-lg">
      <NuxtImg
        v-if="season.image"
        :src="season.image"
        :alt="season.name"
        width="210"
        height="295"
        format="webp"
        densities="1"
      />
      <LazyBaseImageFallback v-else />
    </div>
    <h3 class="font-medium pt-2">
      {{ season.name }}
    </h3>
  </div>
</template>
