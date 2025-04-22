import { ref } from 'vue'

// This is a simple auth state management composable
// In a real application, you would likely use a more robust authentication system
export function useAuth() {
  const isAuthenticated = ref(false)
  
  // Mock user data - in a real app, this would be fetched from an API
  const user = ref({
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    image_url: ''
  })

  // Simulate login
  const login = () => {
    isAuthenticated.value = true
    // In a real app, you would store a token in localStorage/cookie
    localStorage.setItem('isAuthenticated', 'true')
  }

  // Simulate logout
  const logout = () => {
    isAuthenticated.value = false
    localStorage.removeItem('isAuthenticated')
  }

  // Check if user is authenticated on app startup
  const initAuth = () => {
    const storedAuth = localStorage.getItem('isAuthenticated')
    isAuthenticated.value = storedAuth === 'true'
  }

  return {
    isAuthenticated,
    user,
    login,
    logout,
    initAuth
  }
} 