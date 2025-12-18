import enUS from 'vant/es/locale/lang/en-US';
import zhCN from 'vant/es/locale/lang/zh-CN';

type VantLocale = typeof zhCN;

export const vantLocales: Record<App.I18n.LangType, VantLocale> = {
  'zh-CN': zhCN,
  'en-US': enUS,
};
