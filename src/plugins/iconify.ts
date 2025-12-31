import { addAPIProvider } from '@iconify/vue';

/**
 * Setup the iconify offline mode
 * @descCN 设置 iconify 离线模式
 */
export function setupIconifyOffline() {
  const { VITE_ICONIFY_URL } = import.meta.env;

  if (VITE_ICONIFY_URL) {
    addAPIProvider('', { resources: [VITE_ICONIFY_URL] });
  }
}
