<script setup lang="ts">
  import type { NavigationMenuItem } from '@nuxt/ui'

  const open = ref(false)
  const _collapsed = ref(false)

  const openSelect = () => open.value = false

  const links = [
    [
      { label: 'Overview', to: '/dashboard', icon: 'i-lucide-layout-dashboard', onSelect: openSelect },
      { label: 'Accounts', to: '/accounts', icon: 'i-lucide-wallet', onSelect: openSelect },
      { label: 'Budgets', to: '/budgets', icon: 'i-lucide-pie-chart', onSelect: openSelect },
      { label: 'Categories', to: '/categories', icon: 'i-lucide-tags', onSelect: openSelect },
      { label: 'Goals', to: '/goals', icon: 'i-lucide-target', onSelect: openSelect },
      { label: 'Loans', to: '/loans', icon: 'i-lucide-handshake', onSelect: openSelect },
      { label: 'Transactions', to: '/transactions', icon: 'i-lucide-arrow-left-right', onSelect: openSelect },
      { label: 'Settings', to: '/settings', icon: 'i-lucide-settings', onSelect: openSelect },
      { label: 'Users', to: '/users', icon: 'i-lucide-users', onSelect: openSelect }
    ],
    [
      {
        label: 'Feedback',
        icon: 'i-lucide-message-circle',
        to: 'https://github.com/nuxt-ui-templates/dashboard',
        target: '_blank'
      },
      {
        label: 'Help & Support',
        icon: 'i-lucide-info',
        to: 'https://github.com/nuxt-ui-templates/dashboard',
        target: '_blank'
      }
    ]
  ] satisfies NavigationMenuItem[][]

  const groups = computed(() => [
    {
      id: 'links',
      label: 'Go to',
      items: links.flat()
    }
  ])
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="default"
      v-model:open="open"
      v-model:collapsed="_collapsed"
      collapsible
      :class="_collapsed ? 'bg-base' : ''"
      class="duration-150 ease-in-out"
      :ui="{
        root: 'transition-[width,min-width] duration-150 ease-in-out overflow-x-hidden',
        header: 'duration-auto px-[calc(0.875rem-1px)]',
        body: 'duration-auto px-[calc(0.875rem-1px)] overflow-x-hidden',
        footer: 'duration-auto px-[calc(0.875rem-1px)] overflow-x-hidden lg:border-t lg:border-default'
      }"
      mode="drawer"
    >
      <template #header="{ collapsed }">
        <div class="flex justify-between w-full">
          <div class="relative group">
            <AppLogo :collapsed="collapsed" />
            <UDashboardSidebarCollapse
              v-if="collapsed"
              class="text-dimmed absolute inset-0 opacity-0 hidden group-hover:flex group-hover:opacity-100 items-center justify-center"
            />
          </div>

          <UDashboardSidebarCollapse
            class="duration-150 ease-in-out text-dimmed"
            :class="collapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'"
          />
        </div>
      </template>

      <template #default="{ collapsed }">
        <UDashboardSearchButton :collapsed="collapsed" class="bg-transparent ring-default" />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[0]"
          orientation="vertical"
          tooltip
          popover
        />
      </template>

      <template #footer="{ collapsed }">
        <UserMenu :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>

    <UDashboardSearch :groups="groups" />

    <slot />

    <!--    <NotificationsSlideover /> -->
  </UDashboardGroup>
</template>

<style scoped>
</style>
