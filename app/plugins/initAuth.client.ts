export default defineNuxtPlugin(() => {
  const authStore = useAuthStore();

  // Evita llamar fetch más de una vez
  if (!authStore.isLoggedIn) {
    authStore.fetch();
  }
});
