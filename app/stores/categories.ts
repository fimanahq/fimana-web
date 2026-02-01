import type { Category } from '~~/types/category'
import { isSuccess } from '~/utils/api'

interface CreateCategoryPayload {
  name: string
  parentId?: string | null
  icon: string
  iconStyle: string
  isActive: boolean
  isSystem?: boolean
}

type CategoryResponse = Omit<Category, 'createdAt' | 'updatedAt'> & {
  createdAt?: string | Date
  updatedAt?: string | Date
}

type CategoriesPayload = CategoryResponse[] | CategoryResponse | null | undefined

export const useCategoriesStore = defineStore('categories', () => {
  const api = useApi()
  const categories = ref<Category[]>([])
  const isLoading = ref(false)
  const isSaving = ref(false)
  const error = ref<string | null>(null)

  const normalizeCategory = (category: CategoryResponse): Category => ({
    ...category,
    iconStyle: category.iconStyle || 'line-duotone',
    isActive: category.isActive ?? true,
    createdAt: category.createdAt ? new Date(category.createdAt) : undefined,
    updatedAt: category.updatedAt ? new Date(category.updatedAt) : undefined
  })

  const normalizeCategories = (payload: CategoriesPayload): Category[] => {
    if (!payload) {
      return []
    }

    const list = Array.isArray(payload) ? payload : [payload]
    return list.filter(Boolean).map(normalizeCategory)
  }

  async function fetchCategories() {
    isLoading.value = true
    error.value = null

    try {
      const response = await api.get<CategoryResponse[]>('/categories')

      if (!isSuccess(response)) {
        error.value = response.message || 'Failed to fetch categories.'
        return categories.value
      }

      categories.value = normalizeCategories(response.data)
      return categories.value
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch categories.'
      return categories.value
    } finally {
      isLoading.value = false
    }
  }

  async function createCategory(payload: CreateCategoryPayload) {
    isSaving.value = true
    error.value = null

    try {
      const response = await api.post<CategoryResponse>('/categories', payload)

      if (!isSuccess(response)) {
        error.value = response.message || 'Unable to add category.'
        return null
      }

      if (!response.data) {
        error.value = 'Category data was not returned.'
        return null
      }

      const normalized = normalizeCategory(response.data)
      categories.value = [normalized, ...categories.value].filter(Boolean)
      return normalized
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unable to add category.'
      return null
    } finally {
      isSaving.value = false
    }
  }

  return {
    categories,
    isLoading,
    isSaving,
    error,
    fetchCategories,
    createCategory
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCategoriesStore, import.meta.hot))
}
