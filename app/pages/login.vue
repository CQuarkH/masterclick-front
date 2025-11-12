<script lang="ts" setup>
definePageMeta({
    layout: 'auth',
})

const authStore = useAuthStore();

async function handleFormSubmit(data: Event) {
    data.preventDefault();
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    await authStore.login(email, password);

}
</script>

<template>
    <div
        class="flex flex-col gap-8 bg-white p-8 md:p-10 rounded-2xl shadow-md shadow-purple-300 w-full max-w-md mx-auto text-gray-800">
        <div class="text-center">
            <h2 class="text-3xl font-bold text-purple-900">MasterClick</h2>
            <p class="text-sm text-gray-500 mt-1">Inicia sesión en tu cuenta</p>
        </div>

        <form class="flex flex-col gap-4" @submit="handleFormSubmit">
            <div>
                <label for="email" class="block text-gray-700 mb-1">Correo electrónico</label>
                <input id="email" type="email"
                    class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-600 outline-none"
                    placeholder="ejemplo@correo.com" />
            </div>

            <div>
                <label for="password" class="block text-gray-700 mb-1">Contraseña</label>
                <input id="password" type="password"
                    class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-600 outline-none"
                    placeholder="••••••••" />
            </div>

            <button type="submit"
                class="mt-2 w-full bg-purple-800 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition">
                Iniciar Sesión
            </button>
        </form>

        <p class="text-center text-sm text-gray-600">
            ¿No tienes una cuenta?
            <NuxtLink to="/register" class="text-purple-800 font-semibold hover:underline">
                Regístrate aquí
            </NuxtLink>
        </p>
    </div>
</template>
