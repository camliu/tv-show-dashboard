import { useScroll, useElementHover } from '@vueuse/core';

interface ScrollArrowsOptions {
  container: Ref<HTMLElement | null>
  scrollContainer: Ref<HTMLElement | null>
}

export function useScrollArrows({ container, scrollContainer }: ScrollArrowsOptions) {
  const isHovered = useElementHover(container);
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
