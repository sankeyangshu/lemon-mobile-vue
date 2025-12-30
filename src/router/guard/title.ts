import type { Router } from 'vue-router';
import { useTitle } from '@vueuse/core';
import { i18n } from '@/locales';

/**
 * Page title guard
 * @descCN 页面标题守卫
 * @param router - Router instance
 */
export function createDocumentTitleGuard(router: Router) {
  router.afterEach((to) => {
    const { i18nKey, title } = to.meta;

    // 设置标题
    const documentTitle = i18nKey ? i18n.global.t(i18nKey) : (title || import.meta.env.VITE_APP_TITLE);

    useTitle(documentTitle);
  });
}
