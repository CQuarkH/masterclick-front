// server/api/auth/login.ts

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body;

  // Usuario cliente
  if (username === "usuario@ejemplo" && password === "123456") {
    return {
      success: true,
      user: {
        id: 1,
        username: "usuario_ejemplo",
        email: "usuario_ejemplo@example.com",
        role: 'client',
      },
    };
  }

  // Usuario maestro (Carlos Soto - Carpintero)
  if (username === "maestro@ejemplo" && password === "123456") {
    return {
      success: true,
      user: {
        id: 100,
        username: "Carlos Soto",
        email: "carlos.soto@masterclick.com",
        role: 'master',
        masterProfile: {
          masterId: 1, // ID del maestro en la tabla de maestros
          profession: "Carpintero",
          rating: 4.8,
          reviewCount: 45,
          pricePerHour: 15000,
          location: "Santiago Centro",
          yearsExperience: 12,
          isActive: true,
        },
      },
    };
  }

  return {
    success: false,
    message: "Credenciales inválidas",
  };
});
