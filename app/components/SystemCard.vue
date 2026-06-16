<script setup lang="ts">
import type { VisualSystem } from '~/types/studio'

const props = defineProps<{ system: VisualSystem }>()

const style = computed(() => ({
  '--preview-bg': props.system.palette[4] ?? '#ffffff',
  '--preview-text': props.system.palette[5] ?? props.system.palette[0] ?? '#111827',
  '--preview-accent': props.system.palette[2] ?? '#8B5CF6',
  '--heading-font': `'${props.system.headingFont}', sans-serif`,
  '--body-font': `'${props.system.bodyFont}', sans-serif`
}))

const toast = useToast()

async function copy(value: string) {
  await navigator.clipboard.writeText(value)
  toast.add({ title: 'Copiado', description: value, icon: 'i-lucide-copy-check' })
}
</script>

<template>
  <article class="system-card">
    <div class="system-preview" :class="`motion-${system.animation}`" :style="style">
      <span class="eyebrow">{{ system.category }}</span>
      <h3>{{ system.sampleTitle }}</h3>
      <p>{{ system.sampleText }}</p>

      <div class="visual-row">
        <div class="card-icons">
          <span v-for="icon in system.icons" :key="icon" class="card-icon">
            <UIcon :name="icon" />
          </span>
        </div>
        <div class="palette">
          <button
            v-for="color in system.palette"
            :key="color"
            type="button"
            :title="`Copiar ${color}`"
            :style="{ background: color }"
            @click="copy(color)"
          />
        </div>
      </div>
    </div>

    <div class="system-info">
      <div class="system-heading">
        <div>
          <h2>{{ system.name }}</h2>
          <p>{{ system.description }}</p>
        </div>
        <UBadge variant="soft">{{ system.category }}</UBadge>
      </div>

      <div class="meta-row">
        <UButton size="xs" color="neutral" variant="outline" @click="copy(system.headingFont)">
          {{ system.headingFont }}
        </UButton>
        <UButton size="xs" color="neutral" variant="outline" @click="copy(system.bodyFont)">
          {{ system.bodyFont }}
        </UButton>
        <UButton size="xs" color="neutral" variant="outline" @click="copy(system.iconStyle)">
          {{ system.iconStyle }}
        </UButton>
        <UButton size="xs" color="neutral" variant="outline" @click="copy(system.animation)">
          {{ system.animation }}
        </UButton>
      </div>
    </div>
  </article>
</template>
