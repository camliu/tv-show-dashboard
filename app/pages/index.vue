<script setup lang="ts">
const { groupedShows, status, error } = useShows();

if (error.value) throw error.value;
</script>

<template>
  <div class="flex flex-col gap-14 mb-20">
    <h1 class="sr-only">
      TV Show Dashboard
    </h1>
    <ClientOnly>
      <template v-if="status === 'pending'">
        <ShowsGroupSkeleton
          v-for="n in 4"
          :key="n"
        />
      </template>
      <ShowsGroup
        v-for="[genre, items] in groupedShows"
        v-else
        :key="genre"
        :genre="genre"
        :shows="items"
      />
    </ClientOnly>
  </div>
</template>
