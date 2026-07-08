<script setup lang="ts">
const { show, headingLevel = 'h3' } = defineProps<{
  show: Show
  headingLevel?: 'h2' | 'h3'
}>();

const emit = defineEmits<{
  load: []
}>();
</script>

<template>
  <div class="relative">
    <NuxtLink
      :to="`/shows/${show.id}`"
      class="group flex flex-col gap-1.5"
    >
      <div class="relative h-72 w-52 overflow-hidden rounded-lg">
        <NuxtImg
          v-if="show.image"
          :src="show.image"
          :alt="show.name"
          width="210"
          height="295"
          format="webp"
          densities="1"
          class="transition-transform duration-300 hover:scale-105"
          @load="emit('load')"
        />
        <LazyBaseImageFallback v-else />
      </div>
      <div class="flex flex-col gap-0.5 font-medium">
        <component :is="headingLevel">{{ show.name }}</component>
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
    <ShowsBookmark
      :show="show"
      class="absolute top-2 right-2"
    />
  </div>
</template>
