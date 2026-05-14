<script setup lang="ts">
import { format, parseISO } from 'date-fns';

const { show } = defineProps<{ show: Show }>();
</script>

<template>
  <div class="flex items-center gap-3">
    <NuxtImg
      v-slot="{ imgAttrs, isLoaded }"
      :src="show.image"
      width="48"
      height="48"
      format="webp"
      custom
    >
      <img
        v-if="show.image"
        v-bind="imgAttrs"
        :alt="show.name"
        loading="lazy"
        :class="['rounded size-12 text-transparent', { 'bg-zinc-100': !isLoaded }]"
      >
      <div
        v-else
        class="size-12 shrink-0 rounded bg-zinc-100"
      />
    </NuxtImg>
    <div class="flex flex-col gap-0.5">
      <span>{{ show.name }}</span>
      <time
        v-if="show.premiered != null"
        :datetime="show.premiered"
        class="text-xs text-zinc-400"
      >
        {{ format(parseISO(show.premiered), 'yyyy') }}
      </time>
      <span
        v-else
        class="text-xs text-zinc-400"
      >—</span>
    </div>
  </div>
</template>
