<script setup lang="ts">
  import * as v from 'valibot'
  import { icons as solarIcons } from '@iconify-json/solar'
  import { storeToRefs } from 'pinia'
  import type { FormSubmitEvent } from '@nuxt/ui'
  import type { Category } from '~~/types/category'

  definePageMeta({
    layout: 'dashboard'
  })

  useSeoMeta({
    title: 'FiMana | Categories',
    description: 'Organize spending with parent and child categories.'
  })

  const categoriesStore = useCategoriesStore()
  const { categories, isSaving, error } = storeToRefs(categoriesStore)

  const formatIconLabel = (value: string) =>
    value
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

  const iconStyleValues = [
    'line-duotone',
    'bold-duotone',
    'linear',
    'bold',
    'outline',
    'broken'
  ] as const
  const iconStyleOptions = iconStyleValues.map(style => ({
    label: formatIconLabel(style),
    value: style
  }))

  const statusValues = ['active', 'inactive'] as const
  const statusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' }
  ]

  const buildSolarIcon = (icon: string, style: string) => `i-solar-${icon}-${style}`

  const iconNames = Object.keys(solarIcons.icons)

  const schema = v.object({
    name: v.pipe(v.string(), v.trim(), v.minLength(1, 'Please enter category name')),
    parentId: v.optional(v.string()),
    icon: v.pipe(v.string(), v.trim(), v.minLength(1, 'Select an icon')),
    iconStyle: v.picklist(iconStyleValues, 'Select an icon style'),
    status: v.picklist(statusValues, 'Select a status')
  })

  type Schema = v.InferOutput<typeof schema>

  const formState = reactive({
    name: '',
    parentId: '',
    icon: '',
    iconStyle: 'line-duotone',
    status: 'active'
  })

  const isAddModalOpen = ref(false)
  const toast = useToast()

  const iconBaseOptions = computed(() => {
    const suffix = `-${formState.iconStyle}`
    const bases = iconNames
      .filter(name => name.endsWith(suffix))
      .map(name => name.slice(0, -suffix.length))
    return Array.from(new Set(bases)).sort((a, b) => a.localeCompare(b))
  })

  const iconOptions = computed(() =>
    iconBaseOptions.value.map(value => ({
      label: formatIconLabel(value),
      value,
      icon: buildSolarIcon(value, formState.iconStyle)
    }))
  )

  const selectedIconName = computed(() =>
    formState.icon ? buildSolarIcon(formState.icon, formState.iconStyle) : undefined
  )

  const parentOptions = computed(() => {
    const parents = categories.value.filter(category => !category.parentId)
    return [
      { label: 'No parent', value: '' },
      ...parents.map(category => ({
        label: category.name,
        value: category._id,
        icon: buildSolarIcon(category.icon, category.iconStyle || iconStyleValues[0])
      }))
    ]
  })

  const sortByName = (items: Category[]) =>
    [...items].sort((a, b) => a.name.localeCompare(b.name))

  const parentCategories = computed(() =>
    sortByName(categories.value.filter(category => !category.parentId))
  )

  const childCategories = computed(() =>
    sortByName(categories.value.filter(category => category.parentId))
  )

  const parentMap = computed(() =>
    parentCategories.value.reduce<Record<string, Category>>((map, category) => {
      map[category._id] = category
      return map
    }, {})
  )

  const categoryGroups = computed(() =>
    parentCategories.value.map(parent => ({
      parent,
      children: childCategories.value.filter(child => child.parentId === parent._id)
    }))
  )

  const orphanChildren = computed(() =>
    childCategories.value.filter(child => child.parentId && !parentMap.value[child.parentId])
  )

  const categoryIcon = (category?: Category | null) => {
    if (!category) {
      return 'i-lucide-circle'
    }
    return buildSolarIcon(category.icon, category.iconStyle || iconStyleValues[0])
  }

  const iconTone = (category: Category) =>
    category.isActive ? 'bg-primary/10 text-primary' : 'bg-elevated text-muted'

  onMounted(() => {
    if (!categories.value.length) {
      categoriesStore.fetchCategories()
    }
  })

  const resetForm = () => {
    formState.name = ''
    formState.parentId = ''
    formState.iconStyle = 'line-duotone'
    formState.status = 'active'
    formState.icon = iconBaseOptions.value[0] || ''
  }

  const openAddModal = () => {
    isAddModalOpen.value = true
  }

  const closeAddModal = () => {
    isAddModalOpen.value = false
  }

  watch(iconBaseOptions, (options) => {
    if (!options.length) {
      formState.icon = ''
      return
    }

    if (!options.includes(formState.icon)) {
      formState.icon = options[0]
    }
  }, { immediate: true })

  watch(isAddModalOpen, (isOpen) => {
    if (!isOpen) {
      resetForm()
    }
  })

  const addCategory = async (event: FormSubmitEvent<Schema>) => {
    if (isSaving.value) {
      return
    }

    const name = event.data.name.trim()
    if (!name) {
      toast.add({ title: 'Category name required', color: 'error' })
      return
    }

    const parentId = event.data.parentId?.trim() || null

    const created = await categoriesStore.createCategory({
      name,
      parentId,
      icon: event.data.icon,
      iconStyle: event.data.iconStyle,
      isActive: event.data.status === 'active',
      isSystem: false
    })

    if (!created) {
      toast.add({
        title: 'Unable to add category',
        description: error.value || 'Please try again.',
        color: 'error'
      })
      return
    }

    toast.add({
      title: 'Category added',
      description: `${name} is ready to use.`,
      color: 'success'
    })

    closeAddModal()
  }
</script>

<template>
  <UDashboardPanel>
    <template #body>
      <div class="flex flex-col gap-8">
        <DashboardHeader
          page="Categories"
          title="Parent and child categories"
          description="Group spending into parent categories with focused subcategories."
        >
          <PrimaryButton icon="i-lucide-plus" @click="openAddModal">
            New category
          </PrimaryButton>
          <UButton variant="outline" icon="i-lucide-sparkles">
            Suggest
          </UButton>
        </DashboardHeader>

        <UModal v-model:open="isAddModalOpen" title="New category">
          <template #body>
            <p class="text-sm text-muted">
              Add a category to keep your transactions organized.
            </p>

            <UForm
              :schema="schema"
              :state="formState"
              class="mt-6 space-y-4"
              @submit="addCategory"
            >
              <UFormField label="Category name" name="name">
                <UInput v-model="formState.name" class="w-full" variant="subtle" />
              </UFormField>

              <div class="grid gap-4 md:grid-cols-2">
                <UFormField label="Parent category" name="parentId">
                  <USelect
                    v-model="formState.parentId"
                    :items="parentOptions"
                    value-key="value"
                    label-key="label"
                    class="w-full"
                    variant="subtle"
                  />
                </UFormField>

                <UFormField label="Status" name="status">
                  <USelect
                    v-model="formState.status"
                    :items="statusOptions"
                    class="w-full"
                    variant="subtle"
                  />
                </UFormField>
              </div>

              <div class="grid gap-4 md:grid-cols-[1fr_2fr]">
                <UFormField label="Icon style" name="iconStyle">
                  <USelect
                    v-model="formState.iconStyle"
                    :items="iconStyleOptions"
                    class="w-full"
                    variant="subtle"
                  />
                </UFormField>

                <UFormField label="Icon" name="icon">
                  <UInputMenu
                    v-model="formState.icon"
                    :items="iconOptions"
                    value-key="value"
                    label-key="label"
                    class="w-full"
                    variant="subtle"
                    :virtualize="true"
                    :leading-icon="selectedIconName"
                    placeholder="Search solar icons"
                  />
                </UFormField>
              </div>

              <div class="flex flex-wrap items-center gap-3">
                <UButton
                  type="submit"
                  icon="i-lucide-plus"
                  :loading="isSaving"
                  :disabled="isSaving"
                >
                  Add category
                </UButton>
                <UButton variant="ghost" @click="closeAddModal">
                  Cancel
                </UButton>
              </div>
            </UForm>
          </template>
        </UModal>

        <UPageCard>
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Category library
            </p>
            <p class="mt-2 text-sm text-muted">
              Parent categories with their subcategories.
            </p>
          </div>

          <div class="mt-6 space-y-4">
            <UPageCard v-for="group in categoryGroups" :key="group.parent._id">
              <div class="flex flex-wrap items-start justify-between gap-4">
                <div class="flex items-center gap-3">
                  <span
                    :class="[
                      'flex size-10 items-center justify-center rounded-xl',
                      iconTone(group.parent)
                    ]"
                  >
                    <UIcon :name="categoryIcon(group.parent)" class="size-4" />
                  </span>
                  <div>
                    <p class="text-sm font-semibold">
                      {{ group.parent.name }}
                    </p>
                    <p class="text-xs text-muted">
                      {{ group.children.length }} subcategories -
                      {{ group.parent.isSystem ? 'System' : 'Custom' }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <UBadge :color="group.parent.isActive ? 'success' : 'neutral'">
                    {{ group.parent.isActive ? 'Active' : 'Inactive' }}
                  </UBadge>
                  <UBadge v-if="group.parent.isSystem" color="primary">
                    System
                  </UBadge>
                </div>
              </div>

              <div v-if="group.children.length" class="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                <UPageCard v-for="child in group.children" :key="child._id" variant="soft">
                  <div class="flex items-center justify-between gap-3">
                    <div class="flex items-center gap-3">
                      <span
                        :class="[
                          'flex size-9 items-center justify-center rounded-lg',
                          iconTone(child)
                        ]"
                      >
                        <UIcon :name="categoryIcon(child)" class="size-4" />
                      </span>
                      <div>
                        <p class="text-sm font-semibold">
                          {{ child.name }}
                        </p>
                        <p class="text-xs text-muted">
                          {{ child.isSystem ? 'System' : 'Custom' }}
                        </p>
                      </div>
                    </div>
                    <UBadge :color="child.isActive ? 'success' : 'neutral'">
                      {{ child.isActive ? 'Active' : 'Inactive' }}
                    </UBadge>
                  </div>
                </UPageCard>
              </div>

              <p v-else class="mt-4 text-xs text-muted">
                No subcategories yet.
              </p>
            </UPageCard>

            <UPageCard v-if="orphanChildren.length" variant="soft">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p class="text-sm font-semibold">
                    Unassigned subcategories
                  </p>
                  <p class="text-xs text-muted">
                    These subcategories have no parent assigned.
                  </p>
                </div>
                <UBadge color="warning">
                  Needs review
                </UBadge>
              </div>

              <div class="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                <UPageCard v-for="child in orphanChildren" :key="child._id" variant="soft">
                  <div class="flex items-center justify-between gap-3">
                    <div class="flex items-center gap-3">
                      <span
                        :class="[
                          'flex size-9 items-center justify-center rounded-lg',
                          iconTone(child)
                        ]"
                      >
                        <UIcon :name="categoryIcon(child)" class="size-4" />
                      </span>
                      <div>
                        <p class="text-sm font-semibold">
                          {{ child.name }}
                        </p>
                        <p class="text-xs text-muted">
                          {{ child.isSystem ? 'System' : 'Custom' }}
                        </p>
                      </div>
                    </div>
                    <UBadge :color="child.isActive ? 'success' : 'neutral'">
                      {{ child.isActive ? 'Active' : 'Inactive' }}
                    </UBadge>
                  </div>
                </UPageCard>
              </div>
            </UPageCard>
          </div>
        </UPageCard>
      </div>
    </template>
  </UDashboardPanel>
</template>
