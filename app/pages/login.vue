<script setup lang="ts">
  import * as v from 'valibot'
  import type { FormSubmitEvent } from '@nuxt/ui'

  const schema = v.object({
    email: v.pipe(v.string(), v.email('Invalid email')),
    password: v.pipe(v.string(), v.minLength(8, 'Must be at least 8 characters'))
  })

  type Schema = v.InferOutput<typeof schema>
  const authStore = useAuthStore()

  const state = reactive({
    email: '',
    password: ''
  })

  const toast = useToast()
  const authToken = useAuthToken()
  const isSubmitting = ref(false)
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
      isSubmitting.value = true
      const { email, password } = event.data
      const response = await authStore.login({ email, password })

      if (response.token) {
        authToken.setToken(response.token)
        authStore.setUser(response.user!)
      }

      toast.add({
        title: 'Welcome back',
        description: response.message || 'You are now logged in.',
        color: 'success'
      })
      await navigateTo(response.token ? '/dashboard' : '/login')
    } catch (error) {
      const description = error instanceof Error
        ? error.message
        : 'Unable to log you in right now.'

      toast.add({ title: 'Login failed', description, color: 'error' })
    } finally {
      isSubmitting.value = false
    }
  }
</script>

<template>
  <UContainer class="h-screen flex flex-col gap-8 md:justify-center items-center">
    <UButton
      icon="i-lucide-chevron-left"
      class="md:absolute md:top-8 md:left-8 md:mt-0 mt-4 mr-auto"
      variant="subtle"
      to="/"
    />

    <UPageCard class="w-full max-w-md p-4 shadow-2xl" variant="subtle">
      <div class="space-y-8">
        <section class="text-center justify-center space-y-6">
          <div class="flex justify-center">
            <AppLogo class="cursor-pointer" @click="navigateTo('/')" />
          </div>

          <div>
            <h1 class="text-2xl font-bold">
              Welcome back
            </h1>
            <span class="text-muted text-sm">Securely manage your asserts and future.</span>
          </div>
        </section>

        <UForm
          :schema="schema"
          :state="state"
          class="space-y-6 w-full"
          @submit="onSubmit"
        >
          <UFormField label="Email" name="email">
            <UInput v-model="state.email" class="w-full" variant="subtle" />
          </UFormField>

          <PasswordFormField
            v-model="state.password"
            label="Password"
            name="password"
          />

          <UButton
            type="submit"
            class="items-center"
            :loading="isSubmitting"
            :disabled="isSubmitting"
            block
          >
            Login <UIcon name="i-lucide-arrow-right" />
          </UButton>
        </UForm>

        <USeparator label="Or continue with" :ui="{ container: 'text-muted' }" />

        <div class="flex justify-center gap-3">
          <UButton
            icon="i-logos-google-icon"
            variant="subtle"
            color="neutral"
            block
          >
            Google
          </UButton>
          <UButton
            variant="subtle"
            color="neutral"
            block
          >
            <UIcon name="i-ic-baseline-apple" class="size-5 dark:text-white light:text-black" />
            Apple
          </UButton>
        </div>

        <div class="text-center text-sm text-muted mt-12">
          <span>
            Don't have an account? <NuxtLink to="/signup" class="text-primary font-medium hover:underline cursor-pointer">Sign up</NuxtLink>
          </span>
        </div>
      </div>
    </UPageCard>
  </UContainer>
</template>

<style scoped>

</style>
