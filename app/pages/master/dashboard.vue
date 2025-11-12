<script setup lang="ts">
const authStore = useAuthStore();

// Verificar que sea un maestro
if (authStore.role !== 'master') {
  navigateTo('/home');
}

// Datos del dashboard (simulados - en producción vendrían de la API)
const stats = ref({
  totalEarnings: 2450000,
  monthlyEarnings: 450000,
  totalServices: 87,
  monthlyServices: 12,
  pendingMessages: 5,
  averageRating: authStore.masterProfile?.rating || 0,
  totalReviews: authStore.masterProfile?.reviewCount || 0,
});

const recentServices = ref([
  {
    id: 1,
    clientName: 'María González',
    service: 'Closet a medida',
    date: '2025-11-10',
    amount: 85000,
    status: 'completed',
  },
  {
    id: 2,
    clientName: 'Pedro Ramírez',
    service: 'Restauración de mesa',
    date: '2025-11-08',
    amount: 45000,
    status: 'completed',
  },
  {
    id: 3,
    clientName: 'Laura Vidal',
    service: 'Estantería',
    date: '2025-11-05',
    amount: 65000,
    status: 'completed',
  },
  {
    id: 4,
    clientName: 'Roberto Silva',
    service: 'Mueble de TV',
    date: '2025-11-12',
    amount: 120000,
    status: 'pending',
  },
]);

const upcomingAppointments = ref([
  {
    id: 1,
    clientName: 'Ana Torres',
    service: 'Cotización para deck',
    date: '2025-11-15',
    time: '10:00 AM',
  },
  {
    id: 2,
    clientName: 'Carlos Muñoz',
    service: 'Instalación de puertas',
    date: '2025-11-16',
    time: '14:30 PM',
  },
]);

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Completado';
    case 'pending':
      return 'Pendiente';
    case 'cancelled':
      return 'Cancelado';
    default:
      return status;
  }
};
</script>

<template>
  <div class="min-h-screen w-full bg-linear-to-b from-gray-50 to-white">
    <div class="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="mb-2 text-3xl font-bold text-purple-950 sm:text-4xl">
          Dashboard - {{ authStore.username }}
        </h1>
        <p class="text-gray-600">{{ authStore.masterProfile?.profession }}</p>
      </div>

      <!-- Stats Grid -->
      <div class="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <!-- Ganancias Mensuales -->
        <div class="rounded-2xl bg-white p-6 shadow-lg">
          <div class="mb-4 flex items-center justify-between">
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span class="text-xs font-medium text-green-600">Este mes</span>
          </div>
          <p class="mb-1 text-2xl font-bold text-gray-900">${{ stats.monthlyEarnings.toLocaleString('es-CL') }}</p>
          <p class="text-sm text-gray-600">Ganancias mensuales</p>
        </div>

        <!-- Servicios del Mes -->
        <div class="rounded-2xl bg-white p-6 shadow-lg">
          <div class="mb-4 flex items-center justify-between">
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <span class="text-xs font-medium text-blue-600">Este mes</span>
          </div>
          <p class="mb-1 text-2xl font-bold text-gray-900">{{ stats.monthlyServices }}</p>
          <p class="text-sm text-gray-600">Servicios realizados</p>
        </div>

        <!-- Calificación -->
        <div class="rounded-2xl bg-white p-6 shadow-lg">
          <div class="mb-4 flex items-center justify-between">
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
              <svg class="h-6 w-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span class="text-xs font-medium text-yellow-600">Promedio</span>
          </div>
          <p class="mb-1 text-2xl font-bold text-gray-900">{{ stats.averageRating.toFixed(1) }}</p>
          <p class="text-sm text-gray-600">{{ stats.totalReviews }} reseñas</p>
        </div>

        <!-- Mensajes Pendientes -->
        <div class="rounded-2xl bg-white p-6 shadow-lg">
          <div class="mb-4 flex items-center justify-between">
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
              <svg class="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <span class="text-xs font-medium text-purple-600">Nuevos</span>
          </div>
          <p class="mb-1 text-2xl font-bold text-gray-900">{{ stats.pendingMessages }}</p>
          <p class="text-sm text-gray-600">Mensajes sin leer</p>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid gap-8 lg:grid-cols-3">
        <!-- Left Column - Services & Appointments -->
        <div class="space-y-6 lg:col-span-2">
          <!-- Recent Services -->
          <div class="rounded-2xl bg-white p-6 shadow-lg">
            <div class="mb-6 flex items-center justify-between">
              <h2 class="text-2xl font-bold text-gray-900">Servicios Recientes</h2>
              <NuxtLink to="/master/services" class="text-sm font-medium text-purple-600 hover:text-purple-700">
                Ver todos
              </NuxtLink>
            </div>

            <div class="space-y-4">
              <div v-for="service in recentServices" :key="service.id"
                class="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition hover:shadow-md">
                <div class="flex-1">
                  <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                      <span class="text-sm font-bold text-purple-600">{{ service.clientName.charAt(0) }}</span>
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-900">{{ service.clientName }}</h3>
                      <p class="text-sm text-gray-600">{{ service.service }}</p>
                    </div>
                  </div>
                </div>
                <div class="text-right">
                  <p class="mb-1 font-bold text-gray-900">${{ service.amount.toLocaleString('es-CL') }}</p>
                  <p class="text-xs text-gray-500">{{ new Date(service.date).toLocaleDateString('es-CL') }}</p>
                  <span
                    :class="['mt-2 inline-block rounded-full px-2 py-1 text-xs font-medium', getStatusColor(service.status)]">
                    {{ getStatusText(service.status) }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Upcoming Appointments -->
          <div class="rounded-2xl bg-white p-6 shadow-lg">
            <h2 class="mb-6 text-2xl font-bold text-gray-900">Próximas Citas</h2>
            <div class="space-y-4">
              <div v-for="appointment in upcomingAppointments" :key="appointment.id"
                class="flex items-start gap-4 rounded-lg border-l-4 border-purple-600 bg-purple-50 p-4">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-900">{{ appointment.clientName }}</h3>
                  <p class="text-sm text-gray-600">{{ appointment.service }}</p>
                  <p class="mt-2 text-sm font-medium text-purple-600">
                    {{ new Date(appointment.date).toLocaleDateString('es-CL') }} - {{ appointment.time }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Quick Actions & Summary -->
        <div class="space-y-6">
          <!-- Quick Actions -->
          <div class="rounded-2xl bg-white p-6 shadow-lg">
            <h3 class="mb-4 text-lg font-semibold text-gray-900">Acciones Rápidas</h3>
            <div class="space-y-3">
              <NuxtLink to="/master/profile"
                class="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition hover:bg-gray-50">
                <svg class="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span class="text-sm font-medium text-gray-900">Editar Perfil</span>
              </NuxtLink>

              <NuxtLink to="/master/messages"
                class="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition hover:bg-gray-50">
                <svg class="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <div class="flex flex-1 items-center justify-between">
                  <span class="text-sm font-medium text-gray-900">Mensajes</span>
                  <span v-if="stats.pendingMessages > 0"
                    class="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                    {{ stats.pendingMessages }}
                  </span>
                </div>
              </NuxtLink>

              <NuxtLink to="/master/services"
                class="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition hover:bg-gray-50">
                <svg class="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span class="text-sm font-medium text-gray-900">Mis Servicios</span>
              </NuxtLink>

              <button
                class="flex w-full items-center gap-3 rounded-lg border border-gray-200 p-3 transition hover:bg-gray-50">
                <svg class="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span class="text-sm font-medium text-gray-900">Configuración</span>
              </button>
            </div>
          </div>

          <!-- Performance Summary -->
          <div class="rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 p-6 shadow-sm">
            <h3 class="mb-4 text-lg font-semibold text-gray-900">Resumen Total</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Ganancias totales</span>
                <span class="font-bold text-gray-900">${{ stats.totalEarnings.toLocaleString('es-CL') }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Servicios totales</span>
                <span class="font-bold text-gray-900">{{ stats.totalServices }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Tasa de respuesta</span>
                <span class="font-bold text-green-600">98%</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Clientes satisfechos</span>
                <span class="font-bold text-green-600">96%</span>
              </div>
            </div>
          </div>

          <!-- Status Card -->
          <div class="rounded-2xl bg-white p-6 shadow-lg">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">Estado del perfil</p>
                <p class="text-lg font-bold text-green-600">Activo</p>
              </div>
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <svg class="h-6 w-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <p class="mt-4 text-xs text-gray-500">
              Tu perfil está visible para clientes. Responde rápido a los mensajes para mantener tu buena reputación.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
