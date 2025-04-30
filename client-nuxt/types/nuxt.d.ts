declare module '#app' {
  interface NuxtApp {
    $api: {
      wow: number
    }
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $api: {
      wow: number
    }
  }
}

export {} 