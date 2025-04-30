export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      api: { wow: 1 }
    }
  }
})