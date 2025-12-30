import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    /**
     * 路由标题
     */
    title: string;

    /**
     * 国际化key
     */
    i18nKey?: string;

    /**
     * 设置为true时缓存
     * @default false
     */
    keepAlive?: boolean;

    // 扩展更多...
  }
}
