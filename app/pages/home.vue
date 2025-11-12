<script setup lang="ts">
const searchQuery = ref('');
const categoryFilter = ref('');
const ratingFilter = ref<number | undefined>(undefined);

// Construir la URL con query params
const queryParams = computed(() => {
  const params: Record<string, any> = {};
  if (searchQuery.value) params.search = searchQuery.value;
  if (categoryFilter.value) params.category = categoryFilter.value;
  if (ratingFilter.value) params.minRating = ratingFilter.value;
  return params;
});

const { data: masters, pending, error, refresh } = await useFetch('/api/masters', {
  query: queryParams,
  watch: [queryParams],
});

const filteredMastersCount = computed(() => masters.value?.length || 0);
</script>

<template>
  <div class="min-h-screen w-full bg-linear-to-b from-gray-50 to-white">
    <div class="container mx-auto px-4 py-8 sm:px-6 lg:px-8 w-full">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="mb-2 text-3xl font-bold text-purple-950 sm:text-4xl">
          Encuentra tu Maestro Ideal
        </h1>
        <p class="text-gray-600">
          {{ filteredMastersCount }} profesionales disponibles para ayudarte
        </p>
      </div>

      <!-- Search and Filters -->
      <div class="mb-8">
        <SearchFilter :search="searchQuery" :category="categoryFilter" :min-rating="ratingFilter"
          @update:search="searchQuery = $event" @update:category="categoryFilter = $event"
          @update:min-rating="ratingFilter = $event" />
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="flex items-center justify-center py-20">
        <div class="text-center">
          <div class="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-purple-600">
          </div>
          <p class="text-gray-600">Cargando maestros...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="rounded-lg bg-red-50 p-8 text-center">
        <svg class="mx-auto mb-4 h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="mb-2 text-lg font-semibold text-red-900">Error al cargar los maestros</h3>
        <p class="mb-4 text-red-700">Ocurrió un error al obtener los datos. Por favor, intenta de nuevo.</p>
        <button @click="refresh()" class="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700">
          Reintentar
        </button>
      </div>

      <!-- Empty State -->
      <div v-else-if="!masters || masters.length === 0"
        class="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
        <svg class="mx-auto mb-4 h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <h3 class="mb-2 text-lg font-semibold text-gray-900">No se encontraron maestros</h3>
        <p class="mb-4 text-gray-600">Intenta ajustar los filtros de búsqueda para ver más resultados.</p>
        <button @click="() => { searchQuery = ''; categoryFilter = ''; ratingFilter = undefined; }"
          class="rounded-lg bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-700">
          Limpiar filtros
        </button>
      </div>

      <!-- Masters Grid -->
      <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <MasterCard v-for="master in masters" :key="master.id" :master="master" />
      </div>
    </div>
  </div>
</template>
