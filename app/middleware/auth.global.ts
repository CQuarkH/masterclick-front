export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const isAuthenticated = () => {
    return authStore.isLoggedIn;
  };

  if (
    isAuthenticated() === false &&
    to.path !== "/login" &&
    to.path !== "/register" &&
    to.path !== "/"
  ) {
    return navigateTo("/login");
  }

  if (
    isAuthenticated() === true &&
    (to.path === "/login" || to.path === "/register" || to.path === "/")
  ) {
    return navigateTo("/home");
  }
});
