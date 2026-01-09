<script setup lang="ts">
  defineOptions({
    inheritAttrs: false
  })

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

  function checkStrength(str: string) {
    const requirements = [
      { regex: /.{8,}/, text: 'At least 8 characters', suggestion: 'more characters' },
      { regex: /\d/, text: 'At least 1 number', suggestion: 'a number' },
      { regex: /[a-z]/, text: 'At least 1 lowercase letter', suggestion: 'a lowercase letter' },
      { regex: /[A-Z]/, text: 'At least 1 uppercase letter', suggestion: 'an uppercase letter' }
    ]

    return requirements.map(req => ({ met: req.regex.test(str), text: req.text, suggestion: req.suggestion }))
  }

  const strength = computed(() => checkStrength(password.value))
  const score = computed(() => strength.value.filter(req => req.met).length)

  const severity = computed(() => {
    if (score.value === 0) return ''
    if (score.value === 1) return 'Very weak'
    if (score.value === 2) return 'Weak'
    if (score.value === 3) return 'Moderate'
    return 'Strong'
  })

  const color = computed(() => {
    if (score.value === 0) return 'neutral'
    if (score.value <= 1) return 'error'
    if (score.value <= 2) return 'warning'
    if (score.value === 3) return 'warning'
    return 'success'
  })

  const text = computed(() => {
    if (score.value === 0) return severity.value
    if (score.value < 4) return `${severity.value} password`
    return `${severity.value} password`
  })
</script>

<template>
  <div class="space-y-2">
    <UFormField v-bind="$attrs" :label="label" :name="name">
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

    <template v-if="text">
      <div class="flex gap-1">
        <UProgress
          v-for="progress of [1, 2, 3, 4]"
          :key="progress"
          :model-value="score < progress ? 0 : 1"
          :max="1"
          :color="score < progress ? undefined : color"
          size="sm"
        />
      </div>

      <div class="flex gap-1 items-center justify-end text-muted">
        <p id="password-strength" class="text-xs font-medium">
          {{ text }}
        </p>
        <UTooltip :delay-duration="0" :content="{ align: 'end' }" :ui="{ content: 'h-fit' }">
          <UIcon name="i-lucide-info" class="size-4" aria-describedby="password-strength" />

          <template #content>
            <ul class="space-y-1" aria-label="Password requirements">
              <li
                v-for="(req, index) in strength"
                :key="index"
                class="flex items-center gap-1"
                :class="req.met ? 'text-success' : 'text-muted'"
              >
                <UIcon :name="req.met ? 'i-lucide-circle-check' : 'i-lucide-circle'" class="size-4 shrink-0" />

                <span class="text-xs font-light">
                  {{ req.text }}
                  <span class="sr-only">
                    {{ req.met ? ' - Requirement met' : ' - Requirement not met' }}
                  </span>
                </span>
              </li>
            </ul>
          </template>
        </UTooltip>
      </div>
    </template>
  </div>
</template>

<style scoped>

</style>
