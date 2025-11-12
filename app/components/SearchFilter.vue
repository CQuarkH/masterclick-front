<script setup lang="ts">
interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
}

const emit = defineEmits<{
  (e: 'update:search', value: string): void;
  (e: 'update:category', value: string): void;
  (e: 'update:minRating', value: number | undefined): void;
}>();

const props = defineProps<{
  search: string;
  category: string;
  minRating: number | undefined;
}>();

const { data: categories } = await useFetch<Category[]>('/api/categories');

const searchInput = ref(props.search);
const selectedCategory = ref(props.category);
const selectedRating = ref(props.minRating);
const showFilters = ref(false);

watch(searchInput, (value) => {
  emit('update:search', value);
});

watch(selectedCategory, (value) => {
  emit('update:category', value);
});

watch(selectedRating, (value) => {
  emit('update:minRating', value);
});

const clearFilters = () => {
  searchInput.value = '';
  selectedCategory.value = '';
  selectedRating.value = undefined;
  showFilters.value = false;
};

const activeFiltersCount = computed(() => {
  let count = 0;
  if (selectedCategory.value) count++;
  if (selectedRating.value) count++;
  return count;
});
</script>

<template>
  <div class="w-full space-y-4">
    <!-- Search Bar -->
    <div class="flex flex-col gap-3 sm:flex-row">
      <div class="relative flex-1">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          v-model="searchInput"
          type="text"
          placeholder="Buscar por nombre o profesión..."
          class="w-full rounded-lg border border-gray-300 bg-white py-3 pl-11 pr-4 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <!-- Filter Button (Mobile) -->
      <button
        @click="showFilters = !showFilters"
        class="relative flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:w-auto"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filtros
        <span v-if="activeFiltersCount > 0" class="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white">
          {{ activeFiltersCount }}
        </span>
      </button>
    </div>

    <!-- Filters Panel -->
    <div
      v-if="showFilters"
      class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
    >
      <div class="mb-4 flex items-center justify-between">
        <h3 class="text-sm font-semibold text-gray-900">Filtros</h3>
        <button
          v-if="activeFiltersCount > 0"
          @click="clearFilters"
          class="text-sm text-purple-600 hover:text-purple-700"
        >
          Limpiar filtros
        </button>
      </div>

      <div class="space-y-4">
        <!-- Category Filter -->
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-700">Categoría</label>
          <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <button
              v-for="cat in categories"
              :key="cat.id"
              @click="selectedCategory = selectedCategory === cat.slug ? '' : cat.slug"
              :class="[
                'rounded-lg border-2 px-3 py-2 text-sm font-medium transition',
                selectedCategory === cat.slug
                  ? 'border-purple-600 bg-purple-50 text-purple-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300',
              ]"
            >
              <span class="mr-1">{{ cat.icon }}</span>
              {{ cat.name }}
            </button>
          </div>
        </div>

        <!-- Rating Filter -->
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-700">Calificación mínima</label>
          <div class="flex gap-2">
            <button
              v-for="rating in [4, 4.5, 4.8]"
              :key="rating"
              @click="selectedRating = selectedRating === rating ? undefined : rating"
              :class="[
                'flex items-center gap-1 rounded-lg border-2 px-4 py-2 text-sm font-medium transition',
                selectedRating === rating
                  ? 'border-purple-600 bg-purple-50 text-purple-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300',
              ]"
            >
              <svg class="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {{ rating }}+
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Active Filters -->
    <div v-if="activeFiltersCount > 0 && !showFilters" class="flex flex-wrap gap-2">
      <div v-if="selectedCategory" class="flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
        <span>{{ categories?.find(c => c.slug === selectedCategory)?.name }}</span>
        <button @click="selectedCategory = ''" class="hover:text-purple-900">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div v-if="selectedRating" class="flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
        <span>{{ selectedRating }}+ estrellas</span>
        <button @click="selectedRating = undefined" class="hover:text-purple-900">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
