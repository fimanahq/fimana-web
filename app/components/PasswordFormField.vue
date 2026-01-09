<script setup lang="ts">
  interface Props {
    label?: string
    name?: string
  }

  withDefaults(defineProps<Props>(), {
    label: 'Password',
    name: 'password'
  })

  const password = defineModel<string>({ required: true })

  const show = ref(false)
</script>

<template>
  <UFormField :label="label" :name="name">
    <UInput
      v-model="password"
      class="w-full"
      :type="show ? 'text' : 'password'"
      :ui="{ trailing: 'pe-1' }"
      variant="subtle"
    >
      <template #trailing>
        <UButton
          color="neutral"
          variant="link"
          size="sm"
          :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
          :aria-label="show ? 'Hide password' : 'Show password'"
          :aria-pressed="show"
          aria-controls="password"
          @click="show = !show"
        />
      </template>
    </UInput>
  </UFormField>
</template>

<style scoped>

</style>
