<script setup lang="ts">
const { genre, shows, isFirst } = defineProps<{
  genre: string
  shows: Show[]
  isFirst: boolean
}>();
</script>

<template>
  <section>
    <h2>{{ genre }}</h2>
    <div class="show-list">
      <ShowCard
        v-for="(show, i) in shows"
        :key="show.id"
        :show="show"
        :eager="isFirst && i === 0"
      />
    </div>
  </section>
</template>

<style scoped>
.show-list {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  gap: 1rem;
}
</style>
