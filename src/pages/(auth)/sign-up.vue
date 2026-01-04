<template>
  <van-nav-bar
    :title="$t('router.register')"
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
      :model="registerForm"
      validate-trigger="onSubmit"
      class="grid w-full gap-y-4"
      @submit="onSubmit"
    >
      <van-field
        v-model="registerForm.username"
        name="username"
        :border="false"
        :placeholder="$t('login.username')"
        class="w-full rounded-2xl"
        :rules="[{ required: true, message: $t('login.usernameError') }]"
      />

      <PasswordInput
        v-model="registerForm.password"
        name="password"
        :placeholder="$t('login.password')"
        :rules="[{ required: true, message: $t('login.passwordError') }]"
      />

      <PasswordInput
        v-model="registerForm.confirmPassword"
        name="confirmPassword"
        :placeholder="$t('login.againEnterPassword')"
        :rules="[
          { required: true, message: $t('login.againEnterPassword') },
          { validator: validateConfirmPassword, message: $t('login.passwordInconsistent') },
        ]"
      />

      <van-button
        round
        block
        type="primary"
        native-type="submit"
      >
        {{ $t('login.register') }}
      </van-button>
    </van-form>

    <div class="fixed right-5 bottom-10 left-5 mx-5 flex h-5 items-center justify-center text-sm/5">
      <label class="flex cursor-pointer items-center">
        <van-checkbox v-model="isAgreeLicense" icon-size="16px" class="mr-2" />
        <span>
          {{ $t('login.readAgreement') }}
          <a
            href="https://sankeyangshu.top"
            target="_blank"
            rel="noreferrer"
            class="text-primary"
          >
            {{ $t('login.privacyPolicy') }}
          </a>
          {{ $t('login.and') }}
          <a
            href="https://sankeyangshu.top"
            target="_blank"
            rel="noreferrer"
            class="text-primary"
          >
            {{ $t('login.userAgreement') }}
          </a>
        </span>
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { showToast } from 'vant';
import { reactive, ref } from 'vue';
import PasswordInput from './components/password-input.vue';

definePage({
  meta: {
    title: '注册',
    i18nKey: 'router.register',
  },
});

const isAgreeLicense = ref(false);

// 表单数据
const registerForm = reactive({
  username: '',
  password: '',
  confirmPassword: '',
});

/**
 * 验证确认密码
 */
const validateConfirmPassword = (val: string | number) => val === registerForm.password;

/**
 * 提交表单
 */
function onSubmit() {
  if (!isAgreeLicense.value) {
    showToast('请先阅读并同意用户协议和隐私政策');
    return;
  }

  // TODO: 实现注册逻辑
  showToast('注册成功');
}
</script>
