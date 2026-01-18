export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/image',
    '@pinia/nuxt'
  ],
  ssr: false,
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_API_URL
    }
  },
  compatibilityDate: '2025-01-15',
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
