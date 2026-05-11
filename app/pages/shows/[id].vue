<script setup lang="ts">
const route = useRoute();
const { data: show, error } = await useShowDetail(route.params.id as string);

if (error.value) throw error.value;

const { loaded: imgLoaded } = useImgLoad(`img-loaded-${route.params.id}`, !!show.value?.imageOriginal);

useSeoMeta({
  title: `${show.value!.name} — TV Show Dashboard`,
});
</script>

<template>
  <div class="flex flex-1 flex-col">
    <div class="flex flex-1 items-center">
      <div class="flex flex-col sm:flex-row gap-6 sm:gap-14">
        <div class="sm:w-60 md:w-95 sm:h-90 md:h-140 shrink-0 rounded-xl overflow-hidden">
          <LazyShowDetailSkeleton v-if="show!.imageOriginal && !imgLoaded" />
          <LazyShowImagePlaceholder v-else-if="!show!.imageOriginal" />
          <NuxtImg
            v-if="show!.imageOriginal"
            ref="imgEl"
            :src="show!.imageOriginal"
            :alt="show!.name"
            width="380"
            height="560"
            format="webp"
            densities="1"
            loading="eager"
            fetchpriority="high"
            :class="['h-full object-cover', { 'opacity-0': !imgLoaded }]"
            @load="imgLoaded = true"
          />
        </div>

        <LazyShowInfo :show="show!" />
      </div>
    </div>
    <NuxtLink
      to="/"
      class="inline-flex items-center gap-1 text-sm opacity-60
             hover:opacity-100 transition-opacity my-2 py-2"
    >
      <Icon
        name="lucide:arrow-left"
        size="16"
        aria-hidden="true"
      />
      Back to Shows
    </NuxtLink>
  </div>
</template>
