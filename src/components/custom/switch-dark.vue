<template>
  <div
    v-if="mode === 'Segmented'"
    class="
      box-border inline-flex h-14 items-center rounded-sm bg-white p-1
      dark:bg-[#1C1C1E]
    "
  >
    <div
      v-for="key in Object.keys(icons)"
      :key="key"
      :class="cn(
        `
          box-border flex h-full w-20 cursor-pointer items-center justify-center rounded-sm px-1.5
          text-xs leading-none text-white
        `,
        {
          'bg-black/40 dark:bg-white/40': key === themeValue,
        },
      )"
      @click="handleChange(key)"
    >
      <SvgIcon
        class="text-2xl text-text"
        :local-icon="icons[key as StorageType.Local['themeMode']]"
      />
    </div>
  </div>

  <label v-else class="relative inline-block h-[30px] w-[53px]">
    <input
      type="checkbox"
      :checked="isDark"
      class="peer size-0 opacity-0"
      @change="handleSwitchChange"
    >

    <!-- Slider 背景 -->
    <div
      :class="cn(
        `
          absolute inset-0 z-0 cursor-pointer overflow-hidden rounded-[30px] bg-[#2196f3]
          transition-all duration-400
          peer-checked:bg-black
          peer-focus:shadow-[0_0_1px_#2196f3]
        `,
      )"
    >
      <!-- 太阳/月亮主体 -->
      <div
        :class="cn(
          'absolute bottom-1 left-1 size-[22px] rounded-full transition-all duration-400',
          isDark ? 'translate-x-[23px] bg-gray-200' : 'bg-yellow-400',
        )"
      >
        <!-- 月亮斑点 -->
        <svg
          :class="cn(
            'absolute top-[2.5px] left-[8.5px] z-4 size-[5px] fill-gray-500',
            'transition-opacity duration-400',
            isDark ? 'opacity-100' : 'opacity-0',
          )"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="50" />
        </svg>
        <svg
          :class="cn(
            'absolute top-[8.5px] left-[1.5px] z-4 size-[8.5px] fill-gray-500',
            'transition-opacity duration-400',
            isDark ? 'opacity-100' : 'opacity-0',
          )"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="50" />
        </svg>
        <svg
          :class="cn(
            'absolute top-[15px] left-[13.5px] z-4 size-[2.5px] fill-gray-500',
            'transition-opacity duration-400',
            isDark ? 'opacity-100' : 'opacity-0',
          )"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="50" />
        </svg>

        <!-- 光线 -->
        <svg
          class="absolute top-[-7px] left-[-7px] z-[-1] size-[36px] fill-white opacity-10"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="50" />
        </svg>
        <svg
          class="absolute top-[-50%] left-[-50%] z-[-1] size-[46px] fill-white opacity-10"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="50" />
        </svg>
        <svg
          class="absolute top-[-15px] left-[-15px] z-[-1] size-[50px] fill-white opacity-10"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="50" />
        </svg>

        <!-- 云朵 - 深色 -->
        <svg
          class="
            absolute top-[12.5px] left-[25px] w-[33px] animate-[cloud-move_6s_ease_1s_infinite]
            fill-[#ccc]
          "
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="50" />
        </svg>
        <svg
          class="
            absolute top-[8.5px] left-[37px] w-[17px] animate-[cloud-move_6s_ease_1s_infinite]
            fill-[#ccc]
          "
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="50" />
        </svg>
        <svg
          class="
            absolute top-[20px] left-[15px] w-[25px] animate-[cloud-move_6s_ease_1s_infinite]
            fill-[#ccc]
          "
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="50" />
        </svg>

        <!-- 云朵 - 浅色 -->
        <svg
          class="absolute top-[15px] left-[30px] w-[33px] animate-cloud-move fill-[#eee]"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="50" />
        </svg>
        <svg
          class="absolute top-[12px] left-[40px] w-[17px] animate-cloud-move fill-[#eee]"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="50" />
        </svg>
        <svg
          class="absolute top-[22px] left-[18.5px] w-[25px] animate-cloud-move fill-[#eee]"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="50" />
        </svg>
      </div>

      <!-- 星星容器 -->
      <div
        :class="cn(
          'transition-all duration-400',
          isDark ? 'translate-y-0 opacity-100' : 'translate-y-[-28px] opacity-0',
        )"
      >
        <svg
          class="
            absolute top-[1.5px] left-[2.5px] w-[17px] animate-[star-twinkle_2s_ease_0.3s_infinite]
            fill-white transition-all duration-400
          "
          viewBox="0 0 20 20"
        >
          <path
            d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"
          />
        </svg>
        <svg
          class="
            absolute top-[13.5px] left-[2.5px] w-[5px] animate-star-twinkle fill-white
            transition-all duration-400
          "
          viewBox="0 0 20 20"
        >
          <path
            d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"
          />
        </svg>
        <svg
          class="
            absolute top-[17px] left-[8.5px] w-[10px] animate-[star-twinkle_2s_ease_0.6s_infinite]
            fill-white transition-all duration-400
          "
          viewBox="0 0 20 20"
        >
          <path
            d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"
          />
        </svg>
        <svg
          class="
            absolute top-0 left-[15px] w-[15px] animate-[star-twinkle_2s_ease_1.3s_infinite]
            fill-white transition-all duration-400
          "
          viewBox="0 0 20 20"
        >
          <path
            d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"
          />
        </svg>
      </div>
    </div>
  </label>
</template>

<script lang="ts" setup>
import type { SvgName } from '~virtual/svg-component';
import { computed } from 'vue';
import { cn } from '@/lib/utils';
import { useSettingStore } from '@/store/modules/setting';
import SvgIcon from './svg-icon.vue';

interface SwitchDarkProps {
  mode?: 'Switch' | 'Segmented';
}

withDefaults(defineProps<SwitchDarkProps>(), {
  mode: 'Switch',
});

const settingStore = useSettingStore();

/** 主题图标映射 */
const icons: Record<StorageType.Local['themeMode'], SvgName> = {
  light: 'icon-sunny',
  dark: 'icon-moon',
  system: 'icon-sun-moon',
};

/** 当前主题值 */
const themeValue = computed({
  get: () => settingStore.themeMode,
  set: (value) => {
    settingStore.setThemeMode(value as StorageType.Local['themeMode']);
  },
});

/** 是否为暗黑模式 */
const isDark = computed(() => settingStore.isDark);

/** 处理 Segmented 变化 */
function handleChange(value: string | number) {
  settingStore.setThemeMode(value as StorageType.Local['themeMode']);
}

/** 处理 Switch 变化 */
function handleSwitchChange() {
  settingStore.setThemeMode(isDark.value ? 'light' : 'dark');
}
</script>
