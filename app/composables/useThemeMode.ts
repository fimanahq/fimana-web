export type ThemeMode = 'light' | 'dark'

export const useThemeMode = () => {
  const mode = useState<ThemeMode>('theme-mode', () => 'light')
  const isDark = computed(() => mode.value === 'dark')

  const setMode = (value: ThemeMode) => {
    mode.value = value
  }

  const toggleMode = () => {
    mode.value = isDark.value ? 'light' : 'dark'
  }

  return { mode, isDark, setMode, toggleMode }
}
