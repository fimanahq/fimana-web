<script setup lang="ts">
  import type { Category } from '~/types/category'

  definePageMeta({
    layout: 'dashboard'
  })

  useSeoMeta({
    title: 'FiMana | Categories',
    description: 'Organize income and expenses with clear categories.'
  })

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
      _id: 'cat_freelance',
      userId: 'usr_01',
      name: 'Freelance',
      type: 'income',
      icon: 'i-lucide-laptop',
      color: '#22c55e',
      isSystem: false
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
      _id: 'cat_housing',
      userId: 'usr_01',
      name: 'Housing',
      type: 'expense',
      icon: 'i-lucide-home',
      color: '#6366f1',
      isSystem: true
    },
    {
      _id: 'cat_transport',
      userId: 'usr_01',
      name: 'Transport',
      type: 'expense',
      icon: 'i-lucide-bus',
      color: '#0ea5e9',
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
    }
  ]
</script>

<template>
  <UDashboardPanel>
    <template #body>
      <div class="flex flex-col gap-8">
        <DashboardHeader
          page="Categories"
          title="Income and expense labels"
          description="Keep transactions clean with consistent categories."
        >
          <UButton variant="soft" icon="i-lucide-plus">
            New category
          </UButton>
          <UButton variant="outline" icon="i-lucide-sparkles">
            Suggest
          </UButton>
        </DashboardHeader>

        <UPageCard>
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--dashboard-accent)]">
                Category library
              </p>
              <p class="mt-2 text-sm text-muted">
                System defaults plus your custom picks.
              </p>
            </div>
            <UButton variant="ghost" size="md">
              Manage
            </UButton>
          </div>

          <div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            <UPageCard v-for="category in categories" :key="category._id">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <span
                    class="flex size-10 items-center justify-center rounded-xl text-white"
                    :style="{ backgroundColor: category.color }"
                  >
                    <UIcon :name="category.icon" class="size-4" />
                  </span>
                  <div>
                    <p class="text-sm font-semibold">
                      {{ category.name }}
                    </p>
                    <p class="text-xs text-muted">
                      {{ category.type }} - {{ category.isSystem ? 'System' : 'Custom' }}
                    </p>
                  </div>
                </div>
                <UButton variant="ghost" size="md" icon="i-lucide-ellipsis" />
              </div>
            </UPageCard>
          </div>
        </UPageCard>
      </div>
    </template>
  </UDashboardPanel>
</template>
