<script setup lang="ts">
  interface DashboardStatCardProps {
    title: string
    value: number | string
    icon?: string
    note: string
  }

  defineProps<DashboardStatCardProps>()
</script>

<template>
  <UPageCard>
    <div class="flex items-start justify-between">
      <p class="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--dashboard-muted)]">
        {{ title }}
      </p>
      <span
        v-if="icon"
        class="flex size-9 items-center justify-center rounded-xl bg-primary/20 text-primary"
      >
        <UIcon :name="icon" class="size-4" />
      </span>
    </div>
    <p class="mt-4 text-2xl font-semibold text-[var(--dashboard-ink)]">
      {{ value }}
    </p>
    <div class="mt-3 flex items-center gap-2 text-xs">
      <slot name="delta" />
      <span class="text-[var(--dashboard-muted)]">{{ note }}</span>
    </div>
  </UPageCard>
</template>
