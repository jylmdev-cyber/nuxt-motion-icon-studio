export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxt/icon',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/eslint'
  ],
  css: ['~/assets/css/main.css'],
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      htmlAttrs: { lang: 'es' },
      meta: [
        { name: 'theme-color', content: '#312E81' },
        { name: 'description', content: 'Sistemas visuales con paletas, tipografías, iconos y animaciones.' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;600;700&family=DM+Sans:wght@400;500;600&family=Inter:wght@400;500;600;700&family=Lora:wght@400;500;600&family=Manrope:wght@500;600;700;800&family=Noto+Sans:wght@400;500;600&family=Playfair+Display:wght@500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Sora:wght@500;600;700;800&family=Source+Sans+3:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&family=Work+Sans:wght@400;500;600&display=swap'
        }
      ]
    }
  },
  nitro: {
    preset: process.env.GITHUB_ACTIONS ? 'github_pages' : 'static',
    prerender: {
      routes: ['/', '/admin']
    }
  },
  typescript: {
    strict: true,
    typeCheck: true
  },
  eslint: {
    config: {
      stylistic: true
    }
  },
  runtimeConfig: {
    public: {
      repositoryName: process.env.GITHUB_REPOSITORY?.split('/')[1] || ''
    }
  }
})
