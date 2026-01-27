export default defineNuxtPlugin(() => {
  const authToken = useAuthToken()
  const config = useRuntimeConfig()

  const api = $fetch.create({
    baseURL: String(config.public.apiBase),
    headers: {
      Accept: 'application/json'
    },
    async onRequest({ options }) {
      const token = authToken.getAccessToken()
      if (token) {
        const headers = new Headers(options.headers)
        headers.set('Authorization', `Bearer ${token}`)
        options.headers = headers
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        authToken.clearAccessToken()
      }
    }
  })

  return {
    provide: {
      api
    }
  }
})
