<script setup lang="ts">
  definePageMeta({
    layout: 'landing'
  })

  useSeoMeta({
    title: 'FiMana | Financial Management for individuals',
    description:
      'FiMana helps individuals track spending, build budgets, and grow savings with a clear daily view.',
    ogTitle: 'FiMana | Financial Management for individuals',
    ogDescription:
      'FiMana helps individuals track spending, build budgets, and grow savings with a clear daily view.',
    ogType: 'website'
  })

  const highlights = [
    'Auto-categorized spending',
    'Personal budget guardrails',
    'Bill reminders that stick'
  ]

  const brands = ['Freelancers', 'First-time investors', 'Students', 'Parents', 'Side hustlers', 'Retirees']

  const features = [
    {
      title: 'Smart categorization',
      description: 'Rules and smart suggestions keep spending organized without manual cleanup.',
      icon: 'i-lucide-tags'
    },
    {
      title: 'Daily cashflow view',
      description: 'See income, bills, and upcoming expenses in one calm dashboard.',
      icon: 'i-lucide-line-chart'
    },
    {
      title: 'Bill reminders',
      description: 'Never miss a payment with due-date alerts and calendar sync.',
      icon: 'i-lucide-bell'
    },
    {
      title: 'Goal-based budgets',
      description: 'Set goals for savings, travel, or debt payoff and track progress.',
      icon: 'i-lucide-wallet'
    },
    {
      title: 'Secure by design',
      description: 'Bank-grade encryption, privacy controls, and trusted data handling.',
      icon: 'i-lucide-shield-check'
    },
    {
      title: 'Export anytime',
      description: 'Download clean summaries for taxes, advisors, or personal review.',
      icon: 'i-lucide-file-bar-chart'
    }
  ]

  const steps = [
    {
      title: 'Connect your accounts',
      description: 'Link banks, cards, and payment apps in minutes.'
    },
    {
      title: 'Set budgets and goals',
      description: 'Build guardrails for weekly, monthly, or long-term targets.'
    },
    {
      title: 'Review the weekly digest',
      description: 'Get a simple summary of spend, savings, and upcoming bills.'
    }
  ]

  const insights = [
    { value: '5 hrs', label: 'Saved each month' },
    { value: '97%', label: 'Categorization accuracy' },
    { value: '3.2x', label: 'Faster savings progress' }
  ]

  const testimonials = [
    {
      quote:
        'FiMana replaced my messy notes and finally gave me a clear weekly budget.',
      name: 'Della P.',
      role: 'Freelancer'
    },
    {
      quote:
        'The reminders alone saved me from late fees. The dashboard is calm and easy to read.',
      name: 'Miguel R.',
      role: 'Parent'
    }
  ]

  const plans = [
    {
      name: 'Personal',
      price: '$6',
      period: 'per month',
      description: 'For individuals getting their finances organized.',
      features: ['Unlimited accounts', 'Smart categories', 'Monthly summaries'],
      cta: 'Get started',
      highlight: false
    },
    {
      name: 'Plus',
      price: '$12',
      period: 'per month',
      description: 'Advanced insights and proactive reminders.',
      features: [
        'Everything in Personal',
        'Goal tracking',
        'Bill reminders',
        'Priority support'
      ],
      cta: 'Start free trial',
      highlight: true
    }
  ]

  const faqs = [
    {
      question: 'Is my financial data secure?',
      answer: 'Yes. We use bank-grade encryption and privacy-first data handling.'
    },
    {
      question: 'Can I export for taxes or my advisor?',
      answer: 'Absolutely. Export clean CSVs or PDFs at any time.'
    },
    {
      question: 'Can I track multiple accounts?',
      answer: 'Yes. Add multiple banks, cards, and payment apps in one view.'
    },
    {
      question: 'How fast can I get started?',
      answer: 'Most people are up and running in less than 10 minutes.'
    }
  ]
</script>

<template>
  <div>
    <section class="relative overflow-hidden" aria-labelledby="hero-title">
      <div class="pointer-events-none absolute inset-0">
        <div
          class="absolute -top-24 left-0 h-64 w-64 rounded-full bg-[var(--landing-accent)] opacity-20 blur-3xl"
        />
        <div
          class="absolute top-10 right-0 h-72 w-72 rounded-full bg-[var(--landing-highlight)] opacity-20 blur-3xl"
        />
      </div>

      <UContainer class="relative py-16 sm:py-20 lg:py-24">
        <div class="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div class="space-y-6">
            <div class="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em]">
              <span class="rounded-full bg-[var(--landing-accent-soft)] px-3 py-1 text-[var(--landing-accent)]">
                Finance clarity
              </span>
              <span class="text-[var(--landing-muted)]">Built for real life</span>
            </div>

            <h1
              id="hero-title"
              class="fade-up text-4xl font-semibold leading-tight text-[var(--landing-ink)] sm:text-5xl lg:text-6xl"
            >
              Run your finances with a clear view of spending, bills, and savings.
            </h1>

            <p class="fade-up fade-up-delay-1 text-lg text-[var(--landing-muted)] sm:text-xl">
              FiMana is Financial Management built for individuals. Track spending, stay on budget,
              and grow savings with a simple daily dashboard.
            </p>

            <div class="fade-up fade-up-delay-2 flex flex-wrap gap-3">
              <UButton
                size="lg"
                to="/login"
                class="!bg-[var(--landing-accent)] !text-white hover:!bg-[var(--landing-accent-strong)]"
              >
                Start free
              </UButton>
              <UButton
                size="lg"
                variant="outline"
                to="#pricing"
                class="border-[var(--landing-border)] text-[var(--landing-ink)]"
              >
                View pricing
              </UButton>
            </div>

            <div class="fade-up fade-up-delay-3 flex flex-wrap gap-4 text-sm text-[var(--landing-muted)]">
              <div v-for="item in highlights" :key="item" class="flex items-center gap-2">
                <UIcon name="i-lucide-check" class="size-4 text-[var(--landing-accent)]" />
                <span>{{ item }}</span>
              </div>
            </div>
          </div>

          <div class="relative">
            <div
              class="fade-up rounded-3xl border border-[var(--landing-border)] bg-[var(--landing-surface)] p-6 shadow-2xl backdrop-blur"
            >
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--landing-muted)]">
                    Available cash
                  </p>
                  <p class="mt-2 text-3xl font-semibold text-[var(--landing-ink)]">
                    $128,430
                  </p>
                </div>
                <span
                  class="rounded-full bg-[var(--landing-accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--landing-accent)]"
                >
                  +12% this month
                </span>
              </div>

              <div class="mt-6 rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-surface)] p-4">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-[var(--landing-muted)]">Cashflow this month</span>
                  <span class="font-semibold text-[var(--landing-ink)]">$38,920</span>
                </div>
                <div class="mt-4 flex items-end gap-2">
                  <div class="h-10 w-3 rounded-full bg-[var(--landing-accent-soft)]" />
                  <div class="h-16 w-3 rounded-full bg-[var(--landing-accent-soft)]" />
                  <div class="h-20 w-3 rounded-full bg-[var(--landing-accent)]" />
                  <div class="h-12 w-3 rounded-full bg-[var(--landing-highlight-soft)]" />
                  <div class="h-16 w-3 rounded-full bg-[var(--landing-highlight)]" />
                  <div class="h-14 w-3 rounded-full bg-[var(--landing-accent-soft)]" />
                </div>
              </div>

              <div class="mt-6 grid gap-4 sm:grid-cols-2">
                <div class="rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-surface-soft)] p-4">
                  <p class="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--landing-muted)]">
                    Runway
                  </p>
                  <p class="mt-2 text-xl font-semibold text-[var(--landing-ink)]">
                    14.2 months
                  </p>
                  <p class="mt-1 text-xs text-[var(--landing-muted)]">
                    Based on current burn rate
                  </p>
                </div>
                <div class="rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-surface-soft)] p-4">
                  <p class="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--landing-muted)]">
                    Next invoice
                  </p>
                  <p class="mt-2 text-xl font-semibold text-[var(--landing-ink)]">
                    $7,840
                  </p>
                  <p class="mt-1 text-xs text-[var(--landing-muted)]">
                    Due in 5 days
                  </p>
                </div>
              </div>
            </div>

            <div
              class="absolute -bottom-6 left-8 hidden rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-surface)] px-4 py-3 text-xs text-[var(--landing-muted)] shadow-lg lg:block"
            >
              Weekly report delivered every Monday at 8:00 AM
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <section class="py-10">
      <UContainer class="flex flex-wrap items-center justify-between gap-6">
        <p class="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--landing-muted)]">
          Trusted by everyday people
        </p>
        <div class="flex flex-wrap gap-6 text-sm font-semibold text-[var(--landing-ink)] opacity-70">
          <span v-for="brand in brands" :key="brand">{{ brand }}</span>
        </div>
      </UContainer>
    </section>

    <section id="features" class="py-16 sm:py-20" aria-labelledby="features-title">
      <UContainer>
        <div class="max-w-2xl space-y-4">
          <p class="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--landing-accent)]">
            Why FiMana
          </p>
          <h2 id="features-title" class="text-3xl font-semibold text-[var(--landing-ink)] sm:text-4xl">
            A smarter way to stay ahead of every dollar.
          </h2>
          <p class="text-[var(--landing-muted)]">
            Replace scattered spreadsheets with a single command center for budgets, bills,
            and savings.
          </p>
        </div>

        <div class="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <div
            v-for="(feature, index) in features"
            :key="feature.title"
            class="fade-up rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-surface-soft)] p-6 shadow-sm backdrop-blur"
            :style="{ animationDelay: `${index * 0.06}s` }"
          >
            <span
              class="flex size-11 items-center justify-center rounded-xl bg-[var(--landing-accent-soft)] text-[var(--landing-accent)]"
            >
              <UIcon :name="feature.icon" class="size-5" />
            </span>
            <h3 class="mt-4 text-lg font-semibold text-[var(--landing-ink)]">
              {{ feature.title }}
            </h3>
            <p class="mt-2 text-sm text-[var(--landing-muted)]">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </UContainer>
    </section>

    <section id="workflow" class="py-16 sm:py-20" aria-labelledby="workflow-title">
      <UContainer>
        <div class="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div class="space-y-4">
            <p class="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--landing-accent)]">
              How it works
            </p>
            <h2 id="workflow-title" class="text-3xl font-semibold text-[var(--landing-ink)] sm:text-4xl">
              Built for daily money decisions, not more admin.
            </h2>
            <p class="text-[var(--landing-muted)]">
              Get the visibility you need without extra effort. Every transaction is captured,
              summarized, and ready for review.
            </p>
          </div>

          <ol class="grid gap-6">
            <li
              v-for="(step, index) in steps"
              :key="step.title"
              class="rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-surface-soft)] p-6 shadow-sm"
            >
              <div class="flex items-center gap-3">
                <span
                  class="flex size-9 items-center justify-center rounded-full bg-[var(--landing-highlight-soft)] text-sm font-semibold text-[var(--landing-highlight)]"
                >
                  {{ index + 1 }}
                </span>
                <h3 class="text-lg font-semibold text-[var(--landing-ink)]">
                  {{ step.title }}
                </h3>
              </div>
              <p class="mt-3 text-sm text-[var(--landing-muted)]">
                {{ step.description }}
              </p>
            </li>
          </ol>
        </div>
      </UContainer>
    </section>

    <section id="insights" class="py-16 sm:py-20" aria-labelledby="insights-title">
      <UContainer>
        <div class="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div class="rounded-3xl border border-[var(--landing-border)] bg-[var(--landing-surface)] p-8 shadow-lg">
            <p class="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--landing-accent)]">
              Insights
            </p>
            <h2 id="insights-title" class="mt-4 text-3xl font-semibold text-[var(--landing-ink)] sm:text-4xl">
              Weekly clarity delivered to you.
            </h2>
            <p class="mt-4 text-[var(--landing-muted)]">
              FiMana sends a weekly digest with spend, goals, and upcoming bills so you stay
              confident without extra effort.
            </p>

            <div class="mt-8 grid gap-4 sm:grid-cols-3">
              <div
                v-for="stat in insights"
                :key="stat.label"
                class="rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-surface)] p-4 text-center"
              >
                <p class="text-2xl font-semibold text-[var(--landing-ink)]">
                  {{ stat.value }}
                </p>
                <p class="mt-2 text-xs text-[var(--landing-muted)]">
                  {{ stat.label }}
                </p>
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <div
              v-for="testimonial in testimonials"
              :key="testimonial.name"
              class="rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-surface-soft)] p-6 shadow-sm"
            >
              <p class="text-sm text-[var(--landing-ink)]">
                &quot;{{ testimonial.quote }}&quot;
              </p>
              <div class="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--landing-muted)]">
                {{ testimonial.name }}
              </div>
              <div class="text-xs text-[var(--landing-muted)]">
                {{ testimonial.role }}
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <section id="pricing" class="py-16 sm:py-20" aria-labelledby="pricing-title">
      <UContainer>
        <div class="max-w-2xl space-y-4">
          <p class="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--landing-accent)]">
            Pricing
          </p>
          <h2 id="pricing-title" class="text-3xl font-semibold text-[var(--landing-ink)] sm:text-4xl">
            Plans that grow with your financial goals.
          </h2>
          <p class="text-[var(--landing-muted)]">
            Start simple and add proactive reminders when you are ready.
          </p>
        </div>

        <div class="mt-10 grid gap-6 lg:grid-cols-2">
          <div
            v-for="plan in plans"
            :key="plan.name"
            class="flex h-full flex-col rounded-3xl border p-8 shadow-sm"
            :class="plan.highlight ? 'border-[var(--landing-accent)] bg-[var(--landing-surface-strong)]' : 'border-[var(--landing-border)] bg-[var(--landing-surface-soft)]'"
          >
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-semibold text-[var(--landing-ink)]">
                {{ plan.name }}
              </h3>
              <span
                v-if="plan.highlight"
                class="rounded-full bg-[var(--landing-accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--landing-accent)]"
              >
                Most popular
              </span>
            </div>
            <p class="mt-4 text-4xl font-semibold text-[var(--landing-ink)]">
              {{ plan.price }}
              <span class="text-sm font-normal text-[var(--landing-muted)]">{{ plan.period }}</span>
            </p>
            <p class="mt-3 text-sm text-[var(--landing-muted)]">
              {{ plan.description }}
            </p>

            <ul class="mt-6 space-y-3 text-sm text-[var(--landing-ink)]">
              <li v-for="feature in plan.features" :key="feature" class="flex items-center gap-2">
                <UIcon name="i-lucide-check" class="size-4 text-[var(--landing-accent)]" />
                <span>{{ feature }}</span>
              </li>
            </ul>

            <UButton
              class="mt-8"
              size="lg"
              to="/login"
              :class="plan.highlight ? '!bg-[var(--landing-accent)] !text-white hover:!bg-[var(--landing-accent-strong)]' : ''"
            >
              {{ plan.cta }}
            </UButton>
          </div>
        </div>
      </UContainer>
    </section>

    <section id="faq" class="py-16 sm:py-20" aria-labelledby="faq-title">
      <UContainer>
        <div class="max-w-2xl space-y-4">
          <p class="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--landing-accent)]">
            FAQ
          </p>
          <h2 id="faq-title" class="text-3xl font-semibold text-[var(--landing-ink)] sm:text-4xl">
            Answers for the most common questions.
          </h2>
          <p class="text-[var(--landing-muted)]">
            Still have questions? Reach out for a quick walkthrough.
          </p>
        </div>

        <dl class="mt-10 grid gap-6 lg:grid-cols-2">
          <div
            v-for="faq in faqs"
            :key="faq.question"
            class="rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-surface-soft)] p-6 shadow-sm"
          >
            <dt class="text-base font-semibold text-[var(--landing-ink)]">
              {{ faq.question }}
            </dt>
            <dd class="mt-2 text-sm text-[var(--landing-muted)]">
              {{ faq.answer }}
            </dd>
          </div>
        </dl>
      </UContainer>
    </section>

    <section class="pb-20" aria-labelledby="cta-title">
      <UContainer>
        <div class="relative overflow-hidden rounded-3xl border border-[var(--landing-border)] bg-[var(--landing-surface)] p-10">
          <div class="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[var(--landing-accent)] opacity-20 blur-3xl" />
          <div class="pointer-events-none absolute -bottom-16 left-0 h-48 w-48 rounded-full bg-[var(--landing-highlight)] opacity-20 blur-3xl" />

          <div class="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div class="max-w-xl space-y-3">
              <p class="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--landing-accent)]">
                Get started
              </p>
              <h2 id="cta-title" class="text-3xl font-semibold text-[var(--landing-ink)] sm:text-4xl">
                Ready to make your money feel simpler?
              </h2>
              <p class="text-[var(--landing-muted)]">
                Start a free trial today and see your dashboard in less than 10 minutes.
              </p>
            </div>

            <div class="flex flex-wrap gap-3">
              <UButton
                size="lg"
                to="/login"
                class="!bg-[var(--landing-accent)] !text-white hover:!bg-[var(--landing-accent-strong)]"
              >
                Start free trial
              </UButton>
              <UButton
                size="lg"
                variant="outline"
                to="/login"
                class="border-[var(--landing-border)]"
              >
                Book a demo
              </UButton>
            </div>
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>

<style scoped>
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-up {
  animation: fade-up 0.8s ease-out both;
}

.fade-up-delay-1 {
  animation-delay: 0.1s;
}

.fade-up-delay-2 {
  animation-delay: 0.18s;
}

.fade-up-delay-3 {
  animation-delay: 0.26s;
}

@media (prefers-reduced-motion: reduce) {
  .fade-up,
  .fade-up-delay-1,
  .fade-up-delay-2,
  .fade-up-delay-3 {
    animation: none;
  }
}
</style>
