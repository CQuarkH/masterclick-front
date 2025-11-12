<script setup lang="ts">
const authStore = useAuthStore();
const user = computed(() => authStore);

const editMode = ref(false);
const name = ref(user.value.username || '');
const email = ref(user.value.email || '');
const phone = ref('');
const location = ref('');
const bio = ref('');

const saveProfile = () => {
  // Aquí iría la lógica para guardar el perfil
  editMode.value = false;
  // Simular actualización
  authStore.setUser({
    ...user.value,
    username: name.value,
    email: email.value,
  });
};

const cancelEdit = () => {
  name.value = user.value.username || '';
  email.value = user.value.email || '';
  editMode.value = false;
};
</script>

<template>
  <div class="min-h-screen w-full bg-linear-to-b from-gray-50 to-white">
    <div class="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="mb-2 text-3xl font-bold text-purple-950 sm:text-4xl">Mi Perfil</h1>
        <p class="text-gray-600">Administra tu información personal y preferencias</p>
      </div>

      <div class="grid gap-8 lg:grid-cols-3">
        <!-- Left Column - Profile Info -->
        <div class="space-y-6 lg:col-span-2">
          <!-- Profile Card -->
          <div class="overflow-hidden rounded-2xl bg-white shadow-lg">
            <div class="relative h-32 bg-linear-to-br from-purple-950 to-purple-800">
              <div class="absolute -bottom-16 left-6 sm:left-8">
                <div class="relative">
                  <div
                    class="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-purple-600 text-4xl font-bold text-white shadow-xl">
                    {{ user.username?.charAt(0).toUpperCase() || 'U' }}
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
                  <h2 class="mb-1 text-2xl font-bold text-gray-900">{{ user.username }}</h2>
                  <p class="text-gray-600">{{ user.email }}</p>
                </div>
                <button v-if="!editMode" @click="editMode = true"
                  class="rounded-lg bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700 transition hover:bg-purple-200">
                  Editar <span class="md:inline-flex hidden">Perfil</span>
                </button>
              </div>

              <!-- Edit Form -->
              <form v-if="editMode" @submit.prevent="saveProfile" class="space-y-4">
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
                  <label class="mb-1 block text-sm font-medium text-gray-700">Teléfono</label>
                  <input v-model="phone" type="tel"
                    class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="+56 9 1234 5678" />
                </div>

                <div>
                  <label class="mb-1 block text-sm font-medium text-gray-700">Ubicación</label>
                  <input v-model="location" type="text"
                    class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Santiago, Chile" />
                </div>

                <div>
                  <label class="mb-1 block text-sm font-medium text-gray-700">Sobre mí</label>
                  <textarea v-model="bio" rows="4"
                    class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Cuéntanos un poco sobre ti..."></textarea>
                </div>

                <div class="flex gap-3">
                  <button type="submit"
                    class="flex-1 rounded-lg bg-purple-950 px-4 py-2 text-white transition hover:bg-purple-800">
                    Guardar Cambios
                  </button>
                  <button type="button" @click="cancelEdit"
                    class="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 transition hover:bg-gray-50">
                    Cancelar
                  </button>
                </div>
              </form>

              <!-- Display Mode -->
              <div v-else class="space-y-4">
                <div class="rounded-lg bg-gray-50 p-4">
                  <h3 class="mb-3 text-sm font-semibold text-gray-700">Información de Contacto</h3>
                  <div class="space-y-2">
                    <div class="flex items-center gap-2 text-sm text-gray-600">
                      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {{ user.email }}
                    </div>
                    <div class="flex items-center gap-2 text-sm text-gray-600">
                      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span class="text-gray-400">Agregar teléfono</span>
                    </div>
                    <div class="flex items-center gap-2 text-sm text-gray-600">
                      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span class="text-gray-400">Agregar ubicación</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Activity Card -->
          <div class="rounded-2xl bg-white p-6 shadow-lg sm:p-8">
            <h2 class="mb-6 text-2xl font-bold text-gray-900">Actividad Reciente</h2>
            <div class="space-y-4">
              <div class="rounded-lg border border-gray-200 p-4">
                <div class="flex items-start gap-4">
                  <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-purple-100">
                    <svg class="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="font-medium text-gray-900">Mensaje enviado</p>
                    <p class="text-sm text-gray-600">Contactaste a Carlos Soto (Carpintero)</p>
                    <p class="mt-1 text-xs text-gray-400">Hace 2 horas</p>
                  </div>
                </div>
              </div>

              <div class="rounded-lg border border-gray-200 p-4">
                <div class="flex items-start gap-4">
                  <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                    <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="font-medium text-gray-900">Cuenta creada</p>
                    <p class="text-sm text-gray-600">Te registraste en MasterClick</p>
                    <p class="mt-1 text-xs text-gray-400">Hace 1 día</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Quick Actions -->
        <div class="space-y-6">
          <!-- Account Stats -->
          <div class="rounded-2xl bg-white p-6 shadow-lg">
            <h3 class="mb-4 text-lg font-semibold text-gray-900">Mi Actividad</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Maestros contactados</span>
                <span class="text-lg font-bold text-purple-950">5</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Reseñas escritas</span>
                <span class="text-lg font-bold text-purple-950">2</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Favoritos</span>
                <span class="text-lg font-bold text-purple-950">3</span>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="rounded-2xl bg-white p-6 shadow-lg">
            <h3 class="mb-4 text-lg font-semibold text-gray-900">Acciones Rápidas</h3>
            <div class="space-y-3">
              <NuxtLink to="/home"
                class="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition hover:bg-gray-50">
                <svg class="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span class="text-sm font-medium text-gray-900">Buscar Maestros</span>
              </NuxtLink>

              <button
                class="flex w-full items-center gap-3 rounded-lg border border-gray-200 p-3 transition hover:bg-gray-50">
                <svg class="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span class="text-sm font-medium text-gray-900">Mis Favoritos</span>
              </button>

              <button
                class="flex w-full items-center gap-3 rounded-lg border border-gray-200 p-3 transition hover:bg-gray-50">
                <svg class="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span class="text-sm font-medium text-gray-900">Mis Mensajes</span>
              </button>
            </div>
          </div>

          <!-- Settings -->
          <div class="rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 p-6 shadow-sm">
            <h3 class="mb-4 text-lg font-semibold text-gray-900">Configuración</h3>
            <div class="space-y-3">
              <button
                class="flex w-full items-center justify-between text-sm text-gray-700 transition hover:text-purple-600">
                <span>Privacidad y Seguridad</span>
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                class="flex w-full items-center justify-between text-sm text-gray-700 transition hover:text-purple-600">
                <span>Notificaciones</span>
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                class="flex w-full items-center justify-between text-sm text-gray-700 transition hover:text-purple-600">
                <span>Ayuda y Soporte</span>
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
