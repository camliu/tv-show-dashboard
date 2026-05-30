<script setup lang="ts">
const links = [
  {
    label: 'Watchlist',
    to: '/shows/watchlist',
  },
];
</script>

<template>
  <nav>
    <ul class="flex items-center gap-4">
      <li
        v-for="link in links"
        :key="link.to"
      >
        <NuxtLink
          :to="link.to"
          class="text-sm font-medium hover:text-zinc-600"
        >
          {{ link.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
