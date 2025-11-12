import { masters } from '../../data/masters';

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const category = query.category as string | undefined;
  const search = query.search as string | undefined;
  const minRating = query.minRating ? Number(query.minRating) : undefined;

  let filteredMasters = [...masters];

  // Filtrar por categoría
  if (category) {
    filteredMasters = filteredMasters.filter(
      (m) => m.category === category
    );
  }

  // Filtrar por búsqueda (nombre o profesión)
  if (search) {
    const searchLower = search.toLowerCase();
    filteredMasters = filteredMasters.filter(
      (m) =>
        m.name.toLowerCase().includes(searchLower) ||
        m.profession.toLowerCase().includes(searchLower) ||
        m.description.toLowerCase().includes(searchLower)
    );
  }

  // Filtrar por rating mínimo
  if (minRating) {
    filteredMasters = filteredMasters.filter((m) => m.rating >= minRating);
  }

  // Retornar solo los campos necesarios para el listado
  return filteredMasters.map((m) => ({
    id: m.id,
    name: m.name,
    profession: m.profession,
    category: m.category,
    rating: m.rating,
    reviewCount: m.reviewCount,
    pricePerHour: m.pricePerHour,
    image: m.image,
    location: m.location,
    verified: m.verified,
    responseTime: m.responseTime,
  }));
});
