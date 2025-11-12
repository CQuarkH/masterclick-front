<template>
    <div class="w-full min-h-screen bg-gray-50 text-gray-800 flex flex-col">

        <!-- Hero Section -->
        <section class="flex w-full bg-purple-950 text-white py-20 px-6 text-center flex-1">
            <div class="max-w-4xl mx-auto">
                <h1 class="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                    Conecta con <span class="text-yellow-400">expertos locales</span> al instante
                </h1>
                <p class="text-lg md:text-xl mb-10 text-gray-200">
                    En <span class="font-semibold">MasterClick</span> puedes contactar jardineros, carpinteros,
                    mecánicos y más, con precios claros y calificaciones reales.
                </p>
                <NuxtLink to="/register"
                    class="bg-yellow-400 hover:bg-yellow-500 text-purple-950 font-semibold px-8 py-3 rounded-xl transition">
                    Explorar Maestros
                </NuxtLink>
            </div>
        </section>

        <!-- Features -->
        <section class="py-16 px-6">
            <div class="max-w-6xl mx-auto text-center">
                <h2 class="text-3xl font-bold mb-12 text-purple-950">¿Por qué elegir MasterClick?</h2>
                <div class="grid md:grid-cols-3 gap-8">
                    <div class="bg-white p-6 rounded-2xl shadow-md">
                        <h3 class="text-xl font-semibold mb-3 text-purple-900">Fácil y rápido</h3>
                        <p>Encuentra al profesional adecuado en segundos, sin llamadas ni complicaciones.</p>
                    </div>
                    <div class="bg-white p-6 rounded-2xl shadow-md">
                        <h3 class="text-xl font-semibold mb-3 text-purple-900">Calificaciones reales</h3>
                        <p>Confía en las valoraciones de otros usuarios antes de contratar un servicio.</p>
                    </div>
                    <div class="bg-white p-6 rounded-2xl shadow-md">
                        <h3 class="text-xl font-semibold mb-3 text-purple-900">Precios transparentes</h3>
                        <p>Cada maestro define su precio estimado, sin sorpresas al final del trabajo.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Categories -->
        <section class="bg-purple-50 py-16 px-6">
            <div class="max-w-6xl mx-auto text-center">
                <h2 class="text-3xl font-bold mb-12 text-purple-950">Profesionales destacados</h2>
                <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
                    <div class="bg-white shadow p-6 rounded-2xl hover:shadow-lg transition">
                        <img src="https://img.icons8.com/?size=100&id=23294&format=png&color=000000" alt="Jardineros"
                            class="mx-auto mb-4 w-20" />
                        <h3 class="font-semibold text-purple-900">Jardineros</h3>
                    </div>
                    <div class="bg-white shadow p-6 rounded-2xl hover:shadow-lg transition">
                        <img src="https://img.icons8.com/?size=100&id=5qiMalJtXD6l&format=png&color=000000"
                            alt="Carpinteros" class="mx-auto mb-4 w-20" />
                        <h3 class="font-semibold text-purple-900">Carpinteros</h3>
                    </div>
                    <div class="bg-white shadow p-6 rounded-2xl hover:shadow-lg transition">
                        <img src="https://img.icons8.com/color/96/mechanic.png" alt="Mecánicos"
                            class="mx-auto mb-4 w-20" />
                        <h3 class="font-semibold text-purple-900">Mecánicos</h3>
                    </div>
                    <div class="bg-white shadow p-6 rounded-2xl hover:shadow-lg transition">
                        <img src="https://img.icons8.com/color/96/plumber.png" alt="Gasfiteros"
                            class="mx-auto mb-4 w-20" />
                        <h3 class="font-semibold text-purple-900">Gasfiteros</h3>
                    </div>
                </div>
            </div>
        </section>

        <!-- Testimonials -->
        <section class="py-16 px-6">
            <div class="max-w-6xl mx-auto text-center">
                <h2 class="text-3xl font-bold mb-12 text-purple-950">Opiniones de nuestros usuarios</h2>
                <div class="grid md:grid-cols-3 gap-8">
                    <div class="bg-white p-6 rounded-2xl shadow">
                        <p class="italic">“Conseguí un carpintero en minutos, excelente servicio.”</p>
                        <h4 class="mt-4 font-semibold text-purple-900">– Carla M.</h4>
                    </div>
                    <div class="bg-white p-6 rounded-2xl shadow">
                        <p class="italic">“El sistema de calificación me ayudó a elegir a un gran mecánico.”</p>
                        <h4 class="mt-4 font-semibold text-purple-900">– Pedro R.</h4>
                    </div>
                    <div class="bg-white p-6 rounded-2xl shadow">
                        <p class="italic">“Todo muy rápido y seguro. Lo recomiendo 100%.”</p>
                        <h4 class="mt-4 font-semibold text-purple-900">– Ana T.</h4>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>
