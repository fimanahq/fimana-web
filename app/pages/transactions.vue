<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import type { Account } from '~~/types/account'
  import type { Category } from '~~/types/category'

  definePageMeta({
    layout: 'dashboard'
  })

  useSeoMeta({
    title: 'FiMana | Transactions',
    description: 'Review income, expenses, and transfers.'
  })

  const accountsStore = useAccountsStore()
  const categoriesStore = useCategoriesStore()
  const transactionsStore = useTransactionsStore()

  const { accounts } = storeToRefs(accountsStore)
  const { categories } = storeToRefs(categoriesStore)
  const { transactions, totals } = storeToRefs(transactionsStore)

  onMounted(() => {
    if (!accounts.value.length) {
      accountsStore.fetchAccounts()
    }

    if (!categories.value.length) {
      categoriesStore.fetchCategories()
    }

    if (!transactions.value.length) {
      transactionsStore.fetchTransactions()
    }
  })

  const accountMap = computed(() =>
    accounts.value.reduce<Record<string, Account>>((map, account) => {
      if (account) {
        map[account._id] = account
      }
      return map
    }, {})
  )

  const categoryMap = computed(() =>
    categories.value.reduce<Record<string, Category>>((map, category) => {
      if (category) {
        map[category._id] = category
      }
      return map
    }, {})
  )

  const categoryLabel = (category?: Category) => {
    if (!category) {
      return 'Category'
    }

    if (category.parentId && categoryMap.value[category.parentId]) {
      return `${categoryMap.value[category.parentId].name} - ${category.name}`
    }

    return category.name
  }

  const categoryIconName = (category?: Category) => {
    if (!category) {
      return 'i-lucide-circle'
    }

    return `i-solar-${category.icon}-${category.iconStyle || 'line-duotone'}`
  }

  const categoryIconTone = (category?: Category) =>
    category?.isActive ? 'bg-primary/10 text-primary' : 'bg-elevated text-muted'

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
                  :class="[
                    'flex size-10 items-center justify-center rounded-xl',
                    categoryIconTone(categoryMap[transaction.categoryId])
                  ]"
                >
                  <UIcon
                    :name="categoryIconName(categoryMap[transaction.categoryId])"
                    class="size-4"
                  />
                </span>
                <div>
                  <p class="font-semibold">
                    {{ transaction.description }}
                  </p>
                  <p class="text-xs text-muted">
                    {{ categoryLabel(categoryMap[transaction.categoryId]) }} - {{
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
