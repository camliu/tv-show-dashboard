<template>
  <div class="flex flex-col gap-3">
    <Skeleton
      width="8rem"
      height="1.75rem"
    />
    <div class="flex gap-4">
      <ShowsCardSkeleton
        v-for="n in 6"
        :key="n"
      />
    </div>
  </div>
</template>
