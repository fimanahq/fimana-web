<script setup lang="ts">
  import type { Settings } from '~~/types/settings'

  definePageMeta({
    layout: 'dashboard'
  })

  useSeoMeta({
    title: 'FiMana | Settings',
    description: 'Configure currency and budget timing.'
  })

  const settings: Settings = {
    _id: 'set_01',
    userId: 'usr_01',
    currency: 'PHP',
    startOfMonth: 1
  }
</script>

<template>
  <UDashboardPanel>
    <template #body>
      <div class="flex flex-col gap-8">
        <DashboardHeader
          page="Settings"
          title="Account preferences"
          description="Keep your currency and budget calendar aligned."
        >
          <UButton variant="soft" icon="i-lucide-save">
            Save changes
          </UButton>
          <UButton variant="outline" icon="i-lucide-refresh-cw">
            Reset
          </UButton>
        </DashboardHeader>

        <div class="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <UPageCard>
            <div>
              <div class="flex items-center justify-between gap-3">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                    Budget cycle
                  </p>
                  <p class="mt-2 text-sm text-muted">
                    Choose when your month starts.
                  </p>
                </div>
                <UButton variant="ghost" size="md">
                  Edit
                </UButton>
              </div>

              <div class="mt-6 space-y-4 text-sm">
                <UPageCard variant="soft">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="font-semibold">
                        Currency
                      </p>
                      <p class="text-xs text-muted">
                        Default currency for all accounts.
                      </p>
                    </div>
                    <span class="font-semibold">{{ settings.currency }}</span>
                  </div>
                </UPageCard>

                <UPageCard variant="soft">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="font-semibold">
                        Start of month
                      </p>
                      <p class="text-xs text-muted">
                        Applies to budgets and reports.
                      </p>
                    </div>
                    <span class="font-semibold">Day {{ settings.startOfMonth }}</span>
                  </div>
                </UPageCard>
              </div>
            </div>
          </UPageCard>

          <UPageCard>
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Data management
              </p>
              <h2 class="mt-3 text-xl font-semibold">
                Control your exports
              </h2>
              <p class="mt-2 text-sm text-muted">
                Download backups or switch currencies later.
              </p>

              <div class="mt-6 space-y-3 text-sm">
                <div class="flex items-center justify-between">
                  <span class="text-muted">Last export</span>
                  <span class="font-semibold">Mar 20, 2025</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-muted">Accounts linked</span>
                  <span class="font-semibold">4 active</span>
                </div>
              </div>

              <UButton class="mt-6" variant="soft">
                Export data
              </UButton>
            </div>
          </UPageCard>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
