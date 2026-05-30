<script setup lang="ts">
const { show } = defineProps<{ show: Show }>();

const {
  addToWatchlist, removeFromWatchlist, isInWatchlist,
} = useWatchlistPinia();

function handleClick() {
  if (isInWatchlist(show)) {
    removeFromWatchlist(show);
  }
  else {
    addToWatchlist(show);
  }
}
</script>

<template>
  <button
    class="cursor-pointer size-icon"
    :aria-label="isInWatchlist(show)
      ? 'Remove from watch list'
      : 'Add to watch list'"
    @click.stop="handleClick"
  >
    <Icon
      name="lucide:bookmark"
      mode="svg"
      :class="[
        'size-6 text-white',
        isInWatchlist(show)
          ? '[&_path]:fill-white! [&_path]:stroke-none!'
          : '[&_path]:fill-none! [&_path]:stroke-current! [&_path]:hover:fill-white/50!',
      ]"
      aria-hidden="true"
    />
  </button>
</template>
