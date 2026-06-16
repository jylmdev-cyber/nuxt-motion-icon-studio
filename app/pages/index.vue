<script setup lang="ts">
useSeoMeta({
  title: 'Motion Icon Studio — Sistemas visuales',
  ogTitle: 'Motion Icon Studio',
  description: 'Paletas, tipografías, iconos y animaciones coordinadas.',
  ogDescription: 'Explora sistemas visuales completos para productos digitales.'
})

const store = useStudioStore()
const search = ref('')
const category = ref('Todas')

const systems = computed(() => store.content?.systems ?? [])
const categories = computed(() => ['Todas', ...new Set(systems.value.map(item => item.category))])
const filtered = computed(() => {
  const term = search.value.toLowerCase()
  return systems.value.filter(item => {
    const matchesCategory = category.value === 'Todas' || item.category === category.value
    const haystack = `${item.name} ${item.category} ${item.headingFont} ${item.bodyFont} ${item.iconStyle}`.toLowerCase()
    return matchesCategory && haystack.includes(term)
  })
})
const uniqueFonts = computed(() => new Set(systems.value.flatMap(item => [item.headingFont, item.bodyFont])).size)
const uniqueIcons = computed(() => [...new Set(systems.value.flatMap(item => item.icons))])
</script>

<template>
  <main v-if="store.content">
    <section class="hero">
      <div class="hero-grid" />
      <div class="hero-copy">
        <span class="eyebrow">COLOR + TYPE + ICONS + MOTION</span>
        <h1>Sistemas visuales que cobran vida.</h1>
        <p>{{ store.content.settings.description }}</p>
        <div class="hero-actions">
          <UButton size="xl" to="#systems" trailing-icon="i-lucide-arrow-down">Explorar sistemas</UButton>
          <UButton size="xl" color="neutral" variant="outline" to="/admin">Abrir CMS</UButton>
        </div>
        <div class="hero-tags">
          <UBadge v-for="tag in ['Paletas', 'Tipografías', 'Iconos', 'Animaciones']" :key="tag" variant="soft">
            {{ tag }}
          </UBadge>
        </div>
      </div>

      <div class="hero-stage">
        <div class="hero-orb orb-a" />
        <div class="hero-orb orb-b" />
        <div class="dashboard-preview">
          <div class="window-dots"><i /><i /><i /></div>
          <div class="dashboard-body">
            <aside><span v-for="item in 4" :key="item" /></aside>
            <section>
              <div class="dashboard-title" />
              <div class="dashboard-metrics"><i /><i /><i /></div>
              <div class="dashboard-chart">
                <b v-for="item in 7" :key="item" />
              </div>
            </section>
          </div>
        </div>
        <span class="floating-icon icon-a"><UIcon name="i-lucide-rocket" /></span>
        <span class="floating-icon icon-b"><UIcon name="i-lucide-sparkles" /></span>
        <span class="floating-icon icon-c"><UIcon name="i-lucide-chart-no-axes-column-increasing" /></span>
      </div>
    </section>

    <section class="stats-row">
      <article><strong>{{ systems.length }}</strong><span>Sistemas visuales</span></article>
      <article><strong>{{ uniqueFonts }}</strong><span>Tipografías</span></article>
      <article><strong>{{ uniqueIcons.length }}</strong><span>Iconos</span></article>
      <article><strong>60 FPS</strong><span>Animaciones fluidas</span></article>
    </section>

    <section id="systems" class="page-section">
      <div class="section-heading">
        <div><span class="eyebrow">BIBLIOTECA VISUAL</span><h2>Una identidad digital completa.</h2></div>
        <p>Observa cómo interactúan color, tipografía, iconografía y movimiento.</p>
      </div>

      <div class="toolbar">
        <UInput v-model="search" icon="i-lucide-search" placeholder="Buscar sistema visual..." />
        <div class="filter-row">
          <UButton
            v-for="item in categories"
            :key="item"
            size="xs"
            :color="category === item ? 'primary' : 'neutral'"
            :variant="category === item ? 'solid' : 'outline'"
            @click="category = item"
          >
            {{ item }}
          </UButton>
        </div>
      </div>

      <div class="systems-grid">
        <SystemCard v-for="system in filtered" :key="system.id" :system="system" />
      </div>
      <UAlert v-if="filtered.length === 0" title="No se encontraron sistemas" icon="i-lucide-search-x" />
    </section>

    <section id="motion" class="motion-section">
      <div class="section-heading">
        <div><span class="eyebrow light">MOVIMIENTO</span><h2>Animaciones con propósito.</h2></div>
        <p>Transiciones para reforzar jerarquía, interacción y personalidad sin distraer.</p>
      </div>
      <div class="motion-grid">
        <MotionDemo title="Fade & Reveal" description="Entrada progresiva para contenido." animation="reveal" />
        <MotionDemo title="Float" description="Movimiento sutil para destacar elementos." animation="float" />
        <MotionDemo title="Pulse" description="Énfasis visual para estados y llamadas." animation="pulse" />
        <MotionDemo title="Wave" description="Ritmo visual para actividad y datos." animation="wave" />
      </div>
    </section>

    <section id="icons" class="page-section icons-section">
      <div class="section-heading">
        <div><span class="eyebrow">ICONOGRAFÍA</span><h2>Iconos consistentes para cada estilo.</h2></div>
        <p>La integración usa Nuxt Icon y el conjunto Lucide.</p>
      </div>
      <div class="icon-gallery">
        <UTooltip v-for="icon in uniqueIcons" :key="icon" :text="icon">
          <button class="gallery-icon" type="button">
            <UIcon :name="icon" />
          </button>
        </UTooltip>
      </div>
    </section>
  </main>
</template>
