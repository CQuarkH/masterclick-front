# Testing Guide - MasterClick

Este documento describe la configuración y ejecución de pruebas para el proyecto MasterClick.

## Stack de Testing

- **Vitest**: Framework de testing rápido y moderno basado en Vite
- **@vue/test-utils**: Utilidades oficiales para testing de componentes Vue
- **@nuxt/test-utils**: Utilidades de testing específicas para Nuxt
- **happy-dom**: Entorno DOM ligero para pruebas

## Estructura de Pruebas

```
tests/
├── stores/              # Pruebas unitarias para Pinia stores
│   └── auth.test.ts
├── components/          # Pruebas unitarias para componentes Vue
│   └── MasterCard.test.ts
├── integration/         # Pruebas de integración
│   ├── auth.test.ts
│   └── master-features.test.ts
└── api/                 # Pruebas de API endpoints
    ├── auth.test.ts
    └── masters.test.ts
```

## Comandos Disponibles

### Ejecutar todas las pruebas

```bash
npm test
```

### Ejecutar pruebas en modo watch (desarrollo)

```bash
npm test
```

### Ejecutar pruebas una sola vez (CI/CD)

```bash
npm run test:run
```

### Ejecutar pruebas con cobertura

```bash
npm run test:coverage
```

### Ejecutar pruebas con UI interactiva

```bash
npm run test:ui
```

## Cobertura de Pruebas

### Stores (Auth Store)

✅ Estado inicial del store
✅ Carga de usuario desde localStorage (`fetch()`)
✅ Guardado de usuario (`setUser()`)
✅ Cambio de roles (`switchRole()`)
✅ Flujo de login con API
✅ Flujo de logout

### Componentes

#### MasterCard
✅ Renderizado de información del maestro
✅ Formato de precio
✅ Badge de verificación
✅ Visualización condicional (ubicación, tiempo de respuesta, reseñas)
✅ Enlaces correctos a perfil
✅ Renderizado de imagen con atributos correctos
✅ Manejo de props opcionales

### Integración - Autenticación

✅ Flujo completo de login de cliente
✅ Persistencia de sesión después de reload
✅ Flujo completo de login de maestro con perfil
✅ Persistencia de sesión de maestro
✅ Cambio de rol de cliente a maestro
✅ Cambio de rol de maestro a cliente
✅ Persistencia de rol después de cambio y reload
✅ Flujo completo de logout (cliente y maestro)
✅ Manejo de login fallido

### Integración - Funcionalidades de Maestros

✅ Carga correcta de datos del perfil de maestro
✅ Mantenimiento del perfil a través de cambios de rol
✅ Persistencia de cambios de perfil en localStorage
✅ Acceso al dashboard con datos requeridos
✅ Prevención de acceso a funcionalidades de maestro para clientes
✅ Tracking del estado activo/inactivo
✅ Mantenimiento de rating y conteo de reseñas
✅ Validación de rating (0-5)
✅ Almacenamiento y recuperación de ubicación
✅ Manejo de actualizaciones de precio
✅ Validación de precio positivo
✅ Tracking de años de experiencia
✅ Validación de experiencia no negativa

### API Endpoints

#### Auth API
✅ Login exitoso con credenciales de cliente
✅ Login exitoso con credenciales de maestro
✅ Inclusión de masterProfile en login de maestro
✅ Fallo de login con credenciales inválidas
✅ Fallo con username correcto pero contraseña incorrecta
✅ Fallo con username incorrecto pero contraseña correcta
✅ Manejo de credenciales vacías
✅ Sensibilidad a mayúsculas en username

#### Masters API
✅ Retorno de todos los maestros sin filtros
✅ Filtrado por categoría
✅ Búsqueda por nombre
✅ Búsqueda por profesión
✅ Búsqueda por descripción
✅ Filtrado por calificación mínima
✅ Combinación de múltiples filtros
✅ Retorno de array vacío cuando no hay coincidencias
✅ Búsqueda case-insensitive
✅ Retorno de campos necesarios para listado
✅ Búsqueda con coincidencias parciales
✅ Inclusión de maestros con rating exacto al mínimo
✅ Manejo de búsqueda vacía

#### Categories API
✅ Retorno de todas las categorías
✅ Campos requeridos en categorías (id, name, slug, icon)

## Escribir Nuevas Pruebas

### Prueba Unitaria de Componente

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MyComponent from '~/components/MyComponent.vue'

describe('MyComponent', () => {
  it('should render correctly', () => {
    const wrapper = mount(MyComponent, {
      props: {
        // props del componente
      },
    })

    expect(wrapper.text()).toContain('Expected Text')
  })
})
```

### Prueba de Store

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useMyStore } from '~/stores/myStore'

describe('My Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialize with correct state', () => {
    const store = useMyStore()
    expect(store.someProperty).toBe(expectedValue)
  })
})
```

### Prueba de API

```typescript
import { describe, it, expect } from 'vitest'

describe('API Endpoint', () => {
  it('should return expected data', async () => {
    const result = await simulateApiCall(params)
    expect(result).toEqual(expectedResult)
  })
})
```

## Buenas Prácticas

1. **Aislamiento**: Cada prueba debe ser independiente y no depender de otras
2. **Claridad**: Los nombres de las pruebas deben describir claramente lo que se está probando
3. **AAA Pattern**: Arrange (preparar), Act (actuar), Assert (verificar)
4. **Mocking**: Mockear dependencias externas (APIs, localStorage, etc.)
5. **Cobertura**: Apuntar a una cobertura mínima del 80%

## Comandos de CI/CD

Para integrar las pruebas en pipelines de CI/CD:

```bash
# Instalar dependencias
npm install

# Ejecutar pruebas
npm run test:run

# Generar reporte de cobertura
npm run test:coverage
```

## Debugging de Pruebas

Para debuggear pruebas específicas:

```bash
# Ejecutar solo pruebas que coincidan con el patrón
npm test -- auth

# Ejecutar en modo watch con filtro
npm test -- --watch auth
```

## Recursos Adicionales

- [Vitest Documentation](https://vitest.dev/)
- [Vue Test Utils Documentation](https://test-utils.vuejs.org/)
- [Nuxt Testing Documentation](https://nuxt.com/docs/getting-started/testing)
