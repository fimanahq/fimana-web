<script setup lang="ts">
  import type { Goal } from '~~/types/goal'

  definePageMeta({
    layout: 'dashboard'
  })

  useSeoMeta({
    title: 'FiMana | Goals',
    description: 'Track savings targets and progress.'
  })

  const goals: Goal[] = [
    {
      _id: 'goal_01',
      userId: 'usr_01',
      name: 'Emergency fund',
      targetAmount: 120000,
      currentAmount: 86000,
      deadline: new Date('2025-12-01'),
      status: 'active'
    },
    {
      _id: 'goal_02',
      userId: 'usr_01',
      name: 'Portugal trip',
      targetAmount: 45000,
      currentAmount: 18400,
      deadline: new Date('2025-08-01'),
      status: 'active'
    },
    {
      _id: 'goal_03',
      userId: 'usr_01',
      name: 'New laptop',
      targetAmount: 24000,
      currentAmount: 24000,
      deadline: new Date('2024-10-15'),
      status: 'completed'
    }
  ]

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      maximumFractionDigits: 0
    }).format(value)

  const formatDate = (value: Date) =>
    value.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  const progressPercent = (goal: Goal) =>
    Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100))
</script>

<template>
  <UDashboardPanel>
    <template #body>
      <div class="flex flex-col gap-8">
        <DashboardHeader
          page="Goals"
          title="Savings milestones"
          description="Keep long-term goals visible and funded."
        >
          <PrimaryButton icon="i-lucide-plus">
            New goal
          </PrimaryButton>
          <UButton variant="outline" icon="i-lucide-calendar">
            Timeline
          </UButton>
        </DashboardHeader>

        <div class="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <UPageCard>
            <div class="flex items-center justify-between gap-3">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  Active goals
                </p>
                <p class="mt-2 text-sm text-muted">
                  Funds reserved for milestones.
                </p>
              </div>
              <UButton variant="ghost" size="md">
                View all
              </UButton>
            </div>

            <div class="mt-6 space-y-4">
              <UPageCard v-for="goal in goals" :key="goal._id" variant="soft">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <p class="text-sm font-semibold">
                      {{ goal.name }}
                    </p>
                    <p class="text-xs text-muted">
                      Target {{ formatCurrency(goal.targetAmount) }} - due {{ formatDate(goal.deadline) }}
                    </p>
                  </div>
                  <UBadge :color="goal.status === 'completed' ? 'success' : 'neutral'">
                    {{ goal.status }}
                  </UBadge>
                </div>

                <div class="mt-4 h-2 rounded-full bg-elevated">
                  <div
                    class="h-2 rounded-full bg-secondary"
                    :style="{ width: `${progressPercent(goal)}%` }"
                  />
                </div>
                <div class="mt-2 flex items-center justify-between text-xs text-muted">
                  <span>{{ formatCurrency(goal.currentAmount) }} saved</span>
                  <span>{{ progressPercent(goal) }}%</span>
                </div>
              </UPageCard>
            </div>
          </UPageCard>

          <UPageCard>
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Next action
              </p>
              <h2 class="mt-3 text-xl font-semibold">
                Move funds into goals
              </h2>
              <p class="mt-2 text-sm text-muted">
                Keep progress steady by transferring a fixed amount each week.
              </p>

              <div class="mt-6 space-y-4 text-sm">
                <div class="flex items-center justify-between">
                  <span class="text-muted">Suggested transfer</span>
                  <span class="font-semibold">
                    {{ formatCurrency(3500) }}
                  </span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-muted">Goal to prioritize</span>
                  <span class="font-semibold">
                    Emergency fund
                  </span>
                </div>
              </div>

              <UButton class="mt-6" variant="soft">
                Schedule transfer
              </UButton>
            </div>
          </UPageCard>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
