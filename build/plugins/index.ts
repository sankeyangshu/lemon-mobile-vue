import type { PluginOption } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import viteRestart from 'vite-plugin-restart';
import vueDevtools from 'vite-plugin-vue-devtools';
import tsconfigPaths from 'vite-tsconfig-paths';
import { setupHtmlPluginConfig } from './html';
import { setupBuildInfoPluginConfig } from './info';

/**
 * 配置 vite 插件
 * @param viteEnv vite 环境变量配置文件键值队 object
 * @param lastBuildTime 最后编译时间
 * @returns vitePlugins[]
 */
export function createVitePlugins(_viteEnv: Env.ImportMeta, lastBuildTime: string) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),

    vueDevtools(),

    tailwindcss(),

    tsconfigPaths(),

    // 通过这个插件，在修改vite.config.ts文件则不需要重新运行也生效配置
    viteRestart({
      restart: ['vite.config.ts'],
    }),

    setupBuildInfoPluginConfig(),

    setupHtmlPluginConfig(lastBuildTime),
  ];

  return vitePlugins;
}
