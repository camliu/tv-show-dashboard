<template>
  <div class="mb-6">
    <Skeleton
      width="8rem"
      height="1.5rem"
      class="mb-3"
    />
    <div class="flex gap-4">
      <ShowCardSkeleton
        v-for="n in 6"
        :key="n"
      />
    </div>
  </div>
</template>
