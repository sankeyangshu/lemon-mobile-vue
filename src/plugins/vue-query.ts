import type { App } from 'vue';
import { VueQueryPlugin } from '@tanstack/vue-query';

/**
 * 配置tanstack vue-query插件
 * @param app vue实例
 */
export function setupVueQuery(app: App<Element>) {
  app.use(VueQueryPlugin);
}
