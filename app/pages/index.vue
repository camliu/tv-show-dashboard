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

    <div v-else-if="data">
      <ShowCard
        v-for="show in data"
        :key="show.id"
        :show="show"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { data, error, pending } = await useFetch('/api/shows');
</script>
