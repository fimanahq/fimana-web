<script setup lang="ts">
  import type { Account } from '~~/types/account'

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
    value < 0 ? 'text-error' : ''
</script>

<template>
  <UDashboardPanel>
    <template #body>
      <div class="flex flex-col gap-10">
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
          <DashboardStatCard
            :style="{ animationDelay: '0s' }"
            title="Total balance"
            :value="formatCurrency(totalBalance)"
            :note="`Across ${activeAccounts.length} active accounts`"
          />

          <DashboardStatCard
            :style="{ animationDelay: '0.08s' }"
            title="Primary account"
            :value="topAccount?.name || 'No accounts'"
            :note="topAccount ? formatCurrency(topAccount.balance) : 'Add an account to start'"
          />

          <DashboardStatCard
            :style="{ animationDelay: '0.16s' }"
            title="Archived accounts"
            :value="archivedCount"
            note="Hidden from daily totals"
          />
        </section>

        <UPageCard>
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                All accounts
              </p>
              <p class="mt-2 text-sm text-muted">
                Keep balances accurate for clean reporting.
              </p>
            </div>
            <UButton variant="ghost" size="md">
              Manage
            </UButton>
          </div>

          <div class="mt-6 divide-y divide-default">
            <div
              v-for="account in accounts"
              :key="account._id"
              class="flex flex-wrap items-center justify-between gap-4 py-4 text-sm"
            >
              <div>
                <p class="font-semibold">
                  {{ account.name }}
                </p>
                <p class="text-xs text-muted">
                  {{ account.type.toUpperCase() }} - {{ account.currency }} - Created
                  {{ formatDate(account.createdAt) }}
                </p>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-xs text-muted">
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
    </template>
  </UDashboardPanel>
</template>
