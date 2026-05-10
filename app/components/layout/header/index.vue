<template>
  <div class="w-full flex items-center gap-10">
    <NuxtLink
      to="/"
      aria-label="TV Show home"
      class="flex items-center gap-1 text-xl font-semibold"
    >
      <Icon
        name="lucide:fish-symbol"
        size="40"
      />
      TV Show
    </NuxtLink>

    <LayoutHeaderSearch />
  </div>
</template>
