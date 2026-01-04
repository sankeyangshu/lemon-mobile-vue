<template>
  <van-nav-bar
    :title="$t('router.forgotPassword')"
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
      :model="resetForm"
      validate-trigger="onSubmit"
      class="grid w-full gap-y-4"
      @submit="onSubmit"
    >
      <van-field
        v-model="resetForm.phone"
        type="tel"
        name="phone"
        :border="false"
        :placeholder="$t('login.pleaseEnterPhone')"
        class="w-full rounded-2xl"
        :rules="[
          { required: true, message: $t('login.pleaseEnterPhone') },
          { validator: validatePhone, message: $t('login.pleaseEnterValidPhone') },
        ]"
      />

      <van-field
        v-model="resetForm.code"
        type="tel"
        name="code"
        :border="false"
        :placeholder="$t('login.pleaseEnterVerificationCode')"
        class="w-full rounded-2xl"
        :rules="[{ required: true, message: $t('login.pleaseEnterVerificationCode') }]"
      >
        <template #button>
          <van-button
            size="small"
            type="primary"
            :disabled="countdown > 0"
            @click="handleGetCode"
          >
            {{ countdown > 0 ? `${countdown}s` : $t('login.code') }}
          </van-button>
        </template>
      </van-field>

      <PasswordInput
        v-model="resetForm.password"
        name="password"
        :placeholder="$t('login.pleaseEnterNewPassword')"
        :rules="[{ required: true, message: $t('login.pleaseEnterNewPassword') }]"
      />

      <PasswordInput
        v-model="resetForm.confirmPassword"
        name="confirmPassword"
        :placeholder="$t('login.pleaseEnterNewPasswordAgain')"
        :rules="[
          { required: true, message: $t('login.pleaseEnterNewPasswordAgain') },
          { validator: validateConfirmPassword, message: $t('login.passwordInconsistent') },
        ]"
      />

      <van-button
        round
        block
        type="primary"
        native-type="submit"
      >
        {{ $t('login.confirmReset') }}
      </van-button>
    </van-form>
  </div>
</template>

<script lang="ts" setup>
import { showToast } from 'vant';
import { reactive, ref } from 'vue';
import PasswordInput from './components/password-input.vue';

definePage({
  meta: {
    title: '忘记密码',
    i18nKey: 'router.forgotPassword',
  },
});

const countdown = ref(0);

// 表单数据
const resetForm = reactive({
  phone: '',
  code: '',
  password: '',
  confirmPassword: '',
});

/**
 * 判断是否是合法手机号
 */
function validPhone(phone: string) {
  const reg = /^(?:13\d|14[014-9]|15[0-35-9]|16[2567]|17[0-8]|18\d|19[0-35-9])\d{8}$/;
  return reg.test(phone);
}

/**
 * 验证手机号
 */
function validatePhone(value: string) {
  if (!validPhone(value)) {
    return false;
  }
  return true;
}

/**
 * 验证确认密码
 */
function validateConfirmPassword(value: string) {
  if (value !== resetForm.password) {
    return false;
  }
  return true;
}

/**
 * 获取验证码
 */
function handleGetCode() {
  if (countdown.value > 0)
    return;

  // 先验证手机号
  if (!resetForm.phone) {
    return;
  }

  if (!validPhone(resetForm.phone)) {
    return;
  }

  // TODO: 发送验证码
  countdown.value = 60;
  const timer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(timer);
    }
  }, 1000);
}

/**
 * 提交表单
 */
function onSubmit() {
  // TODO: 实现重置密码逻辑
  showToast('密码重置成功');
}
</script>
