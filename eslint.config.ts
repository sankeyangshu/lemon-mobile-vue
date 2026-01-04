import antfu from '@antfu/eslint-config';
import pluginTailwindcss from 'eslint-plugin-better-tailwindcss';

export default antfu(
  {
    formatters: true,
    vue: true,
    typescript: true,
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: true,
    },
    isInEditor: false,
    rules: {
      'style/arrow-parens': ['error', 'always'], // 箭头函数参数始终添加括号
      'style/brace-style': ['error', '1tbs', { allowSingleLine: true }], // 括号样式
      'pnpm/yaml-enforce-settings': 'off',
    },
  },
  {
    files: ['**/*.vue'],
    rules: {
      'vue/block-order': ['error', { order: ['template', 'script', 'style'] }],
      'vue/no-empty-component-block': 'error',
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: 3,
          multiline: 1,
        },
      ],
    },
  },
  {
    plugins: {
      'better-tailwindcss': pluginTailwindcss,
    },
    rules: {
      // enable all recommended rules to report an error
      ...pluginTailwindcss.configs['recommended-error'].rules,

      // or configure rules individually
      'better-tailwindcss/enforce-consistent-line-wrapping': ['warn', { printWidth: 100 }],
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/styles/global.css',
      },
    },
  },
);
