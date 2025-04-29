export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession();
  // List of public routes that don't require authentication
  const publicRoutes = ['/signin', '/auth/google'];
  
  // If user is not authenticated and trying to access a protected route
  if (!loggedIn.value && !publicRoutes.includes(to.path)) {
    return navigateTo('/signin');
  }
}); 