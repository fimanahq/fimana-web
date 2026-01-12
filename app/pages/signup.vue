<script setup lang="ts">
  import * as v from 'valibot'
  import type { FormSubmitEvent } from '@nuxt/ui'
  import NewPasswordFormField from '~/components/NewPasswordFormField.vue'

  const schema = v.pipe(
    v.object({
      name: v.pipe(v.string(), v.minLength(1, 'Please enter full name')),
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

  const state = reactive({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const toast = useToast()
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
    console.log(event.data)
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

    <UPageCard class="max-w-md p-4 shadow-2xl" variant="subtle">
      <div class="space-y-8">
        <section class="text-center justify-center space-y-6">
          <div class="flex justify-center">
            <AppLogo class="cursor-pointer" @click="navigateTo('/')" />
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
          <UFormField label="Full Name" name="name">
            <UInput v-model="state.name" class="w-full" variant="subtle" />
          </UFormField>

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
