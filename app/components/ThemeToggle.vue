<script setup lang="ts">
const { isDark, toggleMode } = useThemeMode()

const label = computed(() => (isDark.value ? 'Switch to light mode' : 'Switch to dark mode'))
</script>

<template>
  <UButton
    variant="ghost"
    color="neutral"
    size="sm"
    class="rounded-full"
    :aria-label="label"
    @click="toggleMode"
  >
    <UIcon :name="isDark ? 'i-lucide-moon' : 'i-lucide-sun'" class="size-4" />
    <span class="sr-only">{{ label }}</span>
  </UButton>
</template>
