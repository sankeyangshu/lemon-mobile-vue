<template>
  <!-- 主内容区域 -->
  <RouterView />

  <!-- 底部导航栏 -->
  <van-tabbar route fixed placeholder safe-area-inset-bottom>
    <van-tabbar-item v-for="item in tabbarList" :key="item.name" replace :to="item.path">
      <template #icon="{ active }">
        <SvgIcon :icon="item.icon" class="text-2xl" :class="active ? 'text-primary' : ''" />
      </template>
      {{ item.title }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

interface TabbarItem {
  name: string;
  icon: string;
  title: string;
  path: RouteLocationRaw;
}

const tabbarList = computed<TabbarItem[]>(() => {
  return [
    {
      name: 'home',
      icon: 'mdi:home',
      title: t('router.home'),
      path: '/home',
    },
    {
      name: 'example',
      icon: 'mdi:code-not-equal-variant',
      title: t('router.example'),
      path: '/example',
    },
    {
      name: 'mine',
      icon: 'mdi:account',
      title: t('router.mine'),
      path: '/mine',
    },
  ];
});
</script>
