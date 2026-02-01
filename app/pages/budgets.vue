<script setup lang="ts">
  import type { Budget } from '~~/types/budget'
  import type { Category } from '~~/types/category'
  import type { BudgetCategory } from '~~/types/budgetCategory'

  definePageMeta({
    layout: 'dashboard'
  })

  useSeoMeta({
    title: 'FiMana | Budgets',
    description: 'Plan monthly spending with category guardrails.'
  })

  const budgets: Budget[] = [
    {
      _id: 'bud_2025_03',
      userId: 'usr_01',
      month: '2025-03',
      totalLimit: 45000,
      createdAt: new Date('2025-03-01')
    },
    {
      _id: 'bud_2025_04',
      userId: 'usr_01',
      month: '2025-04',
      totalLimit: 48000,
      createdAt: new Date('2025-04-01')
    }
  ]

  const categories: Category[] = [
    {
      _id: 'cat_groceries',
      userId: 'usr_01',
      name: 'Groceries',
      icon: 'cart-large-2',
      iconStyle: 'line-duotone',
      parentId: null,
      isActive: true,
      isSystem: true
    },
    {
      _id: 'cat_dining',
      userId: 'usr_01',
      name: 'Dining out',
      icon: 'cup-hot',
      iconStyle: 'line-duotone',
      parentId: null,
      isActive: true,
      isSystem: false
    },
    {
      _id: 'cat_transport',
      userId: 'usr_01',
      name: 'Transport',
      icon: 'bus',
      iconStyle: 'line-duotone',
      parentId: null,
      isActive: true,
      isSystem: true
    },
    {
      _id: 'cat_housing',
      userId: 'usr_01',
      name: 'Housing',
      icon: 'home-2',
      iconStyle: 'line-duotone',
      parentId: null,
      isActive: true,
      isSystem: true
    },
    {
      _id: 'cat_lifestyle',
      userId: 'usr_01',
      name: 'Lifestyle',
      icon: 'gift',
      iconStyle: 'line-duotone',
      parentId: null,
      isActive: true,
      isSystem: false
    }
  ]

  const budgetCategories: BudgetCategory[] = [
    { _id: 'bc_01', budgetId: 'bud_2025_04', categoryId: 'cat_groceries', limit: 12000 },
    { _id: 'bc_02', budgetId: 'bud_2025_04', categoryId: 'cat_dining', limit: 6000 },
    { _id: 'bc_03', budgetId: 'bud_2025_04', categoryId: 'cat_transport', limit: 4200 },
    { _id: 'bc_04', budgetId: 'bud_2025_04', categoryId: 'cat_housing', limit: 18000 },
    { _id: 'bc_05', budgetId: 'bud_2025_04', categoryId: 'cat_lifestyle', limit: 4500 }
  ]

  const categoryMap = computed(() =>
    categories.reduce<Record<string, Category>>((map, category) => {
      map[category._id] = category
      return map
    }, {})
  )

  const budgetAllocations = computed(() =>
    budgets.map((budget) => {
      const allocations = budgetCategories
        .filter(item => item.budgetId === budget._id)
        .map(item => ({
          ...item,
          name: categoryMap.value[item.categoryId]?.name || 'Uncategorized'
        }))
      const totalAllocated = allocations.reduce((sum, item) => sum + item.limit, 0)
      return {
        ...budget,
        allocations,
        totalAllocated
      }
    })
  )

  const currentBudget = computed(
    () => budgetAllocations.value[budgetAllocations.value.length - 1]
  )

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      maximumFractionDigits: 0
    }).format(value)

  const formatMonth = (value: string) => {
    const [year, month] = value.split('-').map(Number)
    return new Date(year, month - 1, 1).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    })
  }
</script>

<template>
  <UDashboardPanel>
    <template #body>
      <div class="flex flex-col gap-8">
        <DashboardHeader
          page="Budgets"
          title="Monthly guardrails"
          description="Plan your spend and keep each category within range."
        >
          <PrimaryButton icon="i-lucide-plus">
            New budget
          </PrimaryButton>
          <UButton variant="outline" icon="i-lucide-filter">
            Filter
          </UButton>
        </DashboardHeader>

        <section class="grid gap-4 lg:grid-cols-3">
          <DashboardStatCard
            :style="{ animationDelay: '0s' }"
            title="Current month"
            :value="currentBudget ? formatCurrency(currentBudget.totalLimit) : '--'"
            :note="currentBudget ? formatMonth(currentBudget.month) : 'No budget yet'"
          />

          <DashboardStatCard
            :style="{ animationDelay: '0.08s' }"
            title="Allocated"
            :value="currentBudget ? formatCurrency(currentBudget.totalAllocated) : '--'"
            :note="`${currentBudget ? currentBudget.allocations.length : 0} categories funded`"
          />

          <DashboardStatCard
            :style="{ animationDelay: '0.16s' }"
            title="Unassigned"
            :value="currentBudget ? formatCurrency(currentBudget.totalLimit - currentBudget.totalAllocated) : '--'"
            note="Available to assign"
          />
        </section>

        <div class="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <UPageCard>
            <div>
              <div class="flex justify-between items-center gap-3">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                    Budget history
                  </p>
                  <p class="mt-2 text-sm text-muted">
                    Compare recent monthly limits.
                  </p>
                </div>
                <UButton variant="ghost" size="md">
                  View all
                </UButton>
              </div>

              <div class="mt-6 divide-y divide-default">
                <div
                  v-for="budget in budgetAllocations"
                  :key="budget._id"
                  class="flex flex-wrap items-center justify-between gap-4 py-4 text-sm"
                >
                  <div>
                    <p class="font-semibold">
                      {{ formatMonth(budget.month) }}
                    </p>
                    <p class="text-xs text-muted">
                      Created {{ budget.createdAt.toLocaleDateString('en-US') }}
                    </p>
                  </div>
                  <div class="text-right">
                    <p class="font-semibold">
                      {{ formatCurrency(budget.totalLimit) }}
                    </p>
                    <p class="text-xs text-muted">
                      {{ formatCurrency(budget.totalAllocated) }} allocated
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </UPageCard>

          <div>
            <UPageCard>
              <div class="flex items-center justify-between gap-3">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                    Category allocations
                  </p>
                  <p class="mt-2 text-sm text-muted">
                    Current month limits by category.
                  </p>
                </div>
                <UButton variant="ghost" size="md">
                  Edit
                </UButton>
              </div>

              <div class="mt-6 space-y-4">
                <UPageCard v-for="allocation in currentBudget?.allocations || []" :key="allocation._id" variant="soft">
                  <p class="font-semibold">
                    {{ allocation.name }}
                  </p>
                  <p class="mt-2 text-xs text-muted">
                    Limit {{ formatCurrency(allocation.limit) }}
                  </p>
                </UPageCard>
              </div>
            </UPageCard>
          </div>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
