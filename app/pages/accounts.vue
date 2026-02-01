<script setup lang="ts">
  import * as v from 'valibot'
  import { storeToRefs } from 'pinia'
  import type { FormSubmitEvent } from '@nuxt/ui'
  import type { Account, AccountType } from '~~/types/account'

  definePageMeta({
    layout: 'dashboard'
  })

  useSeoMeta({
    title: 'FiMana | Accounts',
    description: 'Track balances across cash, banks, and e-wallets.'
  })

  const accountsStore = useAccountsStore()
  const {
    accounts,
    activeAccounts,
    archivedCount,
    isSaving,
    error
  } = storeToRefs(accountsStore)

  onMounted(() => {
    if (!accounts.value.length) {
      accountsStore.fetchAccounts()
    }
  })

  const accountTypeValues = ['cash', 'bank', 'ewallet', 'credit'] as const
  const accountTypeOptions = [
    { label: 'Cash', value: 'cash' },
    { label: 'Bank', value: 'bank' },
    { label: 'E-wallet', value: 'ewallet' },
    { label: 'Credit', value: 'credit' }
  ]

  const currencyValues = ['PHP', 'USD', 'EUR'] as const
  const currencyOptions = currencyValues.map(currency => ({ label: currency, value: currency }))

  const schema = v.object({
    name: v.pipe(v.string(), v.trim(), v.minLength(1, 'Please enter account name')),
    type: v.picklist(accountTypeValues, 'Select an account type'),
    currency: v.picklist(currencyValues, 'Select a currency'),
    balance: v.number()
  })

  type Schema = v.InferOutput<typeof schema>

  const formState = reactive({
    name: '',
    type: 'bank' as AccountType,
    currency: 'PHP',
    balance: 0
  })

  const editFormState = reactive({
    name: '',
    type: 'bank' as AccountType,
    currency: 'PHP',
    balance: 0
  })

  const selectedAccount = ref<Account | null>(null)
  const isAddModalOpen = ref(false)
  const isEditModalOpen = ref(false)
  const isArchiveModalOpen = ref(false)
  const isDeleteModalOpen = ref(false)
  const toast = useToast()

  const totalBalance = computed(() =>
    activeAccounts.value.reduce((sum, account) => sum + account.balance, 0)
  )
  const topAccount = computed(() =>
    [...activeAccounts.value].sort((a, b) => b.balance - a.balance)[0]
  )

  const balanceMin = computed(() => (formState.type === 'credit' ? undefined : 0))
  const editBalanceMin = computed(() => (editFormState.type === 'credit' ? undefined : 0))

  const formatCurrency = (value: number, currency = 'PHP') =>
    new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2
    }).format(value)

  const formatDate = (value: Date) =>
    value.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  const balanceTone = (value: number) =>
    value < 0 ? 'text-error' : ''

  const resetForm = () => {
    formState.name = ''
    formState.type = 'bank'
    formState.currency = 'PHP'
    formState.balance = 0
  }

  const resetEditForm = () => {
    editFormState.name = ''
    editFormState.type = 'bank'
    editFormState.currency = 'PHP'
    editFormState.balance = 0
  }

  const setEditForm = (account: Account) => {
    editFormState.name = account.name
    editFormState.type = account.type
    editFormState.currency = account.currency
    editFormState.balance = account.balance
  }

  const openAddModal = () => {
    isAddModalOpen.value = true
  }

  const closeAddModal = () => {
    isAddModalOpen.value = false
  }

  const openEditModal = (account: Account) => {
    isArchiveModalOpen.value = false
    isDeleteModalOpen.value = false
    selectedAccount.value = account
    setEditForm(account)
    isEditModalOpen.value = true
  }

  const closeEditModal = () => {
    isEditModalOpen.value = false
  }

  const openArchiveModal = (account: Account) => {
    isEditModalOpen.value = false
    isDeleteModalOpen.value = false
    selectedAccount.value = account
    isArchiveModalOpen.value = true
  }

  const closeArchiveModal = () => {
    isArchiveModalOpen.value = false
  }

  const openDeleteModal = (account: Account) => {
    isEditModalOpen.value = false
    isArchiveModalOpen.value = false
    selectedAccount.value = account
    isDeleteModalOpen.value = true
  }

  const closeDeleteModal = () => {
    isDeleteModalOpen.value = false
  }

  watch(isAddModalOpen, (isOpen) => {
    if (!isOpen) {
      resetForm()
    }
  })

  watch(isEditModalOpen, (isOpen) => {
    if (!isOpen) {
      resetEditForm()
      if (!isArchiveModalOpen.value && !isDeleteModalOpen.value) {
        selectedAccount.value = null
      }
    }
  })

  watch(isArchiveModalOpen, (isOpen) => {
    if (!isOpen) {
      if (!isEditModalOpen.value && !isDeleteModalOpen.value) {
        selectedAccount.value = null
      }
    }
  })

  watch(isDeleteModalOpen, (isOpen) => {
    if (!isOpen) {
      if (!isEditModalOpen.value && !isArchiveModalOpen.value) {
        selectedAccount.value = null
      }
    }
  })

  const addAccount = async (event: FormSubmitEvent<Schema>) => {
    if (isSaving.value) {
      return
    }

    const name = event.data.name.trim()
    if (!name) {
      toast.add({ title: 'Account name required', color: 'error' })
      return
    }

    const created = await accountsStore.createAccount({
      name,
      type: event.data.type,
      currency: event.data.currency,
      balance: event.data.balance
    })

    if (!created) {
      toast.add({
        title: 'Unable to add account',
        description: error.value || 'Please try again.',
        color: 'error'
      })
      return
    }

    toast.add({
      title: 'Account added',
      description: `${name} is ready to track.`,
      color: 'success'
    })

    closeAddModal()
  }

  const updateAccount = async (event: FormSubmitEvent<Schema>) => {
    if (isSaving.value || !selectedAccount.value) {
      return
    }

    const name = event.data.name.trim()
    if (!name) {
      toast.add({ title: 'Account name required', color: 'error' })
      return
    }

    const updated = await accountsStore.updateAccount(selectedAccount.value._id, {
      name,
      type: event.data.type,
      currency: event.data.currency,
      balance: event.data.balance
    })

    if (!updated) {
      toast.add({
        title: 'Unable to update account',
        description: error.value || 'Please try again.',
        color: 'error'
      })
      return
    }

    toast.add({
      title: 'Account updated',
      description: `${name} is ready to go.`,
      color: 'success'
    })

    closeEditModal()
  }

  const confirmArchive = async () => {
    if (isSaving.value || !selectedAccount.value) {
      return
    }

    const nextArchivedState = !selectedAccount.value.isArchived
    const updated = await accountsStore.updateAccount(selectedAccount.value._id, {
      isArchived: nextArchivedState
    })

    if (!updated) {
      toast.add({
        title: 'Unable to update account',
        description: error.value || 'Please try again.',
        color: 'error'
      })
      return
    }

    toast.add({
      title: nextArchivedState ? 'Account archived' : 'Account restored',
      description: selectedAccount.value.name,
      color: 'success'
    })

    closeArchiveModal()
  }

  const confirmDelete = async () => {
    if (isSaving.value || !selectedAccount.value) {
      return
    }

    const name = selectedAccount.value.name
    const deleted = await accountsStore.deleteAccount(selectedAccount.value._id)

    if (!deleted) {
      toast.add({
        title: 'Unable to delete account',
        description: error.value || 'Please try again.',
        color: 'error'
      })
      return
    }

    toast.add({
      title: 'Account deleted',
      description: name,
      color: 'success'
    })

    closeDeleteModal()
  }

  const accountActions = (account: Account) => [
    [
      {
        label: 'Edit account',
        icon: 'i-lucide-pencil',
        onSelect: () => openEditModal(account)
      }
    ],
    [
      {
        label: account.isArchived ? 'Restore account' : 'Archive account',
        icon: account.isArchived ? 'i-lucide-rotate-ccw' : 'i-lucide-archive',
        onSelect: () => openArchiveModal(account)
      }
    ],
    [
      {
        label: 'Delete account',
        icon: 'i-lucide-trash-2',
        onSelect: () => openDeleteModal(account)
      }
    ]
  ]
</script>

<template>
  <UDashboardPanel>
    <template #body>
      <div class="flex flex-col gap-8">
        <DashboardHeader
          page="Accounts"
          title="Cash and bank balances"
          description="Track where your money sits across cash, banks, and e-wallets."
        >
          <PrimaryButton icon="i-lucide-plus" @click="openAddModal">
            Add account
          </PrimaryButton>
          <UButton variant="outline" icon="i-lucide-download">
            Export
          </UButton>
        </DashboardHeader>

        <section class="grid gap-4 md:grid-cols-3">
          <DashboardStatCard
            :style="{ animationDelay: '0s' }"
            title="Total balance"
            :value="formatCurrency(totalBalance)"
            :note="`Across ${activeAccounts.length} active accounts`"
          />

          <DashboardStatCard
            :style="{ animationDelay: '0.08s' }"
            title="Primary account"
            :value="topAccount?.name || 'No accounts'"
            :note="topAccount ? formatCurrency(topAccount.balance) : 'Add an account to start'"
          />

          <DashboardStatCard
            :style="{ animationDelay: '0.16s' }"
            title="Archived accounts"
            :value="archivedCount"
            note="Hidden from daily totals"
          />
        </section>

        <UModal v-model:open="isAddModalOpen" title="New account">
          <template #body>
            <p class="text-sm text-muted">
              Add a cash, bank, or wallet account to track balances.
            </p>

            <UForm
              :schema="schema"
              :state="formState"
              class="mt-6 space-y-4"
              @submit="addAccount"
            >
              <UFormField label="Account name" name="name">
                <UInput v-model="formState.name" class="w-full" variant="subtle" />
              </UFormField>

              <UFormField label="Account type" name="type">
                <USelect
                  v-model="formState.type"
                  :items="accountTypeOptions"
                  class="w-full"
                  variant="subtle"
                />
              </UFormField>

              <div class="grid gap-4 md:grid-cols-[1fr_2fr]">
                <UFormField label="Currency" name="currency">
                  <USelect
                    v-model="formState.currency"
                    :items="currencyOptions"
                    class="w-full"
                    variant="subtle"
                  />
                </UFormField>

                <UFormField label="Starting balance" name="balance">
                  <UInputNumber
                    v-model="formState.balance"
                    class="w-full"
                    variant="subtle"
                    :min="balanceMin"
                    :step="0.01"
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
                  Add account
                </UButton>
                <UButton variant="ghost" @click="closeAddModal">
                  Cancel
                </UButton>
              </div>
            </UForm>
          </template>
        </UModal>

        <UModal v-model:open="isEditModalOpen" title="Edit account">
          <template #body>
            <p class="text-sm text-muted">
              Update the account details and current balance.
            </p>

            <UForm
              :schema="schema"
              :state="editFormState"
              class="mt-6 space-y-4"
              @submit="updateAccount"
            >
              <UFormField label="Account name" name="name">
                <UInput v-model="editFormState.name" class="w-full" variant="subtle" />
              </UFormField>

              <UFormField label="Account type" name="type">
                <USelect
                  v-model="editFormState.type"
                  :items="accountTypeOptions"
                  class="w-full"
                  variant="subtle"
                />
              </UFormField>

              <div class="grid gap-4 md:grid-cols-[1fr_2fr]">
                <UFormField label="Currency" name="currency">
                  <USelect
                    v-model="editFormState.currency"
                    :items="currencyOptions"
                    class="w-full"
                    variant="subtle"
                  />
                </UFormField>

                <UFormField label="Current balance" name="balance">
                  <UInputNumber
                    v-model="editFormState.balance"
                    class="w-full"
                    variant="subtle"
                    :min="editBalanceMin"
                    :step="0.01"
                  />
                </UFormField>
              </div>

              <div class="flex flex-wrap items-center gap-3">
                <UButton
                  type="submit"
                  icon="i-lucide-save"
                  :loading="isSaving"
                  :disabled="isSaving"
                >
                  Save changes
                </UButton>
                <UButton variant="ghost" @click="closeEditModal">
                  Cancel
                </UButton>
              </div>
            </UForm>
          </template>
        </UModal>

        <UModal
          v-model:open="isArchiveModalOpen"
          :title="selectedAccount?.isArchived ? 'Restore account' : 'Archive account'"
        >
          <template #body>
            <p class="text-sm text-muted">
              {{
                selectedAccount?.isArchived
                  ? 'Bring this account back into active totals.'
                  : 'Archived accounts are hidden from daily totals until restored.'
              }}
            </p>

            <div class="mt-6 flex flex-wrap items-center gap-3">
              <UButton
                :color="selectedAccount?.isArchived ? 'success' : 'warning'"
                :loading="isSaving"
                :disabled="isSaving"
                @click="confirmArchive"
              >
                {{ selectedAccount?.isArchived ? 'Restore account' : 'Archive account' }}
              </UButton>
              <UButton variant="ghost" @click="closeArchiveModal">
                Cancel
              </UButton>
            </div>
          </template>
        </UModal>

        <UModal v-model:open="isDeleteModalOpen" title="Delete account">
          <template #body>
            <p class="text-sm text-muted">
              This removes the account from your list. This action cannot be undone.
            </p>

            <div class="mt-6 flex flex-wrap items-center gap-3">
              <UButton
                color="error"
                :loading="isSaving"
                :disabled="isSaving"
                @click="confirmDelete"
              >
                Delete account
              </UButton>
              <UButton variant="ghost" @click="closeDeleteModal">
                Cancel
              </UButton>
            </div>
          </template>
        </UModal>

        <UPageCard>
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              All accounts
            </p>
            <p class="mt-2 text-sm text-muted">
              Keep balances accurate for clean reporting.
            </p>
          </div>

          <div class="mt-6 divide-y divide-default">
            <div
              v-for="account in accounts"
              :key="account._id"
              :class="[
                'flex flex-wrap items-center justify-between gap-4 py-4 text-sm',
                account.isArchived ? 'opacity-70' : ''
              ]"
            >
              <div>
                <p class="font-semibold">
                  {{ account.name }}
                </p>
                <p class="text-xs text-muted">
                  {{ account.type.toUpperCase() }} - {{ account.currency }} - Created
                  {{ formatDate(account.createdAt) }}
                </p>
              </div>
              <div class="flex items-center gap-4">
                <div class="text-right">
                  <p class="text-xs text-muted">
                    {{ account.isArchived ? 'Archived' : 'Active' }}
                  </p>
                  <p :class="['text-sm font-semibold', balanceTone(account.balance)]">
                    {{ formatCurrency(account.balance, account.currency) }}
                  </p>
                </div>
                <UDropdownMenu
                  :items="accountActions(account)"
                  :content="{ align: 'end', collisionPadding: 12 }"
                >
                  <UButton
                    variant="ghost"
                    size="sm"
                    icon="i-lucide-ellipsis"
                    aria-label="Account actions"
                  />
                </UDropdownMenu>
              </div>
            </div>
          </div>
        </UPageCard>
      </div>
    </template>
  </UDashboardPanel>
</template>
