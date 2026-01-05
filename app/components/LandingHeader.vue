<script setup lang="ts">
const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#workflow' },
  { label: 'Insights', href: '#insights' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' }
]
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-[var(--landing-border)] bg-[var(--landing-surface-soft)] backdrop-blur">
    <UContainer class="flex items-center justify-between gap-4 py-4">
      <NuxtLink to="/" class="flex items-center gap-3 text-base font-semibold text-[var(--landing-ink)]">
        <span class="flex size-9 items-center justify-center rounded-xl bg-[var(--landing-accent)] text-white shadow-sm">
          <UIcon name="i-solar-dollar-linear" class="size-5" />
        </span>
        FiMana
      </NuxtLink>

      <nav class="hidden items-center gap-6 text-sm font-medium text-[var(--landing-muted)] lg:flex" aria-label="Primary">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="transition hover:text-[var(--landing-ink)]"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="flex items-center gap-3">
        <ThemeToggle />
        <UButton
          variant="ghost"
          color="neutral"
          size="sm"
          to="/login"
        >
          Sign in
        </UButton>
        <UButton
          size="sm"
          to="/login"
          class="!bg-[var(--landing-accent)] !text-white hover:!bg-[var(--landing-accent-strong)]"
        >
          Start free
        </UButton>
      </div>
    </UContainer>
  </header>
</template>
