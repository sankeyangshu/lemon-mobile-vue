import type { PluginOption } from 'vite';
import Tailwindcss from '@tailwindcss/vite';
import Vue from '@vitejs/plugin-vue';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { mockDevServerPlugin } from 'vite-plugin-mock-dev-server';
import ViteRestart from 'vite-plugin-restart';
import VueDevtools from 'vite-plugin-vue-devtools';
import VueRouter from 'vue-router/vite';
import { setupHtmlPluginConfig } from './html';
import { setupBuildInfoPluginConfig } from './info';
import { setupUnPluginSvgIconConfig } from './unplugin';
import { setupVConsolePlugin } from './vconsole';

/**
 * 配置 vite 插件
 * @param viteEnv vite 环境变量配置文件键值对 object
 * @param lastBuildTime 最后编译时间
 * @returns vitePlugins[]
 */
export function createVitePlugins(viteEnv: Env.ImportMeta, lastBuildTime: string) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    VueRouter({
      exclude: ['**/components/**/*.*'],
      dts: 'src/types/route-map.d.ts',
    }),

    Vue(),

    Tailwindcss(),

    Components({
      dts: 'src/types/components.d.ts',
      resolvers: [VantResolver()],
    }),

    setupUnPluginSvgIconConfig(viteEnv),

    viteEnv.VITE_USE_MOCK && mockDevServerPlugin(),

    setupVConsolePlugin(viteEnv),

    // 通过这个插件，在修改vite.config.ts文件则不需要重新运行也生效配置
    ViteRestart({
      restart: ['vite.config.ts'],
    }),

    setupBuildInfoPluginConfig(),

    setupHtmlPluginConfig(lastBuildTime),

    VueDevtools(),
  ];

  return vitePlugins;
}
