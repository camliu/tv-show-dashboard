<template>
  <div class="flex min-h-screen flex-col overflow-x-hidden">
    <header class="w-full">
      <div class="container mx-auto p-4">
        <LayoutHeader />
      </div>
    </header>
    <main class="flex-1 flex flex-col container mx-auto overflow-hidden">
      <slot />
    </main>
  </div>
</template>
