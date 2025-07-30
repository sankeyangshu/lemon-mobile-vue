import { defineConfig } from '@sankeyangshu/eslint-config';

export default defineConfig(
  {},
  {
    rules: {
      'perfectionist/sort-objects': 'off',
    },
  }
);

// {
//   rules: {
//     // '@typescript-eslint/ban-types': 'off',
//     // '@typescript-eslint/no-explicit-any': 'off',
//     // '@typescript-eslint/promise-function-async': 'off',
// 'vue/component-name-in-template-casing': [
//   'warn',
//   'PascalCase',
//   {
//     ignores: ['/^icon-/'],
//     registeredComponentsOnly: false,
//   },
// ],
// 'vue/multi-word-component-names': [
//   'warn',
//   {
//     ignores: ['index', 'App', 'Register', '[id]', '[url]'],
//   },
// ],
//     'unocss/order-attributify': 'off',
//   },
// }
