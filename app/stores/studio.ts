import { defineStore } from 'pinia'
import type { StudioContent, VisualSystem } from '~/types/studio'
import { studioContentSchema } from '~/utils/studioSchema'
import defaultContent from '~~/public/data/content.json'

const STORAGE_KEY = 'nuxt-motion-icon-studio'

function clonePlain<T>(value: T): T {
  return globalThis.structuredClone(toRaw(value))
}

export const useStudioStore = defineStore('studio', () => {
  const content = ref<StudioContent | null>(null)
  const ready = computed(() => content.value !== null)

  async function initialize() {
    if (content.value) return

    if (import.meta.client) {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = studioContentSchema.safeParse(JSON.parse(saved))
        if (parsed.success) {
          content.value = parsed.data
          return
        }
      }
    }

    content.value = studioContentSchema.parse(clonePlain(defaultContent))
  }

  function persist() {
    if (import.meta.client && content.value) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content.value))
    }
  }

  function saveSettings(settings: StudioContent['settings']) {
    if (!content.value) return
    content.value.settings = clonePlain(settings)
    persist()
  }

  function upsertSystem(system: VisualSystem) {
    if (!content.value) return
    const index = content.value.systems.findIndex(item => item.id === system.id)
    if (index >= 0) content.value.systems[index] = clonePlain(system)
    else content.value.systems.unshift(clonePlain(system))
    persist()
  }

  function duplicateSystem(id: string) {
    if (!content.value) return
    const source = content.value.systems.find(item => item.id === id)
    if (!source) return
    content.value.systems.unshift({
      ...clonePlain(source),
      id: `${source.id}-copy-${Date.now()}`,
      name: `${source.name} (copia)`,
      featured: false,
    })
    persist()
  }

  function deleteSystem(id: string) {
    if (!content.value) return
    content.value.systems = content.value.systems.filter(item => item.id !== id)
    persist()
  }

  function importContent(value: unknown) {
    content.value = studioContentSchema.parse(value)
    persist()
  }

  function reset() {
    if (import.meta.client) localStorage.removeItem(STORAGE_KEY)
    content.value = null
    return initialize()
  }

  return {
    content,
    ready,
    initialize,
    persist,
    saveSettings,
    upsertSystem,
    duplicateSystem,
    deleteSystem,
    importContent,
    reset,
  }
})
