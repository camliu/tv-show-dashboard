<script setup lang="ts">
const { genre, shows } = defineProps<{
  genre: string
  shows: Show[]
}>();
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
        <ShowCard :show="show" />
        <template #placeholder>
          <ShowCardSkeleton />
        </template>
      </BaseDeferred>
    </BaseCarousel>
  </section>
</template>
