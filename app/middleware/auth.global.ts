export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return;

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
  } else if (
    isAuthenticated() === true &&
    (to.path === "/login" || to.path === "/register" || to.path === "/")
  ) {
    return navigateTo("/home");
  }

  if (authStore.role === "master" && to.path === "/home") {
    return navigateTo("/master/dashboard");
  }
});
