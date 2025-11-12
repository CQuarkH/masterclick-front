<script lang="ts" setup>
const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isLoggedIn);
const currentRole = computed(() => authStore.role);
const canSwitchRole = computed(() => authStore.masterProfile !== undefined);
const mobileMenuOpen = ref(false);
const roleMenuOpen = ref(false);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};

const toggleRoleMenu = () => {
  roleMenuOpen.value = !roleMenuOpen.value;
};

const closeRoleMenu = () => {
  roleMenuOpen.value = false;
};

const handleSwitchRole = () => {
  authStore.switchRole();
  closeRoleMenu();
  closeMobileMenu();
};

const handleLogout = () => {
  authStore.logout();
  closeMobileMenu();
};

const getRoleLabel = () => {
  return currentRole.value === 'master' ? 'Modo Maestro' : 'Modo Cliente';
};

const getRoleBadgeColor = () => {
  return currentRole.value === 'master' ? 'bg-blue-500' : 'bg-green-500';
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
                        <!-- Client Mode Navigation -->
                        <template v-if="currentRole === 'client'">
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
                        </template>

                        <!-- Master Mode Navigation -->
                        <template v-else-if="currentRole === 'master'">
                            <li>
                                <NuxtLink
                                    to="/master/dashboard"
                                    class="rounded-lg px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-800"
                                >
                                    Dashboard
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink
                                    to="/master/services"
                                    class="rounded-lg px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-800"
                                >
                                    Mis Servicios
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink
                                    to="/master/messages"
                                    class="rounded-lg px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-800"
                                >
                                    Mensajes
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink
                                    to="/master/profile"
                                    class="rounded-lg px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-800"
                                >
                                    Mi Perfil
                                </NuxtLink>
                            </li>
                        </template>

                        <!-- Role Switcher (only if user has masterProfile) -->
                        <li v-if="canSwitchRole" class="relative">
                            <button
                                @click="toggleRoleMenu"
                                :class="['rounded-lg px-3 py-2 text-sm font-medium text-white transition hover:bg-purple-800 flex items-center gap-2', getRoleBadgeColor()]"
                            >
                                <span :class="['h-2 w-2 rounded-full', getRoleBadgeColor()]"></span>
                                {{ getRoleLabel() }}
                                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <!-- Role Switch Dropdown -->
                            <div
                                v-if="roleMenuOpen"
                                class="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                            >
                                <button
                                    @click="handleSwitchRole"
                                    class="block w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    <span class="flex items-center gap-2">
                                        <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                        </svg>
                                        Cambiar a {{ currentRole === 'master' ? 'Cliente' : 'Maestro' }}
                                    </span>
                                </button>
                            </div>
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
                    <!-- Role Badge (Mobile) -->
                    <li v-if="canSwitchRole" class="mb-3 rounded-lg bg-purple-800 px-4 py-2">
                        <div class="flex items-center justify-between">
                            <span class="flex items-center gap-2 text-sm font-medium text-white">
                                <span :class="['h-2 w-2 rounded-full', getRoleBadgeColor()]"></span>
                                {{ getRoleLabel() }}
                            </span>
                            <button
                                @click="handleSwitchRole"
                                class="flex items-center gap-1 rounded bg-white/10 px-3 py-1 text-xs text-white transition hover:bg-white/20"
                            >
                                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                </svg>
                                Cambiar
                            </button>
                        </div>
                    </li>

                    <!-- Client Mode Navigation (Mobile) -->
                    <template v-if="currentRole === 'client'">
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
                    </template>

                    <!-- Master Mode Navigation (Mobile) -->
                    <template v-else-if="currentRole === 'master'">
                        <li>
                            <NuxtLink
                                to="/master/dashboard"
                                @click="closeMobileMenu"
                                class="block rounded-lg px-4 py-3 text-sm font-medium text-white transition hover:bg-purple-800"
                            >
                                Dashboard
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink
                                to="/master/services"
                                @click="closeMobileMenu"
                                class="block rounded-lg px-4 py-3 text-sm font-medium text-white transition hover:bg-purple-800"
                            >
                                Mis Servicios
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink
                                to="/master/messages"
                                @click="closeMobileMenu"
                                class="block rounded-lg px-4 py-3 text-sm font-medium text-white transition hover:bg-purple-800"
                            >
                                Mensajes
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink
                                to="/master/profile"
                                @click="closeMobileMenu"
                                class="block rounded-lg px-4 py-3 text-sm font-medium text-white transition hover:bg-purple-800"
                            >
                                Mi Perfil
                            </NuxtLink>
                        </li>
                    </template>

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