<script lang="ts" setup>
definePageMeta({
    layout: 'auth',
})

const authStore = useAuthStore();
const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');

async function handleFormSubmit(data: Event) {
    data.preventDefault();
    error.value = '';
    loading.value = true;

    try {
        await authStore.login(email.value, password.value);
    } catch (e: any) {
        error.value = e.message || 'Error al iniciar sesión. Verifica tus credenciales.';
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <div class="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
            <!-- Logo and Title -->
            <div class="text-center">
                <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-950">
                    <span class="text-2xl font-bold text-yellow-400">M</span>
                </div>
                <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    Bienvenido de vuelta
                </h2>
                <p class="mt-2 text-sm text-gray-600">
                    Inicia sesión para encontrar maestros profesionales
                </p>
            </div>

            <!-- Form Card -->
            <div class="rounded-2xl bg-white p-6 shadow-xl sm:p-10">
                <form class="space-y-6" @submit="handleFormSubmit">
                    <!-- Error Message -->
                    <div v-if="error" class="rounded-lg bg-red-50 p-4 text-sm text-red-800">
                        <div class="flex">
                            <svg class="mr-2 h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clip-rule="evenodd" />
                            </svg>
                            {{ error }}
                        </div>
                    </div>

                    <!-- Email Field -->
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">
                            Correo electrónico
                        </label>
                        <div class="relative mt-1">
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                            </div>
                            <input id="email" v-model="email" type="email" required
                                class="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="usuario@ejemplo.com" />
                        </div>
                    </div>

                    <!-- Password Field -->
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <div class="relative mt-1">
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <input id="password" v-model="password" type="password" required
                                class="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="••••••••" />
                        </div>
                    </div>

                    <!-- Remember Me & Forgot Password -->
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input id="remember-me" type="checkbox"
                                class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                            <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                                Recordarme
                            </label>
                        </div>
                        <div class="text-sm">
                            <a href="#" class="font-medium text-purple-600 hover:text-purple-500">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <div>
                        <button type="submit" :disabled="loading"
                            class="flex w-full justify-center rounded-lg bg-purple-950 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                            <svg v-if="loading" class="mr-2 h-5 w-5 animate-spin text-white"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            {{ loading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
                        </button>
                    </div>

                    <!-- Demo Credentials -->
                    <div class="rounded-lg bg-blue-50 p-4">
                        <p class="text-xs font-medium text-blue-800">Credenciales de prueba:</p>
                        <p class="text-xs text-blue-700">Email: usuario@ejemplo</p>
                        <p class="text-xs text-blue-700">Contraseña: 123456</p>
                    </div>
                </form>
            </div>

            <!-- Sign Up Link -->
            <p class="text-center text-sm text-gray-600">
                ¿No tienes una cuenta?
                <NuxtLink to="/register" class="font-semibold text-purple-600 hover:text-purple-500">
                    Regístrate gratis
                </NuxtLink>
            </p>
        </div>
    </div>
</template>
