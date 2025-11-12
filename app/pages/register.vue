<script lang="ts" setup>
definePageMeta({
    layout: 'auth',
})

const authStore = useAuthStore();
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const error = ref('');
const success = ref(false);

async function handleFormSubmit(data: Event) {
    data.preventDefault();
    error.value = '';

    // Validations
    if (password.value.length < 6) {
        error.value = 'La contraseña debe tener al menos 6 caracteres';
        return;
    }

    if (password.value !== confirmPassword.value) {
        error.value = 'Las contraseñas no coinciden';
        return;
    }

    loading.value = true;

    try {
        // Simular registro (aquí iría la llamada a la API real)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Registrar al usuario automáticamente después del registro
        const userData = {
            id: Math.floor(Math.random() * 1000),
            username: name.value,
            email: email.value,
        };

        authStore.setUser(userData);
        success.value = true;

        // Redirigir después de 1 segundo
        setTimeout(() => {
            navigateTo('/home');
        }, 1000);
    } catch (e: any) {
        error.value = e.message || 'Error al registrar. Por favor intenta de nuevo.';
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
                    Crea tu cuenta
                </h2>
                <p class="mt-2 text-sm text-gray-600">
                    Únete a MasterClick y conecta con los mejores profesionales
                </p>
            </div>

            <!-- Form Card -->
            <div class="rounded-2xl bg-white p-6 shadow-xl sm:p-10">
                <form class="space-y-5" @submit="handleFormSubmit">
                    <!-- Success Message -->
                    <div
                        v-if="success"
                        class="rounded-lg bg-green-50 p-4 text-sm text-green-800"
                    >
                        <div class="flex">
                            <svg class="mr-2 h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                            </svg>
                            ¡Registro exitoso! Redirigiendo...
                        </div>
                    </div>

                    <!-- Error Message -->
                    <div
                        v-if="error"
                        class="rounded-lg bg-red-50 p-4 text-sm text-red-800"
                    >
                        <div class="flex">
                            <svg class="mr-2 h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                            </svg>
                            {{ error }}
                        </div>
                    </div>

                    <!-- Name Field -->
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700">
                            Nombre completo
                        </label>
                        <div class="relative mt-1">
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <input
                                id="name"
                                v-model="name"
                                type="text"
                                required
                                class="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Juan Pérez"
                            />
                        </div>
                    </div>

                    <!-- Email Field -->
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">
                            Correo electrónico
                        </label>
                        <div class="relative mt-1">
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                            </div>
                            <input
                                id="email"
                                v-model="email"
                                type="email"
                                required
                                class="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="ejemplo@correo.com"
                            />
                        </div>
                    </div>

                    <!-- Password Field -->
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <div class="relative mt-1">
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <input
                                id="password"
                                v-model="password"
                                type="password"
                                required
                                minlength="6"
                                class="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Mínimo 6 caracteres"
                            />
                        </div>
                    </div>

                    <!-- Confirm Password Field -->
                    <div>
                        <label for="confirm-password" class="block text-sm font-medium text-gray-700">
                            Confirmar contraseña
                        </label>
                        <div class="relative mt-1">
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <input
                                id="confirm-password"
                                v-model="confirmPassword"
                                type="password"
                                required
                                class="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Repite tu contraseña"
                            />
                        </div>
                    </div>

                    <!-- Terms and Conditions -->
                    <div class="flex items-start">
                        <input
                            id="terms"
                            type="checkbox"
                            required
                            class="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <label for="terms" class="ml-2 block text-sm text-gray-700">
                            Acepto los <a href="#" class="font-medium text-purple-600 hover:text-purple-500">términos y condiciones</a> y la <a href="#" class="font-medium text-purple-600 hover:text-purple-500">política de privacidad</a>
                        </label>
                    </div>

                    <!-- Submit Button -->
                    <div>
                        <button
                            type="submit"
                            :disabled="loading || success"
                            class="flex w-full justify-center rounded-lg bg-purple-950 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <svg
                                v-if="loading"
                                class="mr-2 h-5 w-5 animate-spin text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {{ loading ? 'Creando cuenta...' : success ? '¡Cuenta creada!' : 'Crear Cuenta' }}
                        </button>
                    </div>
                </form>
            </div>

            <!-- Sign In Link -->
            <p class="text-center text-sm text-gray-600">
                ¿Ya tienes una cuenta?
                <NuxtLink
                    to="/login"
                    class="font-semibold text-purple-600 hover:text-purple-500"
                >
                    Inicia sesión
                </NuxtLink>
            </p>
        </div>
    </div>
</template>
