<script setup lang="ts">
interface Review {
  id: number;
  userName: string;
  userImage: string;
  rating: number;
  comment: string;
  date: string;
}

defineProps<{
  reviews: Review[];
}>();

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
</script>

<template>
  <div class="space-y-4">
    <div
      v-for="review in reviews"
      :key="review.id"
      class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
    >
      <!-- User Info -->
      <div class="mb-4 flex items-start justify-between">
        <div class="flex items-center gap-3">
          <img
            :src="review.userImage"
            :alt="`Foto de ${review.userName}`"
            class="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <h4 class="font-semibold text-gray-900">{{ review.userName }}</h4>
            <p class="text-sm text-gray-500">{{ formatDate(review.date) }}</p>
          </div>
        </div>

        <!-- Rating Stars -->
        <div class="flex items-center gap-1">
          <template v-for="i in 5" :key="i">
            <svg
              :class="[
                'h-5 w-5',
                i <= review.rating ? 'text-yellow-400' : 'text-gray-300',
              ]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </template>
        </div>
      </div>

      <!-- Comment -->
      <p class="text-gray-700">{{ review.comment }}</p>
    </div>

    <!-- Empty State -->
    <div
      v-if="reviews.length === 0"
      class="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center"
    >
      <svg class="mx-auto mb-4 h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
      </svg>
      <p class="text-sm text-gray-500">Aún no hay reseñas para este maestro</p>
    </div>
  </div>
</template>
