<script setup lang="ts">
const route = useRoute();
const { data: master, pending, error } = await useFetch(`/api/masters/${route.params.id}`);
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- Loading State -->
    <div v-if="pending" class="flex min-h-screen items-center justify-center">
      <div class="text-center">
        <div class="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-purple-600"></div>
        <p class="text-gray-600">Cargando información del maestro...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex min-h-screen items-center justify-center px-4">
      <div class="rounded-lg bg-red-50 p-8 text-center">
        <svg class="mx-auto mb-4 h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="mb-2 text-lg font-semibold text-red-900">Maestro no encontrado</h3>
        <p class="mb-4 text-red-700">No se pudo encontrar la información del maestro solicitado.</p>
        <NuxtLink
          to="/home"
          class="inline-block rounded-lg bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-700"
        >
          Volver al listado
        </NuxtLink>
      </div>
    </div>

    <!-- Master Details -->
    <div v-else-if="master" class="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <!-- Back Button -->
      <NuxtLink
        to="/home"
        class="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-purple-600"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Volver al listado
      </NuxtLink>

      <!-- Main Content Grid -->
      <div class="grid gap-8 lg:grid-cols-3">
        <!-- Left Column - Master Info -->
        <div class="space-y-6 lg:col-span-2">
          <!-- Header Card -->
          <div class="overflow-hidden rounded-2xl bg-white shadow-lg">
            <div class="relative h-48 bg-gradient-to-br from-purple-950 to-purple-800">
              <div class="absolute -bottom-16 left-6 sm:left-8">
                <div class="relative">
                  <img
                    :src="master.image"
                    :alt="`Foto de ${master.name}`"
                    class="h-32 w-32 rounded-full border-4 border-white object-cover shadow-xl"
                  />
                  <div v-if="master.verified" class="absolute -bottom-2 -right-2 rounded-full bg-blue-500 p-2">
                    <svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div class="px-6 pb-6 pt-20 sm:px-8">
              <h1 class="mb-2 text-3xl font-bold text-gray-900">{{ master.name }}</h1>
              <p class="mb-4 text-lg font-medium text-purple-600">{{ master.profession }}</p>

              <!-- Stats -->
              <div class="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div class="rounded-lg bg-gray-50 p-3 text-center">
                  <div class="mb-1 flex items-center justify-center text-yellow-400">
                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <p class="text-sm font-semibold text-gray-900">{{ master.rating }}</p>
                  <p class="text-xs text-gray-500">Calificación</p>
                </div>
                <div class="rounded-lg bg-gray-50 p-3 text-center">
                  <p class="mb-1 text-sm font-semibold text-gray-900">{{ master.reviewCount }}</p>
                  <p class="text-xs text-gray-500">Reseñas</p>
                </div>
                <div class="rounded-lg bg-gray-50 p-3 text-center">
                  <p class="mb-1 text-sm font-semibold text-gray-900">{{ master.yearsExperience }} años</p>
                  <p class="text-xs text-gray-500">Experiencia</p>
                </div>
                <div class="rounded-lg bg-gray-50 p-3 text-center">
                  <p class="mb-1 text-sm font-semibold text-gray-900">{{ master.responseTime }}</p>
                  <p class="text-xs text-gray-500">Respuesta</p>
                </div>
              </div>

              <!-- Location and Availability -->
              <div class="mb-6 flex flex-wrap gap-4">
                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {{ master.location }}
                </div>
                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {{ master.availability }}
                </div>
              </div>

              <!-- Description -->
              <div class="mb-6">
                <h2 class="mb-2 text-lg font-semibold text-gray-900">Sobre mí</h2>
                <p class="text-gray-700">{{ master.description }}</p>
              </div>

              <!-- Services -->
              <div v-if="master.services && master.services.length > 0">
                <h2 class="mb-3 text-lg font-semibold text-gray-900">Servicios</h2>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="(service, index) in master.services"
                    :key="index"
                    class="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700"
                  >
                    {{ service }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Reviews Section -->
          <div class="rounded-2xl bg-white p-6 shadow-lg sm:p-8">
            <h2 class="mb-6 text-2xl font-bold text-gray-900">
              Reseñas ({{ master.reviews?.length || 0 }})
            </h2>
            <ReviewList :reviews="master.reviews || []" />
          </div>
        </div>

        <!-- Right Column - Contact & Price -->
        <div class="space-y-6">
          <!-- Price Card -->
          <div class="sticky top-24 rounded-2xl bg-white p-6 shadow-lg">
            <div class="mb-6 rounded-lg bg-purple-50 p-4">
              <p class="mb-2 text-sm text-gray-600">Precio estimado</p>
              <p class="text-3xl font-bold text-purple-950">
                ${{ master.pricePerHour.toLocaleString('es-CL') }}
                <span class="text-base font-normal text-gray-600">/hora</span>
              </p>
            </div>

            <!-- Contact Component -->
            <ContactMaster
              :master="{
                id: master.id,
                name: master.name,
                image: master.image,
                profession: master.profession,
              }"
            />
          </div>

          <!-- Quick Info Card -->
          <div class="rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 p-6 shadow-sm">
            <h3 class="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
              <svg class="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Información útil
            </h3>
            <ul class="space-y-3 text-sm text-gray-700">
              <li class="flex items-start gap-2">
                <svg class="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Responde en {{ master.responseTime }} aproximadamente
              </li>
              <li class="flex items-start gap-2">
                <svg class="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Perfil verificado por MasterClick
              </li>
              <li class="flex items-start gap-2">
                <svg class="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                {{ master.yearsExperience }} años de experiencia verificada
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
