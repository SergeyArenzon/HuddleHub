<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { ROUTES } from '~/lib/routes'

// const { isAuthenticated, login } = useAuth()
const router = useRouter()


const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession()

console.log({loggedIn: loggedIn.value, user});


</script>

<template>
  <NuxtLayout name="auth">
    <div class="bg-white w-3/5 h-3/4 flex shadow-md container text-primary">
      <div class="relative w-1/2 container flex justify-center rounded items-center bg-primary overflow-hidden">
        <nuxt-img 
          src="/images/guilherme-stecanella-_dH-oQF9w-Y-unsplash.jpg" 
          class="opacity-60 absolute z-0 object-cover w-full h-full" 
          alt="traveller image" />
      </div>
      <div class="w-1/2 container flex flex-col gap-4 items-center">
        <h2 class="font-extrabold">Discover More, Travel Better</h2>
        <div class="italic text-black">
          Your simplest way to connect with expert local guides for unforgettable experiences.
          Sign in and start your journey today
        </div>
        <Button @click="openInPopup('/auth/google')">Sign in with Google</Button>
      </div>
    </div>
  </NuxtLayout>
</template>