// app/stores/auth.ts

export interface AuthState {
  id: number;
  username: string;
  email: string;
  isLoggedIn?: boolean;
  role?: "client" | "master";
  masterProfile?: {
    profession: string;
    rating: number;
    reviewCount: number;
    pricePerHour: number;
    location: string;
    yearsExperience: number;
    isActive: boolean;
  };
}

export const useAuthStore = defineStore("authStore", {
  state: (): AuthState => ({
    id: 0,
    username: "",
    email: "",
    isLoggedIn: false,
    role: "client",
    masterProfile: undefined,
  }),
  actions: {
    fetch() {
      const storedUser = localStorage.getItem("authUser");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        this.id = userData.id;
        this.username = userData.username;
        this.email = userData.email;
        this.isLoggedIn = true;
        this.role = userData.role || "client";
        this.masterProfile = userData.masterProfile;
      }
    },
    setUser(userData: {
      id: number;
      username: string;
      email: string;
      role?: "client" | "master";
      masterProfile?: any;
    }) {
      this.id = userData.id;
      this.username = userData.username;
      this.email = userData.email;
      this.isLoggedIn = true;
      this.role = userData.role || "client";
      this.masterProfile = userData.masterProfile;

      localStorage.setItem("authUser", JSON.stringify(userData));
    },
    switchRole(role: "client" | "master") {
      if (this.masterProfile) {
        this.role = role;
        const userData = {
          id: this.id,
          username: this.username,
          email: this.email,
          role: this.role,
          masterProfile: this.masterProfile,
        };
        localStorage.setItem("authUser", JSON.stringify(userData));
      }
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
