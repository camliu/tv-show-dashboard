import type { Ref } from 'vue';
import { toRef } from 'vue';
import { useScroll, useElementHover } from '@vueuse/core';

export function useScrollArrows(section: Ref<HTMLElement | null>,
  scrollContainer: Ref<HTMLElement | null>) {
  const isHovered = useElementHover(section);
  const { arrivedState } = useScroll(scrollContainer);

  function scrollRight() {
    const el = scrollContainer.value;
    if (!el) return;
    el.scrollBy({
      left: el.clientWidth * 0.8,
      behavior: 'smooth',
    });
  }

  function scrollToStart() {
    scrollContainer.value?.scrollTo({
      left: 0,
      behavior: 'smooth',
    });
  }

  return {
    isHovered,
    atStart: toRef(arrivedState, 'left'),
    atEnd: toRef(arrivedState, 'right'),
    scrollRight,
    scrollToStart,
  };
}
