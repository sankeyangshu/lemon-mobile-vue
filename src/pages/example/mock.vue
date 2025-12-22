<template>
  <van-nav-bar
    :title="$t('router.mock')"
    left-arrow
    fixed
    placeholder
    @click-left="$router.back()"
  />

  <div class="box-border w-full p-4">
    <div class="mb-3 border-l-3 border-solid border-l-primary pl-3 leading-7">
      <div class="my-1 text-lg font-bold">
        {{ t('example.mockTips') }}
      </div>
    </div>

    <div
      class="
        mt-5 flex h-75 items-center justify-center bg-white p-5 text-base leading-7.5
        dark:bg-[#1c1c1e]
      "
    >
      <div v-if="message" class="overflow-auto text-left whitespace-pre">
        <pre>{{ JSON.stringify(JSON.parse(message), null, 2) }}</pre>
      </div>
      <van-empty v-else :description="$t('example.noData')" />
    </div>

    <div class="mt-7 w-full">
      <van-button
        type="primary"
        round
        block
        :loading="isPending"
        @click="fetchMessage"
      >
        {{ $t('example.request') }}
      </van-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMutation } from '@tanstack/vue-query';
import { formatDate } from 'date-fns';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { getExampleAPI } from '@/api/system/demo';

defineOptions({
  name: 'Mock',
});

const { t } = useI18n();

const message = ref('');

const { mutate: fetchMessage, isPending } = useMutation({
  mutationFn: getExampleAPI,
  onSuccess: ({ content, date }) => {
    message.value = JSON.stringify({
      content,
      date: formatDate(date, 'yyyy-MM-dd HH:mm:ss'),
    });
  },
});
</script>
