<script setup lang="ts">
  import type { Budget } from '~/types/budget'
  import type { BudgetCategory } from '~/types/budgetCategory'
  import type { Category } from '~/types/category'

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
      color: '#0ea5e9',
      isSystem: false
    },
    {
      _id: 'cat_transport',
      userId: 'usr_01',
      name: 'Transport',
      type: 'expense',
      icon: 'i-lucide-bus',
      color: '#22c55e',
      isSystem: true
    },
    {
      _id: 'cat_housing',
      userId: 'usr_01',
      name: 'Housing',
      type: 'expense',
      icon: 'i-lucide-home',
      color: '#6366f1',
      isSystem: true
    },
    {
      _id: 'cat_lifestyle',
      userId: 'usr_01',
      name: 'Lifestyle',
      type: 'expense',
      icon: 'i-lucide-gift',
      color: '#f43f5e',
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
  <section class="pb-16 pt-10">
    <UContainer>
      <div class="flex flex-col gap-8">
        <DashboardHeader
          page="Budgets"
          title="Monthly guardrails"
          description="Plan your spend and keep each category within range."
        >
          <UButton variant="soft" icon="i-lucide-plus">
            New budget
          </UButton>
          <UButton variant="outline" icon="i-lucide-filter">
            Filter
          </UButton>
        </DashboardHeader>

        <section class="grid gap-4 lg:grid-cols-3">
          <UPageCard class="dashboard-card">
            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--dashboard-muted)]">
              Current month
            </p>
            <p class="mt-4 text-2xl font-semibold text-[var(--dashboard-ink)]">
              {{ currentBudget ? formatCurrency(currentBudget.totalLimit) : '--' }}
            </p>
            <p class="mt-2 text-xs text-[var(--dashboard-muted)]">
              {{ currentBudget ? formatMonth(currentBudget.month) : 'No budget yet' }}
            </p>
          </UPageCard>

          <UPageCard class="dashboard-card">
            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--dashboard-muted)]">
              Allocated
            </p>
            <p class="mt-4 text-2xl font-semibold text-[var(--dashboard-ink)]">
              {{ currentBudget ? formatCurrency(currentBudget.totalAllocated) : '--' }}
            </p>
            <p class="mt-2 text-xs text-[var(--dashboard-muted)]">
              {{ currentBudget ? currentBudget.allocations.length : 0 }} categories funded
            </p>
          </UPageCard>

          <UPageCard class="dashboard-card">
            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--dashboard-muted)]">
              Unassigned
            </p>
            <p class="mt-4 text-2xl font-semibold text-[var(--dashboard-ink)]">
              {{
                currentBudget
                  ? formatCurrency(currentBudget.totalLimit - currentBudget.totalAllocated)
                  : '--'
              }}
            </p>
            <p class="mt-2 text-xs text-[var(--dashboard-muted)]">
              Available to assign
            </p>
          </UPageCard>
        </section>

        <div class="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <UPageCard class="dashboard-card">
            <div class="flex items-center justify-between gap-3">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--dashboard-accent)]">
                  Budget history
                </p>
                <p class="mt-2 text-sm text-[var(--dashboard-muted)]">
                  Compare recent monthly limits.
                </p>
              </div>
              <UButton variant="ghost" size="xs">
                View all
              </UButton>
            </div>

            <div class="mt-6 divide-y divide-[var(--dashboard-border)]">
              <div
                v-for="budget in budgetAllocations"
                :key="budget._id"
                class="flex flex-wrap items-center justify-between gap-4 py-4 text-sm"
              >
                <div>
                  <p class="font-semibold text-[var(--dashboard-ink)]">
                    {{ formatMonth(budget.month) }}
                  </p>
                  <p class="text-xs text-[var(--dashboard-muted)]">
                    Created {{ budget.createdAt.toLocaleDateString('en-US') }}
                  </p>
                </div>
                <div class="text-right">
                  <p class="font-semibold text-[var(--dashboard-ink)]">
                    {{ formatCurrency(budget.totalLimit) }}
                  </p>
                  <p class="text-xs text-[var(--dashboard-muted)]">
                    {{ formatCurrency(budget.totalAllocated) }} allocated
                  </p>
                </div>
              </div>
            </div>
          </UPageCard>

          <UPageCard class="dashboard-card">
            <div class="flex items-center justify-between gap-3">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--dashboard-accent)]">
                  Category allocations
                </p>
                <p class="mt-2 text-sm text-[var(--dashboard-muted)]">
                  Current month limits by category.
                </p>
              </div>
              <UButton variant="ghost" size="xs">
                Edit
              </UButton>
            </div>

            <div class="mt-6 space-y-4">
              <div
                v-for="allocation in currentBudget?.allocations || []"
                :key="allocation._id"
                class="rounded-2xl border border-[var(--dashboard-border)] bg-[var(--dashboard-surface-soft)] p-4 text-sm"
              >
                <p class="font-semibold text-[var(--dashboard-ink)]">
                  {{ allocation.name }}
                </p>
                <p class="mt-2 text-xs text-[var(--dashboard-muted)]">
                  Limit {{ formatCurrency(allocation.limit) }}
                </p>
              </div>
            </div>
          </UPageCard>
        </div>
      </div>
    </UContainer>
  </section>
</template>
