<script setup lang="ts">
import { format, parseISO } from 'date-fns';
import DOMPurify from 'isomorphic-dompurify';

const { show } = defineProps<{ show: Show }>();

const airInfo = computed(() => {
  try {
    if (!show.premiered) return '—';
    const start = format(parseISO(show.premiered), 'MMMM d, yyyy');
    const end = show.ended ? format(parseISO(show.ended), 'MMMM d, yyyy') : null;
    return end ? `${start} — ${end}` : `${start} — present`;
  }
  catch {
    return '—';
  }
});

const sanitizedSummary = computed(() => DOMPurify.sanitize(show.summary ?? ''));
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <h1 class="text-4xl font-bold">
          {{ show.name }}
        </h1>

        <div class="flex items-center gap-2">
          <Icon
            name="lucide:star"
            size="1rem"
            aria-hidden="true"
          />
          <span>{{ show.rating != null ? show.rating.toFixed(1) : '—' }}</span>
        </div>
      </div>

      <div class="flex flex-wrap">
        <span
          v-for="genre in show.genres"
          :key="genre"
          class="text-sm after:content-['·'] after:mx-2
          last:after:content-none opacity-60 font-medium"
        >
          {{ genre }}
        </span>
        <span
          v-if="!show.genres.length"
          class="opacity-60 font-medium text-sm"
        >No genres listed</span>
      </div>

      <dl class="flex flex-col gap-2 text-sm">
        <div class="flex gap-3">
          <dt class="w-24 shrink-0 opacity-60">
            Status
          </dt>
          <dd class="opacity-80">
            {{ show.status }}
          </dd>
        </div>

        <div class="flex gap-3">
          <dt class="w-24 shrink-0 opacity-60">
            Aired
          </dt>
          <dd class="opacity-80">
            {{ airInfo }}
          </dd>
        </div>

        <div
          v-if="show.network"
          class="flex gap-3"
        >
          <dt class="w-24 shrink-0 opacity-60">
            Network
          </dt>
          <dd class="opacity-80">
            {{ show.network }}
          </dd>
        </div>

        <div
          v-if="show.runtime"
          class="flex gap-3"
        >
          <dt class="w-24 shrink-0 opacity-60">
            Runtime
          </dt>
          <dd class="opacity-80">
            {{ show.runtime }} min
          </dd>
        </div>

        <div class="flex gap-3">
          <dt class="w-24 shrink-0 opacity-60">
            Language
          </dt>
          <dd class="opacity-80">
            {{ show.language }}
          </dd>
        </div>
      </dl>
    </div>

    <div
      v-if="show.summary"
      class="flex flex-col gap-2 max-w-2xl"
    >
      <h2 class="text-lg font-semibold">
        About
      </h2>
      <!-- eslint-disable vue/no-v-html -->
      <div
        class="opacity-70 leading-relaxed [&_p]:mb-3 [&_p:last-child]:mb-0"
        v-html="sanitizedSummary"
      />
      <!-- eslint-enable vue/no-v-html -->
    </div>
  </div>
</template>
