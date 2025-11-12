<script lang="ts" setup>
definePageMeta({
    layout: 'auth',
})
</script>

<template>
    <div
        class="flex flex-col gap-8 bg-white p-8 md:p-10 rounded-2xl shadow-md shadow-purple-300 w-full max-w-md mx-auto text-gray-800">
        <div class="text-center">
            <h2 class="text-3xl font-bold text-purple-900">Crea tu cuenta</h2>
            <p class="text-sm text-gray-500 mt-1">
                Únete a <span class="font-semibold text-purple-900">MasterClick</span> y conecta con los mejores
                profesionales
            </p>
        </div>

        <form class="flex flex-col gap-4">
            <div>
                <label for="name" class="block text-gray-700 mb-1">Nombre completo</label>
                <input id="name" type="text"
                    class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-600 outline-none"
                    placeholder="Tu nombre" />
            </div>

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

            <div>
                <label for="confirm-password" class="block text-gray-700 mb-1">Confirmar contraseña</label>
                <input id="confirm-password" type="password"
                    class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-600 outline-none"
                    placeholder="Repite tu contraseña" />
            </div>

            <button type="submit"
                class="mt-2 w-full bg-purple-800 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition">
                Registrarse
            </button>
        </form>

        <p class="text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta?
            <NuxtLink to="/login" class="text-purple-800 font-semibold hover:underline">
                Inicia sesión
            </NuxtLink>
        </p>
    </div>
</template>
