<script setup lang="ts">
const { cast } = defineProps<{
  cast: Actor[]
}>();
</script>

<template>
  <div class="flex flex-col gap-2">
    <h2
      class="text-lg font-semibold"
    >
      Cast
    </h2>
    <BaseCarousel>
      <div
        v-for="actor in cast"
        :key="actor.id"
        class="flex flex-col shrink-0 w-30"
      >
        <NuxtImg
          v-slot="{ src, imgAttrs }"
          :src="actor.image"
          format="webp"
          densities="1"
          width="200"
          height="200"
          custom
        >
          <img
            v-if="actor.image"
            v-bind="imgAttrs"
            :src="src"
            :alt="actor.name"
            class="rounded-full size-30 object-cover mb-2"
          >
          <LazyBaseImageFallback
            v-else
            class="rounded-full size-30"
          />
        </NuxtImg>
        <h3 class="font-medium">
          {{ actor.name }}
        </h3>
        <p class="text-sm text-zinc-500">
          {{ actor.character }}
        </p>
      </div>
    </BaseCarousel>
  </div>
</template>
