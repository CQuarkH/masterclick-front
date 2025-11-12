export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();

  // Evita llamar fetch más de una vez
  if (!authStore.isLoggedIn) {
    await authStore.fetch();
  }
});
