<template>
    <main class="flex flex-col h-full w-full justify-between gap-10">
        <AppHeader />
        <div class="flex w-full h-full">
            <slot />
        </div>
        <AppFooter />
    </main>
</template>