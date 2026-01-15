<script setup lang="ts">
  defineProps<{
    collapsed?: boolean
  }>()
</script>

<template>
  <div class="flex items-center gap-3 text-base font-semibold">
    <span class="flex size-9 items-center justify-center rounded-lg bg-primary/25 text-primary border border-primary/25 shadow-sm">
      <UIcon name="i-lucide-wallet-minimal" class="size-5" />
    </span>
    <span v-if="!collapsed">FiMana</span>
  </div>
</template>
