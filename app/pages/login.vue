<script setup lang="ts">
  import * as v from 'valibot'
  import type { FormSubmitEvent } from '@nuxt/ui'

  const schema = v.object({
    email: v.pipe(v.string(), v.email('Invalid email')),
    password: v.pipe(v.string(), v.minLength(8, 'Must be at least 8 characters'))
  })

  type Schema = v.InferOutput<typeof schema>

  const state = reactive({
    email: '',
    password: ''
  })

  const showPassword = ref(false)

  const toast = useToast()
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
    console.log(event.data)
  }
</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <UPageCard class="min-w-md max-w-md p-4 shadow-2xl" variant="subtle">
      <div class="space-y-8">
        <section class="text-center justify-center space-y-6">
          <div class="flex justify-center">
            <AppLogo class="cursor-pointer" @click="navigateTo('/')" />
          </div>

          <div>
            <h1 class="text-3xl font-bold">
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

          <UFormField
            label="Password"
            name="password"
            hint="Forgot password?"
            :ui="{ hint: 'text-primary font-medium cursor-pointer hover:underline' }"
            @click.
          >
            <UInput
              v-model="state.password"
              class="w-full"
              :type="showPassword ? 'text' : 'password'"
              :ui="{ trailing: 'pe-1' }"
              variant="subtle"
            >
              <template #trailing>
                <UButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
                  :aria-pressed="showPassword"
                  aria-controls="password"
                  @click="showPassword = !showPassword"
                />
              </template>
            </UInput>
          </UFormField>

          <UButton
            type="submit"
            class="items-center"
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
            <UIcon name="i-ic-baseline-apple" class="size-5 text-white" />
            Apple
          </UButton>
        </div>

        <div class="text-center text-sm text-muted">
          <span>
            Don't have an account? <NuxtLink class="text-primary font-medium hover:underline cursor-pointer">Sign up</NuxtLink>
          </span>
        </div>
      </div>
    </UPageCard>
  </div>
</template>

<style scoped>

</style>
