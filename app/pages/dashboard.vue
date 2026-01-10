<script setup lang="ts">
  definePageMeta({
    layout: 'dashboard'
  })

  useSeoMeta({
    title: 'FiMana | Dashboard',
    description: 'Track cashflow, budgets, and upcoming bills in one view.'
  })

  const stats = [
    {
      label: 'Available cash',
      value: '$28,420',
      delta: '+8.4%',
      note: 'last 30 days',
      icon: 'i-lucide-wallet',
      trendIcon: 'i-lucide-trending-up',
      toneClass: 'text-[var(--dashboard-positive)]'
    },
    {
      label: 'Monthly spend',
      value: '$4,890',
      delta: '-12%',
      note: 'vs last month',
      icon: 'i-lucide-receipt',
      trendIcon: 'i-lucide-trending-down',
      toneClass: 'text-[var(--dashboard-positive)]'
    },
    {
      label: 'Savings rate',
      value: '22%',
      delta: '+3.1%',
      note: 'goal 18%',
      icon: 'i-lucide-piggy-bank',
      trendIcon: 'i-lucide-trending-up',
      toneClass: 'text-[var(--dashboard-positive)]'
    },
    {
      label: 'Net worth',
      value: '$142,860',
      delta: '+4.6%',
      note: 'last quarter',
      icon: 'i-lucide-bar-chart-3',
      trendIcon: 'i-lucide-trending-up',
      toneClass: 'text-[var(--dashboard-positive)]'
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
  <section class="pb-16 pt-10">
    <UContainer>
      <div class="flex flex-col gap-10">
        <header class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div class="space-y-2">
            <p class="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--dashboard-accent)]">
              Dashboard
            </p>
            <h1 class="text-3xl font-semibold text-[var(--dashboard-ink)] sm:text-4xl">
              Welcome back, Joel.
            </h1>
            <p class="text-[var(--dashboard-muted)]">
              Here's how your money moved this month.
            </p>
          </div>

          <div class="flex flex-wrap gap-3">
            <UButton variant="soft">
              This month
            </UButton>
            <UButton variant="ghost">
              Last 90 days
            </UButton>
            <UButton variant="outline" icon="i-lucide-sliders-horizontal">
              Customize
            </UButton>
          </div>
        </header>

        <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <!-- <UPageCard
            v-for="(stat, index) in stats"
            :key="stat.label"
            class="dashboard-card stat-card"
            :style="{ animationDelay: `${index * 0.08}s` }"
          >
            <div class="flex items-start justify-between">
              <p class="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--dashboard-muted)]">
                {{ stat.label }}
              </p>
              <span
                class="flex size-9 items-center justify-center rounded-xl bg-[var(--dashboard-accent-soft)] text-[var(--dashboard-accent)]"
              >
                <UIcon :name="stat.icon" class="size-4" />
              </span>
            </div>
            <p class="mt-4 text-2xl font-semibold text-[var(--dashboard-ink)]">
              {{ stat.value }}
            </p>
            <div class="mt-3 flex items-center gap-2 text-xs">
              <span :class="['flex items-center gap-1 font-semibold', stat.toneClass]">
                <UIcon :name="stat.trendIcon" class="size-3" />
                {{ stat.delta }}
              </span>
              <span class="text-[var(--dashboard-muted)]">{{ stat.note }}</span>
            </div>
          </UPageCard> -->
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
          <UPageCard class="dashboard-card">
            <div class="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--dashboard-accent)]">
                  Cashflow
                </p>
                <h2 class="mt-2 text-2xl font-semibold text-[var(--dashboard-ink)]">
                  $38,920
                </h2>
                <p class="text-sm text-[var(--dashboard-muted)]">
                  Income is ahead of expenses by $6,120.
                </p>
              </div>
              <div class="flex items-center gap-3 text-xs">
                <span class="flex items-center gap-2 text-[var(--dashboard-muted)]">
                  <span class="size-2 rounded-full bg-[var(--dashboard-accent)]" />
                  Inflow
                </span>
                <span class="flex items-center gap-2 text-[var(--dashboard-muted)]">
                  <span class="size-2 rounded-full bg-[var(--dashboard-highlight)]" />
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
                <div class="relative h-32 w-4 overflow-hidden rounded-full bg-[var(--dashboard-border)]">
                  <span
                    class="absolute bottom-0 w-full rounded-full"
                    :class="{
                      'bg-[var(--dashboard-accent)]': bar.tone === 'accent',
                      'bg-[var(--dashboard-highlight)]': bar.tone === 'highlight',
                      'bg-[var(--dashboard-accent-soft)]': bar.tone === 'soft'
                    }"
                    :style="{ height: `${bar.height}%` }"
                  />
                </div>
                <span class="text-[10px] font-semibold text-[var(--dashboard-muted)]">
                  {{ bar.label }}
                </span>
              </div>
            </div>

            <div class="mt-8 grid gap-4 sm:grid-cols-3">
              <div class="rounded-2xl border border-[var(--dashboard-border)] bg-[var(--dashboard-surface-soft)] p-4">
                <p class="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--dashboard-muted)]">
                  Income
                </p>
                <p class="mt-2 text-lg font-semibold text-[var(--dashboard-ink)]">
                  $22,540
                </p>
              </div>
              <div class="rounded-2xl border border-[var(--dashboard-border)] bg-[var(--dashboard-surface-soft)] p-4">
                <p class="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--dashboard-muted)]">
                  Expenses
                </p>
                <p class="mt-2 text-lg font-semibold text-[var(--dashboard-ink)]">
                  $16,420
                </p>
              </div>
              <div class="rounded-2xl border border-[var(--dashboard-border)] bg-[var(--dashboard-surface-soft)] p-4">
                <p class="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--dashboard-muted)]">
                  Savings
                </p>
                <p class="mt-2 text-lg font-semibold text-[var(--dashboard-ink)]">
                  $6,120
                </p>
              </div>
            </div>
          </UPageCard>

          <div class="grid gap-6">
            <UPageCard id="bills" class="dashboard-card">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--dashboard-accent)]">
                    Upcoming bills
                  </p>
                  <p class="mt-2 text-lg font-semibold text-[var(--dashboard-ink)]">
                    $2,330 due
                  </p>
                </div>
                <UButton variant="ghost" size="xs">
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
                    <p class="font-semibold text-[var(--dashboard-ink)]">
                      {{ bill.name }}
                    </p>
                    <p class="text-xs text-[var(--dashboard-muted)]">
                      {{ bill.due }} - {{ bill.status }}
                    </p>
                  </div>
                  <span class="font-semibold text-[var(--dashboard-ink)]">{{ bill.amount }}</span>
                </li>
              </ul>
            </UPageCard>

            <UPageCard class="dashboard-card">
              <p class="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--dashboard-accent)]">
                Focus this week
              </p>
              <h3 class="mt-3 text-lg font-semibold text-[var(--dashboard-ink)]">
                Stay ahead of the April reset.
              </h3>
              <ul class="mt-4 space-y-3 text-sm text-[var(--dashboard-muted)]">
                <li v-for="item in focusItems" :key="item" class="flex items-start gap-2">
                  <span class="mt-1 size-2 rounded-full bg-[var(--dashboard-highlight)]" />
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
          <UPageCard class="dashboard-card">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--dashboard-accent)]">
                  Budgets
                </p>
                <h2 class="mt-2 text-2xl font-semibold text-[var(--dashboard-ink)]">
                  Guardrails in range
                </h2>
              </div>
              <UButton variant="ghost" size="xs">
                Edit budgets
              </UButton>
            </div>

            <div class="mt-6 space-y-5">
              <div
                v-for="budget in budgets"
                :key="budget.category"
                class="rounded-2xl border border-[var(--dashboard-border)] bg-[var(--dashboard-surface-soft)] p-4"
              >
                <div class="flex items-center justify-between">
                  <p class="text-sm font-semibold text-[var(--dashboard-ink)]">
                    {{ budget.category }}
                  </p>
                  <p class="text-xs font-semibold text-[var(--dashboard-muted)]">
                    ${{ budget.used }} / ${{ budget.limit }}
                  </p>
                </div>
                <div class="mt-3 h-2 rounded-full bg-[var(--dashboard-border)]">
                  <div
                    class="h-2 rounded-full bg-[var(--dashboard-accent)]"
                    :style="{ width: `${budget.percent}%` }"
                  />
                </div>
                <p class="mt-2 text-xs text-[var(--dashboard-muted)]">
                  {{ budget.percent }}% used
                </p>
              </div>
            </div>
          </UPageCard>

          <UPageCard id="goals" class="dashboard-card">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--dashboard-accent)]">
                  Goals
                </p>
                <h2 class="mt-2 text-2xl font-semibold text-[var(--dashboard-ink)]">
                  Savings progress
                </h2>
              </div>
              <UButton variant="ghost" size="xs">
                Add goal
              </UButton>
            </div>

            <div class="mt-6 space-y-5">
              <div
                v-for="goal in goals"
                :key="goal.name"
                class="rounded-2xl border border-[var(--dashboard-border)] bg-[var(--dashboard-surface-soft)] p-4"
              >
                <div class="flex items-center justify-between">
                  <p class="text-sm font-semibold text-[var(--dashboard-ink)]">
                    {{ goal.name }}
                  </p>
                  <p class="text-xs text-[var(--dashboard-muted)]">
                    {{ goal.target }}
                  </p>
                </div>
                <div class="mt-3 h-2 rounded-full bg-[var(--dashboard-border)]">
                  <div
                    class="h-2 rounded-full bg-[var(--dashboard-highlight)]"
                    :style="{ width: `${goal.progress}%` }"
                  />
                </div>
                <div class="mt-2 flex items-center justify-between text-xs text-[var(--dashboard-muted)]">
                  <span>{{ goal.progress }}% saved</span>
                  <span>{{ goal.due }}</span>
                </div>
              </div>
            </div>
          </UPageCard>
        </section>

        <section id="reports" class="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <UPageCard class="dashboard-card">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--dashboard-accent)]">
                  Recent activity
                </p>
                <h2 class="mt-2 text-2xl font-semibold text-[var(--dashboard-ink)]">
                  Latest transactions
                </h2>
              </div>
              <UButton variant="ghost" size="xs">
                Export CSV
              </UButton>
            </div>

            <ul class="mt-6 divide-y divide-[var(--dashboard-border)]">
              <li
                v-for="transaction in transactions"
                :key="transaction.name + transaction.date"
                class="flex flex-wrap items-center justify-between gap-3 py-4 text-sm"
              >
                <div>
                  <p class="font-semibold text-[var(--dashboard-ink)]">
                    {{ transaction.name }}
                  </p>
                  <p class="text-xs text-[var(--dashboard-muted)]">
                    {{ transaction.category }} - {{ transaction.date }}
                  </p>
                </div>
                <span
                  :class="[
                    'font-semibold',
                    transaction.amount.startsWith('+')
                      ? 'text-[var(--dashboard-positive)]'
                      : 'text-[var(--dashboard-ink)]'
                  ]"
                >
                  {{ transaction.amount }}
                </span>
              </li>
            </ul>
          </UPageCard>

          <UPageCard class="dashboard-card">
            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--dashboard-accent)]">
              Spending mix
            </p>
            <h2 class="mt-2 text-2xl font-semibold text-[var(--dashboard-ink)]">
              Category report
            </h2>

            <div class="mt-6 space-y-4">
              <div
                v-for="category in categories"
                :key="category.name"
                class="rounded-2xl border border-[var(--dashboard-border)] bg-[var(--dashboard-surface-soft)] p-4"
              >
                <div class="flex items-center justify-between text-sm">
                  <p class="font-semibold text-[var(--dashboard-ink)]">
                    {{ category.name }}
                  </p>
                  <p class="text-xs font-semibold text-[var(--dashboard-muted)]">
                    {{ category.amount }}
                  </p>
                </div>
                <div class="mt-3 h-2 rounded-full bg-[var(--dashboard-border)]">
                  <div
                    class="h-2 rounded-full bg-[var(--dashboard-accent)]"
                    :style="{ width: `${category.percent}%` }"
                  />
                </div>
                <p class="mt-2 text-xs text-[var(--dashboard-muted)]">
                  {{ category.percent }}% of total spend
                </p>
              </div>
            </div>

            <UButton class="mt-6 w-fit" variant="outline">
              Open full report
            </UButton>
          </UPageCard>
        </section>
      </div>
    </UContainer>
  </section>
</template>

<style scoped>
@keyframes rise-in {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dashboard-card {
  border: 1px solid var(--dashboard-border);
  background: var(--dashboard-surface);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
}

.stat-card {
  animation: rise-in 0.7s ease-out both;
}

@media (prefers-reduced-motion: reduce) {
  .stat-card {
    animation: none;
  }
}
</style>
