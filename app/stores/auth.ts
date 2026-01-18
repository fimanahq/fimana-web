import type { User } from '~~/types/user'

export interface SignupResponse {
  token?: string
  user?: User
  message?: string
}

type UserSignUp = Pick<User, 'firstName' | 'lastName' | 'email' | 'password'>

export const useAuthStore = defineStore('auth', () => {
  const api = useApi()
  const _user = ref<User | null>(null)
  function signup(payload: UserSignUp): Promise<SignupResponse> {
    return api.post<SignupResponse>('/auth/signup', payload)
  }

  function setUser(user: User) {
    _user.value = user
  }

  return {
    user: _user,
    setUser,
    signup
  }
})
