<template>
  <van-nav-bar
    :title="$t('router.login')"
    left-arrow
    fixed
    placeholder
    @click-left="$router.back()"
  />

  <div class="box-border flex size-full flex-col items-center p-5">
    <div class="mt-5 mb-7.5">
      <SvgIcon class="size-25!" local-icon="icon-logo" />
    </div>

    <van-form
      :model="loginForm"
      validate-trigger="onSubmit"
      class="grid w-full gap-y-4"
      @submit="fetchLogin"
    >
      <van-field
        v-model="loginForm.username"
        name="username"
        :border="false"
        :placeholder="$t('login.usernameError')"
        class="w-full rounded-2xl"
        :rules="[{ required: true, message: $t('login.usernameError') }]"
      />

      <PasswordInput
        v-model="loginForm.password"
        name="password"
        :placeholder="$t('login.passwordError')"
        :rules="[{ required: true, message: $t('login.passwordError') }]"
      />

      <van-button
        :loading="isPending"
        round
        block
        type="primary"
        native-type="submit"
      >
        {{ $t('login.login') }}
      </van-button>
    </van-form>

    <div class="mt-25 flex items-center justify-center">
      <SvgIcon class="mx-15 text-3xl text-[#83DC42]" icon="mdi:wechat" />
      <SvgIcon class="text-3xl text-[#F9221D]" icon="mdi:sina-weibo" />
      <SvgIcon class="mx-15 text-3xl" icon="mdi:github" />
    </div>

    <div class="mt-8 flex h-5 items-center justify-center text-sm/5 text-primary">
      <div @click="$router.push('/forgot-password')">
        {{ $t('login.forgotPassword') }}
      </div>
      <van-divider vertical class="mx-5!" />
      <div @click="$router.push('/sign-up')">
        {{ $t('login.registerAccount') }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMutation } from '@tanstack/vue-query';
import { isNotNil } from 'es-toolkit';
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/store/modules/user';
import PasswordInput from './components/password-input.vue';

definePage({
  meta: {
    title: '登录',
    i18nKey: 'router.login',
  },
});

const userStore = useUserStore();

// 表单数据
const loginForm = reactive({
  username: 'admin', // 用户名
  password: '123456', // 密码
});

const router = useRouter();
const route = useRoute();

const { mutate: fetchLogin, isPending } = useMutation({
  mutationFn: userStore.login,
  onSuccess: () => {
    // 如果有 redirect 参数，跳转到被拦截的页面并替换当前历史记录
    if (isNotNil(route.query.redirect)) {
      router.replace(route.query.redirect as string);
    } else {
      // 否则返回上一页或跳转到首页
      if (window.history.length > 1) {
        router.back();
      } else {
        router.push('/');
      }
    }
  },
});
</script>
