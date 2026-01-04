<script setup lang="ts">
  import type { TabsItem } from '#ui/components/Tabs.vue'
  import LoginForm from '~/components/LoginForm.vue'

  setPageLayout('empty')

  const items: TabsItem = [
    {
      label: 'Login',
      slot: 'login'
    },
    {
      label: 'Sign up',
      slot: 'signup'
    }
  ]
</script>

<template>
  <div class="h-screen">
    <div class="grid grid-cols-[1fr_auto] h-full">
      <section class="bg-accented" />

      <section class="p-32">
        <div class="mx-auto w-md space-y-8">
          <h1 class="text-4xl">
            Create an account
          </h1>

          <UTabs :items="items" variant="link">
            <template #login>
              <div class="pt-4 px-2">
                <LoginForm />
              </div>
            </template>

            <template #signup>
              Signup...
            </template>
          </UTabs>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>

</style>
