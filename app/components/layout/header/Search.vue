<script setup lang="ts">
const {
  query, suggestions, searchError, search, select,
} = useShowSearch();

const autocomplete = ref();

function handleFocus() {
  if (!query.value.trim()) return;
  search({ query: query.value });
  autocomplete.value?.show();
}
</script>

<template>
  <div class="relative w-full sm:w-auto">
    <Icon
      name="lucide:search"
      size="1rem"
      class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10"
      aria-hidden="true"
    />
    <AutoComplete
      ref="autocomplete"
      v-model="query"
      :suggestions="suggestions"
      :option-label="(show: Show) => show.name"
      :pt="{
        root: {
          class: [
            'w-full sm:w-auto',
          ],
        },
        pcInputText: { root: {
          'class': [
            '!pl-9 !rounded-full sm:!border-white !h-8 !shadow-none !w-full sm:!w-auto !text-sm',
            'hover:!border-zinc-300',
            'focus:!border-zinc-300',
          ],
          'aria-label': 'Search shows',
        } },
        overlay: { class: '!rounded-xl !border-zinc-200 !shadow-lg' },
        listContainer: { class: '!max-h-140 !overflow-y-auto' },
        option: { class: '!rounded-lg' },
      }"
      placeholder="Search"
      :delay="300"
      append-to="self"
      @complete="search"
      @option-select="select"
      @focus="handleFocus"
    >
      <template #option="{ option: show }">
        <LazyLayoutHeaderSearchOption :show="show" />
      </template>
      <template #empty>
        <span class="search-empty-message text-sm text-zinc-500">
          {{ searchError ? 'Search unavailable' : 'No shows found' }}
        </span>
      </template>
    </AutoComplete>
  </div>
</template>
