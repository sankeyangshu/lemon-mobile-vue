<template>
  <van-config-provider :theme-vars="{ primaryColor: PRIMARY_COLORS[primaryColor] }" :theme="isDark ? 'dark' : 'light'" theme-vars-scope="global">
    <RouterView />
  </van-config-provider>

  <VueQueryDevtools />
</template>

<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { storeToRefs } from 'pinia';
import { PRIMARY_COLORS, useSettingStore } from '@/store/modules/setting';

const settingStore = useSettingStore();
const { isDark, primaryColor } = storeToRefs(settingStore);
</script>
