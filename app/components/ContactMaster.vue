<script setup lang="ts">
interface Master {
  id: number;
  name: string;
  image: string;
  profession: string;
}

const props = defineProps<{
  master: Master;
}>();

const message = ref('');
const messages = ref<Array<{ text: string; from: 'user' | 'master'; timestamp: string }>>([]);
const showChat = ref(false);
const loading = ref(false);

const sendMessage = async () => {
  if (!message.value.trim()) return;

  const newMessage = {
    text: message.value,
    from: 'user' as const,
    timestamp: new Date().toISOString(),
  };

  messages.value.push(newMessage);
  const messageText = message.value;
  message.value = '';
  loading.value = true;

  // Simular respuesta del maestro
  setTimeout(() => {
    messages.value.push({
      text: `¡Hola! Gracias por contactarme. Estaré encantado de ayudarte. ¿Podrías darme más detalles sobre lo que necesitas?`,
      from: 'master',
      timestamp: new Date().toISOString(),
    });
    loading.value = false;
  }, 1500);
};

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('es-CL', {
    hour: '2-digit',
    minute: '2-digit',
  });
};
</script>

<template>
  <div class="rounded-lg border border-gray-200 bg-white shadow-sm">
    <!-- Header -->
    <div class="border-b border-gray-200 bg-purple-950 p-4 rounded-t-lg">
      <button
        @click="showChat = !showChat"
        class="flex w-full items-center justify-between text-white"
      >
        <div class="flex items-center gap-3">
          <img
            :src="master.image"
            :alt="`Foto de ${master.name}`"
            class="h-10 w-10 rounded-full object-cover"
          />
          <div class="text-left">
            <h3 class="font-semibold">Contactar a {{ master.name }}</h3>
            <p class="text-sm text-gray-300">{{ master.profession }}</p>
          </div>
        </div>
        <svg
          :class="[
            'h-5 w-5 transition-transform',
            showChat ? 'rotate-180' : '',
          ]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>

    <!-- Chat Content -->
    <div v-if="showChat" class="space-y-4 p-4">
      <!-- Messages -->
      <div v-if="messages.length > 0" class="max-h-96 space-y-3 overflow-y-auto">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="[
            'flex',
            msg.from === 'user' ? 'justify-end' : 'justify-start',
          ]"
        >
          <div
            :class="[
              'max-w-[80%] rounded-lg px-4 py-2',
              msg.from === 'user'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-900',
            ]"
          >
            <p class="text-sm">{{ msg.text }}</p>
            <p
              :class="[
                'mt-1 text-xs',
                msg.from === 'user' ? 'text-purple-200' : 'text-gray-500',
              ]"
            >
              {{ formatTime(msg.timestamp) }}
            </p>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="flex justify-start">
          <div class="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2">
            <div class="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
            <div class="h-2 w-2 animate-bounce rounded-full bg-gray-400" style="animation-delay: 0.1s"></div>
            <div class="h-2 w-2 animate-bounce rounded-full bg-gray-400" style="animation-delay: 0.2s"></div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="rounded-lg bg-gray-50 p-8 text-center">
        <svg class="mx-auto mb-3 h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <p class="text-sm text-gray-600">Envía un mensaje para iniciar la conversación</p>
      </div>

      <!-- Input -->
      <form @submit.prevent="sendMessage" class="flex gap-2">
        <input
          v-model="message"
          type="text"
          placeholder="Escribe tu mensaje..."
          class="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          :disabled="!message.trim() || loading"
          class="rounded-lg bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>

      <!-- Contact Info -->
      <div class="mt-4 rounded-lg bg-blue-50 p-4">
        <p class="text-xs text-blue-800">
          <strong>Tip:</strong> Describe claramente el trabajo que necesitas, tu ubicación y disponibilidad para recibir una respuesta más rápida y precisa.
        </p>
      </div>
    </div>
  </div>
</template>
