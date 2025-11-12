<script lang="ts" setup>
const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isLoggedIn);
const mobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};

const handleLogout = () => {
  authStore.logout();
  closeMobileMenu();
};
</script>

<template>
    <header class="sticky top-0 z-50 w-full bg-purple-950 shadow-lg">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 items-center justify-between">
                <!-- Logo -->
                <NuxtLink to="/" class="flex items-center space-x-2" @click="closeMobileMenu">
                    <div class="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400">
                        <span class="text-xl font-bold text-purple-950">M</span>
                    </div>
                    <span class="text-xl font-bold text-white">MasterClick</span>
                </NuxtLink>

                <!-- Desktop Navigation -->
                <nav class="hidden md:block">
                    <ul v-if="!isLoggedIn" class="flex items-center space-x-4">
                        <li>
                            <NuxtLink
                                to="/login"
                                class="rounded-lg px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-800"
                            >
                                Iniciar Sesión
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink
                                to="/register"
                                class="rounded-lg bg-yellow-400 px-4 py-2 text-sm font-bold text-purple-950 transition hover:bg-yellow-300"
                            >
                                Registrarse
                            </NuxtLink>
                        </li>
                    </ul>
                    <ul v-else class="flex items-center space-x-4">
                        <li>
                            <NuxtLink
                                to="/home"
                                class="rounded-lg px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-800"
                            >
                                Buscar Maestros
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink
                                to="/profile"
                                class="rounded-lg px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-800"
                            >
                                Mi Perfil
                            </NuxtLink>
                        </li>
                        <li>
                            <button
                                @click="handleLogout"
                                class="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                            >
                                Cerrar Sesión
                            </button>
                        </li>
                    </ul>
                </nav>

                <!-- Mobile menu button -->
                <button
                    @click="toggleMobileMenu"
                    class="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-purple-800 md:hidden"
                    aria-label="Toggle menu"
                >
                    <svg
                        v-if="!mobileMenuOpen"
                        class="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <svg
                        v-else
                        class="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>

        <!-- Mobile menu -->
        <div
            v-if="mobileMenuOpen"
            class="border-t border-purple-800 md:hidden"
        >
            <nav class="container mx-auto px-4 py-4">
                <ul v-if="!isLoggedIn" class="space-y-2">
                    <li>
                        <NuxtLink
                            to="/login"
                            @click="closeMobileMenu"
                            class="block rounded-lg px-4 py-3 text-sm font-medium text-white transition hover:bg-purple-800"
                        >
                            Iniciar Sesión
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink
                            to="/register"
                            @click="closeMobileMenu"
                            class="block rounded-lg bg-yellow-400 px-4 py-3 text-center text-sm font-bold text-purple-950 transition hover:bg-yellow-300"
                        >
                            Registrarse
                        </NuxtLink>
                    </li>
                </ul>
                <ul v-else class="space-y-2">
                    <li>
                        <NuxtLink
                            to="/home"
                            @click="closeMobileMenu"
                            class="block rounded-lg px-4 py-3 text-sm font-medium text-white transition hover:bg-purple-800"
                        >
                            Buscar Maestros
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink
                            to="/profile"
                            @click="closeMobileMenu"
                            class="block rounded-lg px-4 py-3 text-sm font-medium text-white transition hover:bg-purple-800"
                        >
                            Mi Perfil
                        </NuxtLink>
                    </li>
                    <li>
                        <button
                            @click="handleLogout"
                            class="w-full rounded-lg bg-red-600 px-4 py-3 text-left text-sm font-medium text-white transition hover:bg-red-700"
                        >
                            Cerrar Sesión
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>