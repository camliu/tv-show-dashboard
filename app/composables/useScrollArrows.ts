import { ref, onMounted } from 'vue';

export function useScrollArrows() {
  const scrollContainer = ref<HTMLElement | null>(null);
  const isHovered = ref(false);
  const atStart = ref(true);
  const atEnd = ref(false);

  function updateScrollState() {
    const el = scrollContainer.value;
    if (!el) return;
    atStart.value = el.scrollLeft <= 0;
    atEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
  }

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

  onMounted(updateScrollState);

  return {
    scrollContainer,
    isHovered,
    atStart,
    atEnd,
    updateScrollState,
    scrollRight,
    scrollToStart,
  };
}
