// server/api/auth/login.ts

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body;

  // simular validación de usuario
  if (username === "usuario@ejemplo" && password === "123456") {
    return {
      success: true,
      user: {
        id: 1,
        username: "usuario_ejemplo",
        email: "usuario_ejemplo@example.com",
      },
    };
  } else {
    return {
      success: false,
      message: "Credenciales inválidas",
    };
  }
});
