<template>
  <LocalSvgIcon
    v-if="isNotNil(localIcon)"
    :name="localIcon"
    :class="className"
    :style="style"
  />
  <Icon
    v-else-if="isNotNil(icon)"
    :icon="icon"
    :class="className"
    :style="style"
  />
  <span v-else>null icon</span>
</template>

<script lang="ts" setup>
import type { IconifyIcon } from '@iconify/vue';
import type { CSSProperties } from 'vue';
import type { SvgName } from '~virtual/svg-component';
import { Icon } from '@iconify/vue';
import { isNotNil } from 'es-toolkit';
import LocalSvgIcon from '~virtual/svg-component';

interface SvgIconProps {
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * Iconify 图标名称
   */
  icon?: string | IconifyIcon;
  /**
   * 本地 SVG 图标名称
   */
  localIcon?: SvgName;
  /**
   * 样式
   */
  style?: CSSProperties;
}

// 获取父组件传递的值
const { icon, localIcon, className, style } = defineProps<SvgIconProps>();
</script>
