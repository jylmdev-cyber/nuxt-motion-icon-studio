<script setup lang="ts">
import type { StudioSettings, VisualSystem } from '~/types/studio'

definePageMeta({ layout: false })

useSeoMeta({ title: 'CMS — Motion Icon Studio', robots: 'noindex, nofollow' })

const store = useStudioStore()
await callOnce('studio-content-admin', () => store.initialize())

const toast = useToast()
const active = ref<'dashboard' | 'settings' | 'systems'>('dashboard')
const editorValue = ref<VisualSystem | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

const settingsForm = reactive<StudioSettings>({
  brand: '',
  tagline: '',
  description: '',
  email: ''
})

watchEffect(() => {
  if (store.content) Object.assign(settingsForm, structuredClone(store.content.settings))
})

const systems = computed(() => store.content?.systems ?? [])
const uniqueIcons = computed(() => new Set(systems.value.flatMap(item => item.icons)).size)
const uniqueCategories = computed(() => new Set(systems.value.map(item => item.category)).size)
const featured = computed(() => systems.value.filter(item => item.featured).length)

const { downloadJson, readJson } = useStudioExport()

function saveSettings() {
  store.saveSettings(structuredClone(settingsForm))
  toast.add({ title: 'Configuración guardada', icon: 'i-lucide-circle-check' })
}

function editSystem(system?: VisualSystem) {
  editorValue.value = system ? structuredClone(system) : {
    id: `system-${Date.now()}`,
    name: '',
    category: 'SaaS',
    headingFont: 'Space Grotesk',
    bodyFont: 'Inter',
    palette: ['#312E81', '#4338CA', '#8B5CF6', '#06B6D4', '#F8FAFC', '#1E1B4B'],
    iconStyle: 'Outline Rounded',
    animation: 'float',
    icons: ['i-lucide-rocket', 'i-lucide-sparkles'],
    description: '',
    sampleTitle: 'Título de muestra',
    sampleText: 'Texto para visualizar el sistema.',
    featured: false
  }
}

function saveSystem(system: VisualSystem) {
  store.upsertSystem(system)
  editorValue.value = null
  toast.add({ title: 'Sistema guardado', icon: 'i-lucide-circle-check' })
}

async function importFile(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return
  try {
    store.importContent(await readJson(file))
    toast.add({ title: 'Contenido importado', icon: 'i-lucide-file-check' })
  } catch {
    toast.add({ title: 'JSON no válido', color: 'error', icon: 'i-lucide-triangle-alert' })
  } finally {
    target.value = ''
  }
}
</script>

<template>
  <UApp>
    <div class="admin-shell">
      <aside class="admin-sidebar">
        <NuxtLink class="brand light" to="/">
          <span class="brand-mark"><i /><i /><i /></span>
          <span>Motion CMS</span>
        </NuxtLink>

        <nav>
          <button :class="{ active: active === 'dashboard' }" @click="active = 'dashboard'">
            <UIcon name="i-lucide-layout-dashboard" /> Dashboard
          </button>
          <button :class="{ active: active === 'settings' }" @click="active = 'settings'">
            <UIcon name="i-lucide-settings-2" /> Configuración
          </button>
          <button :class="{ active: active === 'systems' }" @click="active = 'systems'">
            <UIcon name="i-lucide-sparkles" /> Sistemas visuales
          </button>
          <NuxtLink to="/"><UIcon name="i-lucide-external-link" /> Ver landing</NuxtLink>
        </nav>
      </aside>

      <main class="admin-content">
        <header class="admin-topbar">
          <div>
            <span class="eyebrow">PANEL ADMINISTRATIVO</span>
            <h1>{{ active === 'dashboard' ? 'Dashboard' : active === 'settings' ? 'Configuración' : 'Sistemas visuales' }}</h1>
          </div>
          <div class="admin-actions">
            <input ref="fileInput" hidden type="file" accept=".json" @change="importFile">
            <UButton color="neutral" variant="outline" icon="i-lucide-upload" @click="fileInput?.click()">Importar</UButton>
            <UButton
              v-if="store.content"
              color="neutral"
              variant="outline"
              icon="i-lucide-download"
              @click="downloadJson(store.content)"
            >
              Exportar
            </UButton>
          </div>
        </header>

        <section v-if="active === 'dashboard'">
          <div class="admin-stats">
            <article><span>Sistemas</span><strong>{{ systems.length }}</strong><small>registrados</small></article>
            <article><span>Destacados</span><strong>{{ featured }}</strong><small>en portada</small></article>
            <article><span>Iconos</span><strong>{{ uniqueIcons }}</strong><small>únicos</small></article>
            <article><span>Categorías</span><strong>{{ uniqueCategories }}</strong><small>segmentos</small></article>
          </div>
          <UCard>
            <div class="welcome-card">
              <div>
                <span class="eyebrow">NUXT 4 + GITHUB PAGES</span>
                <h2>Biblioteca visual lista para producción estática.</h2>
                <p>El CMS trabaja en el navegador mediante Pinia y localStorage.</p>
              </div>
              <UButton to="/" trailing-icon="i-lucide-external-link">Ver landing</UButton>
            </div>
          </UCard>
        </section>

        <section v-else-if="active === 'settings'">
          <UCard>
            <template #header><h2>Configuración general</h2></template>
            <form class="settings-form" @submit.prevent="saveSettings">
              <UFormField label="Marca"><UInput v-model="settingsForm.brand" required /></UFormField>
              <UFormField label="Eslogan"><UInput v-model="settingsForm.tagline" required /></UFormField>
              <UFormField label="Correo"><UInput v-model="settingsForm.email" type="email" required /></UFormField>
              <UFormField class="full" label="Descripción"><UTextarea v-model="settingsForm.description" required /></UFormField>
              <div class="full form-actions"><UButton type="submit">Guardar configuración</UButton></div>
            </form>
          </UCard>
        </section>

        <section v-else>
          <UCard>
            <template #header>
              <div class="panel-heading">
                <div><h2>Sistemas visuales</h2><p>Crea, edita, duplica o elimina combinaciones.</p></div>
                <UButton icon="i-lucide-plus" @click="editSystem()">Nuevo sistema</UButton>
              </div>
            </template>

            <div class="admin-list">
              <article v-for="system in systems" :key="system.id">
                <div class="list-main">
                  <div class="list-palette">
                    <i v-for="color in system.palette.slice(0, 4)" :key="color" :style="{ background: color }" />
                  </div>
                  <div>
                    <strong>{{ system.name }}</strong>
                    <small>{{ system.headingFont }} + {{ system.bodyFont }} · {{ system.animation }}</small>
                  </div>
                </div>
                <div class="list-actions">
                  <UButton size="xs" color="neutral" variant="outline" @click="editSystem(system)">Editar</UButton>
                  <UButton size="xs" color="neutral" variant="outline" @click="store.duplicateSystem(system.id)">Duplicar</UButton>
                  <UButton size="xs" color="error" variant="ghost" @click="store.deleteSystem(system.id)">Eliminar</UButton>
                </div>
              </article>
            </div>
          </UCard>
        </section>
      </main>

      <AdminSystemEditor v-model="editorValue" @save="saveSystem" />
    </div>
  </UApp>
</template>
