<script lang="ts" setup>
const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isLoggedIn);

</script>


<template>
    <header class="flex w-full bg-purple-950 h-16 py-4 px-10 items-center justify-between text-white">
        <NuxtLink to="/" class="font-semibold">
            MasterClick
        </NuxtLink>
        <nav>
            <ul v-if="!isLoggedIn" class="flex space-x-4">
                <li class="py-2 px-4 bg-white rounded-lg text-black font-medium text-sm">
                    <NuxtLink to="/login">Iniciar Sesión</NuxtLink>
                </li>
                <li class="py-2 px-4 rounded-lg text-black font-medium text-sm">
                    <NuxtLink to="/register">Registrarse</NuxtLink>
                </li>
            </ul>
            <ul v-else class="flex space-x-4">
                <li class="py-2 px-4 rounded-lg text-white font-medium text-sm">
                    <NuxtLink to="/profile">Perfil</NuxtLink>
                </li>
                <li class="py-2 px-4 bg-white rounded-lg text-black font-medium text-sm">
                    <NuxtLink to="/logout">Cerrar Sesión</NuxtLink>
                </li>
            </ul>
        </nav>
    </header>
</template>