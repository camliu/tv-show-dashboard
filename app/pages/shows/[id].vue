<script setup lang="ts">
const route = useRoute();
const { data: show, error } = await useShowDetail(route.params.id as string);

const imgLoaded = ref(!show.value?.imageOriginal);

useSeoMeta({
  title: show.value ? `${show.value.name} — TV Show Dashboard` : 'Show Not Found',
});
</script>

<template>
  <div class="flex flex-1 flex-col">
    <div
      v-if="error"
      class="text-red-400"
    >
      Could not load show: {{ error.message }}
    </div>

    <div
      v-else-if="show"
      class="flex flex-1 items-center"
    >
      <div class="flex gap-14">
        <div class="w-95 h-140 shrink-0 rounded-xl overflow-hidden">
          <ShowDetailSkeleton v-if="show.imageOriginal && !imgLoaded" />
          <LazyShowImagePlaceholder v-else-if="!show.imageOriginal" />
          <NuxtImg
            v-if="show.imageOriginal"
            :src="show.imageOriginal"
            :alt="show.name"
            width="1360"
            height="2000"
            format="webp"
            loading="eager"
            fetchpriority="high"
            :class="['h-full object-cover', { 'opacity-0': !imgLoaded }]"
            @load="imgLoaded = true"
          />
        </div>

        <ShowInfo :show="show" />
      </div>
    </div>
    <NuxtLink
      to="/"
      class="inline-flex items-center gap-2 text-md opacity-60
             hover:opacity-100 transition-opacity my-2 py-2"
    >
      <Icon
        name="lucide:arrow-left"
        size="1.25rem"
        aria-hidden="true"
      />
      Back to Shows
    </NuxtLink>
  </div>
</template>
