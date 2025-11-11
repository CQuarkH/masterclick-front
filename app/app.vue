<script setup>
  const isLoggedIn = useState('isLoggedIn', () => true);
</script>


<template>
    <div v-if="isLoggedIn">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>

    <div v-else>
      <NuxtPage />
    </div>
</template>