<script lang="ts"></script>

<template>
    <main class="flex flex-col h-full w-full sm:w-screen justify-between">
        <AppHeader />
        <div class="flex w-full h-full">
            <slot />
        </div>
        <AppFooter />
    </main>
</template>