<script setup lang="ts">
  import * as v from 'valibot'
  import type { FormSubmitEvent } from '@nuxt/ui'
  import NewPasswordFormField from '~/components/NewPasswordFormField.vue'

  useSeoMeta({
    title: 'FiMana | Sign Up'
  })

  const schema = v.pipe(
    v.object({
      firstName: v.pipe(v.string(), v.minLength(1, 'Please enter first name')),
      lastName: v.pipe(v.string(), v.minLength(1, 'Please enter last name')),
      email: v.pipe(v.string(), v.email('Invalid email')),
      password: v.pipe(v.string(), v.minLength(8, 'Must be at least 8 characters')),
      confirmPassword: v.pipe(v.string())
    }),
    v.forward(
      v.partialCheck(
        [['password'], ['confirmPassword']],
        input => input.password === input.confirmPassword,
        'Passwords do not match'
      ),
      ['confirmPassword']
    )
  )

  type Schema = v.InferOutput<typeof schema>
  const authStore = useAuthStore()

  const state = reactive({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const toast = useToast()
  const authToken = useAuthToken()
  const isSubmitting = ref(false)

  async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
      isSubmitting.value = true
      const { email, password } = event.data
      const firstName = event.data.firstName.trim()
      const lastName = event.data.lastName.trim()
      const response = await authStore.register(firstName, lastName, email, password)

      if (isSuccess(response)) {
        authToken.setAccessToken(response.data.accessToken)
        authToken.setRefreshToken(response.data.refreshToken)
        authStore.setUser(response.data.user)

        toast.add({
          title: 'Account created',
          description: response.message || 'Welcome to FiMana.',
          color: 'success'
        })
        await navigateTo(response.data.accessToken ? '/dashboard' : '/login')
      }
    } catch (error) {
      const description = error instanceof Error
        ? error.message
        : 'Unable to create your account right now.'

      toast.add({ title: 'Signup failed', description, color: 'error' })
    } finally {
      isSubmitting.value = false
    }
  }
</script>

<template>
  <UContainer class="h-screen flex flex-col gap-8 justify-center items-center">
    <UButton
      icon="i-lucide-chevron-left"
      class="absolute top-8 left-8"
      variant="subtle"
      to="/"
    />

    <UPageCard class="w-full max-w-md p-4 shadow-2xl" variant="subtle">
      <div class="space-y-8">
        <section class="text-center justify-center space-y-6">
          <div class="flex justify-center">
            <AppLogo
              :width="64"
              :height="64"
              logo-only
              class="cursor-pointer"
              @click="navigateTo('/')"
            />
          </div>

          <div>
            <h1 class="text-2xl font-bold">
              Create an account
            </h1>
            <span class="text-muted text-sm">Join FiMana today and take control of your finances.</span>
          </div>
        </section>

        <UForm
          :schema="schema"
          :state="state"
          class="space-y-6 w-full"
          @submit="onSubmit"
        >
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <UFormField label="First Name" name="firstName">
              <UInput v-model="state.firstName" class="w-full" variant="subtle" />
            </UFormField>

            <UFormField label="Last Name" name="lastName">
              <UInput v-model="state.lastName" class="w-full" variant="subtle" />
            </UFormField>
          </div>

          <UFormField label="Email" name="email">
            <UInput v-model="state.email" class="w-full" variant="subtle" />
          </UFormField>

          <NewPasswordFormField
            v-model="state.password"
            label="Password"
            name="password"
          />

          <PasswordFormField
            v-model="state.confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
          />

          <UButton
            type="submit"
            class="items-center"
            size="xl"
            :loading="isSubmitting"
            :disabled="isSubmitting"
            block
          >
            Create Account <UIcon name="i-lucide-arrow-right" />
          </UButton>
        </UForm>

        <div class="text-center text-sm text-muted mt-12">
          <span>
            Already have an account? <NuxtLink to="/login" class="text-primary font-medium hover:underline cursor-pointer">Login</NuxtLink>
          </span>
        </div>
      </div>
    </UPageCard>

    <div class="text-center text-xs text-muted">
      <span>
        By signing up, you agree to our <NuxtLink to="/terms-of-service" class="text-primary font-medium hover:underline cursor-pointer">Terms of Service</NuxtLink> and <NuxtLink to="/privacy-policy" class="text-primary font-medium hover:underline cursor-pointer">Privacy Policy</NuxtLink>
      </span>
    </div>
  </UContainer>
</template>

<style scoped>

</style>
