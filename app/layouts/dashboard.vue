<script setup lang="ts">
  const route = useRoute()
  const isSidebarCollapsed = ref(false)

  const items = [
    { label: 'Overview', to: '/dashboard', icon: 'i-lucide-layout-dashboard' },
    { label: 'Accounts', to: '/accounts', icon: 'i-lucide-wallet' },
    { label: 'Budgets', to: '/budgets', icon: 'i-lucide-pie-chart' },
    { label: 'Categories', to: '/categories', icon: 'i-lucide-tags' },
    { label: 'Goals', to: '/goals', icon: 'i-lucide-target' },
    { label: 'Loans', to: '/loans', icon: 'i-lucide-handshake' },
    { label: 'Transactions', to: '/transactions', icon: 'i-lucide-arrow-left-right' },
    { label: 'Settings', to: '/settings', icon: 'i-lucide-settings' },
    { label: 'Users', to: '/users', icon: 'i-lucide-users' }
  ]

  const isActiveRoute = (to: string) => {
    const [path, hash] = to.split('#')
    if (route.path !== path) {
      return false
    }
    if (!hash) {
      return true
    }
    return route.hash === `#${hash}`
  }
</script>

<template>
  <div class="dashboard-shell min-h-screen text-[var(--dashboard-ink)]">
    <div class="flex min-h-screen flex-col md:flex-row">
      <aside
        class="dashboard-sidebar w-full border-b border-[var(--dashboard-border)] bg-[var(--dashboard-surface-strong)] md:sticky md:top-0 md:h-screen md:border-b-0 md:border-r"
        :class="isSidebarCollapsed ? 'md:w-20' : 'md:w-64'"
      >
        <div class="flex h-full flex-col gap-6 px-4 py-6">
          <div class="flex items-center justify-between gap-3">
            <NuxtLink to="/" class="flex items-center gap-3">
              <span class="flex size-10 items-center justify-center rounded-xl bg-[var(--dashboard-accent-soft)] text-[var(--dashboard-accent-strong)]">
                <UIcon name="i-lucide-wallet-minimal" class="size-5" />
              </span>
              <span class="sidebar-brand-text text-base font-semibold text-[var(--dashboard-ink)]">
                FiMana
              </span>
            </NuxtLink>

            <UButton
              class="hidden md:inline-flex"
              variant="ghost"
              :icon="isSidebarCollapsed ? 'i-lucide-chevrons-right' : 'i-lucide-chevrons-left'"
              :aria-label="isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
              @click="isSidebarCollapsed = !isSidebarCollapsed"
            />
          </div>

          <nav class="flex flex-1 flex-col gap-2">
            <NuxtLink
              v-for="item in items"
              :key="item.label"
              :to="item.to"
              class="sidebar-link group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition"
              :class="isActiveRoute(item.to) ? 'sidebar-link-active' : 'sidebar-link-idle'"
              :title="item.label"
            >
              <span class="sidebar-icon flex size-9 items-center justify-center rounded-xl bg-[var(--dashboard-surface-soft)] text-[var(--dashboard-muted)]">
                <UIcon :name="item.icon" class="size-4" />
              </span>
              <span class="sidebar-label text-[var(--dashboard-ink)]">
                {{ item.label }}
              </span>
            </NuxtLink>
          </nav>

          <div class="sidebar-details rounded-2xl border border-[var(--dashboard-border)] bg-[var(--dashboard-surface)] p-3 text-xs text-[var(--dashboard-muted)]">
            <p class="font-semibold text-[var(--dashboard-ink)]">
              Personal plan
            </p>
            <p class="mt-1">
              12 days left in trial
            </p>
            <UButton class="mt-3 w-full" size="xs" variant="soft">
              Upgrade
            </UButton>
          </div>
        </div>
      </aside>

      <div class="flex min-h-screen flex-1 flex-col">
        <UMain>
          <slot />
        </UMain>
      </div>
    </div>
  </div>
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
