import { watch } from 'vue'
import type { ThemeMode } from '~/composables/useThemeMode'

const storageKey = 'fimana-theme'

export default defineNuxtPlugin(() => {
  const { mode } = useThemeMode()

  const applyMode = (value: ThemeMode) => {
    const root = document.documentElement
    root.classList.toggle('dark', value === 'dark')
    root.style.colorScheme = value
  }

  const stored = localStorage.getItem(storageKey)
  const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  const initial = stored === 'dark' || stored === 'light' ? stored : preferred

  mode.value = initial
  applyMode(initial)

  watch(
    mode,
    (value) => {
      applyMode(value)
      localStorage.setItem(storageKey, value)
    },
    { flush: 'post' }
  )
})
