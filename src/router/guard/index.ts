import type { Router } from 'vue-router';
import { createProgressGuard } from './progress';
import { createDocumentTitleGuard } from './title';

/**
 * Router guard
 * @descCN 路由守卫
 * @param router - Router instance
 */
export function createRouterGuard(router: Router) {
  createProgressGuard(router);
  createDocumentTitleGuard(router);
}
