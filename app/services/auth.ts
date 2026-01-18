import type { User } from '~~/types/user'

export interface SignupPayload {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface SignupResponse {
  token?: string
  user?: User
  message?: string
}

export async function signup(payload: SignupPayload): Promise<SignupResponse> {
  const api = useApi()
  return api.post<SignupResponse>('/auth/signup', payload)
}
