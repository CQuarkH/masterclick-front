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

describe('Authentication Flow Integration Tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorageMock.clear()
    navigateToMock.mockClear()
    fetchMock.mockClear()
  })

  describe('Client Login Flow', () => {
    it('should complete full client login flow', async () => {
      const authStore = useAuthStore()

      // Initial state - not logged in
      expect(authStore.isLoggedIn).toBe(false)
      expect(authStore.role).toBe('client')

      // Mock successful API response
      const mockClientUser = {
        id: 1,
        username: 'usuario_ejemplo',
        email: 'usuario@example.com',
        role: 'client' as const,
      }

      fetchMock.mockResolvedValueOnce({ user: mockClientUser })

      // Perform login
      await authStore.login('usuario@ejemplo', '123456')

      // Verify user is logged in
      expect(authStore.isLoggedIn).toBe(true)
      expect(authStore.id).toBe(mockClientUser.id)
      expect(authStore.username).toBe(mockClientUser.username)
      expect(authStore.email).toBe(mockClientUser.email)
      expect(authStore.role).toBe('client')

      // Verify localStorage was updated
      const storedData = JSON.parse(localStorage.getItem('authUser')!)
      expect(storedData).toEqual(mockClientUser)

      // Verify navigation to home
      expect(navigateToMock).toHaveBeenCalledWith('/home')
    })

    it('should persist client session after page reload', async () => {
      const authStore = useAuthStore()

      const mockClientUser = {
        id: 1,
        username: 'usuario_ejemplo',
        email: 'usuario@example.com',
        role: 'client' as const,
      }

      // Simulate existing session in localStorage
      localStorage.setItem('authUser', JSON.stringify(mockClientUser))

      // Simulate page reload - fetch from localStorage
      authStore.fetch()

      // Verify session was restored
      expect(authStore.isLoggedIn).toBe(true)
      expect(authStore.id).toBe(mockClientUser.id)
      expect(authStore.username).toBe(mockClientUser.username)
      expect(authStore.role).toBe('client')
    })
  })

  describe('Master Login Flow', () => {
    it('should complete full master login flow with profile', async () => {
      const authStore = useAuthStore()

      const mockMasterUser = {
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

      fetchMock.mockResolvedValueOnce({ user: mockMasterUser })

      // Perform master login
      await authStore.login('maestro@ejemplo', '123456')

      // Verify master is logged in
      expect(authStore.isLoggedIn).toBe(true)
      expect(authStore.role).toBe('master')
      expect(authStore.masterProfile).toEqual(mockMasterUser.masterProfile)

      // Verify masterProfile persisted in localStorage
      const storedData = JSON.parse(localStorage.getItem('authUser')!)
      expect(storedData.masterProfile).toEqual(mockMasterUser.masterProfile)

      // Verify navigation to home
      expect(navigateToMock).toHaveBeenCalledWith('/home')
    })

    it('should persist master session with profile after reload', async () => {
      const authStore = useAuthStore()

      const mockMasterUser = {
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

      localStorage.setItem('authUser', JSON.stringify(mockMasterUser))

      // Simulate page reload
      authStore.fetch()

      // Verify master session was restored with profile
      expect(authStore.isLoggedIn).toBe(true)
      expect(authStore.role).toBe('master')
      expect(authStore.masterProfile).toEqual(mockMasterUser.masterProfile)
    })
  })

  describe('Role Switching Flow', () => {
    it('should switch from client to master role', async () => {
      const authStore = useAuthStore()

      const dualRoleUser = {
        id: 100,
        username: 'dual_user',
        email: 'dual@example.com',
        role: 'client' as const,
        masterProfile: {
          profession: 'Electricista',
          rating: 4.7,
          reviewCount: 30,
          pricePerHour: 18000,
          location: 'Valparaíso',
          yearsExperience: 8,
          isActive: true,
        },
      }

      authStore.setUser(dualRoleUser)

      // Initially client
      expect(authStore.role).toBe('client')

      // Switch to master
      authStore.switchRole('master')

      // Verify role changed
      expect(authStore.role).toBe('master')

      // Verify persistence
      const storedData = JSON.parse(localStorage.getItem('authUser')!)
      expect(storedData.role).toBe('master')

      // Verify profile is still there
      expect(authStore.masterProfile).toEqual(dualRoleUser.masterProfile)
    })

    it('should switch from master to client role', async () => {
      const authStore = useAuthStore()

      const dualRoleUser = {
        id: 100,
        username: 'dual_user',
        email: 'dual@example.com',
        role: 'master' as const,
        masterProfile: {
          profession: 'Plomero',
          rating: 4.9,
          reviewCount: 50,
          pricePerHour: 12000,
          location: 'Concepción',
          yearsExperience: 10,
          isActive: true,
        },
      }

      authStore.setUser(dualRoleUser)

      // Initially master
      expect(authStore.role).toBe('master')

      // Switch to client
      authStore.switchRole('client')

      // Verify role changed
      expect(authStore.role).toBe('client')

      // Verify persistence
      const storedData = JSON.parse(localStorage.getItem('authUser')!)
      expect(storedData.role).toBe('client')

      // Verify profile is still available for future switches
      expect(authStore.masterProfile).toEqual(dualRoleUser.masterProfile)
    })

    it('should persist role after switching and reloading', async () => {
      const authStore = useAuthStore()

      const dualRoleUser = {
        id: 100,
        username: 'dual_user',
        email: 'dual@example.com',
        role: 'client' as const,
        masterProfile: {
          profession: 'Jardinero',
          rating: 4.6,
          reviewCount: 25,
          pricePerHour: 10000,
          location: 'La Serena',
          yearsExperience: 5,
          isActive: true,
        },
      }

      authStore.setUser(dualRoleUser)
      authStore.switchRole('master')

      // Simulate page reload
      const newAuthStore = useAuthStore()
      newAuthStore.fetch()

      // Verify role persisted after reload
      expect(newAuthStore.role).toBe('master')
      expect(newAuthStore.masterProfile).toEqual(dualRoleUser.masterProfile)
    })
  })

  describe('Logout Flow', () => {
    it('should complete full logout flow for client', async () => {
      const authStore = useAuthStore()

      const mockClientUser = {
        id: 1,
        username: 'usuario_ejemplo',
        email: 'usuario@example.com',
        role: 'client' as const,
      }

      authStore.setUser(mockClientUser)
      expect(authStore.isLoggedIn).toBe(true)

      // Perform logout
      await authStore.logout()

      // Verify user is logged out
      expect(authStore.isLoggedIn).toBe(false)
      expect(authStore.id).toBe(0)
      expect(authStore.username).toBe('')
      expect(authStore.email).toBe('')

      // Verify localStorage was cleared
      expect(localStorage.getItem('authUser')).toBeNull()

      // Verify navigation to login
      expect(navigateToMock).toHaveBeenCalledWith('/login')
    })

    it('should complete full logout flow for master', async () => {
      const authStore = useAuthStore()

      const mockMasterUser = {
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

      authStore.setUser(mockMasterUser)
      expect(authStore.isLoggedIn).toBe(true)
      expect(authStore.role).toBe('master')

      // Perform logout
      await authStore.logout()

      // Verify user is logged out
      expect(authStore.isLoggedIn).toBe(false)
      expect(authStore.id).toBe(0)

      // Verify localStorage was cleared (including masterProfile)
      expect(localStorage.getItem('authUser')).toBeNull()

      // Verify navigation to login
      expect(navigateToMock).toHaveBeenCalledWith('/login')
    })
  })

  describe('Failed Login Flow', () => {
    it('should handle failed login gracefully', async () => {
      const authStore = useAuthStore()
      const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})

      // Mock failed API response
      fetchMock.mockResolvedValueOnce(null)

      // Attempt login with wrong credentials
      await authStore.login('wronguser', 'wrongpassword')

      // Verify user is still not logged in
      expect(authStore.isLoggedIn).toBe(false)

      // Verify error alert was shown
      expect(alertMock).toHaveBeenCalledWith(
        'Error al iniciar sesión. Por favor, verifica tus credenciales.'
      )

      // Verify no navigation occurred
      expect(navigateToMock).not.toHaveBeenCalled()

      // Verify localStorage was not updated
      expect(localStorage.getItem('authUser')).toBeNull()

      alertMock.mockRestore()
    })
  })
})
