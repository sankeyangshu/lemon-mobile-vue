import type { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { handleHotUpdate, routes } from 'vue-router/auto-routes';
import { createRouterGuard } from './guard';

/**
 * 创建一个可以被 Vue 应用程序使用的路由实例
 */
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

/**
 * 热更新路由
 */
if (import.meta.hot) {
  handleHotUpdate(router);
}

/**
 * 配置路由器
 * @param app vue实例
 */
export async function setupRouter(app: App<Element>) {
  app.use(router);

  createRouterGuard(router);

  await router.isReady();
}
