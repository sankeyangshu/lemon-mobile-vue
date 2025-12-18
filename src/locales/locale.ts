import enUS from './modules/en-us';
import zhCN from './modules/zh-cn';

const resources: Record<App.I18n.LangType, App.I18n.I18nScheme> = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

export default resources;
