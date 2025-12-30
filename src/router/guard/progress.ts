import type { Router } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false });

/**
 * Progress guard
 * @descCN 进度条守卫
 * @param router - Router instance
 */
export function createProgressGuard(router: Router) {
  router.beforeEach((_to, _from, next) => {
    NProgress.start();

    next();
  });

  router.afterEach(() => {
    NProgress.done();
  });
}
