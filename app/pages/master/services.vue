<script setup lang="ts">
const authStore = useAuthStore();

// Verificar que sea un maestro
if (authStore.role !== 'master') {
  navigateTo('/home');
}

const filterStatus = ref('all');
const services = ref([
  {
    id: 1,
    clientName: 'María González',
    service: 'Closet a medida',
    date: '2025-11-10',
    amount: 85000,
    status: 'completed',
    duration: '3 días',
    rating: 5,
    review: 'Excelente trabajo! Hizo un closet a medida y quedó perfecto. Muy profesional y puntual.',
  },
  {
    id: 2,
    clientName: 'Pedro Ramírez',
    service: 'Restauración de mesa',
    date: '2025-11-08',
    amount: 45000,
    status: 'completed',
    duration: '1 día',
    rating: 5,
    review: 'Restauró una mesa antigua de mi abuela. Quedó como nueva. Totalmente recomendado.',
  },
  {
    id: 3,
    clientName: 'Laura Vidal',
    service: 'Estantería',
    date: '2025-11-05',
    amount: 65000,
    status: 'completed',
    duration: '2 días',
    rating: 4,
    review: 'Buen trabajo, aunque se demoró un poco más de lo estimado. Pero el resultado final vale la pena.',
  },
  {
    id: 4,
    clientName: 'Roberto Silva',
    service: 'Mueble de TV',
    date: '2025-11-12',
    amount: 120000,
    status: 'in_progress',
    duration: '4 días (estimado)',
    rating: null,
    review: null,
  },
  {
    id: 5,
    clientName: 'Ana Torres',
    service: 'Deck exterior',
    date: '2025-11-15',
    amount: 450000,
    status: 'pending',
    duration: '7 días (estimado)',
    rating: null,
    review: null,
  },
]);

const filteredServices = computed(() => {
  if (filterStatus.value === 'all') return services.value;
  return services.value.filter(s => s.status === filterStatus.value);
});

const statusStats = computed(() => {
  return {
    all: services.value.length,
    completed: services.value.filter(s => s.status === 'completed').length,
    in_progress: services.value.filter(s => s.status === 'in_progress').length,
    pending: services.value.filter(s => s.status === 'pending').length,
  };
});

const totalEarnings = computed(() => {
  return services.value
    .filter(s => s.status === 'completed')
    .reduce((sum, s) => sum + s.amount, 0);
});

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Completado';
    case 'in_progress':
      return 'En Progreso';
    case 'pending':
      return 'Pendiente';
    default:
      return status;
  }
};
</script>

<template>
  <div class="min-h-screen w-full bg-linear-to-b from-gray-50 to-white">
    <div class="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="mb-2 text-3xl font-bold text-purple-950 sm:text-4xl">Mis Servicios</h1>
          <p class="text-gray-600">Historial y gestión de trabajos</p>
        </div>

      </div>

      <!-- Stats Summary -->
      <div class="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div class="rounded-lg bg-white p-6 shadow-md">
          <p class="text-sm text-gray-600">Total Ganado</p>
          <p class="text-2xl font-bold text-green-600">${{ totalEarnings.toLocaleString('es-CL') }}</p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-md">
          <p class="text-sm text-gray-600">Completados</p>
          <p class="text-2xl font-bold text-gray-900">{{ statusStats.completed }}</p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-md">
          <p class="text-sm text-gray-600">En Progreso</p>
          <p class="text-2xl font-bold text-blue-600">{{ statusStats.in_progress }}</p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-md">
          <p class="text-sm text-gray-600">Pendientes</p>
          <p class="text-2xl font-bold text-yellow-600">{{ statusStats.pending }}</p>
        </div>
      </div>

      <!-- Filters -->
      <div class="mb-6 flex flex-wrap gap-3">
        <button @click="filterStatus = 'all'" :class="[
          'rounded-lg px-4 py-2 text-sm font-medium transition',
          filterStatus === 'all'
            ? 'bg-purple-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50',
        ]">
          Todos ({{ statusStats.all }})
        </button>
        <button @click="filterStatus = 'completed'" :class="[
          'rounded-lg px-4 py-2 text-sm font-medium transition',
          filterStatus === 'completed'
            ? 'bg-green-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50',
        ]">
          Completados ({{ statusStats.completed }})
        </button>
        <button @click="filterStatus = 'in_progress'" :class="[
          'rounded-lg px-4 py-2 text-sm font-medium transition',
          filterStatus === 'in_progress'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50',
        ]">
          En Progreso ({{ statusStats.in_progress }})
        </button>
        <button @click="filterStatus = 'pending'" :class="[
          'rounded-lg px-4 py-2 text-sm font-medium transition',
          filterStatus === 'pending'
            ? 'bg-yellow-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50',
        ]">
          Pendientes ({{ statusStats.pending }})
        </button>
      </div>

      <!-- Services List -->
      <div class="space-y-4">
        <div v-for="service in filteredServices" :key="service.id"
          class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
          <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div class="flex-1">
              <div class="mb-3 flex items-start justify-between">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">{{ service.service }}</h3>
                  <p class="text-sm text-gray-600">Cliente: {{ service.clientName }}</p>
                </div>
                <span :class="['rounded-full px-3 py-1 text-xs font-medium', getStatusColor(service.status)]">
                  {{ getStatusText(service.status) }}
                </span>
              </div>

              <div class="grid gap-3 sm:grid-cols-3">
                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {{ new Date(service.date).toLocaleDateString('es-CL') }}
                </div>
                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ service.duration }}
                </div>
                <div class="flex items-center gap-2 text-sm font-semibold text-green-600">
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  ${{ service.amount.toLocaleString('es-CL') }}
                </div>
              </div>

              <!-- Review (if completed) -->
              <div v-if="service.rating && service.review" class="mt-4 rounded-lg bg-gray-50 p-4">
                <div class="mb-2 flex items-center gap-1">
                  <template v-for="i in 5" :key="i">
                    <svg :class="['h-4 w-4', i <= service.rating ? 'text-yellow-400' : 'text-gray-300']"
                      fill="currentColor" viewBox="0 0 20 20">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </template>
                </div>
                <p class="text-sm italic text-gray-700">"{{ service.review }}"</p>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-2 lg:flex-col">
              <button v-if="service.status === 'pending'"
                class="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700">
                Aceptar
              </button>
              <button
                class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                Ver Detalles
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredServices.length === 0"
        class="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
        <svg class="mx-auto mb-4 h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p class="text-gray-600">No hay servicios en esta categoría</p>
      </div>
    </div>
  </div>
</template>
