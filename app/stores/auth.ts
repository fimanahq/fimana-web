import type { User } from '~~/types/user'
import { isSuccess } from '~/utils/api'

interface LoginResponse {
  accessToken: string
  refreshToken: string
  user: User
}

interface RegisterResponse {
  accessToken: string
  refreshToken: string
  user: User
}

export const useAuthStore = defineStore('auth', () => {
  const api = useApi()
  const user = ref<User | null>(null)
  const authToken = useAuthToken()

  const userId = computed(() => user.value?.id)
  const userFirstName = computed(() => user.value ? user.value?.firstName : '')
  const userFullName = computed(() =>
    user.value ? `${user.value.firstName} ${user.value.lastName}` : ''
  )

  function register(
    firstName: User['firstName'],
    lastName: User['lastName'],
    email: User['email'],
    password: User['password']
  ) {
    return api.post<RegisterResponse>('/auth/register', {
      firstName,
      lastName,
      email,
      password
    })
  }

  function login(email: string, password: string) {
    return api.post<LoginResponse>('/auth/login', {
      email,
      password
    })
  }

  async function fetchCurrentUser(): Promise<void> {
    const response = await api.get<User>('/users/me')

    if (!isSuccess(response)) {
      console.error(response.message || 'Failed to fetch user data.')
      return
    }

    if (!response.data) {
      console.error('User data not found.')
    }

    setUser(response.data)
  }

  function setUser(currentUser: User) {
    user.value = currentUser
  }

  function logout() {
    authToken.clearAccessToken()
    authToken.clearRefreshToken()
    user.value = null
    navigateTo('/login')
  }

  if (authToken.isAccessTokenValid()) {
    fetchCurrentUser()
  }

  return {
    user,
    userId,
    userFirstName,
    userFullName,
    register,
    login,
    setUser,
    logout
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
