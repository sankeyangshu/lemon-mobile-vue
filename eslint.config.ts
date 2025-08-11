import { defineConfig } from '@sankeyangshu/eslint-config';

export default defineConfig(
  {},
  {
    rules: {
      'perfectionist/sort-objects': 'off',
      '@eslint-community/eslint-comments/no-unlimited-disable': 'off',
    },
  }
);
