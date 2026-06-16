<script setup lang="ts">
import type { MotionName, VisualSystem } from '~/types/studio'

const props = defineProps<{ modelValue: VisualSystem | null }>()
const emit = defineEmits<{
  'update:modelValue': [value: VisualSystem | null]
  save: [value: VisualSystem]
}>()

const motions: MotionName[] = ['float', 'reveal', 'pulse', 'drift', 'glow', 'wave']

const emptySystem = (): VisualSystem => ({
  id: `system-${Date.now()}`,
  name: '',
  category: 'SaaS',
  headingFont: 'Space Grotesk',
  bodyFont: 'Inter',
  palette: ['#312E81', '#4338CA', '#8B5CF6', '#06B6D4', '#F8FAFC', '#1E1B4B'],
  iconStyle: 'Outline Rounded',
  animation: 'float',
  icons: ['i-lucide-rocket', 'i-lucide-chart-no-axes-column-increasing', 'i-lucide-sparkles'],
  description: '',
  sampleTitle: 'Título de muestra',
  sampleText: 'Texto para visualizar la combinación.',
  featured: false
})

const form = ref<VisualSystem>(emptySystem())

watch(
  () => props.modelValue,
  value => {
    form.value = value ? structuredClone(value) : emptySystem()
  },
  { immediate: true }
)

const iconsText = computed({
  get: () => form.value.icons.join(', '),
  set: value => {
    form.value.icons = value.split(',').map(item => item.trim()).filter(Boolean)
  }
})

function addColor() {
  if (form.value.palette.length < 8) form.value.palette.push('#6366F1')
}

function removeColor(index: number) {
  if (form.value.palette.length > 3) form.value.palette.splice(index, 1)
}

function close() {
  emit('update:modelValue', null)
}
</script>

<template>
  <UModal :open="modelValue !== null" title="Editor de sistema visual" @update:open="value => !value && close()">
    <template #body>
      <form class="editor-form" @submit.prevent="emit('save', structuredClone(form))">
        <UFormField label="Nombre">
          <UInput v-model="form.name" required />
        </UFormField>
        <UFormField label="Categoría">
          <UInput v-model="form.category" required />
        </UFormField>
        <UFormField label="Fuente para títulos">
          <UInput v-model="form.headingFont" required />
        </UFormField>
        <UFormField label="Fuente para textos">
          <UInput v-model="form.bodyFont" required />
        </UFormField>
        <UFormField label="Estilo de iconos">
          <UInput v-model="form.iconStyle" required />
        </UFormField>
        <UFormField label="Animación">
          <USelect v-model="form.animation" :items="motions" />
        </UFormField>
        <UFormField class="full" label="Iconos de @nuxt/icon, separados por comas">
          <UInput v-model="iconsText" required />
        </UFormField>
        <UFormField class="full" label="Descripción">
          <UTextarea v-model="form.description" required />
        </UFormField>
        <UFormField class="full" label="Título de muestra">
          <UInput v-model="form.sampleTitle" required />
        </UFormField>
        <UFormField class="full" label="Texto de muestra">
          <UTextarea v-model="form.sampleText" required />
        </UFormField>
        <UFormField label="Destacado">
          <USwitch v-model="form.featured" />
        </UFormField>

        <div class="full color-editor">
          <div class="editor-section-heading">
            <div>
              <strong>Paleta</strong>
              <small>Entre 3 y 8 colores.</small>
            </div>
            <UButton size="xs" color="neutral" variant="outline" type="button" @click="addColor">
              Agregar color
            </UButton>
          </div>

          <div v-for="(color, index) in form.palette" :key="index" class="color-row">
            <input v-model="form.palette[index]" type="color">
            <UInput v-model="form.palette[index]" pattern="^#[0-9A-Fa-f]{6}$" required />
            <UButton
              icon="i-lucide-x"
              color="error"
              variant="ghost"
              type="button"
              @click="removeColor(index)"
            />
          </div>
        </div>

        <div class="full modal-actions">
          <UButton color="neutral" variant="outline" type="button" @click="close">Cancelar</UButton>
          <UButton type="submit">Guardar sistema</UButton>
        </div>
      </form>
    </template>
  </UModal>
</template>
