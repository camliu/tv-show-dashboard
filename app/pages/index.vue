<script setup lang="ts">
const { groupedShows, status } = useShowList();
</script>

<template>
  <div class="flex flex-col gap-8 mb-20">
    <h1 class="sr-only">
      TV Show Dashboard
    </h1>
    <ClientOnly>
      <template v-if="status === 'pending'">
        <ShowGroupSkeleton
          v-for="n in 4"
          :key="n"
        />
      </template>

      <template v-else>
        <ShowGroupDeferred
          v-for="([genre, items], i) in groupedShows"
          :key="genre"
          :genre="genre"
          :shows="items"
          :is-first="i < 2"
        />
      </template>
    </ClientOnly>
  </div>
</template>
