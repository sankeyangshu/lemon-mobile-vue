import { usePreferredColorScheme } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, effectScope, onScopeDispose, ref, watch } from 'vue';
import { localStg } from '@/lib/storage';
import { setLanguage } from '@/locales';

const DARK_CLASS = 'dark';

/**
 * 预设主题色
 */
export const PRIMARY_COLORS = {
  teal: '#009688',
  beige: '#daa96e',
  oceanBlue: '#0c819f',
  emeraldGreen: '#27ae60',
  hotPink: '#ff5c93',
  coralRed: '#e74c3c',
  salmonPink: '#fd726d',
  orange: '#f39c12',
  violet: '#9b59b6',
} as const;

/**
 * 主题色类型
 */
export type PrimaryColor = keyof typeof PRIMARY_COLORS;

export const useSettingStore = defineStore('settingStore', () => {
  const scope = effectScope();

  /**
   * 系统主题偏好
   */
  const osTheme = usePreferredColorScheme();

  /**
   * 主题模式
   */
  const themeMode = ref<StorageType.Local['themeMode']>(localStg.getItem('themeMode') || 'system');

  /**
   * 是否为暗黑模式
   */
  const isDark = computed(() => {
    if (themeMode.value === 'system') {
      return osTheme.value === 'dark';
    }
    return themeMode.value === 'dark';
  });

  /**
   * 主题色
   */
  const primaryColor = ref<PrimaryColor>(localStg.getItem('primaryColor') || 'teal');

  /**
   * 设置主题色
   */
  const setPrimaryColor = (value: PrimaryColor) => {
    primaryColor.value = value;
    localStg.setItem('primaryColor', value);
  };

  /**
   * 设置主题模式
   */
  const setThemeMode = (value: StorageType.Local['themeMode']) => {
    themeMode.value = value;
    localStg.setItem('themeMode', value);
  };

  const locale = ref<App.I18n.LangType>(localStg.getItem('language') || 'zh-CN');

  const localeOptions = ref<App.I18n.LangOption[]>([
    {
      value: 'zh-CN',
      text: '中文',
    },
    {
      value: 'en-US',
      text: 'English',
    },
  ]);

  /**
   * 设置语言
   * @param lang 语言
   */
  const setLocale = (lang: App.I18n.LangType) => {
    locale.value = lang;
    setLanguage(lang);
  };

  scope.run(() => {
    // 监听 isDark 变化，切换 CSS dark class
    watch(
      isDark,
      (val) => {
        if (val) {
          document.documentElement.classList.add(DARK_CLASS);
        } else {
          document.documentElement.classList.remove(DARK_CLASS);
        }
      },
      { immediate: true },
    );

    // 监听 primaryColor 变化，切换 CSS primary color
    watch(
      primaryColor,
      (val) => {
        document.documentElement.style.setProperty('--app-color-primary', PRIMARY_COLORS[val]);
      },
      { immediate: true },
    );
  });

  onScopeDispose(() => {
    scope.stop();
  });

  return {
    themeMode,
    isDark,
    setThemeMode,

    primaryColor,
    setPrimaryColor,

    locale,
    localeOptions,
    setLocale,
  };
});
