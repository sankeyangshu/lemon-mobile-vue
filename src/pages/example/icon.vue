<template>
  <van-nav-bar
    :title="$t('router.icon')"
    left-arrow
    fixed
    placeholder
    @click-left="$router.back()"
  />

  <div class="box-border w-full p-4">
    <div class="mb-3 border-l-3 border-solid border-l-primary pl-3 leading-7">
      <div class="my-1 text-lg font-bold">
        Iconify Icon
      </div>
    </div>
    <div class="flex">
      <SvgIcon v-for="item in iconifyList" :key="item" :icon="item" class="mr-2.5 text-2xl" />
    </div>

    <div class="mt-4 mb-3 border-l-3 border-solid border-l-primary pl-3 leading-7">
      <div class="my-1 text-lg font-bold">
        Local SVG Icon
      </div>
    </div>
    <div class="flex">
      <SvgIcon v-for="item in svgList" :key="item" :local-icon="item" class="mr-2.5 text-2xl" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { SvgName } from '~virtual/svg-component';

definePage({
  meta: {
    title: 'Icon 指南',
    i18nKey: 'router.icon',
  },
});

const iconifyList = [
  'mdi:github',
  'mdi:palette',
  'mdi:book-open-variant',
  'mdi:cellphone-settings-variant',
  'mdi:logout',
];

const svgList: SvgName[] = ['icon-logo', 'icon-moon', 'icon-sunny'];
</script>
