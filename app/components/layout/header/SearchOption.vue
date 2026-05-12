<script setup lang="ts">
import { format, parseISO } from 'date-fns';

const { show } = defineProps<{ show: Show }>();
const imgLoaded = ref(false);
</script>

<template>
  <div class="flex items-center gap-3">
    <NuxtImg
      v-if="show.image"
      :src="show.image"
      :alt="show.name"
      width="48"
      height="48"
      format="webp"
      loading="lazy"
      :class="['object-cover rounded size-12', { 'opacity-0': !imgLoaded }]"
      @load="imgLoaded = true"
    />
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
