import { z } from 'zod'

export const motionSchema = z.enum(['float', 'reveal', 'pulse', 'drift', 'glow', 'wave'])

export const visualSystemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2),
  category: z.string().min(2),
  headingFont: z.string().min(2),
  bodyFont: z.string().min(2),
  palette: z.array(z.string().regex(/^#[0-9A-Fa-f]{6}$/)).min(3).max(8),
  iconStyle: z.string().min(2),
  animation: motionSchema,
  icons: z.array(z.string().min(2)).min(1).max(8),
  description: z.string().min(5),
  sampleTitle: z.string().min(2),
  sampleText: z.string().min(2),
  featured: z.boolean()
})

export const studioContentSchema = z.object({
  settings: z.object({
    brand: z.string().min(2),
    tagline: z.string().min(2),
    description: z.string().min(5),
    email: z.string().email()
  }),
  systems: z.array(visualSystemSchema)
})
