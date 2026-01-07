<script setup lang="ts">
  const productLinks = [
    { label: 'Features', to: '#features' },
    { label: 'Workflow', to: '#workflow' },
    { label: 'Insights', to: '#insights' },
    { label: 'Pricing', to: '#pricing' }
  ]

  const companyLinks = [
    { label: 'About', to: '#' },
    { label: 'Careers', to: '#' },
    { label: 'Contact', to: '#' },
    { label: 'Security', to: '#' }
  ]

  const resourceLinks = [
    { label: 'Help center', to: '#' },
    { label: 'Guides', to: '#' },
    { label: 'API status', to: '#' },
    { label: 'Release notes', to: '#' }
  ]

  const copyrightYear = computed(() => new Date().getFullYear())
</script>

<template>
  <footer class="border-t border-t-default bg-default">
    <UContainer class="py-12">
      <div class="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
        <div class="space-y-4">
          <AppLogo />
          <p class="text-sm text-muted">
            Financial Management for individuals. Track spending, set goals, and stay on top of
            every bill with confidence.
          </p>
        </div>

        <UPageLinks title="Product" :links="productLinks" />

        <UPageLinks title="Product" :links="companyLinks" />

        <UPageLinks title="Product" :links="resourceLinks" />
      </div>

      <div class="mt-10 flex flex-col gap-4 border-t border-t-default pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>Copyright {{ copyrightYear }} FiMana. All rights reserved.</span>
        <div class="flex flex-wrap gap-4">
          <ULink to="#">Privacy</ULink>
          <ULink to="#">Terms</ULink>
          <ULink to="#">Status</ULink>
        </div>
      </div>
    </UContainer>
  </footer>
</template>
