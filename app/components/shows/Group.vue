<script setup lang="ts">
const { genre, shows } = defineProps<{
  genre: string
  shows: Show[]
}>();

const loadedIds = ref(new Set<number>());

function isLoaded(show: Show) {
  return !show.image || loadedIds.value.has(show.id);
}
</script>

<template>
  <section
    class="relative flex flex-col gap-3"
    aria-roledescription="carousel"
  >
    <h2 class="text-lg font-bold text-zinc-800">
      {{ genre }}
    </h2>
    <BaseCarousel v-slot="{ scrollContainer }">
      <BaseDeferred
        v-for="show in shows"
        :key="show.id"
        :root="scrollContainer"
        root-margin="0px 300px 0px 0px"
      >
        <ShowsCardSkeleton v-if="!isLoaded(show)" />
        <ShowsCard
          v-show="isLoaded(show)"
          :show="show"
          @load="loadedIds.add(show.id)"
        />
        <template #placeholder>
          <ShowsCardSkeleton />
        </template>
      </BaseDeferred>
    </BaseCarousel>
  </section>
</template>
