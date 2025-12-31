<div align="center">
<a href="https://github.com/sankeyangshu/lemon-mobile-vue">
  <img alt="Lemon-Mobile-Vue" width="200" height="200" src="./public/logo.png">
</a>

<h1 align="center">
  lemon-mobile-vue
</h1>

English / [简体中文](./README.zh-CN.md)

A mobile web apps template based on the Vue 3 ecosystem.

<p >
  <img src="https://img.shields.io/github/license/sankeyangshu/lemon-mobile-vue" alt="license" />
  <img src="https://img.shields.io/github/package-json/v/sankeyangshu/lemon-mobile-vue" alt="version" />
  <img src="https://img.shields.io/github/languages/top/sankeyangshu/lemon-mobile-vue" alt="languages" />
  <img src="https://img.shields.io/github/repo-size/sankeyangshu/lemon-mobile-vue" alt="repo-size" />
  <img src="https://img.shields.io/github/issues-closed/sankeyangshu/lemon-mobile-vue" alt="issues" />
</p>

[Documentation](https://lemon-template-docs.vercel.app/mobile-vue/) / [Feedback](https://github.com/sankeyangshu/lemon-mobile-vue/issues)

</div>

---

## Introduction

🚀🚀🚀 **lemon-mobile-vue** is built using the latest mainstream technologies, including `Vue 3.5`, `Vite 7`, `TanStack Query`, `Vant`, `Pinia`, `TypeScript`, and `Tailwind CSS V4`. It integrates features like `Dark Mode`, system theme colors, and Mock data support.

You can directly start developing your business logic on top of this template! Hope you enjoy it. 👋👋👋

> [!NOTE]
> If this project is helpful to you, please click the "Star" button in the top-right corner. Thank you!

## Preview

👓 [Click here](https://lemon-mobile-vue.vercel.app/) (Switch to mobile view on PC browsers)

## Other Templates

- [lemon-mobile-react](https://github.com/sankeyangshu/lemon-mobile-react) - A mobile web apps template based on the React ecosystem
- [lemon-mobile-uniapp](https://github.com/sankeyangshu/lemon-mobile-uniapp) - A mobile mini-program template based on the UniApp ecosystem

## Features

- ⚡️ Developed with `Vue 3.5` + `TypeScript` using **＜script setup＞** single-file components
- ✨ Uses `Vite 7` as the development and build tool (includes Gzip packaging, TSX syntax, proxy support, etc.)
- 🍕 Fully integrates `TypeScript`
- 🚦 Uses `Vue Router` for routing management, with `Unplugin Vue Router` providing a type-safe file-based routing system
- 🔄 Uses `TanStack Query` for server state management, simplifying data fetching and caching
- 🍍 Replaces `Vuex` with `Pinia`, offering lightweight, simple, and easy-to-use state management, with Pinia persistence plugin integrated
- 📦 Automatic component loading
- 🎨 `Vant 4` component library
- 🌀 `Tailwind CSS` instant atomic CSS engine
- 👏 Integrates multiple icon solutions
- 🌓 Supports Dark Mode
- 🌍 Multi-language internationalization with `i18n` support
- 🔥 Integrates `ECharts` for data visualization, with encapsulated `useECharts Hooks`
- ⚙️ Unit testing using `Vitest`
- ☁️ `Axios` encapsulation
- 💾 Local `Mock` data simulation support
- 📱 Browser compatibility
- 📥 `Gzip` compression for packaged resources
- 🛡️ Splash screen loading animation
- 💪 Integrates `ESLint` for code linting, with the `ESLint` configuration using `Prettier` for code formatting by default
- 🌈 Uses `simple-git-hooks`, `lint-staged`, and `commitlint` to standardize commit messages

## Prerequisites

Familiarity with the following concepts will be very helpful when using this project:

- [Vue 3](https://v3.vuejs.org/) - Familiarize yourself with `Vue 3` basic syntax
- [Vite](https://vitejs.dev/) - Familiarize yourself with `Vite` features
- [Pinia](https://pinia.vuejs.org/) - Familiarize yourself with `Pinia` features
- [TypeScript](https://www.typescriptlang.org/) - Familiarize yourself with `TypeScript` basic syntax
- [Vue Router](https://router.vuejs.org/) - Familiarize yourself with `Vue Router` basic usage
- [Unplugin Vue Router](https://uvr.esm.is/) - Familiarize yourself with file-based routing usage
- [Icones](https://icones.js.org/) - Recommended icon library for this project, though you can also use `SVG Icon`
- [Tailwind CSS](https://tailwindcss.com/) - High-performance and highly flexible instant atomic CSS engine
- [Vant](https://github.com/youzan/vant) - Mobile Vue component library
- [ECharts](https://echarts.apache.org/handbook/en/get-started/) - Familiarize yourself with `ECharts` basic usage
- [Mock.js](https://github.com/nuysoft/Mock) - Understand `Mock.js` basic syntax
- [ES6+](http://es6.ruanyifeng.com/) - Familiarize yourself with `ES6` basic syntax

## Environment Setup

Ensure the following tools are installed locally: [Pnpm](https://pnpm.io/), [Node.js](http://nodejs.org/), and [Git](https://git-scm.com/).

- Use [pnpm >= 8.15.4](https://pnpm.io/) to avoid dependency installation and build errors.
- [Node.js](http://nodejs.org/) version `18.x` or above is required. Recommended: `^18.18.0 || >=20.0.0`.

## VSCode Extensions

If you use [VSCode](https://code.visualstudio.com/) (recommended), install the following extensions for improved development efficiency and code formatting:

- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - Essential for Vue development
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - Tailwind CSS IntelliSense plugin
- [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv) - `.env` file highlighting
- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens) - Better error visualization
- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) - Maintain consistent coding styles across different IDEs
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - Script code linting
- [i18n Ally](https://marketplace.visualstudio.com/items?itemName=lokalise.i18n-ally) - All-in-one i18n support
- [JavaScript and TypeScript VSCode Snippets](https://marketplace.visualstudio.com/items?itemName=sankeyangshu.vscode-javascript-typescript-snippets) - JavaScript and TypeScript code snippets
- [Vue Collection VSCode Snippets](https://marketplace.visualstudio.com/items?itemName=sankeyangshu.vscode-vue-collection-snippets) - Provides Vue 2/3 code snippets

## Usage

### Use the Scaffold

```bash
# Copy command - replace 'project' with your project name
pnpm create lemon project -t mobile-vue
```

### GitHub Template

[Use this template to create a repository](https://github.com/sankeyangshu/lemon-mobile-vue/generate)

### Clone

```bash
# Clone the project
git clone https://github.com/sankeyangshu/lemon-mobile-vue.git

# Enter the project directory
cd lemon-mobile-vue

# Install dependencies - pnpm is recommended
pnpm install

# Start the development server
pnpm dev

# Build for production
pnpm build
```

## Git Commit Guidelines

### Commit Standards

The project enforces Git commit messages using `simple-git-hooks` and `commitlint`, adhering to the widely adopted [Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) guidelines.

- `feat`: Add new features
- `fix`: Fix bugs
- `docs`: Documentation changes
- `style`: Code formatting (does not affect functionality, e.g., spacing, semicolons, etc.)
- `refactor`: Code refactoring (neither bug fixes nor new features)
- `perf`: Performance optimizations
- `test`: Add or update test cases
- `build`: Changes to build process or external dependencies (e.g., updating npm packages, modifying webpack configuration)
- `ci`: Changes to CI configuration or scripts
- `chore`: Changes to build process or auxiliary tools and libraries (does not affect source files or test cases)
- `revert`: Revert a commit

## Community

You can use [issues](https://github.com/sankeyangshu/lemon-mobile-vue/issues) to report problems or submit a Pull Request.

## Browser Support

- For local development, we recommend using the latest version of Chrome. [Download](https://www.google.com/intl/en/chrome/).
- The production environment supports modern browsers. IE is no longer supported. For more details on browser support, check [Can I Use ES Module](https://caniuse.com/?search=ESModule).

| [<img src="https://i.imgtg.com/2023/04/11/8z7ot.png" alt=" IE" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :----------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                      not support                                                                       |                                                                                            last 2 versions                                                                                             |                                                                                                  last 2 versions                                                                                                  |                                                                                                last 2 versions                                                                                                |                                                                                                last 2 versions                                                                                                |

## License

[MIT](./LICENSE) License © 2023-PRESENT [sankeyangshu](https://github.com/sankeyangshu)
