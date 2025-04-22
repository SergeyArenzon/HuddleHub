import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  // Initialize auth state when the app starts
  // We need to use this in a client-side plugin since localStorage is only available in browser
  if (process.client) {
    const { initAuth } = useAuth()
    initAuth()
  }
}) 