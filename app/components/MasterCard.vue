<script setup lang="ts">
interface Master {
    id: number;
    name: string;
    profession: string;
    rating: number;
    pricePerHour: number;
    image: string;
}

defineProps<{
    master: Master;
}>();
</script>

<template>
    <div class="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col items-center">
        <img :src="master.image" alt="Foto del maestro" class="w-24 h-24 rounded-full mb-3 object-cover" />
        <h2 class="text-lg font-semibold text-gray-800">{{ master.name }}</h2>
        <p class="text-sm text-gray-500">{{ master.profession }}</p>

        <div class="flex items-center mt-2">
            <span class="text-yellow-400 mr-1">★</span>
            <span class="text-sm font-medium">{{ master.rating }}</span>
        </div>

        <p class="mt-3 text-purple-950 font-bold">
            ${{ master.pricePerHour.toLocaleString("es-CL") }} / hora
        </p>

        <NuxtLink :to="`/masters/${master.id}`"
            class="mt-4 bg-purple-800 text-white py-2 px-4 rounded-lg text-sm hover:bg-purple-700">
            Ver Detalles
        </NuxtLink>
    </div>
</template>
