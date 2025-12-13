import antfu from '@antfu/eslint-config'

export default antfu(
  {
    // app vs lib
    type: 'app',

    // TS + React
    typescript: {
      tsconfigPath: 'tsconfig.json',
    },
    react: true,

      // 👇 NEW: global ignores (replaces .eslintignore)
    ignores: [
      '**/dist',
      '**/build',
      '**/coverage',
      'pnpm-lock.yaml',
      // add more if you like
    ],
    
    // Enable external formatters for non-JS/TS files
    // Powered by eslint-plugin-format
    // (CSS, HTML, JSON, Markdown via Prettier under the hood)
    formatters: {
      css: true,
      html: true,
      json: true,
      markdown: 'prettier',
    },

    // Stylistic rules (this is your “formatter” for JS/TS)
    stylistic: {
      indent: 2,
      quotes: "double",
      semi: true,
    },
  },
  {
    // Optional project overrides / extras
    rules: {
      // Examples you can toggle later:
      // 'no-console': 'warn',
      // 'react/jsx-no-target-blank': 'off',
      "ts/no-redeclare": "off",
      "ts/consistent-type-definitions": ["error", "type"],
      "no-console": ["warn"],
      "antfu/no-top-level-await": ["off"],
      "node/prefer-global/process": ["off"],
      "node/no-process-env": ["error"],
      "perfectionist/sort-imports": ["error", {
      tsconfigRootDir: ".",
    }],
    "unicorn/filename-case": ["error", {
      case: "kebabCase",
      ignore: ["README.md"],
    }],
    },
  },
)