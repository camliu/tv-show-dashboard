<template>
  <div class="flex min-h-screen flex-col overflow-x-hidden">
    <header class="w-full">
      <div class="container my-4 sm:my-8 mx-auto px-4">
        <LayoutHeader />
      </div>
    </header>
    <main class="container mx-auto px-4 flex-1 flex flex-col overflow-x-hidden">
      <slot />
    </main>
    <footer class="w-full">
      <div class="container border-t border-zinc-200 mx-auto px-4">
        <LayoutFooter />
      </div>
    </footer>
  </div>
</template>
