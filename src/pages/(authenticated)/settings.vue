<template>
  <van-nav-bar
    :title="$t('router.themeSetting')"
    left-arrow
    fixed
    placeholder
    @click-left="$router.back()"
  />

  <van-divider>{{ $t('system.themeMode') }}</van-divider>
  <div class="flex items-center justify-center">
    <SwitchDark mode="Segmented" />
  </div>

  <van-divider>{{ $t('system.systemTheme') }}</van-divider>
  <div class="flex justify-center">
    <div class="grid grid-cols-8 gap-2">
      <div
        v-for="color in Object.keys(PRIMARY_COLORS)"
        :key="color"
        class="
          flex size-7.5 cursor-pointer items-center justify-center rounded-md border border-solid
        "
        :style="{ backgroundColor: PRIMARY_COLORS[color as PrimaryColor] }"
        @click="onChangeThemeColor(color as PrimaryColor)"
      >
        <van-icon
          v-if="primaryColor === color"
          name="success"
          color="white"
          size="24"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PrimaryColor } from '@/store/modules/setting';
import { storeToRefs } from 'pinia';
import { PRIMARY_COLORS, useSettingStore } from '@/store/modules/setting';

definePage({
  meta: {
    title: '主题设置',
    i18nKey: 'router.themeSetting',
  },
});

const settingStore = useSettingStore();
const { primaryColor } = storeToRefs(settingStore);

/**
 * 切换主题色
 * @param color 主题色
 */
function onChangeThemeColor(color: PrimaryColor) {
  settingStore.setPrimaryColor(color);
}
</script>
