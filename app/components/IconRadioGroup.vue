<script setup lang="ts" generic="T extends string | number">
  import type { AppColor } from '~~/types'

  interface RadioOption {
    label: string
    value: T
    icon: string
    color: AppColor
  }

  interface ColorClasses {
    text: string
    bgHover: string
    bgActive: string
    border: string
  }

  interface Props {
    modelValue: T
    items: readonly RadioOption[]
  }

  interface Emits {
    (e: 'update:modelValue', value: T): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  // Predefined color map to ensure Tailwind generates these classes
  const colorClassMap: Record<AppColor, ColorClasses> = {
    success: {
      text: 'text-success',
      bgHover: 'hover:bg-success/5',
      bgActive: 'bg-success/10',
      border: 'has-[[data-state=checked]]:border-success'
    },
    primary: {
      text: 'text-primary',
      bgHover: 'hover:bg-primary/5',
      bgActive: 'bg-primary/10',
      border: 'has-[[data-state=checked]]:border-primary'
    },
    warning: {
      text: 'text-warning',
      bgHover: 'hover:bg-warning/5',
      bgActive: 'bg-warning/10',
      border: 'has-[[data-state=checked]]:border-warning'
    },
    error: {
      text: 'text-error',
      bgHover: 'hover:bg-error/5',
      bgActive: 'bg-error/10',
      border: 'has-[[data-state=checked]]:border-error'
    },
    neutral: {
      text: 'text-neutral',
      bgHover: 'hover:bg-neutral/5',
      bgActive: 'bg-neutral/10',
      border: 'has-[[data-state=checked]]:border-neutral'
    },
    lime: {
      text: 'text-lime-500',
      bgHover: 'hover:bg-lime-500/5',
      bgActive: 'bg-lime-500/10',
      border: 'has-[[data-state=checked]]:border-lime-500'
    },
    sky: {
      text: 'text-sky-500',
      bgHover: 'hover:bg-sky-500/5',
      bgActive: 'bg-sky-500/10',
      border: 'has-[[data-state=checked]]:border-sky-500'
    },
    rose: {
      text: 'text-rose-500',
      bgHover: 'hover:bg-rose-500/5',
      bgActive: 'bg-rose-500/10',
      border: 'has-[[data-state=checked]]:border-rose-500'
    },
    amber: {
      text: 'text-amber-500',
      bgHover: 'hover:bg-amber-500/5',
      bgActive: 'bg-amber-500/10',
      border: 'has-[[data-state=checked]]:border-amber-500'
    },
    emerald: {
      text: 'text-emerald-500',
      bgHover: 'hover:bg-emerald-500/5',
      bgActive: 'bg-emerald-500/10',
      border: 'has-[[data-state=checked]]:border-emerald-500'
    },
    violet: {
      text: 'text-violet-500',
      bgHover: 'hover:bg-violet-500/5',
      bgActive: 'bg-violet-500/10',
      border: 'has-[[data-state=checked]]:border-violet-500'
    },
    cyan: {
      text: 'text-cyan-500',
      bgHover: 'hover:bg-cyan-500/5',
      bgActive: 'bg-cyan-500/10',
      border: 'has-[[data-state=checked]]:border-cyan-500'
    },
    pink: {
      text: 'text-pink-500',
      bgHover: 'hover:bg-pink-500/5',
      bgActive: 'bg-pink-500/10',
      border: 'has-[[data-state=checked]]:border-pink-500'
    },
    indigo: {
      text: 'text-indigo-500',
      bgHover: 'hover:bg-indigo-500/5',
      bgActive: 'bg-indigo-500/10',
      border: 'has-[[data-state=checked]]:border-indigo-500'
    },
    teal: {
      text: 'text-teal-500',
      bgHover: 'hover:bg-teal-500/5',
      bgActive: 'bg-teal-500/10',
      border: 'has-[[data-state=checked]]:border-teal-500'
    }
  }

  const processedItems = computed(() => {
    return props.items.map((item) => {
      const colorClasses = colorClassMap[item.color]
      return {
        ...item,
        ui: {
          item: `border-2 ${colorClasses.border}`
        }
      }
    })
  })

  function getIconColor(color: AppColor, isSelected: boolean): string {
    if (!isSelected) {
      return 'text-muted'
    }

    return colorClassMap[color].text
  }

  function getOption(value: T): RadioOption | undefined {
    return props.items.find(option => option.value === value)
  }

  function getItemClasses(value: T): string {
    const isSelected = props.modelValue === value
    const option = getOption(value)

    if (!option) {
      return 'hover:bg-primary/5 hover:scale-[1.02]'
    }

    const colorClasses = colorClassMap[option.color]
    const hoverClass = `${colorClasses.bgHover} hover:scale-[1.02]`
    const activeClass = `${colorClasses.bgActive} scale-[1.02]`

    return isSelected ? activeClass : hoverClass
  }

  const internalValue = computed({
    get: () => props.modelValue,
    set: (value: T) => emit('update:modelValue', value)
  })
</script>

<template>
  <URadioGroup
    v-model="internalValue"
    :items="processedItems"
    variant="card"
    orientation="horizontal"
    indicator="hidden"
    :ui="{
      fieldset: 'grid grid-cols-2 sm:grid-cols-4 gap-4',
      item: 'opacity-60 hover:opacity-100 has-[[data-state=checked]]:opacity-100 transition-all duration-300 p-0 cursor-pointer'
    }"
  >
    <template #label="{ item }">
      <div
        class="flex flex-col gap-1 items-center min-w-[100px] py-4 transition-all duration-300"
        :class="item.value ? getItemClasses(item.value as T) : ''"
      >
        <div class="relative">
          <UIcon
            :name="item.icon"
            class="size-10 transition-all duration-300"
            :class="item.color && item.value ? getIconColor(item.color as AppColor, modelValue === item.value) : 'text-muted'"
          />
        </div>
        <span class="text-sm font-semibold">{{ item.label }}</span>
      </div>
    </template>
  </URadioGroup>
</template>
