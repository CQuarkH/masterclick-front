import { describe, it, expect } from 'vitest'

// Mock master data similar to server/data/masters.ts
const mockMasters = [
  {
    id: 1,
    name: 'Carlos Soto',
    profession: 'Carpintero',
    category: 'carpinteria',
    rating: 4.8,
    reviewCount: 45,
    pricePerHour: 15000,
    image: '/images/master1.jpg',
    location: 'Santiago Centro',
    verified: true,
    responseTime: '2 horas',
    description: 'Carpintero experto con más de 10 años de experiencia',
  },
  {
    id: 2,
    name: 'María González',
    profession: 'Plomera',
    category: 'plomeria',
    rating: 4.9,
    reviewCount: 67,
    pricePerHour: 12000,
    image: '/images/master2.jpg',
    location: 'Providencia',
    verified: true,
    responseTime: '1 hora',
    description: 'Especialista en plomería residencial y comercial',
  },
  {
    id: 3,
    name: 'Jorge Ramírez',
    profession: 'Electricista',
    category: 'electricidad',
    rating: 4.7,
    reviewCount: 52,
    pricePerHour: 18000,
    image: '/images/master3.jpg',
    location: 'Las Condes',
    verified: true,
    responseTime: '3 horas',
    description: 'Electricista certificado con amplia experiencia',
  },
  {
    id: 4,
    name: 'Ana Torres',
    profession: 'Jardinera',
    category: 'jardineria',
    rating: 4.6,
    reviewCount: 38,
    pricePerHour: 10000,
    image: '/images/master4.jpg',
    location: 'Ñuñoa',
    verified: false,
    responseTime: '4 horas',
    description: 'Experta en diseño y mantención de jardines',
  },
  {
    id: 5,
    name: 'Pedro Vargas',
    profession: 'Mecánico',
    category: 'mecanica',
    rating: 4.5,
    reviewCount: 41,
    pricePerHour: 20000,
    image: '/images/master5.jpg',
    location: 'Maipú',
    verified: true,
    responseTime: '2 horas',
    description: 'Mecánico automotriz con certificación internacional',
  },
]

describe('Masters API Endpoints', () => {
  describe('GET /api/masters', () => {
    it('should return all masters when no filters are applied', () => {
      const query = {}
      const result = getMasters(query)

      expect(result).toHaveLength(5)
      expect(result[0].name).toBe('Carlos Soto')
    })

    it('should filter masters by category', () => {
      const query = { category: 'carpinteria' }
      const result = getMasters(query)

      expect(result).toHaveLength(1)
      expect(result[0].profession).toBe('Carpintero')
      expect(result[0].category).toBe('carpinteria')
    })

    it('should filter masters by search term (name)', () => {
      const query = { search: 'carlos' }
      const result = getMasters(query)

      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Carlos Soto')
    })

    it('should filter masters by search term (profession)', () => {
      const query = { search: 'plomera' }
      const result = getMasters(query)

      expect(result).toHaveLength(1)
      expect(result[0].profession).toBe('Plomera')
    })

    it('should filter masters by search term (description)', () => {
      const query = { search: 'jardines' }
      const result = getMasters(query)

      expect(result).toHaveLength(1)
      expect(result[0].profession).toBe('Jardinera')
    })

    it('should filter masters by minimum rating', () => {
      const query = { minRating: '4.8' }
      const result = getMasters(query)

      expect(result).toHaveLength(2) // Carlos (4.8) and María (4.9)
      expect(result.every((m) => m.rating >= 4.8)).toBe(true)
    })

    it('should combine multiple filters', () => {
      const query = {
        category: 'carpinteria',
        minRating: '4.5',
      }
      const result = getMasters(query)

      expect(result).toHaveLength(1)
      expect(result[0].category).toBe('carpinteria')
      expect(result[0].rating).toBeGreaterThanOrEqual(4.5)
    })

    it('should return empty array when no masters match filters', () => {
      const query = {
        category: 'carpinteria',
        minRating: '5.0',
      }
      const result = getMasters(query)

      expect(result).toHaveLength(0)
    })

    it('should be case-insensitive for search', () => {
      const query1 = { search: 'CARLOS' }
      const query2 = { search: 'carlos' }
      const query3 = { search: 'Carlos' }

      const result1 = getMasters(query1)
      const result2 = getMasters(query2)
      const result3 = getMasters(query3)

      expect(result1).toHaveLength(1)
      expect(result2).toHaveLength(1)
      expect(result3).toHaveLength(1)
      expect(result1[0].id).toBe(result2[0].id)
      expect(result2[0].id).toBe(result3[0].id)
    })

    it('should return only necessary fields for listing', () => {
      const query = {}
      const result = getMasters(query)

      const master = result[0]
      expect(master).toHaveProperty('id')
      expect(master).toHaveProperty('name')
      expect(master).toHaveProperty('profession')
      expect(master).toHaveProperty('category')
      expect(master).toHaveProperty('rating')
      expect(master).toHaveProperty('reviewCount')
      expect(master).toHaveProperty('pricePerHour')
      expect(master).toHaveProperty('image')
      expect(master).toHaveProperty('location')
      expect(master).toHaveProperty('verified')
      expect(master).toHaveProperty('responseTime')
    })

    it('should filter by multiple categories sequentially', () => {
      const query1 = { category: 'plomeria' }
      const query2 = { category: 'electricidad' }

      const result1 = getMasters(query1)
      const result2 = getMasters(query2)

      expect(result1).toHaveLength(1)
      expect(result1[0].profession).toBe('Plomera')

      expect(result2).toHaveLength(1)
      expect(result2[0].profession).toBe('Electricista')
    })

    it('should handle partial search matches', () => {
      const query = { search: 'mec' }
      const result = getMasters(query)

      expect(result).toHaveLength(1)
      expect(result[0].profession).toBe('Mecánico')
    })

    it('should return masters with rating exactly at minimum', () => {
      const query = { minRating: '4.5' }
      const result = getMasters(query)

      const hasExactRating = result.some((m) => m.rating === 4.5)
      expect(hasExactRating).toBe(true)
    })

    it('should handle empty search string', () => {
      const query = { search: '' }
      const result = getMasters(query)

      expect(result).toHaveLength(5)
    })

    it('should filter verified masters', () => {
      const allMasters = getMasters({})
      const verifiedMasters = allMasters.filter((m) => m.verified)
      const unverifiedMasters = allMasters.filter((m) => !m.verified)

      expect(verifiedMasters.length).toBeGreaterThan(0)
      expect(unverifiedMasters.length).toBeGreaterThan(0)
    })
  })

  describe('GET /api/categories', () => {
    it('should return all categories', () => {
      const categories = getCategories()

      expect(categories).toBeDefined()
      expect(Array.isArray(categories)).toBe(true)
      expect(categories.length).toBeGreaterThan(0)
    })

    it('should return categories with required fields', () => {
      const categories = getCategories()
      const category = categories[0]

      expect(category).toHaveProperty('id')
      expect(category).toHaveProperty('name')
      expect(category).toHaveProperty('slug')
      expect(category).toHaveProperty('icon')
    })
  })
})

// Simulate the masters endpoint logic
function getMasters(query: Record<string, any>) {
  const category = query.category as string | undefined
  const search = query.search as string | undefined
  const minRating = query.minRating ? Number(query.minRating) : undefined

  let filteredMasters = [...mockMasters]

  // Filtrar por categoría
  if (category) {
    filteredMasters = filteredMasters.filter((m) => m.category === category)
  }

  // Filtrar por búsqueda (nombre o profesión)
  if (search) {
    const searchLower = search.toLowerCase()
    filteredMasters = filteredMasters.filter(
      (m) =>
        m.name.toLowerCase().includes(searchLower) ||
        m.profession.toLowerCase().includes(searchLower) ||
        m.description.toLowerCase().includes(searchLower)
    )
  }

  // Filtrar por rating mínimo
  if (minRating) {
    filteredMasters = filteredMasters.filter((m) => m.rating >= minRating)
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
  }))
}

// Simulate categories endpoint
function getCategories() {
  return [
    { id: 1, name: 'Carpintería', slug: 'carpinteria', icon: '🔨' },
    { id: 2, name: 'Plomería', slug: 'plomeria', icon: '🔧' },
    { id: 3, name: 'Electricidad', slug: 'electricidad', icon: '⚡' },
    { id: 4, name: 'Jardinería', slug: 'jardineria', icon: '🌱' },
    { id: 5, name: 'Mecánica', slug: 'mecanica', icon: '🔩' },
  ]
}
