export type MotionName = 'float' | 'reveal' | 'pulse' | 'drift' | 'glow' | 'wave'

export interface StudioSettings {
  brand: string
  tagline: string
  description: string
  email: string
}

export interface VisualSystem {
  id: string
  name: string
  category: string
  headingFont: string
  bodyFont: string
  palette: string[]
  iconStyle: string
  animation: MotionName
  icons: string[]
  description: string
  sampleTitle: string
  sampleText: string
  featured: boolean
}

export interface StudioContent {
  settings: StudioSettings
  systems: VisualSystem[]
}
