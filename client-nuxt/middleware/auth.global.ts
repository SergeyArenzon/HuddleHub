import { defineNuxtRouteMiddleware, navigateTo } from '#app'

// List of routes that don't require authentication
const publicRoutes = ['/signin']

export default defineNuxtRouteMiddleware((to, from) => {
  // Skip middleware on server side
  if (process.server) return
  
  const { isAuthenticated } = useAuth()
  
  // Check if the route requires authentication
  const requiresAuth = !publicRoutes.includes(to.path)
  
  // If route requires auth and user is not authenticated, redirect to signin
  if (requiresAuth && !isAuthenticated.value) {
    return navigateTo('/signin')
  }
  
  // If user is authenticated and trying to access signin page, redirect to home
  if (isAuthenticated.value && to.path === '/signin') {
    return navigateTo('/')
  }
}) 