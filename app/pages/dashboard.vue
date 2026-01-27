<script setup lang="ts">
  definePageMeta({
    layout: 'dashboard'
  })

  useSeoMeta({
    title: 'FiMana | Dashboard',
    description: 'Track cashflow, budgets, and upcoming bills in one view.'
  })

  const authStore = useAuthStore()
  const title = computed(() => authStore.user?.firstName ? `Welcome back, ${authStore.user?.firstName}!` : 'Welcome back!')

  const stats = [
    {
      label: 'Available cash',
      value: '$28,420',
      delta: '+8.4%',
      note: 'last 30 days',
      icon: 'i-lucide-wallet',
      trendIcon: 'i-lucide-trending-up',
      toneClass: 'text-success'
    },
    {
      label: 'Monthly spend',
      value: '$4,890',
      delta: '-12%',
      note: 'vs last month',
      icon: 'i-lucide-receipt',
      trendIcon: 'i-lucide-trending-down',
      toneClass: 'text-success'
    },
    {
      label: 'Savings rate',
      value: '22%',
      delta: '+3.1%',
      note: 'goal 18%',
      icon: 'i-lucide-piggy-bank',
      trendIcon: 'i-lucide-trending-up',
      toneClass: 'text-success'
    },
    {
      label: 'Net worth',
      value: '$142,860',
      delta: '+4.6%',
      note: 'last quarter',
      icon: 'i-lucide-bar-chart-3',
      trendIcon: 'i-lucide-trending-up',
      toneClass: 'text-success'
    }
  ]

  const cashflowBars = [
    { label: 'Mon', height: 46, tone: 'accent' },
    { label: 'Tue', height: 62, tone: 'accent' },
    { label: 'Wed', height: 38, tone: 'soft' },
    { label: 'Thu', height: 74, tone: 'accent' },
    { label: 'Fri', height: 58, tone: 'highlight' },
    { label: 'Sat', height: 32, tone: 'soft' },
    { label: 'Sun', height: 68, tone: 'accent' }
  ]

  const budgets = [
    { category: 'Groceries', used: 420, limit: 600 },
    { category: 'Dining out', used: 280, limit: 320 },
    { category: 'Transport', used: 140, limit: 260 },
    { category: 'Subscriptions', used: 96, limit: 120 }
  ].map(budget => ({
    ...budget,
    percent: Math.round((budget.used / budget.limit) * 100)
  }))

  const goals = [
    { name: 'Emergency fund', progress: 72, target: '$12,000', due: 'Dec 2025' },
    { name: 'Portugal trip', progress: 41, target: '$4,500', due: 'Aug 2025' },
    { name: 'New laptop', progress: 63, target: '$2,400', due: 'Oct 2024' }
  ]

  const bills = [
    { name: 'Rent', due: 'Apr 1', amount: '$1,950', status: 'Upcoming' },
    { name: 'Utilities', due: 'Apr 4', amount: '$140', status: 'Scheduled' },
    { name: 'Phone plan', due: 'Apr 6', amount: '$72', status: 'Autopay' },
    { name: 'Car insurance', due: 'Apr 10', amount: '$168', status: 'Upcoming' }
  ]

  const transactions = [
    { name: 'Blue Bottle Coffee', category: 'Dining', date: 'Today', amount: '-$8.40' },
    { name: 'Spotify', category: 'Subscriptions', date: 'Yesterday', amount: '-$12.99' },
    { name: 'Company payroll', category: 'Income', date: 'Mar 26', amount: '+$4,250' },
    { name: 'Trader Joe\'s', category: 'Groceries', date: 'Mar 25', amount: '-$92.18' },
    { name: 'Uber', category: 'Transport', date: 'Mar 24', amount: '-$18.25' },
    { name: 'Interest credit', category: 'Savings', date: 'Mar 23', amount: '+$24.60' }
  ]

  const categories = [
    { name: 'Housing', percent: 38, amount: '$2,140' },
    { name: 'Food & dining', percent: 24, amount: '$1,360' },
    { name: 'Transport', percent: 16, amount: '$890' },
    { name: 'Lifestyle', percent: 12, amount: '$680' }
  ]

  const focusItems = [
    'Move $120 from dining to travel savings this week.',
    'Your utilities bill is trending 9% below average.',
    'Two subscriptions renew in the next 5 days.'
  ]
</script>

<template>
  <UDashboardPanel>
    <template #body>
      <div class="flex flex-col gap-8">
        <DashboardHeader
          page="Dashboard"
          :title="title"
          :loading-title="!authStore.user"
          description="Here's how your money moved this month."
        >
          <PrimaryButton>
            This month
          </PrimaryButton>
          <UButton variant="ghost">
            Last 90 days
          </UButton>
          <UButton variant="outline" icon="i-lucide-sliders-horizontal">
            Customize
          </UButton>
        </DashboardHeader>

        <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <DashboardStatCard
            v-for="(stat, index) in stats"
            :key="stat.label"
            :style="{ animationDelay: `${index * 0.08}s` }"
            :title="stat.label"
            :value="stat.value"
            :icon="stat.icon"
            :note="stat.note"
          >
            <template #delta>
              <span :class="['flex items-center gap-1 font-semibold', stat.toneClass]">
                <UIcon :name="stat.trendIcon" class="size-3" />
                {{ stat.delta }}
              </span>
            </template>
          </DashboardStatCard>
        </section>

        <section class="grid gap-6 lg:grid-cols-[2.1fr_1fr]">
          <UPageCard>
            <div>
              <div class="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                    Cashflow
                  </p>
                  <h2 class="mt-2 text-2xl font-semibold ">
                    $38,920
                  </h2>
                  <p class="text-sm text-muted">
                    Income is ahead of expenses by $6,120.
                  </p>
                </div>
                <div class="flex items-center gap-3 text-xs">
                  <span class="flex items-center gap-2 text-muted">
                    <span class="size-2 rounded-full bg-primary" />
                    Inflow
                  </span>
                  <span class="flex items-center gap-2 text-muted">
                    <span class="size-2 rounded-full bg-secondary" />
                    Outflow
                  </span>
                </div>
              </div>

              <div class="mt-8 flex items-end gap-4">
                <div
                  v-for="bar in cashflowBars"
                  :key="bar.label"
                  class="flex flex-col items-center gap-2"
                >
                  <div class="relative h-32 w-4 overflow-hidden rounded-full bg-elevated">
                    <span
                      class="absolute bottom-0 w-full rounded-full"
                      :class="{
                        'bg-primary': bar.tone === 'accent',
                        'bg-secondary': bar.tone === 'highlight',
                        'bg-primary/25': bar.tone === 'soft'
                      }"
                      :style="{ height: `${bar.height}%` }"
                    />
                  </div>
                  <span class="text-[10px] font-semibold text-muted">
                    {{ bar.label }}
                  </span>
                </div>
              </div>

              <div class="mt-8 grid gap-4 sm:grid-cols-3">
                <UPageCard>
                  <p class="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    Income
                  </p>
                  <p class="mt-2 text-lg font-semibold ">
                    $22,540
                  </p>
                </UPageCard>
                <UPageCard>
                  <p class="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    Expenses
                  </p>
                  <p class="mt-2 text-lg font-semibold ">
                    $16,420
                  </p>
                </UPageCard>
                <UPageCard>
                  <p class="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    Savings
                  </p>
                  <p class="mt-2 text-lg font-semibold ">
                    $6,120
                  </p>
                </UPageCard>
              </div>
            </div>
          </UPageCard>

          <div class="grid gap-6">
            <UPageCard>
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                    Upcoming bills
                  </p>
                  <p class="mt-2 text-lg font-semibold ">
                    $2,330 due
                  </p>
                </div>
                <UButton variant="ghost" size="md">
                  View all
                </UButton>
              </div>

              <ul class="mt-6 space-y-4 text-sm">
                <li
                  v-for="bill in bills"
                  :key="bill.name"
                  class="flex items-center justify-between"
                >
                  <div>
                    <p class="font-semibold ">
                      {{ bill.name }}
                    </p>
                    <p class="text-xs text-muted">
                      {{ bill.due }} - {{ bill.status }}
                    </p>
                  </div>
                  <span class="font-semibold ">{{ bill.amount }}</span>
                </li>
              </ul>
            </UPageCard>

            <UPageCard>
              <p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Focus this week
              </p>
              <h3 class="mt-3 text-lg font-semibold ">
                Stay ahead of the April reset.
              </h3>
              <ul class="mt-4 space-y-3 text-sm text-muted">
                <li v-for="item in focusItems" :key="item" class="flex items-start gap-2">
                  <span class="mt-1 size-2 rounded-full bg-secondary" />
                  <span>{{ item }}</span>
                </li>
              </ul>
              <UButton class="mt-6 w-fit" variant="soft">
                Review suggestions
              </UButton>
            </UPageCard>
          </div>
        </section>

        <section id="budgets" class="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <UPageCard>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  Budgets
                </p>
                <h2 class="mt-2 text-2xl font-semibold ">
                  Guardrails in range
                </h2>
              </div>
              <UButton variant="ghost" size="md">
                Edit budgets
              </UButton>
            </div>

            <div class="mt-6 space-y-5">
              <UPageCard v-for="budget in budgets" :key="budget.category" variant="naked">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-semibold ">
                    {{ budget.category }}
                  </p>
                  <p class="text-xs font-semibold text-muted">
                    ${{ budget.used }} / ${{ budget.limit }}
                  </p>
                </div>
                <div class="mt-3 h-2 rounded-full bg-elevated">
                  <div
                    class="h-2 rounded-full bg-primary"
                    :style="{ width: `${budget.percent}%` }"
                  />
                </div>
                <p class="mt-2 text-xs text-muted">
                  {{ budget.percent }}% used
                </p>
              </UPageCard>
            </div>
          </UPageCard>

          <UPageCard>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  Goals
                </p>
                <h2 class="mt-2 text-2xl font-semibold ">
                  Savings progress
                </h2>
              </div>
              <UButton variant="ghost" size="md">
                Add goal
              </UButton>
            </div>

            <div class="mt-6 space-y-5">
              <UPageCard v-for="goal in goals" :key="goal.name" variant="soft">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-semibold ">
                    {{ goal.name }}
                  </p>
                  <p class="text-xs text-muted">
                    {{ goal.target }}
                  </p>
                </div>
                <div class="mt-3 h-2 rounded-full bg-elevated">
                  <div
                    class="h-2 rounded-full bg-secondary"
                    :style="{ width: `${goal.progress}%` }"
                  />
                </div>
                <div class="mt-2 flex items-center justify-between text-xs text-muted">
                  <span>{{ goal.progress }}% saved</span>
                  <span>{{ goal.due }}</span>
                </div>
              </UPageCard>
            </div>
          </UPageCard>
        </section>

        <section id="reports" class="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <UPageCard>
            <div>
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                    Recent activity
                  </p>
                  <h2 class="mt-2 text-2xl font-semibold ">
                    Latest transactions
                  </h2>
                </div>
                <UButton variant="ghost" size="md">
                  Export CSV
                </UButton>
              </div>

              <ul class="mt-6 divide-y divide-default">
                <li
                  v-for="transaction in transactions"
                  :key="transaction.name + transaction.date"
                  class="flex flex-wrap items-center justify-between gap-3 py-4 text-sm"
                >
                  <div>
                    <p class="font-semibold ">
                      {{ transaction.name }}
                    </p>
                    <p class="text-xs text-muted">
                      {{ transaction.category }} - {{ transaction.date }}
                    </p>
                  </div>
                  <span
                    :class="[
                      'font-semibold',
                      transaction.amount.startsWith('+') ? 'text-success' : ''
                    ]"
                  >
                    {{ transaction.amount }}
                  </span>
                </li>
              </ul>
            </div>
          </UPageCard>

          <UPageCard>
            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Spending mix
            </p>
            <h2 class="mt-2 text-2xl font-semibold ">
              Category report
            </h2>

            <div class="mt-6 space-y-4">
              <UPageCard
                v-for="category in categories"
                :key="category.name"
                variant="soft"
              >
                <div class="flex items-center justify-between text-sm">
                  <p class="font-semibold ">
                    {{ category.name }}
                  </p>
                  <p class="text-xs font-semibold text-muted">
                    {{ category.amount }}
                  </p>
                </div>
                <div class="mt-3 h-2 rounded-full bg-elevated">
                  <div
                    class="h-2 rounded-full bg-primary"
                    :style="{ width: `${category.percent}%` }"
                  />
                </div>
                <p class="mt-2 text-xs text-muted">
                  {{ category.percent }}% of total spend
                </p>
              </UPageCard>
            </div>

            <UButton class="mt-6 w-fit" variant="outline">
              Open full report
            </UButton>
          </UPageCard>
        </section>
      </div>
    </template>
  </UDashboardPanel>
</template>

<style scoped>
</style>
