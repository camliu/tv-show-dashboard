<template>
  <div class="w-full flex sm:flex-row flex-col items-center gap-2  sm:gap-10">
    <NuxtLink
      to="/"
      aria-label="TV Show home"
      class="flex items-center gap-1 text-xl font-semibold"
    >
      <Icon
        name="lucide:fish-symbol"
        class="size-10"
      />
      TV Show
    </NuxtLink>

    <LayoutHeaderSearch />
  </div>
</template>
