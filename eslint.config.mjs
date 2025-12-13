// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    // App vs lib (tunes some rules)
    type: 'app',

    // ESLint 9+ way to ignore files (replaces .eslintignore)
    ignores: [
      '**/dist',
      '**/build',
      '**/coverage',
      'pnpm-lock.yaml',
    ],

    // Respect .gitignore as well (true by default; explicit for clarity)
    gitignore: true,

    // TypeScript support
    typescript: {
      tsconfigPath: 'tsconfig.json',
    },

    // React project
    react: true,

    // Non-JS/TS formatters (via eslint-plugin-format)
    formatters: {
      css: true,
      html: true,
      json: true,
      markdown: 'prettier',
    },

    // Stylistic rules = your JS/TS formatter
    stylistic: {
      indent: 2,
      quotes: 'double',
      semi: true,
    },
  },

  // Extra project-specific overrides (optional)
  {
    rules: {
      // 'no-console': 'warn',
      // 'react/jsx-no-target-blank': 'off',
    },
  },
)