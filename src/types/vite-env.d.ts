// eslint-disable-next-line spaced-comment
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'virtual:svg-icons-register' {
  const component: any;
  export default component;
}
