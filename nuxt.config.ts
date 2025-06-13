import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4
  },

  vite: {
    plugins: [tailwindcss()]
  },

  css: ['~/assets/css/tailwind.css'],
  modules: ['shadcn-nuxt'],
  shadcn: {
    prefix: '',
    componentDir: './app/components/ui'
  }
})