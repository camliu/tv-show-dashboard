<script setup lang="ts">
const { seasons } = defineProps<{
  seasons: Season[]
}>();
</script>

<template>
  <div class="flex flex-col gap-2">
    <h2 class="text-lg font-medium">
      Seasons
    </h2>
    <BaseCarousel v-slot="{ scrollContainer }">
      <div
        v-for="season in seasons"
        :key="season.id"
        :root="scrollContainer"
        root-margin="0px 300px 0px 0px"
      >
        <SeasonsCard
          for
          :season="season"
        />
      </div>
    </BaseCarousel>
  </div>
</template>
