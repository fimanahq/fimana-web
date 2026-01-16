<script setup lang="ts">
  import type { NavigationMenuItem } from '@nuxt/ui'

  const route = useRoute()

  const open = ref(false)
  const collapsed = ref(false)

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
    },
    {
      id: 'code',
      label: 'Code',
      items: [
        {
          id: 'source',
          label: 'View page source',
          icon: 'i-simple-icons-github',
          to: `https://github.com/nuxt-ui-templates/dashboard/blob/main/app/pages${route.path === '/' ? '/index' : route.path}.vue`,
          target: '_blank'
        }
      ]
    }])
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="default"
      v-model:collapsed="collapsed"
      collapsible
      :class="collapsed ? 'bg-base' : ''"
      class="duration-150 ease-in-out"
      :ui="{
        root: 'transition-[width,min-width] duration-150 ease-in-out overflow-x-hidden',
        header: 'duration-auto px-[calc(0.875rem-1px)]',
        body: 'duration-auto px-[calc(0.875rem-1px)] overflow-x-hidden',
        footer: 'duration-auto px-[calc(0.875rem-1px)]'
      }"
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

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[1]"
          orientation="vertical"
          tooltip
          class="mt-auto"
        />
      </template>

      <template #footer="{ collapsed }">
        <UserMenu :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>

    <UDashboardSearch :groups="groups" />

    <slot />

    <NotificationsSlideover />
  </UDashboardGroup>
</template>

<style scoped>
:global(:root) {
  --dashboard-ink: #0f172a;
  --dashboard-muted: #64748b;
  --dashboard-accent: #0f766e;
  --dashboard-accent-strong: #0b5f58;
  --dashboard-accent-soft: rgba(15, 118, 110, 0.16);
  --dashboard-highlight: #f97316;
  --dashboard-highlight-soft: rgba(249, 115, 22, 0.18);
  --dashboard-positive: #16a34a;
  --dashboard-negative: #dc2626;
  --dashboard-surface: rgba(255, 255, 255, 0.86);
  --dashboard-surface-strong: rgba(255, 255, 255, 0.96);
  --dashboard-surface-soft: rgba(248, 250, 252, 0.8);
  --dashboard-border: rgba(15, 23, 42, 0.08);
  --dashboard-bg: radial-gradient(1200px 640px at 12% -10%, rgba(20, 184, 166, 0.2) 0%, rgba(20, 184, 166, 0) 60%),
  radial-gradient(900px 520px at 82% 4%, rgba(251, 146, 60, 0.16) 0%, rgba(251, 146, 60, 0) 55%),
  #f8fafc;
}

:global(.dark) {
  --dashboard-ink: #e2e8f0;
  --dashboard-muted: #94a3b8;
  --dashboard-accent: #2dd4bf;
  --dashboard-accent-strong: #14b8a6;
  --dashboard-accent-soft: rgba(45, 212, 191, 0.2);
  --dashboard-highlight: #fb923c;
  --dashboard-highlight-soft: rgba(251, 146, 60, 0.2);
  --dashboard-positive: #22c55e;
  --dashboard-negative: #f87171;
  --dashboard-surface: rgba(15, 23, 42, 0.82);
  --dashboard-surface-strong: rgba(15, 23, 42, 0.94);
  --dashboard-surface-soft: rgba(15, 23, 42, 0.7);
  --dashboard-border: rgba(148, 163, 184, 0.18);
  --dashboard-bg: radial-gradient(1200px 640px at 12% -10%, rgba(45, 212, 191, 0.16) 0%, rgba(45, 212, 191, 0) 60%),
  radial-gradient(900px 520px at 82% 4%, rgba(251, 146, 60, 0.14) 0%, rgba(251, 146, 60, 0) 55%),
  #0b1120;
}

.dashboard-shell {
  background: var(--dashboard-bg);
}

:global(.dashboard-card) {
  border: 1px solid var(--dashboard-border);
  background: var(--dashboard-surface);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
}

.dashboard-sidebar {
  transition: width 0.2s ease, padding 0.2s ease;
}

.sidebar-brand-text,
.sidebar-label {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.sidebar-link-idle {
  color: var(--dashboard-muted);
}

.sidebar-link-idle:hover {
  background: var(--dashboard-surface-soft);
}

.sidebar-link-idle:hover .sidebar-icon {
  color: var(--dashboard-accent);
}

.sidebar-link-active {
  background: var(--dashboard-accent-soft);
  color: var(--dashboard-accent-strong);
}

.sidebar-link-active .sidebar-label {
  color: var(--dashboard-accent-strong);
}

.sidebar-link-active .sidebar-icon {
  background: var(--dashboard-accent-soft);
  color: var(--dashboard-accent-strong);
}

.sidebar-link-active .sidebar-label,
.sidebar-link-active .sidebar-icon {
  font-weight: 600;
}

.sidebar-link .sidebar-label {
  white-space: nowrap;
}

@media (min-width: 768px) {
  .md\\:w-20 .sidebar-label,
  .md\\:w-20 .sidebar-brand-text {
    opacity: 0;
    transform: translateX(-6px);
    pointer-events: none;
    width: 0;
    overflow: hidden;
  }

  .md\\:w-20 .sidebar-link {
    justify-content: center;
    padding-left: 0;
    padding-right: 0;
  }

  .md\\:w-20 .sidebar-details {
    display: none;
  }
}
</style>
