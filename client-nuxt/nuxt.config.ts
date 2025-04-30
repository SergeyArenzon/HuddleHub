// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  runtimeConfig: {
    oauth: {
      // provider in lowercase (github, google, etc.)
      google: {
        clientId: process.env.NUXT_OAUTH_GOOGLE_CLIENT_ID,
        clientSecret: process.env.NUXT_OAUTH_GOOGLE_CLIENT_SECRET,
      }
    }
  },
  future: {
    compatibilityVersion: 4,
  },

  modules: [
    'shadcn-nuxt',
    '@nuxt/image',
    '@nuxt/icon',
    'nuxt-auth-utils',
    '@pinia/nuxt'
  ],

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './app/components/ui'
  },

  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()]
  },

  compatibilityDate: '2025-04-17'
})