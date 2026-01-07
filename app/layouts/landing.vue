<template>
  <div class="landing-shell min-h-screen text-[var(--landing-ink)]">
    <LandingHeader />
    <UMain>
      <slot />
    </UMain>
    <LandingFooter />
  </div>
</template>

<style scoped>
:global(:root) {
  --landing-ink: #0f172a;
  --landing-muted: #475569;
  --landing-accent: #0f766e;
  --landing-accent-strong: #115e59;
  --landing-accent-soft: rgba(15, 118, 110, 0.12);
  --landing-highlight: #f59e0b;
  --landing-highlight-soft: rgba(245, 158, 11, 0.14);
  --landing-surface: rgba(255, 255, 255, 0.82);
  --landing-surface-soft: rgba(255, 255, 255, 0.7);
  --landing-surface-strong: rgba(255, 255, 255, 0.92);
  --landing-border: rgba(15, 23, 42, 0.08);
  --landing-bg: radial-gradient(1200px 600px at 8% -10%, rgba(13, 148, 136, 0.2) 0%, rgba(13, 148, 136, 0) 60%),
    radial-gradient(900px 500px at 88% 6%, rgba(251, 191, 36, 0.18) 0%, rgba(251, 191, 36, 0) 55%),
    #f8fafc;
}

:global(.dark) {
  --landing-ink: #e2e8f0;
  --landing-muted: #94a3b8;
  --landing-accent: #2dd4bf;
  --landing-accent-strong: #14b8a6;
  --landing-accent-soft: rgba(45, 212, 191, 0.18);
  --landing-highlight: #fbbf24;
  --landing-highlight-soft: rgba(251, 191, 36, 0.2);
  --landing-surface: rgba(15, 23, 42, 0.78);
  --landing-surface-soft: rgba(15, 23, 42, 0.64);
  --landing-surface-strong: rgba(15, 23, 42, 0.92);
  --landing-border: rgba(148, 163, 184, 0.2);
  --landing-bg: radial-gradient(1200px 600px at 8% -10%, rgba(45, 212, 191, 0.18) 0%, rgba(45, 212, 191, 0) 60%),
    radial-gradient(900px 500px at 88% 6%, rgba(251, 191, 36, 0.16) 0%, rgba(251, 191, 36, 0) 55%),
    #0b1120;
}

.landing-shell {
  background: var(--landing-bg);
}
</style>
