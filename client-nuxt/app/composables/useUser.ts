import { useQuery, useMutation } from '@tanstack/vue-query'

const API_URL = 'http://huddlehub.io/api'

export function useUser() {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/user`, {
        credentials: 'include', // Important for sending cookies
      })
      if (!response.ok) {
        throw new Error('Failed to fetch user')
      }
      return response.json()
    },
  })

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: async (userData: any) => {
      const response = await fetch(`${API_URL}/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData),
      })
      if (!response.ok) {
        throw new Error('Failed to update user')
      }
      return response.json()
    },
  })

  return {
    user,
    isLoading,
    error,
    updateUser,
    isUpdating,
  }
} 