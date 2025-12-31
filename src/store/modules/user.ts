import type { loginDataType, userInfoType } from '@/api/system/user';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { postLoginAPI } from '@/api/system/user';
import { router } from '@/router';

export const useUserStore = defineStore(
  'userStore',
  () => {
    const token = ref(''); // 用户token
    const userInfo = ref<userInfoType | null>(null); // 用户信息

    const setToken = (value: string) => {
      token.value = value;
    };

    const setUserInfo = (value: userInfoType) => {
      userInfo.value = value;
    };

    const isLogin = computed(() => {
      return !!token.value && !!userInfo.value?.id;
    });

    const login = async (value: loginDataType) => {
      const { username, password } = value;

      const { token, user } = await postLoginAPI({ username: username.trim(), password });
      setToken(token);
      setUserInfo(user);
    };

    const logout = (goLogin = false) => {
      userInfo.value = null;
      token.value = '';
      if (goLogin) {
        router.push('/login');
      }
    };
    return {
      userInfo,
      token,
      isLogin,
      setUserInfo,
      setToken,
      login,
      logout,
    };
  },
  {
    persist: true, // 进行持久化存储
  },
);
