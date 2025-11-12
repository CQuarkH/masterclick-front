// server/api/masters/[id].ts
export default defineEventHandler((event) => {
  const masters = [
    {
      id: 1,
      name: "Carlos Soto",
      profession: "Carpintero",
      rating: 4.8,
      pricePerHour: 15000,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      description:
        "Experto en muebles a medida, restauraciones y estructuras de madera. Más de 10 años de experiencia.",
    },
    {
      id: 2,
      name: "María López",
      profession: "Jardinera",
      rating: 4.6,
      pricePerHour: 12000,
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      description:
        "Diseño y mantenimiento de jardines residenciales. Especialista en plantas nativas y paisajismo sustentable.",
    },
    {
      id: 3,
      name: "José Rivas",
      profession: "Mecánico",
      rating: 4.9,
      pricePerHour: 18000,
      image: "https://randomuser.me/api/portraits/men/12.jpg",
      description:
        "Diagnóstico y reparación de autos y motocicletas. Atención rápida y confiable.",
    },
    {
      id: 4,
      name: "Ana Torres",
      profession: "Electricista",
      rating: 4.7,
      pricePerHour: 16000,
      image: "https://randomuser.me/api/portraits/women/56.jpg",
      description:
        "Instalaciones, mantenimiento y revisión de sistemas eléctricos residenciales y comerciales.",
    },
  ];

  const id = Number(getRouterParam(event, "id"));
  const master = masters.find((m) => m.id === id);

  if (!master) {
    throw createError({
      statusCode: 404,
      statusMessage: "Maestro no encontrado",
    });
  }

  return master;
});
