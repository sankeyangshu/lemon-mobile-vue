import type { App } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// 创建pinia实例
const store = createPinia();

// 使用数据持久化插件
store.use(piniaPluginPersistedstate);

/**
 * 配置pinia
 * @param app vue实例
 */
export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store };
