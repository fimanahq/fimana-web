import type { Account, AccountType } from '~~/types/account'
import { isSuccess } from '~/utils/api'

interface CreateAccountPayload {
  name: string
  type: AccountType
  currency: string
  balance: number
}

interface UpdateAccountPayload {
  name?: string
  type?: AccountType
  currency?: string
  balance?: number
  isArchived?: boolean
}

type AccountResponse = Omit<Account, 'createdAt'> & { createdAt: string | Date }
type AccountsPayload = AccountResponse[] | AccountResponse | null | undefined

export const useAccountsStore = defineStore('accounts', () => {
  const api = useApi()
  const accounts = ref<Account[]>([])
  const isLoading = ref(false)
  const isSaving = ref(false)
  const error = ref<string | null>(null)

  const activeAccounts = computed(() =>
    accounts.value.filter(account => account && !account.isArchived)
  )
  const archivedCount = computed(() =>
    accounts.value.filter(account => account && account.isArchived).length
  )

  const normalizeAccount = (account: AccountResponse): Account => ({
    ...account,
    createdAt: account.createdAt ? new Date(account.createdAt) : new Date()
  })

  const normalizeAccounts = (payload: AccountsPayload): Account[] => {
    if (!payload) {
      return []
    }

    const list = Array.isArray(payload) ? payload : [payload]
    return list.filter(Boolean).map(normalizeAccount)
  }

  async function fetchAccounts() {
    isLoading.value = true
    error.value = null

    try {
      const response = await api.get<AccountResponse[]>('/accounts')

      if (!isSuccess(response)) {
        error.value = response.message || 'Failed to fetch accounts.'
        return accounts.value
      }

      accounts.value = normalizeAccounts(response.data)
      return accounts.value
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch accounts.'
      return accounts.value
    } finally {
      isLoading.value = false
    }
  }

  async function createAccount(payload: CreateAccountPayload) {
    isSaving.value = true
    error.value = null

    try {
      const response = await api.post<AccountResponse>('/accounts', payload)

      if (!isSuccess(response)) {
        error.value = response.message || 'Unable to add account.'
        return null
      }

      if (!response.data) {
        error.value = 'Account data was not returned.'
        return null
      }

      const normalized = normalizeAccount(response.data)
      accounts.value = [normalized, ...accounts.value].filter(Boolean)
      return normalized
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unable to add account.'
      return null
    } finally {
      isSaving.value = false
    }
  }

  async function updateAccount(accountId: string, payload: UpdateAccountPayload) {
    isSaving.value = true
    error.value = null

    try {
      const response = await api.patch<AccountResponse>(`/accounts/${accountId}`, payload)

      if (!isSuccess(response)) {
        error.value = response.message || 'Unable to update account.'
        return null
      }

      if (!response.data) {
        error.value = 'Account data was not returned.'
        return null
      }

      const normalized = normalizeAccount(response.data)
      accounts.value = accounts.value.map(account =>
        account && account._id === normalized._id ? normalized : account
      )
      return normalized
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unable to update account.'
      return null
    } finally {
      isSaving.value = false
    }
  }

  async function deleteAccount(accountId: string) {
    isSaving.value = true
    error.value = null

    try {
      const response = await api.delete<null>(`/accounts/${accountId}`)

      if (!isSuccess(response)) {
        error.value = response.message || 'Unable to delete account.'
        return false
      }

      accounts.value = accounts.value.filter(account => account && account._id !== accountId)
      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unable to delete account.'
      return false
    } finally {
      isSaving.value = false
    }
  }

  return {
    accounts,
    activeAccounts,
    archivedCount,
    isLoading,
    isSaving,
    error,
    fetchAccounts,
    createAccount,
    updateAccount,
    deleteAccount
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAccountsStore, import.meta.hot))
}
