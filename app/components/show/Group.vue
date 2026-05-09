<script setup lang="ts">
const { genre, shows, isFirst } = defineProps<{
  genre: string
  shows: Show[]
  isFirst: boolean
}>();
</script>

<template>
  <section class="flex flex-col gap-2">
    <h2>{{ genre }}</h2>
    <div
      class="flex flex-row overflow-x-auto gap-4"
      tabindex="0"
    >
      <ShowCard
        v-for="(show, i) in shows"
        :key="show.id"
        :show="show"
        :eager="isFirst && i < 6"
      />
    </div>
  </section>
</template>
