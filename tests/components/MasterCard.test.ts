import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MasterCard from '~/components/MasterCard.vue'

describe('MasterCard Component', () => {
  const mockMaster = {
    id: 1,
    name: 'Carlos Soto',
    profession: 'Carpintero',
    rating: 4.8,
    reviewCount: 45,
    pricePerHour: 15000,
    image: '/images/master1.jpg',
    location: 'Santiago Centro',
    verified: true,
    responseTime: '2 horas',
  }

  it('should render master information correctly', () => {
    const wrapper = mount(MasterCard, {
      props: {
        master: mockMaster,
      },
      global: {
        stubs: {
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })

    expect(wrapper.text()).toContain(mockMaster.name)
    expect(wrapper.text()).toContain(mockMaster.profession)
    expect(wrapper.text()).toContain(mockMaster.rating.toString())
    expect(wrapper.text()).toContain(mockMaster.reviewCount.toString())
    expect(wrapper.text()).toContain(mockMaster.location)
    expect(wrapper.text()).toContain(mockMaster.responseTime)
  })

  it('should format price correctly', () => {
    const wrapper = mount(MasterCard, {
      props: {
        master: mockMaster,
      },
      global: {
        stubs: {
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })

    expect(wrapper.text()).toContain('15.000')
    expect(wrapper.text()).toContain('/hora')
  })

  it('should display verified badge when master is verified', () => {
    const wrapper = mount(MasterCard, {
      props: {
        master: mockMaster,
      },
      global: {
        stubs: {
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })

    const verifiedBadge = wrapper.find('.bg-blue-500')
    expect(verifiedBadge.exists()).toBe(true)
  })

  it('should not display verified badge when master is not verified', () => {
    const unverifiedMaster = {
      ...mockMaster,
      verified: false,
    }

    const wrapper = mount(MasterCard, {
      props: {
        master: unverifiedMaster,
      },
      global: {
        stubs: {
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })

    const verifiedBadge = wrapper.find('.bg-blue-500')
    expect(verifiedBadge.exists()).toBe(false)
  })

  it('should display location when provided', () => {
    const wrapper = mount(MasterCard, {
      props: {
        master: mockMaster,
      },
      global: {
        stubs: {
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })

    expect(wrapper.text()).toContain(mockMaster.location)
  })

  it('should not display location when not provided', () => {
    const masterWithoutLocation = {
      ...mockMaster,
      location: undefined,
    }

    const wrapper = mount(MasterCard, {
      props: {
        master: masterWithoutLocation,
      },
      global: {
        stubs: {
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })

    const locationIcon = wrapper.findAll('svg').find((svg) =>
      svg.attributes('viewBox') === '0 0 24 24' && svg.html().includes('M17.657')
    )
    expect(locationIcon).toBeUndefined()
  })

  it('should display response time when provided', () => {
    const wrapper = mount(MasterCard, {
      props: {
        master: mockMaster,
      },
      global: {
        stubs: {
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })

    expect(wrapper.text()).toContain(mockMaster.responseTime)
  })

  it('should not display response time when not provided', () => {
    const masterWithoutResponseTime = {
      ...mockMaster,
      responseTime: undefined,
    }

    const wrapper = mount(MasterCard, {
      props: {
        master: masterWithoutResponseTime,
      },
      global: {
        stubs: {
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })

    const clockIcon = wrapper.findAll('svg').find((svg) =>
      svg.html().includes('M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z')
    )
    expect(clockIcon).toBeUndefined()
  })

  it('should have correct link to master profile', () => {
    const wrapper = mount(MasterCard, {
      props: {
        master: mockMaster,
      },
      global: {
        stubs: {
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })

    const link = wrapper.find('a')
    expect(link.attributes('href')).toBe(`/masters/${mockMaster.id}`)
    expect(link.text()).toBe('Ver Perfil')
  })

  it('should display review count when provided', () => {
    const wrapper = mount(MasterCard, {
      props: {
        master: mockMaster,
      },
      global: {
        stubs: {
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })

    expect(wrapper.text()).toContain(`(${mockMaster.reviewCount})`)
  })

  it('should not display review count when not provided', () => {
    const masterWithoutReviewCount = {
      ...mockMaster,
      reviewCount: undefined,
    }

    const wrapper = mount(MasterCard, {
      props: {
        master: masterWithoutReviewCount,
      },
      global: {
        stubs: {
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })

    expect(wrapper.text()).not.toContain('(')
  })

  it('should render master image with correct attributes', () => {
    const wrapper = mount(MasterCard, {
      props: {
        master: mockMaster,
      },
      global: {
        stubs: {
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })

    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe(mockMaster.image)
    expect(img.attributes('alt')).toBe(`Foto de ${mockMaster.name}`)
  })
})
