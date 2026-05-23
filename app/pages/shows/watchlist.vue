<script setup lang="ts">
const { watchlist } = useWatchlistPinia();
</script>

<template>
  <div class="flex flex-col gap-3 mb-10">
    <h1 class="text-lg font-bold text-zinc-800">
      Watchlist
    </h1>
    <ClientOnly>
      <div class="flex flex-wrap gap-4">
        <ShowCard
          v-for="show in watchlist"
          :key="show.id"
          :show="show"
          heading-level="h2"
        />
      </div>
    </ClientOnly>
  </div>
</template>
