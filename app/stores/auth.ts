// app/stores/auth.ts

export interface AuthState {
  id: number;
  username: string;
  email: string;
  isLoggedIn?: boolean;
}

export const useAuthStore = defineStore("authStore", {
  state: (): AuthState => ({
    id: 0,
    username: "",
    email: "",
    isLoggedIn: false,
  }),
  actions: {
    async fetch() {
      const storedUser = localStorage.getItem("authUser");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        this.id = userData.id;
        this.username = userData.username;
        this.email = userData.email;
        this.isLoggedIn = true;
      }
    },
    async setUser(userData: { id: number; username: string; email: string }) {
      this.id = userData.id;
      this.username = userData.username;
      this.email = userData.email;
      this.isLoggedIn = true;

      localStorage.setItem("authUser", JSON.stringify(userData));
    },
    async login(username: string, password: string) {
      const res = await $fetch("/api/auth/login", {
        method: "POST",
        body: {
          username: username,
          password: password,
        },
      });

      const response = res as { user: AuthState } | null;

      if (response && "user" in response) {
        this.setUser(response.user);
        navigateTo("/home");
      } else {
        alert("Error al iniciar sesión. Por favor, verifica tus credenciales.");
      }
    },

    async logout() {
      this.id = 0;
      this.username = "";
      this.email = "";
      this.isLoggedIn = false;

      localStorage.removeItem("authUser");
      navigateTo("/login");
    },
  },
});
