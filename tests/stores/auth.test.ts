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

// Mock $fetch
const fetchMock = vi.fn()
global.$fetch = fetchMock

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorageMock.clear()
    navigateToMock.mockClear()
    fetchMock.mockClear()
  })

  describe('Initial State', () => {
    it('should have default state values', () => {
      const authStore = useAuthStore()

      expect(authStore.id).toBe(0)
      expect(authStore.username).toBe('')
      expect(authStore.email).toBe('')
      expect(authStore.isLoggedIn).toBe(false)
      expect(authStore.role).toBe('client')
      expect(authStore.masterProfile).toBeUndefined()
    })
  })

  describe('fetch()', () => {
    it('should load user data from localStorage', () => {
      const userData = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        role: 'client' as const,
      }

      localStorage.setItem('authUser', JSON.stringify(userData))

      const authStore = useAuthStore()
      authStore.fetch()

      expect(authStore.id).toBe(userData.id)
      expect(authStore.username).toBe(userData.username)
      expect(authStore.email).toBe(userData.email)
      expect(authStore.isLoggedIn).toBe(true)
      expect(authStore.role).toBe(userData.role)
    })

    it('should load master profile from localStorage', () => {
      const userData = {
        id: 100,
        username: 'masteruser',
        email: 'master@example.com',
        role: 'master' as const,
        masterProfile: {
          profession: 'Carpintero',
          rating: 4.8,
          reviewCount: 45,
          pricePerHour: 15000,
          location: 'Santiago',
          yearsExperience: 10,
          isActive: true,
        },
      }

      localStorage.setItem('authUser', JSON.stringify(userData))

      const authStore = useAuthStore()
      authStore.fetch()

      expect(authStore.masterProfile).toEqual(userData.masterProfile)
      expect(authStore.role).toBe('master')
    })

    it('should not change state if localStorage is empty', () => {
      const authStore = useAuthStore()
      authStore.fetch()

      expect(authStore.id).toBe(0)
      expect(authStore.isLoggedIn).toBe(false)
    })
  })

  describe('setUser()', () => {
    it('should set user data and save to localStorage', () => {
      const authStore = useAuthStore()
      const userData = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        role: 'client' as const,
      }

      authStore.setUser(userData)

      expect(authStore.id).toBe(userData.id)
      expect(authStore.username).toBe(userData.username)
      expect(authStore.email).toBe(userData.email)
      expect(authStore.isLoggedIn).toBe(true)
      expect(authStore.role).toBe(userData.role)

      const storedData = JSON.parse(localStorage.getItem('authUser')!)
      expect(storedData).toEqual(userData)
    })

    it('should default role to client if not provided', () => {
      const authStore = useAuthStore()
      const userData = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
      }

      authStore.setUser(userData)

      expect(authStore.role).toBe('client')
    })

    it('should save master profile if provided', () => {
      const authStore = useAuthStore()
      const masterProfile = {
        profession: 'Plomero',
        rating: 4.5,
        reviewCount: 30,
        pricePerHour: 12000,
        location: 'Valparaíso',
        yearsExperience: 8,
        isActive: true,
      }
      const userData = {
        id: 100,
        username: 'masteruser',
        email: 'master@example.com',
        role: 'master' as const,
        masterProfile,
      }

      authStore.setUser(userData)

      expect(authStore.masterProfile).toEqual(masterProfile)
      expect(authStore.role).toBe('master')
    })
  })

  describe('switchRole()', () => {
    it('should switch role from client to master if masterProfile exists', () => {
      const authStore = useAuthStore()
      const userData = {
        id: 100,
        username: 'dualuser',
        email: 'dual@example.com',
        role: 'client' as const,
        masterProfile: {
          profession: 'Electricista',
          rating: 4.7,
          reviewCount: 25,
          pricePerHour: 18000,
          location: 'Concepción',
          yearsExperience: 12,
          isActive: true,
        },
      }

      authStore.setUser(userData)
      expect(authStore.role).toBe('client')

      authStore.switchRole('master')
      expect(authStore.role).toBe('master')

      const storedData = JSON.parse(localStorage.getItem('authUser')!)
      expect(storedData.role).toBe('master')
    })

    it('should switch role from master to client if masterProfile exists', () => {
      const authStore = useAuthStore()
      const userData = {
        id: 100,
        username: 'dualuser',
        email: 'dual@example.com',
        role: 'master' as const,
        masterProfile: {
          profession: 'Jardinero',
          rating: 4.9,
          reviewCount: 50,
          pricePerHour: 10000,
          location: 'La Serena',
          yearsExperience: 5,
          isActive: true,
        },
      }

      authStore.setUser(userData)
      expect(authStore.role).toBe('master')

      authStore.switchRole('client')
      expect(authStore.role).toBe('client')

      const storedData = JSON.parse(localStorage.getItem('authUser')!)
      expect(storedData.role).toBe('client')
    })

    it('should not switch role if masterProfile does not exist', () => {
      const authStore = useAuthStore()
      const userData = {
        id: 1,
        username: 'clientonly',
        email: 'client@example.com',
        role: 'client' as const,
      }

      authStore.setUser(userData)
      authStore.switchRole('master')

      expect(authStore.role).toBe('client')
    })
  })

  describe('login()', () => {
    it('should call API and set user on successful login', async () => {
      const authStore = useAuthStore()
      const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        role: 'client' as const,
      }

      fetchMock.mockResolvedValueOnce({ user: mockUser })

      await authStore.login('testuser', 'password123')

      expect(fetchMock).toHaveBeenCalledWith('/api/auth/login', {
        method: 'POST',
        body: {
          username: 'testuser',
          password: 'password123',
        },
      })

      expect(authStore.id).toBe(mockUser.id)
      expect(authStore.username).toBe(mockUser.username)
      expect(authStore.isLoggedIn).toBe(true)
      expect(navigateToMock).toHaveBeenCalledWith('/home')
    })

    it('should show alert on failed login', async () => {
      const authStore = useAuthStore()
      const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})

      fetchMock.mockResolvedValueOnce(null)

      await authStore.login('wronguser', 'wrongpassword')

      expect(alertMock).toHaveBeenCalledWith(
        'Error al iniciar sesión. Por favor, verifica tus credenciales.'
      )
      expect(authStore.isLoggedIn).toBe(false)
      expect(navigateToMock).not.toHaveBeenCalled()

      alertMock.mockRestore()
    })
  })

  describe('logout()', () => {
    it('should clear user data and navigate to login', async () => {
      const authStore = useAuthStore()
      const userData = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        role: 'client' as const,
      }

      authStore.setUser(userData)
      expect(authStore.isLoggedIn).toBe(true)

      await authStore.logout()

      expect(authStore.id).toBe(0)
      expect(authStore.username).toBe('')
      expect(authStore.email).toBe('')
      expect(authStore.isLoggedIn).toBe(false)
      expect(localStorage.getItem('authUser')).toBeNull()
      expect(navigateToMock).toHaveBeenCalledWith('/login')
    })
  })
})
