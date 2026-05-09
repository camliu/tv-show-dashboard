<script setup lang="ts">
const { show, eager = false } = defineProps<{
  show: Show
  eager?: boolean
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
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : 'auto'"
      :preload="eager"
      format="webp"
      :placeholder="eager ? false : ''"
      class="rounded-lg"
    />
  </div>
</template>
