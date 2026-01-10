<script setup lang="ts">
  import type { Account } from '~/types/account'

  definePageMeta({
    layout: 'dashboard'
  })

  useSeoMeta({
    title: 'FiMana | Accounts',
    description: 'Track balances across cash, banks, and e-wallets.'
  })

  const accounts: Account[] = [
    {
      _id: 'acc_01',
      userId: 'usr_01',
      name: 'UnionBank Checking',
      type: 'bank',
      currency: 'PHP',
      balance: 48230.45,
      isArchived: false,
      createdAt: new Date('2024-11-01')
    },
    {
      _id: 'acc_02',
      userId: 'usr_01',
      name: 'BPI Savings',
      type: 'bank',
      currency: 'PHP',
      balance: 120000,
      isArchived: false,
      createdAt: new Date('2023-08-14')
    },
    {
      _id: 'acc_03',
      userId: 'usr_01',
      name: 'GCash Wallet',
      type: 'ewallet',
      currency: 'PHP',
      balance: 8420.75,
      isArchived: false,
      createdAt: new Date('2024-02-18')
    },
    {
      _id: 'acc_04',
      userId: 'usr_01',
      name: 'Cash on hand',
      type: 'cash',
      currency: 'PHP',
      balance: 3200,
      isArchived: false,
      createdAt: new Date('2024-05-06')
    },
    {
      _id: 'acc_05',
      userId: 'usr_01',
      name: 'Visa Platinum',
      type: 'credit',
      currency: 'PHP',
      balance: -14500,
      isArchived: false,
      createdAt: new Date('2022-11-02')
    },
    {
      _id: 'acc_06',
      userId: 'usr_01',
      name: 'Old Savings',
      type: 'bank',
      currency: 'PHP',
      balance: 0,
      isArchived: true,
      createdAt: new Date('2021-03-19')
    }
  ]

  const activeAccounts = computed(() => accounts.filter(account => !account.isArchived))
  const archivedCount = computed(() => accounts.filter(account => account.isArchived).length)
  const totalBalance = computed(() =>
    activeAccounts.value.reduce((sum, account) => sum + account.balance, 0)
  )
  const topAccount = computed(() =>
    [...activeAccounts.value].sort((a, b) => b.balance - a.balance)[0]
  )

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      maximumFractionDigits: 2
    }).format(value)

  const formatDate = (value: Date) =>
    value.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  const balanceTone = (value: number) =>
    value < 0 ? 'text-[var(--dashboard-negative)]' : 'text-[var(--dashboard-ink)]'
</script>

<template>
  <section class="pb-16 pt-10">
    <UContainer>
      <div class="flex flex-col gap-8">
        <DashboardHeader
          page="Accounts"
          title="Cash and bank balances"
          description="Track where your money sits across cash, banks, and e-wallets."
        >
          <UButton variant="soft" icon="i-lucide-plus">
            Add account
          </UButton>
          <UButton variant="outline" icon="i-lucide-download">
            Export
          </UButton>
        </DashboardHeader>

        <section class="grid gap-4 md:grid-cols-3">
          <UPageCard class="dashboard-card">
            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--dashboard-muted)]">
              Total balance
            </p>
            <p class="mt-4 text-2xl font-semibold text-[var(--dashboard-ink)]">
              {{ formatCurrency(totalBalance) }}
            </p>
            <p class="mt-2 text-xs text-[var(--dashboard-muted)]">
              Across {{ activeAccounts.length }} active accounts
            </p>
          </UPageCard>

          <UPageCard class="dashboard-card">
            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--dashboard-muted)]">
              Primary account
            </p>
            <p class="mt-4 text-2xl font-semibold text-[var(--dashboard-ink)]">
              {{ topAccount?.name || 'No accounts' }}
            </p>
            <p class="mt-2 text-xs text-[var(--dashboard-muted)]">
              {{ topAccount ? formatCurrency(topAccount.balance) : 'Add an account to start' }}
            </p>
          </UPageCard>

          <UPageCard class="dashboard-card">
            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--dashboard-muted)]">
              Archived accounts
            </p>
            <p class="mt-4 text-2xl font-semibold text-[var(--dashboard-ink)]">
              {{ archivedCount }}
            </p>
            <p class="mt-2 text-xs text-[var(--dashboard-muted)]">
              Hidden from daily totals
            </p>
          </UPageCard>
        </section>

        <UPageCard class="dashboard-card">
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--dashboard-accent)]">
                All accounts
              </p>
              <p class="mt-2 text-sm text-[var(--dashboard-muted)]">
                Keep balances accurate for clean reporting.
              </p>
            </div>
            <UButton variant="ghost" size="xs">
              Manage
            </UButton>
          </div>

          <div class="mt-6 divide-y divide-[var(--dashboard-border)]">
            <div
              v-for="account in accounts"
              :key="account._id"
              class="flex flex-wrap items-center justify-between gap-4 py-4 text-sm"
            >
              <div>
                <p class="font-semibold text-[var(--dashboard-ink)]">
                  {{ account.name }}
                </p>
                <p class="text-xs text-[var(--dashboard-muted)]">
                  {{ account.type.toUpperCase() }} - {{ account.currency }} - Created
                  {{ formatDate(account.createdAt) }}
                </p>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-xs text-[var(--dashboard-muted)]">
                  {{ account.isArchived ? 'Archived' : 'Active' }}
                </span>
                <span :class="['text-sm font-semibold', balanceTone(account.balance)]">
                  {{ formatCurrency(account.balance) }}
                </span>
              </div>
            </div>
          </div>
        </UPageCard>
      </div>
    </UContainer>
  </section>
</template>
