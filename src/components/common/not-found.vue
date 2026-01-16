<template>
  <div class="box-border size-full p-2.5">
    <div class="flex flex-col items-center justify-center">
      <img class="w-full" :src="notFound" alt="Not Found">
      <div class="text-center">
        <div
          class="animate-in duration-320 ease-in fade-in slide-in-from-bottom-[120px]"
          style="animation-delay: 50ms; animation-fill-mode: both;"
        >
          <div class="mb-5 text-xl/10 font-bold text-primary">
            {{ $t('system.notFound') }}
          </div>
        </div>
        <div
          class="animate-in duration-320 ease-in fade-in slide-in-from-bottom-[120px]"
          style="animation-delay: 100ms; animation-fill-mode: both;"
        >
          <div class="mb-7.5 text-sm/5 text-gray-500">
            {{ $t('system.checkUrl') }}
          </div>
        </div>
        <div
          class="animate-in duration-320 ease-in fade-in slide-in-from-bottom-[120px]"
          style="animation-delay: 150ms; animation-fill-mode: both;"
        >
          <van-button type="primary" @click="$router.push('/')">
            {{ $t('system.goHome') }}
          </van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import notFound from '@/assets/svg-icon/not-found.svg';
</script>
