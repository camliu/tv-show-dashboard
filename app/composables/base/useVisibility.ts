import { useIntersectionObserver } from '@vueuse/core';

export function useVisibility(
  container: Ref<HTMLElement | null>,
  options?: {
    root?: HTMLElement | null
    rootMargin?: string
  },
) {
  const isVisible = ref(false);

  const { stop } = useIntersectionObserver(
    container,
    ([entry]) => {
      if (entry?.isIntersecting) {
        isVisible.value = true;
        stop();
      }
    },
    {
      root: options?.root ?? undefined,
      rootMargin: options?.rootMargin,
    },
  );

  return isVisible;
}
