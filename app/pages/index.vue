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
        <ShowGroupSkeleton
          v-for="n in 4"
          :key="n"
        />
      </template>
      <BaseDeferred
        v-for="[genre, items] in groupedShows"
        v-else
        :key="genre"
        root-margin="300px"
      >
        <ShowGroup
          :genre="genre"
          :shows="items"
        />
        <template #placeholder>
          <ShowGroupSkeleton />
        </template>
      </BaseDeferred>
    </ClientOnly>
  </div>
</template>
