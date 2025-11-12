<script setup lang="ts">
const route = useRoute();
const { data: master, pending, error } = await useFetch(`/api/masters/${route.params.id}`);
</script>

<template>
    <div class="min-h-screen bg-gray-50 px-6 py-10 flex w-full justify-center">
        <div v-if="pending" class="text-center text-gray-500">Cargando información...</div>

        <div v-else-if="error" class="text-center text-red-500">
            No se encontró el maestro solicitado.
        </div>

        <div v-if="master !== undefined"
            class="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-6">
            <img :src="master.image" alt="Foto del maestro" class="w-40 h-40 rounded-full object-cover shadow-md" />
            <div class="flex flex-col gap-3 text-center md:text-left">
                <h1 class="text-2xl font-bold text-purple-950">{{ master.name }}</h1>
                <p class="text-gray-600">{{ master.profession }}</p>

                <div class="flex items-center justify-center md:justify-start">
                    <span class="text-yellow-400 mr-1">★</span>
                    <span class="text-gray-800 font-medium">{{ master.rating }}</span>
                </div>

                <p class="text-lg font-bold text-purple-800">
                    Precio estimado: ${{ master.pricePerHour.toLocaleString("es-CL") }} / hora
                </p>

                <p class="text-gray-700 mt-2">
                    {{ master.description }}
                </p>

                <button class="mt-4 bg-purple-800 text-white py-2 px-6 rounded-lg text-sm hover:bg-purple-700">
                    Contactar Maestro
                </button>
            </div>
        </div>
    </div>
</template>
