<script setup lang="ts">
  import type { NavigationMenuItem } from '#ui/components/NavigationMenu.vue'
  import AppLogo from '~/components/AppLogo.vue'

  const items = computed<NavigationMenuItem[]>(() => [
    { label: 'Features', to: '#features' },
    { label: 'How it works', to: '#workflow' },
    { label: 'Insights', to: '#insights' },
    { label: 'Pricing', to: '#pricing' },
    { label: 'FAQ', to: '#faq' }
  ])
</script>

<template>
  <UHeader :toggle="false">
    <template #title>
      <AppLogo />
    </template>

    <UNavigationMenu class="not-sm:hidden" :items="items" />

    <template #right>
      <UColorModeButton />

      <UButton variant="ghost" color="neutral" to="/login">
        Sign in
      </UButton>

      <UButton to="/signup">
        Start free
      </UButton>
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>
