<template>
  <van-field
    v-model="model"
    :type="isShowPassword ? 'text' : 'password'"
    :name="name"
    :placeholder="placeholder"
    :right-icon="isShowPassword ? 'eye-o' : 'closed-eye'"
    :rules="rules"
    :border="false"
    class="w-full rounded-2xl"
    @click-right-icon="isShowPassword = !isShowPassword"
  />
</template>

<script lang="ts" setup>
import type { FieldRule } from 'vant';
import { ref } from 'vue';

interface PropsType {
  name: string;
  placeholder?: string;
  rules?: FieldRule[];
}

const { name = 'password', placeholder = '请输入密码' } = defineProps<PropsType>();

const isShowPassword = ref(false);

const model = defineModel<string | number>();
</script>
