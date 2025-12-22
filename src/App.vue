<template>
  <van-config-provider :theme="isDark ? 'dark' : 'light'" theme-vars-scope="global">
    <RouterView />
  </van-config-provider>

  <VueQueryDevtools />
</template>

<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { storeToRefs } from 'pinia';
import { useSettingStore } from '@/store/modules/setting';

const settingStore = useSettingStore();
const { isDark } = storeToRefs(settingStore);
</script>
