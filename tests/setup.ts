import { vi } from 'vitest'
import { defineStore } from 'pinia'

// Make defineStore available globally
global.defineStore = defineStore

// Mock navigateTo
global.navigateTo = vi.fn()

// Mock $fetch
global.$fetch = vi.fn()

// Mock useRuntimeConfig
global.useRuntimeConfig = vi.fn(() => ({}))

// Mock useNuxtApp
global.useNuxtApp = vi.fn(() => ({
  $config: {},
}))
