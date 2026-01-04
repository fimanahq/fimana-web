// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {
      '@stylistic/indent': 'off',
      '@stylistic/member-delimiter-style': [
        'error', {
          multiline: {
            delimiter: 'none',
            requireLast: true
          },
          multilineDetection: 'brackets',
          singleline: {
            delimiter: 'semi',
            requireLast: true
          }
        }],
      '@stylistic/semi': ['error', 'never'],
      'vue/max-attributes-per-line': ['error', { singleline: { max: 3 } }],
      'vue/no-export-in-script-setup': 'error',
      'vue/script-indent': ['error', 2, { baseIndent: 1, ignores: [], switchCase: 1 }]
    }
  }
)
