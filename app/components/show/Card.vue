<script setup lang="ts">
const { show } = defineProps<{
  show: Show
}>();

const loaded = ref(!show.image);
</script>

<template>
  <div class="w-52">
    <ShowCardSkeleton
      v-if="!loaded"
    />
    <NuxtLink
      v-show="loaded"
      :to="`/shows/${show.id}`"
      class="group flex flex-col gap-1.5"
    >
      <div class="h-72 overflow-hidden rounded-lg">
        <NuxtImg
          v-slot="{ imgAttrs }"
          :src="show.image"
          width="210"
          height="295"
          format="webp"
          densities="1"
          custom
        >
          <img
            v-if="show.image"
            v-bind="imgAttrs"
            :alt="show.name"
            class="transition-transform duration-300 hover:scale-105"
            @load="loaded = true"
          >
          <LazyBaseImagePlaceholder v-else />
        </NuxtImg>
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
