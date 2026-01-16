<template>
  <div class="w-full">
    <van-image
      width="100%"
      src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      alt="banner"
    />

    <div
      class="
        relative mx-4 -mt-10 mb-2.5 flex items-center rounded-lg bg-white p-4
        dark:bg-[#1C1C1E]
      "
    >
      <van-image
        width="48"
        height="48"
        fit="cover"
        alt="avatar"
        round
        :src="userInfo?.avatar"
      />
      <div v-if="isLogin" class="ml-2.5 flex-1">
        <div class="mb-0.5 text-xl">
          {{ userInfo?.nickname }}
        </div>
        <div class="truncate text-sm">
          {{ userInfo?.sign }}
        </div>
      </div>
      <div v-else class="ml-2.5 flex-1 text-xl">
        <RouterLink to="/sign-in">
          {{ $t('router.login') }}
        </RouterLink>
      </div>
    </div>

    <van-cell-group inset>
      <van-cell :title="$t('router.themeSetting')" is-link to="/settings">
        <template #icon>
          <SvgIcon icon="mdi:palette" class="mr-2.5 h-6 text-lg/6" />
        </template>
      </van-cell>
      <van-cell
        :title="$t('mine.projectDocs')"
        is-link
        @click="onClickOpenDocs"
      >
        <template #icon>
          <SvgIcon icon="mdi:book-open-variant" class="mr-2.5 h-6 text-lg/6" />
        </template>
      </van-cell>
      <van-cell :title="$t('mine.systemVersion')" :value="`v${version}`">
        <template #icon>
          <SvgIcon icon="mdi:cellphone-settings-variant" class="mr-2.5 h-6 text-lg/6" />
        </template>
      </van-cell>
      <van-cell
        v-if="isLogin"
        :title="$t('mine.logout')"
        is-link
        @click="onClickLogout"
      >
        <template #icon>
          <SvgIcon icon="mdi:logout" class="mr-2.5 h-6 text-lg/6" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { showConfirmDialog } from 'vant';
import { useI18n } from 'vue-i18n';
import { version } from '~root/package.json';
import { useUserStore } from '@/store/modules/user';

definePage({
  meta: {
    title: '我的',
    i18nKey: 'router.mine',
  },
});

const { t } = useI18n();

const userStore = useUserStore();
const { isLogin, userInfo } = storeToRefs(userStore);

// 打开文档
function onClickOpenDocs() {
  window.open('https://lemon-template-docs.vercel.app/mobile-vue/', '_blank');
}

function onClickLogout() {
  showConfirmDialog({
    title: t('mine.tips'),
    message: t('mine.logoutTips'),
  })
    .then(() => {
      userStore.logout();
    })
    .catch(() => {
      // on cancel
    });
}
</script>
