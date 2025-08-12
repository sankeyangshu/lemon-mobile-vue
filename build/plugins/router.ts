import ElegantRouter from 'elegant-router/vite';

/**
 * Configures the elegant router plugin for Vite.
 * @descCN 配置elegant router vite 插件
 * @returns The configured elegant router plugin.
 * @see https://github.com/soybeanjs/elegant-router
 */
export function configElegantRouter() {
  return ElegantRouter({
    dts: 'src/types/elegant-router.d.ts',
    vueRouterDts: 'src/types/typed-router.d.ts',
    layouts: {
      base: 'src/layouts/base.vue',
      blank: 'src/layouts/blank.vue',
    },
  });
}
