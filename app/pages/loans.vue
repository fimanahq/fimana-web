<script setup lang="ts">
  import type { Loan } from '~/types/loan'
  import type { LoanPayment } from '~/types/loanPayment'

  definePageMeta({
    layout: 'dashboard'
  })

  useSeoMeta({
    title: 'FiMana | Loans',
    description: 'Manage loans and upcoming payments.'
  })

  const loans: Loan[] = [
    {
      _id: 'loan_01',
      userId: 'usr_01',
      lender: 'BPI Personal Loan',
      principal: 180000,
      interestRate: 6.5,
      paymentType: '2-cutoff',
      startDate: new Date('2024-06-15'),
      status: 'active'
    },
    {
      _id: 'loan_02',
      userId: 'usr_01',
      lender: 'Car financing',
      principal: 420000,
      interestRate: 5.1,
      paymentType: '1-cutoff',
      startDate: new Date('2023-01-10'),
      status: 'active'
    },
    {
      _id: 'loan_03',
      userId: 'usr_01',
      lender: 'Family loan',
      principal: 60000,
      interestRate: 0,
      paymentType: '1-cutoff',
      startDate: new Date('2022-05-20'),
      status: 'paid'
    }
  ]

  const loanPayments: LoanPayment[] = [
    {
      _id: 'pay_01',
      loanId: 'loan_01',
      amount: 8200,
      interest: 950,
      principal: 7250,
      dueDate: new Date('2025-04-05'),
      status: 'pending'
    },
    {
      _id: 'pay_02',
      loanId: 'loan_01',
      amount: 8200,
      interest: 910,
      principal: 7290,
      dueDate: new Date('2025-04-20'),
      status: 'pending'
    },
    {
      _id: 'pay_03',
      loanId: 'loan_02',
      amount: 12500,
      interest: 1100,
      principal: 11400,
      dueDate: new Date('2025-04-12'),
      status: 'pending'
    },
    {
      _id: 'pay_04',
      loanId: 'loan_02',
      amount: 12500,
      interest: 1080,
      principal: 11420,
      dueDate: new Date('2025-03-12'),
      paidDate: new Date('2025-03-10'),
      status: 'paid'
    }
  ]

  const loanMap = computed(() =>
    loans.reduce<Record<string, Loan>>((map, loan) => {
      map[loan._id] = loan
      return map
    }, {})
  )

  const upcomingPayments = computed(() =>
    loanPayments
      .filter(payment => payment.status === 'pending')
      .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
  )

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      maximumFractionDigits: 0
    }).format(value)

  const formatDate = (value: Date) =>
    value.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  const formatRate = (value: number) => `${value.toFixed(1)}%`
</script>

<template>
  <UDashboardPanel>
    <template #body>
      <div class="flex flex-col gap-8">
        <DashboardHeader
          page="Loans"
          title="Outstanding obligations"
          description="Stay on top of payments and interest schedules."
        >
          <UButton variant="soft" icon="i-lucide-plus">
            Add loan
          </UButton>
          <UButton variant="outline" icon="i-lucide-file-text">
            Statements
          </UButton>
        </DashboardHeader>

        <div class="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <UPageCard>
            <div class="flex items-center justify-between gap-3">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  Active loans
                </p>
                <p class="mt-2 text-sm text-muted">
                  Track principal and interest details.
                </p>
              </div>
              <UButton variant="ghost" size="xs">
                View schedule
              </UButton>
            </div>

            <div class="mt-6 space-y-4">
              <UPageCard v-for="loan in loans" :key="loan._id" variant="soft">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <p class="text-sm font-semibold">
                      {{ loan.lender }}
                    </p>
                    <p class="text-xs text-muted">
                      Started {{ formatDate(loan.startDate) }} - {{ loan.paymentType }}
                    </p>
                  </div>
                  <UBadge :color="loan.status === 'active' ? 'warning' : 'success'">
                    {{ loan.status }}
                  </UBadge>
                </div>
                <div class="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                  <div>
                    <p class="text-xs text-muted">
                      Principal
                    </p>
                    <p class="font-semibold">
                      {{ formatCurrency(loan.principal) }}
                    </p>
                  </div>
                  <div>
                    <p class="text-xs text-muted">
                      Interest rate
                    </p>
                    <p class="font-semibold">
                      {{ formatRate(loan.interestRate) }}
                    </p>
                  </div>
                  <div>
                    <p class="text-xs text-muted">
                      Payment type
                    </p>
                    <p class="font-semibold">
                      {{ loan.paymentType === '1-cutoff' ? 'Monthly' : 'Twice monthly' }}
                    </p>
                  </div>
                </div>
              </UPageCard>
            </div>
          </UPageCard>

          <UPageCard>
            <div>
              <div class="flex items-center justify-between gap-3">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                    Upcoming payments
                  </p>
                  <p class="mt-2 text-sm text-muted">
                    Next cutoffs by due date.
                  </p>
                </div>
                <UButton variant="ghost" size="xs">
                  Pay now
                </UButton>
              </div>

              <div class="mt-6 space-y-4 text-sm">
                <UPageCard
                  v-for="payment in upcomingPayments"
                  :key="payment._id"
                  variant="soft"
                >
                  <div class="flex items-center justify-between gap-3">
                    <div>
                      <p class="font-semibold">
                        {{ loanMap[payment.loanId]?.lender || 'Loan' }}
                      </p>
                      <p class="text-xs text-muted">
                        Due {{ formatDate(payment.dueDate) }}
                      </p>
                    </div>
                    <span class="font-semibold">
                      {{ formatCurrency(payment.amount) }}
                    </span>
                  </div>
                  <div class="mt-3 flex items-center justify-between text-xs text-muted">
                    <span>Principal {{ formatCurrency(payment.principal) }}</span>
                    <span>Interest {{ formatCurrency(payment.interest) }}</span>
                  </div>
                </UPageCard>
              </div>
            </div>
          </UPageCard>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
