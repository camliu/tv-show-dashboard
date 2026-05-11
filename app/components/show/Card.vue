<script setup lang="ts">
const { show, eager = false } = defineProps<{
  show: Show
  eager?: boolean
}>();

const loaded = ref(!show.image);
</script>

<template>
  <div class="relative shrink-0 w-52">
    <ShowCardSkeleton
      v-if="show.image && !loaded"
      class="absolute top-0 left-0 z-10"
    />
    <NuxtLink
      :to="`/shows/${show.id}`"
      class="group w-52 flex flex-col gap-1.5"
      :class="{ invisible: show.image && !loaded }"
    >
      <div
        class="h-72 w-52 rounded-lg overflow-hidden outline-2 outline-transparent
      group-hover:outline-white transition-[outline-color]"
      >
        <LazyShowImagePlaceholder v-if="!show.image" />
        <NuxtImg
          v-if="show.image"
          :src="show.image"
          :alt="show.name"
          width="210"
          height="295"
          format="webp"
          densities="1"
          :loading="eager ? 'eager' : 'lazy'"
          :fetchpriority="eager ? 'high' : 'auto'"
          :preload="eager"
          class="h-full object-cover transition-transform duration-300 group-hover:scale-105"
          @load="loaded = true"
        />
      </div>
      <div class="flex flex-col gap-0.5 font-medium">
        <h3>{{ show.name }}</h3>
        <p class="flex items-center gap-1 text-sm text-zinc-500">
          <Icon
            name="lucide:star"
            class="size-4"
            aria-hidden="true"
          />
          <span>{{ show.rating != null ? show.rating.toFixed(1) : '—' }}</span>
        </p>
      </div>
    </NuxtLink>
  </div>
</template>
