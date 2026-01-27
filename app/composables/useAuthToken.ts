import { useSessionStorage } from '@vueuse/core'

interface AuthToken {
  getAccessToken: () => string | undefined
  isAccessTokenValid: () => boolean
  setAccessToken: (newToken: string) => void
  clearAccessToken: () => void
  getRefreshToken: () => string | undefined
  isRefreshTokenValid: () => boolean
  setRefreshToken: (newToken: string) => void
  clearRefreshToken: () => void
}

// TOKEN STORAGE
const accessToken = useSessionStorage('accessToken', '')
const refreshToken = useSessionStorage('refreshToken', '')

export function useAuthToken(): AuthToken {
  function getAccessToken(): string | undefined {
    return accessToken.value
  }

  function isAccessTokenValid(): boolean {
    return !!accessToken.value && accessToken.value.length > 10
  }

  function setAccessToken(newToken: string): void {
    accessToken.value = newToken
  }

  function clearAccessToken(): void {
    accessToken.value = ''
  }

  function getRefreshToken(): string | undefined {
    return refreshToken.value
  }

  function isRefreshTokenValid(): boolean {
    return !!refreshToken.value && refreshToken.value.length > 10
  }

  function setRefreshToken(newToken: string): void {
    refreshToken.value = newToken
  }

  function clearRefreshToken(): void {
    refreshToken.value = ''
  }

  return {
    getAccessToken,
    isAccessTokenValid,
    setAccessToken,
    clearAccessToken,
    getRefreshToken,
    isRefreshTokenValid,
    setRefreshToken,
    clearRefreshToken
  }
}
