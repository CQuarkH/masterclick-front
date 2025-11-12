<template>
    <div class="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800">

        <!-- Hero Section -->
        <section class="relative overflow-hidden bg-gradient-to-br from-purple-950 via-purple-900 to-purple-800 text-white">
            <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
            <div class="container relative mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
                <div class="mx-auto max-w-4xl text-center">
                    <h1 class="mb-6 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                        Conecta con <span class="text-yellow-400">expertos locales</span><br />
                        al instante
                    </h1>
                    <p class="mb-10 text-base text-gray-200 sm:text-lg lg:text-xl">
                        En <span class="font-semibold">MasterClick</span> puedes contactar jardineros, carpinteros,
                        mecánicos, gasfiteros y más, con precios claros y calificaciones reales.
                    </p>
                    <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <NuxtLink
                            to="/register"
                            class="w-full rounded-xl bg-yellow-400 px-8 py-4 font-bold text-purple-950 shadow-lg transition hover:bg-yellow-300 hover:shadow-xl sm:w-auto"
                        >
                            Comenzar Gratis
                        </NuxtLink>
                        <NuxtLink
                            to="/login"
                            class="w-full rounded-xl border-2 border-white bg-transparent px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-purple-950 sm:w-auto"
                        >
                            Iniciar Sesión
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>

        <!-- Stats Section -->
        <section class="border-b bg-white py-12">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
                    <div class="rounded-lg p-4">
                        <div class="mb-2 text-3xl font-bold text-purple-950 sm:text-4xl">1,500+</div>
                        <div class="text-sm text-gray-600 sm:text-base">Maestros Verificados</div>
                    </div>
                    <div class="rounded-lg p-4">
                        <div class="mb-2 text-3xl font-bold text-purple-950 sm:text-4xl">5,000+</div>
                        <div class="text-sm text-gray-600 sm:text-base">Trabajos Completados</div>
                    </div>
                    <div class="rounded-lg p-4">
                        <div class="mb-2 text-3xl font-bold text-purple-950 sm:text-4xl">4.8★</div>
                        <div class="text-sm text-gray-600 sm:text-base">Calificación Promedio</div>
                    </div>
                    <div class="rounded-lg p-4">
                        <div class="mb-2 text-3xl font-bold text-purple-950 sm:text-4xl">24/7</div>
                        <div class="text-sm text-gray-600 sm:text-base">Soporte Disponible</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Features -->
        <section class="py-16 px-4 sm:px-6 lg:px-8">
            <div class="container mx-auto max-w-6xl">
                <div class="mb-12 text-center">
                    <h2 class="mb-4 text-3xl font-bold text-purple-950 sm:text-4xl">¿Por qué elegir MasterClick?</h2>
                    <p class="text-gray-600">La forma más fácil de encontrar profesionales confiables</p>
                </div>
                <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div class="group rounded-2xl bg-white p-6 shadow-md transition hover:shadow-xl sm:p-8">
                        <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400">
                            <svg class="h-6 w-6 text-purple-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 class="mb-3 text-xl font-semibold text-purple-900">Fácil y rápido</h3>
                        <p class="text-gray-600">Encuentra al profesional adecuado en segundos, sin llamadas ni complicaciones.</p>
                    </div>
                    <div class="group rounded-2xl bg-white p-6 shadow-md transition hover:shadow-xl sm:p-8">
                        <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400">
                            <svg class="h-6 w-6 text-purple-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                        </div>
                        <h3 class="mb-3 text-xl font-semibold text-purple-900">Calificaciones reales</h3>
                        <p class="text-gray-600">Confía en las valoraciones de otros usuarios antes de contratar un servicio.</p>
                    </div>
                    <div class="group rounded-2xl bg-white p-6 shadow-md transition hover:shadow-xl sm:p-8">
                        <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400">
                            <svg class="h-6 w-6 text-purple-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 class="mb-3 text-xl font-semibold text-purple-900">Precios transparentes</h3>
                        <p class="text-gray-600">Cada maestro define su precio estimado, sin sorpresas al final del trabajo.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Categories -->
        <section class="bg-gradient-to-b from-purple-50 to-white py-16 px-4 sm:px-6 lg:px-8">
            <div class="container mx-auto max-w-6xl">
                <div class="mb-12 text-center">
                    <h2 class="mb-4 text-3xl font-bold text-purple-950 sm:text-4xl">Categorías Populares</h2>
                    <p class="text-gray-600">Encuentra al profesional que necesitas</p>
                </div>
                <div class="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
                    <NuxtLink
                        to="/register"
                        class="group transform rounded-2xl bg-white p-6 shadow-md transition hover:scale-105 hover:shadow-xl"
                    >
                        <div class="mb-4 flex justify-center">
                            <div class="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 transition group-hover:bg-green-200">
                                <svg class="h-10 w-10 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                                </svg>
                            </div>
                        </div>
                        <h3 class="text-center font-semibold text-purple-900">Jardineros</h3>
                    </NuxtLink>
                    <NuxtLink
                        to="/register"
                        class="group transform rounded-2xl bg-white p-6 shadow-md transition hover:scale-105 hover:shadow-xl"
                    >
                        <div class="mb-4 flex justify-center">
                            <div class="flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 transition group-hover:bg-amber-200">
                                <svg class="h-10 w-10 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M13 3v7h6l-8 11v-7H5l8-11z"></path>
                                </svg>
                            </div>
                        </div>
                        <h3 class="text-center font-semibold text-purple-900">Carpinteros</h3>
                    </NuxtLink>
                    <NuxtLink
                        to="/register"
                        class="group transform rounded-2xl bg-white p-6 shadow-md transition hover:scale-105 hover:shadow-xl"
                    >
                        <div class="mb-4 flex justify-center">
                            <div class="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 transition group-hover:bg-blue-200">
                                <svg class="h-10 w-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                </svg>
                            </div>
                        </div>
                        <h3 class="text-center font-semibold text-purple-900">Mecánicos</h3>
                    </NuxtLink>
                    <NuxtLink
                        to="/register"
                        class="group transform rounded-2xl bg-white p-6 shadow-md transition hover:scale-105 hover:shadow-xl"
                    >
                        <div class="mb-4 flex justify-center">
                            <div class="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 transition group-hover:bg-red-200">
                                <svg class="h-10 w-10 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 2v2.5L12 7l3-2.5V2H9zm12 4h-5.5L12 2 8.5 6H3a2 2 0 00-2 2v12a2 2 0 002 2h18a2 2 0 002-2V8a2 2 0 00-2-2z"></path>
                                </svg>
                            </div>
                        </div>
                        <h3 class="text-center font-semibold text-purple-900">Gasfiteros</h3>
                    </NuxtLink>
                </div>
            </div>
        </section>

        <!-- How It Works -->
        <section class="py-16 px-4 sm:px-6 lg:px-8">
            <div class="container mx-auto max-w-6xl">
                <div class="mb-12 text-center">
                    <h2 class="mb-4 text-3xl font-bold text-purple-950 sm:text-4xl">¿Cómo funciona?</h2>
                    <p class="text-gray-600">Solo 3 pasos simples</p>
                </div>
                <div class="grid gap-8 md:grid-cols-3">
                    <div class="text-center">
                        <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-950 text-2xl font-bold text-white">1</div>
                        <h3 class="mb-2 text-xl font-semibold text-purple-900">Busca</h3>
                        <p class="text-gray-600">Explora perfiles de maestros por categoría, ubicación y calificaciones</p>
                    </div>
                    <div class="text-center">
                        <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-950 text-2xl font-bold text-white">2</div>
                        <h3 class="mb-2 text-xl font-semibold text-purple-900">Contacta</h3>
                        <p class="text-gray-600">Envía un mensaje directo al maestro y coordina los detalles del trabajo</p>
                    </div>
                    <div class="text-center">
                        <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-950 text-2xl font-bold text-white">3</div>
                        <h3 class="mb-2 text-xl font-semibold text-purple-900">Califica</h3>
                        <p class="text-gray-600">Deja tu reseña y ayuda a otros usuarios a tomar mejores decisiones</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Testimonials -->
        <section class="bg-purple-50 py-16 px-4 sm:px-6 lg:px-8">
            <div class="container mx-auto max-w-6xl">
                <div class="mb-12 text-center">
                    <h2 class="mb-4 text-3xl font-bold text-purple-950 sm:text-4xl">Lo que dicen nuestros usuarios</h2>
                    <p class="text-gray-600">Miles de personas confían en MasterClick</p>
                </div>
                <div class="grid gap-6 md:grid-cols-3">
                    <div class="rounded-2xl bg-white p-6 shadow-md sm:p-8">
                        <div class="mb-4 flex text-yellow-400">
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </div>
                        <p class="mb-4 italic text-gray-700">"Conseguí un carpintero en minutos, excelente servicio. El trabajo quedó perfecto y a buen precio."</p>
                        <div class="flex items-center">
                            <div class="mr-3 h-10 w-10 rounded-full bg-purple-200"></div>
                            <div>
                                <h4 class="font-semibold text-purple-900">Carla Martínez</h4>
                                <p class="text-sm text-gray-600">Cliente verificada</p>
                            </div>
                        </div>
                    </div>
                    <div class="rounded-2xl bg-white p-6 shadow-md sm:p-8">
                        <div class="mb-4 flex text-yellow-400">
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </div>
                        <p class="mb-4 italic text-gray-700">"El sistema de calificación me ayudó a elegir a un gran mecánico. Mi auto quedó como nuevo."</p>
                        <div class="flex items-center">
                            <div class="mr-3 h-10 w-10 rounded-full bg-purple-200"></div>
                            <div>
                                <h4 class="font-semibold text-purple-900">Pedro Rodríguez</h4>
                                <p class="text-sm text-gray-600">Cliente verificado</p>
                            </div>
                        </div>
                    </div>
                    <div class="rounded-2xl bg-white p-6 shadow-md sm:p-8">
                        <div class="mb-4 flex text-yellow-400">
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </div>
                        <p class="mb-4 italic text-gray-700">"Todo muy rápido y seguro. Lo recomiendo 100%. Encontré jardinero en menos de una hora."</p>
                        <div class="flex items-center">
                            <div class="mr-3 h-10 w-10 rounded-full bg-purple-200"></div>
                            <div>
                                <h4 class="font-semibold text-purple-900">Ana Torres</h4>
                                <p class="text-sm text-gray-600">Cliente verificada</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="bg-gradient-to-r from-purple-950 to-purple-800 py-16 px-4 text-white sm:px-6 lg:px-8">
            <div class="container mx-auto max-w-4xl text-center">
                <h2 class="mb-4 text-3xl font-bold sm:text-4xl">¿Listo para encontrar tu maestro ideal?</h2>
                <p class="mb-8 text-lg text-gray-200">Únete a miles de personas que ya confían en MasterClick</p>
                <NuxtLink
                    to="/register"
                    class="inline-block rounded-xl bg-yellow-400 px-8 py-4 font-bold text-purple-950 shadow-lg transition hover:bg-yellow-300 hover:shadow-xl"
                >
                    Crear Cuenta Gratis
                </NuxtLink>
            </div>
        </section>

    </div>
</template>
