<script setup lang="ts">
import MasterCard from '../components/MasterCard.vue';


const { data: masters, pending, error } = await useFetch("/api/masters");
</script>

<template>
    <div class="flex flex-col w-full h-full items-center overflow-hidden bg-gray-50 px-6 py-10">
        <h1 class="text-3xl font-bold text-purple-950 mb-8 text-center">
            Maestros disponibles
        </h1>

        <!-- Loading state -->
        <div v-if="pending" class="text-center text-gray-500">Cargando maestros...</div>

        <!-- Error -->
        <div v-else-if="error" class="text-center text-red-500">
            Ocurrió un error al cargar los datos.
        </div>

        <!-- Grid de maestros -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <MasterCard v-for="master in masters" :key="master.id" :master="master" />
        </div>
    </div>
</template>
