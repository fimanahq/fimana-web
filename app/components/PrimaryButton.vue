<script setup lang="ts">
  const colorMode = useColorMode()
</script>

<template>
  <UButton :variant="colorMode.value === 'dark' ? 'solid' : 'solid'">
    <slot />
  </UButton>
</template>

<style scoped>

</style>
