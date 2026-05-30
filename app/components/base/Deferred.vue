<script setup lang="ts">
const { rootMargin, root } = defineProps<{
  rootMargin?: string
  root?: HTMLElement | null
}>();

const container = useTemplateRef<HTMLElement>('container');
const isVisible = useVisibility(container, {
  root,
  rootMargin,
});
</script>

<template>
  <div ref="container">
    <slot v-if="isVisible" />
    <slot
      v-else
      name="placeholder"
    />
  </div>
</template>
