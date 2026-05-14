<script setup lang="ts">
const route = useRoute();
const { data: showData, error } = await useShow(route.params.id as string);

if (error.value) throw error.value;
if (!showData.value) throw createError({ statusCode: 404 });

const show = showData.value;

const { loaded: imgLoaded } = useImgLoad(`img-loaded-${route.params.id}`, !!show.imageOriginal);

useSeoMeta({
  title: `${show.name} — TV Show Dashboard`,
});
</script>

<template>
  <div class="flex flex-1 flex-col">
    <div class="flex flex-1 items-center">
      <div class="flex flex-col sm:flex-row gap-6 sm:gap-14">
        <div class="relative sm:w-60 md:w-95 sm:h-90 md:h-140 shrink-0 rounded-xl overflow-hidden">
          <LazyBaseImagePlaceholder v-if="!show!.imageOriginal" />
          <LazyNuxtImg
            v-else
            v-slot="{ imgAttrs, src }"
            custom
            :src="show!.imageOriginal"
            width="380"
            height="560"
            format="webp"
            densities="1"
          >
            <img
              ref="imgEl"
              v-bind="imgAttrs"
              :src="src"
              :alt="show!.name"
              loading="eager"
              fetchpriority="high"
              class="h-full object-cover"
              @load="imgLoaded = true"
            >
            <div
              v-if="!imgLoaded"
              class="absolute inset-0"
            >
              <Skeleton
                width="100%"
                height="100%"
                border-radius="0"
              />
            </div>
          </LazyNuxtImg>
        </div>

        <LazyShowProfile :show="show!" />
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
