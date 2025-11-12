<script setup lang="ts">
const authStore = useAuthStore();

// Verificar que sea un maestro
if (authStore.role !== 'master') {
  navigateTo('/home');
}

const editMode = ref(false);
const name = ref(authStore.username || '');
const email = ref(authStore.email || '');
const profession = ref(authStore.masterProfile?.profession || '');
const pricePerHour = ref(authStore.masterProfile?.pricePerHour || 0);
const location = ref(authStore.masterProfile?.location || '');
const yearsExperience = ref(authStore.masterProfile?.yearsExperience || 0);
const phone = ref('');
const description = ref('Experto en muebles a medida, restauraciones y estructuras de madera. Más de 10 años de experiencia en carpintería fina y construcción.');
const availability = ref('Lunes a Sábado');
const services = ref<string[]>([
  'Muebles a medida',
  'Restauración de muebles',
  'Estructuras de madera',
  'Instalación de puertas y ventanas',
  'Deck y terrazas',
]);

const newService = ref('');

const addService = () => {
  if (newService.value.trim()) {
    services.value.push(newService.value.trim());
    newService.value = '';
  }
};

const removeService = (index: number) => {
  services.value.splice(index, 1);
};

const saveProfile = () => {
  // Aquí iría la lógica para guardar el perfil
  editMode.value = false;
  // Simular actualización del store
  authStore.setUser({
    ...authStore,
    username: name.value,
    email: email.value,
    masterProfile: {
      ...authStore.masterProfile!,
      profession: profession.value,
      pricePerHour: pricePerHour.value,
      location: location.value,
      yearsExperience: yearsExperience.value,
    },
  });
};

const cancelEdit = () => {
  name.value = authStore.username || '';
  email.value = authStore.email || '';
  profession.value = authStore.masterProfile?.profession || '';
  pricePerHour.value = authStore.masterProfile?.pricePerHour || 0;
  location.value = authStore.masterProfile?.location || '';
  yearsExperience.value = authStore.masterProfile?.yearsExperience || 0;
  editMode.value = false;
};
</script>

<template>
  <div class="min-h-screen w-full bg-linear-to-b from-gray-50 to-white">
    <div class="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="mb-2 text-3xl font-bold text-purple-950 sm:text-4xl">Mi Perfil Profesional</h1>
          <p class="text-gray-600">Administra tu información como maestro</p>
        </div>

      </div>

      <div class="grid gap-8 lg:grid-cols-3">
        <!-- Left Column - Profile Info -->
        <div class="space-y-6 lg:col-span-2">
          <!-- Profile Card -->
          <div class="overflow-hidden rounded-2xl bg-white shadow-lg">
            <div class="relative h-32 bg-gradient-to-br from-purple-950 to-purple-800">
              <div class="absolute -bottom-16 left-6 sm:left-8">
                <div class="relative">
                  <div
                    class="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-purple-600 text-4xl font-bold text-white shadow-xl">
                    {{ authStore.username?.charAt(0).toUpperCase() || 'M' }}
                  </div>
                  <button
                    class="absolute bottom-0 right-0 rounded-full bg-white p-2 shadow-lg transition hover:bg-gray-50">
                    <svg class="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div class="px-6 pb-6 pt-20 sm:px-8">
              <div class="mb-6 flex items-start justify-between">
                <div>
                  <h2 class="mb-1 text-2xl font-bold text-gray-900">{{ authStore.username }}</h2>
                  <p class="text-lg text-purple-600">{{ authStore.masterProfile?.profession }}</p>
                </div>
                <button v-if="!editMode" @click="editMode = true"
                  class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700">
                  Editar Perfil
                </button>
              </div>

              <!-- Edit Form -->
              <form v-if="editMode" @submit.prevent="saveProfile" class="space-y-6">
                <div class="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label class="mb-1 block text-sm font-medium text-gray-700">Nombre</label>
                    <input v-model="name" type="text" required
                      class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>

                  <div>
                    <label class="mb-1 block text-sm font-medium text-gray-700">Email</label>
                    <input v-model="email" type="email" required
                      class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>

                  <div>
                    <label class="mb-1 block text-sm font-medium text-gray-700">Profesión</label>
                    <input v-model="profession" type="text" required
                      class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>

                  <div>
                    <label class="mb-1 block text-sm font-medium text-gray-700">Precio por Hora</label>
                    <input v-model="pricePerHour" type="number" required
                      class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>

                  <div>
                    <label class="mb-1 block text-sm font-medium text-gray-700">Ubicación</label>
                    <input v-model="location" type="text" required
                      class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>

                  <div>
                    <label class="mb-1 block text-sm font-medium text-gray-700">Años de Experiencia</label>
                    <input v-model="yearsExperience" type="number" required
                      class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>

                  <div>
                    <label class="mb-1 block text-sm font-medium text-gray-700">Teléfono</label>
                    <input v-model="phone" type="tel"
                      class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="+56 9 1234 5678" />
                  </div>

                  <div>
                    <label class="mb-1 block text-sm font-medium text-gray-700">Disponibilidad</label>
                    <input v-model="availability" type="text"
                      class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>
                </div>

                <div>
                  <label class="mb-1 block text-sm font-medium text-gray-700">Descripción</label>
                  <textarea v-model="description" rows="4"
                    class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe tu experiencia y especialidades..."></textarea>
                </div>

                <!-- Services -->
                <div>
                  <label class="mb-2 block text-sm font-medium text-gray-700">Servicios que Ofreces</label>
                  <div class="mb-3 flex flex-wrap gap-2">
                    <span v-for="(service, index) in services" :key="index"
                      class="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">
                      {{ service }}
                      <button type="button" @click="removeService(index)" class="hover:text-purple-900">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  </div>
                  <div class="flex gap-2">
                    <input v-model="newService" type="text" @keyup.enter="addService" placeholder="Agregar servicio..."
                      class="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    <button type="button" @click="addService"
                      class="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200">
                      Agregar
                    </button>
                  </div>
                </div>

                <div class="flex gap-3">
                  <button type="submit"
                    class="flex-1 rounded-lg bg-purple-950 px-4 py-3 text-white transition hover:bg-purple-800">
                    Guardar Cambios
                  </button>
                  <button type="button" @click="cancelEdit"
                    class="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 transition hover:bg-gray-50">
                    Cancelar
                  </button>
                </div>
              </form>

              <!-- Display Mode -->
              <div v-else class="space-y-6">
                <div class="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p class="text-sm font-medium text-gray-500">Email</p>
                    <p class="text-gray-900">{{ authStore.email }}</p>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500">Precio por Hora</p>
                    <p class="text-gray-900">${{ authStore.masterProfile?.pricePerHour.toLocaleString('es-CL') }}</p>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500">Ubicación</p>
                    <p class="text-gray-900">{{ authStore.masterProfile?.location }}</p>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500">Experiencia</p>
                    <p class="text-gray-900">{{ authStore.masterProfile?.yearsExperience }} años</p>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500">Disponibilidad</p>
                    <p class="text-gray-900">{{ availability }}</p>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500">Teléfono</p>
                    <p class="text-gray-400">Agregar teléfono</p>
                  </div>
                </div>

                <div>
                  <p class="mb-2 text-sm font-medium text-gray-500">Descripción</p>
                  <p class="text-gray-700">{{ description }}</p>
                </div>

                <div>
                  <p class="mb-3 text-sm font-medium text-gray-500">Servicios</p>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="(service, index) in services" :key="index"
                      class="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">
                      {{ service }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Stats & Info -->
        <div class="space-y-6">
          <!-- Performance Stats -->
          <div class="rounded-2xl bg-white p-6 shadow-lg">
            <h3 class="mb-4 text-lg font-semibold text-gray-900">Tus Estadísticas</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span class="text-sm text-gray-600">Calificación</span>
                </div>
                <span class="text-lg font-bold text-gray-900">{{ authStore.masterProfile?.rating }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Reseñas</span>
                <span class="font-semibold text-gray-900">{{ authStore.masterProfile?.reviewCount }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Tasa de respuesta</span>
                <span class="font-semibold text-green-600">98%</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Trabajos completados</span>
                <span class="font-semibold text-gray-900">87</span>
              </div>
            </div>
          </div>

          <!-- Profile Tips -->
          <div class="rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-6 shadow-sm">
            <h3 class="mb-4 text-lg font-semibold text-gray-900">Consejos para tu Perfil</h3>
            <ul class="space-y-3 text-sm text-gray-700">
              <li class="flex items-start gap-2">
                <svg class="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                Agrega una foto profesional para generar más confianza
              </li>
              <li class="flex items-start gap-2">
                <svg class="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                Describe detalladamente tus servicios y experiencia
              </li>
              <li class="flex items-start gap-2">
                <svg class="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                Responde rápido a los mensajes para mejorar tu reputación
              </li>
              <li class="flex items-start gap-2">
                <svg class="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                Mantén tus precios actualizados
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
