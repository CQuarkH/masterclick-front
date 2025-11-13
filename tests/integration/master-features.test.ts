import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '~/stores/auth'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
})

// Mock navigateTo
const navigateToMock = vi.fn()
global.navigateTo = navigateToMock

describe('Master Features Integration Tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorageMock.clear()
    navigateToMock.mockClear()
  })

  describe('Master Profile Management', () => {
    it('should load master profile data correctly', () => {
      const authStore = useAuthStore()

      const mockMasterProfile = {
        profession: 'Carpintero',
        rating: 4.8,
        reviewCount: 45,
        pricePerHour: 15000,
        location: 'Santiago Centro',
        yearsExperience: 12,
        isActive: true,
      }

      const masterUser = {
        id: 100,
        username: 'Carlos Soto',
        email: 'carlos.soto@masterclick.com',
        role: 'master' as const,
        masterProfile: mockMasterProfile,
      }

      authStore.setUser(masterUser)

      // Verify profile data is accessible
      expect(authStore.masterProfile).toEqual(mockMasterProfile)
      expect(authStore.role).toBe('master')
      expect(authStore.masterProfile?.profession).toBe('Carpintero')
      expect(authStore.masterProfile?.rating).toBe(4.8)
      expect(authStore.masterProfile?.pricePerHour).toBe(15000)
    })

    it('should maintain master profile across role switches', () => {
      const authStore = useAuthStore()

      const mockMasterProfile = {
        profession: 'Electricista',
        rating: 4.7,
        reviewCount: 30,
        pricePerHour: 18000,
        location: 'Valparaíso',
        yearsExperience: 8,
        isActive: true,
      }

      const dualRoleUser = {
        id: 100,
        username: 'dual_user',
        email: 'dual@example.com',
        role: 'master' as const,
        masterProfile: mockMasterProfile,
      }

      authStore.setUser(dualRoleUser)

      // Switch to client
      authStore.switchRole('client')
      expect(authStore.role).toBe('client')

      // Profile should still be available
      expect(authStore.masterProfile).toEqual(mockMasterProfile)

      // Switch back to master
      authStore.switchRole('master')
      expect(authStore.role).toBe('master')
      expect(authStore.masterProfile).toEqual(mockMasterProfile)
    })

    it('should persist profile changes in localStorage', () => {
      const authStore = useAuthStore()

      const originalProfile = {
        profession: 'Plomero',
        rating: 4.5,
        reviewCount: 20,
        pricePerHour: 12000,
        location: 'Viña del Mar',
        yearsExperience: 5,
        isActive: true,
      }

      const masterUser = {
        id: 100,
        username: 'Juan Pérez',
        email: 'juan@masterclick.com',
        role: 'master' as const,
        masterProfile: originalProfile,
      }

      authStore.setUser(masterUser)

      // Simulate profile update
      const updatedProfile = {
        ...originalProfile,
        pricePerHour: 15000,
        yearsExperience: 6,
      }

      authStore.setUser({
        ...masterUser,
        masterProfile: updatedProfile,
      })

      // Verify localStorage was updated
      const storedData = JSON.parse(localStorage.getItem('authUser')!)
      expect(storedData.masterProfile.pricePerHour).toBe(15000)
      expect(storedData.masterProfile.yearsExperience).toBe(6)
    })
  })

  describe('Master Dashboard Access', () => {
    it('should allow master to access dashboard data', () => {
      const authStore = useAuthStore()

      const masterUser = {
        id: 100,
        username: 'Carlos Soto',
        email: 'carlos.soto@masterclick.com',
        role: 'master' as const,
        masterProfile: {
          profession: 'Carpintero',
          rating: 4.8,
          reviewCount: 45,
          pricePerHour: 15000,
          location: 'Santiago Centro',
          yearsExperience: 12,
          isActive: true,
        },
      }

      authStore.setUser(masterUser)

      // Verify master has required data for dashboard
      expect(authStore.role).toBe('master')
      expect(authStore.masterProfile).toBeDefined()
      expect(authStore.masterProfile?.rating).toBeGreaterThan(0)
      expect(authStore.masterProfile?.reviewCount).toBeGreaterThan(0)
    })

    it('should prevent client from accessing master features', () => {
      const authStore = useAuthStore()

      const clientUser = {
        id: 1,
        username: 'usuario_cliente',
        email: 'cliente@example.com',
        role: 'client' as const,
      }

      authStore.setUser(clientUser)

      // Verify client has no master profile
      expect(authStore.role).toBe('client')
      expect(authStore.masterProfile).toBeUndefined()
    })
  })

  describe('Master Services Management', () => {
    it('should track master active status', () => {
      const authStore = useAuthStore()

      const masterUser = {
        id: 100,
        username: 'Carlos Soto',
        email: 'carlos.soto@masterclick.com',
        role: 'master' as const,
        masterProfile: {
          profession: 'Carpintero',
          rating: 4.8,
          reviewCount: 45,
          pricePerHour: 15000,
          location: 'Santiago Centro',
          yearsExperience: 12,
          isActive: true,
        },
      }

      authStore.setUser(masterUser)

      expect(authStore.masterProfile?.isActive).toBe(true)

      // Simulate deactivation
      const updatedUser = {
        ...masterUser,
        masterProfile: {
          ...masterUser.masterProfile,
          isActive: false,
        },
      }

      authStore.setUser(updatedUser)

      expect(authStore.masterProfile?.isActive).toBe(false)
    })
  })

  describe('Master Rating and Reviews', () => {
    it('should maintain accurate rating and review count', () => {
      const authStore = useAuthStore()

      const masterUser = {
        id: 100,
        username: 'Carlos Soto',
        email: 'carlos.soto@masterclick.com',
        role: 'master' as const,
        masterProfile: {
          profession: 'Carpintero',
          rating: 4.8,
          reviewCount: 45,
          pricePerHour: 15000,
          location: 'Santiago Centro',
          yearsExperience: 12,
          isActive: true,
        },
      }

      authStore.setUser(masterUser)

      expect(authStore.masterProfile?.rating).toBe(4.8)
      expect(authStore.masterProfile?.reviewCount).toBe(45)

      // Simulate new review that changes rating
      const updatedUser = {
        ...masterUser,
        masterProfile: {
          ...masterUser.masterProfile,
          rating: 4.85,
          reviewCount: 46,
        },
      }

      authStore.setUser(updatedUser)

      expect(authStore.masterProfile?.rating).toBe(4.85)
      expect(authStore.masterProfile?.reviewCount).toBe(46)
    })

    it('should validate rating is within valid range', () => {
      const authStore = useAuthStore()

      const masterUser = {
        id: 100,
        username: 'Carlos Soto',
        email: 'carlos.soto@masterclick.com',
        role: 'master' as const,
        masterProfile: {
          profession: 'Carpintero',
          rating: 4.8,
          reviewCount: 45,
          pricePerHour: 15000,
          location: 'Santiago Centro',
          yearsExperience: 12,
          isActive: true,
        },
      }

      authStore.setUser(masterUser)

      const rating = authStore.masterProfile?.rating
      expect(rating).toBeGreaterThanOrEqual(0)
      expect(rating).toBeLessThanOrEqual(5)
    })
  })

  describe('Master Location and Pricing', () => {
    it('should store and retrieve location data', () => {
      const authStore = useAuthStore()

      const locations = [
        'Santiago Centro',
        'Valparaíso',
        'Concepción',
        'La Serena',
        'Viña del Mar',
      ]

      locations.forEach((location) => {
        const masterUser = {
          id: 100,
          username: 'Master User',
          email: 'master@example.com',
          role: 'master' as const,
          masterProfile: {
            profession: 'Carpintero',
            rating: 4.8,
            reviewCount: 45,
            pricePerHour: 15000,
            location,
            yearsExperience: 12,
            isActive: true,
          },
        }

        authStore.setUser(masterUser)
        expect(authStore.masterProfile?.location).toBe(location)
      })
    })

    it('should handle price updates', () => {
      const authStore = useAuthStore()

      const masterUser = {
        id: 100,
        username: 'Carlos Soto',
        email: 'carlos.soto@masterclick.com',
        role: 'master' as const,
        masterProfile: {
          profession: 'Carpintero',
          rating: 4.8,
          reviewCount: 45,
          pricePerHour: 15000,
          location: 'Santiago Centro',
          yearsExperience: 12,
          isActive: true,
        },
      }

      authStore.setUser(masterUser)
      expect(authStore.masterProfile?.pricePerHour).toBe(15000)

      // Simulate price increase
      const updatedUser = {
        ...masterUser,
        masterProfile: {
          ...masterUser.masterProfile,
          pricePerHour: 18000,
        },
      }

      authStore.setUser(updatedUser)
      expect(authStore.masterProfile?.pricePerHour).toBe(18000)
    })

    it('should validate price is positive', () => {
      const authStore = useAuthStore()

      const masterUser = {
        id: 100,
        username: 'Carlos Soto',
        email: 'carlos.soto@masterclick.com',
        role: 'master' as const,
        masterProfile: {
          profession: 'Carpintero',
          rating: 4.8,
          reviewCount: 45,
          pricePerHour: 15000,
          location: 'Santiago Centro',
          yearsExperience: 12,
          isActive: true,
        },
      }

      authStore.setUser(masterUser)

      const price = authStore.masterProfile?.pricePerHour
      expect(price).toBeGreaterThan(0)
    })
  })

  describe('Master Experience Tracking', () => {
    it('should track years of experience', () => {
      const authStore = useAuthStore()

      const masterUser = {
        id: 100,
        username: 'Carlos Soto',
        email: 'carlos.soto@masterclick.com',
        role: 'master' as const,
        masterProfile: {
          profession: 'Carpintero',
          rating: 4.8,
          reviewCount: 45,
          pricePerHour: 15000,
          location: 'Santiago Centro',
          yearsExperience: 12,
          isActive: true,
        },
      }

      authStore.setUser(masterUser)

      expect(authStore.masterProfile?.yearsExperience).toBe(12)

      // Simulate experience update
      const updatedUser = {
        ...masterUser,
        masterProfile: {
          ...masterUser.masterProfile,
          yearsExperience: 13,
        },
      }

      authStore.setUser(updatedUser)

      expect(authStore.masterProfile?.yearsExperience).toBe(13)
    })

    it('should validate experience is non-negative', () => {
      const authStore = useAuthStore()

      const masterUser = {
        id: 100,
        username: 'Carlos Soto',
        email: 'carlos.soto@masterclick.com',
        role: 'master' as const,
        masterProfile: {
          profession: 'Carpintero',
          rating: 4.8,
          reviewCount: 45,
          pricePerHour: 15000,
          location: 'Santiago Centro',
          yearsExperience: 12,
          isActive: true,
        },
      }

      authStore.setUser(masterUser)

      const experience = authStore.masterProfile?.yearsExperience
      expect(experience).toBeGreaterThanOrEqual(0)
    })
  })
})
