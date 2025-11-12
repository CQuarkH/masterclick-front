<script setup lang="ts">
const authStore = useAuthStore();

// Verificar que sea un maestro
if (authStore.role !== 'master') {
  navigateTo('/home');
}

const messages = ref([
  {
    id: 1,
    clientName: 'María González',
    clientImage: 'https://randomuser.me/api/portraits/women/20.jpg',
    lastMessage: 'Hola, necesito un closet a medida. ¿Podrías darme un presupuesto?',
    timestamp: '2025-11-12T14:30:00',
    unread: 2,
  },
  {
    id: 2,
    clientName: 'Pedro Ramírez',
    clientImage: 'https://randomuser.me/api/portraits/men/45.jpg',
    lastMessage: '¡Muchas gracias por tu trabajo! La mesa quedó perfecta.',
    timestamp: '2025-11-11T10:15:00',
    unread: 0,
  },
  {
    id: 3,
    clientName: 'Laura Vidal',
    clientImage: 'https://randomuser.me/api/portraits/women/33.jpg',
    lastMessage: '¿Cuándo podrías venir a ver el espacio para la estantería?',
    timestamp: '2025-11-10T16:45:00',
    unread: 1,
  },
]);

const selectedMessage = ref<number | null>(null);
const messageText = ref('');

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));

  if (hours < 1) return 'Hace menos de 1 hora';
  if (hours < 24) return `Hace ${hours} horas`;
  return date.toLocaleDateString('es-CL');
};

const sendMessage = () => {
  if (messageText.value.trim() && selectedMessage.value) {
    // Lógica para enviar mensaje
    messageText.value = '';
  }
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <div class="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="mb-2 text-3xl font-bold text-purple-950 sm:text-4xl">Mis Mensajes</h1>
          <p class="text-gray-600">{{ messages.filter(m => m.unread > 0).length }} conversaciones sin leer</p>
        </div>
        <NuxtLink
          to="/master/dashboard"
          class="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Volver al Dashboard
        </NuxtLink>
      </div>

      <!-- Messages Grid -->
      <div class="grid gap-6 lg:grid-cols-3">
        <!-- Messages List -->
        <div class="space-y-3 lg:col-span-1">
          <div
            v-for="message in messages"
            :key="message.id"
            @click="selectedMessage = message.id"
            :class="[
              'cursor-pointer rounded-lg border p-4 transition hover:shadow-md',
              selectedMessage === message.id ? 'border-purple-600 bg-purple-50' : 'border-gray-200 bg-white',
            ]"
          >
            <div class="flex items-start gap-3">
              <div class="relative">
                <img
                  :src="message.clientImage"
                  :alt="message.clientName"
                  class="h-12 w-12 rounded-full object-cover"
                />
                <span
                  v-if="message.unread > 0"
                  class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white"
                >
                  {{ message.unread }}
                </span>
              </div>
              <div class="flex-1 overflow-hidden">
                <div class="flex items-center justify-between">
                  <h3 class="font-semibold text-gray-900">{{ message.clientName }}</h3>
                </div>
                <p class="truncate text-sm text-gray-600">{{ message.lastMessage }}</p>
                <p class="mt-1 text-xs text-gray-400">{{ formatTime(message.timestamp) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Message Detail -->
        <div class="lg:col-span-2">
          <div v-if="selectedMessage" class="rounded-lg border border-gray-200 bg-white">
            <!-- Chat Header -->
            <div class="border-b border-gray-200 p-4">
              <div class="flex items-center gap-3">
                <img
                  :src="messages.find(m => m.id === selectedMessage)?.clientImage"
                  :alt="messages.find(m => m.id === selectedMessage)?.clientName"
                  class="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <h3 class="font-semibold text-gray-900">{{ messages.find(m => m.id === selectedMessage)?.clientName }}</h3>
                  <p class="text-xs text-gray-500">Activo hace 5 min</p>
                </div>
              </div>
            </div>

            <!-- Messages Area -->
            <div class="h-96 overflow-y-auto p-4">
              <div class="space-y-4">
                <!-- Client Message -->
                <div class="flex justify-start">
                  <div class="max-w-[80%] rounded-lg bg-gray-100 px-4 py-2">
                    <p class="text-sm text-gray-900">{{ messages.find(m => m.id === selectedMessage)?.lastMessage }}</p>
                    <p class="mt-1 text-xs text-gray-500">{{ formatTime(messages.find(m => m.id === selectedMessage)?.timestamp || '') }}</p>
                  </div>
                </div>

                <!-- Your Message -->
                <div class="flex justify-end">
                  <div class="max-w-[80%] rounded-lg bg-purple-600 px-4 py-2">
                    <p class="text-sm text-white">Hola! Claro, con gusto. ¿Qué dimensiones necesitas y en qué zona estás ubicado?</p>
                    <p class="mt-1 text-xs text-purple-200">Hace 2 horas</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Message Input -->
            <div class="border-t border-gray-200 p-4">
              <form @submit.prevent="sendMessage" class="flex gap-2">
                <input
                  v-model="messageText"
                  type="text"
                  placeholder="Escribe tu mensaje..."
                  class="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="submit"
                  class="rounded-lg bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-700"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
            <svg class="mx-auto mb-4 h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p class="text-gray-600">Selecciona una conversación para ver los mensajes</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
