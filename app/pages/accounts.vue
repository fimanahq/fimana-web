<script setup lang="ts">
  import * as v from 'valibot'
  import { storeToRefs } from 'pinia'
  import type { FormSubmitEvent } from '@nuxt/ui'
  import type { AccountType } from '~~/types/account'

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

  const isAddModalOpen = ref(false)
  const toast = useToast()

  const totalBalance = computed(() =>
    activeAccounts.value.reduce((sum, account) => sum + account.balance, 0)
  )
  const topAccount = computed(() =>
    [...activeAccounts.value].sort((a, b) => b.balance - a.balance)[0]
  )

  const balanceMin = computed(() => (formState.type === 'credit' ? undefined : 0))

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

  const openAddModal = () => {
    isAddModalOpen.value = true
  }

  const closeAddModal = () => {
    isAddModalOpen.value = false
  }

  watch(isAddModalOpen, (isOpen) => {
    if (!isOpen) {
      resetForm()
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
              <div class="grid gap-4 md:grid-cols-2">
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
              </div>

              <div class="grid gap-4 md:grid-cols-2">
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
                <UButton type="submit" icon="i-lucide-plus" :loading="isSaving" :disabled="isSaving">
                  Add account
                </UButton>
                <UButton variant="ghost" @click="closeAddModal">
                  Cancel
                </UButton>
              </div>
            </UForm>
          </template>
        </UModal>

        <UPageCard>
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                All accounts
              </p>
              <p class="mt-2 text-sm text-muted">
                Keep balances accurate for clean reporting.
              </p>
            </div>
            <UButton variant="ghost" size="md">
              Manage
            </UButton>
          </div>

          <div class="mt-6 divide-y divide-default">
            <div
              v-for="account in accounts"
              :key="account._id"
              class="flex flex-wrap items-center justify-between gap-4 py-4 text-sm"
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
              <div class="flex items-center gap-3">
                <span class="text-xs text-muted">
                  {{ account.isArchived ? 'Archived' : 'Active' }}
                </span>
                <span :class="['text-sm font-semibold', balanceTone(account.balance)]">
                  {{ formatCurrency(account.balance, account.currency) }}
                </span>
              </div>
            </div>
          </div>
        </UPageCard>
      </div>
    </template>
  </UDashboardPanel>
</template>
