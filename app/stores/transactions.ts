import type { Transaction, TransactionType } from '~~/types/transaction'
import { isSuccess } from '~/utils/api'

interface CreateTransactionPayload {
  accountId: string
  categoryId: string
  type: TransactionType
  amount: number
  description: string
  date: string | Date
  relatedAccountId?: string
}

type TransactionResponse = Omit<Transaction, 'date' | 'createdAt'> & {
  date: string | Date
  createdAt: string | Date
}

type TransactionsPayload = TransactionResponse[] | TransactionResponse | null | undefined

export const useTransactionsStore = defineStore('transactions', () => {
  const api = useApi()
  const transactions = ref<Transaction[]>([])
  const isLoading = ref(false)
  const isSaving = ref(false)
  const error = ref<string | null>(null)

  const totals = computed(() => ({
    income: transactions.value
      .filter(transaction => transaction.type === 'income')
      .reduce((sum, transaction) => sum + transaction.amount, 0),
    expense: transactions.value
      .filter(transaction => transaction.type === 'expense')
      .reduce((sum, transaction) => sum + transaction.amount, 0),
    transfer: transactions.value
      .filter(transaction => transaction.type === 'transfer')
      .reduce((sum, transaction) => sum + transaction.amount, 0)
  }))

  const normalizeTransaction = (transaction: TransactionResponse): Transaction => ({
    ...transaction,
    date: transaction.date ? new Date(transaction.date) : new Date(),
    createdAt: transaction.createdAt ? new Date(transaction.createdAt) : new Date()
  })

  const normalizeTransactions = (payload: TransactionsPayload): Transaction[] => {
    if (!payload) {
      return []
    }

    const list = Array.isArray(payload) ? payload : [payload]
    return list.filter(Boolean).map(normalizeTransaction)
  }

  async function fetchTransactions() {
    isLoading.value = true
    error.value = null

    try {
      const response = await api.get<TransactionResponse[]>('/transactions')

      if (!isSuccess(response)) {
        error.value = response.message || 'Failed to fetch transactions.'
        return transactions.value
      }

      transactions.value = normalizeTransactions(response.data)
      return transactions.value
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch transactions.'
      return transactions.value
    } finally {
      isLoading.value = false
    }
  }

  async function createTransaction(payload: CreateTransactionPayload) {
    isSaving.value = true
    error.value = null

    try {
      const response = await api.post<TransactionResponse>('/transactions', payload)

      if (!isSuccess(response)) {
        error.value = response.message || 'Unable to add transaction.'
        return null
      }

      if (!response.data) {
        error.value = 'Transaction data was not returned.'
        return null
      }

      const normalized = normalizeTransaction(response.data)
      transactions.value = [normalized, ...transactions.value].filter(Boolean)
      return normalized
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unable to add transaction.'
      return null
    } finally {
      isSaving.value = false
    }
  }

  return {
    transactions,
    totals,
    isLoading,
    isSaving,
    error,
    fetchTransactions,
    createTransaction
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTransactionsStore, import.meta.hot))
}
