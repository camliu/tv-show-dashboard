<script setup lang="ts">
const { show } = defineProps<{
  show: Show
}>();

const loaded = ref(!show.image);
</script>

<template>
  <div>
    <ShowCardSkeleton
      v-if="!loaded && show.image"
    />
    <NuxtLink
      v-show="loaded"
      :to="`/shows/${show.id}`"
      class="group flex flex-col gap-1.5"
    >
      <div class="h-72 w-52 overflow-hidden rounded-lg">
        <NuxtImg
          v-if="show.image"
          :src="show.image"
          :alt="show.name"
          width="210"
          height="295"
          format="webp"
          densities="1"
          class="transition-transform duration-300 hover:scale-105"
          @load="loaded = true"
        />
        <LazyBaseImageFallback v-else />
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
