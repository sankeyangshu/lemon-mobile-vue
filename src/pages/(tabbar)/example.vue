<template>
  <div class="box-border py-4">
    <van-cell-group :title="$t('example.basicSetting')" inset>
      <van-cell :title="`🌓 ${$t('example.darkMode')}`">
        <template #right-icon>
          <SwitchDark />
        </template>
      </van-cell>
      <van-cell
        :title="`📚 ${$t('example.language')}`"
        is-link
        :value="getCurrentLanguageText()"
        @click="showLangPicker = true"
      />
    </van-cell-group>

    <van-cell-group :title="$t('example.exampleComponent')" inset>
      <template v-for="item in menuItems" :key="item.path">
        <van-cell :title="item.title" :to="item.path" is-link />
      </template>
    </van-cell-group>

    <van-popup v-model:show="showLangPicker" destroy-on-close round position="bottom">
      <van-picker
        v-model="currentLanguage.value"
        :columns="localeOptions"
        @cancel="showLangPicker = false"
        @confirm="onConfirmLanguage"
      />
    </van-popup>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSettingStore } from '@/store/modules/setting';

defineOptions({
  name: 'Example',
});

const { t } = useI18n();

definePage({
  meta: {
    title: '示例',
    i18nKey: 'router.example',
  },
});

const menuItems = computed(() => [
  { title: `💿 ${t('router.mock')}`, path: '/example/mock' },
  { title: `📊 ${t('router.echarts')}`, path: '/example/echarts' },
  { title: `🎨 ${t('router.icon')}`, path: '/example/icon' },
  { title: `🧡 ${t('router.pagination')}`, path: '/example/pagination' },
  { title: `🙅 ${t('router.notFound')}`, path: '/404' },
]);

const settingStore = useSettingStore();
const { locale, localeOptions } = storeToRefs(settingStore);
const showLangPicker = ref(false);

function getCurrentLanguageText() {
  return localeOptions.value.find((item) => item.value === locale.value)?.text;
}

const currentLanguage = ref({
  text: getCurrentLanguageText(),
  value: [locale.value],
});

function onConfirmLanguage({ selectedOptions }: { selectedOptions: App.I18n.LangOption[] }) {
  currentLanguage.value.text = selectedOptions[0].text;
  settingStore.setLocale(selectedOptions[0].value);
  showLangPicker.value = false;
}
</script>
