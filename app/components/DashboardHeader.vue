<script setup lang="ts">
  interface Props {
    page: string
    title: string
    description: string
    loadingTitle?: boolean
  }

  defineProps<Props>()
</script>

<template>
  <header class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
    <div class="space-y-2">
      <p class="text-xs font-semibold uppercase tracking-[0.4em] text-primary">
        {{ page }}
      </p>

      <USkeleton v-if="loadingTitle" class="h-8 w-100" />
      <h1 v-else class="text-3xl font-semibold sm:text-4xl">
        {{ title }}
      </h1>

      <p class="text-muted">
        {{ description }}
      </p>
    </div>

    <div class="flex flex-wrap gap-3">
      <slot />
    </div>
  </header>
</template>
