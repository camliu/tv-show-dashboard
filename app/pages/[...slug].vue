<template>
  <div class="flex flex-col items-center justify-center text-center gap-6 flex-1">
    <Icon
      name="lucide:send"
      size="80"
      class="text-muted-color"
      aria-hidden="true"
    />
    <div class="flex flex-col gap-2">
      <h1 class="text-4xl font-semibold">
        Page not found
      </h1>
      <p class="text-muted-color">
        The page you're looking for doesn't exist.
      </p>
    </div>
    <NuxtLink
      to="/"
      class="flex items-center gap-2 py-2 px-4 rounded-full
      text-white bg-zinc-900 hover:bg-zinc-800 transition-colors duration-300 mt-8"
    >
      <Icon
        name="lucide:arrow-left"
        size="20"
      />
      Go back home
    </NuxtLink>
  </div>
</template>
