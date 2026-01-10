<script setup lang="ts">
  import type { User } from '~/types/user'

  definePageMeta({
    layout: 'dashboard'
  })

  useSeoMeta({
    title: 'FiMana | Users',
    description: 'Manage user access and roles.'
  })

  const users: User[] = [
    {
      _id: 'usr_01',
      email: 'joel@fimana.app',
      passwordHash: '***',
      name: 'Joel Vergara',
      role: 'admin',
      status: 'active',
      createdAt: new Date('2023-04-10'),
      updatedAt: new Date('2025-03-20')
    },
    {
      _id: 'usr_02',
      email: 'maria@fimana.app',
      passwordHash: '***',
      name: 'Maria Santos',
      role: 'user',
      status: 'active',
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2025-02-12')
    },
    {
      _id: 'usr_03',
      email: 'luis@fimana.app',
      passwordHash: '***',
      name: 'Luis Cruz',
      role: 'user',
      status: 'suspended',
      createdAt: new Date('2023-09-18'),
      updatedAt: new Date('2024-12-05')
    }
  ]

  const formatDate = (value: Date) =>
    value.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
</script>

<template>
  <section class="pb-16 pt-10">
    <UContainer>
      <div class="flex flex-col gap-8">
        <DashboardHeader
          page="Users"
          title="Team access"
          description="Control roles and account status."
        >
          <UButton variant="soft" icon="i-lucide-user-plus">
            Invite user
          </UButton>
          <UButton variant="outline" icon="i-lucide-shield-check">
            Permissions
          </UButton>
        </DashboardHeader>

        <UPageCard class="dashboard-card">
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--dashboard-accent)]">
                Directory
              </p>
              <p class="mt-2 text-sm text-[var(--dashboard-muted)]">
                Admins can update access settings.
              </p>
            </div>
            <UButton variant="ghost" size="xs">
              Manage roles
            </UButton>
          </div>

          <div class="mt-6 divide-y divide-[var(--dashboard-border)]">
            <div
              v-for="user in users"
              :key="user._id"
              class="flex flex-wrap items-center justify-between gap-4 py-4 text-sm"
            >
              <div>
                <p class="font-semibold text-[var(--dashboard-ink)]">
                  {{ user.name }}
                </p>
                <p class="text-xs text-[var(--dashboard-muted)]">
                  {{ user.email }} - Joined {{ formatDate(user.createdAt) }}
                </p>
              </div>
              <div class="flex items-center gap-3 text-xs">
                <UBadge :color="user.role === 'admin' ? 'primary' : 'neutral'">
                  {{ user.role }}
                </UBadge>
                <UBadge :color="user.status === 'active' ? 'success' : 'warning'">
                  {{ user.status }}
                </UBadge>
                <span class="text-[var(--dashboard-muted)]">
                  Updated {{ formatDate(user.updatedAt) }}
                </span>
              </div>
            </div>
          </div>
        </UPageCard>
      </div>
    </UContainer>
  </section>
</template>
