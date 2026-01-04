import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'

interface AuthToken {
  clearToken: () => void
  getToken: () => null | string | undefined
  isValid: ComputedRef<boolean>
  setToken: (newToken: string) => void
}

// TOKEN STORAGE
const tokenStorage = useLocalStorage('token', '')

export function useAuthToken(): AuthToken {
  const isValid = computed<boolean>(() => !!tokenStorage.value && tokenStorage.value.length > 10)

  function getToken(): null | string | undefined {
    return tokenStorage.value
  }

  function setToken(newToken: string): void {
    tokenStorage.value = newToken
  }

  function clearToken(): void {
    tokenStorage.value = null
  }

  return { isValid, getToken, setToken, clearToken }
}
