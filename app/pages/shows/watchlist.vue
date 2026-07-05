<script setup lang="ts">
const { watchlist } = useWatchlistPinia();
</script>

<template>
  <div class="flex flex-col gap-3 mb-10">
    <h1 class="text-lg font-bold text-zinc-800">
      Watchlist
    </h1>
    <ClientOnly>
      <div
        v-if="watchlist.length"
        class="flex flex-wrap gap-4"
      >
        <ShowsCard
          v-for="show in watchlist"
          :key="show.id"
          :show="show"
          heading-level="h2"
        />
      </div>
      <div
        v-else
        class="flex flex-col items-center justify-center text-center gap-2 py-16"
      >
        <p class="opacity-60 text-sm">
          Your watchlist is empty. Bookmark a show to see it here.
        </p>
      </div>
    </ClientOnly>
  </div>
</template>
