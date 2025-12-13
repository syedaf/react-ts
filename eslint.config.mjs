import antfu from '@antfu/eslint-config'

export default antfu(
  {
    type: 'app',

    // ESLint 9+ way to ignore files (replaces .eslintignore)
    ignores: [
      '**/dist',
      '**/build',
      '**/coverage',
      'pnpm-lock.yaml',
    ],

    gitignore: true,

    typescript: {
      tsconfigPath: 'tsconfig.json',
    },

    react: true,

    formatters: {
      css: true,
      html: true,
      json: true,
      markdown: 'prettier',
    },

    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: true,
    },
  },
  {
    rules: {
      // your overrides here
      // 'no-console': 'warn',
    },
  },
)
