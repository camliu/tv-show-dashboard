<template>
  <div class="flex  min-h-screen flex-col">
    <header class="w-full">
      <div class="container mx-auto p-4">
        <LayoutHeader />
      </div>
    </header>
    <main class="flex-1 container mx-auto p-4">
      <slot />
    </main>
  </div>
</template>
