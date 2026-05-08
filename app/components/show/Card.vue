<script setup lang="ts">
import type { TvmazeShow } from '~~/types/tvmaze';

const props = defineProps<{
  show: TvmazeShow
}>();
</script>

<template>
  <div>
    <h2>{{ props.show.name }}</h2>
    <NuxtImg
      :src="show.image?.medium"
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
