import tailwindcss from '@tailwindcss/vite';
import Vue from '@vitejs/plugin-vue';
import ViteRestart from 'vite-plugin-restart';
import VueDevtools from 'vite-plugin-vue-devtools';
import { configHtmlPlugin } from './html';
import { configInfoPlugin } from './info';
import { configElegantRouter } from './router';
import { configUnPlugin } from './unplugin';
import type { PluginOption } from 'vite';

/**
 * 配置 vite 插件
 * @param viteEnv vite 环境变量配置文件键值队 object
 * @param isBuild 是否是打包模式
 * @returns vitePlugins[]
 */
export const createVitePlugins = (viteEnv: Env.ImportMeta, isBuild: boolean) => {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    Vue(),

    configElegantRouter(),

    VueDevtools(),

    tailwindcss(),

    ...configUnPlugin(viteEnv),

    // 通过这个插件，在修改vite.config.ts文件则不需要重新运行也生效配置
    ViteRestart({
      restart: ['vite.config.ts'],
    }),

    configHtmlPlugin(viteEnv, isBuild),

    configInfoPlugin(),
  ];

  return vitePlugins;
};
