<script setup lang="ts">
  import type { Account } from '~~/types/account'
  import type { Category } from '~~/types/category'
  import type { Transaction } from '~~/types/transaction'

  definePageMeta({
    layout: 'dashboard'
  })

  useSeoMeta({
    title: 'FiMana | Transactions',
    description: 'Review income, expenses, and transfers.'
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
    }
  ]

  const categories: Category[] = [
    {
      _id: 'cat_salary',
      userId: 'usr_01',
      name: 'Salary',
      type: 'income',
      icon: 'i-lucide-briefcase',
      color: '#16a34a',
      isSystem: true
    },
    {
      _id: 'cat_groceries',
      userId: 'usr_01',
      name: 'Groceries',
      type: 'expense',
      icon: 'i-lucide-shopping-basket',
      color: '#f97316',
      isSystem: true
    },
    {
      _id: 'cat_dining',
      userId: 'usr_01',
      name: 'Dining out',
      type: 'expense',
      icon: 'i-lucide-utensils',
      color: '#f43f5e',
      isSystem: false
    },
    {
      _id: 'cat_transfer',
      userId: 'usr_01',
      name: 'Transfer',
      type: 'income',
      icon: 'i-lucide-arrow-left-right',
      color: '#0ea5e9',
      isSystem: true
    }
  ]

  const transactions: Transaction[] = [
    {
      _id: 'txn_01',
      userId: 'usr_01',
      accountId: 'acc_01',
      categoryId: 'cat_salary',
      type: 'income',
      amount: 42500,
      description: 'Payroll',
      date: new Date('2025-03-28'),
      createdAt: new Date('2025-03-28')
    },
    {
      _id: 'txn_02',
      userId: 'usr_01',
      accountId: 'acc_01',
      categoryId: 'cat_groceries',
      type: 'expense',
      amount: 2180,
      description: 'Weekly groceries',
      date: new Date('2025-03-27'),
      createdAt: new Date('2025-03-27')
    },
    {
      _id: 'txn_03',
      userId: 'usr_01',
      accountId: 'acc_03',
      categoryId: 'cat_dining',
      type: 'expense',
      amount: 540,
      description: 'Dinner out',
      date: new Date('2025-03-26'),
      createdAt: new Date('2025-03-26')
    },
    {
      _id: 'txn_04',
      userId: 'usr_01',
      accountId: 'acc_02',
      categoryId: 'cat_transfer',
      type: 'transfer',
      amount: 5000,
      description: 'Move to savings',
      date: new Date('2025-03-25'),
      relatedAccountId: 'acc_01',
      createdAt: new Date('2025-03-25')
    },
    {
      _id: 'txn_05',
      userId: 'usr_01',
      accountId: 'acc_01',
      categoryId: 'cat_dining',
      type: 'expense',
      amount: 320,
      description: 'Coffee',
      date: new Date('2025-03-24'),
      createdAt: new Date('2025-03-24')
    },
    {
      _id: 'txn_06',
      userId: 'usr_01',
      accountId: 'acc_02',
      categoryId: 'cat_salary',
      type: 'income',
      amount: 8600,
      description: 'Freelance payment',
      date: new Date('2025-03-22'),
      createdAt: new Date('2025-03-22')
    }
  ]

  const accountMap = computed(() =>
    accounts.reduce<Record<string, Account>>((map, account) => {
      map[account._id] = account
      return map
    }, {})
  )

  const categoryMap = computed(() =>
    categories.reduce<Record<string, Category>>((map, category) => {
      map[category._id] = category
      return map
    }, {})
  )

  const totals = computed(() => ({
    income: transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((sum, transaction) => sum + transaction.amount, 0),
    expense: transactions
      .filter(transaction => transaction.type === 'expense')
      .reduce((sum, transaction) => sum + transaction.amount, 0),
    transfer: transactions
      .filter(transaction => transaction.type === 'transfer')
      .reduce((sum, transaction) => sum + transaction.amount, 0)
  }))

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      maximumFractionDigits: 2
    }).format(value)

  const formatDate = (value: Date) =>
    value.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
</script>

<template>
  <UDashboardPanel>
    <template #body>
      <div class="flex flex-col gap-8">
        <DashboardHeader
          page="Transactions"
          title="Every movement, tracked"
          description="Review inflows, outflows, and transfers in one stream."
        >
          <PrimaryButton icon="i-lucide-plus">
            Add transaction
          </PrimaryButton>
          <UButton variant="outline" icon="i-lucide-download">
            Export
          </UButton>
        </DashboardHeader>

        <section class="grid gap-4 md:grid-cols-3">
          <DashboardStatCard
            :style="{ animationDelay: '0s' }"
            title="Income"
            :value="formatCurrency(totals.income)"
            note="2 deposits this period"
          />

          <DashboardStatCard
            :style="{ animationDelay: '0.08s' }"
            title="Expenses"
            :value="formatCurrency(totals.expense)"
            note="3 purchases logged"
          />

          <DashboardStatCard
            :style="{ animationDelay: '0.16s' }"
            title="Transfers"
            :value="formatCurrency(totals.transfer)"
            note="Between internal accounts"
          />
        </section>

        <UPageCard>
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Activity feed
              </p>
              <p class="mt-2 text-sm text-muted">
                Tap into details or edit entries.
              </p>
            </div>
            <UButton variant="ghost" size="md">
              Filter
            </UButton>
          </div>

          <div class="mt-6 divide-y divide-default">
            <div
              v-for="transaction in transactions"
              :key="transaction._id"
              class="flex flex-wrap items-center justify-between gap-4 py-4 text-sm"
            >
              <div class="flex items-center gap-3">
                <span
                  class="flex size-10 items-center justify-center rounded-xl text-white"
                  :style="{ backgroundColor: categoryMap[transaction.categoryId]?.color || '#94a3b8' }"
                >
                  <UIcon :name="categoryMap[transaction.categoryId]?.icon || 'i-lucide-circle'" class="size-4" />
                </span>
                <div>
                  <p class="font-semibold">
                    {{ transaction.description }}
                  </p>
                  <p class="text-xs text-muted">
                    {{ categoryMap[transaction.categoryId]?.name || 'Category' }} - {{
                      accountMap[transaction.accountId]?.name || 'Account'
                    }}
                  </p>
                </div>
              </div>
              <div class="text-right">
                <p
                  :class="[
                    'text-sm font-semibold',
                    transaction.type === 'expense' ? 'text-error' : ''
                  ]"
                >
                  {{ transaction.type === 'expense' ? '-' : '+' }}{{ formatCurrency(transaction.amount) }}
                </p>
                <p class="text-xs text-muted">
                  {{ formatDate(transaction.date) }}
                  <span v-if="transaction.relatedAccountId">
                    - Transfer from {{ accountMap[transaction.relatedAccountId]?.name || 'Account' }}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </UPageCard>
      </div>
    </template>
  </UDashboardPanel>
</template>
