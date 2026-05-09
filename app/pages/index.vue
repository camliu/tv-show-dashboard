<script setup lang="ts">
const { groupedShows, error, pending } = useShowList();
</script>

<template>
  <div>
    <h1>Shows</h1>

    <div v-if="pending">
      Loading shows...
    </div>

    <div
      v-else-if="error"
      class="error-box"
    >
      <p>Could not load shows: {{ error.statusMessage }}</p>
    </div>

    <template v-else>
      <ShowGroup
        v-for="([genre, items], i) in groupedShows"
        :key="genre"
        :genre="genre"
        :shows="items"
        :is-first="i === 0"
      />
    </template>
  </div>
</template>
