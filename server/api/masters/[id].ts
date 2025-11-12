import { masters } from '~/server/data/masters';

export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, 'id'));
  const master = masters.find((m) => m.id === id);

  if (!master) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Maestro no encontrado',
    });
  }

  return master;
});
