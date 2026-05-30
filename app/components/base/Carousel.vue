<script setup lang="ts">
const container = useTemplateRef<HTMLElement>('container');
const scrollContainer = useTemplateRef<HTMLElement>('scrollContainer');
const {
  isHovered, atStart, atEnd, scrollRight, scrollToStart,
} = useScrollArrows({
  container,
  scrollContainer,
});

const arrowBase = 'absolute inset-y-0 z-10 flex items-center w-10 p-0 border-none cursor-pointer text-black from-white/85 to-transparent';
</script>

<template>
  <div
    ref="container"
    class="relative"
  >
    <Transition name="fade">
      <button
        v-if="isHovered && !atStart"
        :class="[arrowBase, 'left-0 bg-linear-to-r justify-start']"
        aria-hidden="true"
        tabindex="-1"
        @click="scrollToStart"
      >
        <Icon
          name="lucide:chevron-left"
          size="24"
        />
      </button>
    </Transition>

    <div
      ref="scrollContainer"
      class="flex overflow-x-auto gap-4 no-scrollbar"
      tabindex="0"
    >
      <slot :scroll-container="scrollContainer" />
    </div>

    <Transition name="fade">
      <button
        v-if="isHovered && !atEnd"
        :class="[arrowBase, 'right-0 bg-linear-to-l justify-end']"
        aria-hidden="true"
        tabindex="-1"
        @click="scrollRight"
      >
        <Icon
          name="lucide:chevron-right"
          size="24"
        />
      </button>
    </Transition>
  </div>
</template>

<style scoped>
.no-scrollbar {
  scrollbar-width: none;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
