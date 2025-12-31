import type { App } from 'vue';
import { Locale } from 'vant';
import { createI18n } from 'vue-i18n';
import { localStg } from '@/lib/storage';
import resources from './locale';
import { vantLocales } from './vant';

/**
 * 获取默认的本地语言
 * @returns 语言
 */
function getDefaultLanguage() {
  const locales = Object.keys(resources);

  const localLanguage = localStg.getItem('language') || navigator.language;

  // 存在当前语言的语言包 或 存在当前语言的任意地区的语言包
  if (locales.includes(localLanguage)) {
    return localLanguage;
  }

  // 若未找到，则使用 默认语言包
  return 'zh-CN';
}

/**
 * 初始化国际化
 */
function initI18n() {
  const lang = getDefaultLanguage();
  const i18n = createI18n({
    legacy: false, // 使用 Composition API 模式，则需要将其设置为false
    globalInjection: true, // 全局注入 $t 函数
    locale: lang, // 使用的语言
    fallbackLocale: lang, // 当前语言翻译缺失时显示的语言
    messages: resources, // 语言文件
  });

  return i18n;
}

const i18n = initI18n();

/**
 * Set language
 * @descCN 设置语言
 * @param lang language
 */
export function setLanguage(lang: App.I18n.LangType) {
  i18n.global.locale.value = lang;

  // 设置 vant 组件语言包
  Locale.use(lang, vantLocales[lang]);

  localStg.setItem('language', lang);
}

/**
 * Setup Vue i18n plugin
 * @descCN 配置i18n国际化
 * @param app vue实例
 */
export function setupI18n(app: App<Element>) {
  app.use(i18n);
}

export { i18n };
