<script setup lang="ts">
interface Master {
    id: number;
    name: string;
    profession: string;
    rating: number;
    reviewCount?: number;
    pricePerHour: number;
    image: string;
    location?: string;
    verified?: boolean;
    responseTime?: string;
}

defineProps<{
    master: Master;
}>();
</script>

<template>
    <div class="group relative overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl">
        <!-- Image Section -->
        <div class="relative h-48 overflow-hidden bg-gradient-to-br from-purple-100 to-purple-50">
            <img
                :src="master.image"
                :alt="`Foto de ${master.name}`"
                class="h-full w-full object-cover transition duration-300 group-hover:scale-110"
            />
            <!-- Verified Badge -->
            <div v-if="master.verified" class="absolute right-3 top-3 rounded-full bg-blue-500 p-1.5">
                <svg class="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
            </div>
        </div>

        <!-- Content Section -->
        <div class="p-5">
            <!-- Name and Profession -->
            <div class="mb-3">
                <h3 class="text-lg font-bold text-gray-900">{{ master.name }}</h3>
                <p class="text-sm text-purple-600 font-medium">{{ master.profession }}</p>
            </div>

            <!-- Rating and Reviews -->
            <div class="mb-3 flex items-center justify-between">
                <div class="flex items-center">
                    <div class="flex text-yellow-400">
                        <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    </div>
                    <span class="ml-1 text-sm font-semibold text-gray-900">{{ master.rating }}</span>
                    <span v-if="master.reviewCount" class="ml-1 text-xs text-gray-500">({{ master.reviewCount }})</span>
                </div>
                <div v-if="master.responseTime" class="flex items-center text-xs text-gray-500">
                    <svg class="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ master.responseTime }}
                </div>
            </div>

            <!-- Location -->
            <div v-if="master.location" class="mb-4 flex items-center text-sm text-gray-600">
                <svg class="mr-1.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ master.location }}
            </div>

            <!-- Price and Button -->
            <div class="flex items-center justify-between border-t border-gray-100 pt-4">
                <div>
                    <p class="text-xs text-gray-500">Desde</p>
                    <p class="text-lg font-bold text-purple-950">
                        ${{ master.pricePerHour.toLocaleString('es-CL') }}
                        <span class="text-xs font-normal text-gray-500">/hora</span>
                    </p>
                </div>
                <NuxtLink
                    :to="`/masters/${master.id}`"
                    class="rounded-lg bg-purple-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-800"
                >
                    Ver Perfil
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
