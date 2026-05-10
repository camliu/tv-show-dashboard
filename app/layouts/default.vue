<template>
  <div class="flex min-h-screen flex-col overflow-x-hidden">
    <header class="w-full">
      <div class="container my-8 mx-auto">
        <LayoutHeader />
      </div>
    </header>
    <main class="container mx-auto flex-1 flex flex-col overflow-hidden">
      <slot />
    </main>
    <footer class="w-full border-t border-zinc-200">
      <div class="container mx-auto">
        <LayoutFooter />
      </div>
    </footer>
  </div>
</template>
