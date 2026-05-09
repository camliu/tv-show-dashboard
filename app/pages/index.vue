<script setup lang="ts">
const { groupedShows, status } = useShowList();
</script>

<template>
  <div class="flex flex-col gap-4">
    <h1>Shows</h1>

    <NuxtErrorBoundary>
      <template #error="{ error }">
        <p>Could not load shows: {{ error.message }}</p>
      </template>

      <ClientOnly>
        <div v-if="status === 'pending'">
          <ShowGroupSkeleton
            v-for="n in 4"
            :key="n"
          />
        </div>

        <template v-else>
          <ShowGroup
            v-for="([genre, items], i) in groupedShows"
            :key="genre"
            :genre="genre"
            :shows="items"
            :is-first="i < 2"
          />
        </template>
      </ClientOnly>
    </NuxtErrorBoundary>
  </div>
</template>
