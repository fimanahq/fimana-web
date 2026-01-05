<script setup lang="ts">
const productLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Insights', href: '#insights' },
  { label: 'Pricing', href: '#pricing' }
]

const companyLinks = [
  { label: 'About', href: '#' },
  { label: 'Careers', href: '#' },
  { label: 'Contact', href: '#' },
  { label: 'Security', href: '#' }
]

const resourceLinks = [
  { label: 'Help center', href: '#' },
  { label: 'Guides', href: '#' },
  { label: 'API status', href: '#' },
  { label: 'Release notes', href: '#' }
]
</script>

<template>
  <footer class="border-t border-[var(--landing-border)] bg-[var(--landing-surface-soft)]">
    <UContainer class="py-12">
      <div class="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
        <div class="space-y-4">
          <div class="flex items-center gap-3 text-lg font-semibold text-[var(--landing-ink)]">
            <span class="flex size-9 items-center justify-center rounded-xl bg-[var(--landing-accent)] text-white">
              <UIcon name="i-solar-dollar-linear" class="size-5" />
            </span>
            FiMana
          </div>
          <p class="text-sm text-[var(--landing-muted)]">
            Financial Management for individuals. Track spending, set goals, and stay on top of
            every bill with confidence.
          </p>
        </div>

        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--landing-muted)]">
            Product
          </p>
          <ul class="mt-4 space-y-3 text-sm text-[var(--landing-ink)]">
            <li v-for="link in productLinks" :key="link.label">
              <a :href="link.href" class="transition hover:text-[var(--landing-accent)]">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--landing-muted)]">
            Company
          </p>
          <ul class="mt-4 space-y-3 text-sm text-[var(--landing-ink)]">
            <li v-for="link in companyLinks" :key="link.label">
              <a :href="link.href" class="transition hover:text-[var(--landing-accent)]">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--landing-muted)]">
            Resources
          </p>
          <ul class="mt-4 space-y-3 text-sm text-[var(--landing-ink)]">
            <li v-for="link in resourceLinks" :key="link.label">
              <a :href="link.href" class="transition hover:text-[var(--landing-accent)]">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mt-10 flex flex-col gap-4 border-t border-[var(--landing-border)] pt-6 text-xs text-[var(--landing-muted)] sm:flex-row sm:items-center sm:justify-between"
      >
        <span>Copyright 2025 FiMana. All rights reserved.</span>
        <div class="flex flex-wrap gap-4">
          <a href="#" class="transition hover:text-[var(--landing-accent)]">Privacy</a>
          <a href="#" class="transition hover:text-[var(--landing-accent)]">Terms</a>
          <a href="#" class="transition hover:text-[var(--landing-accent)]">Status</a>
        </div>
      </div>
    </UContainer>
  </footer>
</template>
