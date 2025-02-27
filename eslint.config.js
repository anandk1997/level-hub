import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import perfectionist from 'eslint-plugin-perfectionist';
import unusedImports from 'eslint-plugin-unused-imports';
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    // Enable reporting of unused ESLint disable directives
    linterOptions: {
      // reportUnusedDisableDirectives: true,
    },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      'airbnb',
      'airbnb-typescript',
      'airbnb/hooks',
      'prettier',
    ],
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: { jsx: true },
      globals: globals.browser,
      // if you need type-aware linting, ensure your tsconfig is correctly referenced:
      project: './tsconfig.json',
    },
    settings: {
      'import/resolver': {
        typescript: { project: './tsconfig.json' },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      perfectionist,
      'unused-imports': unusedImports,
      '@typescript-eslint': tsEslintPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // --- General ---
      'no-alert': 0,
      camelcase: 0,
      'no-console': 0,
      'no-unused-vars': 0,
      'no-nested-ternary': 0,
      'no-param-reassign': 0,
      'no-underscore-dangle': 0,
      'no-restricted-exports': 0,
      'no-promise-executor-return': 0,
      'import/prefer-default-export': 0,
      'prefer-destructuring': [1, { object: true, array: false }],

      // --- TypeScript ---
      '@typescript-eslint/naming-convention': 0,
      '@typescript-eslint/no-use-before-define': 0,
      '@typescript-eslint/consistent-type-exports': 1,
      '@typescript-eslint/consistent-type-imports': 1,
      '@typescript-eslint/no-unused-vars': [1, { args: 'none' }],

      // --- React ---
      'react/no-children-prop': 0,
      'react/react-in-jsx-scope': 0,
      'react/no-array-index-key': 0,
      'react/require-default-props': 0,
      'react/jsx-props-no-spreading': 0,
      'react/function-component-definition': 0,
      'react/jsx-no-duplicate-props': [1, { ignoreCase: false }],
      'react/jsx-no-useless-fragment': [1, { allowExpressions: true }],
      'react/no-unstable-nested-components': [1, { allowAsProps: true }],

      // --- JSX a11y ---
      'jsx-a11y/anchor-is-valid': 0,
      'jsx-a11y/control-has-associated-label': 0,

      // --- Unused imports ---
      'unused-imports/no-unused-imports': 1,
      'unused-imports/no-unused-vars': [
        0,
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],

      // --- Perfectionist (sort imports/exports) ---
      'perfectionist/sort-exports': [1, { order: 'asc', type: 'line-length' }],
      'perfectionist/sort-named-imports': [1, { order: 'asc', type: 'line-length' }],
      'perfectionist/sort-named-exports': [1, { order: 'asc', type: 'line-length' }],
      'perfectionist/sort-imports': [
        1,
        {
          order: 'asc',
          type: 'line-length',
          'newlines-between': 'always',
          groups: [
            'style',
            'type',
            ['builtin', 'external'],
            'custom-mui',
            'custom-routes',
            'custom-hooks',
            'custom-utils',
            'internal',
            'custom-components',
            'custom-sections',
            'custom-auth',
            'custom-types',
            ['parent', 'sibling', 'index'],
            ['parent-type', 'sibling-type', 'index-type'],
            'object',
            'unknown',
          ],
          'custom-groups': {
            value: {
              'custom-mui': '@mui/**',
              'custom-auth': 'src/auth/**',
              'custom-hooks': 'src/hooks/**',
              'custom-utils': 'src/utils/**',
              'custom-types': 'src/types/**',
              'custom-routes': 'src/routes/**',
              'custom-sections': 'src/sections/**',
              'custom-components': 'src/components/**',
            },
          },
          'internal-pattern': ['src/**'],
        },
      ],

      // --- React Refresh & Hooks ---
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  }
);
