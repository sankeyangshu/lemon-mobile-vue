import { themeVars } from './src/theme/vars';
import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    ...themeVars,
    extend: {},
  },
} satisfies Config;
