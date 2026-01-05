<script setup lang="ts">

</script>

<template>
  <div>
    <UHeader title="FiMana">
      <template #title>
        <div class="flex gap-1 text-primary">
          <UIcon name="i-solar-dollar-linear" class="size-6" />
          FiMana
        </div>
      </template>
      <template #right>
        <ThemeToggle />
      </template>
    </UHeader>

    <UMain>
      <slot />
    </UMain>

    <UFooter />
  </div>
</template>

<style scoped>

</style>
