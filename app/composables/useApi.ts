import type { UseFetchOptions } from '@vueuse/core'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Body = BodyInit | Record<string, any> | null | undefined

export function useApi() {
  const { $api } = useNuxtApp()

  return {
    get: <T = unknown>(url: string, options: UseFetchOptions = {}) =>
      $api<T>(url, { ...options, method: 'GET' }),

    post: <T = unknown>(url: string, body?: Body, options: UseFetchOptions = {}) =>
      $api<T>(url, { ...options, method: 'POST', body }),

    put: <T = unknown>(url: string, body?: Body, options: UseFetchOptions = {}) =>
      $api<T>(url, { ...options, method: 'PUT', body }),

    patch: <T = unknown>(url: string, body?: Body, options: UseFetchOptions = {}) =>
      $api<T>(url, { ...options, method: 'PATCH', body }),

    delete: <T = unknown>(url: string, options: UseFetchOptions = {}) =>
      $api<T>(url, { ...options, method: 'DELETE' })
  }
}
