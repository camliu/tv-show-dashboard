<script setup lang="ts">
const { show, eager = false } = defineProps<{
  show: Show
  eager?: boolean
}>();

const loaded = ref(!show.image);
</script>

<template>
  <NuxtLink
    :to="`/shows/${show.id}`"
    class="group shrink-0 w-52 flex flex-col gap-2"
  >
    <div
      class="h-72 w-52 rounded-lg overflow-hidden outline-2 outline-transparent
      group-hover:outline-white transition-[outline-color]"
    >
      <ShowCardSkeleton v-if="show.image && !loaded" />
      <LazyShowImagePlaceholder v-else-if="!show.image" />
      <NuxtImg
        v-if="show.image"
        :src="show.image"
        :alt="show.name"
        width="210"
        height="295"
        format="webp"
        :loading="eager ? 'eager' : 'lazy'"
        :fetchpriority="eager ? 'high' : 'auto'"
        :preload="eager"
        :class="[
          'h-full object-cover transition-transform duration-300 group-hover:scale-105',
          { 'opacity-0': !loaded },
        ]"
        @load="loaded = true"
      />
    </div>
    <div class="flex flex-col gap-1">
      <h3 v-if="loaded">
        {{ show.name }}
      </h3>
      <p
        v-if="loaded"
        class="flex items-center gap-1 text-sm"
      >
        <Icon
          name="lucide:star"
          class="size-4"
          aria-hidden="true"
        />
        <span>{{ show.rating ?? '—' }}</span>
      </p>
    </div>
  </NuxtLink>
</template>
