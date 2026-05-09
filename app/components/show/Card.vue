<script setup lang="ts">
const { show } = defineProps<{
  show: Show
}>();
</script>

<template>
  <div>
    <h2>{{ show.name }}</h2>
    <NuxtImg
      :src="show.image ?? ''"
      :alt="show.name"
      width="210"
      height="295"
      loading="lazy"
      format="webp"
      placeholder=""
      class="rounded-lg"
    />
  </div>
</template>
