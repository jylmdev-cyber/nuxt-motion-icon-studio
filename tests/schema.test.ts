import { describe, expect, it } from 'vitest'
import { studioContentSchema } from '../app/utils/studioSchema'

describe('studioContentSchema', () => {
  it('rejects an invalid color', () => {
    const result = studioContentSchema.safeParse({
      settings: {
        brand: 'Studio',
        tagline: 'Tagline',
        description: 'Description valid',
        email: 'test@example.com',
      },
      systems: [{
        id: 'one',
        name: 'System',
        category: 'SaaS',
        headingFont: 'Inter',
        bodyFont: 'Inter',
        palette: ['red', '#ffffff', '#000000'],
        iconStyle: 'Outline',
        animation: 'float',
        icons: ['i-lucide-star'],
        description: 'Valid description',
        sampleTitle: 'Title',
        sampleText: 'Text',
        featured: true,
      }],
    })

    expect(result.success).toBe(false)
  })
})
