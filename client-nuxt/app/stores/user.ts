import { defineStore } from 'pinia'

// User type definition
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'user' | 'admin'
  createdAt: string
  updatedAt: string
}

// Auth state type
interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

export const useUserStore = defineStore('user', {
  state: (): AuthState => ({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null
  }),

  getters: {
    currentUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated,
    isLoading: (state) => state.loading,
    authError: (state) => state.error
  },

  actions: {
    setUser(user: User | null) {
      this.user = user
      this.isAuthenticated = !!user
    },

    setToken(token: string | null) {
      this.token = token
    },

    setLoading(loading: boolean) {
      this.loading = loading
    },

    setError(error: string | null) {
      this.error = error
    },

    async login(email: string, password: string) {
      try {
        this.loading = true
        this.error = null
        
        // TODO: Implement actual API call
        // const response = await authApi.login(email, password)
        // this.user = response.user
        // this.token = response.token
        // this.isAuthenticated = true
        
        this.loading = false
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An error occurred'
        this.loading = false
        throw error
      }
    },

    async logout() {
      try {
        this.loading = true
        // TODO: Implement actual API call
        // await authApi.logout()
        
        this.user = null
        this.token = null
        this.isAuthenticated = false
        this.loading = false
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An error occurred'
        this.loading = false
        throw error
      }
    },

    async fetchUser() {
      try {
        this.loading = true
        this.error = null
        
        // TODO: Implement actual API call
        // const user = await userApi.getCurrentUser()
        // this.user = user
        // this.isAuthenticated = true
        
        this.loading = false
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An error occurred'
        this.loading = false
        throw error
      }
    }
  }
}) 